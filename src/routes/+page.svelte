<script lang="ts">
	import Landing from '$lib/components/Landing.svelte';
	import Quotes from '$lib/components/Quotes.svelte';
	import { getUser } from '$lib/user.remote';
	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>Devis</title>
	<meta
		name="description"
		content="Create and manage professional quotes in minutes, and export them as polished PDFs. Free for freelancers and small businesses."
	/>
</svelte:head>

{#if !user}
	<Landing />
{:else}
	<main class="wrapper">
		<Quotes></Quotes>
	</main>
{/if}
