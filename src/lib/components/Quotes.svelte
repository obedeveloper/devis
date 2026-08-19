<script lang="ts">
	import { resolve } from '$app/paths';
	import { deleteQuote, getQuotes } from '$lib/quote.remote';
	import { fade } from 'svelte/transition';
	const quotes = $derived(await getQuotes());

	function ondelete({ id, title }: { id: string; title: string }) {
		if (confirm(`Do you really want to delete "${title}" quote?`)) {
			deleteQuote(id);
		}
	}
</script>

<section
	class={[quotes.length && 'grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),420px))] gap-3']}
>
	{#each quotes as { id, ...data } (id)}
		{const { title, description, currency, createdAt } = data}
		{const date = new Date(createdAt)}

		<article class="rounded bg-black/5 p-3 text-black/80" transition:fade>
			<div class="flex justify-between gap-2">
				<h3 class="line-clamp-1 text-lg font-semibold text-black">{title}</h3>
				<button onclick={() => ondelete({ id, title })} class="rounded bg-red-300/50 px-3 py-1">
					Delete
				</button>
			</div>
			<p class="mbs-1 line-clamp-2 empty:hidden">{description}</p>

			<div class="mbs-4 flex justify-between">
				<span class="font-mono text-black/90 uppercase">{currency}</span>
				<time datetime={date.toISOString()}>
					{date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
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
