export default {
  slug: 'opencode-desktop-habit-tracker-electron',
  video: '7v_675nO7nM',
  type: 'Case study',
  title: 'OpenCode Desktop: Habit Tracker With Electron',
  short: 'OpenCode desktop app',
  description: 'Install the OpenCode desktop app on Debian, build a habit tracker in React and Electron with free models, fix a white screen and add local storage.',
  hub: 'Install the OpenCode desktop app, build a React and Electron habit tracker with free models, fix the white-screen error and add local storage.',
  watchLabel: 'Follow the OpenCode desktop app habit tracker build',
  about: ['OpenCode','React','Electron','MiniMax M2.5'],
  card: {
    title: 'A habit tracker built in the OpenCode desktop app',
    steps: [
      ['Install','Desktop app on Debian, free Zen model'],
      ['Build','Plan, then React and Electron'],
      ['Fix','Relative paths for the white screen, local storage'],
    ],
    note: 'May 2026 walkthrough; model lists change often.',
  },
  quick: 'Install the OpenCode desktop app (beta, for macOS, Windows and Linux), choose a free model in OpenCode Zen, set reasoning to high and use plan mode to scope a daily habit tracker. I chose React and Electron, switched to MiniMax M2.5 for faster building, fixed a white screen caused by absolute asset paths by setting a relative base in the Vite config, then asked for local storage so habits persist between runs.',
  intro: "<p>This follows a May 2026 walkthrough on Debian Linux. OpenCode is an open-source coding agent with free models built in. The OpenCode Go link is an affiliate link. Free model names and limits change often, so check the app. For plans and how it compares with Claude Code, see <a href=\"/guides/opencode-vs-claude-code.html\">OpenCode vs Claude Code</a>.</p>\n<p>Prices and plan names change. Confirm them on the vendor page before you buy. Checked November 15, 2026 against the Sources links below where listed.</p>",
  sections: [
    {
      id: 'plans',
      h: '1. Free models and paid plans',
      html: "<p>The OpenCode site lists many built-in models, such as Big Pickle, MiniMax, Kimi 2.5, Nvidia Nemotron and Qwen 3.5. I compared that with paid plans I quoted: Claude Pro at $20 a month up to Max at $100 or more, ChatGPT Plus at $20 up to about $100 and Google plans from $8 up to over $250. OpenCode Go was $5 for the first month then $10, and OpenRouter can be connected for more models. The app installs with brew or as a download for macOS, Windows and Linux.</p>",
    },
    {
      id: 'install',
      h: '2. Install and set up',
      html: '<p>On Debian I ran the install command from the page, which downloaded the packages, then opened the desktop app and installed an update and restart. The interface is cleaner than the terminal. I set the model in OpenCode Zen to Nemotron 3 Super Free, reasoning to high and the mode to plan, and said hello to start a session. A terminal is available inside the app.</p>',
    },
    {
      id: 'build',
      h: '3. Plan and build the app',
      html: '<p>I asked for a daily habit tracker. In plan mode OpenCode asked for the tech stack and I chose React and Electron. It then generated the project while I watched. To speed it up, I switched models to MiniMax M2.5 mid-build.</p>',
    },
    {
      id: 'fix',
      h: '4. Fix the white screen and add storage',
      html: '<p>The first run opened a white window. The cause was that the built HTML used absolute asset paths, which Electron cannot load. OpenCode added a base setting to the Vite config so paths are relative, and npm start then worked. I added a habit called YouTube video and saw a streak. Closing and reopening lost the data, so I asked for local storage, and afterward habits persisted between sessions.</p>',
    },
  ],
  done: [
    'Desktop app on Debian, free Zen model',
    'Plan, then React and Electron',
    'Relative paths for the white screen, local storage',
  ],
  limits: [
    'Packaging the Electron app into an installer.',
    'How the free models compare in quality for larger projects.',
    'Security review of the generated code.',
  ],
  faq: [
    [
      'Is the OpenCode desktop app free?',
      "The app and its free Zen models were free in my walkthrough. OpenCode Go was $5 for the first month, then $10.",
    ],
    [
      'Why was my Electron window blank?',
      'Absolute asset paths. Setting a relative base in the Vite config fixed it.',
    ],
    [
      'How did the data persist?',
      'I asked OpenCode to add local storage, after which habits survived a restart.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=7v_675nO7nM">How To Build A Desktop App With OpenCode (Step-by-Step)</a> (recorded May 2026)',
    'OpenCode Go through my affiliate link: <a href="https://opencode.ai/go?ref=Y0V64DGPZN" rel="sponsored noopener">OpenCode</a>',
    'OpenCode: <a href="https://opencode.ai/">opencode.ai</a>',
  ],
  related: [
    ['/guides/opencode-vs-claude-code.html','OpenCode vs Claude Code'],
    ['/guides/opencode-go.html','OpenCode Go'],
    ['/guides/openrouter-setup.html','OpenRouter setup'],
    ['/guides/build-apps-with-ai-coding-agents.html','Build apps with AI coding agents'],
    ['/guides/claude-code-task-manager.html','Claude Code task manager'],
  ],
  next: ['/guides/opencode-go.html','OpenCode Go'],
  more: 'Price and details: <a href="/tools.html#opencode">OpenCode on the tools page</a>',
  linkFrom: ['/guides/opencode-go.html'],
  llms: 'A May 2026 build in the OpenCode desktop app on Debian: pick a free Zen model, use plan mode, choose React and Electron for a daily habit tracker, switch to MiniMax M2.5 for speed, fix a white screen by setting a relative Vite base and add local storage so habits persist.',
};
