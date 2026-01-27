import { getRequestEvent, query } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const getUser = query(async () => {
	const { locals } = getRequestEvent();
	const { user } = locals;
	return { user };
});

export const getAuthenticatedUser = query(async () => {
	const { user } = await getUser();
	if (!user) redirect(302, '/auth');

	return { user };
});
