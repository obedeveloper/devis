<script lang="ts">
	import { createQuote } from '$lib/quote/index.remote';
	import { ListPlus } from '@boxicons/svelte';
</script>

<svelte:head>
	<title>Devis - New Quote</title>
</svelte:head>

<section class="mb-8 max-w-2xl">
	<p class="mb-3 text-sm font-medium text-neutral-500 dark:text-neutral-400">New quote</p>
	<h1 class="text-3xl font-semibold tracking-normal text-neutral-950 dark:text-white">
		Create a client quote
	</h1>
	<p class="mt-3 leading-7 text-neutral-600 dark:text-neutral-300">
		Set the basic quote details first. You can add line items and extras on the next screen.
	</p>
</section>

<form
	class="max-w-2xl rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900"
	{...createQuote}
>
	<div class="grid gap-5">
		<label class="grid gap-2">
			<span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">Quote title</span>
			<input
				class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
				{...createQuote.fields.title.as('text')}
				placeholder="Two-bedroom house finishing"
			/>
			{#each createQuote.fields.title.issues() as issue (issue)}
				<p class="text-sm text-red-600 dark:text-red-400">{issue.message}</p>
			{/each}
		</label>
		<label class="grid gap-2">
			<span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">Quote description</span>
			<textarea
				class="min-h-28 min-w-0 resize-y rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm leading-6 transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
				{...createQuote.fields.desc.as('text')}
				placeholder="Short summary for the client"
			></textarea>
		</label>
		<label class="grid gap-2 sm:max-w-48">
			<span class="text-sm font-medium text-neutral-700 dark:text-neutral-200">Currency</span>
			<input
				class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm uppercase transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
				{...createQuote.fields.currency.as('text')}
				placeholder="RWF"
			/>
			{#each createQuote.fields.currency.issues() as issue (issue)}
				<p class="text-sm text-red-600 dark:text-red-400">{issue.message}</p>
			{/each}
		</label>
	</div>

	<div class="mt-6 flex justify-end">
		<button
			class="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800/75 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200/75"
		>
			<ListPlus></ListPlus>
			Create quote
		</button>
	</div>
</form>
