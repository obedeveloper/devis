<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import type { Estimate } from '$lib/utilities/types';
  import ExpensesForm from './ExpensesForm.svelte';

  interface Props {
    globalEstimate: {
      data: Estimate;
    };
  }

  function addExpense() {
    globalEstimate.data.expenses.push({
      desc: '',
      unit: '',
      qty: undefined,
      unitCost: undefined,
    });
  }

  const { globalEstimate }: Props = $props();
</script>

<details class="app-panel surface-strong overflow-hidden" name="edit-estimate" open>
  <summary class="flex items-center justify-between px-5 py-4 text-lg font-semibold tracking-tight">
    <span>{m.primary()}</span>
    <i class="fa-solid fa-chevron-down text-sm text-[var(--app-text-soft)]"></i>
  </summary>

  <section class="space-y-5 border-t border-[var(--app-border)] px-5 py-5" spellcheck="false">
    <div class="space-y-3">
      <div class="input-card">
        <h1
          class="min-h-12 text-3xl font-semibold tracking-tight outline-none"
          contenteditable
          bind:innerText={globalEstimate.data.title}></h1>
      </div>

      <div class="input-card">
        <h2
          class="min-h-10 text-lg text-[var(--app-text-soft)] outline-none"
          contenteditable
          bind:innerText={globalEstimate.data.scopeOfWork}></h2>
      </div>
    </div>

    <ExpensesForm {globalEstimate}></ExpensesForm>

    <button class="button-secondary" aria-label="Add an expense" onclick={addExpense}>
      <i class="fa-solid fa-plus"></i>
      <span>Add line item</span>
    </button>
  </section>
</details>
