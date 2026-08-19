import { command, query } from '$app/server';
import { and, desc, eq } from 'drizzle-orm';
import { db } from './server/db';
import { quote } from './server/db/app.schema';
import { getUser } from './user.remote';
import * as v from 'valibot';

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
