import { command, query } from '$app/server';
import { getMetaData } from '$lib/quote/index.remote';
import { db } from '$lib/server/db';
import { lineItem } from '$lib/server/db/schema/quote';
import { LineItem } from './schema';
import * as v from 'valibot';
import { eq } from 'drizzle-orm';

export const addLineItem = command(LineItem, async (arg) => {
	const { desc, quantity, unit, unitPrice, quoteId } = arg;
	await getMetaData(quoteId);
	const unitPriceCents = unitPrice * 100;

	await db.insert(lineItem).values({ desc, quantity, unit, unitPriceCents, quoteId });
	getLineItems(quoteId).refresh();
});

export const getLineItems = query(v.string(), async (quoteId) => {
	await getMetaData(quoteId);
	return await db.select().from(lineItem).where(eq(lineItem.quoteId, quoteId));
});
