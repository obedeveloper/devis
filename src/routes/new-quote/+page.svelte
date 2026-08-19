<script>
	import { signIn } from '$lib/auth-client';
	import QuoteForm from '$lib/components/QuoteForm.svelte';
	import { getUser } from '$lib/user.remote';
	import { newQuote } from './new-quote.remote';
	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>Create new quote</title>
</svelte:head>

{#if !user}
	<div class="-mbs-6 mbe-6 bg-red-300 py-3">
		<p class="wrapper text-center">
			You are signed out! <button class="underline" onclick={signIn}>Sign in</button> to create new quote.
		</p>
	</div>
{/if}

<main class="wrapper">
	<QuoteForm form={newQuote} buttonLabel="Create" />
</main>
