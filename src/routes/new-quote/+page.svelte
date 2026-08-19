<script>
	import { signIn } from '$lib/auth-client';
	import { getUser } from '$lib/user.remote';
	import { newQuote } from './new-quote.remote';
	const { title, description, currency } = newQuote.fields;
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
	<form {...newQuote} class="mx-auto grid max-w-md gap-3 [&>label]:grid [&>label]:gap-1">
		<label>
			<span>Title</span>
			<input {...title.as('text')} />
			{#each title.issues() as issue (issue)}
				<span class="text-red-500/95">{issue.message}</span>
			{/each}
		</label>
		<label>
			<span>Description (optional)</span>
			<input {...description.as('text')} />
		</label>
		<label>
			<span>Currency (optional)</span>
			<input {...currency.as('text')} placeholder="RWF" />
		</label>

		<button
			class="mbs-3 rounded bg-black/95 py-2 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/85"
		>
			Create
		</button>
	</form>
</main>
