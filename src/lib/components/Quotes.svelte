<script lang="ts">
	import { resolve } from '$app/paths';
	import { getQuotes } from '$lib/quote.remote';
	const quotes = await getQuotes();
</script>

<section
	class={[quotes.length && 'grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),420px))] gap-3']}
>
	{#each quotes as { id, ...data } (id)}
		{const { title, description, currency, createdAt } = data}
		{const date = new Date(createdAt)}

		<article class="rounded bg-black/15 p-3 text-black/80">
			<h3 class="text-lg font-semibold text-black">{title}</h3>
			<p>{description}</p>

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
