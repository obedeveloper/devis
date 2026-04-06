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
    <p>
      {m['empty-db']()}
      <a href="/new">{m['add-a-new-project']()}</a>
    </p>
  </NotFound>
{:else}
  {#if ids.length}
    <div transition:slide class="bunner">
      <label>
        <input
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
        role="button"
        aria-label="Open All"
        ><i class="fa-solid fa-external-link"></i> {m.open()}</a
      >

      <button
        class="delete"
        aria-busy={busy}
        onclick={async () => {
          busy = true;
          await deleteMany(selectedEstimates.ids);
          document.location = '/dashboard';
        }}><i class="fa-solid fa-trash"></i> {m.delete()}</button
      >
    </div>
  {/if}
  <div class="grid">
    {@render Estimates([...estimates].reverse())}
  </div>
{/if}

{#snippet Estimates(estimates: Estimate[])}
  {#each estimates as { _id, title, scopeOfWork, createdAt }}
    <Card {title} {scopeOfWork} {_id} {createdAt}></Card>
  {/each}
{/snippet}

<style lang="scss">
  @use '@picocss/pico/scss/colors' as *;

  div.grid {
    display: grid;
    --min: 250px;
    grid-template-columns: repeat(auto-fill, minmax(var(--min), 1fr));
    gap: 1rem;

    @media (width >= 700px) {
      --min: 300px;
    }

    @media (width >= 1000px) {
      --min: 350px;
    }
  }

  p {
    text-align: center;
  }

  label {
    padding: 0.5rem;
  }

  .bunner {
    padding-block-end: 1rem;
    display: flex;
    gap: 0.5rem 1rem;
    align-items: center;
    flex-wrap: wrap;

    label {
      margin: 0;
      padding: 0;
    }
  }

  .delete {
    background-color: $red-500;
    border-color: $red-500;
    color: white;
  }
</style>
