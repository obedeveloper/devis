<svelte:options css="injected" />

<script lang="ts">
  import Table from '$lib/components/Table.svelte';
  import { m } from '$lib/paraglide/messages';
  import type { Estimate } from '$lib/utilities/types';

  const {
    expenses,
    title,
    currency,
    extraExpenses,
    note,
    scopeOfWork,
  }: Estimate = $props();
</script>

<h1>{title}</h1>
<p>{scopeOfWork}</p>

<Table {expenses} {extraExpenses} {currency}></Table>

{#if note?.length}
  <p>
    {m.note()}: {note}
  </p>
{/if}

<style>
  :global {
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin-inline: 2.5rem;
      margin-block-start: 1rem;
    }

    h1 {
      margin-top: 0;
    }

    :is(table, tr, td, th) {
      border: 1px solid black;
      border-collapse: collapse;
    }

    :is(td, th) {
      padding: 0.35rem 0.75rem;
    }

    .bold {
      font-weight: bold;
    }
  }
</style>
