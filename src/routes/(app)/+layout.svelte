<script lang="ts">
	import { resolve } from '$app/paths';

	const { children } = $props();
	const links = ['/', '/dashboard', '/new-quote'] as const;
</script>

<nav>
	<ul>
		{#each links as link (link)}
			{@const text = link.replace('/', '').replace('-', ' ')}
			<li><a href={resolve(link)}>{text || 'home'}</a></li>
		{/each}
	</ul>
</nav>

{@render children()}
