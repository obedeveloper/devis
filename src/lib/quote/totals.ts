export interface LineItemTotalInput {
	quantity: number;
	unitPriceCents: number;
}

export interface ExtraItemTotalInput {
	amountCents: number;
}

export function getLineItemsTotalCents(lineItems: readonly LineItemTotalInput[]) {
	return lineItems.reduce((total, { quantity, unitPriceCents }) => {
		return total + quantity * unitPriceCents;
	}, 0);
}

export function getExtraItemsTotalCents(extraItems: readonly ExtraItemTotalInput[]) {
	return extraItems.reduce((total, { amountCents }) => {
		return total + amountCents;
	}, 0);
}

export function getQuoteTotalCents(
	lineItems: readonly LineItemTotalInput[],
	extraItems: readonly ExtraItemTotalInput[]
) {
	return getLineItemsTotalCents(lineItems) + getExtraItemsTotalCents(extraItems);
}
