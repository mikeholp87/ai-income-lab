export default {
  slug: 'hermes-youtube-to-linkedin-cron',
  video: 'dVvazfQHhW4',
  type: 'How-to',
  title: 'Hermes Agent Cron Job: YouTube Video to LinkedIn Posts',
  short: 'Hermes YouTube to LinkedIn',
  description: 'Use Hermes Agent and OpenCode to turn your newest YouTube video into LinkedIn posts and a newsletter with a Python script, then run it as a daily cron job.',
  hub: 'Build a Python script with Hermes Agent and OpenCode that turns your newest video into LinkedIn posts and a newsletter, then run it as a daily cron job.',
  watchLabel: 'Follow the Hermes YouTube to LinkedIn cron job build',
  about: ['Hermes Agent','OpenCode','OpenAI API','Python','LinkedIn'],
  card: {
    title: 'YouTube to LinkedIn, run daily by Hermes',
    steps: [
      ['Script','Find the newest video, write two posts'],
      ['Fix','Move to OpenCode and the OpenAI API'],
      ['Schedule','Daily cron job, dated output files'],
    ],
    note: 'May 2026; posting is still done by hand.',
  },
  quick: 'Give Hermes Agent your channel URL and ID and ask for a Python script that finds your latest video and writes a LinkedIn post and a newsletter from it. The first version pulled the latest video without a YouTube API key but the writing was weak, so I moved the edits to OpenCode and the OpenAI API, fixed an unsupported max_tokens error by using max_completion_tokens, produced two post versions (reach and engagement) and a newsletter of at least 1,500 words, added dates to the file names and created a daily cron job in Hermes. I still edit and post by hand.',
  intro: '<p>This is a May 2026 build. It saves drafting time, but the output needs editing, and I post to LinkedIn myself. Hermes is installed with a one-line curl command and its setup, which I covered in another video. For the desktop app, see <a href="/guides/hermes-desktop.html">the Hermes Desktop guide</a>. The OpenCode link on this page is an affiliate link.</p>',
  sections: [
    {
      id: 'script',
      h: '1. Ask Hermes for the script',
      html: '<p>In a project folder named YouTube to LinkedIn I ran Hermes and asked for a script that finds my latest YouTube video and generates a detailed LinkedIn post and a newsletter. It asked for the channel URL and channel ID, then wrote a Python file with a get-latest-video function that needed no YouTube API key.</p>',
    },
    {
      id: 'keys',
      h: '2. Add an AI model and fix errors',
      html: '<p>The script needs a model to write the copy. I first tried a Google AI Studio key and then put an OpenAI API key in the environment file. Hermes’s drafts read poorly, so I moved the edits to OpenCode. An unsupported max_tokens error went away when I switched to max_completion_tokens.</p>',
    },
    {
      id: 'outputs',
      h: '3. Two post versions and a newsletter',
      html: '<p>The script writes version A for reach and version B for engagement, plus a newsletter. I required at least 1,500 words for the newsletter. Dates are added to the file names so each run keeps its own files and I build a running archive.</p>',
    },
    {
      id: 'cron',
      h: '4. Schedule it',
      html: '<p>In Hermes I created a daily cron job for the YouTube-to-LinkedIn task, which is easy in the desktop app. Each day it should write new dated files for me to review. The first newsletter needed formatting fixes, and I add my video at the bottom before sending it to my 1,500 subscribers.</p>',
    },
  ],
  done: [
    'Find the newest video, write two posts',
    'Move to OpenCode and the OpenAI API',
    'Daily cron job, dated output files',
  ],
  limits: [
    'Posting. LinkedIn publishing is manual.',
    'Whether the generated posts perform better than my own writing.',
    'OpenAI cost per run.',
  ],
  faq: [
    ['Does it post to LinkedIn for me?','No. It writes files, and I copy them into LinkedIn myself.'],
    [
      'Why switch to OpenCode?',
      'Hermes’s first drafts read poorly, so I made the edits in OpenCode with the OpenAI API.',
    ],
    [
      'What was the max_tokens error?',
      'The model rejected max_tokens. Using max_completion_tokens fixed it.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=dVvazfQHhW4">Hermes Agent Writes Your LinkedIn Posts (So You Don’t Have To)</a> (recorded May 2026)',
    'OpenCode through my affiliate link: <a href="https://opencode.ai/go?ref=Y0V64DGPZN" rel="sponsored noopener">OpenCode</a>',
  ],
  related: [
    ['/guides/hermes-desktop.html','Hermes Desktop'],
    ['/guides/hermes-agent-supermemory.html','Hermes Agent memory with Supermemory'],
    ['/guides/hermes-backlink-outreach-pipeline.html','Hermes backlink outreach pipeline'],
    ['/guides/ai-content-creation-workflows.html','AI content creation workflow'],
    ['/guides/youtube-channel-growth-workflow.html','YouTube channel growth workflow'],
  ],
  next: ['/guides/hermes-desktop.html','Hermes Desktop'],
  more: 'Price and details: <a href="/tools.html#opencode">OpenCode on the tools page</a>',
  linkFrom: ['/guides/hermes-agent-supermemory.html'],
  llms: 'A May 2026 build: ask Hermes Agent for a Python script that finds the newest YouTube video and writes two LinkedIn post versions and a newsletter of at least 1,500 words, move the edits to OpenCode and the OpenAI API, fix a max_tokens error, date-stamp the outputs and run it as a daily Hermes cron job. Posting is manual.',
};
