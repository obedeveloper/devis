import { db } from '$lib/db';
import type { Estimate } from '$lib/utilities/types';
import { ObjectId } from 'mongodb';

export const load = async ({ locals }) => {
  const userID = locals.user?.id as string;

  const estimatesArray = await db
    .collection('estimates')
    .find({ userID: new ObjectId(userID) })
    .toArray();

  const estimates = JSON.parse(JSON.stringify(estimatesArray)) as
    | Estimate[]
    | null;

  return { estimates };
};
