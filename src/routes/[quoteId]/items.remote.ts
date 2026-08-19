import { form, getRequestEvent, query } from '$app/server';
import { db } from '$lib/server/db';
import { lineItem } from '$lib/server/db/app.schema';
import { transformOptional } from '$lib/utils';
import { eq } from 'drizzle-orm';
import * as v from 'valibot';

// ⚠️ Remember: authentication and authorization

const newLineItemSchema = v.object({
	description: v.pipe(v.string(), v.trim(), v.nonEmpty()),
	quantity: v.optional(v.number()),
	unit: v.pipe(v.string(), v.trim(), v.transform(transformOptional)),
	unitPrice: v.optional(v.number())
});

export const newLineItem = form(newLineItemSchema, async (data) => {
	const { params } = getRequestEvent();
	await db.insert(lineItem).values({ ...data, quoteId: params.quoteId! });
});

export const getLineItems = query(v.string(), async (id) => {
	return await db.select().from(lineItem).where(eq(lineItem.quoteId, id));
});
