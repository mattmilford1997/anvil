import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './site.config.mjs';

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/contact/success') && !page.includes('/legal/'),
    }),
  ],
  markdown: { shikiConfig: { theme: 'github-light' } },
});
