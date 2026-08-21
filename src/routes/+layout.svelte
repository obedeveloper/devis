<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { signOut } from '$lib/auth-client';
	import { getUser } from '$lib/user.remote';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

	let { children } = $props();
	const user = $derived(await getUser());
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="sticky top-0 mbe-6 bg-black/85 py-3 text-white backdrop-blur-md">
	<nav class="wrapper flex justify-between gap-4 text-lg">
		<div class="flex gap-4 *:hover:underline">
			<a href={resolve('/')}>Home</a>
			<a href={resolve('/new-quote')}>New Quote</a>
		</div>
		{#if user}
			<button onclick={signOut} class="text-red-400 hover:underline">Sign out</button>
		{/if}
	</nav>
</header>

{@render children()}

<ConfirmDialog />

<footer class="mbs-8"></footer>
