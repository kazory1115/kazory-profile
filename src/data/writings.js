import { parseList, parseMarkdownDocument } from './markdown.js';

const files = import.meta.glob('../content/writings/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const parseArticle = (path, source) => {
  const { meta, body, slug, html } = parseMarkdownDocument(path, source);
  const characterCount = body.replace(/[`#>*_|\-[\]()]|https?:\/\/\S+/g, '').length;

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    category: meta.category || 'Uncategorized',
    status: meta.status || '已發布',
    excerpt: meta.excerpt || '',
    tags: parseList(meta.tags),
    readTime: meta.readTime || `閱讀約 ${Math.max(1, Math.ceil(characterCount / 500))} 分鐘`,
    rawContent: body,
    html,
  };
};

export const writings = Object.entries(files)
  .map(([path, source]) => parseArticle(path, source))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
