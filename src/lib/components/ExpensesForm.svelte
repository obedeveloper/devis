<script lang="ts">
  import type { Estimate } from '$lib/utilities/types';
  import { fade } from 'svelte/transition';

  interface Props {
    globalEstimate: {
      data: Estimate;
    };
  }

  const { globalEstimate }: Props = $props();
</script>

<div class="space-y-3">
  {#each globalEstimate.data.expenses ?? [] as expense, i (expense)}
    <fieldset transition:fade class="input-card grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_auto]">
      <input
        type="text"
        bind:value={expense.desc}
        placeholder="Description"
      />
      <input
        type="text"
        bind:value={expense.unit}
        placeholder="Unit"
      />
      <input
        type="number"
        bind:value={expense.qty}
        placeholder="Qty"
      />
      <input
        type="number"
        bind:value={expense.unitCost}
        placeholder="Unit cost"
      />
      <button
        aria-label="Delete"
        class="icon-button self-start text-[var(--app-danger)]"
        onclick={() => globalEstimate.data.expenses?.splice(i, 1)}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </fieldset>
  {/each}
</div>
