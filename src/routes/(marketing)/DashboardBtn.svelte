<script lang="ts">
	import { getUser } from '$lib/auth/index.remote';
	import { onMount } from 'svelte';
	import { type User } from '@boxicons/svelte';

	let user: Awaited<ReturnType<typeof getUser>> | null = $state(null);
	onMount(async () => (user = await getUser()));

	interface Content {
		icon: typeof User;
		text: string;
		action: () => void;
	}

	interface Props {
		yes: Content;
		no: Content;
		primary?: boolean;
	}

	const { yes, no, primary }: Props = $props();
</script>

<button
	class={[
		'inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium whitespace-nowrap transition disabled:cursor-wait disabled:opacity-60 sm:px-5',
		!primary &&
			'border border-neutral-200 text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-900',
		primary &&
			'bg-neutral-950 text-white hover:bg-neutral-800/75 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200/75'
	]}
	disabled={user === null}
	onclick={() => {
		if (!user) {
			return no.action();
		}

		yes.action();
	}}
>
	{#if user === null}
		Loading...
	{:else if user === undefined}
		<no.icon></no.icon> {no.text}
	{:else}
		<yes.icon></yes.icon> {yes.text}
	{/if}
</button>
