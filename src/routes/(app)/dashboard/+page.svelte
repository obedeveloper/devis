<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import NotFound from '$lib/components/NotFound.svelte';
  import { deleteMany } from '$lib/db.remote.js';
  import { selectedEstimates } from '$lib/utilities/states.svelte';
  import type { Estimate } from '$lib/utilities/types';
  import { slide } from 'svelte/transition';

  const ids = $derived(selectedEstimates.ids);
  const { data } = $props();
  const { estimates } = data;
  let busy = $state(false);
  let confirmDeleteOpen = $state(false);
</script>

<svelte:head>
  <title>Devis</title>
</svelte:head>

{#if !estimates || estimates.length === 0}
  <NotFound>
    <p class="text-lg text-[var(--app-text-soft)]">
      No estimates yet.
      <a class="ml-2 font-semibold text-[var(--app-primary-strong)] underline-offset-4 hover:underline" href="/new">Add a new project</a>
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
        Select all
      </label>

      <a
        href="/open/multiple?estimates={selectedEstimates.ids}"
        class="button-secondary no-underline"
        aria-label="Open All"
        ><i class="fa-solid fa-external-link"></i> Open</a
      >

      <button
        class="button-danger"
        aria-busy={busy}
        disabled={busy}
        onclick={() => (confirmDeleteOpen = true)}><i class="fa-solid fa-trash"></i> Delete</button
      >
    </div>
  {/if}
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
    {@render Estimates([...estimates].reverse())}
  </div>
{/if}

{#if confirmDeleteOpen}
  <div class="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4">
    <article class="app-panel surface-strong w-full max-w-md space-y-5 p-6">
      <div class="space-y-2">
        <h3 class="text-2xl font-semibold tracking-tight">Delete selected estimates?</h3>
        <p class="text-sm leading-6 text-[var(--app-text-soft)]">
          This action will permanently remove {ids.length} selected {ids.length === 1
            ? 'estimate'
            : 'estimates'}.
        </p>
      </div>

      <footer class="flex flex-wrap justify-end gap-3">
        <button class="button-secondary" onclick={() => (confirmDeleteOpen = false)}>Cancel</button>
        <button
          class="button-danger"
          aria-busy={busy}
          disabled={busy}
          onclick={async () => {
            busy = true;
            await deleteMany(selectedEstimates.ids);
            confirmDeleteOpen = false;
            document.location = '/dashboard';
          }}>Confirm</button
        >
      </footer>
    </article>
  </div>
{/if}

{#snippet Estimates(estimates: Estimate[])}
  {#each estimates as { _id, title, scopeOfWork, createdAt }}
    <Card {title} {scopeOfWork} {_id} {createdAt}></Card>
  {/each}
{/snippet}
