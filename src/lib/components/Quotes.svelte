<script lang="ts">
	import { getQuotes } from '$lib/quote.remote';
	const quotes = await getQuotes();
</script>

<section>
	{#each quotes as { id } (id)}
		<!--  -->
	{:else}
		<p>You don't have quotes yet! Create new one to get started.</p>
	{/each}
</section>
