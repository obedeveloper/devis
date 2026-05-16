import { query, command } from '$app/server';
import { getMetaData } from '$lib/quote/index.remote';
import { db } from '$lib/server/db';
import { lineItem } from '$lib/server/db/schema/quote';
import * as v from 'valibot';
import { eq } from 'drizzle-orm';

export const getLineItems = query(v.string(), async (quoteId) => {
	await getMetaData(quoteId);
	return await db.select().from(lineItem).where(eq(lineItem.quoteId, quoteId));
});

export const deleteLineItem = command(
	v.object({ itemId: v.string(), quoteId: v.string() }),
	async ({ itemId, quoteId }) => {
		await getMetaData(quoteId);
		await db.delete(lineItem).where(eq(lineItem.id, itemId));

		getLineItems(quoteId).refresh();
	}
);
