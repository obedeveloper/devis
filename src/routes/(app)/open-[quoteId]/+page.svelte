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

<h2>{meta.title}</h2>
<p>{meta.desc}</p>

<form
	{...addItem.enhance(async ({ form, submit }) => {
		if (!(await submit())) return;
		onsubmit(form);
	})}
>
	<label>
		<input {...addItem.fields.isExtra.as('checkbox')} type="checkbox" bind:checked={isExtraItem} />
		Is extra item
	</label>
	<input {...addItem.fields.desc.as('text')} placeholder="Description" bind:this={descEl} />
	{#if !isExtraItem}
		<input {...addItem.fields.quantity.as('number')} placeholder="Quantity" step="any" />
		<input {...addItem.fields.unit.as('text')} placeholder="Unit" />
	{/if}
	<input
		{...addItem.fields.unitPrice.as('number')}
		placeholder={isExtraItem ? 'Amount' : 'Unit Price'}
		step="any"
	/>
	<input {...addItem.fields.quoteId.as('text')} value={quoteId} hidden />

	<button hidden>Add item</button>
</form>

{#if lineItems.length}
	<Table {lineItems} {extraItems} currency={meta.currency} quoteId={quoteId!}></Table>
{/if}
