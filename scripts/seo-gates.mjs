// Fails the build when a page has anything other than one H1, a title over
// 60 characters, or a meta description over 155 characters.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function decode(value) {
  return value
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

const files = await walk(dist);
const errors = [];

for (const file of files.sort()) {
  const html = await readFile(file, 'utf8');
  const rel = path.relative(dist, file);
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const metaMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const h1s = html.match(/<h1\b/gi) ?? [];
  const title = titleMatch ? decode(titleMatch[1].replace(/\s+/g, ' ').trim()) : '';
  const description = metaMatch ? decode(metaMatch[1]) : '';

  if (!titleMatch) errors.push(`${rel}: missing <title>`);
  else if (title.length > 60) errors.push(`${rel}: title is ${title.length} characters: ${title}`);
  if (!metaMatch) errors.push(`${rel}: missing meta description`);
  else if (description.length > 155) errors.push(`${rel}: meta description is ${description.length} characters`);
  if (h1s.length !== 1) errors.push(`${rel}: expected 1 H1, found ${h1s.length}`);

  const ldRe = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let ldMatch;
  while ((ldMatch = ldRe.exec(html))) {
    const raw = ldMatch[1].trim();
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      try {
        parsed = JSON.parse(decode(raw));
      } catch (err) {
        errors.push(`${rel}: JSON-LD parse error: ${err instanceof Error ? err.message : 'invalid JSON'}`);
        continue;
      }
    }
    checkFaqPage(parsed, rel, errors);
  }
}

function checkFaqPage(value, rel, errors) {
  const items = Array.isArray(value) ? value : [value];
  for (const item of items) {
    if (!item || typeof item !== 'object') continue;
    if (item['@graph']) checkFaqPage(item['@graph'], rel, errors);
    const type = item['@type'];
    const types = Array.isArray(type) ? type : type ? [type] : [];
    if (!types.includes('FAQPage')) continue;
    const entity = item.mainEntity;
    if (!Array.isArray(entity) || entity.length === 0) {
      errors.push(`${rel}: FAQPage JSON-LD has no mainEntity`);
    }
  }
}

const feedPath = path.join(dist, 'feed.json');
let feed;
try {
  feed = JSON.parse(await readFile(feedPath, 'utf8'));
} catch (err) {
  errors.push(`feed.json: ${err instanceof Error ? err.message : 'unreadable'}`);
  feed = null;
}
if (feed) {
  const sitemapText = [];
  const entries = await readdir(dist, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.startsWith('sitemap') && entry.name.endsWith('.xml')) {
      sitemapText.push(await readFile(path.join(dist, entry.name), 'utf8'));
    }
  }
  const locs = [...sitemapText.join('\n').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const livePosts = locs.filter((url) => /\/resources\/[^/]+$/.test(new URL(url).pathname));
  const items = Array.isArray(feed.items) ? feed.items : [];
  const preview = process.env.ANVIL_PREVIEW === '1';
  if (!preview && items.length !== livePosts.length) {
    errors.push(`feed.json: ${items.length} items, live posts in sitemap: ${livePosts.length}`);
  }
  for (const item of items) {
    if (!livePosts.includes(item.url)) errors.push(`feed.json: ${item.url} is not in the sitemap`);
  }
}

const msoHref = '/platform/compliance#mso-pc-structure';
for (const file of files) {
  const rel = path.relative(dist, file);
  let page = `/${rel.split(path.sep).join('/').replace(/\.html$/, '')}`;
  if (page === '/index') page = '/';
  if (/^\/rates\/[a-z]{2}(\/\d+)?$/.test(page)) continue;
  const html = await readFile(file, 'utf8');
  const msoRe = /<a\b[^>]*href="([^"]*)"[^>]*>MSO-PC structure for telehealth<\/a>/g;
  for (const match of html.matchAll(msoRe)) {
    const href = match[1];
    // Article "On this page" entries repeat the H2 and point at that heading.
    if (href.startsWith('#') && html.includes(`id="${href.slice(1)}"`)) continue;
    if (href !== msoHref) errors.push(`${rel}: MSO-PC link href is ${href}`);
  }
}

if (errors.length > 0) {
  console.error(`SEO gate failed on ${errors.length} page check${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

console.log(`SEO gate passed (${files.length} pages, one H1, title <= 60, meta <= 155, JSON-LD parsed).`);
