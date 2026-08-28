<script lang="ts">
	import { deleteQuote } from '$lib/quote.remote';
	import ConfirmDialog from './confirm-dialog.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import DeleteBtn from './delete-btn.svelte';

	interface Props {
		id: string;
		title: string;
	}

	const { id, title }: Props = $props();
</script>

<ConfirmDialog title={`Delete "${title}"?`} description="This action cannot be undone.">
	{#snippet triggerBtn(show)}
		<button onclick={show} class="rounded bg-red-300/50 px-3 py-1 hover:bg-red-300/70">
			Delete
		</button>
	{/snippet}

	{#snippet confirmBtn(hide)}
		<DeleteBtn
			busy={!!deleteQuote.pending}
			onclick={async () => {
				await deleteQuote(id);
				hide();
				goto(resolve('/'));
			}}
		></DeleteBtn>
	{/snippet}
</ConfirmDialog>
