import { createAuthClient } from 'better-auth/client';
import { getUser } from './user.remote';
const authClient = createAuthClient();

export const signIn = (callbackURL: string = '/') =>
	authClient.signIn.social({
		provider: 'google',
		callbackURL
	});

export const signOut = async () => {
	await authClient.signOut();
	getUser().refresh();
};
