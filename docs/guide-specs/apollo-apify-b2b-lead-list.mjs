export default {
  slug: 'apollo-apify-b2b-lead-list',
  video: 'YCjvrNI1pa4',
  type: 'How-to',
  title: 'Apollo B2B Lead Lists and the Apify Apollo Scraper',
  short: 'Apollo lead lists with Apify',
  description: 'Filter B2B leads in Apollo, save lists, review a cold email sequence, and see how an Apify actor exports Apollo searches to CSV. Includes the plan limits.',
  hub: 'Filter people in Apollo, save lists 25 at a time, export leads to CSV with an Apify actor, and review an email sequence and deliverability settings.',
  watchLabel: 'Follow the Apollo and Apify lead list tutorial',
  about: ['Apollo','Apify','Make.com','ChatGPT'],
  card: {
    title: 'Build a B2B lead list in Apollo, export with Apify',
    steps: [
      ['Filter','Verified emails, titles, location, size'],
      ['Save','Lists, 25 contacts at a time on free'],
      ['Export','Apify actor, about 1.20 USD per 1,000 leads'],
    ],
    note: 'Check cold-email laws and Apollo’s terms first.',
  },
  quick: "In Apollo’s free plan open People, filter to verified emails, founder and CEO titles, US companies, an industry, a keyword and one to ten employees, which narrowed about 2 million people to about 3,700. Save contacts to a list 25 at a time within the free plan’s five pages of results. To get more, paste the search URL into an Apify Apollo actor, set 100 records and export a CSV; this walkthrough quoted about $1.20 per 1,000 leads. I also reviewed a cold email sequence and the mailbox deliverability settings.",
  intro: "<p>This is a September 2025 beginner walkthrough from three years of using Apollo. Cold email is regulated, and scraping an app can breach its terms, and this walkthrough does not cover either, so check the law in your country and Apollo’s terms before you use any of this. The Apollo and Apify links are affiliate links. For a first Apify run, see <a href=\"/guides/apify-agent-skills.html\">the Apify agent skills guide</a>.</p>\n<p>Prices and plan names change. Confirm them on the vendor page before you buy. Checked November 15, 2026 against the Sources links below where listed.</p>",
  sections: [
    {
      id: 'filters',
      h: '1. Filter people in Apollo',
      html: '<p>Sign up free and open the People tab. It works like LinkedIn search. I kept only verified emails so mail does not bounce into spam, then added job titles founder and CEO, US companies, management consulting as the industry, the keyword AI and a company size of one to ten employees. The count dropped from about 2 million people to about 3,700.</p>',
    },
    {
      id: 'lists',
      h: '2. Save a list',
      html: '<p>Create a list and add contacts 25 at a time. The free plan lets you reach about five pages of results, which limits how many you can save. You can export the list to CSV and keep only the email column for a mailing tool.</p>',
    },
    {
      id: 'apify',
      h: '3. Export more with an Apify actor',
      html: "<p>I used an Apify Apollo actor: copy the Apollo search URL into it, set 100 records and run it. The actor was about $1.20 per 1,000 leads, so a few thousand fit within Apify’s free monthly credit. Apify’s store also lists scrapers for Google Maps, TikTok and websites. Automating this in Make.com needs a paid Apollo plan because the API is limited to paid users.</p>",
    },
    {
      id: 'email',
      h: '4. Sequences and deliverability',
      html: '<p>I reviewed an example sequence for HVAC companies, with follow-ups after five and seven days. In mailbox settings, check the deliverability rating and use the ramp-up option so a new mailbox does not send too much at once.</p>',
    },
  ],
  done: [
    'Verified emails, titles, location, size',
    'Lists, 25 contacts at a time on free',
    'Apify actor, about 1.20 USD per 1,000 leads',
  ],
  limits: [
    'Cold-email laws such as CAN-SPAM and GDPR.',
    'Whether using an Apollo scraper complies with Apollo’s terms.',
    'Reply or conversion rates from the example campaign.',
  ],
  faq: [
    [
      'How much does the Apify Apollo actor cost?',
      "About $1.20 per 1,000 leads in my walkthrough. Check the actor’s current price.",
    ],
    [
      'What are the free plan limits?',
      'I said five pages of results and adding 25 contacts to a list at a time.',
    ],
    ['Is scraping Apollo allowed?','I did not say. Check Apollo’s terms of use.'],
  ],
  sources: [
    'Video: <a href="https://www.youtube.com/watch?v=YCjvrNI1pa4">Apollo + Apify | The Cheapest Way To Scrape B2B Leads!</a> (recorded September 2025)',
    'Affiliate links: <a href="https://get.apollo.io/1mpkcotn2pwa" rel="sponsored noopener">Apollo</a> · <a href="https://www.apify.com?fpr=fklok2" rel="sponsored noopener">Apify</a>',
    'Apify: <a href="https://apify.com/">apify.com</a>',
  ],
  related: [
    ['/guides/apify-agent-skills.html','Apify agent skills setup in Cursor'],
    ['/guides/apify-klook-hotel-scraper-claude-code.html','Apify Klook hotel scraper'],
    ['/guides/make-business-automation-examples.html','Make.com business automations'],
    ['/guides/ai-automation-services-small-business.html','AI automation services for small business'],
    ['/guides/make-gmail-ai-auto-reply.html','Make.com Gmail auto-reply'],
  ],
  next: ['/guides/apify-agent-skills.html','Apify agent skills setup in Cursor'],
  more: 'Price and details: <a href="/tools.html#apollo">Apollo on the tools page</a>',
  linkFrom: ['/guides/ai-automation-services-small-business.html'],
  llms: "A September 2025 Apollo walkthrough: filter verified emails, founder and CEO titles and company size to go from about 2 million people to 3,700, save lists 25 at a time on the free plan, export up to thousands of leads with an Apify Apollo actor at about $1.20 per 1,000, and review an email sequence and deliverability settings. Cold-email laws and terms were not covered.",
};
