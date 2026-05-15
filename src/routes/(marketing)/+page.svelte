<script lang="ts">
	import { resolve } from '$app/paths';
	import { signIn } from '$lib/auth/auth-client';
	import { getUser } from '$lib/auth/index.remote';
	import { onMount } from 'svelte';

	let user: Awaited<ReturnType<typeof getUser>> | null = $state(null);
	onMount(async () => (user = await getUser()));
</script>

<svelte:head>
	<title>Devis - Generate quotes faster</title>
</svelte:head>

<h1>Hello!</h1>

{#if user == null}
	<button disabled>Loading...</button>
{:else if user}
	<a href={resolve('/dashboard')}>Dashboard</a>
{:else}
	<button onclick={() => signIn(resolve('/dashboard'))}>Sign In</button>
{/if}
