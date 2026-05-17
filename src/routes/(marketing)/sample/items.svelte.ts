import sample from './sample.quote.json';
import { getLineItemsTotalCents, getQuoteTotalCents } from '$lib/quote/totals';
import { formatPrice } from '$lib/quote/utils';

const priceFormatter = formatPrice(sample.quote.currency);

class Quote {
	quote = sample.quote;
	lineItems = $state(sample.lineItems);
	extraItems = $state(sample.extraItems);

	subTotal = $derived.by(() => {
		const subTotalCents = getLineItemsTotalCents(this.lineItems);
		return priceFormatter.formatCents(subTotalCents);
	});

	grandTotal = $derived.by(() => {
		const grandTotalCents = getQuoteTotalCents(this.lineItems, this.extraItems);
		return priceFormatter.formatCents(grandTotalCents);
	});
}

export const quote = new Quote();
