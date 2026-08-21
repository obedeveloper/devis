<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { deleteQuote } from '$lib/quote.remote';
	import { confirm } from '$lib/components/confirm-dialog.svelte';

	interface Props {
		id: string;
		title: string;
	}

	const { id, title }: Props = $props();

	let failed = $state(false);

	async function ondelete() {
		failed = false;

		const confirmed = await confirm({
			title: `Delete "${title}"?`,
			description: 'This action cannot be undone.',
			confirmLabel: 'Delete'
		});

		if (!confirmed) return;

		try {
			await deleteQuote(id);
			goto(resolve('/'));
		} catch {
			failed = true;
		}
	}
</script>

<span class="flex items-center gap-2">
	<button onclick={ondelete} class="rounded bg-red-300/50 px-3 py-1 hover:bg-red-300/70">
		Delete
	</button>
	{#if failed}
		<span role="alert" class="text-sm text-red-600">Delete failed, try again.</span>
	{/if}
</span>
