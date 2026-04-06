<script lang="ts">
  import generic from '$lib/assets/OIP-3084535858.jpeg';

  export interface AvatarProps {
    userImage?: string | null;
  }

  const { userImage }: AvatarProps = $props();
</script>

<img
  src={userImage}
  class="size-10 rounded-full border border-[var(--app-border)] object-cover shadow-sm"
  alt=""
  onerror={(e) => {
    const el = e.target as HTMLImageElement;
    el.src = generic;
  }}
/>
