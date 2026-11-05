import assert from 'node:assert/strict';
import test from 'node:test';
import { validGithubRepositories } from './github-repositories.js';

const publicRepo = (name, extra = {}) => ({
  name,
  description: `${name} project`,
  private: false,
  fork: false,
  owner: { login: 'mikeholp87' },
  ...extra,
});

test('GitHub endpoint returns the three newest owned public source repositories', async t => {
  t.mock.method(AbortSignal, 'timeout', milliseconds => {
    assert.equal(milliseconds, 8000);
    return new AbortController().signal;
  });
  t.mock.method(globalThis, 'fetch', async (input, options) => {
    const url = new URL(input);
    assert.equal(url.hostname, 'api.github.com');
    assert.equal(url.searchParams.get('sort'), 'created');
    assert.equal(options.headers.Accept, 'application/vnd.github+json');
    return Response.json([
      publicRepo('newest'),
      publicRepo('fork', { fork: true }),
      publicRepo('private', { private: true }),
      publicRepo('second'),
      publicRepo('other-owner', { owner: { login: 'someone-else' } }),
      publicRepo('third'),
      publicRepo('fourth'),
    ]);
  });
  const { GET } = await import(`../api/github-repositories.js?test=${encodeURIComponent(t.name)}`);
  const response = await GET();
  const projects = await response.json();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400');
  assert.deepEqual(projects.map(project => project.name), ['newest', 'second', 'third']);
  assert.ok(validGithubRepositories(projects));
  assert.equal(validGithubRepositories([{ name: 'external', description: 'bad', url: 'https://example.com' }]), false);
});

test('GitHub outage returns an uncached error so the page keeps its static list', async t => {
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }));
  const { GET } = await import(`../api/github-repositories.js?test=${encodeURIComponent(t.name)}`);
  const response = await GET();
  assert.equal(response.status, 502);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});
