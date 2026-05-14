import * as v from 'valibot';

export const Quote = v.object({
	title: v.pipe(v.string(), v.trim(), v.nonEmpty('Title is empty')),
	desc: v.optional(v.pipe(v.string(), v.trim())),
	currency: v.fallback(v.pipe(v.string(), v.custom(checkCurrency, 'Invalid currency')), 'RWF')
});

function checkCurrency(currency: unknown) {
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
