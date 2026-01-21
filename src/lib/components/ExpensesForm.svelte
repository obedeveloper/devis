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

<div class="form flex">
  {#each globalEstimate.data.expenses ?? [] as expense, i (expense)}
    <fieldset transition:fade>
      <input
        type="text"
        bind:value={expense.desc}
        placeholder={m['expense.desc']()}
      />
      <input
        type="text"
        bind:value={expense.unit}
        placeholder={m['expense.unit']()}
      />
      <input
        type="number"
        bind:value={expense.qty}
        placeholder={m['expense.qty']()}
      />
      <input
        type="number"
        bind:value={expense.unitCost}
        placeholder={m['expense.unit-cost']()}
      />
      <button
        aria-label="Delete"
        class="contrast outline red"
        onclick={() => globalEstimate.data.expenses?.splice(i, 1)}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </fieldset>
  {/each}
</div>
