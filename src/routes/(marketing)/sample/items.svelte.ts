import sample from './sample.quote.json';
import { formatPrice } from '$lib/quote/utils';

const priceFormatter = formatPrice(sample.quote.currency);

class Quote {
	quote = sample.quote;
	lineItems = $state(sample.lineItems);
	extraItems = $state(sample.extraItems);

	subTotal = $derived(this.formatCents(this.getNonFormattedSubTotal()));
	grandTotal = $derived(this.calcGrandTotal());

	private calcGrandTotal() {
		const extra = this.extraItems.reduce((total, { amountCents }) => {
			return amountCents + total;
		}, 0);

		return this.formatCents(this.getNonFormattedSubTotal() + extra);
	}

	private getNonFormattedSubTotal() {
		return this.lineItems.reduce((total, { quantity, unitPriceCents }) => {
			return quantity * unitPriceCents + total;
		}, 0);
	}

	private formatCents(cents: number) {
		const amount = cents / 100;
		return priceFormatter.format(amount);
	}
}

export const quote = new Quote();
