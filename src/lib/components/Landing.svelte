<script lang="ts">
	import { signIn } from '$lib/auth-client';

	const features = [
		{
			title: 'Build quotes fast',
			description:
				'Create quotes with titles, descriptions and line items in any currency — all from one simple form.'
		},
		{
			title: 'Export & share as PDF',
			description:
				'Turn any quote into a polished PDF you can download or share with your clients in one click.'
		},
		{
			title: 'Keep everything organized',
			description:
				'All your quotes live in one place. Edit, track and manage them whenever you need.'
		}
	];

	const steps = [
		{ title: 'Sign in', description: 'Create your account securely with Google.' },
		{ title: 'Create a quote', description: 'Add line items, set your currency and save.' },
		{ title: 'Share it', description: 'Download the PDF or send the link to your client.' }
	];

	const faqs = [
		{
			question: 'What is Devis?',
			answer:
				'Devis is a simple tool for freelancers and small businesses to create, manage and share professional quotes.'
		},
		{
			question: 'Is Devis free?',
			answer: 'Yes. Sign in with your Google account and start creating quotes right away.'
		},
		{
			question: 'Which currencies are supported?',
			answer: 'Any currency — you pick the one that fits each quote when you create it.'
		},
		{
			question: 'Can I edit a quote after creating it?',
			answer:
				'Absolutely. Every quote can be updated at any time, and its PDF is regenerated to match.'
		}
	];
</script>

<main class="wrapper">
	<section class="grid place-items-center py-20 text-center md:py-28" aria-labelledby="hero-title">
		<h1 id="hero-title" class="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
			Create professional quotes in minutes
		</h1>
		<p class="mbs-4 max-w-xl text-lg text-black/70">
			Devis helps you build, export and share polished quotes with your clients — no spreadsheets,
			no hassle.
		</p>
		<div class="mbs-8 flex flex-wrap justify-center gap-3">
			<button
				onclick={() => signIn('/')}
				class="rounded bg-black px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/85"
			>
				Get started free
			</button>
			<a
				href="#features"
				class="rounded border-2 border-black px-6 py-3 text-lg font-semibold transition-colors duration-300 hover:bg-black/5"
			>
				Learn more
			</a>
		</div>
	</section>

	<section id="features" class="mbs-8 scroll-mt-24" aria-labelledby="features-title">
		<h2 id="features-title" class="text-center text-3xl font-bold">Everything you need</h2>
		<div class="mbs-8 grid gap-3 md:grid-cols-3">
			{#each features as { title, description } (title)}
				<article class="rounded bg-black/5 p-5">
					<h3 class="text-xl font-semibold">{title}</h3>
					<p class="mbs-2 text-black/70">{description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="mbs-16" aria-labelledby="how-title">
		<h2 id="how-title" class="text-center text-3xl font-bold">How it works</h2>
		<ol class="mbs-8 grid gap-3 md:grid-cols-3">
			{#each steps as { title, description }, i (title)}
				<li class="rounded bg-black/5 p-5">
					<span
						class="grid size-9 place-items-center rounded-full bg-black text-lg font-bold text-white"
						aria-hidden="true"
					>
						{i + 1}
					</span>
					<h3 class="mbs-3 text-xl font-semibold">{title}</h3>
					<p class="mbs-1 text-black/70">{description}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section class="mx-auto mbs-16 max-w-2xl" aria-labelledby="faq-title">
		<h2 id="faq-title" class="text-center text-3xl font-bold">Frequently asked questions</h2>
		<div class="mbs-8 grid gap-3">
			{#each faqs as { question, answer } (question)}
				<details class="rounded bg-black/5 p-4 open:bg-black/10">
					<summary class="cursor-pointer font-semibold">{question}</summary>
					<p class="mbs-2 text-black/70">{answer}</p>
				</details>
			{/each}
		</div>
	</section>

	<section
		class="mb-12 rounded-lg bg-black px-6 py-14 text-center text-white"
		aria-label="Call to action"
	>
		<h2 class="text-3xl font-bold">Ready to make your first quote?</h2>
		<button
			onclick={() => signIn('/')}
			class="mbs-6 rounded bg-white px-6 py-3 text-lg font-semibold text-black transition-colors duration-300 hover:bg-white/85"
		>
			Get started free
		</button>
	</section>
</main>
