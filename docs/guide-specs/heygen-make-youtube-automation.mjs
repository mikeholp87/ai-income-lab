export default {
  slug: 'heygen-make-youtube-automation',
  video: 'QMcaBMjZSMA',
  type: 'How-to',
  title: 'HeyGen and Make.com: Script, Render and Upload to YouTube',
  short: 'HeyGen and Make.com YouTube automation',
  description: 'Build two Make.com scenarios: an OpenAI assistant scripts, HeyGen renders, and finished videos upload to YouTube as unlisted. Includes the error fix.',
  hub: 'Connect HeyGen, an OpenAI script assistant and YouTube in two Make.com scenarios, and fix the resolution error that blocked my upload.',
  watchLabel: 'Follow the HeyGen and Make.com YouTube automation',
  about: ['HeyGen','Make.com','OpenAI Assistants','YouTube'],
  card: {
    title: 'HeyGen video to YouTube, automated in Make.com',
    steps: [
      ['Script','OpenAI assistant writes from a topic'],
      ['Render','HeyGen makes the avatar video'],
      ['Upload','Second scenario posts it unlisted'],
    ],
    note: 'Videos rendered at 720p in this July 2025 test.',
  },
  quick: 'Use two Make.com scenarios. The first sends a topic to an OpenAI assistant that writes the script, then passes it to HeyGen with your avatar ID, cloned voice and a friendly emotion. The second watches for new HeyGen videos, downloads the file and uploads it to YouTube as unlisted. In my July 2025 test the videos came out at 720p, and a “resolution not allowed” error went away only after I hardcoded the video ID.',
  intro: "<p>This is a short build from a July 2025 walkthrough, written up so you can follow the steps without the video open. It uses a HeyGen avatar and voice, an OpenAI assistant and Make.com. HeyGen and Make.com links on this page are affiliate links. If you have not made an avatar yet, <a href=\"/guides/heygen-elevenlabs-make-course.html\">the longer HeyGen course notes</a> cover footage, consent and voices first.</p>\n<p class=\"cluster-router\"><strong>Which faceless-video path?</strong> <a href=\"/guides/syllaby-faceless-video-first-test.html\">Syllaby</a> for the fastest first publish; <a href=\"/guides/make-faceless-video-json2video.html\">Make + JSON2Video</a> for spreadsheet-driven batches; <a href=\"/guides/heygen-elevenlabs-make-course.html\">HeyGen + ElevenLabs</a> when you want an avatar and voice clone (and to see the API plan wall).</p>\n<p>Prices and plan names change. Confirm them on the vendor page before you buy. Checked November 15, 2026 against the Sources links below where listed.</p>",
  sections: [
    {
      id: 'avatar-voice',
      h: '1. Create the avatar and the voice',
      html: "<p>I recommended the Creator plan at around $29 a month, which this walkthrough said allows unlimited videos with a custom avatar. It had one avatar slot and let me delete avatars up to five times a month. To make an avatar, choose Create new avatar, then hyperrealistic avatar, and upload about two minutes of video. Mine used footage from one of my YouTube videos and looked close to me.</p><p>For the voice, choose Create a new voice, pick instant voice cloning and upload about two minutes of audio. Set it to multilingual if you want other languages: this walkthrough had it speaking Thai from the language list. You can also connect an ElevenLabs key if you already have a voice there. Then open Edit look on the avatar, choose the cloned voice and save.</p>",
    },
    {
      id: 'assistant',
      h: '2. Set up the script assistant',
      html: '<p>On platform.openai.com I created an assistant for HeyGen scripts. Its instructions describe how to write a script for the avatar, and it has file search turned on over transcripts of my past videos, so the scripts sound like me. Copy the assistant ID because Make.com needs it.</p>',
    },
    {
      id: 'scenario-one',
      h: '3. Build the script-to-video scenario',
      html: '<p>The first scenario has two modules. The first messages the assistant with a topic. The second is HeyGen’s create avatar video module: pick the avatar ID, the normal style, your cloned voice and a friendly emotion, pass in the assistant’s script, turn test mode off and run it. HeyGen rendered the video in a few minutes at 720p, which I took to be the limit of my plan.</p>',
    },
    {
      id: 'scenario-two',
      h: '4. Upload finished videos to YouTube',
      html: '<p>The second scenario watches for new HeyGen videos. It downloads the file with an HTTP request and uploads it to your channel as unlisted, so you can add a title and description before making it public. It first failed with a resolution-not-allowed error. Hardcoding the video ID in the upload step got it through, the video appeared unlisted on the channel and I filled in the metadata by hand.</p><p>I suggested connecting an Airtable table of topics next, so the scenario would pull a topic every day. That was an idea, not something I built in this walkthrough. For a Make.com version that already includes Airtable, see <a href="/guides/heygen-airtable-facebook-content-machine.html">the Airtable and Facebook content machine</a>.</p>',
    },
  ],
  done: [
    'OpenAI assistant writes from a topic',
    'HeyGen makes the avatar video',
    'Second scenario posts it unlisted',
  ],
  limits: [
    'Whether the resolution error needs the hardcoded video ID on every run, or came from my plan.',
    'The Airtable topic queue. It was proposed, not built.',
    'Video titles, descriptions and thumbnails, which were still added by hand.',
  ],
  faq: [
    [
      'How long should the footage for the avatar be?',
      'About two minutes of video for a hyperrealistic avatar, per the HeyGen upload step in my walkthrough.',
    ],
    [
      'Why did the upload fail with a resolution error?',
      'I hit a “resolution not allowed” error in the second scenario. It went through after the video ID was hardcoded. I did not find the underlying cause.',
    ],
    [
      'Is the YouTube upload public?',
      'No. The scenario uploaded as unlisted so you can check the video and add details before publishing.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=QMcaBMjZSMA">How to Scale Content with HeyGen + Make.com Automation</a> (recorded July 2025)',
    'Sign up through my affiliate links: <a href="https://www.heygen.com/?sid=rewardful&amp;via=mike-holp" rel="sponsored noopener">HeyGen</a> and <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
    'HeyGen pricing: <a href="https://www.heygen.com/pricing">heygen.com/pricing</a> (Checked November 15, 2026)',
  ],
  related: [
    ['/guides/heygen-elevenlabs-make-course.html','HeyGen, ElevenLabs and Make.com course notes'],
    ['/guides/heygen-airtable-facebook-content-machine.html','Airtable and Facebook content machine'],
    ['/guides/heygen-ai-avatar-tutorial.html','HeyGen AI avatar tutorial'],
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/youtube-channel-growth-workflow.html','YouTube channel growth workflow'],
  ],
  next: [
    '/guides/heygen-airtable-facebook-content-machine.html',
    'HeyGen, Airtable and Facebook content machine',
  ],
  more: 'Price and details: <a href="/tools.html#heygen">HeyGen on the tools page</a>',
  linkFrom: [],
  llms: 'A July 2025 build with two Make.com scenarios. The first sends a topic to an OpenAI assistant for a script and passes it to HeyGen with an avatar ID, cloned voice and friendly emotion; videos rendered at 720p. The second watches for new HeyGen videos, downloads the file and uploads it to YouTube as unlisted. A resolution-not-allowed error was bypassed by hardcoding the video ID.',
};
