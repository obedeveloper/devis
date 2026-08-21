<script lang="ts">
	import { getConfirmDialog } from './confirm-dialog.svelte';

	const confirmDialog = getConfirmDialog();

	function oncancel(event: Event) {
		event.preventDefault();
		confirmDialog.cancel();
	}

	function onclose() {
		confirmDialog.syncClosed();
	}

	function onclick(event: MouseEvent) {
		if (event.target === confirmDialog.el) confirmDialog.cancel();
	}
</script>

<dialog
	bind:this={confirmDialog.el}
	{onclick}
	{oncancel}
	{onclose}
	class="m-auto w-[min(24rem,calc(100vw-2rem))] rounded-lg p-5 shadow-xl"
>
	<h3 class="text-lg font-semibold">{confirmDialog.title}</h3>
	{#if confirmDialog.description}
		<p class="mt-1 text-sm text-black/60">{confirmDialog.description}</p>
	{/if}
	<div class="mt-5 flex justify-end gap-2">
		<button
			bind:this={confirmDialog.cancelButton}
			onclick={() => confirmDialog.cancel()}
			class="rounded bg-black/10 px-4 py-1.5 font-medium hover:bg-black/15"
		>
			{confirmDialog.cancelLabel}
		</button>
		<button
			onclick={() => confirmDialog.accept()}
			class={`rounded px-4 py-1.5 font-semibold text-white ${
				confirmDialog.destructive ? 'bg-red-600 hover:bg-red-500' : 'bg-black/95 hover:bg-black/85'
			}`}
		>
			{confirmDialog.confirmLabel}
		</button>
	</div>
</dialog>

<style>
	dialog {
		border: none;
	}
	dialog::backdrop {
		background: rgb(0 0 0 / 0.4);
	}
</style>
