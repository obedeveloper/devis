<script lang="ts">
	import { deleteLineItem, editLineItem } from '../../routes/[quoteId]/items.remote';
	import { formatAmount } from '$lib/utils';
	import { getConfirmDialog } from '$lib/components/confirm-dialog.svelte';

	const confirmDialog = getConfirmDialog();

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
	let saving = $state(false);
	let deleting = $state(false);
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
		saving = true;
		try {
			await editLineItem({
				id,
				description: editDescription,
				quantity: editQuantity,
				unit: editUnit,
				unitPrice: editUnitPrice
			});
			editing = false;
		} finally {
			saving = false;
		}
	}

	async function remove() {
		const confirmed = await confirmDialog.confirm({
			title: `Delete "${description}"?`,
			description: 'This line item will be removed from the quote.',
			confirmLabel: 'Delete'
		});

		if (!confirmed) return;

		deleting = true;
		try {
			await deleteLineItem(id);
		} finally {
			deleting = false;
		}
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
			<button onclick={cancel} class="rounded bg-black/10 px-3 py-1 text-sm hover:bg-black/15">
				Cancel
			</button>
			<button
				disabled={saving}
				aria-busy={saving}
				onclick={save}
				class="rounded bg-black/95 px-3 py-1 text-sm text-white hover:bg-black/85 aria-busy:bg-black/50"
			>
				{saving ? 'Saving…' : 'Save'}
			</button>
		</div>
	</li>
{:else}
	<li
		class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded bg-black/5 px-3 py-2"
	>
		<span class="min-w-0 break-words text-black/80">
			<span class="font-mono text-black/40">{length - index}.</span>
			{description}
			<span class="text-black/40">{quantity} {unit}</span>
		</span>
		<span class="flex min-w-0 flex-wrap items-center justify-end gap-3">
			<span class="font-mono text-sm text-black/80 uppercase">
				{formatAmount(unitPrice, currency)} × {quantity} = {amount}
			</span>
			<button onclick={startEdit} class="rounded bg-black/10 px-2 py-0.5 text-sm hover:bg-black/15">
				Edit
			</button>
			<button
				disabled={deleting}
				aria-busy={deleting}
				onclick={remove}
				class="rounded bg-red-300/50 px-2 py-0.5 text-sm hover:bg-red-300/70 aria-busy:bg-black/10 aria-busy:text-black/40"
			>
				{deleting ? 'Deleting…' : 'Delete'}
			</button>
		</span>
	</li>
{/if}
