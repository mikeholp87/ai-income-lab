// Editorial notes checked against the creator's captions and the linked primary sources on 2026-10-08.
export const watchNotes = {
  enKnxKJJFZw: {
    searchTitle: 'Skool community launch (2025)',
    summary: 'A look back at the community’s free launch in 2025. As of October 8, 2026, AI Income Lab membership starts at $29/month.',
    notice: 'This recording and its original chapter names describe the free launch in 2025. Access has changed: as of October 8, 2026, AI Income Lab membership starts at $29/month.',
  },
  dILjZszMZ5o: {
    summary: 'Business automation and the community’s earlier free offer. As of October 8, 2026, AI Income Lab membership starts at $29/month.',
    notice: 'This 2025 recording mentions free community access. As of October 8, 2026, AI Income Lab membership starts at $29/month. The recorded offer is historical.',
  },
  '1aG1XbAQj-k': { summary: 'Claude Opus 5 is here and it’s my new go-to model.' },
  geKngm3sg3w: {
    searchTitle: '9Router setup and request checks',
    summary: 'Set up 9Router, connect a provider, and check that requests reach the gateway. Build notes cover model selection, usage verification, and fallback limits.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: verify your first routed request</h2>
<p>This walkthrough connects coding tools to a local 9Router gateway. The useful checkpoint is a request appearing in the gateway’s usage dashboard: a connected provider alone does not prove that your client is routing through it.</p>
<p class="meta">Notes checked October 8, 2026 against the video captions. The recording does not identify a 9Router release version.</p>
<h3>Before you start</h3>
<p>Have Node.js/npm, a coding client, and access to the provider you intend to use. Follow the <a href="https://github.com/decolua/9router#-quick-start">project’s current installation instructions</a>. Provider availability, authentication methods, quotas, and prices can change. Keep the first test local and configure your own dashboard password.</p>
<h3>Follow the setup</h3>
<ol>
<li>Start 9Router and open its local dashboard. Connect one provider using the authentication method that provider supports.</li>
<li>Select a model exposed by that connection. In the recording, the client initially uses a different model from the ones configured in the gateway.</li>
<li>Set the client’s base URL to the gateway endpoint and copy the gateway’s model identifier and client API key. Keep upstream provider credentials in the gateway rather than confusing them with the client key.</li>
<li>Send one small request, then inspect the usage tab for the selected model, input/output tokens, and any reported cost. If nothing appears, check the endpoint and model mapping before adding more providers.</li>
</ol>
<h3>What the walkthrough establishes</h3>
<p>After updating the client configuration and model selection, Mike reports that token usage and cost entries appear in the 9Router dashboard. That is the demonstrated integration checkpoint. The recording discusses fallback routing, but does not establish a controlled outage test across every tier or a measured cost saving.</p>
<p>Tailscale and tunneling are explored in the video; they are not part of the local request exercise here. Only add remote access when your project needs it.</p>
<h3>Try the prerequisite, then test your gateway</h3>
<p>The <a href="/guides/first-api-request.html">first API request guide</a> includes a free local mock that exercises success, authentication, and unknown-model responses. It does not call 9Router or an AI provider. After that exercise, repeat a small request against your actual gateway and verify its logs.</p>
</section>`,
  },
  lbBZ7uLJwbM: {
    searchTitle: 'ChatGPT and Codex on Linux',
    summary: 'Follow the ChatGPT and Codex Linux setup demonstrated on Debian, including the dependency issue, first project audit, and current compatibility checks.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: ChatGPT and Codex on Linux</h2>
<p>The video follows installation of the official desktop app, recovery from a package dependency problem, and a first Codex audit inside an existing project. The recorded setup is Debian Forky with ChatGPT version 26.8, as identified in the narration.</p>
<p class="meta">Notes checked October 8, 2026 against the video captions and OpenAI’s installation guide.</p>
<h3>Check compatibility first</h3>
<p>Use the <a href="https://learn.chatgpt.com/docs/linux/linux-app">official Linux installation guide</a> to match your distribution and processor architecture to the correct package. The current guide lists Debian 13; the recording’s Forky setup is not a promise of support for that release. Use the supported platform list for a new installation.</p>
<h3>Follow the workflow</h3>
<ol>
<li>Download the official package for your system. The recording uses a Debian package; the current guide recommends installing it with apt so dependencies can be resolved.</li>
<li>If installation fails, read the package manager’s dependency error before retrying. Mike encounters a Mesa Vulkan driver dependency problem, resolves the missing packages, and then launches the app.</li>
<li>Open ChatGPT, sign in, and choose a project in the Codex workspace. Review the requested project permissions before allowing edits.</li>
<li>Start with a read-only task: ask for a project explanation or an audit with file references. In the demonstration, the AI SEO skill returns findings for TubeAnalytics.</li>
<li>Review those findings, make a small change, and run the project’s checks. The <a href="/guides/youtube-feed.html">React YouTube-feed guide</a> offers a separate runnable project using this website’s public source.</li>
</ol>
<h3>What worked, and what to recheck</h3>
<p>The narration confirms that the app opens, the project and skills are available, and the audit returns a list of fixes. It also describes a slow first launch and a buggy desktop pet. These are observations from this setup, not a benchmark of all Linux installations.</p>
<p>Available models and features may differ from the recording. Check the current documentation instead of copying the video’s model names or assuming parity with Windows and macOS. For the next workflow, watch <a href="/watch/TuVL2x6IfDk">the Codex internal-linking audit</a>.</p>
</section>`,
  },
  TuVL2x6IfDk: {
    searchTitle: 'Codex internal-link audit',
    summary: 'Use Codex to audit internal links, plan relevant changes, and verify the result. Notes separate the demonstrated workflow from unverified ranking claims.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: turn an internal-link audit into checked changes</h2>
<p>Mike uses Codex to inspect an existing blog, create an internal-linking plan, implement changes, and audit the result again. The repeatable part is the audit–plan–verify workflow. The video does not demonstrate a subsequent increase in search traffic or revenue.</p>
<p class="meta">Notes checked October 8, 2026 against the video captions and Google’s link guidance. The recording uses an existing site with hundreds of articles; counts change with the audit’s scope.</p>
<h3>Use external claims as hypotheses</h3>
<p>The “$50,000” figure comes from a third-party forum author’s reported research spending. It is not spending by Mike, an independently verified study budget, or a demonstrated saving. Likewise, the video’s ten-links-per-article target is a project rule, not a Google requirement. <a href="https://developers.google.com/search/docs/crawling-indexing/links-crawlable">Google’s guidance</a> emphasizes helpful contextual links and says there is no ideal link count.</p>
<h3>Apply the workflow to your site</h3>
<ol>
<li>Start from a clean Git checkpoint. Ask the assistant to inventory public pages and contextual links, explaining whether navigation links, redirects, and language variants are included.</li>
<li>Find important pages with no relevant incoming links. Choose existing articles that genuinely help readers discover those pages.</li>
<li>Review a small implementation plan with source pages, destination pages, and proposed anchor text. Add a link where it helps explain the subject; do not force a quota into every introduction.</li>
<li>Review the diff and run the site’s build and link checks. Confirm that targets return the intended content and that canonical URLs remain correct.</li>
<li>Deploy the checked changes, repeat the audit against the same URL set, and track discovery and clicks over time.</li>
</ol>
<h3>What the recording reports</h3>
<p>The final audit reports 559 public English articles with valid link targets and no modeled orphans, followed by another pass on pages with weak incoming coverage. Those are tool-reported structural results. The video’s earlier totals cover different inventories and should not be presented as a controlled before-and-after ranking experiment.</p>
<p>To measure visitor behavior, use the <a href="/guides/consent-tracking.html">consent-aware tracking guide</a>. A navigation click is a useful signal about the journey; it is not a confirmed membership purchase. If you need the desktop setup first, follow <a href="/watch/lbBZ7uLJwbM">Codex on Linux</a>.</p>
</section>`,
  },
};
