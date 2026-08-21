<script lang="ts">
	import { signIn } from '$lib/auth-client';
	import Quotes from '$lib/components/Quotes.svelte';
	import { getUser } from '$lib/user.remote';
	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>Devis</title>
</svelte:head>

<main class={[!user && 'grid min-h-svh place-content-center', 'wrapper']}>
	{#if !user}
		<section>
			<h3 class="mbe-4">You are signed out! Sign in to continue.</h3>
			<button
				onclick={() => signIn()}
				class="mx-auto block rounded bg-black px-5 py-2 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/85"
			>
				Sign in
			</button>
		</section>
	{:else}
		<Quotes></Quotes>
	{/if}
</main>
