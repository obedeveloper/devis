<script lang="ts">
	import { page } from '$app/state';
	import { getMetaData } from '$lib/quote/index.remote';
	import { getLineItems, addLineItem } from '$lib/quote/line-item/index.remote';
	import Table from './Table.svelte';

	const { quoteId } = page.params;
	const meta = await getMetaData(quoteId!);
	const lineItems = $derived(await getLineItems(meta.id));

	let descEl: HTMLInputElement;
	let quoteIdEl: HTMLInputElement;
</script>

<svelte:head>
	<title>{meta.title}</title>
</svelte:head>

<h2>{meta.title}</h2>
<p>{meta.desc}</p>

<form
	{...addLineItem.enhance(async ({ form, submit }) => {
		if (!(await submit())) return;

		form.reset();
		quoteIdEl.value = quoteId!;
		descEl.focus();
	})}
>
	<input {...addLineItem.fields.desc.as('text')} placeholder="Description" bind:this={descEl} />
	<input {...addLineItem.fields.quantity.as('number')} placeholder="Quantity" />
	<input {...addLineItem.fields.unit.as('text')} placeholder="Unit" />
	<input {...addLineItem.fields.unitPrice.as('number')} placeholder="Unit Price" />
	<input {...addLineItem.fields.quoteId.as('text')} bind:this={quoteIdEl} value={quoteId} hidden />

	<button hidden>Add item</button>
</form>

{#if lineItems.length}
	<Table {lineItems} currency={meta.currency}></Table>
{/if}
