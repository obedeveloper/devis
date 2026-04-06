<script lang="ts">
  import { fade } from "svelte/transition";

  let prevScrollY = $state(0);
  let scrollY = $state(0);
  let btnIsVisible = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  $effect(() =>
    scrollY < prevScrollY && scrollY >= innerHeight / 2
      ? showButton()
      : hideButton()
  );

  function showButton() {
    btnIsVisible = true;
    clearButtonTimeout();

    timeoutId = setTimeout(() => (btnIsVisible = false), 3000);
  }

  function hideButton() {
    btnIsVisible = false;
    clearButtonTimeout();
  }

  function clearButtonTimeout() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  }
</script>

<svelte:window bind:scrollY onscroll={() => (prevScrollY = scrollY)} />

{#if btnIsVisible}
  <button
    aria-label="Scroll to top"
    class="fixed bottom-5 right-5 z-40 size-12 rounded-full"
    transition:fade
    onclick={() => (scrollY = 0)}
  >
    <i class="fa-solid fa-arrow-up-long"></i>
  </button>
{/if}
