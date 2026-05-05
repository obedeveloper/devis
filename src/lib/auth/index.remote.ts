import { resolve } from '$app/paths';
import { getRequestEvent, query } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const getUser = query(() => {
	const { locals } = getRequestEvent();
	return locals.user;
});

export const getAuthUser = query(async () => {
	const user = await getUser();
	if (!user) redirect(307, resolve('/'));
	return user;
});
