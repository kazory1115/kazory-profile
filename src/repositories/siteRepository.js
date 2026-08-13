import siteContent from '../content/site.json' with { type: 'json' };
import { validateSiteContent } from '../domain/contentSchema.js';
import { clone, normaliseRepositoryInput } from './helpers.js';

export const createSiteRepository = (source = siteContent) => {
  const site = clone(validateSiteContent(normaliseRepositoryInput(source, 'site')));

  return Object.freeze({
    async get() {
      return clone(site);
    },
  });
};

export const siteRepository = createSiteRepository();
