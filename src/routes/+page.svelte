<script lang="ts">
	import '../styles.css';
	import '@fontsource-variable/inter';
	import '@fontsource/irish-grover';

	import { setPageContext } from './page-context.ts';

	import Header from './Header.svelte';
	import SocialProof from './SocialProof.svelte';
	import Features from './Features.svelte';
	import CTA from './CTA.svelte';

	const { data } = $props();
	// svelte-ignore state_referenced_locally
	setPageContext(data);
</script>

<Header></Header>

<main class="wrapper">
	<h1>Transform Your Estimating Process with Devis</h1>
	<p>Generate Professional Quotes in Minutes — No More Spreadsheets or Cluttered Paperwork!</p>

	<SocialProof></SocialProof>
	<CTA></CTA>
	<Features></Features>
</main>

<style>
	main {
		margin-block: 30px;

		@media (width > calc(640rem / 16)) {
			margin-block: 50px;
		}
	}

	:global(main > *:not(:last-child)) {
		margin-bottom: 20px;
	}

	h1,
	p {
		text-align: center;
	}

	h1 {
		font-size: calc(38rem / 16);
		line-height: 1.1;

		@media (width > calc(640rem / 16)) {
			font-size: calc(48rem / 16);
		}
	}
</style>
