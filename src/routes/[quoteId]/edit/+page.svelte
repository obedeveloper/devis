<script lang="ts">
	import { page } from '$app/state';
	import QuoteForm from '$lib/components/QuoteForm.svelte';
	import { getQuoteById } from '$lib/quote.remote';
	import { editQuote } from './edit.remote';

	const quote = await getQuoteById(page.params.quoteId!);
</script>

<svelte:head>
	<title>Edit {quote.title}</title>
</svelte:head>

<main class="wrapper">
	<QuoteForm
		form={editQuote}
		values={{
			title: quote.title,
			description: quote.description ?? undefined,
			currency: quote.currency ?? undefined
		}}
		buttonLabel="Save"
	/>
</main>
