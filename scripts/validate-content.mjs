#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { validateAllContent } from '../src/domain/contentSchema.js';

const contentUrls = {
  projects: new URL('../src/content/projects.json', import.meta.url),
  writings: new URL('../src/content/writings.json', import.meta.url),
  site: new URL('../src/content/site.json', import.meta.url),
};

const readJson = async ([name, url]) => {
  try {
    return [name, JSON.parse(await readFile(url, 'utf8'))];
  } catch (error) {
    const file = fileURLToPath(url);
    throw new Error(`Could not read ${file}: ${error.message}`, { cause: error });
  }
};

try {
  const entries = await Promise.all(Object.entries(contentUrls).map(readJson));
  const content = Object.fromEntries(entries);
  validateAllContent(content);
  console.log(`Content valid: ${content.projects.length} projects, ${content.writings.length} writings, 1 site document.`);
} catch (error) {
  console.error(`Content validation failed: ${error.message}`);
  process.exitCode = 1;
}
