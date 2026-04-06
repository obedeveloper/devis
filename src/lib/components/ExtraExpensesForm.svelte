<script lang="ts">
  import { m } from '$lib/paraglide/messages';
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
  {#each globalEstimate.data?.extraExpenses ?? [] as extraExpense, i (extraExpense)}
    <fieldset transition:fade class="input-card grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_auto]">
      <input
        type="text"
        bind:value={extraExpense.desc}
        placeholder={m['expense.desc']()}
      />
      <input
        type="number"
        bind:value={extraExpense.amount}
        placeholder={m['amount']()}
      />
      <button
        aria-label="Delete"
        class="icon-button self-start text-[var(--app-danger)]"
        onclick={() => globalEstimate.data.extraExpenses?.splice(i, 1)}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </fieldset>
  {/each}
</div>
