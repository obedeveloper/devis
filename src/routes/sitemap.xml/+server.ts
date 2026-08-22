import { getOrigin } from '$lib/site.remote';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const origin = await getOrigin();

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${origin}/</loc>
	</url>
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
