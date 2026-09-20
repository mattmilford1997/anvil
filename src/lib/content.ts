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

/** A post only if getPosts would include it (live in prod; all posts in dev/preview). Use this before linking from product pages. */
export async function getLivePost(id: string): Promise<Post | undefined> {
  return (await getPosts()).find((p) => p.id === id);
}

/** Held October 2026 posts, for hub teasers that must not claim a live article. */
export async function getUpcomingOctoberPosts(): Promise<Post[]> {
  const all = await getCollection('resources');
  return all
    .filter((p) => {
      const hold = holdReason(p);
      const d = p.data.publishDate;
      return !!hold && d.getUTCFullYear() === 2026 && d.getUTCMonth() === 9;
    })
    .sort((a, b) => a.data.publishDate.valueOf() - b.data.publishDate.valueOf());
}

/** Product and wedge pages articles may list in `related`. Keys are site paths, not resource slugs. */
export const relatedPages: Record<string, { title: string; excerpt: string }> = {
  '/platform': {
    title: 'Insurance operations platform: rent, then own',
    excerpt: 'Payer contracting, credentialing, RCM, eligibility, and compliance. Rent, then own.',
  },
  '/platform/contracting': {
    title: 'Payer contracting for telehealth. Contracts in your name.',
    excerpt: 'Commercial and Medicaid payer enrollment, with contracts your entity holds.',
  },
  '/platform/credentialing': {
    title: 'Telehealth credentialing in weeks, tracked to the day',
    excerpt: 'Roster-add for speed, then full credentialing under your own PC.',
  },
  '/platform/compliance': {
    title: 'CPOM and AKS compliance for telehealth billing',
    excerpt: 'MSO-PC structure, AKS safe harbor, and state corporate practice of medicine.',
  },
  '/own-your-contracts': {
    title: 'Own your contracts vs network rental',
    excerpt: 'Launch on a rented PC, then migrate volume to contracts your entity holds.',
  },
  '/solutions/virtual-care': {
    title: 'Virtual care: cash-pay to in-network in every state',
    excerpt: 'Accept insurance as a virtual care company. Launch on rental, own the contracts.',
  },
  '/solutions/behavioral-health': {
    title: 'Behavioral health payer contracting and credentialing',
    excerpt: 'Medicaid MCO panels, ABA credentialing, psychiatry credentialing, and collaborative care billing.',
  },
  '/solutions/switching': {
    title: 'Switching from a network rental vendor',
    excerpt: 'Leave rental without a revenue gap. Form your PC, land contracts, then give notice.',
  },
  '/compare/bridge': {
    title: 'Bridge alternative: compare Anvil vs Bridge',
    excerpt: 'Bridge is network rental. Anvil migrates payer contracts into your name.',
  },
  '/pricing': {
    title: 'Anvil pricing: platform fee and PC costs, published',
    excerpt: 'Published telehealth billing platform pricing. Model build vs partner on your numbers.',
  },
};

export type RelatedItem = {
  href: string;
  title: string;
  excerpt: string;
  post?: Post;
};

/**
 * Resolve `related` frontmatter: resource slugs (only if getPosts would publish them) or site paths.
 * Unpublished slugs are omitted in production so related CTAs never 404.
 */
export function resolveRelated(refs: string[], posts: Post[]): RelatedItem[] {
  const items: RelatedItem[] = [];
  for (const ref of refs) {
    if (ref.startsWith('/')) {
      const page = relatedPages[ref];
      if (page) items.push({ href: ref, ...page });
      continue;
    }
    const post = posts.find((p) => p.id === ref);
    if (post) items.push({ href: `/resources/${post.id}`, title: post.data.title, excerpt: post.data.excerpt, post });
  }
  return items;
}
