<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{page.status} · Devis</title>
</svelte:head>

<main class="wrapper grid place-content-center gap-2 text-center">
	<p class="font-mono text-6xl font-semibold text-black/20">{page.status}</p>
	<h1 class="text-xl font-semibold">{page.error?.message ?? 'Something went wrong!'}</h1>
	<a
		href={resolve('/')}
		class="mx-auto mt-3 rounded bg-black px-5 py-2 font-semibold text-white transition-colors duration-300 hover:bg-black/85"
	>
		Go home
	</a>
</main>
