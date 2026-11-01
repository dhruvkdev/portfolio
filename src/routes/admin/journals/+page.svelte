<script lang="ts">
  import MarkdownPreview from '$lib/components/MarkdownPreview.svelte';

  let { data } = $props();

  let draftTitle = $state('');
  let draftTags = $state('');
  let draftContent = $state('');

  function formatDate(date: string | Date | null | undefined) {
    if (!date) return 'Draft';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }
</script>

<svelte:head>
  <title>Journal admin</title>
</svelte:head>

<div class="admin-shell">
  <header class="topbar">
    <div>
      <p class="eyebrow">PRIVATE WRITING</p>
      <h1>Journal admin</h1>
    </div>
    <nav class="top-actions">
      <a href="/admin">Dashboard</a>
      <a href="/admin/projects">Projects</a>
      <a href="/admin/logout">Log out</a>
    </nav>
  </header>

  <section class="panel">
    <h2>Create a journal</h2>
    <form method="POST" action="?/create" class="stack-form">
      <div class="editor-layout">
        <div class="editor-column">
          <div class="field-row">
            <label>
              <span>Title</span>
              <input name="title" type="text" bind:value={draftTitle} required />
            </label>

            <label>
              <span>Slug</span>
              <input name="slug" type="text" placeholder="optional-custom-slug" />
            </label>
          </div>

          <div class="field-row">
            <label>
              <span>Tags</span>
              <input name="tags" type="text" bind:value={draftTags} placeholder="design, engineering, notes" />
            </label>

            <label>
              <span>Status</span>
              <select name="status">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>

          <label>
            <span>Published date</span>
            <input name="publishedAt" type="date" />
          </label>

          <label>
            <span>Content</span>
            <textarea name="content" bind:value={draftContent} rows="20" required></textarea>
          </label>

          <button type="submit">Save journal</button>
        </div>

        <aside class="preview-column">
          <div class="preview-header">Live preview</div>
          <MarkdownPreview
            title={draftTitle}
            content={draftContent}
            tags={draftTags.split(',').map((tag) => tag.trim()).filter(Boolean)}
            kind="journal"
          />
        </aside>
      </div>
    </form>
  </section>

  <section class="panel">
    <h2>All journals</h2>

    <div class="list-table">
      {#each data.journals as journal}
        <article class="entry">
          <div>
            <p class="meta">{formatDate(journal.publishedAt ?? journal.createdAt)}</p>
            <h3><a href={`/journals/${journal.slug}`}>{journal.title}</a></h3>
          </div>

          <div class="entry-actions">
            <a href={`/admin/journals/${journal.slug}`}>Edit</a>
            <form method="POST" action="?/delete">
              <input type="hidden" name="slug" value={journal.slug} />
              <button type="submit">Delete</button>
            </form>
          </div>
        </article>
      {/each}
    </div>
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
    font-size: clamp(2.2rem, 5vw, 3.3rem);
    line-height: 1;
  }

  .top-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .top-actions a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .panel {
    border: 1px solid var(--color-rules);
    padding: 1.5rem;
    margin-top: 2rem;
  }

  h2 {
    margin-top: 0;
  }

  .editor-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 1.25rem;
  }

  .editor-column,
  .preview-column {
    min-width: 0;
  }

  .preview-column {
    border: 1px solid var(--color-rules);
    padding: 1rem;
    background: color-mix(in srgb, var(--color-background) 90%, transparent);
  }

  .preview-header {
    margin-bottom: 0.5rem;
    color: var(--color-accent);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .stack-form,
  .field-row {
    display: grid;
    gap: 1rem;
  }

  .field-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  label {
    display: grid;
    gap: 0.5rem;
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  input,
  textarea,
  select {
    width: 100%;
    border: 1px solid var(--color-rules);
    background: transparent;
    color: var(--color-primary);
    font: inherit;
    padding: 0.8rem 0.9rem;
    border-radius: 0;
  }

  textarea {
    min-height: 18rem;
    resize: vertical;
  }

  button {
    border: 1px solid var(--color-accent);
    background: var(--color-accent);
    color: var(--color-background);
    padding: 0.9rem 1.25rem;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .list-table {
    display: grid;
    gap: 1rem;
    margin-top: 1rem;
  }

  .entry {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    border-top: 1px solid var(--color-rules);
    padding-top: 1rem;
  }

  .meta {
    margin: 0 0 0.35rem;
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h3 {
    margin: 0;
  }

  h3 a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .entry-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .entry-actions a {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .entry-actions form {
    margin: 0;
  }

  .entry-actions button {
    background: transparent;
    color: var(--color-accent);
    border-color: var(--color-accent);
  }

  @media (max-width: 640px) {
    .topbar,
    .entry {
      flex-direction: column;
      align-items: flex-start;
    }

    .editor-layout {
      grid-template-columns: 1fr;
    }

    .field-row {
      grid-template-columns: 1fr;
    }
  }
</style>
