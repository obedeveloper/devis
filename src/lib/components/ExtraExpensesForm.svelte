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

<div class="form grid">
  {#each globalEstimate.data?.extraExpenses ?? [] as extraExpense, i (extraExpense)}
    <fieldset transition:fade>
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
        class="contrast outline red"
        onclick={() => globalEstimate.data.extraExpenses?.splice(i, 1)}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </fieldset>
  {/each}
</div>
