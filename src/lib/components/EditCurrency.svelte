<script lang="ts">
  import type { Estimate } from '$lib/utilities/types';
  import { data } from 'currency-codes';

  interface Props {
    globalEstimate: {
      data: Estimate;
    };
  }

  const { globalEstimate }: Props = $props();

  data.sort((a, b) => a.currency.localeCompare(b.currency));

  const searchResults = $derived(
    data.filter((value) => {
      const lowerCaseCurrency =
        globalEstimate.data.currency?.toLocaleLowerCase();
      const lowerCaseCode = value.code.toLocaleLowerCase();
      const lowerCaseDataCurrency = value.currency.toLocaleLowerCase();

      return (
        lowerCaseCode.includes(lowerCaseCurrency ?? '') ||
        lowerCaseDataCurrency.includes(lowerCaseCurrency ?? '')
      );
    })
  );
</script>

<div class="relative space-y-2">
  <label for="currency-search">Currency</label>
  <input
    id="currency-search"
    class="peer"
    type="search"
    bind:value={globalEstimate.data.currency}
    placeholder="Search currency or code"
  />

  <div class="app-panel surface-strong hidden max-h-80 overflow-auto p-2 peer-focus:block hover:block">
    <div class="space-y-1">
      {#each searchResults as { currency, code }}
        <label
          class="flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-sm text-[var(--app-text)] hover:bg-black/5 dark:hover:bg-white/5"
        >
          <input
            type="radio"
            name="currency"
            value={code}
            bind:group={globalEstimate.data.currency}
          />
          <span>{currency} - {code}</span>
        </label>
      {/each}
    </div>
  </div>
</div>
