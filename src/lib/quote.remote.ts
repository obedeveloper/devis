import { command, query } from '$app/server';
import { and, desc, eq } from 'drizzle-orm';
import { db } from './server/db';
import { quote } from './server/db/app.schema';
import { getUser } from './user.remote';
import * as v from 'valibot';
import { error } from '@sveltejs/kit';

export const getQuotes = query(async () => {
	const user = (await getUser())!; // Handle 'undefined' case later
	return await db
		.select()
		.from(quote)
		.where(eq(quote.userId, user.id))
		.orderBy(desc(quote.updatedAt), desc(quote.createdAt));
});

export const deleteQuote = command(v.string(), async (id) => {
	const user = (await getUser())!; // Handle 'undefined' case later
	await db.delete(quote).where(and(eq(quote.id, id), eq(quote.userId, user.id)));
	getQuotes().refresh();
});

export const getQuoteById = query(v.string(), async (id) => {
	const user = (await getUser())!; // Handle 'undefined' case later
	const result = (
		await db
			.select()
			.from(quote)
			.where(and(eq(quote.id, id), eq(quote.userId, user.id)))
	).at(0);

	if (!result) {
		error(404, `Quote with id:${id} was not found!`);
	}

	return result;
});
