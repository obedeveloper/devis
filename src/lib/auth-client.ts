import { createAuthClient } from 'better-auth/svelte';

const authClient = createAuthClient();
export const { signOut } = authClient;

export const signIn = (url?: string) => {
	authClient.signIn.social({
		provider: 'google',
		callbackURL: url
	});
};
