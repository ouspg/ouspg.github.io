import { expect, test } from 'vite-plus/test';
import { checkBaseline } from '../src/lib/listings/baseline';
import { collectWorks } from '../src/lib/listings/model';
import { repositories } from '../src/lib/listings/github/repositories';
import { publications } from '../src/lib/listings/oulurepo/publications';
import { searchPerson, type Item } from '../src/lib/listings/oulurepo/search';
import { theses } from '../src/lib/listings/oulurepo/theses';

const field = (value: string, place = 0) => ({ value, place });
const thesis: Item = {
  type: 'item', handle: '11111/1', name: 'Sample thesis', metadata: {
    'dc.type.publication': [field('masterThesis')],
    'dc.contributor.author': [field('Student')],
    'dc.contributor.thesisadvisor': [field('Instructor')],
    'dc.contributor.reviewer': [field('Second', 1), field('First')],
  },
};
const paper: Item = { ...thesis, handle: '11111/2', name: 'Sample publication', metadata: {
  'dc.type.publication': [field('article')],
  'dc.contributor.author': [field('Author A'), field('Author B', 1)],
  'dc.relation.doi': [field('https://doi.org/10.1234/PAPER')],
} };
const search = async () => [thesis, paper];

test('theses match the configured advisor or reviewer position', async () => {
  const empty = { instructors: [], firstReviewers: [], secondReviewers: [] };
  for (const selector of [{ instructors: ['Instructor'] }, { firstReviewers: ['First'] }, { secondReviewers: ['Second'] }]) {
    expect(await theses({ ...empty, ...selector }, search)).toHaveLength(1);
  }
  expect(await theses({ ...empty, firstReviewers: ['Second'], secondReviewers: ['First'] }, search)).toEqual([]);
});

test('publication authors match exactly and shared identifiers deduplicate across sources', async () => {
  const papers = await publications(['Author A', 'Author B'], search);
  expect(papers).toHaveLength(2);
  expect(await publications(['Author', 'Student'], search)).toEqual([]);
  const other = papers.map(work => ({ ...work, id: 'other:1', doi: '10.1234/paper' }));
  const works = await collectWorks('publications', [
    { name: 'OuluREPO', queries: { publications: async () => papers } },
    { name: 'Other', queries: { publications: async () => other } },
    { name: 'Theses only', queries: { theses: async () => { throw Error('wrong category'); } } },
  ]);
  expect(works.map(work => work.id)).toEqual(['hdl:11111/2']);
});

test('partial or malformed discovery responses fail', async () => {
  const truncated = { _embedded: { searchResult: { page: { number: 0, totalPages: 1, totalElements: 2 } } } };
  await expect(searchPerson('First', async () => Response.json(truncated))).rejects.toThrow(/Incomplete/);
  await expect(searchPerson('First', async () => Response.json({}))).rejects.toThrow();
});

test('baseline rejects removals and reordering even during explicit updates', () => {
  const old = { publications: ['a', 'b'] };
  for (const next of [['a'], ['b', 'a'], ['a', 'a', 'b']]) {
    expect(() => checkBaseline(old, { publications: next }, true)).toThrow();
  }
  const additions = { publications: ['new', 'a', 'b'] };
  expect(() => checkBaseline(old, additions)).toThrow(/listings:update/);
  expect(() => checkBaseline(old, additions, true)).not.toThrow();
});

test('GitHub fetches only listed repositories and groups live metadata by topic', async () => {
  const config = { organization: 'ouspg', repositories: ['Example'], topics: ['learning', 'privacy', 'web'] };
  const repo = { name: 'Example', owner: { login: 'ouspg' }, description: 'API description',
    html_url: 'https://github.com/ouspg/Example', topics: ['learning', 'privacy'] };
  const result = await repositories(config, async url => {
    expect(String(url)).toBe('https://api.github.com/repos/ouspg/Example');
    return Response.json(repo);
  });
  expect(result.selected[0]?.description).toBe('API description');
  expect(result.byTopic).toEqual({ learning: result.selected, privacy: result.selected, web: [] });
  await expect(repositories(config, async () => new Response(null, { status: 404 }))).rejects.toThrow(/ouspg\/Example/);
});
