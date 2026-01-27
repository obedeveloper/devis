<script lang="ts">
	import { getUsersStats } from './stats.remote';

	let { totalUsers, sampleImages } = await getUsersStats();
	const numberOfSampleImages = sampleImages.length;

	if (numberOfSampleImages < 3) {
		for (let i = 0; i < 3 - numberOfSampleImages; i++) {
			sampleImages.push({ url: `/images/profile-${i + numberOfSampleImages + 1}.jpeg` });
		}
	}
</script>

<section>
	<div>
		{#each sampleImages as { url } (url)}
			<img
				src={url || '/images/profile-1.jpeg'}
				alt=""
				onerror={(e) => {
					const img = e.target as HTMLImageElement;
					img.setAttribute('src', '/images/profile-1.jpeg');
				}}
			/>
		{/each}
	</div>
	{#if totalUsers > 3}
		<span>+{totalUsers - numberOfSampleImages} more.</span>
	{/if}
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
