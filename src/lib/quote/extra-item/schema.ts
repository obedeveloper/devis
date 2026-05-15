import * as v from 'valibot';

export const ExtraItem = v.object({
	desc: v.pipe(v.string(), v.trim(), v.nonEmpty()),
	amount: v.number(),
	quoteId: v.string()
});
