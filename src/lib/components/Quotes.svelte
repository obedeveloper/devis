<script lang="ts">
	import { resolve } from '$app/paths';
	import { getQuotes } from '$lib/quote.remote';
	import { fade } from 'svelte/transition';
	import DeleteQuote from './DeleteQuote.svelte';
	const quotes = $derived(await getQuotes());
</script>

<section
	class={[quotes.length && 'grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-3']}
>
	{#each quotes as { id, ...data } (id)}
		{const { title, description, currency, createdAt } = data}
		{const date = new Date(createdAt)}

		<article class="rounded bg-black/5 p-3 text-black/80" transition:fade>
			<div class="flex justify-between gap-2">
				<h3 class="line-clamp-1 text-lg font-semibold text-black">
					<a href={resolve('/[quoteId]', { quoteId: id })}>{title}</a>
				</h3>
				<DeleteQuote {id} {title}></DeleteQuote>
			</div>
			<p class="mbs-1 line-clamp-2 empty:hidden">{description}</p>

			<div class="mbs-4 flex justify-between">
				<span class="font-mono text-black/90 uppercase">{currency}</span>
				<time datetime={date.toISOString()}>
					{date.toLocaleDateString('en', { day: '2-digit', month: 'short', year: 'numeric' })}
				</time>
			</div>
		</article>
	{:else}
		<p class="text-center">
			You don't have quotes yet!
			<a class="underline" href={resolve('/new-quote')}>Create new one </a> to get started.
		</p>
	{/each}
</section>
