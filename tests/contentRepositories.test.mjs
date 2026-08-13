import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ContentValidationError,
  createProjectRepository,
  createSiteRepository,
  createWritingRepository,
  projectRepository,
  siteRepository,
  validateContentBlock,
  validateProject,
  validateProjects,
  validateSiteContent,
  validateWriting,
  validateWritings,
  writingRepository,
} from '../src/repositories/index.js';

const projectFixtures = [
  {
    id: 'project-beta',
    slug: 'beta-api',
    title: 'Beta API',
    year: 2025,
    category: 'Backend',
    description: 'A resilient service boundary.',
    technologies: ['Node.js', 'PostgreSQL'],
    sourceUrl: 'https://example.com/beta-api',
    status: 'published',
    sortOrder: 2,
    featuredRank: 2,
    content: [
      { type: 'heading', level: 2, text: 'Architecture' },
      { type: 'paragraph', text: 'Requests cross a transactional outbox.' },
    ],
  },
  {
    id: 'project-alpha',
    slug: 'alpha-interface',
    title: 'Alpha Interface',
    year: 2026,
    category: 'Frontend',
    description: 'An accessible component system.',
    technologies: ['Vue'],
    sourceUrl: null,
    status: 'published',
    sortOrder: 1,
    featuredRank: null,
    content: [
      { type: 'heading', level: 2, text: 'Interaction model' },
      {
        type: 'table',
        headers: ['Input', 'Behavior'],
        rows: [['Keyboard matrix sentinel', 'Moves focus predictably']],
      },
    ],
  },
  {
    id: 'project-draft',
    slug: 'delta-prototype',
    title: 'Delta Prototype',
    year: null,
    category: 'Backend',
    description: 'An unpublished experiment.',
    technologies: ['Rust'],
    sourceUrl: null,
    status: 'draft',
    sortOrder: 3,
    featuredRank: 3,
    content: [{ type: 'code', language: 'rust', code: 'let draft_only = true;' }],
  },
  {
    id: 'project-gamma',
    slug: 'gamma-data',
    title: 'Gamma Data',
    year: 2024,
    category: 'Backend',
    description: 'A streaming data pipeline.',
    technologies: ['Node.js', 'Kafka'],
    sourceUrl: 'https://example.com/gamma-data',
    status: 'published',
    sortOrder: 4,
    featuredRank: 1,
    content: [
      { type: 'heading', level: 2, text: 'Recovery' },
      {
        type: 'list',
        ordered: false,
        items: ['Replay each partition.', 'Route failures to the dead letter sentinel.'],
      },
    ],
  },
];

const writingFixtures = [
  {
    slug: 'newest-patterns',
    title: 'Newest Patterns',
    publishedAt: '2026-04-10',
    category: 'Backend',
    status: 'published',
    excerpt: 'Patterns for predictable APIs.',
    tags: ['API', 'Node.js'],
    readingMinutes: 4,
    featuredRank: 1,
    content: [
      { type: 'heading', level: 2, text: 'Pagination' },
      { type: 'paragraph', text: 'A deep cursor sentinel keeps the feed stable.' },
    ],
  },
  {
    slug: 'draft-internals',
    title: 'Draft Internals',
    publishedAt: '2026-04-05',
    category: 'Backend',
    status: 'draft',
    excerpt: 'Notes that are not ready for readers.',
    tags: ['Internal'],
    readingMinutes: 2,
    featuredRank: null,
    content: [{ type: 'quote', text: 'This draft marker must remain private.' }],
  },
  {
    slug: 'alpha-components',
    title: 'Alpha Components',
    publishedAt: '2026-03-15',
    category: 'Frontend',
    status: 'published',
    excerpt: 'Accessible components in practice.',
    tags: ['Vue', 'Testing'],
    readingMinutes: 6,
    featuredRank: 2,
    content: [
      {
        type: 'table',
        headers: ['Concern', 'Test'],
        rows: [['Focus trap sentinel', 'Tab stays inside the dialog']],
      },
    ],
  },
  {
    slug: 'middle-operations',
    title: 'Middle Operations',
    publishedAt: '2025-12-01',
    category: 'Backend',
    status: 'published',
    excerpt: 'Operating data services safely.',
    tags: ['API', 'Data'],
    readingMinutes: 5,
    featuredRank: null,
    content: [{ type: 'paragraph', text: 'Measure retries and queue depth.' }],
  },
];

const siteFixture = {
  profile: {
    name: 'Test Author',
    englishName: 'Test Author',
    title: 'Engineer',
    location: 'Taiwan',
    email: 'test@example.com',
    githubUrl: 'https://github.com/example',
    intro: 'A test profile.',
    summary: ['A test summary.'],
  },
  navigation: [{ to: '/', text: 'Home' }],
  focusAreas: [{ title: 'Testing', text: 'Contract tests.' }],
  engineeringPrinciples: ['Keep boundaries explicit.'],
  journey: [{ period: 'Now', title: 'Testing', description: 'Verifying contracts.' }],
  skillGroups: [{ title: 'Backend', items: ['Node.js'] }],
  githubRepositories: [
    {
      name: 'example',
      language: 'JavaScript',
      url: 'https://github.com/example/repository',
      note: 'A test repository.',
    },
  ],
};

const slugs = (items) => items.map(({ slug }) => slug);

const facetCounts = (facets) =>
  Object.fromEntries(facets.map(({ value, count }) => [value, count]));

const assertListEnvelope = (result) => {
  assert.deepEqual(Object.keys(result).sort(), ['available', 'facets', 'items', 'total']);
  assert.ok(Array.isArray(result.items));
  assert.equal(typeof result.total, 'number');
  assert.equal(typeof result.available, 'number');
  assert.equal(typeof result.facets, 'object');
};

const assertSummary = (item) => {
  assert.equal(Object.hasOwn(item, 'content'), false, 'list items must not expose detail content');
};

test('project repository is asynchronous and returns summary-safe list envelopes', async () => {
  const repository = createProjectRepository(projectFixtures);
  const pending = repository.list();

  assert.equal(typeof pending?.then, 'function');

  const result = await pending;
  assertListEnvelope(result);
  assert.deepEqual(slugs(result.items), ['alpha-interface', 'beta-api', 'gamma-data']);
  assert.equal(result.total, 3);
  assert.equal(result.available, 3);
  result.items.forEach(assertSummary);

  assert.deepEqual(facetCounts(result.facets.categories), { Backend: 2, Frontend: 1 });
  assert.deepEqual(facetCounts(result.facets.technologies), {
    Kafka: 1,
    'Node.js': 2,
    PostgreSQL: 1,
    Vue: 1,
  });
  assert.deepEqual(facetCounts(result.facets.statuses), { published: 3 });
});

test('project list supports visibility, filters, pagination, title sort, and nested block search', async () => {
  const repository = createProjectRepository(projectFixtures);

  const combined = await repository.list({ category: 'Backend', technology: 'Node.js' });
  assert.deepEqual(slugs(combined.items), ['beta-api', 'gamma-data']);
  assert.equal(combined.total, 2);
  assert.equal(combined.available, 3);

  const nestedSearch = await repository.list({ q: 'KEYBOARD MATRIX SENTINEL' });
  assert.deepEqual(slugs(nestedSearch.items), ['alpha-interface']);

  const paginated = await repository.list({ offset: 1, limit: 1 });
  assert.deepEqual(slugs(paginated.items), ['beta-api']);
  assert.equal(paginated.total, 3);
  assert.equal(paginated.available, 3);

  const byTitle = await repository.list({ sort: 'title' });
  assert.deepEqual(slugs(byTitle.items), ['alpha-interface', 'beta-api', 'gamma-data']);

  const drafts = await repository.list({ status: 'draft' });
  assert.deepEqual(slugs(drafts.items), ['delta-prototype']);

  const includingDrafts = await repository.list({ includeDrafts: true });
  assert.deepEqual(slugs(includingDrafts.items), [
    'alpha-interface',
    'beta-api',
    'delta-prototype',
    'gamma-data',
  ]);
  assert.equal(includingDrafts.available, 4);

  const featured = await repository.list({ featured: true });
  assert.deepEqual(slugs(featured.items), ['gamma-data', 'beta-api']);
});

test('project detail lookup supports IDs and slugs while preserving canonical content', async () => {
  const repository = createProjectRepository(projectFixtures);
  const pending = repository.getById('project-beta');

  assert.equal(typeof pending?.then, 'function');

  const byId = await pending;
  assert.equal(byId.slug, 'beta-api');
  assert.deepEqual(byId.content, projectFixtures[0].content);

  const bySlug = await repository.getBySlug('gamma-data');
  assert.equal(bySlug.id, 'project-gamma');
  assert.match(bySlug.content[1].items[1], /dead letter sentinel/);

  assert.equal(await repository.getById('missing-project'), null);
  assert.equal(await repository.getBySlug('missing-project'), null);
  assert.equal(await repository.getBySlug('delta-prototype'), null);
  assert.equal((await repository.getBySlug('delta-prototype', { includeDrafts: true })).status, 'draft');
});

test('project facets are arrays of value/count records and honor visibility options', async () => {
  const repository = createProjectRepository(projectFixtures);
  const facets = await repository.getFacets();

  assert.ok(['categories', 'technologies', 'statuses'].every((key) => Array.isArray(facets[key])));
  assert.deepEqual(facetCounts(facets.categories), { Backend: 2, Frontend: 1 });

  const allFacets = await repository.getFacets({ includeDrafts: true });
  assert.deepEqual(facetCounts(allFacets.categories), { Backend: 3, Frontend: 1 });
  assert.deepEqual(facetCounts(allFacets.statuses), { draft: 1, published: 3 });
  assert.equal(facetCounts(allFacets.technologies).Rust, 1);
});

test('writing repository hides drafts by default and returns summary-safe list envelopes', async () => {
  const repository = createWritingRepository(writingFixtures);
  const pending = repository.list();

  assert.equal(typeof pending?.then, 'function');

  const result = await pending;
  assertListEnvelope(result);
  assert.deepEqual(slugs(result.items), [
    'newest-patterns',
    'alpha-components',
    'middle-operations',
  ]);
  assert.equal(result.total, 3);
  assert.equal(result.available, 3);
  result.items.forEach(assertSummary);

  assert.deepEqual(facetCounts(result.facets.categories), { Backend: 2, Frontend: 1 });
  assert.deepEqual(facetCounts(result.facets.statuses), { published: 3 });
});

test('writing list supports search, category/tag/status filters, sorting, and pagination', async () => {
  const repository = createWritingRepository(writingFixtures);

  const nestedSearch = await repository.list({ q: 'FOCUS TRAP SENTINEL' });
  assert.deepEqual(slugs(nestedSearch.items), ['alpha-components']);

  const filtered = await repository.list({ category: 'Backend', tag: 'API' });
  assert.deepEqual(slugs(filtered.items), ['newest-patterns', 'middle-operations']);

  const draftSearch = await repository.list({ q: 'draft marker', includeDrafts: true });
  assert.deepEqual(slugs(draftSearch.items), ['draft-internals']);

  const drafts = await repository.list({ status: 'draft' });
  assert.deepEqual(slugs(drafts.items), ['draft-internals']);

  const oldest = await repository.list({ sort: 'oldest' });
  assert.deepEqual(slugs(oldest.items), [
    'middle-operations',
    'alpha-components',
    'newest-patterns',
  ]);

  const byTitle = await repository.list({ sort: 'title' });
  assert.deepEqual(slugs(byTitle.items), [
    'alpha-components',
    'middle-operations',
    'newest-patterns',
  ]);

  const page = await repository.list({ offset: 1, limit: 1 });
  assert.deepEqual(slugs(page.items), ['alpha-components']);
  assert.equal(page.total, 3);
  assert.equal(page.available, 3);
});

test('writing detail returns stable missing shapes and published-order navigation', async () => {
  const repository = createWritingRepository(writingFixtures);
  const pending = repository.getBySlug('alpha-components');

  assert.equal(typeof pending?.then, 'function');

  const detail = await pending;
  assert.equal(detail.item.slug, 'alpha-components');
  assert.deepEqual(detail.item.content, writingFixtures[2].content);
  assert.equal(detail.navigation.previous.slug, 'newest-patterns');
  assert.equal(detail.navigation.next.slug, 'middle-operations');
  assertSummary(detail.navigation.previous);
  assertSummary(detail.navigation.next);

  assert.deepEqual(await repository.getBySlug('missing-writing'), {
    item: null,
    navigation: { previous: null, next: null },
  });
  assert.deepEqual(await repository.getBySlug('draft-internals'), {
    item: null,
    navigation: { previous: null, next: null },
  });

  const draft = await repository.getBySlug('draft-internals', { includeDrafts: true });
  assert.equal(draft.item.status, 'draft');
});

test('writing facets exclude drafts by default and expose them when requested', async () => {
  const repository = createWritingRepository(writingFixtures);
  const facets = await repository.getFacets();

  assert.ok(['categories', 'tags', 'statuses'].every((key) => Array.isArray(facets[key])));
  assert.deepEqual(facetCounts(facets.tags), {
    API: 2,
    Data: 1,
    'Node.js': 1,
    Testing: 1,
    Vue: 1,
  });

  const allFacets = await repository.getFacets({ includeDrafts: true });
  assert.deepEqual(facetCounts(allFacets.categories), { Backend: 3, Frontend: 1 });
  assert.deepEqual(facetCounts(allFacets.statuses), { draft: 1, published: 3 });
  assert.equal(facetCounts(allFacets.tags).Internal, 1);
});

test('site repository returns an asynchronous defensive clone', async () => {
  const repository = createSiteRepository(siteFixture);
  const pending = repository.get();

  assert.equal(typeof pending?.then, 'function');

  const first = await pending;
  first.profile.name = 'Mutated';
  first.navigation[0].text = 'Changed';
  first.navigation.push({ to: '/extra', text: 'Extra' });

  const second = await repository.get();
  assert.deepEqual(second, siteFixture);
  assert.notStrictEqual(first, second);
  assert.notStrictEqual(first.profile, second.profile);
  assert.notStrictEqual(first.navigation, second.navigation);
});

test('canonical content validation accepts all six block variants', () => {
  const blocks = [
    { type: 'heading', level: 3, text: 'A heading' },
    { type: 'paragraph', text: 'A paragraph' },
    { type: 'quote', text: 'A quotation' },
    { type: 'list', ordered: true, items: ['First', 'Second'] },
    { type: 'code', language: 'js', code: 'const ready = true;' },
    {
      type: 'table',
      headers: ['Name', 'Value'],
      rows: [['Ready', 'yes']],
    },
  ];

  for (const block of blocks) {
    assert.deepEqual(validateContentBlock(block), block);
  }
});

test('canonical content validation rejects malformed and non-canonical blocks', () => {
  const invalidBlocks = [
    { type: 'embed', url: 'https://example.com' },
    { type: 'paragraph', text: 'Canonical text', extra: true },
    { type: 'paragraph', text: '' },
    { type: 'list', ordered: false, items: [] },
    { type: 'table', headers: ['Name', 'Value'], rows: [['Only one cell']] },
  ];

  for (const block of invalidBlocks) {
    assert.throws(() => validateContentBlock(block), ContentValidationError);
  }
});

test('content validation rejects dangerous URLs and duplicate repository identities', () => {
  assert.doesNotThrow(() => validateProject(projectFixtures[0]));
  assert.throws(
    () => validateProject({ ...projectFixtures[0], sourceUrl: 'http://example.com/project' }),
    ContentValidationError,
  );
  assert.throws(
    () => validateProject({ ...projectFixtures[0], sourceUrl: 'javascript:alert(1)' }),
    ContentValidationError,
  );

  assert.throws(
    () => validateProjects([
      projectFixtures[0],
      { ...projectFixtures[1], id: projectFixtures[0].id },
    ]),
    ContentValidationError,
  );
  assert.throws(
    () => validateProjects([
      projectFixtures[0],
      { ...projectFixtures[1], slug: projectFixtures[0].slug },
    ]),
    ContentValidationError,
  );
  assert.throws(
    () => validateWritings([
      writingFixtures[0],
      { ...writingFixtures[1], slug: writingFixtures[0].slug },
    ]),
    ContentValidationError,
  );
});

test('project and writing validation require at least one content block', () => {
  assert.throws(
    () => validateProject({ ...projectFixtures[0], content: [] }),
    ContentValidationError,
  );
  assert.throws(
    () => validateWriting({ ...writingFixtures[0], content: [] }),
    ContentValidationError,
  );
});

test('site validation rejects unsafe contact links and malformed navigation', () => {
  const invalidSites = [
    {
      ...siteFixture,
      profile: { ...siteFixture.profile, githubUrl: 'javascript:alert(1)' },
    },
    {
      ...siteFixture,
      githubRepositories: [
        {
          name: 'unsafe-repository',
          language: 'JavaScript',
          url: 'javascript:alert(1)',
          note: 'An unsafe external link.',
        },
      ],
    },
    {
      ...siteFixture,
      profile: { ...siteFixture.profile, email: 'not-an-email' },
    },
    {
      ...siteFixture,
      navigation: [{ to: '//evil.example/path', text: 'Evil' }],
    },
    {
      ...siteFixture,
      navigation: [{ to: 'https://evil.example/path', text: 'Evil' }],
    },
    {
      ...siteFixture,
      navigation: [{ to: '/', text: '   ' }],
    },
  ];

  for (const site of invalidSites) {
    assert.throws(() => validateSiteContent(site), ContentValidationError);
  }
});

test('singleton repositories load and validate the shipped JSON content', async () => {
  const [projects, writings, site] = await Promise.all([
    projectRepository.list(),
    writingRepository.list(),
    siteRepository.get(),
  ]);

  assert.ok(projects.items.length > 0);
  assert.ok(writings.items.length > 0);
  assert.equal(typeof site.profile.name, 'string');
});
