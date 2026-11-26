import baseline from '../../data/listings-baseline.json';
import { checkBaseline } from './baseline';
import { listingIds, loadListings } from './index';

let snapshot: ReturnType<typeof loadListings> | undefined;
export function getListings() {
  snapshot ??= loadListings().then(data => {
    checkBaseline(baseline, listingIds(data));
    return data;
  }).catch((error: unknown) => {
    snapshot = undefined;
    throw error;
  });
  return snapshot;
}
