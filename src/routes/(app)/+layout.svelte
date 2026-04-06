<script lang="ts">
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import ScrollToTop from '$lib/components/ScrollToTop.svelte';

  let { children, data } = $props();
  const { userImage } = data;
</script>

<Nav {userImage}></Nav>

<main class="page-shell py-6">
  {@render children()}
</main>

<Footer></Footer>

<ScrollToTop></ScrollToTop>
