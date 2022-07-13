import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/edge';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  adapter: vercel(),
});
