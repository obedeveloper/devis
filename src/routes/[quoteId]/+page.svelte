<script lang="ts">
	import { page } from '$app/state';
	import DeleteQuote from '$lib/components/DeleteQuote.svelte';
	import { getQuoteById } from '$lib/quote.remote';

	const quote = await getQuoteById(page.params.quoteId!);
	const { id, title, description, currency } = quote;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<main class="wrapper">
	<section class="grid gap-2">
		<div class="flex items-baseline gap-2">
			<h1 class="text-3xl font-semibold">{title}</h1>
			<DeleteQuote {id} {title}></DeleteQuote>
		</div>
		<p>{description}</p>
		<p class="font-mono uppercase">{currency}</p>
	</section>
</main>
