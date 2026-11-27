import { expect, test } from 'vite-plus/test';
import { capacitySummary, latestCapacity } from '../src/lib/peppi/capacity';

test('only the latest completed course run contributes seats', () => {
  const runs = [
    { code: 'C-2', startDate: 11, endDate: 20, seats: 50 },
    { code: 'C-3', startDate: 21, endDate: 30, seats: 100 },
    { code: 'C-1', startDate: 1, endDate: 10, seats: 75 },
  ];
  expect(latestCapacity('1', runs, 25)).toMatchObject({ run: 'C-2', seats: 50 });
});

test('an unpublished limit stays unknown even if an older run published one', () => {
  const unknown = latestCapacity('1', [
    { code: 'C-1', startDate: 1, endDate: 5, seats: 50 },
    { code: 'C-2', startDate: 6, endDate: 10, seats: 0 },
  ], 15);
  expect(capacitySummary([unknown])).toEqual({ total: null, coverage: 0 });
  expect(capacitySummary([unknown, { courseId: '2', run: 'D-1', ended: 12, seats: 40 }]))
    .toEqual({ total: 40, coverage: 1 });
});
