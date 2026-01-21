<svelte:options css="injected" />

<script lang="ts">
  import Table from '$lib/components/Table.svelte';
  import { m } from '$lib/paraglide/messages';
  import type { Estimate } from '$lib/utilities/types';

  const { estimates }: { estimates: Estimate[] } = $props();
</script>

<main>
  {#each estimates as { expenses, title, currency, extraExpenses, note, scopeOfWork }}
    <section>
      <h1>{title}</h1>
      <p>{scopeOfWork}</p>

      <Table {expenses} {extraExpenses} {currency}></Table>

      {#if note?.length}
        <p>
          {m.note()}: {note}
        </p>
      {/if}
    </section>
  {/each}
</main>

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

  main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
