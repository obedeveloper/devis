import { query } from '$app/server';
import { getMetaData } from '$lib/quote/index.remote';
import { db } from '$lib/server/db';
import { extraItem } from '$lib/server/db/schema/quote';
import * as v from 'valibot';
import { eq } from 'drizzle-orm';

export const getExtraItems = query(v.string(), async (quoteId) => {
	await getMetaData(quoteId);
	return await db.select().from(extraItem).where(eq(extraItem.quoteId, quoteId));
});
