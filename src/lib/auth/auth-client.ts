import type { ResolvedPathname } from '$app/types';
import { createAuthClient } from 'better-auth/svelte';
import { getAuthUser } from './index.remote';

const authClient = createAuthClient();

export const signOut = async () => {
	await authClient.signOut();
	getAuthUser().refresh();
};

export const signIn = (url?: ResolvedPathname) => {
	authClient.signIn.social({
		provider: 'google',
		callbackURL: url
	});
};
