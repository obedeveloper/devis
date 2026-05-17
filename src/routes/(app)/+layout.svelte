<script lang="ts">
	import { resolve } from '$app/paths';
	import { signOut } from '$lib/auth/auth-client';
	import { ArrowOutRightSquareHalf, ChartLine, File, ListPlus } from '@boxicons/svelte';

	const { children } = $props();
	const links = [
		{ href: '/dashboard', label: 'Dashboard', icon: ChartLine },
		{ href: '/new-quote', label: 'New quote', icon: ListPlus }
	] as const;
</script>

<header
	class="border-b border-neutral-200 bg-white/90 dark:border-neutral-800 dark:bg-neutral-950/90"
>
	<div
		class="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
	>
		<a href={resolve('/')} class="flex min-w-0 items-center gap-2">
			<File size="md" pack="filled"></File>
			<span class="hidden text-2xl font-black tracking-wide uppercase sm:inline">Devis</span>
		</a>

		<nav aria-label="App navigation">
			<ul class="flex items-center gap-1">
				{#each links as link (link.href)}
					<li>
						<a
							class="inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 sm:px-4 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white"
							href={resolve(link.href)}
						>
							<link.icon></link.icon>
							<span class="hidden sm:inline">{link.label}</span>
						</a>
					</li>
				{/each}
				<li>
					<button
						onclick={async () => await signOut()}
						class="inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-950 sm:px-4 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-white"
					>
						<ArrowOutRightSquareHalf />
						<span class="hidden sm:inline">Sign Out</span>
					</button>
				</li>
			</ul>
		</nav>
	</div>
</header>

<div class="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
	{@render children()}
</div>
