<script lang="ts">
	import { navigating } from '$app/state';
</script>

{#if navigating.to}
	<div class="fixed inset-x-0 top-0 z-50 h-0.5 overflow-hidden bg-black/10" aria-hidden="true">
		<div class="nav-progress h-full w-1/3 rounded-full bg-white"></div>
	</div>
{/if}

<style>
	.nav-progress {
		animation: nav-progress-slide 1.2s ease-in-out infinite;
	}

	@keyframes nav-progress-slide {
		from {
			transform: translateX(-100%);
		}

		to {
			transform: translateX(400%);
		}
	}
</style>
