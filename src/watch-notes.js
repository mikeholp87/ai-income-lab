// Search titles preserve recorded topics; companion sections state their caption-review date.
export const watchNotes = {
  e73WvglCLW0: { searchTitle: 'Check your website’s visibility in AI answer engines' },
  NoHkFvhbiuU: { searchTitle: 'Building an AI tool to find website clients' },
  '2G5klyFz61E': { searchTitle: 'Building an AI search visibility tracker' },
  '9hs6n1enosI': { searchTitle: 'Claude Mythos: first look and review' },
  ByncCPWeGNY: { searchTitle: 'Hermes Agent desktop app: complete setup' },
  'cfYpzY-o3fQ': { searchTitle: 'A free AI coding agent: walkthrough' },
  dVvazfQHhW4: { searchTitle: 'Write LinkedIn posts with Hermes Agent' },
  pDrMGahPnwc: { searchTitle: 'Compare your competitors’ AI search visibility' },
  DfyAAwHPJuU: { searchTitle: 'Why I built TubeAnalytics for YouTube creators' },
  ncg6F27PYt0: { searchTitle: 'Build web apps with KiloCode: a Cursor alternative' },
  KDZ7yefRv54: { searchTitle: 'Make infographics from YouTube content with NotebookLM' },
  eui7NABhRV8: { searchTitle: 'Make faceless AI videos with Syllaby' },
  pMLyxz6Dyt4: { searchTitle: 'HeyGen AI avatar tutorial: create your first video' },
  'KKw2Q9-Ge_0': { searchTitle: 'Building classic games with Gemini 3' },
  lumzbY6QV4Y: { searchTitle: 'Testing OpenAI Agent Builder' },
  SplwScUztfM: { searchTitle: 'Facebook monetization requirements: the 2025 walkthrough' },
  QlL87_URHZ8: { searchTitle: 'Create images with Nano Banana in Google Gemini' },
  J86tffN9nmg: { searchTitle: 'Building a ChatGPT clone with Rocket AI' },
  lKqe0r0zoGY: { searchTitle: 'Lindy AI tutorial: build your first agent' },
  ZlD4Z6UKS8o: { searchTitle: 'Build a website with AI: Lovable tutorial' },
  SLAnjvWK1Y4: { searchTitle: 'Automating YouTube Shorts with AI' },
  KEXgl3vsVMI: { searchTitle: 'Skool Hobby plan: the recorded $9/month review' },
  kKiFzNW9fjw: { searchTitle: 'Build an AI content workflow in Make.com' },
  R90zVHmoj7A: { searchTitle: 'Make.com tutorial: automate a business workflow' },
  X0X8kJTK7vA: { searchTitle: 'Automating lead generation: a workflow walkthrough' },
  PDfEWpyyRMI: { searchTitle: 'Syllaby AI review: building a faceless channel' },
  CGVALaueHeA: { searchTitle: 'Building an AI tool to find YouTube video topics' },
  _8qzOkIWMSk: {
    searchTitle: 'OpenCode vs Claude Code: setup and model limits',
    summary: 'Explore OpenCode as a Claude Code alternative: model selection, OpenRouter setup, skills, and the rate-limit failure shown in the walkthrough.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: choose a model that actually responds</h2>
<p>Mike explores OpenCode after reaching his Claude usage limit. This is a setup walkthrough and a personal workflow comparison, not a controlled benchmark of coding accuracy or speed.</p>
<p class="meta">Notes checked October 9, 2026 against the recording’s captions. Model availability and the prices discussed belong to the recorded session.</p>
<h3>What the demonstration covers</h3>
<ol><li>Open the installed terminal client and inspect the model picker. The recording also tours installation choices for desktop and editor use.</li><li>Select a provider and model. Mike shows his OpenCode usage dashboard, then adds an OpenRouter connection using an API key.</li><li>Try a request with the selected model. The Gemma request through OpenRouter returns a rate-limit error, so Mike switches back to Kimi before continuing.</li><li>Run an installed SEO skill on an existing website. The recording shows the task starting; it does not establish a measured improvement in search traffic.</li></ol>
<h3>Separate the client from model access</h3>
<p>An open-source coding client does not make every connected model free. Check the selected provider’s current access, billing, and rate limits before copying this setup. A model appearing in the picker is not proof that your account can successfully call it.</p>
<p>Keep API keys out of recordings and repositories. If a request fails, inspect the provider error before switching models; changing a model does not repair an invalid credential or an exhausted quota.</p>
<h3>A useful next test</h3>
<p>Give the client one small repository task with a reproducible check, then inspect the diff and run that check. The <a href="/guides/codex-workflow.html">coding-assistant workflow guide</a> uses this website’s public example and works as a practice brief for other coding clients too. For a complete recorded build with visible debugging, continue to the <a href="/watch/7v_675nO7nM">OpenCode habit-tracker walkthrough</a>.</p>
</section>`,
  },
  'G8u1-hKEqig': {
    searchTitle: 'HeyGen avatar course: creation and automation limits',
    summary: 'Create an avatar video with HeyGen, then follow the Make.com workflow and its actual failures: a stale avatar ID and an API duration limit.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: make one avatar clip before automating</h2>
<p>The course covers avatar and voice setup, script creation, video generation, and a proposed Make.com publishing workflow. The manually generated video completes. The end-to-end automation does not complete successfully in the recording.</p>
<p class="meta">Notes checked October 9, 2026 against the recording’s captions. Recorded API limits, prices, and community offers are historical; check current access before purchasing.</p>
<h3>Start with the manual result</h3>
<ol><li>Use your own likeness and voice, or material you have permission to use. Create the avatar and choose the intended voice in the video editor.</li><li>Provide a short spoken script. Remove scene directions that you do not want read aloud.</li><li>Generate one clip, review the result, and download it. The narration confirms the manual generation finishes, but says viewers cannot hear the playback audio in that segment.</li></ol>
<h3>Where the automation fails</h3>
<p>The scenario researches an Airtable topic, generates a script, calls HeyGen, waits, retrieves the video and thumbnail, and is intended to upload an unlisted YouTube video before updating Airtable. On the first run, the avatar ID refers to an older avatar. Mike replaces it with the new ID.</p>
<p>The next attempts hit an API processing error with a 180-second limit. Reducing the requested word count does not resolve the failure shown. Word count alone does not guarantee a spoken duration. The recording ends with a partial workflow: research and script preparation are automated, while video creation and uploading remain manual.</p>
<h3>Check these boundaries before expanding</h3>
<p>Verify API access separately from the web editor’s subscription. Test a short clip with your actual avatar and voice IDs before adding publishing steps. In a larger workflow, check the generation status before downloading; a fixed wait does not establish that the render succeeded.</p>
<p>Practice mapping records and checking outputs with the <a href="/guides/make-first-automation.html">first Make.com automation guide</a>. Then use the <a href="/start-here.html#avatar-voice">avatar and voice learning path</a> to choose the next project.</p>
</section>`,
  },
  '5zBHLxXw3tI': {
    searchTitle: 'Hermes desktop on Debian: setup and provider checks',
    summary: 'Follow the Hermes desktop walkthrough on Debian: sessions, profiles, provider authentication, diagnostics, and the optional virtual office.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: connect the provider before adding agents</h2>
<p>Mike installs a Debian package for Hermes desktop, explores the interface, and connects an optional 3D office. The useful checkpoint is a responding agent with a working provider connection. An animated office alone does not prove that a task has completed.</p>
<p class="meta">Notes checked October 9, 2026 against the recording’s captions. The walkthrough describes the available packages and features at recording time.</p>
<h3>Follow the recorded setup</h3>
<ol><li>Install the package matching the operating system and architecture. The demonstration uses Debian; it does not test the Windows or macOS packages.</li><li>Open the desktop interface and inspect sessions inherited from the command-line workflow. Profiles provide separate agent configurations.</li><li>Configure a provider, model identifier, and any required credentials. The interface also exposes skills, personality, memory, tools, schedules, and messaging gateways.</li><li>Run diagnostics and inspect the reported problems. Mike sees missing configuration and API-key issues; having the app open does not mean every tool is ready.</li><li>After an internal-server error, authenticate the model connection through the terminal and repeat setup. The recorded agent then responds inside the office.</li></ol>
<h3>What remains unverified</h3>
<p>The video asks an agent to read email and shows it loading an email skill. It does not demonstrate a completed inbox summary or verify that all connected tools work. The daily reminder and gateway settings are a tour of configuration options, not evidence of a long-running successful schedule.</p>
<p>For a first task, use a small request whose output you can inspect. Enable the tools that task needs, check the provider response, and add schedules or additional agents only after the basic path works. Current provider quotas and access may differ from the recording.</p>
<p>If credentials and endpoints are unfamiliar, start with the <a href="/guides/first-api-request.html">local API request exercise</a>. It teaches request checks without connecting an inbox or calling a paid model.</p>
</section>`,
  },
  '7v_675nO7nM': {
    searchTitle: 'Build an Electron habit tracker with OpenCode',
    summary: 'Build a React and Electron habit tracker with OpenCode, diagnose the blank desktop window, and verify that habits persist after reopening.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: a successful build still needs a launch test</h2>
<p>This walkthrough uses OpenCode to create a small React habit tracker inside Electron on Debian. The important result comes after two fixes: the desktop window loads correctly, and a saved habit survives closing and reopening the app.</p>
<p class="meta">Notes checked October 9, 2026 against the recording’s captions. Model prices, free access, and installation options may have changed.</p>
<h3>Define the small app first</h3>
<p>The initial brief asks for a desktop habit tracker with daily completion marking. Mike chooses React, then clarifies that the desktop wrapper should be Electron. OpenCode creates the Vite project and installs the packages. During generation, Mike switches models and continues the task.</p>
<h3>Verify the actual desktop result</h3>
<ol><li>Run the generated start command. In the recording, the build succeeds but the desktop window is blank.</li><li>Compare it with the development-server version. The browser version renders, narrowing the problem to the packaged loading path.</li><li>Report the precise difference to the assistant. The recorded fix changes Vite’s base so built asset paths are relative. This fixes this project’s loading problem; it is not a universal fix for every Electron blank window.</li><li>Launch again and add a habit. Then close and reopen the app to check persistence.</li><li>Add local storage when the habit does not survive a restart. Repeat the same check. The recording confirms the saved data appears on reopening.</li></ol>
<h3>Know the finish line</h3>
<p>The demonstration establishes a basic local prototype. It does not test synchronization between devices, packaged installers on other operating systems, or backup and recovery. The elapsed-time remarks are informal observations, not a controlled model-speed comparison.</p>
<p>Use the <a href="/guides/codex-workflow.html">small-change workflow guide</a> to practice the same brief, inspect, change, and verify loop in an existing repository. For the provider-selection setup, watch <a href="/watch/_8qzOkIWMSk">OpenCode as a Claude Code alternative</a>.</p>
</section>`,
  },
  g4BmgmEy_mI: {
    searchTitle: 'Codex desktop on Linux: the unofficial setup recording',
    summary: 'A historical walkthrough of an unofficial Codex Linux desktop wrapper: building the Debian package, fixing an install lock, and opening a project.',
    notice: 'This recording uses an unofficial Linux wrapper and mentions an earlier free community offer. For a new installation, check official platform support. Current AI Income Lab membership starts at $29/month as checked October 8, 2026.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: an unofficial Linux wrapper</h2>
<p>This recording predates the channel’s later official Linux installation walkthrough. It builds and installs a third-party Codex desktop wrapper on Debian. Treat it as a record of that setup, not as the current official installation procedure.</p>
<p class="meta">Notes checked October 9, 2026 against the recording’s captions.</p>
<h3>What happens in the recording</h3>
<ol><li>Clone the wrapper project and run its bootstrap command. The process downloads dependencies and compiles the desktop package.</li><li>Wait for the package build to finish. Mike reports high CPU usage during compilation on his laptop; that is a single-machine observation.</li><li>Resolve the package-manager lock conflict. Another installation is running, so the initial install cannot take the lock. After that installation finishes, Mike retries the Debian package installation.</li><li>Launch the app, import existing project settings, and open the TubeAnalytics repository.</li><li>Start an audit with an installed skill and explore the plugin interface.</li></ol>
<h3>What the video does and does not establish</h3>
<p>The desktop app launches and starts a project audit. The microphone control is visible, but dictation is not confirmed working in this recording. The session also does not establish feature parity with the official clients or independently validate the audit findings.</p>
<p>Do not delete a package-manager lock merely to reproduce the install sequence. Check whether another package operation is active and let it finish. For a fresh setup, start with <a href="/watch/lbBZ7uLJwbM">the later official Linux walkthrough and compatibility notes</a>, which links to the vendor’s installation instructions.</p>
<p>Once your client opens a project, use the <a href="/guides/codex-workflow.html">Codex workflow guide</a> to make a small, reviewable change and verify it with the project’s own checks.</p>
</section>`,
  },
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
