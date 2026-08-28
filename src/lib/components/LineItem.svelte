<script lang="ts">
	import { deleteLineItem, editLineItem } from '../../routes/[quoteId]/items.remote';
	import { formatAmount, formatQuantity } from '$lib/utils';
	import BusyButton from '$lib/components/BusyButton.svelte';
	import ConfirmDialog from './confirm-dialog.svelte';
	import DeleteBtn from './delete-btn.svelte';

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

	function cancel() {
		editing = false;
	}
</script>

{#if editing}
	<li class="grid gap-2 rounded bg-black/5 px-3 py-2">
		<input bind:value={editDescription} placeholder="Description" />
		<div class="grid grid-cols-3 gap-2">
			<input bind:value={editUnit} placeholder="Unit" />
			<input bind:value={editQuantity} type="number" placeholder="Qty" step="0.01" />
			<input bind:value={editUnitPrice} type="number" placeholder="Unit price" step="0.01" />
		</div>
		<div class="flex justify-end gap-2">
			<button onclick={cancel} class="rounded bg-black/10 px-3 py-1 text-sm hover:bg-black/15">
				Cancel
			</button>
			<BusyButton
				busy={saving}
				busyLabel="Saving…"
				onclick={save}
				class="rounded bg-black/95 px-3 py-1 text-sm text-white hover:bg-black/85 aria-busy:bg-black/50"
			>
				Save
			</BusyButton>
		</div>
	</li>
{:else}
	<li
		class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded bg-black/5 px-3 py-2"
	>
		<span class="details min-w-0 wrap-break-word text-black/80">
			<span class="font-mono text-black/40">{length - index}.</span>
			<span>{description}</span>
			<span class="text-black/40">{unit}</span>
			<span class="font-mono text-black/40">{formatQuantity(quantity)}</span>
			<span class="font-mono text-black/40">{formatAmount(unitPrice)}</span>
			<span class="font-mono">{amount}</span>
		</span>
		<span class="flex w-full min-w-0 items-center justify-end gap-3 sm:w-fit">
			<button onclick={startEdit} class="rounded bg-black/10 px-2 py-0.5 text-sm hover:bg-black/15">
				Edit
			</button>
			<ConfirmDialog
				title={`Delete "${description}"?`}
				description="This line item will be removed from the quote."
			>
				{#snippet triggerBtn(show)}
					<button
						onclick={show}
						class="rounded bg-red-300/50 px-2 py-0.5 text-sm hover:bg-red-300/70">Delete</button
					>
				{/snippet}

				{#snippet confirmBtn(hide)}
					<DeleteBtn
						busy={!!deleteLineItem.pending}
						onclick={async () => {
							await deleteLineItem(id);
							hide();
						}}
					></DeleteBtn>
				{/snippet}
			</ConfirmDialog>
		</span>
	</li>
{/if}

<style>
	.details span:empty {
		display: none;
	}

	.details *:not(:first-child, :nth-child(2))::before {
		content: ' - ';
	}
</style>
