import { resolve } from '$app/paths';
import { form, query } from '$app/server';
import { getAuthUser } from '$lib/auth/index.remote';
import { db } from '$lib/server/db';
import { quote } from '$lib/server/db/schema/quote';
import { redirect } from '@sveltejs/kit';
import { and, desc, eq } from 'drizzle-orm';
import * as v from 'valibot';
import { Quote } from './schema';

export const createQuote = form(Quote, async ({ title, desc, currency }) => {
	const userId = (await getAuthUser()).id;
	const [{ id }] = await db
		.insert(quote)
		.values({ title, desc, currency, userId })
		.returning({ id: quote.id });

	redirect(303, resolve('/(app)/open-[quoteId]', { quoteId: id }));
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
	const quotes = await db
		.select()
		.from(quote)
		.where(eq(quote.userId, userId))
		.orderBy(desc(quote.createdAt));

	return quotes.map((quote) => ({
		...quote,
		createdAt: new Date(quote.createdAt)
	}));
});
