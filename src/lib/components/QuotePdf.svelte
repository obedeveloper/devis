<svelte:options css="injected" />

<script lang="ts">
	import { formatAmount } from '$lib/utils';

	let {
		title,
		description,
		currency,
		lineItems
	}: {
		title: string;
		description: string | null;
		currency: string | null;
		lineItems: {
			description: string;
			quantity: number;
			unit: string | null;
			unitPrice: number;
		}[];
	} = $props();

	const total = $derived(lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0));
</script>

<h1>{title}</h1>
{#if description}
	<p class="desc">{description}</p>
{/if}

<table>
	<thead>
		<tr>
			<th>#</th>
			<th>Description</th>
			<th>Unit</th>
			<th class="num">Qty</th>
			<th class="num">Unit Price</th>
			<th class="num">Amount</th>
		</tr>
	</thead>
	<tbody>
		{#each lineItems as item, i (item.description)}
			<tr>
				<td>{i + 1}</td>
				<td>{item.description}</td>
				<td>{item.unit ?? '-'}</td>
				<td class="num">{item.quantity}</td>
				<td class="num">{formatAmount(item.unitPrice, currency)}</td>
				<td class="num">{formatAmount(item.quantity * item.unitPrice, currency)}</td>
			</tr>
		{/each}
	</tbody>
	<tfoot>
		<tr>
			<td></td>
			<td class="total-label">Total</td>
			<td colspan="3"></td>
			<td class="num total-value">{formatAmount(total, currency)}</td>
		</tr>
	</tfoot>
</table>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	h1 {
		font-size: 20px;
		margin-bottom: 4px;
	}
	p.desc {
		font-size: 14px;
		margin-bottom: 20px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th {
		border: 1px solid #000;
		padding: 8px 10px;
		text-align: left;
		font-size: 11px;
		text-transform: uppercase;
	}
	td {
		border: 1px solid #000;
		padding: 8px 10px;
		font-size: 13px;
	}
	.num {
		text-align: right;
	}
	tfoot td {
		font-weight: 600;
		font-size: 14px;
	}
	.total-label {
		text-align: left;
	}
</style>
