export const clone = (value) => {
  if (value === undefined) return undefined;
  return typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value));
};

export const normaliseText = (value) => String(value ?? '').trim().toLocaleLowerCase();

export const asArray = (value) => {
  if (value === undefined || value === null || value === '') return [];
  return Array.isArray(value) ? value : [value];
};

export const matchesOne = (actual, requested) => {
  const choices = asArray(requested).map(normaliseText).filter(Boolean);
  if (!choices.length) return true;
  return choices.includes(normaliseText(actual));
};

export const matchesAny = (actual, requested) => {
  const choices = asArray(requested).map(normaliseText).filter(Boolean);
  if (!choices.length) return true;
  const values = actual.map(normaliseText);
  return choices.some((choice) => values.includes(choice));
};

export const parseWindow = ({ offset = 0, limit } = {}) => {
  const parsedOffset = Number(offset);
  const safeOffset = Number.isInteger(parsedOffset) && parsedOffset >= 0 ? parsedOffset : 0;

  if (limit === undefined || limit === null || limit === '') {
    return { offset: safeOffset, limit: undefined };
  }

  const parsedLimit = Number(limit);
  return {
    offset: safeOffset,
    limit: Number.isInteger(parsedLimit) && parsedLimit >= 0 ? parsedLimit : undefined,
  };
};

export const paginate = (items, options) => {
  const { offset, limit } = parseWindow(options);
  return limit === undefined ? items.slice(offset) : items.slice(offset, offset + limit);
};

export const summarise = (item) => {
  const { content: _content, ...summary } = item;
  return summary;
};

export const buildFacet = (items, selectValues) => {
  const counts = new Map();

  for (const item of items) {
    for (const rawValue of asArray(selectValues(item))) {
      if (typeof rawValue !== 'string' || !rawValue.trim()) continue;
      const value = rawValue.trim();
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }

  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) => left.value.localeCompare(right.value, 'zh-Hant'));
};

export const resolveQuery = (options = {}) =>
  normaliseText(options.q ?? options.query ?? options.search);

export const includesQuery = (searchableText, query) => {
  if (!query) return true;
  return query.split(/\s+/u).filter(Boolean).every((term) => searchableText.includes(term));
};

export const isDraftVisible = (item, options = {}) => {
  const requestedStatuses = asArray(options.status ?? options.statuses).map(normaliseText);
  if (requestedStatuses.includes('draft')) return true;
  return options.includeDrafts === true || item.status !== 'draft';
};

export const matchesStatus = (item, options = {}) =>
  matchesOne(item.status, options.status ?? options.statuses);

export const matchesFeatured = (item, featured) => {
  if (featured === undefined || featured === null || featured === '') return true;
  if (featured === true) return item.featuredRank !== null;
  if (featured === false) return item.featuredRank === null;
  const rank = Number(featured);
  return Number.isFinite(rank) && item.featuredRank === rank;
};

export const normaliseRepositoryInput = (input, collectionKey) => {
  if (Array.isArray(input)) return input;
  if (input && Array.isArray(input[collectionKey])) return input[collectionKey];
  return input;
};
