export default {
  slug: 'make-ai-agent-tally-email',
  video: 'G_XWYIwjhKY',
  type: 'Case study',
  title: 'Make.com AI Agent: Tally Form Replies by Email',
  short: 'Make.com AI agent',
  description: 'Build a Make.com AI agent that answers Tally form submissions: pick a model, write the prompt, add an email step and see the plan limit I worked around.',
  hub: 'Set up a Make.com AI agent for Tally form replies: model, system prompt, tools, a test run and the plan limit that stopped the email step.',
  watchLabel: 'Follow the Make.com AI agent build',
  about: ['Make.com','Make AI Agents','Tally'],
  card: {
    title: 'A Make.com AI agent that replies to form submissions',
    steps: [
      ['Agent','Pick a model and write a system prompt'],
      ['Trigger','A Tally submission runs the agent'],
      ['Reply','It drafts the email; sending needs plan access'],
    ],
    note: 'AI agents were in beta in this July 2025 walkthrough.',
  },
  quick: 'In Make.com open AI Agents (in beta in July 2025), create an agent, connect a model with your API key, write a system prompt and give it a tool for sending email. Trigger it from a Tally form so each submission runs the agent. My agent correctly spotted who wanted a call and drafted a good reply, but it could not send it because scenario inputs were not available on my plan, so the draft was all I got.',
  intro: '<p>This is a first attempt, not a polished build: I said in my walkthrough that it was my first time setting up a Make.com agent. It is from July 2025 and Make.com’s agent features have changed since, so treat the menu names as a guide. The Make.com link on this page is an affiliate link. If you only need a form-to-email flow, <a href="/guides/make-first-automation.html">a plain Make.com scenario</a> is simpler.</p>',
  sections: [
    {
      id: 'agent',
      h: '1. Create the agent and pick a model',
      html: '<p>Open AI Agents in Make.com (still labelled beta), choose Create an agent and connect a language model. The list included Gemini, ChatGPT and Claude, each connected with your own API key. I chose the customer service template and Claude 3.7, then saved it to create the agent.</p>',
    },
    {
      id: 'prompt',
      h: '2. Write the system prompt',
      html: '<p>My first prompt was one line: you are a professional AI assistant. It was enough to run, but better prompts say who the agent serves, what it may do and what it should do for each answer. Mine ended up deciding whether a person wanted to schedule a free AI strategy call or just join the community. To include a calendar link, add an instruction such as “provide a link to my calendar” and paste the link into the prompt.</p>',
    },
    {
      id: 'tools',
      h: '3. Add a tool for email',
      html: '<p>Agents act through tools. I added a system tool for sending email with a description, “send an email to new Tally submissions”, so the agent knows when to use it. I noted that on my plan I could not map the email fields from scenario inputs, so the agent could not fill them in by itself. Check whether your plan includes that before building around it.</p>',
    },
    {
      id: 'trigger',
      h: '4. Run it from a Tally form',
      html: '<p>The form was the sign-up form for my community. Its key question asked whether the person wanted a free AI strategy call. Each submission also landed in Airtable and started the Make.com scenario, which ran the agent with the answers. The agent returned a reply saying the email could not be sent right now, with a clear draft: it picked up that the person wanted a call and asked for their availability. Later in the video the draft welcomed someone to the community and I added my calendar link through the prompt.</p><p>I also said that a plain scenario that gets the submission, writes a reply with ChatGPT and sends it is easier than an agent. Use an agent when the task needs choices between tools, and a fixed scenario when it does not. For the broader idea, see <a href="/guides/what-is-an-ai-agent.html">what an AI agent is</a>.</p>',
    },
  ],
  done: [
    'Pick a model and write a system prompt',
    'A Tally submission runs the agent',
    'It drafts the email; sending needs plan access',
  ],
  limits: [
    'A sent email from the agent. It drafted the reply but could not send it on my plan.',
    'Agent cost per run. I did not look at credit use.',
    'Whether current Make.com plans still gate agent inputs the same way.',
  ],
  faq: [
    [
      'Do I need a paid Make.com plan for agents?',
      'I said AI agents needed a paid plan and that the free plan only allowed two scenarios. Plans have changed since, so check Make.com’s pricing.',
    ],
    [
      'Which models can a Make.com agent use?',
      'I listed Gemini, ChatGPT and Claude. I used Claude 3.7, connected with an API key.',
    ],
    [
      'Is an agent better than a normal scenario?',
      'Not for this task. A scenario that gets the form answers, writes a reply and sends it is simpler, as this walkthrough said.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=G_XWYIwjhKY">Build Your Own AI Agent in Make.com (Full Tutorial)</a> (recorded July 2025)',
    'Sign up through my affiliate link: <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
    'Make.com: <a href="https://www.make.com/">make.com</a> (Checked November 15, 2026)',
  ],
  related: [
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/what-is-an-ai-agent.html','What is an AI agent?'],
    ['/guides/no-code-ai-agent-builder.html','No-code AI agent builders'],
    ['/guides/ai-agent-workflow.html','AI agent workflow'],
    ['/guides/make-business-automation-examples.html','Make.com business automations'],
  ],
  next: ['/guides/no-code-ai-agent-builder.html','No-code AI agent builder guide'],
  more: 'Price and details: <a href="/tools.html#make-com">Make.com on the tools page</a>',
  linkFrom: ['/guides/no-code-ai-agent-builder.html'],
  llms: 'A July 2025 first attempt at a Make.com AI agent for Tally form replies. The agent used Claude 3.7 with a short system prompt and an email tool, and was triggered by form submissions. It identified who wanted a call and drafted a reply, but could not send it because scenario inputs were unavailable on the plan used.',
};
