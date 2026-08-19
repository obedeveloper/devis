<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="sticky top-0 mbe-6 bg-black/85 py-3 text-white">
	<nav class="wrapper flex justify-between gap-4 text-lg *:hover:underline sm:justify-start">
		<a href={resolve('/')}>Home</a>
		<a href={resolve('/new-quote')}>New Quote</a>
	</nav>
</header>

{@render children()}
