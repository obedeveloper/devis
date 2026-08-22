<script lang="ts">
	import Landing from '$lib/components/Landing.svelte';
	import Quotes from '$lib/components/Quotes.svelte';
	import { getUser } from '$lib/user.remote';
	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>Devis</title>
</svelte:head>

{#if !user}
	<Landing />
{:else}
	<main class="wrapper">
		<Quotes></Quotes>
	</main>
{/if}
