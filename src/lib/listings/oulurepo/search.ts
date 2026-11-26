import { z } from 'zod';
import type { Work } from '../model.ts';

const field = z.object({ value: z.string(), place: z.number().int() });
const item = z.object({
  type: z.literal('item'),
  handle: z.string().regex(/^\d+\/\d+$/),
  name: z.string().min(1),
  metadata: z.record(z.string(), z.array(field)),
});
export type Item = z.infer<typeof item>;

const result = z.object({
  page: z.object({ number: z.number().int(), totalPages: z.number().int().nonnegative(), totalElements: z.number().int().nonnegative() }),
  _embedded: z.object({ objects: z.array(z.object({ _embedded: z.object({ indexableObject: item }) })) }).optional(),
});

export async function searchPerson(name: string, request: typeof fetch = fetch): Promise<Item[]> {
  const items = new Map<string, Item>();
  const url = new URL('https://oulurepo.oulu.fi/server/api/discover/search/objects');
  url.searchParams.set('query', '"' + name.replace(/["\\]/g, '\\$&') + '"');
  url.searchParams.set('dsoType', 'item');
  url.searchParams.set('size', '50');
  let total: number | undefined;
  for (let page = 0; ; page++) {
    url.searchParams.set('page', String(page));
    const response = await request(url, { signal: AbortSignal.timeout(45000) });
    if (!response.ok) throw new Error(`OuluREPO search for ${name}: HTTP ${response.status}`);
    const envelope = z.object({ _embedded: z.object({ searchResult: result }) }).parse(await response.json());
    const { page: info, _embedded } = envelope._embedded.searchResult;
    if (info.number !== page || (total !== undefined && total !== info.totalElements)) {
      throw new Error(`OuluREPO pagination changed for ${name}`);
    }
    total = info.totalElements;
    for (const hit of _embedded?.objects ?? []) {
      const record = hit._embedded.indexableObject;
      if (items.has(record.handle)) throw new Error(`Repeated OuluREPO hit: ${record.handle}`);
      items.set(record.handle, record);
    }
    if (page + 1 >= info.totalPages) break;
  }
  if (items.size !== total) throw new Error(`Incomplete OuluREPO search for ${name}`);
  return [...items.values()];
}

export type Search = (name: string) => Promise<Item[]>;
export function values(item: Item, key: string) {
  return [...(item.metadata[key] ?? [])].sort((a, b) => a.place - b.place).map(v => v.value);
}
export function matches(item: Item, key: string, name: string, place?: number) {
  return item.metadata[key]?.some(v => (place === undefined || v.place === place)
    && v.value.trim().normalize().toLowerCase() === name.trim().normalize().toLowerCase()) ?? false;
}
export function isThesis(item: Item) {
  return !!item.metadata['dc.type.thesis']?.length ||
    values(item, 'dc.type.publication').some(type => /thesis/i.test(type));
}
export function toWork(item: Item): Work {
  return {
    id: 'hdl:' + item.handle, title: item.name, url: 'https://oulurepo.oulu.fi/handle/' + item.handle,
    authors: values(item, 'dc.contributor.author'), issued: values(item, 'dc.date.issued')[0] ?? null,
    doi: values(item, 'dc.relation.doi')[0] ?? null,
  };
}
