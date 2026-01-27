<script lang="ts">
	import { authClient } from '$lib/auth/client';
	import googleIcon from './google-icon.svg';

	const { data } = $props();
</script>

<svelte:head>
	<title>Sign In - DEVIS</title>
	<meta
		name="description"
		content="Sign in to access your DEVIS account and manage your projects."
	/>
</svelte:head>

<main class="wrapper">
	<section style:--accent-color={data.accentColor}>
		<h1>Sign In</h1>
		<p>Just click the button below to sign in with your Google account.</p>
		<button onclick={() => authClient.signIn.social({ provider: 'google' })}>
			<img src={googleIcon} alt="Google icon" />
			Sign in with Google
		</button>
	</section>
</main>

<style>
	section {
		background-color: hsl(from var(--accent-color) h s l / 12%);
		accent-color: var(--accent-color);
		margin-block: 25px;
		padding: 15px 20px;
		margin-inline: auto;
		width: min(100%, 400px);
		border-radius: 8px;
		box-shadow: 0 0 4px var(--accent-color);
	}

	h1 {
		color: hsl(from var(--accent-color) h s calc(l * 0.5));
	}

	p {
		margin-top: 12px;
		margin-bottom: 48px;
	}

	button {
		background-color: inherit;
		display: flex;
		gap: 8px;
		width: 100%;
		justify-content: center;
		align-items: center;
		border-radius: 50vh;
		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: hsl(from var(--accent-color) h s calc(l * 0.35));
			color: var(--color-white);
			border-color: transparent;
		}
	}

	img {
		width: 32px;
	}
</style>
