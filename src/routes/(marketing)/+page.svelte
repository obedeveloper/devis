<script lang="ts">
	import { Rocket, ChartSine, ListPlus, Compass, VolumeFull } from '@boxicons/svelte';
	import DashboardBtn from './DashboardBtn.svelte';
	import { signIn } from '$lib/auth/auth-client';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import QuotePreview from './QuotePreview.svelte';
	import FeatureSection from './FeatureSection.svelte';
	import devisSound from '$lib/assets/devis.mp3';
	import { onMount } from 'svelte';

	let audio: HTMLAudioElement | undefined = $state();
	onMount(() => (audio = new Audio(devisSound)));
</script>

<svelte:head>
	<title>Devis - Generate quotes faster</title>
</svelte:head>

<section
	class="mx-auto grid w-full max-w-6xl gap-12 px-5 pt-14 pb-16 sm:px-8 sm:pt-20 lg:grid-cols-[1fr_420px] lg:pb-24"
>
	<div class="max-w-2xl">
		<p class="mb-5 text-sm font-medium text-neutral-500 dark:text-neutral-400">
			Quotes, kept simple
		</p>
		<h1
			class="flex items-center gap-3 text-5xl leading-tight font-semibold tracking-normal text-neutral-950 sm:text-6xl dark:text-white"
		>
			/də.vi/
			<VolumeFull size="lg" onclick={() => audio?.play()} />
		</h1>
		<p class="mt-6 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-300">
			Create clear client quotes with line items, extras, notes, and currency in one focused
			workspace.
		</p>
		<div class="mt-9 flex flex-col gap-3 *:py-2 sm:flex-row">
			<DashboardBtn
				yes={{ text: 'Open dashboard', icon: ChartSine, action: () => goto(resolve('/dashboard')) }}
				no={{ text: 'Start a quote', icon: Rocket, action: () => signIn('/new-quote') }}
				primary
			></DashboardBtn>
			<DashboardBtn
				yes={{ text: 'New quote', icon: ListPlus, action: () => goto(resolve('/new-quote')) }}
				no={{ text: 'View sample', icon: Compass, action: () => goto(resolve('/sample')) }}
			></DashboardBtn>
		</div>
	</div>
	<QuotePreview></QuotePreview>
</section>

<FeatureSection></FeatureSection>
