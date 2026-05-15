<script lang="ts">
	import { resolve } from '$app/paths';

	const { children } = $props();
</script>

<a href={resolve('/new-quote')}>create new quote</a>
<a href={resolve('/dashboard')}>Dashboard</a>
<a href={resolve('/')}>Home</a>

{@render children()}
