<script lang="ts">
	import { resolve } from '$app/paths';
	import { signIn } from '$lib/auth-client';
	import QuoteForm from '$lib/components/QuoteForm.svelte';
	import { getUser } from '$lib/user.remote';
	import { newQuote } from './new-quote.remote';

	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>Create new quote</title>
</svelte:head>

<main class="wrapper">
	{#if !user}
		<section
			class="mx-auto grid max-w-md justify-items-center gap-3 rounded bg-black/5 p-6 text-center"
		>
			<h1 class="text-xl font-semibold">Sign in to create a quote</h1>
			<p class="text-black/60">You need an account to create and manage quotes.</p>
			<button
				onclick={() => signIn(resolve('/new-quote'))}
				class="mt-2 rounded bg-black px-5 py-2 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/85"
			>
				Sign in
			</button>
		</section>
	{:else}
		<QuoteForm form={newQuote} buttonLabel="Create" />
	{/if}
</main>
