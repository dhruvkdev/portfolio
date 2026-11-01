<script lang="ts">
  let { data } = $props();

  function formatDate(date: Date | string | null | undefined) {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>{data.project.title} — Project</title>
</svelte:head>

<article class="project-shell">
  <header class="entry-header">
    <p class="eyebrow">PROJECT</p>
    <h1>{data.project.title}</h1>

    <div class="meta-row">
      <time datetime={String(data.project.createdAt)}>{formatDate(data.project.createdAt)}</time>
      <span>{data.project.status}</span>
    </div>

    <div class="meta-row tags">
      {#if data.project.techStack?.length}
        {#each data.project.techStack as tech}
          <span>{tech}</span>
        {/each}
      {/if}
    </div>
  </header>

  <div class="project-content">
    {@html data.html}
  </div>

  <footer class="project-links">
    {#if data.project.githubUrl}
      <a href={data.project.githubUrl} target="_blank" rel="noreferrer noopener">GitHub</a>
    {/if}
    {#if data.project.liveUrl}
      <a href={data.project.liveUrl} target="_blank" rel="noreferrer noopener">Live site</a>
    {/if}
  </footer>
</article>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Libre+Baskerville:wght@400;700&display=swap');

  :global(html) {
    background: var(--color-background);
  }

  :global(body) {
    margin: 0;
    background: var(--color-background);
    color: var(--color-primary);
    font-family: 'Libre Baskerville', Georgia, serif;
  }

  .project-shell {
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 1.5rem 6rem;
  }

  .entry-header {
    max-width: 780px;
    margin: 0 auto 3rem;
  }

  .eyebrow {
    margin: 0 0 1.5rem;
    color: var(--color-accent);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0 0 1rem;
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    line-height: 1.05;
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.9rem;
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .tags span {
    border: 1px solid var(--color-rules);
    padding: 0.3rem 0.5rem;
  }

  .project-content {
    max-width: 720px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .project-content :global(h1),
  .project-content :global(h2),
  .project-content :global(h3) {
    margin: 2.25rem 0 1rem;
    line-height: 1.2;
  }

  .project-content :global(p),
  .project-content :global(ul),
  .project-content :global(ol),
  .project-content :global(blockquote) {
    margin: 0 0 1.5rem;
  }

  .project-content :global(img),
  .project-content :global(video),
  .project-content :global(iframe) {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 2rem 0;
  }

  .project-content :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .project-links {
    max-width: 720px;
    margin: 2rem auto 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .project-links a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
