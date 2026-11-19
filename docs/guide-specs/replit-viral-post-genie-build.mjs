export default {
  slug: 'replit-viral-post-genie-build',
  video: 'mKsPxDi7uM0',
  type: 'Case study',
  title: 'Build Viral Post Genie in Replit: Errors, Limits',
  short: 'Replit web app build',
  description: 'Build a Facebook post generator in Replit’s AI agent: the prompt, OpenAI key errors and fixes, thread format, history, Google sign-in and free-plan limit.',
  hub: 'Build a Facebook thread generator in Replit: prompt, OpenAI key errors and fixes, demo popup, history, Google sign-in and the free-plan limit.',
  watchLabel: 'Follow the Replit Viral Post Genie build',
  about: ['Replit','OpenAI API','ChatGPT','Postgres'],
  card: {
    title: 'A web app built with Replit’s AI agent',
    steps: [
      ['Prompt','Write it in ChatGPT, choose web app'],
      ['Fix','OpenAI key, max tokens, JSON errors'],
      ['Extend','History, sign-in; deploy needs paid'],
    ],
    note: 'August 2025; the free plan limit stopped the build.',
  },
  quick: 'In Replit choose Web app, paste a detailed prompt written in ChatGPT and let the agent build it. Mine was Viral Post Genie, a Facebook post generator with a topic, style and call-to-action form. Add an OpenAI key when asked, then fix the errors that follow: max tokens, an unsupported JSON object format and a 500 error, which I cleared by switching to GPT-4. I then added a numbered thread format, a demo popup, AI images, a history and Google sign-in on a temporary Postgres database before hitting the starter plan limit. Deploying needs a paid plan.',
  intro: '<p>This is a 41-minute August 2025 build, shortened here to the steps that mattered. The Replit link is a referral link. It is a test app, not production code. For how Replit compares with other builders, see <a href="/guides/lovable-vs-base44-vs-replit.html">Lovable vs Base44 vs Replit</a>.</p>',
  sections: [
    {
      id: 'prompt',
      h: '1. Write the prompt and start',
      html: '<p>The Replit dashboard asks you to describe an app. Choose the type: web app, data app, game or Python web app. I picked web app and pasted a prompt I wrote in ChatGPT: build a full-stack app called Viral Post Genie that creates Facebook posts from a topic, writing style and call to action, with a landing page, generator page, output section and a responsive UI. The more detailed the prompt, the better. The agent made an implementation plan and started building.</p>',
    },
    {
      id: 'errors',
      h: '2. Add the key and fix the errors',
      html: '<p>The agent asked for an OpenAI API key, and I added it. The generator then failed with a max tokens error, then an unsupported JSON object format error, and later a 500 error. Switching the model to GPT-4 got posts generating. I then asked for a thread style with two to four numbered, connected posts.</p>',
    },
    {
      id: 'features',
      h: '3. Add features by prompt',
      html: '<p>Each change was another prompt: a Watch demo popup, AI-generated feature images, and a thread history with copy and inline edit. Edits were not saved. I modelled the idea on an existing competing tool.</p>',
    },
    {
      id: 'limit',
      h: '4. Sign-in and the free-plan limit',
      html: '<p>The agent added a Postgres database and Google sign-in, then I reached the starter plan usage limit just after the change, and a note said to open the preview in a private window. The database was temporary, and I could not finish the login test without upgrading. Deploying also needs a paid plan, so I did not publish the app.</p>',
    },
  ],
  done: [
    'Write it in ChatGPT, choose web app',
    'OpenAI key, max tokens, JSON errors',
    'History, sign-in; deploy needs paid',
  ],
  limits: [
    'A deployed, working app. The free plan limit stopped me first.',
    'Cost of the OpenAI calls the generator makes.',
    'Whether the posts perform well on Facebook.',
  ],
  faq: [
    [
      'Can I deploy on the free plan?',
      'Not in my test: deploying needed a paid plan and I had reached the starter limit.',
    ],
    [
      'What errors came up?',
      'Max tokens, an unsupported JSON object format and a 500 error. Switching to GPT-4 helped.',
    ],
    [
      'Do I need to code?',
      'No, but you will troubleshoot by prompting. The agent fixed most issues I described.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=mKsPxDi7uM0">Build a Professional Website in Replit: Step-by-Step Guide</a> (recorded August 2025)',
    'Replit referral link: <a href="https://replit.com/refer/digitalnomadven" rel="sponsored noopener">Replit</a>',
    'Replit: <a href="https://replit.com/">replit.com</a>',
  ],
  related: [
    ['/guides/lovable-vs-base44-vs-replit.html','Lovable vs Base44 vs Replit'],
    ['/guides/google-ai-studio-chat-app.html','Google AI Studio chat app'],
    ['/guides/build-apps-with-ai-coding-agents.html','Build apps with AI coding agents'],
    ['/guides/first-api-request.html','Make your first AI API request'],
    ['/guides/claude-code-for-beginners.html','Claude Code for beginners'],
  ],
  next: ['/guides/lovable-vs-base44-vs-replit.html','Lovable vs Base44 vs Replit'],
  more: 'Price and details: <a href="/tools.html#replit">Replit on the tools page</a>',
  linkFrom: ['/guides/lovable-vs-base44-vs-replit.html'],
  llms: 'An August 2025 build of a Facebook post generator in Replit: paste a ChatGPT-written prompt, add an OpenAI key, fix max-tokens, JSON-format and 500 errors by switching to GPT-4, add a numbered thread format, demo popup, images, history and Google sign-in on a temporary Postgres database. The starter plan limit stopped the work and deploying needs a paid plan.',
};
