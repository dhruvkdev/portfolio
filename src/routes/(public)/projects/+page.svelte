<script lang="ts">
  let { data } = $props();

  function formatDate(date: string | Date | null | undefined) {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }
</script>

<svelte:head>
  <title>Projects</title>
  <meta name="description" content="Selected projects and experiments." />
</svelte:head>

<div class="page">
  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="site-title">PROJECTS</a>
      <div class="title-rule"></div>
      <p class="site-description">A working archive of experiments, products, and systems I shape over time.</p>
    </div>
  </header>

  <main>
    <section class="entries">
      <div class="entry-list">
        {#each data.projects as project}
          <article class="entry">
            <div class="entry-date">{formatDate(project.createdAt)}</div>

            <div class="entry-main">
              <h3>
                <a href={`/projects/${project.slug}`}>{project.title}</a>
              </h3>
              <p>{project.summary}</p>
            </div>

            <div class="entry-tags">{project.techStack?.slice(0, 3).join(' / ')}</div>
          </article>
        {/each}
      </div>
    </section>
  </main>
</div>

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

  :global(a) {
    color: inherit;
    text-decoration: none;
  }

  .page {
    min-height: 100vh;
    padding: 0 20px 80px;
    border-top: 1px solid var(--color-rules);
  }

  .site-header {
    max-width: 1170px;
    margin: 0 auto;
    padding-top: 55px;
  }

  .site-title {
    display: inline-block;
    color: var(--color-accent);
    font-size: 32px;
    font-weight: 400;
    letter-spacing: -0.03em;
  }

  .title-rule {
    width: 168px;
    height: 1px;
    margin-top: 13px;
    background: var(--color-secondary);
  }

  .site-description {
    margin: 14px 0 0;
    color: var(--color-secondary);
    font-size: 13px;
    line-height: 1.65;
  }

  main {
    max-width: 1170px;
    margin: 0 auto;
  }

  .entries {
    margin-top: 54px;
  }

  .entry-list {
    display: grid;
    gap: 2rem;
  }

  .entry {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr) 180px;
    gap: 1.25rem;
    padding: 1.25rem 0;
    border-top: 1px solid var(--color-rules);
  }

  .entry-date {
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding-top: 0.4rem;
  }

  .entry-main h3 {
    margin: 0 0 0.5rem;
    font-size: clamp(1.4rem, 2vw, 2rem);
    line-height: 1.2;
  }

  .entry-main p {
    margin: 0;
    color: var(--color-secondary);
    line-height: 1.7;
  }

  .entry-tags {
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    align-self: center;
    justify-self: end;
    text-align: right;
  }

  @media (max-width: 768px) {
    .entry {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .entry-tags {
      justify-self: start;
      text-align: left;
    }
  }
</style>
