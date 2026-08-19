interface QuotePdfData {
	title: string;
	description: string | null;
	currency: string | null;
}

interface LineItemPdfData {
	description: string;
	quantity: number;
	unit: string | null;
	unitPrice: number;
}

export function renderQuotePdf(quote: QuotePdfData, lineItems: LineItemPdfData[]): string {
	const currency = quote.currency ?? '';

	const formatCurrency = (value: number) =>
		currency
			? new Intl.NumberFormat('en', { style: 'currency', currency }).format(value)
			: value.toFixed(2);

	const total = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

	const lineItemRows = lineItems
		.toReversed()
		.map(
			(item, i) => `
		<tr>
			<td style="border:1px solid #000;padding:6px 8px;text-align:center">${i + 1}</td>
			<td style="border:1px solid #000;padding:6px 8px">${item.description}</td>
			<td style="border:1px solid #000;padding:6px 8px;text-align:center">${item.quantity}</td>
			<td style="border:1px solid #000;padding:6px 8px;text-align:center">${item.unit ?? '-'}</td>
			<td style="border:1px solid #000;padding:6px 8px;text-align:right">${formatCurrency(item.unitPrice)}</td>
			<td style="border:1px solid #000;padding:6px 8px;text-align:right">${formatCurrency(item.quantity * item.unitPrice)}</td>
		</tr>`
		)
		.join('');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #000; }
		h1 { font-size: 24px; margin-bottom: 6px; }
		p.desc { font-size: 14px; color: #444; margin-bottom: 24px; }
		table { width: 100%; border-collapse: collapse; }
		th { border: 1px solid #000; padding: 6px 8px; text-align: left; font-size: 12px; text-transform: uppercase; }
		tfoot td { border: 1px solid #000; padding: 6px 8px; font-weight: 600; font-size: 14px; }
	</style>
</head>
<body>
	<h1>${quote.title}</h1>
	${quote.description ? `<p class="desc">${quote.description}</p>` : ''}

	<table>
		<thead>
			<tr>
				<th>#</th>
				<th>Description</th>
				<th style="text-align:center">Qty</th>
				<th style="text-align:center">Unit</th>
				<th style="text-align:right">Unit Price</th>
				<th style="text-align:right">Amount</th>
			</tr>
		</thead>
		<tbody>
			${lineItemRows}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="5" style="text-align:right;font-weight:600">Total</td>
				<td style="text-align:right">${formatCurrency(total)}</td>
			</tr>
		</tfoot>
	</table>
</body>
</html>`;
}
