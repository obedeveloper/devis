<script lang="ts">
	import { resolve } from '$app/paths';
	import { getQuotes } from '$lib/quote.remote';
	const quotes = await getQuotes();
</script>

<section>
	{#each quotes as { id } (id)}
		<!--  -->
	{:else}
		<p>
			You don't have quotes yet! <a class="underline" href={resolve('/new-quote')}>Create new one</a
			> to get started.
		</p>
	{/each}
</section>
