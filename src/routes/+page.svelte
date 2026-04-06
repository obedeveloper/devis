<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import { signIn } from '$lib/auth-client';

  const { data } = $props();
  const user = data.user;

  const highlights = [
    {
      title: 'Start quickly',
      text: 'Create a project estimate from a simple title and scope of work.',
    },
    {
      title: 'Keep pricing clear',
      text: 'Separate required costs, extras, currency, and notes in one flow.',
    },
    {
      title: 'Share confidently',
      text: 'Preview the final result and export a polished PDF when it is ready.',
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

<div class="landing-shell">
  <div class="backdrop backdrop-one"></div>
  <div class="backdrop backdrop-two"></div>

  <section class="hero">
    <header class="hero-nav">
      <a class="brand" href="/" aria-label="Devis home">Devis</a>

      {#if user}
        <a class="ghost-link" href="/dashboard">Open dashboard</a>
      {:else}
        <button
          class="ghost-link"
          type="button"
          onclick={() => signIn('/dashboard')}
        >
          Sign in
        </button>
      {/if}
    </header>

    <div class="hero-copy">
      <h1>
        Devis is the place to create, manage, preview, and export professional
        estimates without the usual friction.
      </h1>
      <p class="lede">
        It is built for freelancers, studios, and small businesses that need a
        fast way to turn project details into a clean estimate clients can
        actually understand.
      </p>

      <div class="actions">
        {#if user}
          <a href="/dashboard" role="button">Go to dashboard</a>
          <a href="/new" role="button" class="secondary">Create new estimate</a>
        {:else}
          <button type="button" onclick={() => signIn('/dashboard')}>
            Start with Google
          </button>
          <a href="#how-it-works" role="button" class="secondary"
            >See how it works</a
          >
        {/if}
      </div>

      <div class="hero-stats" aria-label="Highlights">
        {#each stats as stat}
          <article class="stat-chip">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        {/each}
      </div>
    </div>

    <div class="hero-panel">
      <div class="panel-card">
        <p class="panel-label">What you can do</p>
        <ul>
          <li>Create estimates in minutes</li>
          <li>Track all quotes from one dashboard</li>
          <li>Open, edit, and export polished PDFs</li>
        </ul>
      </div>
      <div class="panel-metric">
        <span>Built for</span>
        <strong>Freelancers, consultants, and small teams</strong>
      </div>
    </div>
  </section>

  <main>
    <section class="info-grid">
      {#each highlights as item}
        <article class="feature-card">
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </article>
      {/each}
    </section>

    <section class="story-block" id="how-it-works">
      <div>
        <p class="section-kicker">How it works</p>
        <h2>A short flow from idea to estimate.</h2>
        <p>
          Add the project basics, fill in pricing details, then review and
          export the estimate without switching tools.
        </p>
      </div>

      <ol>
        {#each steps as step}
          <li>{step}</li>
        {/each}
      </ol>
    </section>

    <section class="closing-card">
      <div>
        <p class="section-kicker">Why Devis</p>
        <h2>
          Use Devis when you want estimates to feel clear and professional.
        </h2>
        <p>
          The focus stays on structure, speed, and readable output so you can
          move from draft to delivery with less overhead.
        </p>
      </div>

      {#if user}
        <a href="/dashboard" role="button">Return to your estimates</a>
      {:else}
        <button type="button" onclick={() => signIn('/dashboard')}
          >Create your first estimate</button
        >
      {/if}
    </section>
  </main>

  <div class="footer-wrap">
    <Footer />
  </div>
</div>

<style lang="scss">
  .landing-shell {
    --landing-bg: #f4f8e8;
    --landing-bg-soft: #fffcef;
    --landing-surface: rgba(255, 255, 255, 0.82);
    --landing-surface-strong: rgba(255, 255, 255, 0.94);
    --landing-border: rgba(19, 33, 16, 0.14);
    --landing-text: #132110;
    --landing-text-soft: rgba(19, 33, 16, 0.88);
    --landing-shadow: 0 24px 60px rgba(23, 39, 18, 0.11);
    --landing-panel: linear-gradient(180deg, #274816 0%, #14220d 100%);
    --landing-orb-a: rgba(174, 223, 73, 0.32);
    --landing-orb-b: rgba(255, 192, 92, 0.18);
  }

  @media (prefers-color-scheme: dark) {
    .landing-shell {
      --landing-bg: #091109;
      --landing-bg-soft: #101810;
      --landing-surface: rgba(17, 27, 16, 0.88);
      --landing-surface-strong: rgba(20, 32, 19, 0.96);
      --landing-border: rgba(205, 233, 189, 0.16);
      --landing-text: #eef7e8;
      --landing-text-soft: rgba(238, 247, 232, 0.9);
      --landing-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
      --landing-panel: linear-gradient(180deg, #91d447 0%, #4e7c26 100%);
      --landing-orb-a: rgba(145, 212, 71, 0.22);
      --landing-orb-b: rgba(115, 176, 255, 0.16);
    }
  }

  .landing-shell {
    background: radial-gradient(
        circle at top,
        var(--landing-orb-a) 0%,
        transparent 32%
      ),
      radial-gradient(
        circle at 85% 15%,
        var(--landing-orb-b) 0%,
        transparent 24%
      ),
      linear-gradient(
        180deg,
        var(--landing-bg) 0%,
        var(--landing-bg-soft) 45%,
        var(--landing-bg) 100%
      );
    min-height: 100dvh;
    color: var(--landing-text);
    position: relative;
    isolation: isolate;
    overflow: clip;
  }

  .backdrop {
    position: absolute;
    border-radius: 999px;
    filter: blur(20px);
    pointer-events: none;
    z-index: -1;
  }

  .backdrop-one {
    width: min(38rem, 65vw);
    height: min(38rem, 65vw);
    top: 4rem;
    right: -8rem;
    background: radial-gradient(
      circle at center,
      var(--landing-orb-a) 0%,
      transparent 70%
    );
  }

  .backdrop-two {
    width: min(28rem, 55vw);
    height: min(28rem, 55vw);
    top: 28rem;
    left: -6rem;
    background: radial-gradient(
      circle at center,
      var(--landing-orb-b) 0%,
      transparent 72%
    );
  }

  .hero,
  main,
  .footer-wrap {
    width: min(1080px, calc(100% - 2rem));
    margin-inline: auto;
  }

  .hero {
    padding: 1.25rem 0 3rem;
    display: grid;
    gap: 1.5rem;
  }

  .hero-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }

  .brand {
    text-decoration: none;
    color: var(--landing-text);
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: clamp(2.2rem, 4vw, 3.35rem);
    font-style: italic;
    font-weight: 700;
    letter-spacing: -0.04em;
    text-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }

  .ghost-link {
    border: 1px solid var(--landing-border);
    background: var(--landing-surface);
    color: var(--landing-text);
    text-decoration: none;
    padding: 0.75rem 1rem;
    border-radius: 999px;
    font-weight: 600;
    backdrop-filter: blur(16px);
    box-shadow: var(--landing-shadow);
  }

  .ghost-link:hover,
  .ghost-link:focus-visible {
    background: var(--landing-surface-strong);
    color: var(--landing-text);
  }

  button.ghost-link {
    appearance: none;
    cursor: pointer;
  }

  .hero-copy {
    display: grid;
    gap: 1rem;
    max-width: 44rem;
  }

  .section-kicker,
  .panel-label {
    text-transform: uppercase;
    letter-spacing: 0.14em;
    font-size: 0.8rem;
    font-weight: 700;
    margin: 0;
    color: var(--landing-text-soft);
  }

  h1,
  h2 {
    font-family: 'Georgia', 'Times New Roman', serif;
    letter-spacing: -0.04em;
    text-wrap: balance;
    color: var(--landing-text);
  }

  h1 {
    font-size: clamp(3rem, 6vw, 5.6rem);
    line-height: 0.95;
    margin: 0;
  }

  h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    margin-bottom: 0.75rem;
  }

  .lede {
    font-size: clamp(1.05rem, 2vw, 1.25rem);
    color: var(--landing-text-soft);
    margin: 0;
    max-width: 40rem;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding-top: 0.5rem;

    button {
      margin: 0;
    }
  }

  .hero-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    padding-top: 0.25rem;
  }

  .stat-chip {
    display: grid;
    gap: 0.1rem;
    min-width: 9rem;
    padding: 0.9rem 1rem;
    border-radius: 1.15rem;
    border: 1px solid var(--landing-border);
    background: var(--landing-surface);
    box-shadow: var(--landing-shadow);
    backdrop-filter: blur(18px);
  }

  .stat-chip strong {
    font-size: 1.25rem;
    line-height: 1;
  }

  .stat-chip span {
    color: var(--landing-text-soft);
    font-size: 0.95rem;
  }

  .hero-panel {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 1rem;
  }

  .panel-card,
  .feature-card,
  .story-block,
  .closing-card,
  .panel-metric {
    border: 1px solid var(--landing-border);
    background: var(--landing-surface);
    backdrop-filter: blur(20px);
    box-shadow: var(--landing-shadow);
  }

  .panel-card,
  .panel-metric,
  .feature-card,
  .story-block,
  .closing-card {
    border-radius: 1.5rem;
    padding: 1.25rem;
  }

  .panel-card {
    background: var(--landing-surface-strong);
  }

  .panel-card ul {
    margin-bottom: 0;
    color: var(--landing-text-soft);
  }

  .panel-metric {
    display: grid;
    align-content: end;
    gap: 0.5rem;
    background: var(--landing-panel);
    color: #f8fdf1;
    position: relative;
    overflow: hidden;
  }

  .panel-metric::after {
    content: '';
    position: absolute;
    inset: auto -10% -35% auto;
    width: 12rem;
    height: 12rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    filter: blur(10px);
  }

  .panel-metric span {
    opacity: 0.8;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
  }

  .panel-metric strong {
    font-size: 1.4rem;
    line-height: 1.1;
  }

  main {
    display: grid;
    gap: 1rem;
    padding-bottom: 2rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .feature-card h2 {
    font-size: 1.6rem;
  }

  .story-block {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  .story-block ol {
    margin: 0;
    padding-left: 1.25rem;
    display: grid;
    gap: 1rem;
    font-weight: 600;
  }

  .closing-card {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    gap: 1rem;
    background: var(--landing-surface-strong);

    a,
    button {
      align-self: start;
    }
  }

  .footer-wrap {
    padding-bottom: 1.5rem;
  }

  .landing-shell [role='button'],
  .landing-shell button {
    border-radius: 999px;
  }

  .landing-shell a[role='button']:not(.secondary),
  .landing-shell button:not(.ghost-link):not(.secondary) {
    background: linear-gradient(135deg, #b3e54f 0%, #79b52d 100%);
    border-color: #79b52d;
    color: #122108;
    box-shadow: 0 18px 40px rgba(110, 167, 43, 0.28);
  }

  .landing-shell a[role='button'].secondary,
  .landing-shell button.secondary {
    background: var(--landing-surface-strong);
    border-color: var(--landing-border);
    color: var(--landing-text);
  }

  .landing-shell a[role='button']:focus-visible,
  .landing-shell button:focus-visible,
  .ghost-link:focus-visible {
    outline: 3px solid #c4ed7b;
    outline-offset: 2px;
  }

  .landing-shell p {
    color: var(--landing-text-soft);
  }

  @media (width < 900px) {
    .hero-panel,
    .info-grid,
    .story-block,
    .closing-card {
      grid-template-columns: 1fr;
      display: grid;
    }

    .closing-card {
      align-items: start;
    }
  }

  @media (width < 640px) {
    .hero {
      padding-top: 1rem;
    }

    .feature-card,
    .story-block,
    .closing-card,
    .panel-card,
    .panel-metric {
      border-radius: 1.25rem;
      padding: 1.1rem;
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (width < 480px) {
    .hero-stats {
      grid-template-columns: 1fr;
    }
  }
</style>
