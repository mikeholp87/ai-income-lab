export default {
  slug: 'make-gmail-ai-auto-reply',
  video: 'oDAKXkIyOHE',
  type: 'How-to',
  title: 'Make.com Gmail Auto-Reply: Watch, Write and Send With AI',
  short: 'Make.com Gmail auto-reply',
  description: 'Build a Make.com scenario that watches Gmail for unread email, has OpenAI write a reply, waits, then sends it. Test the draft before linking the send step.',
  hub: 'Watch a Gmail inbox in Make.com, have OpenAI draft a reply, add a delay and send it, with the prompt layout and a test-before-sending tip.',
  watchLabel: 'Follow the Make.com Gmail auto-reply build',
  about: ['Make.com','Gmail','OpenAI API'],
  card: {
    title: 'An AI email auto-reply in Make.com',
    steps: [
      ['Watch','Unread emails in the inbox'],
      ['Write','OpenAI drafts a reply from the message'],
      ['Send','After a delay, with a copy in Sent'],
    ],
    note: 'Unlink the send step and read the draft first.',
  },
  quick: 'In Make.com add a Gmail watch-emails module for unread inbox messages, then an OpenAI create-a-completion module with four messages: a system role, a task description, a reply format and the email text. Add a sleep step so replies are not instant and a send-email module that replies to the sender and saves a copy in Sent. Run it unlinked from the send step first, read the draft, then connect it.',
  intro: '<p>This follows a July 2025 build that took about five minutes to assemble. It replies to real people, so the most important part is testing before the send step is connected. I also mentioned a paid template, which you do not need to follow along. The Make.com link below is an affiliate link. For a simpler first scenario, try <a href="/guides/make-first-automation.html">a Make.com filter and sheet</a>.</p>',
  sections: [
    {
      id: 'watch',
      h: '1. Watch the inbox',
      html: '<p>Right-click the canvas, add a module and choose Email, then Watch emails. Connect Gmail with the restricted Google connection, or use IMAP for another provider. I selected the Inbox folder and unread emails only. You can also limit it to one sender address, which is a good way to start.</p>',
    },
    {
      id: 'write',
      h: '2. Write the reply with OpenAI',
      html: '<p>Add the OpenAI create a completion module and connect it with an API key from platform.openai.com. I used a GPT-4 family model. The four messages I used were: a developer/system message saying it is an email assistant; a user message describing the inbox and the task, a professional and succinct reply; an assistant message with the reply format, filled with the sender’s name; and a user message holding the email’s text content.</p><p>Use the plain text of the email, not the HTML, so tags do not confuse the model. I also told it to sign off with only my first and last name, because it kept inventing empty company details. One limit: a reply chain pastes the whole thread in, including my earlier messages, and I found no way around that.</p>',
    },
    {
      id: 'send',
      h: '3. Delay, then send',
      html: '<p>Add Tools, then Sleep. I used a short wait, about 90 seconds, so replies do not look instant, and suggested a longer one. The maximum I could enter was 300. Then add Send an email, tick Save message after sending and pick the Sent folder so you keep a record. Send to the original sender’s address, set the subject to “Re:” plus the original subject and use the model’s message content as plain text. Skip attachments, because repeated attachments can look like spam.</p>',
    },
    {
      id: 'test',
      h: '4. Test before you send anything',
      html: '<p>When I ran it, the watch module stopped on the latest message, so I chose a specific email from the list to start from. I unlinked the send step and read the model’s draft first. The reply to a hotel marketing contact was polite and sensible, and later a vacation auto-reply came back as another automated reply. Because this automation can write to real contacts, review several drafts before you link the send step, and consider sending to yourself first.</p>',
    },
  ],
  done: [
    'Unread emails in the inbox',
    'OpenAI drafts a reply from the message',
    'After a delay, with a copy in Sent',
  ],
  limits: [
    'How often the replies were wrong or off tone. I read a few drafts but did not measure it.',
    'Gmail’s own sending limits and spam rules for automated replies.',
    'A system that avoids replying to automated senders or to the same person twice.',
  ],
  faq: [
    [
      'Can it reply to every email?',
      'It can, but I limited it to unread inbox messages and recommend a single sender at first. Replying to everything risks replying to newsletters and automated mail.',
    ],
    [
      'Why add a sleep step?',
      'So replies are not instant. The build used about 90 seconds, and I suggested a longer wait; the module capped the value I could enter at 300.',
    ],
    [
      'Which OpenAI model does it use?',
      'A GPT-4 family model in my walkthrough. Pick a current model in the module.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=oDAKXkIyOHE">This Make.com Automation Saved Me 10 Hours a Week on Emails</a> (recorded July 2025)',
    'Sign up through my affiliate link: <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
    'Make.com: <a href="https://www.make.com/">make.com</a> (Checked November 15, 2026)',
  ],
  related: [
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/make-business-automation-examples.html','Make.com business automations'],
    ['/guides/first-api-request.html','Make your first AI API request'],
    ['/guides/ai-automation-services-small-business.html','AI automation services for small business'],
    ['/guides/ai-agent-workflow.html','AI agent workflow'],
  ],
  next: [
    '/guides/make-business-automation-examples.html',
    'Make.com Business Automations: Email, Skool, Leads',
  ],
  more: 'Price and details: <a href="/tools.html#make-com">Make.com on the tools page</a>',
  linkFrom: ['/guides/make-business-automation-examples.html'],
  llms: 'A July 2025 Make.com build for AI email replies. A Gmail module watches unread inbox messages, an OpenAI completion with four messages writes a reply from the email text, a sleep step adds a delay and a send-email module replies and saves a copy to Sent. I advises unlinking the send step and reading drafts before sending to real contacts.',
};
