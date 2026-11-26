# Astro Starter Kit!

## Build-time listings

The static build writes `/data/listings.json`. Configure OuluREPO names separately for publication authors, thesis instructors, first reviewers and second reviewers in `src/lib/listings/config.ts`. Use the repository’s spelling, including accents and surname order. Multiple names in a category match any of those names.

Each academic source implements the query categories it supports. Sources are consulted in priority order. Matching handles or normalized DOIs identify duplicate works. Works without a common identifier stay separate. Results are sorted by issue date, newest first, with undated works last and stable IDs breaking ties.

The GitHub repository allowlist and topic list both start empty. Add repository names and topic names in the same config file. The build fetches descriptions, URLs and topics directly from the configured organization. A repository may appear in several topic lists.

When new listings arrive, run `vp run listings:update`, review the ID changes in `src/data/listings-baseline.json`, and commit them with the site. This makes the baseline available to clean CI builds. Both the build and the update command reject missing entries or changes in their relative order. An intentional removal or reordering requires a reviewed edit to the baseline.
