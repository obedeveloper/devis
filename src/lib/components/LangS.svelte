<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { LANGUAGES } from '$lib/utilities/consts';
  import LanguageSwitcherItem from './LangS-Item.svelte';
</script>

<details class="relative">
  <!-- svelte-ignore a11y_no_redundant_roles -->
  <summary
    role="button"
    class="button-secondary inline-flex list-none items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold"
  >
    <i class="fa-solid fa-earth"></i>
    <span class="hidden sm:inline">{m.language()}</span>
  </summary>
  <ul
    dir="rtl"
    class="app-panel surface-strong absolute right-0 z-20 mt-3 min-w-40 space-y-1 p-2"
  >
    {#each LANGUAGES as { locale, text }}
      <LanguageSwitcherItem {locale} {text}></LanguageSwitcherItem>
    {/each}
  </ul>
</details>
