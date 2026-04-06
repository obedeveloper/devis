<script lang="ts">
  const { children }: { children?: any } = $props();
</script>

<section class="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
  <span class="inline-block text-7xl animate-[shrug_1.5s_ease-in-out_infinite]">🤷‍♂️</span>
  {@render children?.()}
</section>
