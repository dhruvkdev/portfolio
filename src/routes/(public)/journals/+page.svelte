<!-- src/routes/journals/+page.svelte -->
<script lang="ts">
	import type { journals as JournalsTable } from "$lib/server/db/schema";

	let { data } = $props();

	const journals: typeof JournalsTable.$inferSelect[] = $derived(data.journals ?? []);

	// Use the first journal as the featured entry
	const featured: typeof JournalsTable.$inferSelect | undefined = $derived(journals[0]);

	const entries: typeof JournalsTable.$inferSelect[] = $derived(journals.slice(1));

	function formatDate(date: string | Date | null | undefined): string {
		if (!date) return "";

		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		})
			.format(new Date(date))
			.replace(/\//g, ".");
	}

	function excerpt(content: string, length: number = 150): string {
		const plainText = content
			.replace(/[#*_>`]/g, "")
			.replace(/\[(.*?)\]\(.*?\)/g, "$1")
			.replace(/\s+/g, " ")
			.trim();

		if (plainText.length <= length) return plainText;

		return `${plainText.slice(0, length).trim()}...`;
	}

	function category(tags: string[]): string {
		if (!tags?.length) return "";

		return tags.slice(0, 3).join(" / ");
	}
</script>

<svelte:head>
	<title>Journal</title>
	<meta
		name="description"
		content="A technical journal about building, breaking, learning, and understanding."
	/>
</svelte:head>

<div class="page">
	<header class="site-header">
		<div class="header-inner">
			<a href="/" class="site-title">JOURNALS</a>

			<div class="title-rule"></div>

			<p class="site-description">
				A technical register of what I build, break, learn, and understand.<br />
				Writing is the best tool for clear thinking.
			</p>
		</div>
	</header>

	<main>
		{#if featured}
			<section class="featured">
				<div class="section-label">FEATURED ENTRY</div>

				<div class="featured-content">
					<div class="entry-type">LATEST WRITING</div>

					<div class="featured-date">
						{formatDate(featured.publishedAt ?? featured.createdAt)}
					</div>

					<h1>
						<a href={`/journals/${featured.slug}`}>
							{featured.title}
						</a>
					</h1>

					<p class="featured-excerpt">
						{excerpt(featured.content, 210)}
					</p>

					<div class="featured-footer">
						<div class="tags">
							{category(featured.tags)}
						</div>

						<a class="read-more" href={`/journals/${featured.slug}`}>
							read article <span>→</span>
						</a>
					</div>
				</div>
			</section>
		{/if}

		<section class="entries">
			<div class="entries-header">
				<h2>ALL ENTRIES</h2>

			</div>

			<div class="entry-list">
				{#each entries as journal (journal.id)}
					<article class="entry">
						<div class="entry-date">
							{formatDate(journal.publishedAt ?? journal.createdAt)}
						</div>

						<div class="entry-main">
							<h3>
								<a href={`/journals/${journal.slug}`}>
									{journal.title}
								</a>
							</h3>

							<p>
								{excerpt(journal.content, 180)}
							</p>
						</div>

						<div class="entry-tags">
							{category(journal.tags)}
						</div>
					</article>
				{/each}
			</div>
		</section>
	</main>
</div>

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

	.featured {
		margin-top: 54px;
	}

	.section-label {
		display: inline-block;
		padding-bottom: 9px;
		border-bottom: 1px solid var(--color-secondary);
		color: var(--color-accent);
		font-size: 18px;
		line-height: 1;
	}

	.featured-content {
		margin-top: 48px;
	}

	.entry-type {
		color: var(--color-accent);
		font-family: "DM Mono", monospace;
		font-size: 10px;
		letter-spacing: 0.12em;
	}

	.featured-date {
		margin-top: 8px;
		color: var(--color-secondary);
		font-family: "DM Mono", monospace;
		font-size: 10px;
	}

	.featured h1 {
		max-width: 900px;
		margin: 24px 0 10px;
		font-size: clamp(27px, 3vw, 33px);
		font-weight: 700;
		line-height: 1.25;
		letter-spacing: -0.025em;
	}

	.featured h1 a {
		transition: color 150ms ease;
	}

	.featured h1 a:hover {
		color: var(--color-accent);
	}

	.featured-excerpt {
		max-width: 920px;
		margin: 0;
		color: var(--color-secondary);
		font-size: 13px;
		line-height: 1.65;
	}

	.featured-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 22px;
	}

	.tags,
	.entry-tags {
		color: var(--color-secondary);
		font-family: "DM Mono", monospace;
		font-size: 8px;
	}

	.read-more {
		color: var(--color-primary);
		font-family: "DM Mono", monospace;
		font-size: 10px;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.read-more span {
		margin-left: 3px;
	}

	.entries {
		margin-top: 75px;
	}

	.entries-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 30px;
	}

	.entries-header h2 {
		margin: 0;
		padding-bottom: 9px;
		border-bottom: 1px solid var(--color-secondary);
		color: var(--color-accent);
		font-size: 16px;
		font-weight: 400;
		line-height: 1;
	}

	.entry-list {
		margin-top: 38px;
	}

	.entry {
		display: grid;
		grid-template-columns: 75px minmax(0, 1fr) 150px;
		gap: 0;
		min-height: 63px;
		padding: 13px 0;
		border-bottom: 1px solid var(--color-secondary);
	}

	.entry:first-child {
		border-top: 0;
	}

	.entry-date {
		padding-top: 2px;
		color: var(--color-secondary);
		font-family: "DM Mono", monospace;
		font-size: 9px;
	}

	.entry-main {
		padding-right: 30px;
	}

	.entry-main h3 {
		margin: 0;
		font-size: 18px;
		font-weight: 400;
		line-height: 1.4;
	}

	.entry-main h3 a {
		transition: color 150ms ease;
	}

	.entry-main h3 a:hover {
		color: var(--color-accent);
	}

	.entry-main p {
		max-width: 760px;
		margin: 3px 0 0;
		color: var(--color-secondary);
		font-size: 10px;
		line-height: 1.5;
	}

	.entry-tags {
		padding-top: 2px;
		text-align: right;
	}

	@media (max-width: 700px) {
		.page {
			padding: 0 20px 50px;
		}

		.site-header {
			padding-top: 35px;
		}

		.featured {
			margin-top: 45px;
		}

		.featured-content {
			margin-top: 35px;
		}

		.featured h1 {
			font-size: 25px;
		}

		.featured-footer {
			align-items: flex-start;
			flex-direction: column;
			gap: 15px;
		}

		.entries {
			margin-top: 60px;
		}

		.entries-header {
			align-items: flex-start;
			flex-direction: column;
			gap: 20px;
		}

		.entry {
			grid-template-columns: 65px minmax(0, 1fr);
		}

		.entry-tags {
			display: none;
		}
	}
</style>