export default {
  slug: 'make-apify-apollo-leads-sheet',
  video: 'kXw2yntdmo4',
  type: 'Build guide',
  title: 'Make.com Lead Scraper: Apify Apollo Actor to Google Sheets',
  short: 'Make.com Apollo lead scraper',
  description: 'Build a Make.com scenario that runs an Apify Apollo actor on a search URL, takes 100 leads and writes them to a new Google Sheet. Includes the two snags.',
  hub: 'Run an Apify Apollo actor from Make.com, take 100 leads from a search URL and write them to a Google Sheet, including the sheet-name and phone-column snags.',
  watchLabel: 'Follow the Make.com Apify Apollo lead scraper build',
  about: ['Make.com','Apify','Apollo','Google Sheets'],
  card: {
    title: 'Apollo leads into Google Sheets with Make.com',
    steps: [
      ['Search','Copy the Apollo people-search URL'],
      ['Run','Apify actor with a 100-lead limit'],
      ['Write','Map fields, iterate into sheet rows'],
    ],
    note: 'June 2025; the phone column came back wrong.',
  },
  quick: 'Copy the URL of an Apollo people search, then in Make.com create a Google Sheet, run the Apify Apollo actor with a JSON input holding that URL and a limit of 100 leads, get the dataset items, map first name, last name, email, phone, industry, country and city into an array and iterate it into sheet rows. It ran in about 30 seconds. A sheet-name clash had to be fixed first, and the phone column came back wrong, which mattered little because I wanted the emails.',
  intro: "<p>This is a short June 2025 build. I used Apify because Apollo charges a credit for every lead added to its database and had tightened its limits. Scraping a service can break its terms of use, and cold email has legal rules, so check both before you use this. I offered a template on Gumroad, which you do not need to follow the steps. Make.com, Apify and Apollo links are affiliate links. For Apollo basics, see <a href=\"/guides/apollo-apify-b2b-lead-list.html\">the Apollo and Apify lead list guide</a>.</p>\n<p>Prices and plan names change. Confirm them on the vendor page before you buy. Checked November 15, 2026 against the Sources links below where listed.</p>",
  sections: [
    {
      id: 'actor',
      h: '1. Pick the actor and the search',
      html: "<p>On Apify I chose an Apollo actor that can scrape large lists, and Apify gives free monthly credit of up to $5, so small runs may cost nothing. In Apollo, set up your people search with the filters you want and copy the page URL into the actor input.</p>",
    },
    {
      id: 'scenario',
      h: '2. Build the scenario',
      html: '<p>First a Google Sheets module creates a sheet called Apollo leads. Then the Apify run-actor module takes JSON with the search URL and a 100-lead limit. After it finishes, get dataset items using the ID from the previous step, put first name, last name, email, phone, industry, country and city into an array and iterate over it, adding a row per lead.</p>',
    },
    {
      id: 'snags',
      h: '3. The two snags',
      html: '<p>The first run failed because a sheet with that name already existed, so I renamed it, and later left the name empty. After that it ran in about 30 seconds and added all 100 leads with emails. The phone number column came back wrong, so I ignored it.</p>',
    },
    {
      id: 'use',
      h: '4. What to do with the sheet',
      html: '<p>You can feed the emails into an email tool and use ChatGPT for the copy. Only email people you may lawfully contact, and include an unsubscribe route.</p>',
    },
  ],
  done: [
    'Copy the Apollo people-search URL',
    'Apify actor with a 100-lead limit',
    'Map fields, iterate into sheet rows',
  ],
  limits: [
    'Whether scraping Apollo through Apify complies with Apollo’s terms.',
    'Email deliverability or reply rates from the leads.',
    'The exact cost per 1,000 leads. Check the actor’s page.',
  ],
  faq: [
    [
      'Why use Apify instead of Apollo credits?',
      'Apollo charges one credit per lead added, and I had nearly used mine. Apify’s free monthly credit covered a small run.',
    ],
    ['How long did it take?','About 30 seconds for 100 leads.'],
    ['Did every field work?','No. The phone column came back wrong.'],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=kXw2yntdmo4">Generate Qualified Leads 24/7 Without Lifting A Finger!</a> (recorded June 2025)',
    'Affiliate links: <a href="https://www.make.com/en/register?pc=mikeholp" rel="sponsored noopener">Make.com</a> · <a href="https://www.apify.com?fpr=fklok2" rel="sponsored noopener">Apify</a> · <a href="https://get.apollo.io/1mpkcotn2pwa" rel="sponsored noopener">Apollo</a>',
    'Make.com: <a href="https://www.make.com/">make.com</a> (Checked November 15, 2026)',
    'Apify: <a href="https://apify.com/">apify.com</a>',
  ],
  related: [
    ['/guides/apollo-apify-b2b-lead-list.html','Apollo and Apify lead list'],
    ['/guides/apify-agent-skills.html','Apify agent skills setup in Cursor'],
    ['/guides/make-first-automation.html','Filter approved requests with Make and Google Sheets'],
    ['/guides/make-business-automation-examples.html','Make.com business automations'],
    ['/guides/ai-automation-services-small-business.html','AI automation services for small business'],
  ],
  next: ['/guides/apollo-apify-b2b-lead-list.html','Apollo and Apify lead list'],
  more: 'Price and details: <a href="/tools.html#apify">Apify on the tools page</a>',
  linkFrom: ['/guides/apollo-apify-b2b-lead-list.html'],
  llms: 'A June 2025 Make.com build: create a Google Sheet, run an Apify Apollo actor with an Apollo search URL and a 100-lead limit, read the dataset items, map name, email, phone, industry and location, and add one row per lead. A sheet-name clash was fixed and the phone column came back wrong. Scraping terms and cold-email rules were not covered.',
};
