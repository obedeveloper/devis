<script lang="ts">
	import SocialProof from './SocialProof.svelte';
	import Features from './Features.svelte';
	import CTA from './CTA.svelte';
</script>

<svelte:head>
	<title>Devis - Effortless Estimating App for Quick and Professional Quotes</title>
	<meta
		name="description"
		content="Streamline your estimating process with Devis! 
		Our user-friendly app allows you to generate accurate quotes in minutes, 
		eliminating the need for spreadsheets and manual calculations. 
		Create polished PDF estimates effortlessly and focus on growing your business."
	/>
</svelte:head>

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

		& > *:not(:last-child) {
			margin-bottom: 20px;
		}

		@media (width > calc(640rem / 16)) {
			margin-block: 50px;
		}
	}

	h1,
	p {
		text-align: center;
	}

	h1 {
		font-size: calc(38rem / 16);
		line-height: 1.1;
		font-family: 'Irish Grover', system-ui;

		@media (width > calc(640rem / 16)) {
			font-size: calc(48rem / 16);
		}
	}
</style>
