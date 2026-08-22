<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		busy: boolean;
		busyLabel?: string;
	}

	let { busy, busyLabel = 'Working…', children, class: className, ...rest }: Props = $props();
</script>

<button {...rest} disabled={rest.disabled || busy} aria-busy={busy} class={className}>
	{#if busy}
		{busyLabel}
	{:else}
		{@render children?.()}
	{/if}
</button>
