<script lang="ts">
  import { onMount } from 'svelte';
  import type { Theme } from '$lib/types/theme';

  let isDarkMode: boolean = $state(false);
  let mounted: boolean = $state(false);
  let mobileMenuOpen: boolean = $state(false);

  function toggleDarkMode(): void {
    isDarkMode = !isDarkMode;
    updateTheme(isDarkMode);
  }

  function updateTheme(dark: boolean): void {
    const html = document.documentElement;
    if (dark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  function getInitialTheme(): boolean {
    if (typeof window === 'undefined') return false;
    
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return prefersDark;
  }

  function toggleMobileMenu(): void {
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function closeMobileMenu(): void {
    mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  // Handle Escape key to close menu
  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
    }
  }

  onMount(() => {
    isDarkMode = getInitialTheme();
    updateTheme(isDarkMode);
    mounted = true;
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  });
</script>

<header class="border-b border-(--color-rules)/20 py-4 px-4 sm:px-6 md:px-8 sticky top-0 bg-(--color-background)/80 backdrop-blur-sm z-50 transition-colors">
  <div class="max-w-4xl mx-auto flex justify-between items-center">
    <!-- Logo -->
    <div>
      <a 
        href="/" 
        class="text-xl sm:text-2xl font-serif font-bold text-(--color-primary) hover:text-(--color-accent) transition-colors"
      >
        DHRUV
      </a>
    </div>
    
    <!-- Desktop Navigation -->
    <div class="hidden md:flex items-center gap-6">
      <nav class="flex items-center gap-6 text-sm uppercase tracking-wider">
        <a 
          href="/" 
          class="text-(--color-secondary) hover:text-(--color-primary) transition-colors"
        >
          Home
        </a>
        <a 
          href="/journals" 
          class="text-(--color-secondary) hover:text-(--color-primary) transition-colors"
        >
          Journals
        </a>
        <a 
          href="/projects" 
          class="text-(--color-secondary) hover:text-(--color-primary) transition-colors"
        >
          Projects
        </a>
      </nav>
      
      <!-- Dark Mode Toggle -->
      <button
        onclick={toggleDarkMode}
        class="p-2 rounded hover:bg-(--color-rules)/10 transition-colors"
        aria-label="Toggle dark mode"
        type="button"
      >
        {#if isDarkMode}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 text-(--color-primary)" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        {:else}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 text-(--color-primary)" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        {/if}
      </button>
    </div>

    <!-- Mobile Controls -->
    <div class="flex items-center gap-3 md:hidden">
      <!-- Dark Mode Toggle (Mobile) -->
      <button
        onclick={toggleDarkMode}
        class="p-2 rounded hover:bg-(--color-rules)/10 transition-colors"
        aria-label="Toggle dark mode"
        type="button"
      >
        {#if isDarkMode}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 text-(--color-primary)" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
            />
          </svg>
        {:else}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            class="h-5 w-5 text-(--color-primary)" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
            />
          </svg>
        {/if}
      </button>

      <!-- Hamburger Menu Button -->
      <button
        onclick={toggleMobileMenu}
        class="p-2 rounded hover:bg-(--color-rules)/10 transition-colors"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        type="button"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 text-(--color-primary)" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {#if mobileMenuOpen}
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12" 
            />
          {:else}
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          {/if}
        </svg>
      </button>
    </div>
  </div>
</header>

<!-- Mobile Menu Overlay - Slide from Right -->
{#if mobileMenuOpen}

<!-- Mobile Menu -->
<div
  class="absolute inset-0 z-50 bg-(--color-background) transition-transform duration-300 ease-out overflow-y-auto"
  class:translate-x-0={mobileMenuOpen}
  class:translate-x-full={!mobileMenuOpen}
>
  <div class="flex min-h-full flex-col px-6 sm:px-10">

    <!-- Header -->
    <div class="flex items-center justify-between border-b border-(--color-secondary)/20 py-6">
      <span class="text-xs font-medium tracking-[0.25em] uppercase text-(--color-secondary)">
        Menu
      </span>

      <button
        type="button"
        onclick={closeMobileMenu}
        aria-label="Close menu"
        class="group flex h-10 w-10 items-center justify-center"
      >
        <span class="relative block h-5 w-5">
          <span
            class="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-(--color-primary) transition-transform group-hover:rotate-0"
          ></span>
          <span
            class="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-(--color-primary) transition-transform group-hover:rotate-0"
          ></span>
        </span>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-1 flex-col justify-center py-12">

      <a
        href="/"
        onclick={closeMobileMenu}
        class="group flex items-baseline justify-between border-b border-(--color-secondary)/20 py-5"
      >
        <div class="flex items-baseline gap-5">
          <span class="text-xs tracking-widest text-(--color-secondary)">
            01
          </span>

          <span
            class="text-4xl font-serif font-bold text-(--color-primary) transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl"
          >
            Home
          </span>
        </div>

        <span
          class="text-xl text-(--color-primary) opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        >
          ↗
        </span>
      </a>

      <a
        href="/journals"
        onclick={closeMobileMenu}
        class="group flex items-baseline justify-between border-b border-(--color-secondary)/20 py-5"
      >
        <div class="flex items-baseline gap-5">
          <span class="text-xs tracking-widest text-(--color-secondary)">
            02
          </span>

          <span
            class="text-4xl font-serif text-(--color-secondary) transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl"
          >
            Journals
          </span>
        </div>

        <span
          class="text-xl text-(--color-primary) opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        >
          ↗
        </span>
      </a>

      <a
        href="/journey"
        onclick={closeMobileMenu}
        class="group flex items-baseline justify-between border-b border-(--color-secondary)/20 py-5"
      >
        <div class="flex items-baseline gap-5">
          <span class="text-xs tracking-widest text-(--color-secondary)">
            03
          </span>

          <span
            class="text-4xl font-serif text-(--color-secondary) transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl"
          >
            Journey
          </span>
        </div>

        <span
          class="text-xl text-(--color-primary) opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        >
          ↗
        </span>
      </a>

      <a
        href="/projects"
        onclick={closeMobileMenu}
        class="group flex items-baseline justify-between border-b border-(--color-secondary)/20 py-5"
      >
        <div class="flex items-baseline gap-5">
          <span class="text-xs tracking-widest text-(--color-secondary)">
            04
          </span>

          <span
            class="text-4xl font-serif text-(--color-secondary) transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl"
          >
            Projects
          </span>
        </div>

        <span
          class="text-xl text-(--color-primary) opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        >
          ↗
        </span>
      </a>

    </nav>

    <!-- Footer -->
    <div class="flex items-center justify-between border-t border-(--color-secondary)/20 py-6">
      <span class="text-xs tracking-widest text-(--color-secondary) uppercase">
        Explore
      </span>

      <span class="text-xs text-(--color-secondary)">
        © {new Date().getFullYear()}
      </span>
    </div>

  </div>
</div>

{/if}