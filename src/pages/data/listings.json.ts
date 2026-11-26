import { getListings } from '../../lib/listings/checked';

export async function GET() {
  return Response.json(await getListings());
}
