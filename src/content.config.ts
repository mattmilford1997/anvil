import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const resources = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/resources' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().max(200),
    summary: z.array(z.string()).default([]),
    author: z.string().default('matt-milford'),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['Blog', 'Report', 'Guide', 'News']).default('Blog'),
    icp: z.array(z.enum(['A', 'B', 'C', 'D', 'E'])).default([]),
    pillar: z.enum(['speed', 'ownership', 'transparency', 'risk', 'depth', 'developer']).optional(),
    keyword: z.string().optional(),
    tool: z
      .enum(['calculator', 'rate-lookup', 'coverage-map', 'idle-counter', 'timeline', 'readiness-checklist', 'eligibility', 'none'])
      .default('none'),
    faq,
    related: z.array(z.string()).default([]),
    ogImage: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const customers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/customers' }),
  schema: z.object({
    company: z.string(),
    headline: z.string(), // one-line result; only publish if true
    specialty: z.string(),
    careModel: z.enum(['Virtual', 'Hybrid', 'In-person', 'In-home', 'School-based']),
    states: z.array(z.string()).default([]),
    payerMix: z.array(z.string()).default([]),
    firstParty: z.boolean().default(false), // operated by the Anvil / Arche team
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).max(3).default([]),
    quote: z.string().optional(),
    quoteAuthor: z.string().optional(),
    quoteTitle: z.string().optional(),
    publishDate: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { resources, customers };
