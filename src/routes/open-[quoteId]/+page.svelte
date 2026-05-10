<script lang="ts">
	import { page } from '$app/state';
	import { getMetaData } from '$lib/quote/index.remote';
	import { getLineItems, addLineItem } from '$lib/quote/line-item/index.remote';
	import { safeParse } from 'valibot';
	import Table from './Table.svelte';
	import { LineItem } from '$lib/quote/line-item/schema';

	const { quoteId } = page.params;
	const meta = await getMetaData(quoteId!);
	const lineItems = $derived(await getLineItems(meta.id));

	const defaultValues = {
		desc: '',
		quantity: '',
		unit: '',
		unitPrice: ''
	};

	let formData = $state(defaultValues);
	let descEl: HTMLInputElement;

	async function onsubmit(e: SubmitEvent) {
		e.preventDefault();

		const result = safeParse(LineItem, {
			...formData,
			quantity: +formData.quantity || undefined,
			unitPrice: +formData.unitPrice,
			quoteId
		});

		if (result.success) {
			formData = defaultValues;
			descEl.focus();
			addLineItem({ ...result.output });
		}
	}
</script>

<svelte:head>
	<title>{meta.title}</title>
</svelte:head>

<h2>{meta.title}</h2>
<p>{meta.desc}</p>

<form {onsubmit}>
	<input type="text" placeholder="Description" bind:value={formData.desc} bind:this={descEl} />
	<input type="text" placeholder="Quantity" bind:value={formData.quantity} />
	<input type="text" placeholder="Unit" bind:value={formData.unit} />
	<input type="text" placeholder="Unit Price" bind:value={formData.unitPrice} />

	<button hidden>Add item</button>
</form>

{#if lineItems.length}
	<Table {lineItems} currency={meta.currency}></Table>
{/if}
