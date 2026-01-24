<section>
	<button>Create your first estimate</button>
	<button>Try a demo</button>
</section>

<style>
	section {
		display: flex;
		gap: 12px 18px;
		flex-wrap: wrap;
		justify-content: center;
		padding-block: 20px;
	}

	button {
		transition: all 0.35s ease-in-out;
	}

	button:nth-child(1) {
		border: none;
		background-color: hsl(from var(--color-primary) h s calc(l * 1.5));
		color: var(--color-neutral-light);
		border-radius: 3px;
		padding: 10px 16px;

		&:hover {
			background-color: hsl(from var(--color-primary) h s calc(l * 2));
		}
	}

	button:nth-child(2) {
		border: 1.5px solid var(--color-accent);
		background-color: transparent;
		color: var(--color-accent);

		&:hover {
			border-radius: 3px;
			background-color: var(--color-accent);
			color: var(--color-neutral-light);
		}
	}
</style>
