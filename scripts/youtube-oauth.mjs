// Google sign-in for the local YouTube scripts: installed-app loopback flow with PKCE, using the Desktop
// OAuth client at ~/.config/yt-oauth/client_secret.json (Google Cloud project ai-income-lab-site-1006).
// Tokens are stored owner-only per scope; the refresh token lets later runs skip the browser.
// At sign-in, choose the AI Automation Station brand account.
import { createHash, randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { homedir } from 'node:os';
import { spawn } from 'node:child_process';

const dir = `${homedir()}/.config/yt-oauth`;

export async function accessToken(scope = 'https://www.googleapis.com/auth/youtube') {
  const { installed } = JSON.parse(readFileSync(`${dir}/client_secret.json`, 'utf8'));
  const tokenFile = `${dir}/token-${scope.split('/').pop()}.json`;
  const save = (body, refreshToken) => writeFileSync(tokenFile, JSON.stringify({ token: body.access_token, expiresAt: Date.now() + body.expires_in * 1000, refreshToken }), { mode: 0o600 });
  const exchange = async params => {
    const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ client_id: installed.client_id, client_secret: installed.client_secret, ...params }) });
    const body = await response.json();
    if (!response.ok) throw new Error(`Token request failed: ${body.error}`);
    return body;
  };

  const cached = existsSync(tokenFile) ? JSON.parse(readFileSync(tokenFile, 'utf8')) : null;
  if (cached?.expiresAt > Date.now() + 60000) return cached.token;
  if (cached?.refreshToken) {
    try {
      const body = await exchange({ grant_type: 'refresh_token', refresh_token: cached.refreshToken });
      save(body, cached.refreshToken);
      return body.access_token;
    } catch { /* revoked or expired: sign in again below */ }
  }

  const verifier = randomBytes(48).toString('base64url');
  const state = randomBytes(16).toString('hex');
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const redirectUri = `http://127.0.0.1:${server.address().port}`;
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  Object.entries({ client_id: installed.client_id, redirect_uri: redirectUri, response_type: 'code', scope, state, access_type: 'offline', code_challenge: createHash('sha256').update(verifier).digest('base64url'), code_challenge_method: 'S256', prompt: 'consent' }).forEach(([key, value]) => url.searchParams.set(key, value));
  console.log(`Sign in with the AI Automation Station brand account (opening your browser):\n${url}\n`);
  spawn('xdg-open', [url.toString()], { stdio: 'ignore', detached: true }).on('error', () => {}).unref();
  const code = await new Promise((resolve, reject) => server.on('request', (req, res) => {
    const params = new URL(req.url, redirectUri).searchParams;
    if (!params.get('code') && !params.get('error')) return res.end();
    const ok = params.get('code') && params.get('state') === state;
    res.end(ok ? 'Approved. You can close this tab and return to the terminal.' : 'Sign-in did not complete. Check the terminal.');
    server.close();
    ok ? resolve(params.get('code')) : reject(new Error(`OAuth failed: ${params.get('error') ?? 'state mismatch'}`));
  }));
  const body = await exchange({ code, code_verifier: verifier, grant_type: 'authorization_code', redirect_uri: redirectUri });
  save(body, body.refresh_token);
  return body.access_token;
}
