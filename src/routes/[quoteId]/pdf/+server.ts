import { generatePdf, renderToHTML } from '$lib/server/pdf';
import QuotePdf from '$lib/components/QuotePdf.svelte';
import { getQuoteById } from '$lib/quote.remote';
import { sanitizeFilename } from '$lib/utils';
import type { RequestHandler } from './$types';
import { getLineItems } from '../items.remote';

export const GET: RequestHandler = async ({ params }) => {
	const quote = await getQuoteById(params.quoteId!);
	const lineItems = await getLineItems(params.quoteId!);

	const html = await renderToHTML(QuotePdf, {
		title: quote.title,
		description: quote.description,
		currency: quote.currency,
		lineItems: lineItems
	});

	const pdfBuffer = await generatePdf(html);

	const filename = sanitizeFilename(quote.title);
	return new Response(new Uint8Array(pdfBuffer), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="${filename}.pdf"; filename*=UTF-8''${encodeURIComponent(filename)}.pdf`
		}
	});
};
