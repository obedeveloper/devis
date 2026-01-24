<script lang="ts">
	import { getPageContext } from './page-context';

	const { features } = getPageContext();
</script>

<ul>
	{#each features as { icon, text, desc, color } (icon)}
		<li style:--color={color}>
			<span>{icon}</span>
			<strong>{text}</strong>
			{desc}
		</li>
	{/each}
</ul>

<style>
	ul {
		padding: 0;
		list-style: none;

		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 16px;
	}

	li {
		display: flex;
		flex-direction: column;
		background-color: hsl(from var(--color) h s l / 10%);
		border-radius: 8px;
		padding: 16px;
		gap: 10px;
		box-shadow: 0 0 3.5px var(--color);
	}

	span {
		border: 1.5px solid var(--color);
		background-color: inherit;
		width: fit-content;
		font-size: 32px;
		padding: 8px;
		border-radius: 4px;
	}
</style>
