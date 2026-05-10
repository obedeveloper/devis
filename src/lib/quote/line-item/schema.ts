import * as v from 'valibot';

export const LineItem = v.object({
	desc: v.pipe(v.string(), v.trim(), v.nonEmpty()),
	quantity: v.optional(v.number()),
	unit: v.optional(v.pipe(v.string(), v.trim())),
	unitPrice: v.number(),
	quoteId: v.string()
});
