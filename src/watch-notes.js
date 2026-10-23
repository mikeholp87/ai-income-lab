// Search titles preserve recorded topics; companion sections state their caption-review date.
export const watchNotes = {
  'qQVAnp4-EpI': {
    searchTitle: 'Runable tutorial: build an AI Growth Audit website',
    summary: 'Research, build and refine an AI Growth Audit website in Runable. Covers the project brief, market research and homepage revisions; Stripe and email delivery remain unfinished.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: research the offer, then inspect the prototype</h2>
<p>The walkthrough turns an AI Growth Audit business brief into a website preview in Runable. Mike reviews market research, generates the first site, and simplifies its homepage. The recording ends before payments and consultation email delivery are connected.</p>
<p class="meta">Notes checked October 22, 2026 against the recording’s captions. Timing, credits and interface details describe the recorded session.</p>
<h3>The sequence shown</h3>
<ol><li>Create a master brief covering the audience, problem, offer, promise, conversion goal and design direction. Exclude invented testimonials and statistics.</li><li>Run market research, then inspect the competitor database, pricing comparisons and SEO opportunity documents. Treat the generated research as input to review.</li><li>Combine the research and master brief to generate the AI Growth Audit website and customer portal. Review the preview and launch checklist.</li><li>Refine the hero, prioritize the audit call to action, remove repeated copy, and simplify the page’s decorative elements.</li></ol>
<h3>What remains unfinished</h3>
<p>Stripe is not connected, and the consultation form still needs email delivery. A complete paid audit flow and public deployment are not demonstrated. Verify those outcomes before treating the preview as a working business.</p>
<p>For more search-visibility workflows, explore the <a href="/videos/ai-seo">AI SEO videos</a>. For another website-building walkthrough, browse the <a href="/videos/codex-opencode">Codex and OpenCode builds</a>.</p>
</section>`,
  },
  Lifl4PC2_3M: {
    searchTitle: 'Make.com tutorial: Google Sheets, Gmail and AI mapping',
    summary: 'Build a Make.com workflow from Google Sheets to Gmail, add an AI-generated draft, and correct the content mapping. Includes recorded failures and test limits.',
    notice: 'This recording mentions an earlier free community offer and historical Make pricing. Check the current plans before purchasing.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: inspect the bundle before sending</h2>
<p>The course builds a Google Sheets-to-Gmail workflow, adds an OpenAI-generated email, and corrects a mapping mistake. It also tours existing scenarios and templates. Those tours do not demonstrate that every workflow completes successfully.</p>
<p class="meta">Notes checked October 11, 2026 against the recording’s captions. Module names, model choices, prices, and access belong to the recorded session.</p>
<h3>The recorded first workflow</h3>
<ol><li>Connect Google Sheets and select the spreadsheet, tab, headers, and starting position. The first run returns ten bundles with names and email addresses.</li><li>Add an array aggregator and iterator, then map the recipient into Gmail. Mike reduces the test to one row before sending a basic email.</li><li>Disconnect the send module while adding OpenAI. Run the generation step and inspect its output before reconnecting Gmail.</li><li>Correct the content mapping. The first connected run still uses the old email content; Mike maps OpenAI’s generated result into the Gmail body and repeats the run.</li><li>Open execution history to inspect the operations and outputs. A green module is a starting point: check the intended recipient and body too.</li></ol>
<h3>What did not complete</h3>
<p>The HeyGen scenario is not run because its API video-length issue remains unresolved. A template example initially fails parsing; a later run completes with no useful spreadsheet fields mapped. These are not evidence of a completed video-publishing pipeline or a populated email archive.</p>
<h3>A smaller practice run</h3>
<p>Start with the <a href="/guides/make-first-automation.html">Make Google Sheets exercise</a>, using fictional records and spreadsheet output. Make’s <a href="https://help.make.com/step-5-set-up-the-trigger">trigger guide</a> explains starting positions, and its <a href="https://help.make.com/mapping">mapping guide</a> explains how module outputs reach the next step. Re-running from the beginning can repeat actions; inspect the test output before enabling a schedule.</p>
<p>If you later add Gmail, test with an address you control and review the generated text. Continue to the <a href="/watch/G8u1-hKEqig">HeyGen automation notes</a> for the actual avatar/API failures.</p>
</section>`,
  },
  '9kHdIiobKMA': {
    searchTitle: 'VAPI voice agent: setup, test call and webhook checks',
    summary: 'Configure a VAPI assistant, connect Make and a Twilio number, and receive a test call. Notes distinguish webhook delivery from booking and spreadsheet updates.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: verify one call before automating a list</h2>
<p>Mike creates a VAPI assistant, connects it to Make.com and a Twilio number, and receives a call on his own phone. A second call reaches the end-of-call webhook. Calendar booking and a correctly matched spreadsheet update are not demonstrated.</p>
<p class="meta">Notes checked October 11, 2026 against the recording’s captions. Provider choices and costs may have changed.</p>
<h3>The setup shown</h3>
<ol><li>Create a blank assistant, choose a model, and write its identity, greeting, questions, and conversation boundaries. The recording changes from a built-in voice to Mike’s existing ElevenLabs voice clone.</li><li>Publish the assistant and inspect the dashboard test controls. For an outbound telephone call, import a Twilio number and select that number and the assistant in Make.</li><li>Use one test phone number you control. The first run reaches Mike’s phone and begins the scripted conversation.</li><li>Configure a Make webhook for the assistant’s end-of-call report. The later test reaches that webhook; inspect the delivered analysis and call data.</li></ol>
<h3>Separate a call from a completed business task</h3>
<p>The calendar integration is described as a stretch goal. The final Google Sheets module is configured with a fixed row number and hard-coded “yes” values; the captions do not establish a successful, correctly correlated update. A connected call is not proof of a booked appointment.</p>
<p>Before updating real records, carry a stable record ID through the request and match it to the returned call ID. Verify the call result instead of marking every call successful. Avoid copying the fixed-row example into a multi-contact workflow.</p>
<h3>Current references and a first check</h3>
<p>Use the <a href="https://docs.vapi.ai/assistants/quickstart">VAPI quickstart</a>, <a href="https://docs.vapi.ai/quickstart/phone">phone-call guide</a>, and <a href="https://docs.vapi.ai/server-url/events">server-event reference</a> for current setup and payloads. Free account creation does not mean free ongoing calling: check telephony, model, and voice usage charges.</p>
<p>Keep private API keys in the platform’s connection settings. Practice record mapping with the <a href="/guides/make-first-automation.html">Make Google Sheets guide</a>, then explore the <a href="/start-here.html#avatar-voice">voice-agent learning path</a>.</p>
</section>`,
  },
  'Ax-v4H9xv50': {
    searchTitle: 'Google AI Studio: build and check a chat app prototype',
    summary: 'Build a chat interface in Google AI Studio and request an OpenAI integration. The recording shows replies and ZIP export, but stops before deployment.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: a preview reply is only the first check</h2>
<p>The walkthrough generates a chat-style app in Google AI Studio, downloads its source as a ZIP, and asks for an OpenAI integration. The preview answers simple prompts. Public deployment is not completed because billing setup remains unfinished.</p>
<p class="meta">Notes checked October 11, 2026 against the recording’s captions. The recorded interface differs from current Build mode.</p>
<h3>What the recording establishes</h3>
<ol><li>Explore a supplied video-generation example, then start a separate chat app from a written brief.</li><li>Inspect the generated preview, switch its display theme, and export the source. These checks establish that a frontend was generated.</li><li>Request the OpenAI integration. An initial missing-key error appears, followed by a key-entry screen and simple text/code replies.</li><li>Open the deployment flow. Mike stops at the Google Cloud billing step; the video does not show a deployed URL.</li></ol>
<h3>Check the provider and protect the key</h3>
<p>A model saying it was built by OpenAI does not verify which provider handled a request. Inspect the server integration and the provider’s usage logs before concluding that the intended API is connected.</p>
<p>The recording suggests hard-coding a key and enters it into the preview. Do not place a private provider key in browser code or a public repository. Current <a href="https://ai.google.dev/gemini-api/docs/aistudio-build-mode">Google AI Studio Build documentation</a> describes server-side secrets; use the server boundary for external providers too. Follow <a href="https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety">OpenAI’s key-safety guidance</a>.</p>
<h3>Before sharing the app</h3>
<p>Check a valid request, a provider failure, the actual API usage, and where secrets are stored. Confirm hosting and model costs separately; the recorded “free” introduction does not establish zero deployment or API costs.</p>
<p>The <a href="/guides/first-api-request.html">local API exercise</a> teaches request checks without a provider key. Use the <a href="/guides/codex-workflow.html">small-change workflow</a> to inspect and verify generated code.</p>
</section>`,
  },
  MYoA3___zYU: {
    searchTitle: 'Emergent tutorial: build an agency landing page',
    summary: 'Generate an agency landing page with Emergent, add a calendar popup, and fix a broken contact button. Notes separate the frontend result from untested backend features.',
    notice: 'This recording mentions an earlier $39/month community offer. Check the current membership plans.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: test the contact flow after changing it</h2>
<p>Mike uses Emergent to generate an AI agency landing page and refine its design. A calendar popup is added, the contact button breaks, and a follow-up prompt restores the contact page. The result is a frontend prototype, not a demonstrated subscription SaaS.</p>
<p class="meta">Notes checked October 11, 2026 against the recording’s captions. Generated designs and product access may have changed.</p>
<h3>The recorded build</h3>
<ol><li>Supply a landing-page brief and answer the agent’s questions about visual direction and scheduling. Photos and analytics setup are deferred.</li><li>Inspect the frontend preview. The agent reports mock data and forms using local storage; no working production backend is verified.</li><li>Request a shorter headline, visual revisions, and an embedded calendar popup. Mike checks the booking button in the preview.</li><li>After the popup change, test the contact button too. It produces an error; Mike reports that specific failure and repeats the check after the fix.</li></ol>
<h3>What remains to verify</h3>
<p>The video does not demonstrate production form delivery, authentication, payments, durable customer storage, or a completed CMS. A page that looks like a business site does not establish those capabilities.</p>
<p>Generated testimonial placeholders are not customer evidence. Replace them with approved real material or remove them before publication. Check the contact destination, calendar flow, mobile layout, keyboard navigation, and error behavior using sample data.</p>
<h3>Continue with a checkable task</h3>
<p>Use the <a href="/guides/codex-workflow.html">small-change workflow guide</a> to write a narrow brief and verify a fix. Pair this recording with the <a href="/guides/youtube-feed.html">React feed guide</a> for an example whose fallback behavior can be tested in source. The <a href="https://emergent.sh/learn">Emergent learning resources</a> provide current product guidance.</p>
</section>`,
  },
  ys5tJuTFCEo: {
    searchTitle: 'GrokBot with Codex and Claude Code: routing walkthrough',
    summary: 'Install and authenticate Codex and Claude Code inside GrokBot’s virtual computer, then define task routing. Notes distinguish the recorded setup from the updated workflow.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: authenticate the tool, then inspect its task</h2>
<p>The recording installs Codex and Claude Code inside GrokBot’s virtual computer, authenticates both, and asks for task-based routing. It shows a routing rule and reports work starting. It does not measure a completed deployment, search-traffic improvement, or a reproducible credit saving.</p>
<p class="meta">Notes checked October 11, 2026 against the recording’s captions. Models and limits describe the recorded session.</p>
<h3>The sequence shown</h3>
<ol><li>Install the two clients. Codex still needs a ChatGPT or API-key sign-in before a model request can run.</li><li>Complete each tool’s authentication separately. Installation alone is not a successful connection.</li><li>Inspect the workspace and permission mode. The recording flags Claude Code’s auto mode beside email-send scripts and moves coding work to a separate project folder.</li><li>Ask for fallback behavior when Cursor credits run out, then ask for task and model selection. A new rule file and helper are reported; the rule keeps Cursor as the default while available.</li></ol>
<h3>Use the later written setup</h3>
<p>The <a href="/guides/claude-code-vs-codex.html">Claude Code versus Codex guide</a> documents the updated manual-permission setup, task routing, fallback limits, and review process. Its current safety choices differ from the auto mode shown in the recording.</p>
<p>Start with a small repository task and a visible result. The <a href="/guides/codex-workflow.html">Codex exercise</a> verifies a local failure case. Check the actual diff and command output before accepting an orchestrator’s completion message.</p>
</section>`,
  },
  qC2ipjdszPA: {
    searchTitle: 'Codex usage limits: the recorded quota walkthrough',
    summary: 'Upgrade to ChatGPT Business to raise Codex usage limits, then fix the CLI still showing the old plan by signing out and back in. A recorded walkthrough.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Build notes: upgrade the plan, then check that Codex sees it</h2>
<p>Mike hits his weekly Codex limit, starts a ChatGPT Business trial, and then spends most of the video getting Codex to use the new plan. The fix that works in the recording is signing out of Codex and signing back in with the Business account.</p>
<p class="meta">Notes checked October 22, 2026 against the recording’s captions. Plan names, prices, trials and limits describe the recorded session in April 2026. Check OpenAI’s current plans before upgrading.</p>
<h3>The sequence shown</h3>
<ol><li>Check the remaining usage with the status command. Mike has about 19% left for the week.</li><li>Start the Business plan. The recording describes a one-month free trial and a price of around $15 per month, and Mike says Business gives about a 20x higher credit limit than the free plan. These are his recorded figures, not a measured comparison. The video title says 10X.</li><li>The CLI still reports the free plan with 0% credits, and the VS Code extension asks him to upgrade to Plus.</li><li>Run a task in Codex cloud as a workaround. It installs dependencies, hits some errors, and updates a build script. Mike notes he can commit and push from there through the connected GitHub repository. Mike finds it slower than working locally.</li><li>Sign out of Codex and sign back in with the Business account. Status then shows 100% credits with a 5-hour reset, and the CLI picks up the same plan.</li></ol>
<h3>What the recording does not establish</h3>
<p>It does not show how long the higher limit lasts over a working week, and the trial and pricing may have changed. Confirm the plan in Codex with a status check before starting a long task.</p>
<p>For how plan limits and Codex credits compare across Plus, Pro 5x and Pro 20x, see <a href="/guides/chatgpt-pro-20x.html#codex-credits">Codex limits and credits</a>.</p>
<p>For a small task to run once your limits are sorted, use the <a href="/guides/codex-workflow.html">Codex workflow guide</a>.</p>
</section>`,
  },
  uSx_lW4oppY: {
    searchTitle: 'ChatGPT subscription pause: the recorded explanation',
    summary: 'Why the $200/month ChatGPT Pro 20x plan was paused for new subscribers in September 2026, what existing users keep, and the reasoning setting Mike uses.',
    html: `<section aria-labelledby="build-notes">
<h2 id="build-notes">Notes: what the video reports, and where it comes from</h2>
<p>Mike explains that OpenAI paused new sign-ups for the $200 per month Pro 20x plan after demand for GPT-6 Astra. The $100 per month 5x plan was still available to him, and the video says existing 20x subscribers keep access.</p>
<p class="meta">Notes checked October 22, 2026 against the recording’s captions. Plan availability, prices and limits describe the session recorded in September 2026. Check OpenAI’s current plans before buying.</p>
<h3>Sources shown in the video</h3>
<ul><li>Posts on X from an OpenAI staff member about unprecedented demand, no impact on existing users, and adding capacity.</li><li>A Facebook post by Jeff Hunter with a seven-day timeline from the Astra preview on September 3 to the pause on September 10, plus 5-hour message ranges per plan.</li></ul>
<p>The timeline and message ranges are third-party summaries read out in the video. They are not figures Mike measured, and this page has not checked them against OpenAI.</p>
<h3>Mike’s own observations</h3>
<p>He reports using up his Pro allowance in about five hours with Astra, and his Plus credits in minutes. For routine work he sets reasoning effort to medium in Codex and keeps high for hard debugging. Treat this as one user’s experience, not a benchmark.</p>
</section>`,
  },
  EECptdYND6k: { searchTitle: 'Odysseus AI: a first-look walkthrough' },
  'Qb6RG0-8O1k': { searchTitle: 'Claude Code access: the recorded setup and limits' },
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
<p>Read the <a href="/guides/opencode-vs-claude-code.html">OpenCode vs Claude Code guide</a> for current sources on licensing, provider connections, installation, pricing and limits.</p>
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
<p>Read the <a href="/guides/codex-on-linux.html">Codex on Linux guide</a> for official CLI installation, ChatGPT sign-in, current desktop status, and the distinction from the earlier unofficial setup.</p>
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
<p>Read the <a href="/guides/codex-on-linux.html">Codex on Linux guide</a> for official CLI installation, ChatGPT sign-in, current desktop status, and the distinction from the earlier unofficial setup.</p>
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
