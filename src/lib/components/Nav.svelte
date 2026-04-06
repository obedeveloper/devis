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
        <a href="/dashboard" translate="no" class="logo">Devis</a>
      </h1>
    </li>
  </ul>

  <ul class="nav-actions">
    <li>
      <a href="/" class="home-link">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
      </a>
    </li>
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
    gap: 1rem;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0.75rem;

    & * {
      margin: 0;
      padding: 0;
    }
  }

  .home-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--pico-color);
    font-weight: 600;
    padding: 0.5rem 0.75rem;
    border-radius: 999px;
    transition:
      background-color 160ms ease,
      color 160ms ease;
  }

  .home-link:hover,
  .home-link:focus-visible {
    color: var(--pico-color);
    background: color-mix(in srgb, var(--pico-primary) 12%, transparent);
  }

  .home-link:focus-visible {
    outline: 2px solid var(--pico-primary);
    outline-offset: 2px;
  }

  a[role='button'] {
    padding: 0.5rem 0.25rem;
  }

  @media (width < 33.75rem) {
    .home-link span,
    a[role='button'] span {
      display: none;
    }

    .home-link {
      padding: 0.7rem;
    }

    a[role='button'] {
      padding: 0.7rem;

      i {
        font-size: 1.5rem;
      }
    }
  }
</style>
