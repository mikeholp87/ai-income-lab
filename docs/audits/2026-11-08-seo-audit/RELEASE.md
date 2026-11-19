# SEO release to main

Prepared November 8, 2026 from `origin/main` at `ab32059d43ecdf850676c4c668f94af3d9b89092`.

Includes the discoverable watch iframe, chapter handling, source-attributed summaries for four recent recordings, three clearer website titles, ten contextual body links across seven guides, the privacy disclosure and its sitemap date, regression coverage, LF stylesheet attributes, and source lint exclusions for temporary deployment folders.

The latest main's existing homepage, guide rendering and AI-search changes were retained. Other unfinished edits in the original checkout were not included: the workflow estimator, new Codex CLI guide and its FAQ repair, additional guide exercises, YouTube description work, and their draft-only tests and reports. The earlier implementation note describes the shared local checkout; it is not the release manifest.

Validation on this isolated release: full test suite passed, ESLint passed, Vite client and SSR builds passed, and `verify-implementation.mjs` passed. The optional network-based inventory refresh was not run locally; Vercel retains the repository's normal build command for production. Existing non-fatal Vercel `use client` bundling warnings remain.

The original live crawl and the subsequent local build observations are recorded separately. Search Console video detection and field Core Web Vitals remain external measurements, not release guarantees.
