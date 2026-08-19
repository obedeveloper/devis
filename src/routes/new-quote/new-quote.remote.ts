import { resolve } from '$app/paths';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { quote } from '$lib/server/db/app.schema';
import { isValidCurrency, quoteSchema } from '$lib/quoteSchema';
import { getUser } from '$lib/user.remote';
import { redirect } from '@sveltejs/kit';

export const newQuote = form(quoteSchema, async (data) => {
	const userId = (await getUser())?.id;

	if (!userId) {
		redirect(303, resolve('/'));
	}

	if (!isValidCurrency(data.currency)) {
		data.currency = undefined;
	}

	const { quoteId } = (
		await db
			.insert(quote)
			.values({ ...data, userId })
			.returning({ quoteId: quote.id })
	)[0];
	redirect(303, resolve('/[quoteId]', { quoteId }));
});
