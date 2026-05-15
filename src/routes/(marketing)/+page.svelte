<script lang="ts">
	import { resolve } from '$app/paths';
	import { signIn } from '$lib/auth/auth-client';
	import { getUser } from '$lib/auth/index.remote';
</script>

<svelte:head>
	<title>Devis - Generate quotes faster</title>
</svelte:head>

<h1>Hello!</h1>

{#if await getUser()}
	<a href={resolve('/dashboard')}>Dashboard</a>
{:else}
	<button onclick={() => signIn(resolve('/dashboard'))}>Sign In</button>
{/if}
