<script lang="ts">
	import { deleteLineItem, editLineItem } from '../../routes/[quoteId]/items.remote';
	import { formatAmount } from '$lib/utils';
	import { confirm } from '$lib/components/confirm-dialog.svelte';

	interface Props {
		id: string;
		description: string;
		quantity: number;
		unit: string | null;
		unitPrice: number;
		currency?: string | null;
		index: number;
		length: number;
	}

	const { id, description, quantity, unit, unitPrice, currency, index, length }: Props = $props();

	const amount = $derived(formatAmount(quantity * unitPrice, currency));

	let editing = $state(false);
	let editDescription = $state('');
	let editQuantity = $state(0);
	let editUnit = $state('');
	let editUnitPrice = $state(0);

	function startEdit() {
		editDescription = description;
		editQuantity = quantity;
		editUnit = unit ?? '';
		editUnitPrice = unitPrice;
		editing = true;
	}

	async function save() {
		await editLineItem({
			id,
			description: editDescription,
			quantity: editQuantity,
			unit: editUnit,
			unitPrice: editUnitPrice
		});
		editing = false;
	}

	async function remove() {
		const confirmed = await confirm({
			title: `Delete "${description}"?`,
			description: 'This line item will be removed from the quote.',
			confirmLabel: 'Delete'
		});

		if (confirmed) await deleteLineItem(id);
	}

	function cancel() {
		editing = false;
	}
</script>

{#if editing}
	<li class="grid gap-2 rounded bg-black/5 px-3 py-2">
		<input bind:value={editDescription} placeholder="Description" />
		<div class="grid grid-cols-3 gap-2">
			<input bind:value={editQuantity} type="number" placeholder="Qty" step="0.01" />
			<input bind:value={editUnit} placeholder="Unit" />
			<input bind:value={editUnitPrice} type="number" placeholder="Unit price" step="0.01" />
		</div>
		<div class="flex justify-end gap-2">
			<button onclick={cancel} class="rounded bg-black/10 px-3 py-1 text-sm">Cancel</button>
			<button onclick={save} class="rounded bg-black/95 px-3 py-1 text-sm text-white">Save</button>
		</div>
	</li>
{:else}
	<li
		class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded bg-black/5 px-3 py-2"
	>
		<span class="text-black/80">
			<span class="font-mono text-black/40">{length - index}.</span>
			{description}
			<span class="text-black/40">{quantity} {unit}</span>
		</span>
		<span class="flex shrink-0 items-center gap-3">
			<span class="font-mono text-sm text-black/80 uppercase">
				{formatAmount(unitPrice, currency)} × {quantity} = {amount}
			</span>
			<button onclick={startEdit} class="rounded bg-black/10 px-2 py-0.5 text-sm"> Edit </button>
			<button
				onclick={remove}
				class="rounded bg-red-300/50 px-2 py-0.5 text-sm hover:bg-red-300/70"
			>
				Delete
			</button>
		</span>
	</li>
{/if}
