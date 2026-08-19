import { command, form, getRequestEvent, query } from '$app/server';
import { db } from '$lib/server/db';
import { lineItem, quote } from '$lib/server/db/app.schema';
import { getAuthUser } from '$lib/user.remote';
import { transformOptional } from '$lib/utils';
import { and, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';

async function verifyQuoteOwnership(quoteId: string) {
	const user = await getAuthUser();
	const result = (
		await db
			.select()
			.from(quote)
			.where(and(eq(quote.id, quoteId), eq(quote.userId, user.id)))
	).at(0);

	if (!result) {
		error(404, 'Quote not found');
	}

	return result;
}

const newLineItemSchema = v.object({
	description: v.pipe(v.string(), v.trim(), v.nonEmpty()),
	quantity: v.optional(v.number()),
	unit: v.pipe(v.string(), v.trim(), v.transform(transformOptional)),
	unitPrice: v.optional(v.number())
});

export const newLineItem = form(newLineItemSchema, async (data) => {
	const { params } = getRequestEvent();
	await verifyQuoteOwnership(params.quoteId!);
	await db.insert(lineItem).values({ ...data, quoteId: params.quoteId! });
});

export const getLineItems = query(v.string(), async (id) => {
	await verifyQuoteOwnership(id);
	return (await db.select().from(lineItem).where(eq(lineItem.quoteId, id))).toReversed();
});

export const deleteLineItem = command(v.string(), async (id) => {
	const item = (
		await db.select().from(lineItem).where(eq(lineItem.id, id))
	).at(0);

	if (!item) {
		error(404, 'Line item not found');
	}

	await verifyQuoteOwnership(item.quoteId);
	await db.delete(lineItem).where(eq(lineItem.id, id));
	getLineItems(item.quoteId).refresh();
});
