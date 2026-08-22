import { generatePdf, renderToHTML } from '$lib/server/pdf';
import QuotePdf from '$lib/components/QuotePdf.svelte';
import { getQuoteById } from '$lib/quote.remote';
import { getLineItems } from '../[quoteId]/items.remote';
import { sanitizeFilename } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const ids = url.searchParams.get('ids')?.split(',').filter(Boolean) ?? [];

	const quotes = [];
	for (const id of ids) {
		try {
			const quote = await getQuoteById(id);
			const lineItems = await getLineItems(id);
			quotes.push({ ...quote, lineItems });
		} catch {
			// skip missing or unowned quotes
		}
	}

	if (!quotes.length) {
		error(400, 'No valid quotes to export!');
	}

	const html = await renderToHTML(QuotePdf, { quotes });
	const pdfBuffer = await generatePdf(html);

	const filename = sanitizeFilename(quotes[0].title);
	return new Response(new Uint8Array(pdfBuffer), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="${filename}.pdf"; filename*=UTF-8''${encodeURIComponent(filename)}.pdf`
		}
	});
};
