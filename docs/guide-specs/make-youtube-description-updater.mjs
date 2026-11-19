export default {
  slug: 'make-youtube-description-updater',
  video: 'qA683UQVDt4',
  type: 'How-to',
  title: 'Make.com YouTube Description Updater',
  short: 'Make.com YouTube description updater',
  description: 'A Make.com scenario that reads video URLs from Airtable, fetches transcripts, writes SEO descriptions with an OpenAI assistant and updates YouTube.',
  hub: 'Automate YouTube descriptions in Make.com: Airtable queue, Dumpling AI transcripts, an OpenAI template assistant and the YouTube update module.',
  watchLabel: 'Follow the Make.com YouTube description automation',
  about: ['Make.com','Airtable','Dumpling AI','OpenAI API','YouTube'],
  card: {
    title: 'Auto-update YouTube descriptions with Make.com',
    steps: [
      ['Queue','Airtable rows with status to-do'],
      ['Write','Transcript, then an assistant fills a template'],
      ['Update','YouTube module, then mark the row done'],
    ],
    note: 'Test on one video first; this edits live descriptions.',
  },
  quick: "Make an Airtable table of video titles, URLs, video IDs, a description template, a description field and a status. A Make.com scenario takes one to-do row, fetches the transcript with Dumpling AI, asks an OpenAI assistant to write a description from the transcript and your template, updates the video through the YouTube module and marks the row done. Schedule it every five minutes. Titles stay unchanged, and an OpenAI credit error needed a $6 top-up to fix.",
  intro: "<p>This is the August 2025 version of a scenario I used to refresh older video descriptions. I promoted a paid done-for-you template, which you do not need: the steps below are enough to build it. It edits live videos, so the safest way to start is on one unimportant video. The Make.com link here is an affiliate link. If you want the same idea with a coding script instead, my later work on <a href=\"/guides/youtube-channel-growth-workflow.html\">the YouTube channel growth workflow</a> covers checks before you publish.</p>\n<p>Prices and plan names change. Confirm them on the vendor page before you buy. Checked November 15, 2026 against the Sources links below where listed.</p>",
  sections: [
    {
      id: 'table',
      h: '1. Set up the Airtable table',
      html: '<p>Create a table with these fields: title, YouTube URL, video ID, template, YouTube description and status (to-do or done). The video ID is the part of the video URL after v=, and the YouTube module needs it. The template field holds a description I know works as a frame, with the structure and timestamp format I want reused.</p>',
    },
    {
      id: 'search',
      h: '2. Take one video at a time',
      html: '<p>In Make.com add an Airtable search records module, choose the base and table and filter with status equals to-do. Set the limit to one so each run handles a single video.</p>',
    },
    {
      id: 'transcript',
      h: '3. Fetch the transcript and write the description',
      html: "<p>Add the Dumpling AI module to get the video’s transcript. Next an OpenAI module messages a custom assistant. Its instructions say to create an SEO-optimized YouTube description from the transcript, following the template. The result included chapter timestamps. I checked a finished description on YouTube and it matched the template’s layout.</p><p>If the OpenAI step errors with “exceeded your current quota”, your API balance is empty. I fixed mine by adding $6 of credit at platform.openai.com, and the balance showed $5.99 afterward.</p>",
    },
    {
      id: 'update',
      h: '4. Update YouTube and close the loop',
      html: '<p>The YouTube update video module takes the video ID from Airtable and the new description from the assistant. The scenario does not change the title. A final Airtable update stores the description and sets status to done so the row is not processed twice. To run automatically, switch the scenario on with a five-minute schedule. If you want to run it by hand, turn the schedule off first.</p><p><strong>A note from this site:</strong> YouTube caps descriptions at 5,000 characters, and a bad template changes every video it touches. Keep a copy of each old description in Airtable before you overwrite it.</p>',
    },
  ],
  done: [
    'Airtable rows with status to-do',
    'Transcript, then an assistant fills a template',
    'YouTube module, then mark the row done',
  ],
  limits: [
    'Whether the generated descriptions improved views or subscribers. I claimed the template was working, but showed no data.',
    "Dumpling AI and OpenAI cost per video beyond the $6 top-up.",
    'A rollback of an old description. Save the previous one yourself first.',
  ],
  faq: [
    ['Does it change video titles?','No. I only updated the description. Titles stayed as they were.'],
    [
      'Why did the OpenAI step fail?',
      "I hit a quota error because the OpenAI balance was empty. Adding $6 of credit fixed it.",
    ],
    [
      'How often does it run?',
      'Every five minutes once the scenario is switched on, taking one to-do video per run.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=qA683UQVDt4">This Make.com Hack Saved Me Hours on YouTube Descriptions</a> (recorded August 2025)',
    'Sign up through my affiliate link: <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
    'Make.com: <a href="https://www.make.com/">make.com</a> (Checked November 15, 2026)',
  ],
  related: [
    ['/guides/youtube-channel-growth-workflow.html','YouTube channel growth workflow'],
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/make-business-automation-examples.html','Make.com business automations'],
    ['/guides/first-api-request.html','Make your first AI API request'],
    ['/guides/ai-content-creation-workflows.html','AI content creation workflow'],
  ],
  next: ['/guides/youtube-channel-growth-workflow.html','YouTube channel growth workflow'],
  more: 'Price and details: <a href="/tools.html#make-com">Make.com on the tools page</a>',
  linkFrom: ['/guides/youtube-channel-growth-workflow.html'],
  llms: "An August 2025 Make.com scenario that updates YouTube descriptions. It reads to-do rows from Airtable one at a time, fetches the transcript with Dumpling AI, asks an OpenAI assistant to write an SEO description from a template, updates the video with the YouTube module and marks the row done, on a five-minute schedule. Titles are unchanged; an OpenAI quota error was fixed with a $6 top-up.",
};
