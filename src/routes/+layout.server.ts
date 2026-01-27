export const load = ({ url, locals }) => {
	const isAuthPage = url.pathname === '/auth';
	const { user } = locals;

	return { isAuthPage, user };
};
