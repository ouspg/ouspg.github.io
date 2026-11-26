import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [mdx({ processor: satteri() })],
  vite: {
    clearScreen: false,
  },
});
