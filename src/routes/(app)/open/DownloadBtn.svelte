<script lang="ts">
  import { DownloadPDF } from '$lib/utilities/download-pdf';

  let downloading = $state(false);
  const { ids, title }: { ids: string[]; title: string } = $props();
</script>

<button
  aria-label="Download PDF"
  class="icon-button"
  aria-busy={downloading}
  onclick={async () => {
    downloading = true;
    await DownloadPDF(title, ids);
    downloading = false;
  }}
>
  <i class="fa-solid fa-print"></i>
</button>
