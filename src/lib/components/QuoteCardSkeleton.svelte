<script lang="ts">
	let { rows = 2, class: className = '' }: { rows?: number; class?: string } = $props();

	const rowPatterns = [
		['w-24', 'w-12'],
		['w-28', 'w-16'],
		['w-20', 'w-12']
	] as const;
</script>

<div aria-hidden="true" class="rounded-xl bg-white p-5 ring-1 ring-black/5 {className}">
	<div class="flex justify-between gap-2">
		<span class="h-4 w-32 rounded bg-black/80"></span>
		<span class="h-4 w-14 rounded bg-black/10"></span>
	</div>
	<div class="mbs-3 grid gap-2">
		{#each rowPatterns.slice(0, rows) as [descriptionWidth, amountWidth] (descriptionWidth)}
			<div class="flex justify-between">
				<span class="h-3 {descriptionWidth} rounded bg-black/15"></span>
				<span class="h-3 {amountWidth} rounded bg-black/25"></span>
			</div>
		{/each}
	</div>
	<div class="mbs-4 flex justify-between border-t border-black/10 pt-3">
		<span class="h-3 w-10 rounded bg-black/30"></span>
		<span class="h-4 w-16 rounded bg-black"></span>
	</div>
</div>
