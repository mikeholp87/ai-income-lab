# Production release

November 9, 2026. Commit `7b34773f0faed7d1df82b794b1aa8043b3b0e5f1` pushed to `main`.

- Vercel production deployment `dpl_2UVmhoBnKgV7pmpsMS1QFqfwxbL7`: READY.
- Live site: https://www.ai-automation-station.com/
- All 295 tests and ESLint passed locally; GitHub CI test job completed successfully.
- Live HTTP checks passed for home, search, both reviewed watch pages, n8n topic, privacy and the YouTube-feed tutorial.
- Live mobile browser: 390px viewport fits; Search navigation present; nine projects; GitHub link follows the list.
- Live search: Make.com Google Sheets tutorial is first for `make`; Show more expands 8 results to 16.
- No live subscriber/contact emails were sent. Email retry and concurrency behavior is covered by controlled fixtures.

Only the 15 reviewed application/test/runbook files were committed. The private Search Console audit artifacts and unrelated untracked thumbnails were excluded.

The user subsequently instructed that Gitleaks must not run as part of future GitHub pushes/deployments unless explicitly requested. This preference is saved in `/home/mikeh/.codex/AGENTS.md`; Supermemory storage failed due to exhausted credits. No further Gitleaks scan was run after that instruction.

Live Make validation, paid-conversion reconciliation and durable opt-out/token-consumption state remain pending as described in IMPLEMENTATION.md.
