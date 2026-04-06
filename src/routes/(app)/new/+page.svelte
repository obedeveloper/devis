<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>Devis - New</title>
</svelte:head>

<section class="mx-auto max-w-2xl">
  <form method="POST" class="app-panel surface-strong space-y-5 p-6 sm:p-8">
    <div class="space-y-2">
      <p class="section-heading">New estimate</p>
      <h1 class="text-3xl font-semibold tracking-tight">Start a new project quote</h1>
    </div>

    <div class="space-y-2">
      <label for="title">{m.title()}</label>
      <input type="text" id="title" name="title" placeholder={m.title()} required />
    </div>

    <div class="space-y-2">
      <label for="scope-of-work">{m['scope-of-work']()}</label>
      <input
        type="text"
        id="scope-of-work"
        name="scope-of-work"
        placeholder={m['scope-of-work']()}
      />
    </div>

    <input type="submit" value={m.continue()} />
  </form>
</section>
