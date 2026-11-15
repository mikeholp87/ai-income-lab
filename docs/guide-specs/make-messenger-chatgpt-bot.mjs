export default {
  slug: 'make-messenger-chatgpt-bot',
  video: '8ieDSa8BVH4',
  type: 'How-to',
  title: 'Facebook Messenger Auto-Replies With Make.com and ChatGPT',
  short: 'Messenger bot in Make.com',
  description: 'Build a Make.com scenario that watches Facebook Messenger, drafts a ChatGPT reply and sends it back, plus the Meta developer app and webhook it needs.',
  hub: 'Build a three-module Make.com Messenger bot with ChatGPT replies, set up the Meta developer app and webhook, and see why business verification gates going live.',
  watchLabel: 'Follow the Make.com Messenger bot build',
  about: ['Make.com','Facebook Messenger','Meta for Developers','OpenAI'],
  card: {
    title: 'A ChatGPT Messenger bot in Make.com',
    steps: [
      ['Scenario','Watch messages, ChatGPT, send reply'],
      ['Meta app','Webhook, verify token, page token'],
      ['Go live','Permissions and business verification'],
    ],
    note: 'July 2025; the bot was not shown live because verification was pending.',
  },
  quick: 'In Make.com create a scenario with the Facebook Messenger Watch messages trigger and a webhook with a verify token you choose, add an OpenAI create-a-completion module that writes a reply to the incoming text, and a Messenger send-a-message module that returns it. Then create an app in Meta for Developers, connect your page, generate a page access token and paste in the webhook URL. Going live needs the pages messaging permission and business verification, which was still pending in my July 2025 walkthrough, so the bot was not shown working.',
  intro: '<p>This is a July 2025 build. The hardest part is the Meta developer portal, not Make.com. Replying to customers automatically can go wrong, so test with your own account and read every reply before you go live. The Make.com link is an affiliate link. For the Gmail version of the same idea, see <a href="/guides/make-gmail-ai-auto-reply.html">the Make.com Gmail auto-reply</a>.</p>',
  sections: [
    {
      id: 'scenario',
      h: '1. Build the three-module scenario',
      html: '<p>Create a new scenario, search for Messenger and choose Watch messages. It needs a webhook, which is a listener for new messages, and a verify token that can be any text you make up. Next add OpenAI, create a completion, to write a reply to the message text, and a Messenger send-a-message module that uses the access token and the ChatGPT result as the message. A custom ChatGPT assistant module can replace the plain completion if you want one tightly scoped job: professional replies on Messenger. The Make help center shows a more complex flow with a router.</p>',
    },
    {
      id: 'app',
      h: '2. Create the Meta developer app',
      html: '<p>In Meta for Developers create an app, choose the Other use case and the Business type and link it to your Facebook page. Connect the page and generate the page access token. In the Messenger settings add the webhook URL from Make.com and the verify token, and subscribe to the fields you need. You can also subscribe to fields such as name and email to build a list as messages come in, but check privacy rules first.</p>',
    },
    {
      id: 'webhook',
      h: '3. Fix a failed webhook check',
      html: '<p>The first webhook verification failed. I fixed it by creating a new webhook in Make.com and pasting its URL and verify token into the app again.</p>',
    },
    {
      id: 'live',
      h: '4. Permissions and business verification',
      html: '<p>Before the app can go live you request the pages messaging permissions and verify your business with Meta. My approval was still pending, so I could not show a live reply. Switch the app to live only after that.</p>',
    },
  ],
  done: [
    'Watch messages, ChatGPT, send reply',
    'Webhook, verify token, page token',
    'Permissions and business verification',
  ],
  limits: [
    'A working live reply. I ended before Meta approved the business.',
    'Cost of the OpenAI calls per message.',
    'Replying to comments, which I said I was not sure was possible.',
  ],
  faq: [
    [
      'Why did the webhook check fail?',
      'My first attempt failed. A new webhook in Make.com with its URL and verify token pasted into the app fixed it.',
    ],
    [
      'Can I go live straight away?',
      'No. The app needs the pages messaging permission and business verification first.',
    ],
    ['What is the verify token?','Any text you choose. It must match in Make.com and in the Meta app.'],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=8ieDSa8BVH4">How I Saved Hours Every Day by Automating My Messenger</a> (recorded July 2025)',
    'Sign up through my affiliate link: <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
    'Make.com: <a href="https://www.make.com/">make.com</a> (Checked November 15, 2026)',
  ],
  related: [
    ['/guides/make-gmail-ai-auto-reply.html','Make.com Gmail auto-reply'],
    ['/guides/make-ai-agent-tally-email.html','Make.com AI agent'],
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/no-code-ai-agent-builder.html','No-code AI agent builders'],
    ['/guides/make-business-automation-examples.html','Make.com business automations'],
  ],
  next: ['/guides/make-gmail-ai-auto-reply.html','Make.com Gmail auto-reply'],
  more: 'Price and details: <a href="/tools.html#make-com">Make.com on the tools page</a>',
  linkFrom: ['/guides/make-gmail-ai-auto-reply.html'],
  llms: 'A July 2025 Make.com build for Messenger: a scenario that watches messages through a webhook and verify token, writes a reply with OpenAI and sends it back, plus the Meta developer app, page access token and webhook setup. A failed webhook check was fixed with a new webhook. Going live needs pages messaging permission and business verification, which was pending.',
};
