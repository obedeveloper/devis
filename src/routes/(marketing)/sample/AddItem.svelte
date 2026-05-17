<script lang="ts">
	import { quote } from './items.svelte';

	let isExtraItem = $state(false);
	let defaultFormData = {
		desc: '',
		quantity: '',
		unit: '',
		unitPrice: ''
	};

	let formData = $state(defaultFormData);
	let descEl: HTMLInputElement;

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();

		const { desc, quantity, unitPrice } = formData;
		if (!desc.trim() || !+unitPrice) return;

		if (isExtraItem) {
			quote.extraItems.push({
				...formData,
				id: crypto.randomUUID(),
				amountCents: +unitPrice * 100
			});
		} else {
			quote.lineItems.push({
				...formData,
				unitPriceCents: +unitPrice * 100,
				quantity: +quantity || 1,
				id: crypto.randomUUID()
			});
		}

		descEl.focus();
		formData = defaultFormData;
	}
</script>

<form
	class="mb-8 grid gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-2 lg:grid-cols-[auto_1fr_110px_110px_140px_auto] dark:border-neutral-800 dark:bg-neutral-900"
	{onsubmit}
>
	<label
		class="flex items-center gap-2 text-sm text-neutral-700 sm:col-span-2 lg:col-span-1 dark:text-neutral-200"
	>
		<input
			class="size-4 rounded border-neutral-300 accent-neutral-950 dark:border-neutral-700 dark:accent-white"
			type="checkbox"
			bind:checked={isExtraItem}
		/>
		Extra
	</label>
	<input
		class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
		placeholder="Description"
		bind:value={formData.desc}
		bind:this={descEl}
	/>
	{#if !isExtraItem}
		<input
			class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
			type="number"
			step="any"
			placeholder="Quantity"
			bind:value={formData.quantity}
		/>
		<input
			class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
			placeholder="Unit"
			bind:value={formData.unit}
		/>
	{/if}
	<input
		class="h-10 min-w-0 rounded-md border border-neutral-200 bg-white px-3 text-sm transition outline-none placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:focus:border-neutral-600"
		type="number"
		step="any"
		placeholder={isExtraItem ? 'Amount' : 'Unit price'}
		bind:value={formData.unitPrice}
	/>

	<button hidden>Add item</button>
</form>
