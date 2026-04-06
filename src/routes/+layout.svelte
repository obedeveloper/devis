<script lang="ts">
  import '../styles/app.css';
  import '@fortawesome/fontawesome-free/css/all.css';
  import '@fontsource-variable/inter';
  import OpenGraph from '$lib/components/OpenGraph.svelte';

  let { children } = $props();
</script>

<OpenGraph></OpenGraph>

{@render children()}
