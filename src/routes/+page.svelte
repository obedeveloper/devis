<script lang="ts">
	import Landing from '$lib/components/Landing.svelte';
	import Quotes from '$lib/components/Quotes.svelte';
	import { getUser } from '$lib/user.remote';
	import { SITE_DESCRIPTION, SITE_NAME } from '$lib/site';
	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>{SITE_NAME}</title>
	<meta name="description" content={SITE_DESCRIPTION} />
</svelte:head>

{#if !user}
	<Landing />
{:else}
	<main class="wrapper">
		<Quotes></Quotes>
	</main>
{/if}
