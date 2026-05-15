import { extraItem } from '$lib/server/db/schema/quote';
import type { InferOutput } from 'valibot';
import { getMetaData } from '$lib/quote/index.remote';
import { type ExtraItem } from './schema';
import { db } from '$lib/server/db';

export async function addExtraItem(data: InferOutput<typeof ExtraItem>) {
	await getMetaData(data.quoteId);
	const amountCents = data.amount * 100;

	await db.insert(extraItem).values({ ...data, amountCents });
}
