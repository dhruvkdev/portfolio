<script lang="ts">
  import { marked } from 'marked';
  import sanitizeHtml from 'sanitize-html';
  import markedKatex from 'marked-katex-extension';

  marked.use(
    markedKatex({
      throwOnError: false,
      nonStandard: true,
      output: 'htmlAndMathml'
    })
  );

  type PreviewKind = 'journal' | 'project';

  let {
    content = '',
    title = '',
    summary = '',
    tags = [],
    kind = 'journal',
    publishedAt = null
  }: {
    content?: string;
    title?: string;
    summary?: string;
    tags?: string[];
    kind?: PreviewKind;
    publishedAt?: string | Date | null;
  } = $props();

  function formatDate(date: string | Date | null | undefined) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  let renderedHtml = $derived.by(() => {
    const rawHtml = marked.parse(content || '', {
      breaks: true,
      gfm: true
    }) as string;

    return sanitizeHtml(rawHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        'img',
        'iframe',
        'video',
        'source',
        'figure',
        'figcaption',
        'span',
        'div'
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        a: ['href', 'name', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder'],
        video: ['src', 'controls', 'autoplay', 'muted', 'playsinline', 'loop', 'poster', 'width', 'height'],
        source: ['src', 'type'],
        '*': ['class']
      },
      allowedSchemes: ['http', 'https', 'mailto', 'data'],
      allowedSchemesByTag: {
        img: ['http', 'https', 'data'],
        source: ['http', 'https'],
        iframe: ['http', 'https']
      },
      allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'player.vimeo.com'],
      transformTags: {
        a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer', target: '_blank' }, true)
      }
    });
  });
</script>

<div class="preview-shell">
  <header class="entry-header">
    <p class="eyebrow">{kind === 'journal' ? 'JOURNAL PREVIEW' : 'PROJECT PREVIEW'}</p>
    <h1>{title || 'Untitled draft'}</h1>

    <div class="meta-row">
      {#if publishedAt}
        <time datetime={String(publishedAt)}>{formatDate(publishedAt)}</time>
      {/if}
      {#if kind === 'project' && summary}
        <span class="summary">{summary}</span>
      {/if}
    </div>

    {#if tags.length}
      <div class="tags-row">
        {#each tags as tag}
          <span>{tag}</span>
        {/each}
      </div>
    {/if}
    <hr class="title-divider" />
  </header>

  <div class="entry-content">
    {@html renderedHtml}
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Libre+Baskerville:wght@400;700&display=swap');

  .preview-shell {
    max-width: 720px;
    margin: 0 auto;
    padding: 1.25rem 0 0;
    color: var(--color-primary);
    font-family: 'Libre Baskerville', Georgia, serif;
  }

  .entry-header {
    margin-bottom: 2rem;
  }

  .eyebrow {
    margin: 0 0 1rem;
    color: var(--color-accent);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0 0 0.85rem;
    font-size: clamp(2rem, 3vw, 2.8rem);
    line-height: 1.2;
  }

  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.04em;
  }

  .summary {
    max-width: 34rem;
    color: var(--color-secondary);
  }

  .tags-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.85rem;
  }

  .tags-row span {
    padding: 0.2rem 0.45rem;
    border: 1px solid var(--color-rules);
    color: var(--color-secondary);
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .title-divider {
    margin: 1.5rem 0 0;
    border: none;
    border-top: 1px solid var(--color-rules);
    opacity: 0.7;
  }

  .entry-content {
    font-size: 16px;
    line-height: 1.8;
  }

  .entry-content :global(h1),
  .entry-content :global(h2),
  .entry-content :global(h3),
  .entry-content :global(h4) {
    margin: 2.5rem 0 1rem;
    line-height: 1.25;
    color: var(--color-primary);
  }

  .entry-content :global(p),
  .entry-content :global(ul),
  .entry-content :global(ol),
  .entry-content :global(blockquote),
  .entry-content :global(pre) {
    margin: 0 0 1.4rem;
  }

  .entry-content :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .entry-content :global(img),
  .entry-content :global(video),
  .entry-content :global(iframe) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 2rem 0;
  }

  .entry-content :global(pre) {
    padding: 1rem 1.25rem;
    overflow-x: auto;
    background: color-mix(in srgb, var(--color-primary) 8%, var(--color-background));
    border-top: 1px solid var(--color-rules);
    border-bottom: 1px solid var(--color-rules);
  }

  .entry-content :global(code) {
    font-family: 'DM Mono', monospace;
    font-size: 0.9em;
  }

  .entry-content :global(blockquote) {
    padding-left: 1rem;
    border-left: 2px solid var(--color-accent);
    color: var(--color-secondary);
    font-style: italic;
  }
</style>
