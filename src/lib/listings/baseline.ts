import { z } from 'zod';

const manifest = z.record(z.string(), z.array(z.string().min(1)));
export function checkBaseline(previous: unknown, current: Record<string, string[]>, acceptAdditions = false) {
  const baseline = manifest.parse(previous);
  for (const key of new Set([...Object.keys(baseline), ...Object.keys(current)])) {
    const old = baseline[key] ?? [];
    const next = current[key];
    if (!next) throw new Error(`Listing removed: ${key}`);
    const positions = new Map(next.map((id, index) => [id, index]));
    if (positions.size !== next.length || new Set(old).size !== old.length) throw new Error(`Duplicate IDs in ${key}`);
    let last = -1;
    for (const id of old) {
      const position = positions.get(id);
      if (position === undefined) throw new Error(`${key}: missing ${id}`);
      if (position <= last) throw new Error(`${key}: order changed at ${id}`);
      last = position;
    }
    if (!acceptAdditions && (old.length !== next.length || !(key in baseline))) {
      throw new Error(`New entries in ${key}. Run vp run listings:update and review the baseline diff.`);
    }
  }
}
