<script lang="ts">
	import BusyButton from './BusyButton.svelte';

	interface Props {
		busy: boolean;
		onclick: () => void;
	}

	const { busy, onclick }: Props = $props();
</script>

<BusyButton
	{busy}
	busyLabel="Deleting…"
	{onclick}
	class="rounded border-3 bg-red-600 px-4 py-1.5 font-semibold text-white hover:bg-red-500 focus-visible:border-black aria-busy:bg-gray-50/50 aria-busy:text-black"
>
	Delete
</BusyButton>
