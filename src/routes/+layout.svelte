<script lang="ts">
  import { navigating } from '$app/state';
  import '../styles/app.css';
  import '@fortawesome/fontawesome-free/css/all.css';
  import '@fontsource-variable/inter';
  import OpenGraph from '$lib/components/OpenGraph.svelte';

  let { children } = $props();
</script>

<OpenGraph></OpenGraph>

{#if navigating.to}
  <div class="nav-feedback" aria-hidden="true"></div>
  <div class="nav-spinner" aria-live="polite" aria-label="Loading">
    <i class="fa-solid fa-spinner animate-spin"></i>
  </div>
{/if}

<div class:pending-shell={Boolean(navigating.to)}>
  {@render children()}
</div>
