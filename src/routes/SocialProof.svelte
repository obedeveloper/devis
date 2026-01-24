<script lang="ts">
	import { getPageContext } from './page-context';

	const { images, numberOfUsers } = getPageContext();
</script>

<section>
	<div>
		{#each images as src (src)}
			<img {src} alt="sample user profile" />
		{/each}
	</div>
	<span>+{numberOfUsers - images.length} more.</span>
</section>

<style>
	section {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6px;
	}

	div {
		display: flex;
	}

	span {
		opacity: 85%;
	}

	img {
		width: 48px;
		aspect-ratio: 1;
		object-fit: cover;
		object-position: top;
		border-radius: 50%;
		outline: 2px solid var(--color-white);

		&:not(:first-child) {
			margin-left: -12px;
		}
	}
</style>
