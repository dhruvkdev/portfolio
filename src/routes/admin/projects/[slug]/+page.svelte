<script lang="ts">
  import MarkdownPreview from '$lib/components/MarkdownPreview.svelte';

  let { data } = $props();

  let project = $derived(data.project);
  let draftTitle = $state('');
  let draftSummary = $state('');
  let draftTechStack = $state('');
  let draftContent = $state('');

  $effect(() => {
    draftTitle = project.title ?? '';
    draftSummary = project.summary ?? '';
    draftTechStack = project.techStack?.join(', ') ?? '';
    draftContent = project.content ?? '';
  });
</script>

<svelte:head>
  <title>Edit project</title>
</svelte:head>

<div class="admin-shell">
  <header class="topbar">
    <div>
      <p class="eyebrow">EDIT PROJECT</p>
      <h1>{data.project.title}</h1>
    </div>
    <nav class="top-actions">
      <a href="/admin/projects">Back to projects</a>
      <a href="/admin/logout">Log out</a>
    </nav>
  </header>

  <section class="panel">
    <form method="POST" action="?/update" class="stack-form">
      <div class="editor-layout">
        <div class="editor-column">
          <div class="field-row">
            <label>
              <span>Title</span>
              <input name="title" type="text" bind:value={draftTitle} required />
            </label>

            <label>
              <span>Slug</span>
              <input name="slug" type="text" value={data.project.slug} />
            </label>
          </div>

          <div class="field-row">
            <label>
              <span>Status</span>
              <select name="status">
                <option value="building" selected={data.project.status === 'building'}>Building</option>
                <option value="completed" selected={data.project.status === 'completed'}>Completed</option>
                <option value="archived" selected={data.project.status === 'archived'}>Archived</option>
              </select>
            </label>

            <label>
              <span>Featured</span>
              <label class="checkbox-label">
                <input name="featured" type="checkbox" checked={data.project.featured} />
                <span>Show on homepage</span>
              </label>
            </label>
          </div>

          <div class="field-row">
            <label>
              <span>GitHub URL</span>
              <input name="githubUrl" type="url" value={data.project.githubUrl} required />
            </label>

            <label>
              <span>Live URL</span>
              <input name="liveUrl" type="url" value={data.project.liveUrl ?? ''} />
            </label>
          </div>

          <label>
            <span>Tech stack</span>
            <input name="techStack" type="text" bind:value={draftTechStack} />
          </label>

          <label>
            <span>Summary</span>
            <textarea name="summary" bind:value={draftSummary} rows="5" required></textarea>
          </label>

          <label>
            <span>Content</span>
            <textarea name="content" bind:value={draftContent} rows="18" required></textarea>
          </label>

          <button type="submit">Update project</button>
        </div>

        <aside class="preview-column">
          <div class="preview-header">Live preview</div>
          <MarkdownPreview
            kind="project"
            title={draftTitle}
            summary={draftSummary}
            content={draftContent}
            tags={draftTechStack.split(',').map((tag) => tag.trim()).filter(Boolean)}
          />
        </aside>
      </div>
    </form>
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
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    line-height: 1.1;
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

  .editor-layout {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
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

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem 0.9rem;
    border: 1px solid var(--color-rules);
    cursor: pointer;
  }

  .checkbox-label input {
    width: auto;
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
    min-height: 12rem;
    resize: vertical;
  }

  button {
    justify-self: start;
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

  @media (max-width: 640px) {
    .topbar {
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
