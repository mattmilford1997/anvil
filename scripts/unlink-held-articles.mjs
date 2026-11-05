// Production builds hold back draft, data-review-pending, and scheduled articles (see holdReason in
// src/lib/content.ts), so their pages are not in dist. Any link to one, from article bodies, related
// lists, or product pages, would 404. Unwrap those links to plain text. Preview builds render every
// article, so nothing is unwrapped there. The link comes back on its own once the article publishes.
import { readdir, readFile, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(full));
    else if (e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const exists = async (p) => access(p).then(() => true, () => false);
const re = /<a\b[^>]*\bhref="\/resources\/([^"\/#?]+)(?:[#?][^"]*)?"[^>]*>([\s\S]*?)<\/a>/g;

let count = 0;
for (const file of await walk(dist)) {
  const html = await readFile(file, 'utf8');
  const ids = new Set([...html.matchAll(re)].map((m) => m[1]));
  if (!ids.size) continue;
  const missing = new Set();
  for (const id of ids) if (!(await exists(path.join(dist, 'resources', `${id}.html`)))) missing.add(id);
  if (!missing.size) continue;
  const out = html.replace(re, (all, id, inner) => (missing.has(id) ? (count++, inner) : all));
  await writeFile(file, out);
  console.log(`unlinked ${[...missing].join(', ')} in ${path.relative(dist, file)}`);
}
console.log(`unlink-held-articles: ${count} link(s) to unpublished articles unwrapped.`);
