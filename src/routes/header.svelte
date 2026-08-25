<script lang="ts">
	import { getUser } from '$lib/user.remote';
	import { resolve } from '$app/paths';
	import { SITE_NAME } from '$lib/site';
	import { signIn, signOut } from '$lib/auth-client';
	import BusyButton from '$lib/components/BusyButton.svelte';

	const user = await getUser();
	let signingOut = $state(false);

	async function onSignOut() {
		signingOut = true;
		await signOut();
		signingOut = false;
	}
</script>

<header class="sticky top-0 z-20 mbe-6 bg-black/85 py-3 text-white backdrop-blur-md">
	<nav class="wrapper flex justify-between gap-4 text-lg">
		{#if user}
			<div class="flex gap-4 *:hover:underline">
				<a href={resolve('/')}>Home</a>
				<a href={resolve('/new-quote')}>New Quote</a>
			</div>
			<BusyButton
				busy={signingOut}
				busyLabel="Signing out…"
				onclick={onSignOut}
				class="text-red-400 hover:underline aria-busy:text-red-400/50"
			>
				Sign out
			</BusyButton>
		{:else}
			<a href={resolve('/')} class="font-bold tracking-tight">{SITE_NAME}</a>
			<button
				onclick={() => signIn('/')}
				class="rounded bg-white px-4 py-1 font-semibold text-black transition-colors duration-300 hover:bg-white/85"
			>
				Sign in
			</button>
		{/if}
	</nav>
</header>
