<script lang="ts">
  import LanguageSwitcher from './LangS.svelte';
  import { m } from '$lib/paraglide/messages';
  import Avatar from './Avatar.svelte';
  import type { AvatarProps } from './Avatar.svelte';

  const { userImage }: AvatarProps = $props();
</script>

<nav class="container-fluid">
  <ul>
    <li>
      <h1>
        <a href="/" translate="no" class="logo">Devis</a>
      </h1>
    </li>
  </ul>

  <ul>
    <li>
      <a href="/new" role="button">
        <i class="fa-solid fa-plus-circle"></i>
        <span>{m.new()}</span>
      </a>
    </li>
    <LanguageSwitcher></LanguageSwitcher>
    <li>
      <a href="/account">
        <Avatar {userImage}></Avatar>
      </a>
    </li>
  </ul>
</nav>

<style>
  @font-face {
    font-family: 'Vibes';
    src: url('/GreatVibes-Regular.ttf');
    font-weight: normal;
    font-style: normal;
  }

  a.logo {
    text-decoration-line: none;
    font-family: 'Vibes';
    color: inherit;
  }

  nav {
    display: flex;
    justify-content: space-between;
  }

  ul:nth-child(2) {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    padding-top: 1rem;

    & * {
      margin: 0;
      padding: 0;
    }
  }

  a[role='button'] {
    padding: 0.5rem 0.25rem;
  }

  @media (width < 33.75rem) {
    span {
      display: none;
    }

    a[role='button'] {
      padding: 0.7rem;

      i {
        font-size: 1.5rem;
      }
    }
  }
</style>
