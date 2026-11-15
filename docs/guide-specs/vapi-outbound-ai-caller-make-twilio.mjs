export default {
  slug: 'vapi-outbound-ai-caller-make-twilio',
  video: '4uNxh9FW6Ho',
  type: 'Build guide',
  title: 'Vapi Outbound AI Caller: Twilio, Make.com and Google Sheets',
  short: 'Vapi outbound caller',
  description: 'Build an outbound Vapi voice agent with an ElevenLabs voice, a Twilio number and Make.com dialing Google Sheets leads, with Google Calendar booking.',
  hub: 'Build an outbound Vapi voice agent with an ElevenLabs voice, a Twilio number and Make.com calling Google Sheets leads, with calendar booking.',
  watchLabel: 'Follow the Vapi outbound voice agent course',
  about: ['Vapi','ElevenLabs','Twilio','Make.com','Google Calendar'],
  card: {
    title: 'An outbound AI caller with Vapi and Make.com',
    steps: [
      ['Assistant','Vapi scheduler template, voice, tools'],
      ['Number','Twilio number imported into Vapi'],
      ['Calls','Make.com reads sheet rows and dials'],
    ],
    note: 'July 2025; Vapi’s own outbound campaign feature did not work for me.',
  },
  quick: 'Create a Vapi assistant from the appointment scheduler template with OpenAI as the model, pick an ElevenLabs professional clone for the voice and add the book-appointment and check-availability tools. Buy a Twilio number and import it into Vapi with the account SID and auth token. Then build a Make.com scenario that finds unsent rows in Google Sheets, loops over them, creates a Vapi outbound call, marks the row called and waits between calls. My live test call to my own phone booked a calendar slot. Vapi’s outbound campaign feature did not work for me, so Make.com did the dialing.',
  intro: '<p>This is a long July 2025 course, summarised. Cold calling is regulated: you need consent and must follow your country’s rules on automated and recorded calls, and this walkthrough does not cover them. Call only people who agreed. Vapi bills per minute plus model and voice costs, so check the tools page. For a shorter Vapi tutorial, see <a href="/guides/vapi-voice-agent-tutorial.html">the Vapi voice agent tutorial</a>.</p>',
  sections: [
    {
      id: 'assistant',
      h: '1. Create the assistant',
      html: '<p>In Vapi start from the appointment scheduler template. I set OpenAI as the model and the first message mode to wait for the user to speak, because the call begins when the person answers. I picked an ElevenLabs professional voice clone, set Deepgram or OpenAI as the transcriber and added tools to book appointments and check availability.</p>',
    },
    {
      id: 'twilio',
      h: '2. Add a phone number',
      html: '<p>Buy a Twilio number and import it into Vapi with your Twilio account SID and auth token. Outbound calls leave from this number.</p>',
    },
    {
      id: 'make',
      h: '3. Dial leads from Make.com',
      html: '<p>The Make.com scenario searches Google Sheets for rows not yet called, aggregates and iterates them, and creates a Vapi outbound call with the lead’s number. It then updates the called field in the sheet, and a sleep module spaces the calls. Instead of the sleep, you can run the scenario on a schedule, such as every 15 minutes. I built it this way because Vapi’s own outbound campaign feature did not work for me; I was not sure whether a paid plan was required.</p>',
    },
    {
      id: 'calendar',
      h: '4. Calendar booking and a live test',
      html: '<p>I created Google Calendar tools in Vapi and connected the calendar under settings and integrations. In a live call to my own phone, the agent introduced itself, offered a free consultation and booked a slot for the next morning, then said it had emailed a confirmation. Test with your own number first, and set a clear opt-out line in the script.</p>',
    },
  ],
  done: [
    'Vapi scheduler template, voice, tools',
    'Twilio number imported into Vapi',
    'Make.com reads sheet rows and dials',
  ],
  limits: [
    'Call consent, do-not-call rules and call-walkthrough laws. They were not covered.',
    'Cost per call, which depends on Vapi, Twilio, model and voice usage.',
    'Reliability across many calls. I tested one.',
  ],
  faq: [
    [
      'Why did you use Make.com to dial?',
      'Vapi’s outbound campaign feature did not work for me, so Make.com created each call from a Google Sheet.',
    ],
    [
      'Do I need a Twilio number?',
      'Yes, for outbound calls in this setup: buy one in Twilio and import it into Vapi.',
    ],
    ['Can I call anyone?','No. Only people who consented, and within the law where you and they are.'],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=4uNxh9FW6Ho">Create a Realistic AI Voice Agent in Minutes (No Coding)</a> (recorded July 2025)',
    'Affiliate links: <a href="https://vapi.ai/?aff=mike9c" rel="sponsored noopener">Vapi</a> · <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
  ],
  related: [
    ['/guides/vapi-voice-agent-tutorial.html','Vapi voice agent tutorial'],
    ['/guides/whatsapp-ai-voice-clone-make.html','WhatsApp AI voice clone in Make.com'],
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/ai-automation-services-small-business.html','AI automation services for small business'],
    ['/guides/what-is-an-ai-agent.html','What is an AI agent?'],
  ],
  next: ['/guides/whatsapp-ai-voice-clone-make.html','WhatsApp AI voice clone in Make.com'],
  more: 'Price and details: <a href="/tools.html#vapi">Vapi on the tools page</a>',
  linkFrom: ['/guides/vapi-voice-agent-tutorial.html'],
  llms: "A July 2025 course on an outbound Vapi voice agent: an appointment-scheduler assistant with OpenAI and an ElevenLabs voice clone, a Twilio number imported into Vapi, and a Make.com scenario that dials Google Sheets leads, marks rows called and books Google Calendar slots. Vapi's own outbound campaign feature did not work. Consent and call laws were not covered.",
};
