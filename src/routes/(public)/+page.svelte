<script lang="ts">
  // Your theme toggle logic could go here if needed
</script>

<div class="flex flex-col min-h-screen bg-(--color-background) text-(--color-primary) font-sans transition-colors duration-300">
    <!-- Main Content Grid -->
  <main class="flex-1 grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_1fr_auto] md:grid-rows-3 px-6 md:px-16 py-6 md:py-20 gap-6 md:gap-0 relative">
    
    <!-- Top Left: Engineering Journal -->
    <section class="md:col-start-1 md:row-start-1 flex flex-col items-start justify-start max-w-sm">
      <h1 class="font-serif text-3xl lg:text-4xl text-(--color-accent) border-b border-(--color-rules)/30 pb-2 mb-6">
        ENGINEERING JOURNAL
      </h1>
      <p class="font-serif text-(--color-primary) text-lg leading-relaxed">
        A record of what I build, break, learn and understand.
      </p>
    </section>

    <!-- Center: Hey I'm Dhruv -->
    <section class="md:col-start-2 md:row-start-2 flex flex-col items-center justify-center text-center max-w-3xl mx-auto w-full">
      <h2 class="font-serif text-3xl lg:text-4xl text-(--color-accent) border-b border-(--color-rules)/30 pb-2 mb-8">
        HEY I'M DHRUV
      </h2>
      <p class="font-mono text-3xl md:text-4xl lg:text-[1.85rem] text-(--color-primary) leading-snug md:leading-tight tracking-tight">
        I write code, break systems,<br class="hidden md:block" />  and document the process.
      </p>
    </section>

    <!-- Bottom Right: Currently Building -->
    <section class="md:col-start-3 md:row-start-3 flex flex-col items-start md:items-end justify-end text-left md:text-right md:ml-auto">
      <h3 class="font-serif text-2xl lg:text-3xl text-(--color-accent) border-b border-(--color-rules)/30 pb-2 mb-4">
        CURRENTLY BUILDING
      </h3>
      <p class="font-serif text-xl lg:text-2xl text-(--color-primary) mb-1">
        Text Editor
      </p>
      <p class="font-mono text-sm text-(--color-secondary)">
        Rust / Systems
      </p>
    </section>

    <!-- Bottom Center: Scroll Indicator -->
    <div class="md:col-start-2 md:row-start-3 flex items-end justify-center pb-4 w-full mt-8 md:mt-0">
      <div class="flex items-center gap-2 font-mono text-sm text-(--color-secondary) animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
          <path d="m18 15-6-6-6 6"/>
        </svg>
        scroll to explore
      </div>
    </div>

  </main>
</div>