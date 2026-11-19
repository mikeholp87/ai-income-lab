export default {
  slug: 'whatsapp-ai-voice-clone-make',
  video: '1TPm7B5oStw',
  type: 'How-to',
  title: 'WhatsApp AI Voice Clone in Make.com: Texts and Voice Memos',
  short: 'WhatsApp AI voice clone',
  description: 'Answer WhatsApp texts and voice memos in Make.com with an OpenAI assistant trained on YouTube transcripts and replying in an ElevenLabs voice clone.',
  hub: 'Answer WhatsApp texts and voice memos in Make.com with an OpenAI assistant trained on transcripts and an ElevenLabs voice clone.',
  watchLabel: 'Follow the WhatsApp AI voice clone course',
  about: ['Make.com','WhatsApp Business Cloud','OpenAI Assistants','ElevenLabs','Dumpling AI'],
  card: {
    title: 'A WhatsApp assistant that replies in your cloned voice',
    steps: [
      ['Route','Router splits texts and voice memos'],
      ['Answer','OpenAI assistant with a transcript knowledge base'],
      ['Speak','ElevenLabs voice sent back as audio'],
    ],
    note: 'June 2025; tested with a hardcoded test number.',
  },
  quick: 'In Make.com add a WhatsApp Business Cloud watch-events trigger and a router with filters for text and audio messages. Create an OpenAI assistant with a short role prompt and a vector store of your YouTube transcripts, built by a second scenario that reads links from Google Sheets, fetches transcripts with Dumpling AI, saves them to Google Drive and uploads them. Make an instant ElevenLabs clone, generate speech with the multilingual model and send it as a WhatsApp audio message. In my test the router filters went missing and had to be re-added, and the number was hardcoded.',
  intro: '<p>This is a 40-minute June 2025 course, summarised. It clones a voice, so only clone your own, and tell people they are talking to an assistant. Replies to customers should be checked before you go live. The Make.com link is an affiliate link. For the Messenger version, see <a href="/guides/make-messenger-chatgpt-bot.html">the Messenger bot guide</a>.</p>',
  sections: [
    {
      id: 'trigger',
      h: '1. Trigger and router',
      html: '<p>Add WhatsApp Business Cloud and choose watch events. It needs the permanent token and business account ID from Meta for Developers, and then generates a webhook that listens for new messages. A router follows, with one filter for text messages and one for audio messages.</p>',
    },
    {
      id: 'assistant',
      h: '2. The assistant and its knowledge base',
      html: '<p>On the OpenAI platform I created an assistant with a short role prompt and attached a vector store as its knowledge base. A second scenario fills it: it reads YouTube links from Google Sheets, pulls transcripts with Dumpling AI, saves them to Google Drive and uploads the files to the vector store, so answers draw on my own videos.</p>',
    },
    {
      id: 'voice',
      h: '3. Reply in a cloned voice',
      html: '<p>In ElevenLabs I created an instant voice clone and used it in a speech synthesis module with the multilingual model. Make.com then uploads the audio to WhatsApp Business Cloud and sends it as an audio message. For incoming voice memos, an extra step downloads the audio and translates it with Whisper so the assistant can read it. Generating a long answer can take a few minutes. An instant clone sounds like me, and a paid professional clone would be closer.</p>',
    },
    {
      id: 'meta',
      h: '4. Meta developer setup and testing',
      html: '<p>Create a Meta developer app, add WhatsApp, copy the access token and the WhatsApp business account ID into Make.com, and subscribe the webhook to messages. You need a test number and, for real use, a verified business. In testing, I sent real messages from my phone and the reply came back as a voice memo about moving to Thailand. Midway through debugging the router’s filter conditions disappeared and I had to add them again.</p>',
    },
  ],
  done: [
    'Router splits texts and voice memos',
    'OpenAI assistant with a transcript knowledge base',
    'ElevenLabs voice sent back as audio',
  ],
  limits: [
    'Production use. I tested with a hardcoded test number and no verified business.',
    'Quality of answers on topics outside the transcripts.',
    'Cost of ElevenLabs and OpenAI per message.',
  ],
  faq: [
    [
      'Which modules handle voice memos?',
      'A download step plus Whisper translation turns the memo into text before the assistant answers.',
    ],
    [
      'What is the knowledge base?',
      'A vector store filled with transcripts of my YouTube videos by a second scenario.',
    ],
    ['Does it work for everyone?','Not yet. It was tested with one hardcoded test number.'],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=1TPm7B5oStw">Build Your WhatsApp AI Voice Agent in 40 Minutes</a> (recorded June 2025)',
    'Make.com through my affiliate link: <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
    'Make.com: <a href="https://www.make.com/">make.com</a> (Checked November 15, 2026)',
  ],
  related: [
    ['/guides/vapi-outbound-ai-caller-make-twilio.html','Vapi outbound AI caller'],
    ['/guides/make-messenger-chatgpt-bot.html','Make.com Messenger bot'],
    ['/guides/heygen-elevenlabs-make-course.html','HeyGen, ElevenLabs and Make.com course'],
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/what-is-an-ai-agent.html','What is an AI agent?'],
  ],
  next: ['/guides/make-messenger-chatgpt-bot.html','Make.com Messenger bot'],
  more: 'Price and details: <a href="/tools.html#make-com">Make.com on the tools page</a>',
  linkFrom: ['/guides/make-messenger-chatgpt-bot.html'],
  llms: 'A June 2025 Make.com course: answer WhatsApp texts and voice memos with an OpenAI assistant trained on YouTube transcripts and reply with an ElevenLabs voice clone. A router filters text and audio, a second scenario builds the knowledge base from Google Sheets, Dumpling AI and Google Drive, and Meta for Developers supplies the WhatsApp token. Tested with a hardcoded test number.',
};
