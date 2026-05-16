<script lang="ts">
	import content from './landing.content.json';
</script>

<section
	class="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40"
>
	<div class="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-3">
		{#each content.features as feature (feature.title)}
			<article>
				<h2 class="text-base font-semibold">{feature.title}</h2>
				<p class="mt-3 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
					{feature.description}
				</p>
			</article>
		{/each}
	</div>
</section>
