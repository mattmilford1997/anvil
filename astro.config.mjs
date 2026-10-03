import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './site.config.mjs';
import { lastmodFor } from './src/data/lastmod.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // /docs and /customers are placeholders until an API reference and signed-off case studies exist.
      filter: (page) => !page.includes('/contact/success') && !page.includes('/legal/') && !page.includes('/docs') && !page.includes('/customers'),
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const d = lastmodFor(path);
        if (d) item.lastmod = d;
        return item;
      },
    }),
  ],
  markdown: { shikiConfig: { theme: 'github-light' } },
});
