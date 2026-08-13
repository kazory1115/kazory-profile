import writingsContent from '../content/writings.json' with { type: 'json' };
import { flattenContent, validateWritings } from '../domain/contentSchema.js';
import {
  buildFacet,
  clone,
  includesQuery,
  isDraftVisible,
  matchesAny,
  matchesFeatured,
  matchesOne,
  matchesStatus,
  normaliseRepositoryInput,
  normaliseText,
  paginate,
  resolveQuery,
  summarise,
} from './helpers.js';

const publishedTime = (writing, fallback) => {
  if (writing.publishedAt === null) return fallback;
  return Date.parse(`${writing.publishedAt}T00:00:00Z`);
};

const newestFirst = (left, right) =>
  publishedTime(right, -Infinity) - publishedTime(left, -Infinity)
  || left.title.localeCompare(right.title, 'zh-Hant')
  || left.slug.localeCompare(right.slug);

const writingComparators = {
  newest: newestFirst,
  oldest: (left, right) =>
    publishedTime(left, Infinity) - publishedTime(right, Infinity)
    || left.title.localeCompare(right.title, 'zh-Hant')
    || left.slug.localeCompare(right.slug),
  title: (left, right) => left.title.localeCompare(right.title, 'zh-Hant') || newestFirst(left, right),
  featured: (left, right) =>
    (left.featuredRank ?? Infinity) - (right.featuredRank ?? Infinity) || newestFirst(left, right),
};

const searchableWritingText = (writing) => normaliseText([
  writing.slug,
  writing.title,
  writing.category,
  writing.excerpt,
  ...writing.tags,
  flattenContent(writing.content),
].join(' '));

const facetsFor = (items) => ({
  categories: buildFacet(items, (writing) => writing.category),
  tags: buildFacet(items, (writing) => writing.tags),
  statuses: buildFacet(items, (writing) => writing.status),
});

const selectEligibleWritings = (writings, options) =>
  writings.filter((writing) => isDraftVisible(writing, options));

const filterWritings = (writings, options) => {
  const q = resolveQuery(options);
  const category = options.category ?? options.categories;
  const tag = options.tag ?? options.tags;

  return writings.filter((writing) =>
    matchesOne(writing.category, category)
    && matchesAny(writing.tags, tag)
    && matchesStatus(writing, options)
    && matchesFeatured(writing, options.featured)
    && includesQuery(searchableWritingText(writing), q));
};

const sortWritings = (writings, sort = 'newest') => {
  const comparator = writingComparators[sort] ?? writingComparators.newest;
  return writings.slice().sort(comparator);
};

const emptyDetail = () => ({
  item: null,
  navigation: { previous: null, next: null },
});

export const createWritingRepository = (source = writingsContent) => {
  const writings = validateWritings(normaliseRepositoryInput(source, 'writings')).map(clone);

  return Object.freeze({
    async list(options = {}) {
      const availableItems = selectEligibleWritings(writings, options);
      const filteredItems = filterWritings(availableItems, options);
      const sortedItems = sortWritings(
        filteredItems,
        options.sort ?? (options.featured === true ? 'featured' : 'newest'),
      );

      return clone({
        items: paginate(sortedItems, options).map(summarise),
        total: filteredItems.length,
        available: availableItems.length,
        facets: facetsFor(availableItems),
      });
    },

    async getFacets(options = {}) {
      return clone(facetsFor(selectEligibleWritings(writings, options)));
    },

    async facets(options = {}) {
      return clone(facetsFor(selectEligibleWritings(writings, options)));
    },

    async getBySlug(slug, options = {}) {
      const availableItems = sortWritings(selectEligibleWritings(writings, options), options.sort);
      const index = availableItems.findIndex((writing) => writing.slug === String(slug ?? ''));
      if (index < 0) return emptyDetail();

      return clone({
        item: availableItems[index],
        navigation: {
          previous: index > 0 ? summarise(availableItems[index - 1]) : null,
          next: index < availableItems.length - 1 ? summarise(availableItems[index + 1]) : null,
        },
      });
    },
  });
};

export const writingRepository = createWritingRepository();
