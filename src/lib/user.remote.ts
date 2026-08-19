import { getRequestEvent, query } from '$app/server';
import { error } from '@sveltejs/kit';

export const getUser = query(() => {
	const { locals } = getRequestEvent();
	return locals.user;
});

export const getAuthUser = query(async () => {
	const user = await getUser();

	if (!user) {
		error(401, 'You are signed out!');
	}

	return user;
});
