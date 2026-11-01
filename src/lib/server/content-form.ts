export function parseList(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildJournalPayload(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const slugInput = String(formData.get('slug') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const tags = parseList(formData.get('tags'));
  const status = (formData.get('status') === 'published' ? 'published' : 'draft') as 'draft' | 'published';
  const publishedAtValue = String(formData.get('publishedAt') ?? '').trim();

  const publishedAt = publishedAtValue ? new Date(publishedAtValue) : status === 'published' ? new Date() : null;

  return {
    title,
    slug: slugify(slugInput || title) || 'untitled-entry',
    content,
    tags,
    status,
    publishedAt,
    updatedAt: new Date(),
  };
}

export function buildProjectPayload(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  const slugInput = String(formData.get('slug') ?? '').trim();
  const summary = String(formData.get('summary') ?? '').trim();
  const content = String(formData.get('content') ?? '').trim();
  const techStack = parseList(formData.get('techStack'));
  const githubUrl = String(formData.get('githubUrl') ?? '').trim();
  const liveUrl = String(formData.get('liveUrl') ?? '').trim();
  const status = (formData.get('status') === 'completed'
    ? 'completed'
    : formData.get('status') === 'archived'
      ? 'archived'
      : 'building') as 'building' | 'completed' | 'archived';
  const featured = formData.get('featured') === 'on';
  const homepageOrderValue = Number(String(formData.get('homepageOrder') ?? '').trim());

  return {
    title,
    slug: slugify(slugInput || title) || 'untitled-project',
    summary,
    content,
    techStack,
    githubUrl,
    liveUrl: liveUrl || null,
    status,
    featured,
    homepageOrder: Number.isFinite(homepageOrderValue) && homepageOrderValue >= 0 ? homepageOrderValue : null,
    updatedAt: new Date(),
  };
}
