<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<thead class="bg-black/[0.03] dark:bg-white/[0.03]">
  <tr>
    <th scope="col">#</th>
    <th scope="col">{m['expense.desc']()}</th>
    <th scope="col">{m['expense.unit']()}</th>
    <th scope="col">{m['expense.qty']()}</th>
    <th scope="col">{m['expense.unit-cost']()}</th>
    <th scope="col">{m.amount()}</th>
  </tr>
</thead>
