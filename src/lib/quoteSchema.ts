import { transformOptional } from '$lib/utils';
import * as v from 'valibot';

export const quoteSchema = v.object({
	title: v.pipe(v.string(), v.trim(), v.nonEmpty('Quote title can not be empty!')),
	description: v.pipe(v.string(), v.transform(transformOptional)),
	currency: v.pipe(v.string(), v.transform(transformOptional))
});

export function isValidCurrency(currency?: string) {
	if (!currency) return true;

	try {
		Intl.NumberFormat(undefined, {
			style: 'currency',
			currency
		}).format(1);

		return true;
	} catch {
		return false;
	}
}
