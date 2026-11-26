import type { ThesisDegree } from '../model.ts';
import { isThesis, matches, toWork, values, type Item, type Search } from './search.ts';

interface ThesisPeople {
  instructors: string[];
  firstReviewers: string[];
  secondReviewers: string[];
}

function degreeOf(item: Item): ThesisDegree {
  const types = values(item, 'dc.type.publication');
  for (const type of types) {
    switch (type) {
      case 'bachelorThesis': return 'bachelor';
      case 'masterThesis': return 'master';
      case 'doctoralThesis': return 'phd';
    }
  }
  throw new Error(`Unknown thesis degree for ${item.handle}: ${types.join(', ')}`);
}

export async function theses(people: ThesisPeople, search: Search) {
  const selectors = [
    ...people.instructors.map(name => ({ name, key: 'dc.contributor.thesisadvisor', place: undefined })),
    ...people.firstReviewers.map(name => ({ name, key: 'dc.contributor.reviewer', place: 0 })),
    ...people.secondReviewers.map(name => ({ name, key: 'dc.contributor.reviewer', place: 1 })),
  ];
  const records = await Promise.all(selectors.map(async ({ name, key, place }) =>
    (await search(name)).filter(item => isThesis(item) && matches(item, key, name, place))));
  return records.flat().map(item => ({
    ...toWork(item),
    degree: degreeOf(item),
    supervisors: people.instructors.filter(name => matches(item, 'dc.contributor.thesisadvisor', name)),
  }));
}
