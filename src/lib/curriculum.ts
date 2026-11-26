const academicCalendar = new Intl.DateTimeFormat('en', {
  timeZone: 'Europe/Helsinki',
  month: 'numeric',
  year: 'numeric',
});

export function curriculumPeriod(date = new Date()): string {
  const parts = academicCalendar.formatToParts(date);
  const year = Number(parts.find(part => part.type === 'year')?.value);
  const month = Number(parts.find(part => part.type === 'month')?.value);
  const start = month < 8 ? year - 1 : year;
  return `${start}-${start + 1}`;
}
