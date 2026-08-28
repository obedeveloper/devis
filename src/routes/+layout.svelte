<script lang="ts">
	import './layout.css';
	import OpenGraph from './open-graph.svelte';
	import Header from './header.svelte';
	import NavProgress from './nav-progress.svelte';

	let { children } = $props();
</script>

<OpenGraph></OpenGraph>
<NavProgress></NavProgress>
<Header></Header>
{@render children()}

<footer class="mbs-8"></footer>
