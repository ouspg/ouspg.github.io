import { isThesis, matches, toWork, type Search } from './search.ts';

export async function publications(authors: string[], search: Search) {
  const records = await Promise.all(authors.map(async name => (await search(name)).filter(item =>
    !isThesis(item) && !!item.metadata['dc.type.publication']?.length && matches(item, 'dc.contributor.author', name))));
  return records.flat().map(toWork);
}
