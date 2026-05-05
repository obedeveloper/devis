import * as v from 'valibot';

export const Quote = v.object({
	title: v.pipe(v.string(), v.trim(), v.nonEmpty('Title is empty')),
	desc: v.optional(v.pipe(v.string(), v.trim())),
	currency: v.pipe(v.string(), v.custom(checkCurrency, 'Invalid currency'))
});

export const LineItem = v.object({
	desc: v.pipe(v.string(), v.trim(), v.nonEmpty()),
	quantity: v.optional(v.number()),
	unit: v.optional(v.pipe(v.string(), v.trim())),
	unitPrice: v.number(),
	quoteId: v.string()
});

function checkCurrency(currency: unknown) {
	if (!currency) return true;

	try {
		new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: String(currency)
		}).format(1);

		return true;
	} catch {
		return false;
	}
}
