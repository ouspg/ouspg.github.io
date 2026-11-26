## User requests

Treat questions as requests for an answer, requiring careful analysis of pros and cons. Make changes only when the user explicitly authorizes them. If permission is unclear, ask before editing.

## Development

Use [Vite+](https://viteplus.dev/llms.txt) for local development.

Core commands from above shortly:
- Install dependencies with `vp install`.
- Start Astro in the background with `vp run dev --background`.
- Manage the server with `vp run dev status`, `vp run dev logs`, and `vp run dev stop`.
- Build with `vp run build` and preview with `vp run preview`.
- Check TypeScript with `vp run typecheck`.

Configure Vite in `astro.config.ts`. MDX uses Sätteri.

## Documentation

See the [Astro documentation](https://docs.astro.build) and consult the relevant guides before making changes.

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
