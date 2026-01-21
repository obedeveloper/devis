<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">{m['expense.desc']()}</th>
    <th scope="col">{m['expense.unit']()}</th>
    <th scope="col">{m['expense.qty']()}</th>
    <th scope="col">{m['expense.unit-cost']()}</th>
    <th scope="col">{m.amount()}</th>
  </tr>
</thead>
