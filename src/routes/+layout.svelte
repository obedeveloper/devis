<script lang="ts">
	import './layout.css';
	import { resolve } from '$app/paths';
	import { navigating } from '$app/state';
	import { signOut, signIn } from '$lib/auth-client';
	import { getUser } from '$lib/user.remote';
	import { SITE_NAME } from '$lib/site';
	import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';
	import BusyButton from '$lib/components/BusyButton.svelte';
	import { provideConfirmDialog } from '$lib/components/confirm-dialog.svelte';
	import OpenGraph from './open-graph.svelte';

	provideConfirmDialog();

	let { children } = $props();
	const user = $derived(await getUser());
	let signingOut = $state(false);

	async function onsignOut() {
		signingOut = true;
		try {
			await signOut();
		} finally {
			signingOut = false;
		}
	}
</script>

<OpenGraph></OpenGraph>

{#if navigating.to}
	<div class="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-black/10" aria-hidden="true">
		<div class="nav-progress h-full w-1/3 rounded-full bg-white"></div>
	</div>
{/if}

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
>
	Skip to content
</a>

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
				onclick={onsignOut}
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

<div id="main">
	{@render children()}
</div>

<ConfirmDialog />

<footer class="mbs-8 border-t border-black/10 py-6">
	<div class="wrapper flex flex-wrap items-center justify-between gap-2 text-sm text-black/60">
		<span class="font-semibold text-black">{SITE_NAME}</span>
		<p>Professional quotes in minutes.</p>
		<span>© {new Date().getFullYear()} {SITE_NAME}</span>
	</div>
</footer>

<style>
	.nav-progress {
		animation: nav-progress-slide 1.2s ease-in-out infinite;
	}

	@keyframes nav-progress-slide {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(400%);
		}
	}
</style>
