<script lang="ts">
  import { page } from '$app/state';
  import { signIn } from '$lib/auth-client';
  import google from '$lib/assets/icons8-google.svg';

  const message = page.error?.message;
  let authBusy = $state(false);
</script>

<svelte:head>
  <title>Devis - {message}</title>
</svelte:head>

{#if message === 'Un Authorized'}
  <div class="page-shell grid min-h-dvh place-items-center py-10">
    <div class="w-full max-w-md space-y-4">
      <section class="app-panel surface-strong space-y-6 p-6 sm:p-8">
        <div class="space-y-2 text-center">
          <p class="section-heading">Sign in</p>
          <h1 class="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p class="text-sm text-[var(--app-text-soft)]">
            Sign in to create and manage your estimates.
          </p>
        </div>

        <button
          class="button-secondary flex w-full items-center justify-center gap-3"
          disabled={authBusy}
          aria-busy={authBusy}
          onclick={async () => {
            authBusy = true;
            await signIn(page.url.pathname);
          }}
        >
          <img src={google} alt="" class="size-8" />
          <span>Continue with Google</span>
        </button>
      </section>
    </div>
  </div>
{:else if message === 'Not Found'}
  <div class="page-shell grid min-h-[70vh] place-items-center py-10">
    <section class="app-panel surface-strong max-w-lg space-y-4 p-8 text-center">
      <p class="section-heading">404</p>
      <h1 class="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p class="text-sm text-[var(--app-text-soft)]">{page.url}</p>
      <p class="text-base text-[var(--app-text-soft)]">
        Go back to the
        <a
          data-sveltekit-reload
          href="/"
          class="font-semibold text-[var(--app-primary-strong)] underline-offset-4 hover:underline"
          >home page</a
        >.
      </p>
    </section>
  </div>
{:else}
  <div class="page-shell grid min-h-[70vh] place-items-center py-10">
    <section class="app-panel surface-strong max-w-lg p-8 text-center">
      <h1 class="text-3xl font-semibold tracking-tight">{message}</h1>
    </section>
  </div>
{/if}
