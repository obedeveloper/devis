<script lang="ts">
	import './layout.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="https://fav.farm/📄" />
</svelte:head>

<main class="min-h-svh bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
	{@render children()}
</main>
