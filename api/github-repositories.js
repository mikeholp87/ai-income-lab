const endpoint = 'https://api.github.com/users/mikeholp87/repos?type=owner&sort=created&direction=desc&per_page=100';
const cache = { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' };
const noStore = { 'Cache-Control': 'no-store' };

export async function GET() {
  try {
    const response = await fetch(endpoint, {
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2026-03-10' },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const data = await response.json();
    const projects = Array.isArray(data) ? data
      .filter(repo => repo?.owner?.login === 'mikeholp87' && repo.private === false && repo.fork === false && typeof repo.name === 'string' && /^[\w.-]+$/.test(repo.name))
      .slice(0, 3)
      .map(repo => ({
        name: repo.name,
        description: typeof repo.description === 'string' ? repo.description : 'No description provided on GitHub.',
        url: `https://github.com/mikeholp87/${repo.name}`,
      })) : [];
    if (!projects.length) throw new Error('GitHub returned no public repositories');
    return Response.json(projects, { headers: cache });
  } catch (error) {
    console.error('[github-repositories] refresh failed', error.message);
    return Response.json({ error: 'GitHub repositories unavailable' }, { status: 502, headers: noStore });
  }
}
