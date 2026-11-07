import assert from 'node:assert/strict';
import test from 'node:test';
import { validGithubRepositories } from './github-repositories.js';

const publicRepo = (name, extra = {}) => ({
  name,
  created_at: '2026-01-01T00:00:00Z',
  description: `${name} project`,
  private: false,
  fork: false,
  owner: { login: 'mikeholp87' },
  ...extra,
});

test('GitHub endpoint returns every owned public source repository', async t => {
  t.mock.method(AbortSignal, 'timeout', milliseconds => {
    assert.equal(milliseconds, 8000);
    return new AbortController().signal;
  });
  t.mock.method(globalThis, 'fetch', async (input, options) => {
    const url = new URL(input);
    assert.equal(url.hostname, 'api.github.com');
    assert.equal(url.searchParams.get('sort'), 'created');
    assert.equal(url.searchParams.get('page'), '1');
    assert.equal(options.headers.Accept, 'application/vnd.github+json');
    return Response.json([
      publicRepo('newest'),
      publicRepo('fork', { fork: true }),
      publicRepo('private', { private: true }),
      publicRepo('second'),
      publicRepo('other-owner', { owner: { login: 'someone-else' } }),
      publicRepo('third'),
      publicRepo('solar-business-directory'),
      publicRepo('SEO-Tool'),
      publicRepo('fourth'),
      publicRepo('older', { created_at: '2025-12-31T23:59:59Z' }),
      publicRepo('next-year', { created_at: '2027-01-01T00:00:00Z' }),
    ]);
  });
  const { GET } = await import(`../api/github-repositories.js?test=${encodeURIComponent(t.name)}`);
  const response = await GET();
  const projects = await response.json();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  assert.deepEqual(projects.map(project => project.name), ['newest', 'second', 'third', 'fourth', 'next-year']);
  assert.ok(validGithubRepositories(projects));
  assert.equal(validGithubRepositories([{ name: 'external', description: 'bad', url: 'https://example.com' }]), false);
});

test('GitHub endpoint follows pagination beyond the first 100 repositories', async t => {
  t.mock.method(AbortSignal, 'timeout', () => new AbortController().signal);
  t.mock.method(globalThis, 'fetch', async input => {
    const page = new URL(input).searchParams.get('page');
    return Response.json(page === '1'
      ? Array.from({ length: 100 }, (_, index) => publicRepo(`repo-${index}`))
      : [publicRepo('repo-100')]);
  });
  const { GET } = await import(`../api/github-repositories.js?test=${encodeURIComponent(t.name)}`);
  const response = await GET();
  const projects = await response.json();
  assert.equal(projects.length, 101);
  assert.equal(projects.at(-1).name, 'repo-100');
  assert.ok(validGithubRepositories(projects));
});

test('GitHub outage returns an uncached error so the page keeps its static list', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }));
  const { GET } = await import(`../api/github-repositories.js?test=${encodeURIComponent(t.name)}`);
  const response = await GET();
  assert.equal(response.status, 502);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});
