<script lang="ts">
	import type { Snippet } from 'svelte';

	type Btn = Snippet<[() => void]>;

	interface Props {
		title: string;
		description?: string;
		cancelLabel?: string;
		triggerBtn: Btn;
		confirmBtn: Btn;
	}

	let dialog: HTMLDialogElement;
	const { title, description, cancelLabel, triggerBtn, confirmBtn }: Props = $props();

	const show = () => dialog.showModal();
	const hide = () => dialog.close();
</script>

{@render triggerBtn(show)}

<dialog
	bind:this={dialog}
	class="m-auto w-[min(24rem,calc(100vw-2rem))] rounded-lg border-0 p-5 shadow-xl backdrop:bg-black/25 backdrop:backdrop-blur-[2px]"
>
	<h3 class="text-lg font-semibold">{title}</h3>
	{#if description}
		<p class="mt-1 text-sm text-black/60">{description}</p>
	{/if}
	<div class="mt-5 flex justify-end gap-2">
		<button onclick={hide} class="rounded bg-black/10 px-4 py-1.5 font-medium hover:bg-black/15">
			{cancelLabel ?? 'Cancel'}
		</button>
		{@render confirmBtn(hide)}
	</div>
</dialog>
