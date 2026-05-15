<script lang="ts">
	import { goto } from '$app/navigation';
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

<button
	disabled={user === null}
	onclick={() => {
		if (!user) {
			return signIn(resolve('/dashboard'));
		}

		goto(resolve('/dashboard'));
	}}
>
	{#if user === null}
		Loading...
	{:else if user === undefined}
		Sign In
	{:else}
		Dashboard
	{/if}
</button>
