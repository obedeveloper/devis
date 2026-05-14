<script lang="ts">
	import { getLineItems } from '$lib/quote/line-item/index.remote';
	import { formatPrice } from '$lib/quote/utils';
	import { fade } from 'svelte/transition';

	interface Props {
		lineItems: Awaited<ReturnType<typeof getLineItems>>;
		currency: string;
	}

	const { lineItems, currency }: Props = $props();
	// svelte-ignore state_referenced_locally
	const priceFormatter = formatPrice(currency);
	const total = $derived(
		lineItems.reduce((total, { quantity, unitPriceCents }) => {
			return quantity * unitPriceCents + total;
		}, 0)
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
		<tr>
			<th>Total</th>
			<th align="right" colspan="5">{priceFormatter.format(total / 100)}</th>
		</tr>
	</tbody>
</table>
