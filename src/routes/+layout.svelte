<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource/irish-grover';
	import '../styles.css';
	import Header from './Header.svelte';

	const { children, data } = $props();
</script>

<Header showSignInButton={!data.isAuthPage} userLoggedIn={!!data.user}></Header>
{@render children()}
