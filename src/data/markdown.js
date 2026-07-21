import { marked } from 'marked';

marked.setOptions({ gfm: true });

export const parseMarkdownDocument = (path, source) => {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  const body = match ? source.slice(match[0].length).trim() : source.trim();
  const meta = {};

  if (match) {
    match[1].split('\n').forEach((line) => {
      const field = line.match(/^([\w-]+):\s*(.*)$/);
      if (field) meta[field[1]] = field[2].trim().replace(/^['"]|['"]$/g, '');
    });
  }

  return {
    meta,
    body,
    slug: path.split('/').pop().replace(/\.md$/, ''),
    html: marked.parse(body),
  };
};

export const parseList = (value = '') => value.split(',').map((item) => item.trim()).filter(Boolean);
