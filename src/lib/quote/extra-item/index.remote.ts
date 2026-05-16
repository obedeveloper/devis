import { command, query } from '$app/server';
import { getMetaData } from '$lib/quote/index.remote';
import { db } from '$lib/server/db';
import { extraItem } from '$lib/server/db/schema/quote';
import * as v from 'valibot';
import { eq } from 'drizzle-orm';

export const getExtraItems = query(v.string(), async (quoteId) => {
	await getMetaData(quoteId);
	return await db.select().from(extraItem).where(eq(extraItem.quoteId, quoteId));
});

export const deleteExtraItem = command(
	v.object({ itemId: v.string(), quoteId: v.string() }),
	async ({ itemId, quoteId }) => {
		await getMetaData(quoteId);
		await db.delete(extraItem).where(eq(extraItem.id, itemId));

		getExtraItems(quoteId).refresh();
	}
);
