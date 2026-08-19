import { resolve } from '$app/paths';
import { form } from '$app/server';
import { db } from '$lib/server/db';
import { quote } from '$lib/server/db/app.schema';
import { getUser } from '$lib/user.remote';
import { redirect } from '@sveltejs/kit';
import * as v from 'valibot';

const newQuoteSchema = v.object({
	title: v.pipe(v.string(), v.trim(), v.nonEmpty('Quote title can not be empty!')),
	description: v.pipe(v.string(), v.transform(transformOptional)),
	currency: v.pipe(v.string(), v.transform(transformOptional))
});

function transformOptional(input: string) {
	if (!input) return undefined;
	return input;
}

export const newQuote = form(newQuoteSchema, async (data) => {
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

function isValidCurrency(currency?: string) {
	if (!currency) return true;

	try {
		Intl.NumberFormat(undefined, {
			style: 'currency',
			currency
		}).format(1);

		return true;
	} catch {
		return false;
	}
}
