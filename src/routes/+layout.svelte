<script lang="ts">
	import './layout.css';
	import { SITE_NAME } from '$lib/site';
	import OpenGraph from './open-graph.svelte';
	import Header from './header.svelte';
	import NavProgress from './nav-progress.svelte';

	let { children } = $props();
</script>

<OpenGraph></OpenGraph>
<NavProgress></NavProgress>
<Header></Header>
{@render children()}

<footer class="mbs-8 border-t border-black/10 py-6">
	<div class="wrapper flex flex-wrap items-center justify-between gap-2 text-sm text-black/60">
		<span class="font-semibold text-black">{SITE_NAME}</span>
		<p>Professional quotes in minutes.</p>
		<span>© {new Date().getFullYear()} {SITE_NAME}</span>
	</div>
</footer>
