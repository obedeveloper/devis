import { form, query } from '$app/server';
import { getMetaData } from '$lib/quote/index.remote';
import { db } from '$lib/server/db';
import { lineItem } from '$lib/server/db/schema/quote';
import { LineItem } from './schema';
import * as v from 'valibot';
import { eq } from 'drizzle-orm';

export const addLineItem = form(LineItem, async (data) => {
	await getMetaData(data.quoteId);
	const unitPriceCents = data.unitPrice * 100;

	await db.insert(lineItem).values({ ...data, unitPriceCents });
});

export const getLineItems = query(v.string(), async (quoteId) => {
	await getMetaData(quoteId);
	return await db.select().from(lineItem).where(eq(lineItem.quoteId, quoteId));
});
