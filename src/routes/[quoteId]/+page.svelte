<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import DeleteQuote from '$lib/components/DeleteQuote.svelte';
	import LineItem from '$lib/components/LineItem.svelte';
	import { getQuoteById } from '$lib/quote.remote';
	import { formatAmount } from '$lib/utils';
	import { getLineItems, newLineItem } from './items.remote';

	const quote = await getQuoteById(page.params.quoteId!);
	const { id, title, description, currency } = quote;
	const lineItems = $derived(await getLineItems(page.params.quoteId!));
	const total = $derived(lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0));
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="wrapper">
	<section class="grid gap-2">
		<div class="flex flex-wrap items-baseline gap-2">
			<h1 class="text-3xl font-semibold">{title}</h1>
			<a href={resolve('/[quoteId]/edit', { quoteId: id })} class="rounded bg-black/10 px-3 py-1"
				>Edit</a
			>
			<a
				href={resolve('/[quoteId]/pdf', { quoteId: id })}
				class="rounded bg-black/10 px-3 py-1"
				download>Print PDF</a
			>
			<DeleteQuote {id} {title}></DeleteQuote>
		</div>
		<p>{description}</p>
		<p class="font-mono uppercase">{currency}</p>
	</section>
	<section class="mbs-3">
		<form {...newLineItem} class="mbe-4 grid gap-2">
			{const { description, quantity, unit, unitPrice } = newLineItem.fields}
			<input {...description.as('text')} placeholder="Description" aria-label="Description" />
			<div class="grid grid-cols-3 gap-2">
				<input {...quantity.as('number')} placeholder="Qty" step="0.01" aria-label="Quantity" />
				<input {...unit.as('text')} placeholder="Unit" aria-label="Unit" />
				<input
					{...unitPrice.as('number')}
					placeholder="Unit price"
					step="0.01"
					aria-label="Unit price"
				/>
			</div>

			<button
				disabled={newLineItem.pending > 0}
				aria-busy={newLineItem.pending > 0}
				class="justify-self-end rounded bg-black/95 px-4 py-1.5 text-sm font-semibold text-white hover:bg-black/85 aria-busy:bg-black/50"
			>
				{newLineItem.pending > 0 ? 'Adding…' : 'Add line item'}
			</button>
		</form>

		{#if lineItems.length}
			<ol class="grid gap-1.5">
				{const { length } = $derived(lineItems)}

				{#each lineItems as item, i (item.id)}
					<LineItem {...item} index={i} {length} {currency} />
				{/each}
			</ol>

			<div class="mbs-2 flex justify-end gap-3 border-t border-black/10 pt-2">
				<span class="text-black/50">Total</span>
				<span class="font-mono font-semibold uppercase">{formatAmount(total, currency)}</span>
			</div>
		{/if}
	</section>
</main>
