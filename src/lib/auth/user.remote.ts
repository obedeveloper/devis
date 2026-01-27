import { getRequestEvent, query } from '$app/server';

export const getUser = query(() => {
	const { locals } = getRequestEvent();
	const { user } = locals;
	return { user };
});
