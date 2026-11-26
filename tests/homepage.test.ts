import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vite-plus/test';
import Homepage from '../src/pages/index.astro';

test('the homepage renders a document with a primary heading', async () => {
  const container = await AstroContainer.create();
  const html = await container.renderToString(Homepage);

  expect(html).toMatch(/<html\b[^>]*\blang="en"/);
  expect(html).toMatch(/<h1(?:\s[^>]*)?>\s*\S[\s\S]*?<\/h1>/);
});
