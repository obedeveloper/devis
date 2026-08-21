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

	const deleting = $derived(deleteQuote.pending > 0);

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
	<button
		disabled={deleting}
		aria-busy={deleting}
		onclick={ondelete}
		class="rounded bg-red-300/50 px-3 py-1 hover:bg-red-300/70 aria-busy:bg-black/10 aria-busy:text-black/40"
	>
		{deleting ? 'Deleting…' : 'Delete'}
	</button>
	{#if failed}
		<span role="alert" class="text-sm text-red-600">Delete failed, try again.</span>
	{/if}
</span>
