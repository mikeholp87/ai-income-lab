export default {
  slug: 'dextrolab-white-label-automations',
  video: 'QMqe2ubsn0g',
  type: 'Review',
  title: 'DextroLab: A White-Label Client Portal for Make.com and n8n',
  short: 'DextroLab client portal',
  description: 'See DextroLab, a client portal for running Make.com or n8n automations with Stripe usage billing: connections, example pricing and delivering a workflow.',
  hub: 'See how DextroLab gives agency clients a branded portal to run Make.com or n8n automations, with Stripe usage billing and example pricing.',
  watchLabel: 'Follow the DextroLab white-label walkthrough',
  about: ['DextroLab','Make.com','n8n','Stripe'],
  card: {
    title: 'A client portal for your automations',
    steps: [
      ['Connect','Make.com or n8n with an API key'],
      ['Price','Per run, monthly base, setup fee'],
      ['Deliver','Workflow waits for client approval'],
    ],
    note: 'August 2025; prices are examples and may have changed.',
  },
  quick: "DextroLab lets an agency connect Make.com or n8n (and tools like Zapier or Vapi), then give clients a branded portal where they can run and adjust a workflow without logging in to those tools. You add a connection with an API key and base URL, choose a workflow, deliver it to a client for approval and set pricing. My example was $0.05 per run, a $100 monthly base fee and a $250 one-time setup fee, billed through Stripe. A custom-variables step failed with an invalid API key error and I removed it.",
  intro: "<p>This is an August 2025 walkthrough of a tool I used for my own agency clients. The DextroLab link in the video is an affiliate link. The prices are my example, not a recommendation, and the plan I quoted was about £47 a month with a 14-day trial when I recorded it. For how to price and sell automations, see <a href=\"/guides/ai-automation-services-small-business.html\">AI automation services for small business</a>.</p>\n<p>Prices and plan names change. Confirm them on the vendor page before you buy. Checked November 15, 2026 against the Sources links below where listed.</p>",
  sections: [
    {
      id: 'what',
      h: '1. What it does',
      html: '<p>The idea is self-service with controlled access: clients customise their own workflows without technical knowledge or constant support from you, in a white-label experience. You can also set pricing and get paid automatically by usage, monthly base fee, one-time activation and automated invoicing. A setup wizard onboards a new client in minutes.</p>',
    },
    {
      id: 'pricing',
      h: '2. Set example pricing',
      html: "<p>In pricing I set a price per execution of $0.05, a monthly base fee of $100 and a one-time setup fee of $250. Each run charges the client and the base fee bills monthly. Connect Stripe under payment settings to take payments.</p>",
    },
    {
      id: 'connect',
      h: '3. Connect Make.com and deliver a workflow',
      html: '<p>Add a connection with an API key and base URL for Make.com or n8n. I chose a Make.com voice agent workflow and delivered it to one client, where it waits for them to accept. Adding the DextroLab variables node to a scenario returned an unauthorized error, so I took it out, because most clients do not need custom variables. A custom domain and dashboard branding are also available.</p>',
    },
    {
      id: 'portal',
      h: '4. The client portal',
      html: '<p>After a client accepts, they see their portal and can use the workflow without a Make.com or n8n account. I was on the starter plan and could upgrade to the paid plan from the billing page.</p>',
    },
  ],
  done: [
    'Make.com or n8n with an API key',
    'Per run, monthly base, setup fee',
    'Workflow waits for client approval',
  ],
  limits: [
    'Revenue or client results. I had one client set up in the demo.',
    'DextroLab’s current plans and fees.',
    'Why the variables node returned an unauthorized error.',
  ],
  faq: [
    [
      'Which automation tools does it connect to?',
      'Make.com and n8n in the walkthrough, with Zapier and Vapi mentioned.',
    ],
    [
      'How do clients pay?',
      'Through your Stripe account, with a per-run fee, monthly base fee and one-time setup fee that you set.',
    ],
    [
      'Is it free?',
      'Free to start in my walkthrough, with a paid plan of about £47 a month and a 14-day trial then.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=QMqe2ubsn0g">How To Build A White Label Automation Agency With DextroLab</a> (recorded August 2025; the sign-up link is in the video description)',
    'Make.com through my affiliate link: <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a>',
  ],
  related: [
    ['/guides/ai-automation-services-small-business.html','AI automation services for small business'],
    ['/guides/vapi-outbound-ai-caller-make-twilio.html','Vapi outbound AI caller'],
    ['/guides/make-business-automation-examples.html','Make.com business automations'],
    ['/guides/n8n-vs-zapier-vs-make.html','n8n vs Zapier vs Make'],
    ['/guides/self-host-n8n.html','Self-host n8n'],
  ],
  next: ['/guides/ai-automation-services-small-business.html','AI automation services for small business'],
  more: 'More tools: <a href="/tools.html">the tools page</a>',
  linkFrom: ['/guides/ai-automation-services-small-business.html'],
  llms: "An August 2025 walkthrough of DextroLab, a client portal for agencies: connect Make.com or n8n with an API key, deliver a workflow to a client for approval, and bill through Stripe with a per-run fee, monthly base fee and one-time setup fee (example $0.05, $100 and $250). A custom variables node failed with an unauthorized error and was removed.",
};
