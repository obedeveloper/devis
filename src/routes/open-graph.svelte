<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { SITE_DESCRIPTION, SITE_NAME } from '$lib/site';
	import openGraphImage from '$lib/assets/og.png';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href={page.url.toString()} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={SITE_NAME} />
	<meta property="og:description" content={SITE_DESCRIPTION} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={page.url.toString()} />
	<meta property="og:image" content={page.url.origin + openGraphImage} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
