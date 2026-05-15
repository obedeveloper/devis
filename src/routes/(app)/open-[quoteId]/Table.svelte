<script lang="ts">
	import type { getExtraItems } from '$lib/quote/extra-item/index.remote';
	import { getLineItems } from '$lib/quote/line-item/index.remote';
	import { formatPrice } from '$lib/quote/utils';
	import { fade } from 'svelte/transition';

	interface Props {
		lineItems: Awaited<ReturnType<typeof getLineItems>>;
		extraItems: Awaited<ReturnType<typeof getExtraItems>>;
		currency: string;
	}

	const { lineItems, currency, extraItems }: Props = $props();
	// svelte-ignore state_referenced_locally
	const priceFormatter = formatPrice(currency);

	const subTotalCents = $derived(
		lineItems.reduce((total, { quantity, unitPriceCents }) => {
			return quantity * unitPriceCents + total;
		}, 0)
	);

	const grandTotalCents = $derived(
		extraItems.reduce((total, { amountCents }) => {
			return total + amountCents;
		}, 0) + subTotalCents
	);
</script>

<table>
	<thead>
		<tr>
			<th>#</th>
			<th>Description</th>
			<th>Quantity</th>
			<th>Unit</th>
			<th>Unit Price</th>
			<th>Amount</th>
		</tr>
	</thead>
	<tbody>
		{#each lineItems as item, i (item.id)}
			{@const { desc, quantity, unit, unitPriceCents } = item}
			{@const unitPrice = unitPriceCents / 100}
			{@const amount = priceFormatter.format(quantity * unitPrice)}

			<tr transition:fade>
				<td>{i + 1}</td>
				<td>{desc}</td>
				<td>{quantity.toLocaleString()}</td>
				<td>{unit}</td>
				<td>{priceFormatter.format(unitPrice)}</td>
				<td>{amount}</td>
			</tr>
		{/each}
		{#if extraItems.length}
			<tr>
				<th align="left">Sub Total</th>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<th align="left">{priceFormatter.format(subTotalCents / 100)}</th>
			</tr>
			{#each extraItems as item, i (item.id)}
				{@const { desc, amountCents } = item}
				<tr>
					<td>{i + lineItems.length + 1}</td>
					<td>{desc}</td>
					<td></td>
					<td></td>
					<td></td>
					<td>{priceFormatter.format(amountCents / 100)}</td>
				</tr>
			{/each}
		{/if}
		<tr>
			<th align="left">Grand Total</th>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<th align="left">{priceFormatter.format(grandTotalCents / 100)}</th>
		</tr>
	</tbody>
</table>
