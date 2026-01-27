<script lang="ts">
	import { getAuthenticatedUser } from '$lib/auth/user.remote';

	const { user } = $derived(await getAuthenticatedUser());
</script>

<main class="wrapper">
	<section>
		<img src={user.image} alt={user.name} />
		<div>
			<h1>{user.name}</h1>
			<p>{user.email} • {user.createdAt.toLocaleDateString()}</p>
		</div>
	</section>
</main>

<style>
	main {
		margin-block: 1.25rem;
	}

	section {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}

	img {
		flex-shrink: 0;
		border-radius: 50%;
		width: 5rem;
		height: 5rem;
		object-fit: cover;
	}

	div {
		flex: 1;
		min-width: 0;
	}

	h1 {
		margin-bottom: 0.25rem;
		font-size: 1.75rem;
		font-weight: 600;
	}

	p {
		font-size: 0.95rem;
		color: var(--color-neutral-dark);
		opacity: 0.85;
	}

	@media (width < 30rem) {
		section {
			gap: 1rem;
		}

		img {
			width: 3.5rem;
			height: 3.5rem;
			border-width: 2px;
		}

		h1 {
			font-size: 1.25rem;
		}

		p {
			font-size: 0.875rem;
		}
	}
</style>
