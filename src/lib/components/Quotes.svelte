<script lang="ts">
	import { resolve } from '$app/paths';
	import { getQuotes } from '$lib/quote.remote';
	import { fade } from 'svelte/transition';
	import { SvelteSet } from 'svelte/reactivity';
	import DeleteQuote from './DeleteQuote.svelte';
	import BusyButton from './BusyButton.svelte';
	import QuoteCardSkeleton from './QuoteCardSkeleton.svelte';
	import { downloadUrl, sanitizeFilename } from '$lib/utils';
	const quotes = $derived(await getQuotes());

	const selected = new SvelteSet<string>();

	let downloading = $state(false);
	let failed = $state(false);

	const allSelected = $derived(quotes.length > 0 && quotes.every((q) => selected.has(q.id)));

	$effect(() => {
		for (const id of selected) {
			if (!quotes.some((q) => q.id === id)) selected.delete(id);
		}
	});

	function toggle(id: string) {
		if (selected.has(id)) selected.delete(id);
		else selected.add(id);
	}

	function toggleAll() {
		if (allSelected) selected.clear();
		else for (const quote of quotes) selected.add(quote.id);
	}

	async function downloadSelected() {
		if (!selected.size || downloading) return;
		downloading = true;
		failed = false;

		try {
			const first = quotes.find((q) => selected.has(q.id))!;
			await downloadUrl(
				`/export?ids=${[...selected].join(',')}`,
				`${sanitizeFilename(first.title)}.pdf`
			);
		} catch {
			failed = true;
		} finally {
			downloading = false;
		}
	}
</script>

{#if quotes.length && selected.size}
	<div class="mbe-3 flex flex-wrap items-center justify-between gap-2">
		<label class="flex cursor-pointer items-center gap-2 text-sm">
			<input
				type="checkbox"
				class="size-4 accent-black"
				checked={allSelected}
				onchange={toggleAll}
			/>
			{allSelected ? 'Clear all' : 'Select all'}
		</label>
		<span class="flex items-center gap-2">
			{#if failed}
				<span role="alert" class="text-sm text-red-600">Download failed, try again.</span>
			{/if}
			<BusyButton
				busy={downloading}
				busyLabel="Preparing…"
				onclick={downloadSelected}
				class="rounded bg-black px-4 py-1.5 text-sm font-semibold text-white hover:bg-black/85 aria-busy:bg-black/50"
			>
				Download ({selected.size})
			</BusyButton>
		</span>
	</div>
{/if}

<section
	class={[quotes.length && 'grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-3']}
>
	{#each quotes as { id, ...data } (id)}
		{const { title, description, currency, createdAt } = data}
		{const date = new Date(createdAt)}

		<article class="rounded bg-black/5 p-3 text-black/80" transition:fade>
			<div class="flex items-center justify-between gap-2">
				<div class="flex min-w-0 items-center gap-2">
					<input
						type="checkbox"
						class="size-4 shrink-0 accent-black"
						checked={selected.has(id)}
						onchange={() => toggle(id)}
						aria-label="Select {title}"
					/>
					<h3 class="line-clamp-1 min-w-0 text-lg font-semibold text-black">
						<a href={resolve('/[quoteId]', { quoteId: id })}>{title}</a>
					</h3>
				</div>
				<span class="shrink-0">
					<DeleteQuote {id} {title}></DeleteQuote>
				</span>
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
			<QuoteCardSkeleton class="w-full max-w-xs -rotate-2 shadow-lg" />
			<h2 id="empty-title" class="text-2xl font-bold">No quotes yet</h2>
			<p class="max-w-sm text-black/70">Create your first quote and it will show up here.</p>
			<a href={resolve('/new-quote')} class="btn-primary">Create your first quote</a>
		</section>
	{/each}
</section>
