<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { authClient } from '$lib/auth/client';
	import { getAuthenticatedUser, getUser } from '$lib/auth/user.remote';

	const { user } = $derived(await getUser());
</script>

<header class="wrapper">
	<div>
		<a href={resolve('/')}>DEVIS</a>
		{#if user}
			<button
				onclick={async () => {
					await authClient.signOut();
					await getUser().refresh();
					await getAuthenticatedUser().refresh();
				}}
			>
				Sign Out
			</button>
		{:else if page.url.pathname !== '/auth'}
			<a class="btn" href={resolve('/auth')}>Sign In</a>
		{/if}
	</div>
</header>

<style>
	header {
		padding-block: 8px;
		background-color: hsl(from var(--color-neutral-light) h s l / 80%);
		backdrop-filter: blur(3.5px);
		position: sticky;
		top: 0;
		z-index: 99;
	}

	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	a {
		text-decoration: none;
		font-size: calc(36rem / 16);
		color: var(--color-neutral-dark);
	}

	a:not(.btn) {
		font-family: 'Irish Grover', system-ui;
	}

	.btn {
		background-color: var(--color-accent);
		border: none;
		color: var(--color-neutral-light);
		font-size: calc(20rem / 16);
		border-radius: 4px;
		width: fit-content;
		height: fit-content;
		transition: all 0.35s ease-in-out;

		&:hover,
		&:focus {
			background-color: hsl(from var(--color-accent) h s calc(l * 1.45));
		}
	}

	button {
		border: none;
		background: var(--color-danger);
		color: var(--color-white);
		border-radius: 4px;
		transition: background-color 0.35s ease-in-out;

		&:hover {
			background-color: hsl(from var(--color-danger) h s calc(l * 1.3));
		}
	}
</style>
