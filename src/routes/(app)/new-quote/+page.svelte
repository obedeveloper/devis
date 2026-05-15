<script lang="ts">
	import { createQuote } from '$lib/quote/index.remote';
</script>

<svelte:head>
	<title>Devis - New Quote</title>
</svelte:head>

<form {...createQuote}>
	<label>
		<span>Quote title</span>
		<input {...createQuote.fields.title.as('text')} />
		{#each createQuote.fields.title.issues() as issue (issue)}
			<p>{issue.message}</p>
		{/each}
	</label>
	<label>
		<span>Quote Description</span>
		<input {...createQuote.fields.desc.as('text')} />
	</label>
	<label>
		<span>Currency</span>
		<input {...createQuote.fields.currency.as('text')} />
		{#each createQuote.fields.currency.issues() as issue (issue)}
			<p>{issue.message}</p>
		{/each}
	</label>

	<button>Create quote!</button>
</form>
