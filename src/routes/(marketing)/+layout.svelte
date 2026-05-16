<script lang="ts">
	import { resolve } from '$app/paths';
	import { File, User, ChartLine } from '@boxicons/svelte';
	import DashboardBtn from './DashboardBtn.svelte';
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/auth/auth-client';

	const { children } = $props();
</script>

<header class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
	<div class="flex min-w-0 items-center gap-2">
		<File size="md" pack="filled"></File>
		<a href={resolve('/')} class="truncate text-2xl font-black tracking-wide uppercase sm:text-4xl"
			>Devis</a
		>
	</div>
	<DashboardBtn
		yes={{ text: 'Dashboard', icon: ChartLine, action: () => goto(resolve('/dashboard')) }}
		no={{ icon: User, text: 'Sign In', action: () => signIn('/dashboard') }}
	></DashboardBtn>
</header>

{@render children()}
