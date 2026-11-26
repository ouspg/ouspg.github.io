import { z } from 'zod';

export const thesisDegrees = ['bachelor', 'master', 'phd'] as const;
export type ThesisDegree = typeof thesisDegrees[number];

export const workSchema = z.object({
  id: z.string().min(1),
  title: z.string().trim().min(1),
  url: z.httpUrl(),
  issued: z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/).nullable(),
  authors: z.array(z.string().min(1)),
  degree: z.enum(thesisDegrees).optional(),
  supervisors: z.array(z.string().min(1)).optional(),
  doi: z.string().trim().min(1).nullable(),
});
export type Work = z.infer<typeof workSchema>;
export type Category = 'publications' | 'theses';

// The keys a provider implements are its supported query categories.
export interface WorkSource {
  name: string;
  queries: Partial<Record<Category, () => Promise<Work[]>>>;
}

export const compareText = (a: string, b: string) => a < b ? -1 : a > b ? 1 : 0;

export async function collectWorks(category: Category, sources: WorkSource[]) {
  const seenIds = new Set<string>();
  const seenDois = new Set<string>();
  const works: Work[] = [];
  for (const source of sources) {
    const query = source.queries[category];
    if (!query) continue;
    const records = workSchema.array().parse(await query());
    records.sort((a, b) => compareText(a.id, b.id));
    for (const work of records) {
      const doi = work.doi?.replace(/^(?:https?:\/\/(?:dx\.)?doi\.org\/|doi:\s*)/i, '').toLowerCase();
      const duplicate = seenIds.has(work.id) || (!!doi && seenDois.has(doi));
      seenIds.add(work.id);
      if (doi) seenDois.add(doi);
      if (!duplicate) works.push(work);
    }
  }
  return works.sort((a, b) => compareText(b.issued ?? '', a.issued ?? '') || compareText(a.id, b.id));
}
