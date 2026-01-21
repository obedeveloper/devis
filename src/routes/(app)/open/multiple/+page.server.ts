import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = async ({ locals, url }) => {
  const userID = new ObjectId(locals.user?.id);
  const estimatesIDs = url.searchParams.get('estimates')?.split(',');

  if (!userID) error(401, 'Un Authorized');

  const allEstimates = await db
    .collection('estimates')
    .find({ userID })
    .toArray();

  const estimates = allEstimates.filter((value) =>
    estimatesIDs?.includes(String(value._id)),
  );

  if (!estimates.length) error(404, 'Not Found');

  return {
    estimates: JSON.parse(JSON.stringify(estimates)),
    ids: estimates.map((est) => est._id.toString()),
  };
};
