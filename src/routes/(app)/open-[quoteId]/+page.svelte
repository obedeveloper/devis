<script lang="ts">
	import { page } from '$app/state';
	import { getExtraItems } from '$lib/quote/extra-item/index.remote';
	import { getMetaData } from '$lib/quote/index.remote';
	import { getLineItems } from '$lib/quote/line-item/index.remote';
	import { addItem } from './add-item.remote';
	import Table from './Table.svelte';

	const { quoteId } = page.params;
	const meta = await getMetaData(quoteId!);
	const lineItems = $derived(await getLineItems(meta.id));
	const extraItems = $derived(await getExtraItems(meta.id));

	let descEl: HTMLInputElement;
	let isExtraItem = $state(false);

	function onsubmit(form: HTMLFormElement) {
		const inputEls = form.querySelectorAll('input');
		const els = inputEls.values().toArray();

		inputEls.forEach((el) => {
			const isFirstEl = els.at(0) == el;
			const isLastEl = els.at(-1) == el;

			if (isFirstEl || isLastEl) return;
			el.value = el.defaultValue;
		});

		descEl.focus();
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
</svelte:head>

<section class="mb-8">
	<p class="mb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">{meta.currency}</p>
	<h1 class="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-white">
		{meta.title}
	</h1>
	{#if meta.desc}
		<p class="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">{meta.desc}</p>
	{/if}
</section>

<form
	class="mb-8 grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-2 lg:grid-cols-[auto_1fr_110px_110px_140px_auto] dark:border-neutral-800 dark:bg-neutral-900"
	{...addItem.enhance(async ({ form, submit }) => {
		if (!(await submit())) return;
		onsubmit(form);
	})}
>
	<label
		class="flex items-center gap-2 text-sm text-neutral-700 sm:col-span-2 lg:col-span-1 dark:text-neutral-200"
	>
		<input
			class="size-4 rounded border-neutral-300 accent-neutral-950 dark:border-neutral-700 dark:accent-white"
			{...addItem.fields.isExtra.as('checkbox')}
			type="checkbox"
			bind:checked={isExtraItem}
		/>
		Extra
	</label>
	<input
		class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
		{...addItem.fields.desc.as('text')}
		placeholder="Description"
		bind:this={descEl}
	/>
	{#if !isExtraItem}
		<input
			class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
			{...addItem.fields.quantity.as('number')}
			placeholder="Quantity"
			step="any"
		/>
		<input
			class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
			{...addItem.fields.unit.as('text')}
			placeholder="Unit"
		/>
	{/if}
	<input
		class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
		{...addItem.fields.unitPrice.as('number')}
		placeholder={isExtraItem ? 'Amount' : 'Unit Price'}
		step="any"
	/>
	<input {...addItem.fields.quoteId.as('text')} value={quoteId} hidden />

	<button hidden>Add</button>
</form>

{#if lineItems.length}
	<Table {lineItems} {extraItems} currency={meta.currency} quoteId={quoteId!}></Table>
{:else}
	<section
		class="border-t border-neutral-200 py-12 text-center dark:border-neutral-800"
		aria-label="No line items"
	>
		<h2 class="text-xl font-semibold text-neutral-950 dark:text-white">No line items yet</h2>
		<p class="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-400">
			Add the first service, material, or extra cost to start building this quote.
		</p>
	</section>
{/if}
