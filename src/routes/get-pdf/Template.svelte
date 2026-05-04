<svelte:options css="injected" />

<script lang="ts">
  import type { Estimate, Expense, ExtraExpense } from '$lib/utilities/types';
  import { codes } from 'currency-codes';
  const { estimates }: { estimates: Estimate[] } = $props();
  function format(n: number, currency?: string) {
    if (!codes().includes(currency ?? '')) {
      currency = 'RWF';
    }
    return n.toLocaleString(undefined, {
      style: 'currency',
      currency: currency || 'RWF',
    });
  }
  function getSubTotal(expenses: Expense[]) {
    return expenses?.reduce(
      (prev, curr) => prev + (curr?.qty ?? 1) * (curr?.unitCost ?? 0),
      0,
    );
  }
  function getGrandTotal(expenses: Expense[], extraExpenses?: ExtraExpense[]) {
    return (
      getSubTotal(expenses) +
      (extraExpenses?.reduce((prev, curr) => prev + (curr?.amount ?? 0), 0) ??
        0)
    );
  }
  const currency = estimates[0]?.currency;
  const totalGrandTotal = estimates.reduce((sum, estimate) => {
    return sum + getGrandTotal(estimate.expenses, estimate.extraExpenses);
  }, 0);
</script>

<main
  style="display:flex;flex-direction:column;gap:1rem;font-family:Arial,Helvetica,sans-serif;margin:1rem 2.5rem;"
>
  {#each estimates as { expenses, title, currency, extraExpenses, note, scopeOfWork }}
    <section>
      <h1 style="margin-top:0;">{title}</h1>
      <p>{scopeOfWork}</p>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th style="border:1px solid black;padding:0.35rem 0.75rem;">#</th>
            <th style="border:1px solid black;padding:0.35rem 0.75rem;"
              >Description</th
            >
            <th style="border:1px solid black;padding:0.35rem 0.75rem;">Unit</th
            >
            <th style="border:1px solid black;padding:0.35rem 0.75rem;">Qty</th>
            <th style="border:1px solid black;padding:0.35rem 0.75rem;"
              >Unit cost</th
            >
            <th style="border:1px solid black;padding:0.35rem 0.75rem;"
              >Amount</th
            >
          </tr>
        </thead>
        <tbody>
          {#each expenses as exp, i}
            {@const amount = format(
              (exp?.qty ?? 1) * (exp?.unitCost ?? 0),
              currency,
            )}
            <tr>
              <th style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{i + 1}</th
              >
              <td style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{exp.desc}</td
              >
              <td style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{exp.unit}</td
              >
              <td style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{exp.qty?.toLocaleString()}</td
              >
              <td style="border:1px solid black;padding:0.35rem 0.75rem;">
                {exp.qty ? format(exp?.unitCost ?? 0, currency) : ''}
              </td>
              <td style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{amount}</td
              >
            </tr>
          {/each}
          {#if extraExpenses?.length}
            <tr>
              <th style="border:1px solid black;padding:0.35rem 0.75rem;"></th>
              <td
                colspan="4"
                style="border:1px solid black;padding:0.35rem 0.75rem;font-weight:700;"
              >
                Sub-total
              </td>
              <td
                style="border:1px solid black;padding:0.35rem 0.75rem;font-weight:700;"
              >
                {format(getSubTotal(expenses), currency)}
              </td>
            </tr>
          {/if}
          {#each extraExpenses ?? [] as { desc, amount }, i}
            <tr>
              <th style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{expenses.length + i + 1}</th
              >
              <td
                colspan="4"
                style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{desc}</td
              >
              <td style="border:1px solid black;padding:0.35rem 0.75rem;"
                >{format(amount ?? 0, currency)}</td
              >
            </tr>
          {/each}
          <tr>
            <th style="border:1px solid black;padding:0.35rem 0.75rem;"></th>
            <td
              colspan="4"
              style="border:1px solid black;padding:0.35rem 0.75rem;font-weight:700;"
            >
              Grand total
            </td>
            <td
              style="border:1px solid black;padding:0.35rem 0.75rem;font-weight:700;"
            >
              {format(getGrandTotal(expenses, extraExpenses), currency)}
            </td>
          </tr>
        </tbody>
      </table>
      {#if note?.length}
        <p>Note: {note}</p>
      {/if}
    </section>
  {/each}
  {#if estimates.length > 1}
    <section
      style="margin-top:2rem;border-top:3px solid black;padding-top:1rem;"
    >
      <table style="width:100%;border-collapse:collapse;">
        <tbody>
          <tr>
            <th style="border:1px solid black;padding:0.35rem 0.75rem;"></th>
            <td
              colspan="4"
              style="border:1px solid black;padding:0.35rem 0.75rem;font-weight:700;font-size:1.1rem;"
            >
              Total Grand Total
            </td>
            <td
              style="border:1px solid black;padding:0.35rem 0.75rem;font-weight:700;font-size:1.1rem;"
            >
              {format(totalGrandTotal, currency)}
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  {/if}
</main>
