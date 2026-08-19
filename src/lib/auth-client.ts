import { createAuthClient } from 'better-auth/client';
import { getUser } from './user.remote';
const authClient = createAuthClient();

export const signIn = () =>
	authClient.signIn.social({
		provider: 'google'
	});

export const signOut = async () => {
	await authClient.signOut();
	getUser().refresh();
};
