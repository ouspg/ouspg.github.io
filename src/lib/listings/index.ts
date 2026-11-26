import { github, people } from './config.ts';
import { collectWorks, type WorkSource } from './model.ts';
import { publications } from './oulurepo/publications.ts';
import { searchPerson } from './oulurepo/search.ts';
import { theses } from './oulurepo/theses.ts';
import { repositories } from './github/repositories.ts';

export async function loadListings() {
  const searches = new Map<string, ReturnType<typeof searchPerson>>();
  function search(name: string) {
    const result = searches.get(name) ?? searchPerson(name);
    searches.set(name, result);
    return result;
  }
  const sources: WorkSource[] = [{
    name: 'OuluREPO',
    queries: {
      publications: () => publications(people.authors, search),
      theses: () => theses(people, search),
    },
  }];
  const [papers, dissertations, repos] = await Promise.all([
    collectWorks('publications', sources), collectWorks('theses', sources), repositories(github),
  ]);
  return { publications: papers, theses: dissertations, repositories: repos };
}

export function listingIds(data: Awaited<ReturnType<typeof loadListings>>) {
  const ids = (rows: { id: string }[]) => rows.map(row => row.id);
  return {
    publications: ids(data.publications), theses: ids(data.theses),
    supervisedTheses: ids(data.theses.filter(work => work.supervisors?.length)),
    repositories: ids(data.repositories.selected),
    ...Object.fromEntries(Object.entries(data.repositories.byTopic).map(([topic, rows]) => ['topic:' + topic, ids(rows)])),
  };
}
