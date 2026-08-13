# Kazory Profile

A Vue 3 and Vite portfolio whose local content is stored as validated JSON. Views never import JSON directly: they consume asynchronous repository contracts, so a REST API and database can replace the local adapter without rewriting page components.

## Highlights

- Explicit schemas for projects, writings, and site configuration
- Runtime validation for required fields, unique identities, enums, dates, and safe URLs
- Repository-owned search, filters, facets, detail lookup, and article navigation
- Structured content blocks rendered with Vue text bindings; no `v-html`
- Draft content is excluded from public repository results by default

## Architecture

```text
Vue Views → Repositories → Local JSON (current)
                         → REST API → Database (future)
```

JSON establishes the data contract. The repository boundary—not the file extension—is what makes the database migration inexpensive.

## Commands

Node.js 20 or newer is required.

```bash
npm ci
npm run dev
npm run check
```

`npm run check` validates content, runs repository tests, and creates a production build. Do not share one `node_modules` directory between Windows and WSL because the build toolchain includes OS-specific packages.

See [the content guide](docs/writing-guide.md) and [README.md](README.md) for the full structure and migration notes.
