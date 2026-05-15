import { db } from '$lib/server/db';
import { lineItem } from '$lib/server/db/schema/quote';
import { getMetaData } from '$lib/quote/index.remote';
import { LineItem } from './schema';
import { type InferOutput } from 'valibot';

export async function addLineItem(data: InferOutput<typeof LineItem>) {
	await getMetaData(data.quoteId);
	const unitPriceCents = data.unitPrice * 100;

	await db.insert(lineItem).values({ ...data, unitPriceCents });
}
