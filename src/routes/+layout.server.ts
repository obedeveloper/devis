export const load = ({ url }) => {
	const isAuthPage = url.pathname === '/auth';

	return { isAuthPage };
};
