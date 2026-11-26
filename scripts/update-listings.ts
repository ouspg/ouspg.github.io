import { rename, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import baseline from '../src/data/listings-baseline.json' with { type: 'json' };
import { loadListings, listingIds } from '../src/lib/listings/index.ts';
import { checkBaseline } from '../src/lib/listings/baseline.ts';

const ids = listingIds(await loadListings());
checkBaseline(baseline, ids, true);
const target = new URL('../src/data/listings-baseline.json', import.meta.url);
const temporary = new URL(target.href + '.' + randomUUID());
await writeFile(temporary, JSON.stringify(ids, null, 2) + '\n');
await rename(temporary, target);
