<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Admin dashboard</title>
</svelte:head>

<div class="admin-shell">
  <header class="topbar">
    <div>
      <p class="eyebrow">PRIVATE CONTROL</p>
      <h1>Admin dashboard</h1>
    </div>

    <nav class="top-actions">
      <a href="/admin/journals">Manage journals</a>
      <a href="/admin/projects">Manage projects</a>
      <a href="/admin/logout">Log out</a>
    </nav>
  </header>

  <section class="summary-grid">
    <article class="summary-card">
      <p class="label">Journals</p>
      <strong>{data.journals.length}</strong>
    </article>

    <article class="summary-card">
      <p class="label">Projects</p>
      <strong>{data.projects.length}</strong>
    </article>
  </section>

  <section class="panel">
    <div class="panel-header">
      <h2>Latest journals</h2>
      <a href="/admin/journals">Open journal admin</a>
    </div>

    <ul class="list">
      {#each data.journals.slice(0, 6) as journal}
        <li>
          <a href={`/admin/journals/${journal.slug}`}>{journal.title}</a>
          <span>{journal.status}</span>
        </li>
      {/each}
    </ul>
  </section>

  <section class="panel">
    <div class="panel-header">
      <h2>Latest projects</h2>
      <a href="/admin/projects">Open project admin</a>
    </div>

    <ul class="list">
      {#each data.projects.slice(0, 6) as project}
        <li>
          <a href={`/admin/projects/${project.slug}`}>{project.title}</a>
          <span>{project.status}</span>
        </li>
      {/each}
    </ul>
  </section>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Libre+Baskerville:wght@400;700&display=swap');

  :global(html) {
    background: var(--color-background);
    color: var(--color-primary);
    font-family: 'Libre Baskerville', Georgia, serif;
  }

  :global(body) {
    margin: 0;
    background: var(--color-background);
    color: var(--color-primary);
  }

  .admin-shell {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  .topbar {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-rules);
  }

  .eyebrow {
    margin: 0 0 0.8rem;
    color: var(--color-accent);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    line-height: 1;
  }

  .top-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .top-actions a,
  .panel-header a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .summary-card,
  .panel {
    border: 1px solid var(--color-rules);
    background: color-mix(in srgb, var(--color-background) 95%, transparent);
    padding: 1.25rem 1.5rem;
  }

  .label {
    margin: 0 0 0.75rem;
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  strong {
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--color-primary);
  }

  .panel {
    margin-top: 2rem;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.75rem;
  }

  .list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.7rem;
    border-top: 1px solid var(--color-rules);
  }

  .list li:first-child {
    border-top: none;
    padding-top: 0;
  }

  .list a {
    color: var(--color-primary);
    text-decoration: none;
  }

  .list span {
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  @media (max-width: 640px) {
    .topbar,
    .panel-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .summary-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
