import projectsContent from '../content/projects.json' with { type: 'json' };
import { flattenContent, validateProjects } from '../domain/contentSchema.js';
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

const defaultSort = (left, right) =>
  left.sortOrder - right.sortOrder
  || left.title.localeCompare(right.title, 'zh-Hant')
  || left.id.localeCompare(right.id);

const projectComparators = {
  title: (left, right) => left.title.localeCompare(right.title, 'zh-Hant') || defaultSort(left, right),
  newest: (left, right) => (right.year ?? -Infinity) - (left.year ?? -Infinity) || defaultSort(left, right),
  oldest: (left, right) => (left.year ?? Infinity) - (right.year ?? Infinity) || defaultSort(left, right),
  featured: (left, right) =>
    (left.featuredRank ?? Infinity) - (right.featuredRank ?? Infinity) || defaultSort(left, right),
  sortOrder: defaultSort,
  order: defaultSort,
};

const searchableProjectText = (project) => normaliseText([
  project.id,
  project.slug,
  project.title,
  project.category,
  project.description,
  ...project.technologies,
  flattenContent(project.content),
].join(' '));

const facetsFor = (items) => ({
  categories: buildFacet(items, (project) => project.category),
  technologies: buildFacet(items, (project) => project.technologies),
  statuses: buildFacet(items, (project) => project.status),
});

const selectEligibleProjects = (projects, options) =>
  projects.filter((project) => isDraftVisible(project, options));

const filterProjects = (projects, options) => {
  const q = resolveQuery(options);
  const category = options.category ?? options.categories;
  const technology = options.technology ?? options.technologies;

  return projects.filter((project) =>
    matchesOne(project.category, category)
    && matchesAny(project.technologies, technology)
    && matchesStatus(project, options)
    && matchesFeatured(project, options.featured)
    && includesQuery(searchableProjectText(project), q));
};

const sortProjects = (projects, sort = 'sortOrder') => {
  const comparator = projectComparators[sort] ?? projectComparators.sortOrder;
  return projects.slice().sort(comparator);
};

export const createProjectRepository = (source = projectsContent) => {
  const projects = validateProjects(normaliseRepositoryInput(source, 'projects')).map(clone);

  return Object.freeze({
    async list(options = {}) {
      const availableItems = selectEligibleProjects(projects, options);
      const filteredItems = filterProjects(availableItems, options);
      const sortedItems = sortProjects(
        filteredItems,
        options.sort ?? (options.featured === true ? 'featured' : 'sortOrder'),
      );

      return clone({
        items: paginate(sortedItems, options).map(summarise),
        total: filteredItems.length,
        available: availableItems.length,
        facets: facetsFor(availableItems),
      });
    },

    async getFacets(options = {}) {
      return clone(facetsFor(selectEligibleProjects(projects, options)));
    },

    async facets(options = {}) {
      return clone(facetsFor(selectEligibleProjects(projects, options)));
    },

    async getById(id, options = {}) {
      const wantedId = String(id ?? '');
      const item = selectEligibleProjects(projects, options).find((project) => project.id === wantedId);
      return clone(item ?? null);
    },

    async getBySlug(slug, options = {}) {
      const wantedSlug = String(slug ?? '');
      const item = selectEligibleProjects(projects, options).find((project) => project.slug === wantedSlug);
      return clone(item ?? null);
    },
  });
};

export const projectRepository = createProjectRepository();
