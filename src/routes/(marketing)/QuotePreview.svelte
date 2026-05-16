<script lang="ts">
	import content from './landing.content.json';

	const quote = content.constructionQuote;
	const total = $derived(quote.items.reduce((sum, item) => sum + item.amount, 0));
	const formatAmount = (amount: number) =>
		amount.toLocaleString(undefined, {
			style: 'currency',
			currency: quote.currency
		});
</script>

<aside
	class="rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
	aria-label="Sample quote preview"
>
	<div
		class="flex items-start justify-between gap-6 border-b border-neutral-200 pb-5 dark:border-neutral-800"
	>
		<div>
			<p class="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
				{quote.label}
			</p>
			<h2 class="mt-2 text-xl font-semibold text-neutral-950 dark:text-white">{quote.title}</h2>
		</div>
		<p class="text-sm text-neutral-500 dark:text-neutral-400">{quote.currency}</p>
	</div>

	<div class="divide-y divide-neutral-200 dark:divide-neutral-800">
		{#each quote.items as item (item.title)}
			<div class="grid grid-cols-[minmax(0,1fr)_auto] gap-4 py-4">
				<div class="min-w-0">
					<p class="text-sm font-medium">{item.title}</p>
					<p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{item.description}</p>
				</div>
				<p class="text-right text-sm font-medium whitespace-nowrap">{formatAmount(item.amount)}</p>
			</div>
		{/each}
	</div>

	<div
		class="flex items-center justify-between border-t border-neutral-200 pt-5 dark:border-neutral-800"
	>
		<p class="text-sm text-neutral-500 dark:text-neutral-400">Total</p>
		<p class="text-right text-2xl font-semibold whitespace-nowrap">{formatAmount(total)}</p>
	</div>
</aside>
