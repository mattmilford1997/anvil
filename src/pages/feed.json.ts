import type { APIRoute } from 'astro';
import { getPosts, holdReason } from '../lib/content';
import { lastmodFor } from '../data/lastmod.mjs';
import { absolute } from '../lib/seo';

export const prerender = true;

const description = 'Insurance ops guides for care companies: accepting insurance, credentialing, and payer contracting, with frameworks and cost tables for founders.';

export const GET: APIRoute = async () => {
  const posts = (await getPosts())
    .filter((post) => !holdReason(post))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
  const items = posts.map((post) => {
    const path = `/resources/${post.id}`;
    const url = absolute(path);
    return {
      id: url,
      url,
      title: post.data.title,
      summary: post.data.excerpt,
      date_published: post.data.publishDate.toISOString(),
      date_modified: `${lastmodFor(path)}T00:00:00Z`,
    };
  });
  const body = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Anvil Resources',
    home_page_url: 'https://www.anvilcontracts.com/resources',
    feed_url: 'https://www.anvilcontracts.com/feed.json',
    description,
    language: 'en-US',
    items,
  };
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
};
