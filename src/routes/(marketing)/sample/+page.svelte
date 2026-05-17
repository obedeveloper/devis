<script lang="ts">
	import { quote } from './items.svelte';
	import AddItem from './AddItem.svelte';
	import { formatPrice } from '$lib/quote/utils';

	const priceFormatter = formatPrice(quote.quote.currency);
</script>

<svelte:head>
	<title>{quote.quote.title} - Devis Sample</title>
</svelte:head>

<main class="mx-auto w-full max-w-6xl px-5 pt-10 pb-16 sm:px-8">
	<section class="mb-8 max-w-2xl">
		<p class="mb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Sample quote</p>
		<h1 class="text-3xl font-semibold text-neutral-950 dark:text-white">{quote.quote.title}</h1>
		<p class="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">{quote.quote.desc}</p>
	</section>

	<AddItem></AddItem>

	<div class="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
		<table class="w-full min-w-190 border-collapse text-left text-sm">
			<thead class="bg-neutral-50 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
				<tr>
					<th class="px-4 py-3 font-medium">#</th>
					<th class="px-4 py-3 font-medium">Description</th>
					<th class="px-4 py-3 font-medium">Quantity</th>
					<th class="px-4 py-3 font-medium">Unit</th>
					<th class="px-4 py-3 font-medium">Unit price</th>
					<th class="px-4 py-3 font-medium">Amount</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
				{#each quote.lineItems as item, i (item.id)}
					<tr>
						<td class="px-4 py-3">{i + 1}</td>
						<td class="px-4 py-3">{item.desc}</td>
						<td class="px-4 py-3">{item.quantity.toLocaleString()}</td>
						<td class="px-4 py-3">{item.unit}</td>
						<td class="px-4 py-3">{priceFormatter.format(item.unitPriceCents / 100)}</td>
						<td class="px-4 py-3 font-medium"
							>{priceFormatter.format((item.quantity * item.unitPriceCents) / 100)}</td
						>
					</tr>
				{/each}
				{#if quote.extraItems.length}
					<tr class="bg-neutral-50 dark:bg-neutral-900">
						<th class="px-4 py-3 font-semibold" colspan="5">Sub Total</th>
						<th class="px-4 py-3 font-semibold">{quote.subTotal}</th>
					</tr>
					{#each quote.extraItems as item, i (item.id)}
						<tr>
							<td class="px-4 py-3 text-neutral-500 dark:text-neutral-400">
								{i + quote.lineItems.length + 1}
							</td>
							<td class="px-4 py-3" colspan="4">{item.desc}</td>
							<td class="px-4 py-3 font-medium">{priceFormatter.format(item.amountCents / 100)}</td>
						</tr>
					{/each}
				{/if}
				<tr class="bg-neutral-950/10 dark:bg-white/10">
					<th class="px-4 py-3 font-semibold" colspan="5">Grand Total</th>
					<th class="px-4 py-3 text-base font-semibold">{quote.grandTotal}</th>
				</tr>
			</tbody>
		</table>
	</div>
</main>
