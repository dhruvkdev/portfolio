<script lang="ts">
  import { onMount } from 'svelte';

  let currentYear: number = new Date().getFullYear();
  let mounted: boolean = false;

  interface SocialLink {
    name: string;
    url: string;
    icon: string;
  }

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/dhruvkdev',
      icon: 'github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/dhruvk2028',
      icon: 'linkedin'
    },
    {
      name: 'Email',
      url: 'mailto:your.dhruv.k.builds@gmail.com',
      icon: 'email'
    }
  ];

  onMount(() => {
    mounted = true;
  });
</script>

<footer class="border-t border-(--color-rules)/20 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 mt-12 sm:mt-14 md:mt-16">
  <div class="max-w-4xl mx-auto">
    <!-- Main Footer Content -->
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-8">
      <!-- Left Column: Name & Tagline -->
      <div class="space-y-2 text-center sm:text-left">
        <h2 class="text-2xl sm:text-3xl font-serif font-bold text-(--color-primary)">
          DHRUV
        </h2>
        <p class="text-xs sm:text-sm text-(--color-secondary) max-w-xs mx-auto sm:mx-0">
          Building things to understand how they work.
        </p>
      </div>

      <!-- Right Column: Social Links -->
      <div class="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
        {#each socialLinks as link (link.name)}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs sm:text-sm uppercase tracking-wider text-(--color-secondary) hover:text-(--color-accent) transition-colors"
          >
            {link.name}
          </a>
        {/each}
      </div>
    </div>

    <!-- Bottom Bar: Copyright & Engineering Journal -->
    <div class="mt-8 sm:mt-10 md:mt-12 pt-6 border-t border-(--color-rules)/10 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-[10px] sm:text-xs text-(--color-secondary)/60 order-2 sm:order-1">
        Copyrights {currentYear} DHRUV
      </p>
      
      <div class="flex items-center gap-2 order-1 sm:order-2">
        <span class="text-[10px] sm:text-xs uppercase tracking-wider text-(--color-rules)/40">
          ENGINEERING JOURNAL
        </span>
        <span class="w-6 sm:w-8 h-px bg-(--color-rules)/20"></span>
      </div>
    </div>
  </div>
</footer>