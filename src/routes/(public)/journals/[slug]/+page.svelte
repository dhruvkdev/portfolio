<script lang="ts">
	let { data } = $props();

	// Format date for display
	function formatDate(date: Date | string) {
		const d = typeof date === 'string' ? new Date(date) : date;
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.journal.title} — Journal</title>
</svelte:head>

<article class="journal-entry">
	<!-- Header -->
	<header class="entry-header">
		<div class="journal-label">JOURNAL</div>
		<h1 class="entry-title">{data.journal.title}</h1>
		<div class="entry-metadata">
			<time datetime={String(data.journal.publishedAt || data.journal.createdAt)}>
				{formatDate(data.journal.publishedAt || data.journal.createdAt)}
			</time>
			{#if data.journal.tags && data.journal.tags.length > 0}
				<span class="tags">
					{data.journal.tags.join(' · ')}
				</span>
			{/if}
		</div>
		<hr class="title-divider" />
	</header>

	<!-- Content -->
	<div class="entry-content">
		{@html data.html}
	</div>
</article>

<style>
	@import url("https://fonts.googleapis.com/css2?family=DM+Mono:wght@400&family=Libre+Baskerville:wght@400;700&display=swap");

	:global(*) {
		box-sizing: border-box;
	}

	:global(html) {
		background: var(--color-background);
	}

	:global(body) {
		margin: 0;
		background: var(--color-background);
		color: var(--color-primary);
		font-family: "Libre Baskerville", Georgia, serif;
	}

	:global(a) {
		color: inherit;
		text-decoration: none;
	}

	.journal-entry {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem 6rem;
	}

	/* Header */
	.entry-header {
		max-width: 750px;
		margin: 0 auto 4rem;
	}

	.journal-label {
		font-family: "DM Mono", monospace;
		font-size: 10px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-accent);
		margin-bottom: 2rem;
	}

	.entry-title {
		font-size: clamp(27px, 3vw, 33px);
		font-weight: 700;
		line-height: 1.25;
		letter-spacing: -0.025em;
		margin: 0 0 1.25rem 0;
		color: var(--color-primary);
	}

	.entry-metadata {
		font-family: "DM Mono", monospace;
		font-size: 10px;
		color: var(--color-secondary);
		letter-spacing: 0.02em;
	}

	.entry-metadata time {
		margin-right: 0.5rem;
	}

	.tags {
		opacity: 0.8;
	}

	.title-divider {
		border: none;
		border-top: 1px solid var(--color-rules);
		margin: 2.5rem 0 0 0;
		opacity: 0.4;
		width: 100%;
	}

	/* Content */
	.entry-content {
		max-width: 700px;
		margin: 0 auto;
		font-size: 16px;
		line-height: 1.8;
		color: var(--color-primary);
	}

	/* Markdown Styling */
	.entry-content :global(h1),
	.entry-content :global(h2),
	.entry-content :global(h3),
	.entry-content :global(h4) {
		font-weight: 700;
		line-height: 1.3;
		letter-spacing: -0.01em;
		margin: 3rem 0 1.25rem 0;
		color: var(--color-primary);
	}

	.entry-content :global(h1) {
		font-size: 2rem;
		margin-top: 3.5rem;
	}

	.entry-content :global(h2) {
		font-size: 1.625rem;
		margin-top: 3rem;
	}

	.entry-content :global(h3) {
		font-size: 1.375rem;
	}

	.entry-content :global(h4) {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.entry-content :global(p) {
		margin: 0 0 1.5rem 0;
	}

	.entry-content :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-thickness: 1px;
		transition: color 150ms ease;
	}

	.entry-content :global(a:hover) {
		color: var(--color-primary);
	}

	.entry-content :global(ul),
	.entry-content :global(ol) {
		margin: 1.5rem 0;
		padding-left: 1.5rem;
	}

	.entry-content :global(li) {
		margin: 0.5rem 0;
	}

	.entry-content :global(blockquote) {
		margin: 2.5rem 0;
		padding-left: 1.5rem;
		border-left: 2px solid var(--color-accent);
		font-style: italic;
		color: var(--color-secondary);
	}

	.entry-content :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

	.entry-content :global(code) {
		font-family: "DM Mono", monospace;
		font-size: 0.9em;
		padding: 0.1rem 0.3rem;
	}

	.entry-content :global(pre) {
		font-family: "DM Mono", monospace;
		font-size: 10px;
		line-height: 1.7;
		padding: 1.5rem 0;
		margin: 2rem 0;
		overflow-x: auto;
		border-top: 1px solid var(--color-rules);
		border-bottom: 1px solid var(--color-rules);
		opacity: 0.8;
	}

	.entry-content :global(pre code) {
		font-size: inherit;
		padding: 0;
	}

	.entry-content :global(img) {
		max-width: 100%;
		height: auto;
		margin: 2.5rem 0;
		display: block;
	}

	.entry-content :global(hr) {
		border: none;
		border-top: 1px solid var(--color-rules);
		margin: 3rem 0;
		opacity: 0.3;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.journal-entry {
			padding: 3rem 1.5rem 4rem;
		}

		.entry-header {
			max-width: 100%;
			margin-bottom: 3rem;
		}

		.entry-title {
			font-size: 25px;
		}

		.entry-content {
			max-width: 100%;
			font-size: 15px;
		}

		.entry-content :global(h1) {
			font-size: 1.75rem;
		}

		.entry-content :global(h2) {
			font-size: 1.4rem;
		}

		.entry-content :global(h3) {
			font-size: 1.2rem;
		}

		.entry-metadata {
			font-size: 9px;
		}
	}

	@media (max-width: 480px) {
		.journal-entry {
			padding: 2rem 1rem 3rem;
		}

		.entry-title {
			font-size: 22px;
		}

		.journal-label {
			font-size: 9px;
			margin-bottom: 1.5rem;
		}

		.entry-content {
			font-size: 14px;
		}

		.entry-content :global(pre) {
			font-size: 9px;
			padding: 1rem 0;
		}
	}
</style>