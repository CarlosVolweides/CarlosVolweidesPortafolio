// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://carlosvolweides.vercel.app',
  output: 'server',
  // edgeMiddleware puts src/middleware.ts in front of the prerendered pages.
  // Without it the locale redirect never runs in production.
  adapter: vercel({ edgeMiddleware: true }),
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: { es: 'es-VE', en: 'en-US', pt: 'pt-BR' },
      },
    }),
    react(),
  ],
});
