<script lang="ts">
	import { deleteExtraItem, type getExtraItems } from '$lib/quote/extra-item/index.remote';
	import { deleteLineItem, getLineItems } from '$lib/quote/line-item/index.remote';
	import { getLineItemsTotalCents, getQuoteTotalCents } from '$lib/quote/totals';
	import { formatPrice } from '$lib/quote/utils';
	import { fade } from 'svelte/transition';

	interface Props {
		lineItems: Awaited<ReturnType<typeof getLineItems>>;
		extraItems: Awaited<ReturnType<typeof getExtraItems>>;
		currency: string;
		quoteId: string;
	}

	const { lineItems, currency, extraItems, quoteId }: Props = $props();
	// svelte-ignore state_referenced_locally
	const priceFormatter = formatPrice(currency);

	const subTotalCents = $derived(getLineItemsTotalCents(lineItems));
	const grandTotalCents = $derived(getQuoteTotalCents(lineItems, extraItems));
</script>

<div class="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
	<table class="w-full min-w-210 border-collapse text-left text-sm">
		<thead class="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
			<tr>
				<th class="px-4 py-3 font-medium">#</th>
				<th class="px-4 py-3 font-medium">Description</th>
				<th class="px-4 py-3 font-medium">Quantity</th>
				<th class="px-4 py-3 font-medium">Unit</th>
				<th class="px-4 py-3 font-medium">Unit price</th>
				<th class="px-4 py-3 font-medium">Amount</th>
				<th class="px-4 py-3 font-medium">Actions</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
			{#each lineItems as item, i (item.id)}
				{@const { desc, quantity, unit, unitPriceCents } = item}
				{@const amountCents = quantity * unitPriceCents}

				<tr transition:fade>
					<td class="px-4 py-3 text-neutral-500 dark:text-neutral-400">{i + 1}</td>
					<td class="px-4 py-3">{desc}</td>
					<td class="px-4 py-3">{quantity.toLocaleString()}</td>
					<td class="px-4 py-3">{unit}</td>
					<td class="px-4 py-3">{priceFormatter.formatCents(unitPriceCents)}</td>
					<td class="px-4 py-3 font-medium">{priceFormatter.formatCents(amountCents)}</td>
					<td class="px-4 py-3">
						<button
							class="rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-red-950 dark:hover:bg-red-950/30 dark:hover:text-red-300"
							onclick={async () => await deleteLineItem({ itemId: item.id, quoteId })}
						>
							Delete
						</button>
					</td>
				</tr>
			{/each}
			{#if extraItems.length}
				<tr class="bg-neutral-50 dark:bg-neutral-900">
					<th class="px-4 py-3 font-semibold" colspan="5">Sub Total</th>
					<th class="px-4 py-3 font-semibold">{priceFormatter.formatCents(subTotalCents)}</th>
					<td class="px-4 py-3"></td>
				</tr>
				{#each extraItems as item, i (item.id)}
					{@const { desc, amountCents } = item}
					<tr transition:fade>
						<td class="px-4 py-3 text-neutral-500 dark:text-neutral-400">
							{i + lineItems.length + 1}
						</td>
						<td class="px-4 py-3" colspan="4">{desc}</td>
						<td class="px-4 py-3 font-medium">{priceFormatter.formatCents(amountCents)}</td>
						<td class="px-4 py-3">
							<button
								class="rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-neutral-800 dark:text-neutral-300 dark:hover:border-red-950 dark:hover:bg-red-950/30 dark:hover:text-red-300"
								onclick={async () => await deleteExtraItem({ itemId: item.id, quoteId })}
							>
								Delete
							</button>
						</td>
					</tr>
				{/each}
			{/if}
			<tr class="bg-neutral-950/10 dark:bg-white/10">
				<th class="px-4 py-3 font-semibold" colspan="5">Grand Total</th>
				<th class="px-4 py-3 text-base font-semibold">{priceFormatter.formatCents(grandTotalCents)}</th>
				<td class="px-4 py-3"></td>
			</tr>
		</tbody>
	</table>
</div>
