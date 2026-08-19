import { query } from '$app/server';
import { eq } from 'drizzle-orm';
import { db } from './server/db';
import { quote } from './server/db/app.schema';
import { getUser } from './user.remote';

export const getQuotes = query(async () => {
	const user = (await getUser())!; // Handle 'undefined' case later
	return await db.select().from(quote).where(eq(quote.userId, user.id));
});
