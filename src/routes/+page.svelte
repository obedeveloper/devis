<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import { signIn } from '$lib/auth-client';

  const { data } = $props();
  const user = data.user;

  const highlights = [
    {
      title: 'Start quickly',
      text: 'Create an estimate from a title and scope of work in a few moments.',
    },
    {
      title: 'Keep pricing clear',
      text: 'Organize required costs, extras, currency, and notes in one place.',
    },
    {
      title: 'Share confidently',
      text: 'Review the result and export a polished PDF when it is ready.',
    },
  ];

  const steps = [
    'Create a new estimate with a project title and short description.',
    'Add required costs, extra expenses, currency, and notes.',
    'Preview the final estimate and export it as a PDF to share.',
  ];

  const stats = [
    { value: '3 steps', label: 'from draft to PDF' },
    { value: '1 dashboard', label: 'for every estimate' },
    { value: '0 clutter', label: 'in the workflow' },
  ];
</script>

<svelte:head>
  <title>Devis | Build professional estimates clearly</title>
  <meta
    name="description"
    content="Devis helps freelancers and small teams create, edit, preview, and export clean price estimates."
  />
</svelte:head>

<div class="relative overflow-clip">
  <div class="pointer-events-none absolute right-[-12rem] top-10 -z-10 size-[34rem] rounded-full bg-[radial-gradient(circle,var(--app-bg-accent),transparent_68%)] blur-2xl"></div>
  <div class="pointer-events-none absolute left-[-8rem] top-[28rem] -z-10 size-[24rem] rounded-full bg-[radial-gradient(circle,rgba(245,200,109,0.14),transparent_70%)] blur-2xl"></div>

  <section class="page-shell grid gap-6 py-4 sm:py-6">
    <header class="flex items-center justify-between gap-4">
      <a
        class="font-['Vibes'] text-5xl leading-none tracking-tight text-[var(--app-text)] no-underline"
        href="/"
        aria-label="Devis home">Devis</a
      >

      {#if user}
        <a
          class="button-secondary inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold no-underline"
          href="/dashboard">Open dashboard</a
        >
      {:else}
        <button class="button-secondary" type="button" onclick={() => signIn('/dashboard')}>
          Sign in
        </button>
      {/if}
    </header>

    <div class="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_22rem] lg:items-end">
      <div class="space-y-6">
        <div class="space-y-4">
          <p class="section-heading">Create estimates without the spreadsheet mess</p>
          <h1 class="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Devis helps you create, manage, preview, and export professional estimates.
          </h1>
          <p class="max-w-2xl text-lg leading-8 text-[var(--app-text-soft)]">
            Built for freelancers, studios, and small teams that need fast quotes,
            clean structure, and client-ready PDF exports.
          </p>
        </div>

        <div class="flex flex-wrap gap-3">
          {#if user}
            <a class="button-primary" href="/dashboard">Go to dashboard</a>
            <a class="button-secondary no-underline" href="/new">Create new estimate</a>
          {:else}
            <button type="button" onclick={() => signIn('/dashboard')}>Start with Google</button>
            <a class="button-secondary no-underline" href="#how-it-works">See how it works</a>
          {/if}
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          {#each stats as stat}
            <article class="app-panel p-4">
              <strong class="block text-2xl font-semibold tracking-tight">{stat.value}</strong>
              <span class="text-sm text-[var(--app-text-soft)]">{stat.label}</span>
            </article>
          {/each}
        </div>
      </div>

      <aside class="app-panel surface-strong relative overflow-hidden p-6">
        <div class="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--app-primary)_18%,transparent)_0%,transparent_100%)]"></div>
        <div class="relative space-y-5">
          <div>
            <p class="section-heading">What you can do</p>
            <h2 class="mt-2 text-3xl font-semibold tracking-tight">A lighter workflow for quotes</h2>
          </div>

          <ul class="space-y-3 text-sm leading-7 text-[var(--app-text-soft)]">
            <li class="flex gap-3">
              <span class="mt-2 size-2 rounded-full bg-[var(--app-primary)]"></span>
              <span>Create estimates in minutes.</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2 size-2 rounded-full bg-[var(--app-primary)]"></span>
              <span>Track every quote from one dashboard.</span>
            </li>
            <li class="flex gap-3">
              <span class="mt-2 size-2 rounded-full bg-[var(--app-primary)]"></span>
              <span>Edit, preview, and export polished PDFs.</span>
            </li>
          </ul>

          <div class="rounded-3xl bg-[linear-gradient(135deg,var(--app-primary)_0%,var(--app-primary-strong)_100%)] p-5 text-[#102008] shadow-lg">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-[#203612]">
              Built for
            </p>
            <strong class="mt-2 block text-2xl font-semibold tracking-tight">
              Freelancers, consultants, and small teams
            </strong>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <main class="page-shell grid gap-4 pb-6">
    <section class="grid gap-4 md:grid-cols-3">
      {#each highlights as item}
        <article class="app-panel p-6">
          <h2 class="text-2xl font-semibold tracking-tight">{item.title}</h2>
          <p class="mt-3 text-[var(--app-text-soft)]">{item.text}</p>
        </article>
      {/each}
    </section>

    <section id="how-it-works" class="app-panel grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:p-8">
      <div class="space-y-4">
        <p class="section-heading">How it works</p>
        <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
          A short flow from idea to estimate.
        </h2>
        <p class="max-w-2xl text-[var(--app-text-soft)]">
          Add the project basics, fill in pricing details, then review and export the
          estimate without switching tools.
        </p>
      </div>

      <ol class="space-y-4 rounded-[1.5rem] border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-5">
        {#each steps as step, i}
          <li class="flex gap-4 text-sm leading-7 text-[var(--app-text-soft)]">
            <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--app-primary)] font-semibold text-[#102008]">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        {/each}
      </ol>
    </section>

    <section class="app-panel surface-strong flex flex-col gap-5 p-6 sm:p-8">
      <div class="space-y-3">
        <p class="section-heading">Why Devis</p>
        <h2 class="text-3xl font-semibold tracking-tight sm:text-4xl">
          Use Devis when you want estimates to feel clear and professional.
        </h2>
        <p class="max-w-2xl text-[var(--app-text-soft)]">
          The focus stays on structure, speed, and readable output so you can move
          from draft to delivery with less overhead.
        </p>
      </div>

      {#if user}
        <a class="button-primary w-fit" href="/dashboard">Return to your estimates</a>
      {:else}
        <button class="w-fit" type="button" onclick={() => signIn('/dashboard')}>
          Create your first estimate
        </button>
      {/if}
    </section>
  </main>

  <Footer />
</div>
