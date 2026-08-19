<script lang="ts">
	import { signIn, signOut } from '$lib/auth-client';
	import { getUser } from '$lib/user.remote';
	const user = $derived(await getUser());
</script>

<svelte:head>
	<title>Devis</title>
</svelte:head>

{#if user}
	<h1 class="mbe-5 text-4xl font-bold text-blue-700">Hello {user.name}</h1>
	<button onclick={signOut}>Sign out</button>
{:else}
	<button onclick={signIn}>Sign in</button>
{/if}

<style>
	button {
		background: var(--color-gray-500);
		padding: 0.5rem;
		cursor: pointer;
	}
</style>
