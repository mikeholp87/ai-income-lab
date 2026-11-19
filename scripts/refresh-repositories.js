import { readFile, writeFile } from 'node:fs/promises';
import { validGithubRepositories } from '../src/github-repositories.js';

// Build-time copy of /api/github-repositories (which owns the hidden-repo and 2026 rules), so the
// prerendered homepage lists current projects. The page refreshes it at runtime between builds.
const path = new URL('../src/repositories-snapshot.json', import.meta.url);
try {
  const response = await fetch('https://www.ai-automation-station.com/api/github-repositories', { signal: AbortSignal.timeout(8000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const projects = await response.json();
  if (!validGithubRepositories(projects)) throw new Error('Invalid repository list');
  await writeFile(path, `${JSON.stringify(projects, null, 2)}\n`);
  console.log(`Updated the repositories snapshot (${projects.length} projects).`);
} catch (error) {
  if (!validGithubRepositories(JSON.parse(await readFile(path, 'utf8')))) throw new Error('No usable repositories snapshot', { cause: error });
  console.warn(`Using the saved repositories snapshot: ${error.message}`);
}
