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
}

if (errors.length > 0) {
  console.error(`SEO gate failed on ${errors.length} page check${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

console.log(`SEO gate passed (${files.length} pages, one H1, title <= 60, meta <= 155).`);
