const endpoint = 'https://api.github.com/users/mikeholp87/repos?type=owner&sort=created&direction=desc&per_page=100';
const cache = { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' };
const noStore = { 'Cache-Control': 'no-store' };
const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2026-03-10' };
const projectCutoff = '2026-01-01T00:00:00Z';
const hidden = new Set(['solar-business-directory', 'seo-tool']);

export async function GET() {
  try {
    const projects = [];
    for (let page = 1; ; page++) {
      const response = await fetch(`${endpoint}&page=${page}`, { headers, signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('GitHub returned an invalid repository list');
      projects.push(...data
        .filter(repo => repo?.owner?.login === 'mikeholp87' && repo.private === false && repo.fork === false && typeof repo.name === 'string' && /^[\w.-]+$/.test(repo.name) && repo.created_at >= projectCutoff && !hidden.has(repo.name.toLowerCase()))
        .map(repo => ({
          name: repo.name,
          description: typeof repo.description === 'string' ? repo.description : 'No description provided on GitHub.',
          url: `https://github.com/mikeholp87/${repo.name}`,
        })));
      if (data.length < 100) break;
    }
    if (!projects.length) throw new Error('GitHub returned no public repositories');
    return Response.json(projects, { headers: cache });
  } catch (error) {
    console.error('[github-repositories] refresh failed', error.message);
    return Response.json({ error: 'GitHub repositories unavailable' }, { status: 502, headers: noStore });
  }
}
