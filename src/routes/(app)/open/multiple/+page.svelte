<script lang="ts">
  import type { Estimate } from '$lib/utilities/types';
  import PreviewEstimate from '$lib/components/PreviewEstimate.svelte';
  import DownloadBtn from '../DownloadBtn.svelte';

  const { data } = $props();
  const estimates = data.estimates as Estimate[];
</script>

<svelte:head>
  <title>{estimates[0].title}</title>
</svelte:head>

<div>
  <DownloadBtn title={estimates[0].title} ids={data.ids}></DownloadBtn>
</div>

{#each estimates as estimate}
  <PreviewEstimate {estimate} multiple></PreviewEstimate>
{/each}

<style>
  div {
    margin-bottom: 1rem;
  }
</style>
