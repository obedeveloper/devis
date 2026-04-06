<script lang="ts">
  import Avatar from './Avatar.svelte';
  import type { AvatarProps } from './Avatar.svelte';

  const { userImage }: AvatarProps = $props();
</script>

<nav class="page-shell pt-4 z-30">
  <div
    class="app-panel surface-strong flex items-center justify-between gap-4 px-4 py-3 sm:px-5"
  >
    <a
      href="/dashboard"
      translate="no"
      class="font-['Vibes'] text-4xl leading-none tracking-tight text-(--app-text) no-underline"
      >Devis</a
    >

    <div class="flex items-center gap-2 sm:gap-3">
      <a
        href="/"
        class="button-secondary inline-flex items-center gap-2 rounded-2xl px-3 py-2.5 text-sm font-semibold no-underline sm:px-4"
      >
        <i class="fa-solid fa-house"></i>
        <span class="hidden sm:inline">Home</span>
      </a>
      <a href="/new" class="button-primary px-3 sm:px-4">
        <i class="fa-solid fa-plus-circle"></i>
        <span class="hidden sm:inline">New</span>
      </a>
      <a
        href="/account"
        class="inline-flex rounded-full focus-visible:outline-none"
        aria-label="Account"
      >
        <Avatar {userImage}></Avatar>
      </a>
    </div>
  </div>
</nav>
