<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { deleteQuote } from '$lib/quote.remote';

	interface Props {
		id: string;
		title: string;
	}

	const { id, title }: Props = $props();

	function ondelete({ id, title }: Props) {
		if (confirm(`Do you really want to delete "${title}" quote?`)) {
			deleteQuote(id);
			goto(resolve('/'));
		}
	}
</script>

<button onclick={() => ondelete({ id, title })} class="rounded bg-red-300/50 px-3 py-1">
	Delete
</button>
