<script lang="ts">
  import generic from '$lib/assets/OIP-3084535858.jpeg';
  import { signOut, signOutAllDevices } from '$lib/auth-client';
  const { data } = $props();

  let image = $state(data.userImage);
  let busy1 = $state(false);
  let busy2 = $state(false);
</script>

<svelte:head>
  <title>{data.name}</title>
</svelte:head>

<article class="app-panel surface-strong mx-auto flex max-w-3xl flex-col gap-6 p-6 sm:flex-row sm:p-8">
  <div class="flex justify-center sm:justify-start">
    <img
      class="size-40 rounded-full border border-[var(--app-border)] object-cover shadow-md sm:size-48"
      src={image}
      alt=""
      onerror={() => (image = generic)}
    />
  </div>
  <div class="flex-1 space-y-4">
    <div class="space-y-1">
      <p class="section-heading">Account</p>
      <h1 class="text-3xl font-semibold tracking-tight">{data.name}</h1>
      <p class="text-[var(--app-text-soft)]">{data.email}</p>
    </div>
    <p class="flex items-center gap-2 text-sm text-[var(--app-text-soft)]">
      <i class="fa-solid fa-clock"></i>
      {data.createdAt.toLocaleString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })}
    </p>
    <div class="flex flex-wrap gap-3">
      <button
        aria-busy={busy1}
        disabled={busy1}
        class="button-secondary"
        onclick={async () => {
          busy1 = true;
          await signOut();
          document.location = '/';
        }}><i class="fa-solid fa-sign-out"></i> Sign out</button
      >
      <button
        class="button-danger"
        aria-busy={busy2}
        disabled={busy2}
        onclick={async () => {
          busy2 = true;
          await signOutAllDevices();
          document.location = '/';
        }}>Sign out from all devices</button
      >
    </div>
  </div>
</article>
