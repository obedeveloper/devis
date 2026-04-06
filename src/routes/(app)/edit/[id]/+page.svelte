<script lang="ts">
  import { goto } from '$app/navigation';
  import EditAdditional from '$lib/components/EditAdditional.svelte';
  import EditRequired from '$lib/components/EditRequired.svelte';
  import { updateEstimate } from '$lib/db.remote';
  import { GlobalEstimate } from '$lib/utilities/states.svelte.js';

  const { data } = $props();
  const estimate = data.estimate;

  export const globalEstimate = new GlobalEstimate(estimate);

  if (!estimate.expenses) globalEstimate.data.expenses = [];
  if (!estimate.extraExpenses) globalEstimate.data.extraExpenses = [];

  let busy = $state(false);
</script>

<svelte:head>
  <title>{globalEstimate.data?.title}</title>
</svelte:head>

<section class="space-y-4">
  <div class="flex justify-start">
    <button
      aria-busy={busy}
      disabled={busy}
      onclick={async () => {
        busy = true;

        await updateEstimate({ ...globalEstimate.data });

        goto('/open/' + globalEstimate.data._id);
      }}
    >
      <i class="fa-solid fa-save"></i>
      <span>Save</span>
    </button>
  </div>

  <EditRequired {globalEstimate}></EditRequired>
  <EditAdditional {globalEstimate}></EditAdditional>
</section>
