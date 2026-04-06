<script lang="ts">
  let submitting = $state(false);
</script>

<svelte:head>
  <title>Devis - New</title>
</svelte:head>

<section class="mx-auto max-w-2xl">
  <form
    method="POST"
    class="app-panel surface-strong space-y-5 p-6 sm:p-8"
    onsubmit={() => {
      submitting = true;
    }}
  >
    <div class="space-y-2">
      <p class="section-heading">New estimate</p>
      <h1 class="text-3xl font-semibold tracking-tight">Start a new project quote</h1>
    </div>

    <div class="space-y-2">
      <label for="title">Title</label>
      <input type="text" id="title" name="title" placeholder="Title" required />
    </div>

    <div class="space-y-2">
      <label for="scope-of-work">Scope of work</label>
      <input
        type="text"
        id="scope-of-work"
        name="scope-of-work"
        placeholder="Scope of work"
      />
    </div>

    <input type="submit" value="Continue" disabled={submitting} aria-busy={submitting} />
  </form>
</section>
