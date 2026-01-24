<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<header class="wrapper">
	<div>
		<a href={resolve('/')}>DEVIS</a>
		<button>Sign In</button>
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
		font-family: 'Irish Grover', system-ui;
		color: var(--color-neutral-dark);
	}

	button {
		background-color: var(--color-accent);
		border: none;
		color: var(--color-neutral-light);
		font-size: calc(20rem / 16);
		border-radius: 4px;
		width: fit-content;
		height: fit-content;
		transition: all 0.35s ease-in-out;

		&:hover {
			background-color: hsl(from var(--color-accent) h s calc(l * 1.45));
		}
	}
</style>
