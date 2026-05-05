import { resolve } from '$app/paths';
import { command, form, query } from '$app/server';
import { getAuthUser } from '$lib/auth/index.remote';
import { db } from '$lib/server/db';
import { lineItem, quote } from '$lib/server/db/schema/quote';
import { redirect } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';
import * as v from 'valibot';
import { LineItem, Quote } from './schema';

export const createQuote = form(Quote, async ({ title, desc }) => {
	const userId = (await getAuthUser()).id;
	const [{ id }] = await db
		.insert(quote)
		.values({ title, desc, userId })
		.returning({ id: quote.id });

	redirect(303, resolve('/open-[quoteId]', { quoteId: id }));
});

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

export const getMetaData = query(v.string(), async (quoteId) => {
	const userId = (await getAuthUser()).id;
	const [metaData] = await db
		.select()
		.from(quote)
		.where(and(eq(quote.id, quoteId), eq(quote.userId, userId)));

	if (!metaData) {
		redirect(307, resolve('/dashboard'));
	}

	return metaData;
});

export const getQuotes = query(async () => {
	const userId = (await getAuthUser()).id;
	const quotes = await db.select().from(quote).where(eq(quote.userId, userId));

	return quotes
		.map((quote) => ({
			...quote,
			createdAt: new Date(quote.createdAt)
		}))
		.reverse();
});
