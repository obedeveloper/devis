import { form } from '$app/server';
import { addExtraItem } from '$lib/quote/extra-item/utils.server';
import { LineItem } from '$lib/quote/line-item/schema';
import { addLineItem } from '$lib/quote/line-item/utils.server';
import * as v from 'valibot';

const Schema = v.intersect([LineItem, v.object({ isExtra: v.optional(v.boolean()) })]);

export const addItem = form(Schema, (data) => {
	if (data.isExtra) {
		addExtraItem({ ...data, amount: data.unitPrice });
	} else {
		addLineItem(data);
	}
});
