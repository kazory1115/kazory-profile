const PROJECT_FIELDS = [
  'id',
  'slug',
  'title',
  'year',
  'category',
  'description',
  'technologies',
  'sourceUrl',
  'status',
  'sortOrder',
  'featuredRank',
  'content',
];

const WRITING_FIELDS = [
  'slug',
  'title',
  'publishedAt',
  'category',
  'status',
  'excerpt',
  'tags',
  'readingMinutes',
  'featuredRank',
  'content',
];

const BLOCK_FIELDS = {
  heading: ['type', 'level', 'text'],
  paragraph: ['type', 'text'],
  quote: ['type', 'text'],
  list: ['type', 'ordered', 'items'],
  code: ['type', 'language', 'code'],
  table: ['type', 'headers', 'rows'],
};

const CONTENT_STATUSES = new Set(['published', 'draft']);
const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;
const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);

export const CONTENT_BLOCK_TYPES = Object.freeze(Object.keys(BLOCK_FIELDS));

/**
 * An actionable schema error whose `path` identifies the invalid value.
 */
export class ContentValidationError extends TypeError {
  constructor(path, reason) {
    super(`${path}: ${reason}`);
    this.name = 'ContentValidationError';
    this.path = path;
    this.reason = reason;
  }
}

const fail = (path, reason) => {
  throw new ContentValidationError(path, reason);
};

const childPath = (path, key) => {
  if (typeof key === 'number') return `${path}[${key}]`;
  return IDENTIFIER.test(key) ? `${path}.${key}` : `${path}[${JSON.stringify(key)}]`;
};

const isPlainObject = (value) => {
  if (value === null || typeof value !== 'object') return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
};

const assertPlainObject = (value, path) => {
  if (!isPlainObject(value)) fail(path, 'must be a plain object');
};

const assertExactFields = (value, fields, path) => {
  assertPlainObject(value, path);
  const allowed = new Set(fields);

  fields.forEach((field) => {
    if (!hasOwn(value, field)) fail(childPath(path, field), 'is required');
  });

  Reflect.ownKeys(value).forEach((field) => {
    if (typeof field !== 'string') fail(path, 'must not contain symbol properties');
    if (!allowed.has(field)) fail(childPath(path, field), 'is not an allowed field');
  });
};

const assertNonEmptyString = (value, path) => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(path, 'must be a non-empty string');
  }
};

const assertBoolean = (value, path) => {
  if (typeof value !== 'boolean') fail(path, 'must be a boolean');
};

const assertInteger = (value, path, { minimum } = {}) => {
  if (!Number.isInteger(value)) fail(path, 'must be an integer');
  if (minimum !== undefined && value < minimum) {
    fail(path, `must be greater than or equal to ${minimum}`);
  }
};

const assertNullableInteger = (value, path, options) => {
  if (value !== null) assertInteger(value, path, options);
};

const assertStringArray = (value, path, { nonEmpty = false } = {}) => {
  if (!Array.isArray(value)) fail(path, 'must be an array');
  if (nonEmpty && value.length === 0) fail(path, 'must contain at least one item');

  value.forEach((item, index) => {
    assertNonEmptyString(item, childPath(path, index));
  });
};

const assertStatus = (value, path) => {
  if (!CONTENT_STATUSES.has(value)) {
    fail(path, 'must be either "published" or "draft"');
  }
};

const assertHttpsUrl = (value, path) => {
  assertNonEmptyString(value, path);

  if (value !== value.trim() || /[\s\\]/.test(value)) {
    fail(path, 'must be a well-formed HTTPS URL without whitespace or backslashes');
  }

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail(path, 'must be an absolute HTTPS URL');
  }

  if (parsed.protocol !== 'https:') {
    fail(path, 'must use the https protocol');
  }

  if (parsed.username || parsed.password) {
    fail(path, 'must not include URL credentials');
  }
};

const assertNullableHttpsUrl = (value, path) => {
  if (value !== null) assertHttpsUrl(value, path);
};

const assertEmail = (value, path) => {
  assertNonEmptyString(value, path);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    fail(path, 'must be a valid email address');
  }
};

const assertInternalPath = (value, path) => {
  assertNonEmptyString(value, path);
  if (
    value !== value.trim()
    || !value.startsWith('/')
    || value.startsWith('//')
    || value.includes('\\')
    || value.includes('://')
  ) {
    fail(path, 'must be an internal path beginning with exactly one slash');
  }
};

const assertNullableDate = (value, path) => {
  if (value === null) return;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    fail(path, 'must use YYYY-MM-DD format or be null');
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    fail(path, 'must be a valid calendar date');
  }
};

const assertJsonSafe = (value, path, ancestors = new WeakSet()) => {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;

  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail(path, 'must be a finite JSON number');
    return;
  }

  if (typeof value !== 'object') {
    fail(path, `contains a value of unsupported type ${typeof value}`);
  }

  if (ancestors.has(value)) fail(path, 'must not contain circular references');
  ancestors.add(value);

  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      if (!hasOwn(value, index)) fail(childPath(path, index), 'must not be an empty array slot');
      assertJsonSafe(value[index], childPath(path, index), ancestors);
    }
  } else {
    assertPlainObject(value, path);

    Reflect.ownKeys(value).forEach((key) => {
      if (typeof key !== 'string') fail(path, 'must not contain symbol properties');
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor.get || descriptor.set) fail(childPath(path, key), 'must be a data property');
      if (!descriptor.enumerable) fail(childPath(path, key), 'must be enumerable');
      assertJsonSafe(descriptor.value, childPath(path, key), ancestors);
    });
  }

  ancestors.delete(value);
};

/** Validate one strict discriminated content block and return it unchanged. */
export const validateContentBlock = (block, path = 'block') => {
  assertPlainObject(block, path);
  assertNonEmptyString(block.type, childPath(path, 'type'));

  const fields = BLOCK_FIELDS[block.type];
  if (!fields) {
    fail(
      childPath(path, 'type'),
      `must be one of ${CONTENT_BLOCK_TYPES.map((type) => `"${type}"`).join(', ')}`,
    );
  }

  assertExactFields(block, fields, path);

  switch (block.type) {
    case 'heading':
      assertInteger(block.level, childPath(path, 'level'));
      if (block.level < 2 || block.level > 4) {
        fail(childPath(path, 'level'), 'must be between 2 and 4');
      }
      assertNonEmptyString(block.text, childPath(path, 'text'));
      break;

    case 'paragraph':
    case 'quote':
      assertNonEmptyString(block.text, childPath(path, 'text'));
      break;

    case 'list':
      assertBoolean(block.ordered, childPath(path, 'ordered'));
      assertStringArray(block.items, childPath(path, 'items'), { nonEmpty: true });
      break;

    case 'code':
      assertNonEmptyString(block.language, childPath(path, 'language'));
      assertNonEmptyString(block.code, childPath(path, 'code'));
      break;

    case 'table': {
      assertStringArray(block.headers, childPath(path, 'headers'), { nonEmpty: true });
      if (!Array.isArray(block.rows)) fail(childPath(path, 'rows'), 'must be an array');

      block.rows.forEach((row, rowIndex) => {
        const rowPath = childPath(childPath(path, 'rows'), rowIndex);
        assertStringArray(row, rowPath);
        if (row.length !== block.headers.length) {
          fail(rowPath, `must contain exactly ${block.headers.length} cells`);
        }
      });
      break;
    }

    default:
      // The discriminant check above makes this unreachable.
      break;
  }

  return block;
};

/** Validate an array of content blocks and return it unchanged. */
export const validateContentBlocks = (blocks, path = 'content', { nonEmpty = false } = {}) => {
  if (!Array.isArray(blocks)) fail(path, 'must be an array');
  if (nonEmpty && blocks.length === 0) fail(path, 'must contain at least one block');
  blocks.forEach((block, index) => validateContentBlock(block, childPath(path, index)));
  return blocks;
};

/** Validate one canonical project and return it unchanged. */
export const validateProject = (project, path = 'project') => {
  assertExactFields(project, PROJECT_FIELDS, path);
  assertNonEmptyString(project.id, childPath(path, 'id'));
  assertNonEmptyString(project.slug, childPath(path, 'slug'));
  assertNonEmptyString(project.title, childPath(path, 'title'));
  assertNullableInteger(project.year, childPath(path, 'year'), { minimum: 0 });
  assertNonEmptyString(project.category, childPath(path, 'category'));
  assertNonEmptyString(project.description, childPath(path, 'description'));
  assertStringArray(project.technologies, childPath(path, 'technologies'));
  assertNullableHttpsUrl(project.sourceUrl, childPath(path, 'sourceUrl'));
  assertStatus(project.status, childPath(path, 'status'));
  assertInteger(project.sortOrder, childPath(path, 'sortOrder'), { minimum: 0 });
  assertNullableInteger(project.featuredRank, childPath(path, 'featuredRank'), { minimum: 1 });
  validateContentBlocks(project.content, childPath(path, 'content'), { nonEmpty: true });
  return project;
};

const assertUniqueField = (items, field, path) => {
  const firstIndexByValue = new Map();

  items.forEach((item, index) => {
    const value = item[field];
    if (firstIndexByValue.has(value)) {
      const firstIndex = firstIndexByValue.get(value);
      fail(
        childPath(childPath(path, index), field),
        `must be unique; duplicates ${childPath(childPath(path, firstIndex), field)}`,
      );
    }
    firstIndexByValue.set(value, index);
  });
};

/** Validate the canonical project collection, including unique ids and slugs. */
export const validateProjects = (projects, path = 'projects') => {
  if (!Array.isArray(projects)) fail(path, 'must be an array');
  projects.forEach((project, index) => validateProject(project, childPath(path, index)));
  assertUniqueField(projects, 'id', path);
  assertUniqueField(projects, 'slug', path);
  return projects;
};

/** Validate one canonical writing and return it unchanged. */
export const validateWriting = (writing, path = 'writing') => {
  assertExactFields(writing, WRITING_FIELDS, path);
  assertNonEmptyString(writing.slug, childPath(path, 'slug'));
  assertNonEmptyString(writing.title, childPath(path, 'title'));
  assertNullableDate(writing.publishedAt, childPath(path, 'publishedAt'));
  assertNonEmptyString(writing.category, childPath(path, 'category'));
  assertStatus(writing.status, childPath(path, 'status'));
  assertNonEmptyString(writing.excerpt, childPath(path, 'excerpt'));
  assertStringArray(writing.tags, childPath(path, 'tags'));
  assertInteger(writing.readingMinutes, childPath(path, 'readingMinutes'), { minimum: 1 });
  assertNullableInteger(writing.featuredRank, childPath(path, 'featuredRank'), { minimum: 1 });
  validateContentBlocks(writing.content, childPath(path, 'content'), { nonEmpty: true });
  return writing;
};

/** Validate the canonical writing collection, including unique slugs. */
export const validateWritings = (writings, path = 'writings') => {
  if (!Array.isArray(writings)) fail(path, 'must be an array');
  writings.forEach((writing, index) => validateWriting(writing, childPath(path, index)));
  assertUniqueField(writings, 'slug', path);
  return writings;
};

/**
 * Validate site data. Profile and navigation are stable entry points; all other
 * JSON-safe static sections remain deliberately extensible.
 */
export const validateSiteContent = (site, path = 'site') => {
  assertExactFields(
    site,
    [
      'profile',
      'navigation',
      'focusAreas',
      'engineeringPrinciples',
      'journey',
      'skillGroups',
      'githubRepositories',
    ],
    path,
  );

  const profilePath = childPath(path, 'profile');
  assertExactFields(
    site.profile,
    ['name', 'englishName', 'title', 'location', 'email', 'githubUrl', 'intro', 'summary'],
    profilePath,
  );

  ['name', 'englishName', 'title', 'location', 'intro'].forEach((field) => {
    assertNonEmptyString(site.profile[field], childPath(profilePath, field));
  });
  assertEmail(site.profile.email, childPath(profilePath, 'email'));
  assertHttpsUrl(site.profile.githubUrl, childPath(profilePath, 'githubUrl'));
  assertStringArray(site.profile.summary, childPath(profilePath, 'summary'), { nonEmpty: true });

  const navigationPath = childPath(path, 'navigation');
  if (!Array.isArray(site.navigation)) fail(navigationPath, 'must be an array');
  site.navigation.forEach((item, index) => {
    const itemPath = childPath(navigationPath, index);
    assertExactFields(item, ['to', 'text'], itemPath);
    assertInternalPath(item.to, childPath(itemPath, 'to'));
    assertNonEmptyString(item.text, childPath(itemPath, 'text'));
  });

  {
    const sectionPath = childPath(path, 'focusAreas');
    if (!Array.isArray(site.focusAreas)) fail(sectionPath, 'must be an array');
    site.focusAreas.forEach((item, index) => {
      const itemPath = childPath(sectionPath, index);
      assertExactFields(item, ['title', 'text'], itemPath);
      assertNonEmptyString(item.title, childPath(itemPath, 'title'));
      assertNonEmptyString(item.text, childPath(itemPath, 'text'));
    });
  }

  {
    assertStringArray(
      site.engineeringPrinciples,
      childPath(path, 'engineeringPrinciples'),
    );
  }

  {
    const sectionPath = childPath(path, 'journey');
    if (!Array.isArray(site.journey)) fail(sectionPath, 'must be an array');
    site.journey.forEach((item, index) => {
      const itemPath = childPath(sectionPath, index);
      assertExactFields(item, ['period', 'title', 'description'], itemPath);
      ['period', 'title', 'description'].forEach((field) => {
        assertNonEmptyString(item[field], childPath(itemPath, field));
      });
    });
  }

  {
    const sectionPath = childPath(path, 'skillGroups');
    if (!Array.isArray(site.skillGroups)) fail(sectionPath, 'must be an array');
    site.skillGroups.forEach((item, index) => {
      const itemPath = childPath(sectionPath, index);
      assertExactFields(item, ['title', 'items'], itemPath);
      assertNonEmptyString(item.title, childPath(itemPath, 'title'));
      assertStringArray(item.items, childPath(itemPath, 'items'));
    });
  }

  {
    const repositoriesPath = childPath(path, 'githubRepositories');
    if (!Array.isArray(site.githubRepositories)) fail(repositoriesPath, 'must be an array');
    site.githubRepositories.forEach((item, index) => {
      const itemPath = childPath(repositoriesPath, index);
      assertExactFields(item, ['name', 'language', 'url', 'note'], itemPath);
      assertHttpsUrl(item.url, childPath(itemPath, 'url'));
      ['name', 'language', 'note'].forEach((field) => {
        assertNonEmptyString(item[field], childPath(itemPath, field));
      });
    });
  }

  assertJsonSafe(site, path);
  return site;
};

/** Validate the complete content payload and return it unchanged. */
export const validateAllContent = (value, path = 'content') => {
  assertExactFields(value, ['projects', 'writings', 'site'], path);
  validateProjects(value.projects, childPath(path, 'projects'));
  validateWritings(value.writings, childPath(path, 'writings'));
  validateSiteContent(value.site, childPath(path, 'site'));
  return value;
};

/**
 * Flatten JSON content into searchable text. Every string leaf is included
 * except discriminating `type` values; code strings are intentionally retained.
 */
export const flattenContent = (value) => {
  const strings = [];
  const ancestors = new WeakSet();

  const visit = (current, path) => {
    if (typeof current === 'string') {
      strings.push(current);
      return;
    }
    if (current === null || typeof current !== 'object') return;
    if (ancestors.has(current)) fail(path, 'must not contain circular references');

    ancestors.add(current);
    if (Array.isArray(current)) {
      current.forEach((item, index) => visit(item, childPath(path, index)));
    } else {
      Object.entries(current).forEach(([key, item]) => {
        if (key !== 'type') visit(item, childPath(path, key));
      });
    }
    ancestors.delete(current);
  };

  visit(value, 'content');
  return strings.join('\n');
};

// Assertion aliases make call sites read naturally while preserving one API
// contract: success returns the original value; failure throws the typed error.
export const assertContentBlock = validateContentBlock;
export const assertContentBlocks = validateContentBlocks;
export const assertProject = validateProject;
export const assertProjects = validateProjects;
export const assertWriting = validateWriting;
export const assertWritings = validateWritings;
export const assertSiteContent = validateSiteContent;
export const assertAllContent = validateAllContent;
