import { resolve } from '$app/paths';
import { form, getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { quote } from '$lib/server/db/app.schema';
import { quoteSchema } from '$lib/quoteSchema';
import { getAuthUser } from '$lib/user.remote';
import { getQuotes, getQuoteById } from '$lib/quote.remote';
import { and, eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';

export const editQuote = form(quoteSchema, async (data) => {
	const { params } = getRequestEvent();
	const quoteId = params.quoteId!;
	const user = await getAuthUser();

	const result = (
		await db
			.select()
			.from(quote)
			.where(and(eq(quote.id, quoteId), eq(quote.userId, user.id)))
	).at(0);

	if (!result) {
		redirect(303, resolve('/'));
	}

	await db
		.update(quote)
		.set({ ...data, updatedAt: Date.now() })
		.where(and(eq(quote.id, quoteId), eq(quote.userId, user.id)));

	getQuotes().refresh();
	getQuoteById(quoteId).refresh();
	redirect(303, resolve('/[quoteId]', { quoteId }));
});
