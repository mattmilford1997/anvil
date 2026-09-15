import { getCollection, type CollectionEntry } from 'astro:content';
import { isProd } from './seo';

export type Post = CollectionEntry<'resources'>;

/** Build time. Netlify rebuilds on a schedule (see .github/workflows/scheduled-publish.yml), so future posts appear on their date. */
const now = new Date();
/** ANVIL_PREVIEW=1 (set for Netlify deploy previews and branch deploys in netlify.toml) renders every post, gates ignored. */
const preview = process.env.ANVIL_PREVIEW === '1';

/** Why a post is held back from production, or null if it is publishable. */
export function holdReason(p: Post): string | null {
  if (p.data.draft) return 'draft';
  if (p.data.dataReview === 'pending') return 'data review pending';
  if (p.data.publishDate > now) return `scheduled for ${p.data.publishDate.toISOString().slice(0, 10)}`;
  return null;
}

/** Posts to render. Production applies all gates; dev shows everything so drafts and scheduled posts can be reviewed. */
export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('resources');
  const list = isProd && !preview ? all.filter((p) => !holdReason(p)) : all;
  return list.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
