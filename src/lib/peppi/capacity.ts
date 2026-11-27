import * as z from 'zod/mini';

const runSchema = z.array(z.object({
  code: z.string(),
  startDate: z.nullable(z.number()),
  endDate: z.nullable(z.number()),
  seats: z.nullable(z.int()),
}));

export interface CourseCapacity {
  courseId: string;
  run: string | null;
  ended: number | null;
  seats: number | null;
}

export function latestCapacity(courseId: string, records: unknown, asOf: number): CourseCapacity {
  const completed = runSchema.parse(records).filter(run => run.endDate !== null && run.endDate < asOf);
  completed.sort((a, b) => (b.endDate ?? 0) - (a.endDate ?? 0)
    || (b.startDate ?? 0) - (a.startDate ?? 0)
    || b.code.localeCompare(a.code));
  const latest = completed[0];
  return {
    courseId,
    run: latest?.code ?? null,
    ended: latest?.endDate ?? null,
    seats: latest?.seats && latest.seats > 0 ? latest.seats : null,
  };
}

export function capacitySummary(rows: CourseCapacity[]) {
  const reported = rows.filter(row => row.seats !== null);
  return {
    total: reported.length ? reported.reduce((sum, row) => sum + (row.seats ?? 0), 0) : null,
    coverage: reported.length,
  };
}

export async function fetchCapacity(id: string, period: string, now: number) {
  const url = new URL(`https://opasbe.peppi.oulu.fi/api/realizations/past/course/${id}`);
  url.searchParams.set('period', period);
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), referrerPolicy: 'no-referrer' });
  if (!response.ok) throw new Error(`Peppi course ${id}: HTTP ${response.status}`);
  return latestCapacity(id, await response.json(), now);
}
