export default {
  slug: 'hostinger-n8n-vps-setup',
  video: 'wZ76glbPIPc',
  type: 'How-to',
  title: 'Self-Host n8n on Hostinger: KVM and First Import',
  short: 'n8n on Hostinger',
  description: 'Set up n8n on a Hostinger VPS: pick a KVM plan, choose the n8n template with 100 workflows, open n8n, claim the license key and import a template.',
  hub: 'Set up n8n on a Hostinger VPS: compare KVM plans, choose the n8n template, open it from the panel, claim the free key and import a template.',
  watchLabel: 'Follow the n8n on Hostinger VPS setup',
  about: ['Hostinger','n8n'],
  card: {
    title: 'n8n on a Hostinger VPS, step by step',
    steps: [
      ['Plan','KVM plan, one month, nearest location'],
      ['Template','n8n with 100 workflows'],
      ['Open','Manage App, owner account, import'],
    ],
    note: 'October 2025 prices; backups and hardening not covered.',
  },
  quick: "On Hostinger choose a KVM plan (KVM 1 was $5 a month with one vCPU, 4 GB of RAM and 50 GB of NVMe disk; the popular plan was $6.50), pick a one-month term and the nearest server location, and select the n8n operating system template. With the 100 bundled workflows my first month cost $10.69. Set a root password, keep the free malware scanner on, open n8n with Manage App, create the owner account, claim the free license key and import a template.",
  intro: '<p>This is an October 2025 walkthrough. Prices change and shown deals expire, so check Hostinger’s page. The Hostinger link on this site may pay me a commission. The video covers the setup, not backups, updates, HTTPS or hardening, so read <a href="/guides/self-host-n8n.html">the self-host n8n guide</a> before you put real data on the server.</p>',
  sections: [
    {
      id: 'plan',
      h: '1. Choose the plan and term',
      html: "<p>KVM 1 gave one vCPU core, 4 GB of RAM, 50 GB of NVMe disk and 4 TB of bandwidth. The popular plan was $6.50 a month. I compared that with n8n’s own cloud at about $24 a month, and noted n8n has a free trial of about two weeks. I chose the popular plan and a one-month term to test it. Daily auto backup was optional and I did not add it.</p>",
    },
    {
      id: 'location',
      h: '2. Location and template',
      html: "<p>I picked Malaysia for lower latency from Thailand, about 49 milliseconds. For the operating system, choose n8n. There is also an n8n queue mode, Docker and other options such as Ollama and MCP servers. I took the n8n option with 100 done-for-you workflows. Payment was $10.69 for the first month through PayPal.</p>",
    },
    {
      id: 'panel',
      h: '3. Finish the VPS setup',
      html: '<p>Click Get started to open the hPanel dashboard, set a root password and choose whether to switch on the free malware scanner. I kept it on. The VPS ran Ubuntu 24.04. Use Manage App to open n8n.</p>',
    },
    {
      id: 'n8n',
      h: '4. First steps in n8n',
      html: '<p>Create the owner account and claim the free license key. The bundled workflows appear as templates you can preview. n8n’s site also lists thousands of templates; choose Import template to drop one into your own server. Most need credentials, such as WhatsApp API access, before they run. I imported one, saved it and left the credentials for later.</p>',
    },
  ],
  done: [
    'KVM plan, one month, nearest location',
    'n8n with 100 workflows',
    'Manage App, owner account, import',
  ],
  limits: [
    'Backups, updates, HTTPS and hardening of the server.',
    'Renewal pricing after the first month.',
    'Whether the 100 bundled workflows run without changes.',
  ],
  faq: [
    [
      'How much did the first month cost?',
      "$10.69 with the n8n template and 100 workflows, in my test. Prices change.",
    ],
    ['Where did I host it?','A Malaysia data center, for about 49 ms latency from Thailand.'],
    [
      'Is it secure?',
      'I did not cover hardening or backups. I only turned on the free malware scanner.',
    ],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=wZ76glbPIPc">Self Host N8N On Hostinger In 2026 - Here’s Why</a> (recorded October 2025)',
    'Hostinger: <a href="https://www.hostinger.com?REFERRALCODE=5XNDIGITACZ9" rel="sponsored noopener">hostinger.com</a>',
    'Hostinger VPS: <a href="https://www.hostinger.com/vps-hosting">hostinger.com/vps-hosting</a> (Checked November 15, 2026)',
    'n8n hosting docs: <a href="https://docs.n8n.io/deploy/host-n8n/">docs.n8n.io/deploy/host-n8n</a>',
  ],
  related: [
    ['/guides/self-host-n8n.html','Self-host n8n'],
    ['/guides/what-is-n8n-used-for.html','What is n8n used for?'],
    ['/guides/n8n-alternatives-open-source.html','n8n alternatives, open source'],
    ['/guides/n8n-vs-zapier-vs-make.html','n8n vs Zapier vs Make'],
    ['/guides/install-openclaw.html','Install OpenClaw'],
  ],
  next: ['/guides/self-host-n8n.html','Self-host n8n'],
  more: 'Price and details: <a href="/tools.html#hostinger">Hostinger on the tools page</a>',
  linkFrom: ['/guides/self-host-n8n.html'],
  llms: "An October 2025 walkthrough of n8n on a Hostinger VPS: choose a KVM plan (KVM 1 was $5 a month), a one-month term, a nearby server location and the n8n template with 100 workflows ($10.69 first month), set a root password, open n8n with Manage App, claim the free license key and import a template. Backups and hardening were not covered.",
};
