<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import type { Estimate } from '$lib/utilities/types';
  import EditCurrency from './EditCurrency.svelte';
  import ExtraExpensesForm from './ExtraExpensesForm.svelte';

  interface Props {
    globalEstimate: {
      data: Estimate;
    };
  }

  const { globalEstimate }: Props = $props();

  function addExtraExpense() {
    globalEstimate.data.extraExpenses?.push({
      desc: '',
      amount: undefined,
    });
  }
</script>

<details class="app-panel surface-strong overflow-hidden" name="edit-estimate">
  <summary class="flex items-center justify-between px-5 py-4 text-lg font-semibold tracking-tight">
    <span>{m.secondary()}</span>
    <i class="fa-solid fa-chevron-down text-sm text-[var(--app-text-soft)]"></i>
  </summary>

  <section class="space-y-5 border-t border-[var(--app-border)] px-5 py-5" spellcheck="false">
    <EditCurrency {globalEstimate}></EditCurrency>
    <ExtraExpensesForm {globalEstimate}></ExtraExpensesForm>

    <button class="button-secondary" aria-label="Add an expense" onclick={addExtraExpense}>
      <i class="fa-solid fa-plus"></i>
      <span>Add extra cost</span>
    </button>

    <div class="space-y-2">
      <label for="note">{m.note()}</label>
      <textarea
        id="note"
        bind:value={globalEstimate.data.note}
        placeholder={'Note: ' + m.note()}></textarea>
    </div>
  </section>
</details>
