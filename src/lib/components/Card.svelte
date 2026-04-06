<script lang="ts">
  import { deleteEstimate } from '$lib/db.remote';
  import { selectedEstimates } from '$lib/utilities/states.svelte';

  interface CardProps {
    _id: string;
    createdAt: Date;
    title: string;
    scopeOfWork?: string;
  }

  const { _id, createdAt, title, scopeOfWork }: CardProps = $props();
  const readableDate = new Date(createdAt).toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let open = $state(false);
  let loading = $state(false);
  let deleted = $state(false);
</script>

{#if !deleted}
  <article class="app-panel surface-strong space-y-4 p-5">
    <header class="grid grid-cols-[auto_1fr_auto] items-start gap-3">
      <input
        class="mt-1 size-4"
        type="checkbox"
        bind:checked={
          () => selectedEstimates.ids.includes(_id),
          (v) => {
            selectedEstimates[v ? 'add' : 'remove'](_id);
          }
        }
      />

      <div class="space-y-2">
        <h2 class="text-xl font-semibold leading-tight tracking-tight">
          <a class="no-underline hover:text-[var(--app-primary-strong)]" href="/open/{_id}">
            {title}
          </a>
        </h2>
        {#if scopeOfWork}
          <p class="line-clamp-3 text-sm leading-6 text-[var(--app-text-soft)]">
            {scopeOfWork}
          </p>
        {/if}
      </div>

      <button
        aria-label="Delete"
        class="icon-button border-red-200 text-[var(--app-danger)] hover:border-red-300"
        onclick={() => (open = true)}
      >
        <i class="fa-solid fa-trash"></i>
      </button>
    </header>

    <time class="block text-xs font-medium uppercase tracking-[0.22em] text-[var(--app-muted)]" datetime={createdAt.toString()}>
      {readableDate}
    </time>
  </article>
{/if}

{#if open}
  <div class="fixed inset-0 z-50 grid place-items-center bg-black/45 px-4">
    <article class="app-panel surface-strong w-full max-w-md space-y-5 p-6">
      <div class="space-y-2">
        <h3 class="text-2xl font-semibold tracking-tight">Delete estimate?</h3>
        <p class="text-sm leading-6 text-[var(--app-text-soft)]">
          This action will permanently remove this estimate.
        </p>
      </div>

      <footer class="flex flex-wrap justify-end gap-3">
        <button class="button-secondary" onclick={() => (open = false)}>Cancel</button>
      <button
        class="button-danger"
        aria-busy={loading}
        disabled={loading}
        onclick={async () => {
          loading = true;
          await deleteEstimate(String(_id));
            open = false;
            deleted = true;
          }}>Confirm</button
        >
      </footer>
    </article>
  </div>
{/if}
