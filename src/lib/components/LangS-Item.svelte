<script lang="ts">
  import { page } from '$app/state';
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import type { Language } from '$lib/utilities/types';

  const { locale, text }: Language = $props();
</script>

<li>
  <a
    class={`block rounded-2xl px-3 py-2 text-left text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/5 ${getLocale() === locale ? 'text-[var(--app-primary-strong)]' : 'text-[var(--app-text)]'}`}
    href={page.url.toString()}
    onclick={(e) => {
      e.preventDefault();
      setLocale(locale);
    }}>{text}</a
  >
</li>
