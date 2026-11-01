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

export function renderMarkdown(markdown: string) {
  const rawHtml = marked.parse(markdown || '', {
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
}