<script lang="ts">
	import type { RemoteForm } from '@sveltejs/kit';

	type QuoteFields = { title: string; description: string; currency: string };

	interface Props {
		form: RemoteForm<QuoteFields, unknown>;
		values?: { title?: string; description?: string; currency?: string };
		buttonLabel: string;
	}

	let { form, values, buttonLabel }: Props = $props();

	$effect(() => {
		if (values) {
			form.fields.set(values);
		}
	});

	function asTitle(value?: string) {
		return value !== undefined ? form.fields.title.as('text', value) : form.fields.title.as('text');
	}

	function asDescription(value?: string) {
		return value !== undefined
			? form.fields.description.as('text', value)
			: form.fields.description.as('text');
	}

	function asCurrency(value?: string) {
		return value !== undefined
			? form.fields.currency.as('text', value)
			: form.fields.currency.as('text');
	}
</script>

<form {...form} class="mx-auto grid max-w-md gap-3 [&>label]:grid [&>label]:gap-1">
	<label>
		<span>Title</span>
		<input {...asTitle(values?.title)} />
		{#each form.fields.title.issues() as issue (issue)}
			<span class="text-red-500/95">{issue.message}</span>
		{/each}
	</label>
	<label>
		<span>Description (optional)</span>
		<input {...asDescription(values?.description)} />
	</label>
	<label>
		<span>Currency (optional)</span>
		<input {...asCurrency(values?.currency)} placeholder="RWF" />
	</label>

	<button
		class="mbs-3 rounded bg-black/95 py-2 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/85"
	>
		{buttonLabel}
	</button>
</form>
