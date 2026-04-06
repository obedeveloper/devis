<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import NotFound from '$lib/components/NotFound.svelte';
  import { deleteMany } from '$lib/db.remote.js';
  import { m } from '$lib/paraglide/messages';
  import { selectedEstimates } from '$lib/utilities/states.svelte';
  import type { Estimate } from '$lib/utilities/types';
  import { slide } from 'svelte/transition';

  const ids = $derived(selectedEstimates.ids);
  const { data } = $props();
  const { estimates } = data;
  let busy = $state(false);
</script>

<svelte:head>
  <title>Devis</title>
</svelte:head>

{#if !estimates || estimates.length === 0}
  <NotFound>
    <p class="text-lg text-[var(--app-text-soft)]">
      {m['empty-db']()}
      <a class="ml-2 font-semibold text-[var(--app-primary-strong)] underline-offset-4 hover:underline" href="/new">{m['add-a-new-project']()}</a>
    </p>
  </NotFound>
{:else}
  {#if ids.length}
    <div transition:slide class="app-panel mb-4 flex flex-wrap items-center gap-3 p-4">
      <label class="flex items-center gap-2">
        <input
          class="size-4"
          type="checkbox"
          bind:checked={
            () => ids.length === estimates.length,
            (value) => {
              value
                ? selectedEstimates.addMany(estimates.map((val) => val._id))
                : selectedEstimates.clear();
            }
          }
        />
        {m['select-all']()}
      </label>

      <a
        href="/open/multiple?estimates={selectedEstimates.ids}"
        class="button-secondary no-underline"
        aria-label="Open All"
        ><i class="fa-solid fa-external-link"></i> {m.open()}</a
      >

      <button
        class="button-danger"
        aria-busy={busy}
        onclick={async () => {
          busy = true;
          await deleteMany(selectedEstimates.ids);
          document.location = '/dashboard';
        }}><i class="fa-solid fa-trash"></i> {m.delete()}</button
      >
    </div>
  {/if}
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {@render Estimates([...estimates].reverse())}
  </div>
{/if}

{#snippet Estimates(estimates: Estimate[])}
  {#each estimates as { _id, title, scopeOfWork, createdAt }}
    <Card {title} {scopeOfWork} {_id} {createdAt}></Card>
  {/each}
{/snippet}
