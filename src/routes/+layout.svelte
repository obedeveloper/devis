<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource/irish-grover';
	import '../styles.css';
	import Header from './Header.svelte';

	const { children } = $props();
</script>

<Header></Header>
{@render children()}
