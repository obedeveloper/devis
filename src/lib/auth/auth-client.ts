import type { ResolvedPathname } from '$app/types';
import { createAuthClient } from 'better-auth/svelte';

const authClient = createAuthClient();
export const { signOut } = authClient;

export const signIn = (url?: ResolvedPathname) => {
	authClient.signIn.social({
		provider: 'google',
		callbackURL: url
	});
};
