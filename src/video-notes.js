// Written companions for watch pages, drawn from each video's transcript (no claims beyond what the video shows).
// Keyed by YouTube video ID. `rows` start with their row label; `gaps` and `verdict` are optional.
export const videoNotes = {
  vauqktcB6ak: {
    tested: 'The same job in OpenAI Dots (inside ChatGPT) and GrokBot: an agent that finds remote AI automation jobs, tailors my resume to each one, finds the contact email, and drafts the outreach.',
    columns: ['', 'Dots', 'GrokBot'],
    rows: [
      ['Time to build', 'About 45 minutes for a basic version', 'Orchestrator agent live in 15–20 seconds; first results in a couple of minutes'],
      ['Jobs found', '3', 'About 45 pulled; 3 strong matches and a few possibles in the test run'],
      ['Resume and cover letter', 'Wrote a cover letter and appeared to tailor the resume', 'Asked for my master resume, parsed it, then drafted an outreach email per job'],
      ['Contact emails', 'Couldn’t verify an email for either role, so nothing could be sent', 'Found contacts through the Treg plugin (Lead Magic); emails drafted, ready to send'],
      ['Tracking', 'Job pages linked in the chat', 'Airtable base with title, company, links, date found, location, remote, full-time and salary'],
      ['Cost', 'A plan of at least $100 a month', 'Free to start, Pro $20 a month; I use Pro Plus at $60. The job search used about 10 cents of Treg credits.'],
    ],
    verdict: 'GrokBot finished in a couple of minutes what Dots couldn’t finish in 45. Dots felt rushed out, and I don’t think it’s worth $100 a month when GrokBot starts free.',
    note: 'Prices and features as tested for the video published October 1, 2026. Both tools change often, so check current plans.',
  },
  Ip8KBwDixJs: {
    tested: 'GrokBot as an end-of-day chief of staff, by voice, across my two products, TubeAnalytics and VisiScan: what ran today, what failed, and what still needs me.',
    columns: ['Task', 'What GrokBot did'],
    rows: [
      ['Checkout reminders', 'Reported that the 9:27 reminder hadn’t fired and paused it, then sent the first 30 of 193 after checking the production log.'],
      ['Speaking pitches', 'Pulled a festival organizer’s reply asking for a one-page outline, advised drafting it in the morning instead of rushing, and queued the draft.'],
      ['Page speed', 'Ran Lighthouse on slow 4G. TubeAnalytics mobile: performance 74, LCP 2.2 s, 930 ms blocking time. VisiScan: 83 mobile, 90 desktop.'],
      ['Backlink outreach', 'Six TubeAnalytics first contacts went out at the daily cap. Found the VisiScan prospect database timing out, flagged it P1, then drafted batch 24 and sent it after I approved: 10 of 10, no failures.'],
      ['SEO checks', 'VisiScan audit: no P0 or open P1 issues. 12 of 114 pages flagged as removed from the sitemap, and one live page still carries noindex.'],
    ],
    gaps: [
      'LinkedIn connection notes: the bots can’t send connection requests, so those stay manual.',
      'Outreach sends wait for my approval.',
      'Code fixes waited: my Cursor cloud agent credits were used up, and I chose to wait for the reset rather than pay for on-demand usage.',
      'Open rates: no opens yet on the 10 VisiScan first contacts, and it couldn’t report the tracking pixel numbers directly.',
      'The VisiScan database runs on a free Supabase plan that hibernates; it suggested a paid tier or a keep-alive.',
    ],
    note: 'From the session recorded for the video published October 5, 2026.',
  },
};
