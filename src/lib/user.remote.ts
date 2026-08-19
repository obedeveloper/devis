import { getRequestEvent, query } from '$app/server';

export const getUser = query(() => {
	const { locals } = getRequestEvent();
	return locals.user;
});
