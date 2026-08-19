import { generatePdf } from '$lib/server/pdf';
import { renderQuotePdf } from '$lib/server/quote-pdf-template';
import { getQuoteById } from '$lib/quote.remote';
import type { RequestHandler } from './$types';
import { getLineItems } from '../items.remote';

export const GET: RequestHandler = async ({ params }) => {
	const quote = await getQuoteById(params.quoteId!);
	const lineItems = await getLineItems(params.quoteId!);

	const html = renderQuotePdf(quote, lineItems);
	const pdfBuffer = await generatePdf(html);

	return new Response(new Uint8Array(pdfBuffer), {
		headers: {
			'Content-Type': 'application/pdf',
			'Content-Disposition': `attachment; filename="${quote.title}.pdf"`
		}
	});
};
