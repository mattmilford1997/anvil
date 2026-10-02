import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './site.config.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // /docs and /customers are placeholders until an API reference and signed-off case studies exist.
      filter: (page) => !page.includes('/contact/success') && !page.includes('/legal/') && !page.includes('/docs') && !page.includes('/customers'),
    }),
  ],
  markdown: { shikiConfig: { theme: 'github-light' } },
});
