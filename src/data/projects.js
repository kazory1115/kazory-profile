import { parseList, parseMarkdownDocument } from './markdown.js';

const files = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const projects = Object.entries(files)
  .map(([path, source]) => {
    const { meta, body, slug, html } = parseMarkdownDocument(path, source);
    return {
      id: Number(meta.id) || slug,
      slug,
      title: meta.title || slug,
      category: meta.category || 'Case Study',
      description: meta.description || '',
      technologies: parseList(meta.technologies),
      link: meta.link || '',
      year: meta.year || '',
      body,
      html,
    };
  })
  .sort((a, b) => Number(a.id) - Number(b.id));
