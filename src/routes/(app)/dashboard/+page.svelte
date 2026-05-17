<script lang="ts">
	import { resolve } from '$app/paths';
	import { getAuthUser } from '$lib/auth/index.remote';
	import { getQuotes } from '$lib/quote/index.remote';
	import { formatDate } from '$lib/quote/utils';
	import { ListPlus } from '@boxicons/svelte';

	const user = await getAuthUser();
	const quotes = await getQuotes();
</script>

<svelte:head>
	<title>Dashboard - {user.name}</title>
</svelte:head>

<section class="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
	<div>
		<p class="mb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">Dashboard</p>
		<h1 class="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-white">
			{user.name}'s quotes
		</h1>
		<p class="mt-3 max-w-2xl leading-7 text-neutral-600 dark:text-neutral-300">
			Review active quotes, open a client estimate, or start a fresh one.
		</p>
	</div>

	<a
		class="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-medium whitespace-nowrap text-white transition hover:bg-neutral-800/75 sm:px-5 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200/75"
		href={resolve('/new-quote')}
	>
		<ListPlus></ListPlus>
		New quote
	</a>
</section>

{#if quotes.length}
	<section class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Quote previews">
		{#each quotes as quote (quote.id)}
			{@const { title, desc, createdAt, currency } = quote}
			{@const formattedDate = formatDate.format(createdAt)}

			<article
				class="flex min-h-52 flex-col rounded-lg border border-neutral-200 bg-neutral-50 p-5 shadow-sm transition hover:border-neutral-300 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 dark:hover:bg-neutral-900/70"
			>
				<div
					class="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4 dark:border-neutral-800"
				>
					<div class="min-w-0">
						<p class="text-xs font-medium tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
							Quote
						</p>
						<h2 class="mt-2 line-clamp-2 text-lg font-semibold text-neutral-950 dark:text-white">
							{title}
						</h2>
					</div>
					<p class="shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400">{currency}</p>
				</div>

				<div class="flex flex-1 flex-col pt-4">
					{#if desc}
						<p class="line-clamp-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">{desc}</p>
					{:else}
						<p class="text-sm leading-6 text-neutral-500 dark:text-neutral-500">No description</p>
					{/if}
				</div>

				<div class="mt-5 flex items-center justify-between gap-3">
					<time
						class="min-w-0 text-sm text-neutral-500 dark:text-neutral-400"
						datetime={createdAt.toString()}>{formattedDate}</time
					>
					<a
						class="inline-flex min-h-9 shrink-0 items-center justify-center rounded-md border border-neutral-200 px-3 text-sm font-medium text-neutral-800 transition hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-950"
						href={resolve('/(app)/open-[quoteId]', { quoteId: quote.id })}
					>
						Open
					</a>
				</div>
			</article>
		{/each}
	</section>
{:else}
	<section
		class="border-t border-neutral-200 py-12 text-center dark:border-neutral-800"
		aria-label="No quotes"
	>
		<h2 class="text-xl font-semibold text-neutral-950 dark:text-white">No quotes yet</h2>
		<p class="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-400">
			Create your first quote and it will appear here for quick review.
		</p>
		<a
			class="mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800/75 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200/75"
			href={resolve('/new-quote')}
		>
			<ListPlus></ListPlus>
			Create quote
		</a>
	</section>
{/if}
