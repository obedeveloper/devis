<script lang="ts">
  import { goto } from '$app/navigation';
  import type { Estimate } from '$lib/utilities/types';
  import Table from './Table.svelte';
  import { m } from '$lib/paraglide/messages';
  import DownloadBtn from '../../routes/(app)/open/DownloadBtn.svelte';

  const { estimate, multiple }: { estimate: Estimate; multiple?: boolean } =
    $props();
  const { _id, title, scopeOfWork, expenses, extraExpenses, currency, note } =
    estimate;
</script>

<section class={`app-panel ${multiple ? 'surface-strong' : ''} space-y-5 p-6 sm:p-8`}>
  {#if !multiple}
    <div class="flex flex-wrap gap-3">
      <DownloadBtn title={title || 'estimate'} ids={[_id]}></DownloadBtn>
      <button
        aria-label="Edit"
        class="button-secondary"
        onclick={() => goto(`/edit/${_id}`)}
      >
        <i class="fa-solid fa-pen"></i>
        <span>Edit</span>
      </button>
    </div>
  {/if}

  <div class="space-y-2">
    <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
    <h2 class="text-lg text-[var(--app-text-soft)]">{scopeOfWork}</h2>
  </div>

  <div class="overflow-x-auto">
    <Table {expenses} {extraExpenses} {currency}></Table>
  </div>

  {#if note?.length}
    <div class="rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-4">
      <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--app-text-soft)]">
        {m.note()}
      </p>
      <p class="mt-2 text-sm leading-7 text-[var(--app-text-soft)]">{note}</p>
    </div>
  {/if}
</section>
