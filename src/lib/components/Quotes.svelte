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
		<section
			class="flex flex-col items-center gap-4 py-20 text-center md:py-28"
			aria-labelledby="empty-title"
		>
			<div
				aria-hidden="true"
				class="w-full max-w-xs -rotate-2 rounded-xl bg-white p-5 shadow-lg ring-1 ring-black/5"
			>
				<div class="flex justify-between gap-2">
					<span class="h-4 w-32 rounded bg-black/80"></span>
					<span class="h-4 w-14 rounded bg-black/10"></span>
				</div>
				<div class="mbs-3 grid gap-2">
					<div class="flex justify-between">
						<span class="h-3 w-24 rounded bg-black/15"></span>
						<span class="h-3 w-12 rounded bg-black/25"></span>
					</div>
					<div class="flex justify-between">
						<span class="h-3 w-28 rounded bg-black/15"></span>
						<span class="h-3 w-16 rounded bg-black/25"></span>
					</div>
				</div>
				<div class="mbs-4 flex justify-between border-t border-black/10 pt-3">
					<span class="h-3 w-10 rounded bg-black/30"></span>
					<span class="h-4 w-16 rounded bg-black"></span>
				</div>
			</div>
			<h2 id="empty-title" class="text-2xl font-bold">No quotes yet</h2>
			<p class="max-w-sm text-black/70">Create your first quote and it will show up here.</p>
			<a
				href={resolve('/new-quote')}
				class="rounded bg-black px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/85"
			>
				Create your first quote
			</a>
		</section>
	{/each}
</section>
