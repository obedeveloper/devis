import { query } from '$app/server';
import { db } from '$lib/db';
import { user } from '$lib/db/schema';
import { count, desc } from 'drizzle-orm';

export const getUsersStats = query(async () => {
	const { totalUsers } = (await db.select({ totalUsers: count() }).from(user))[0];
	const sampleImages = await db
		.select({ url: user.image })
		.from(user)
		.orderBy(desc(user.createdAt))
		.limit(3);

	return { totalUsers, sampleImages };
});
