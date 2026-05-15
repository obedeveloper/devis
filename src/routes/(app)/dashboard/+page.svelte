<script lang="ts">
	import { resolve } from '$app/paths';
	import { getAuthUser } from '$lib/auth/index.remote';
	import { getQuotes } from '$lib/quote/index.remote';
	import { formatDate } from '$lib/quote/utils';
</script>

<svelte:head>
	<title>Dashboard - {(await getAuthUser()).name}</title>
</svelte:head>

{#each await getQuotes() as quote (quote.id)}
	{@const { title, desc, createdAt } = quote}
	{@const formattedDate = formatDate.format(quote.createdAt)}

	<article>
		<h3><a href={resolve('/(app)/open-[quoteId]', { quoteId: quote.id })}>{title}</a></h3>
		<p>{desc}</p>
		<time datetime={createdAt.toString()}>{formattedDate}</time>
	</article>
{:else}
	<i>You have no quote, <a href={resolve('/new-quote')}>create</a> new one.</i>
{/each}
