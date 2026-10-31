// Transcript-checked summaries for recent uploads, written by hand from each video's transcript and chapters.
// Precedence in archive.js: watchNotes > videoNotes > videoSummaries > listingSummaries > YouTube description > fallback.
// keySteps seconds are chapter starts, so they link to the same #t= cues as the chapter list.
export const videoSummaries = {
  "wLIiTkra7uM": {
    "summary": "Connect GrokBot to WordPress with its plugin, then let an agent turn YouTube transcripts into scheduled blog posts that also go out to email subscribers. The recording hits GrokBot's weekly usage limit, so most of the demo reviews posts that were already drafted and scheduled.",
    "whatYouBuild": "A GrokBot blog-writer agent that reads a YouTube video's transcript, writes a WordPress article with the video embedded, adds excerpt, categories and tags, and schedules one post a day with a subscriber email.",
    "toolsUsed": [
      "GrokBot",
      "GrokBot WordPress plugin (MCP tools)",
      "WordPress",
      "YouTube transcripts"
    ],
    "keySteps": [
      {
        "seconds": 64,
        "step": "Search the plugins for WordPress, connect it and turn on all of its tools."
      },
      {
        "seconds": 91,
        "step": "A chief of staff agent sits at the top and delegates the blog work to a dedicated blog-writer agent."
      },
      {
        "seconds": 125,
        "step": "The agent pulls a video's transcript and writes a roughly 1,500-word article with links and the embedded video."
      },
      {
        "seconds": 173,
        "step": "Each article ends with a link to the AI Income Lab landing page."
      },
      {
        "seconds": 185,
        "step": "Review the scheduled and draft posts in WordPress. Some titles still need editing."
      },
      {
        "seconds": 292,
        "step": "Set the agent to publish one article a day and email the subscriber list each time."
      },
      {
        "seconds": 342,
        "step": "Pricing as stated in the recording: free to start, paid plans from $30 a month, with the $60 plan in use."
      }
    ],
    "notCovered": [
      "A live article generation run. The weekly usage limit was at 100% during recording, so the demo shows posts made earlier.",
      "Editing or fact-checking the generated articles before they publish.",
      "Any traffic or subscriber results from the posts. The title says 30 days, but no 30-day results are shown."
    ],
    "qa": [
      {
        "q": "Does GrokBot write the article from the video itself?",
        "a": "It reads the video's transcript and writes the article from that, then embeds the video in the post."
      },
      {
        "q": "Can the posts go out by email automatically?",
        "a": "Yes. The agent schedules each post with the subscriber email turned on, set to one article a day."
      },
      {
        "q": "What happens when you hit the usage limit?",
        "a": "The agent stops until the weekly limit resets. In the recording that was about four days away."
      }
    ]
  },
  "VE66JDHoS6Y": {
    "summary": "Install Herdr from the command line and run Codex, Claude Code, OpenCode and Hermes side by side in one workspace that saves every session. The hands-on test also notes high memory use, about 8 GB with several agents open.",
    "whatYouBuild": "A single Herdr terminal workspace with project spaces and tabs, each running a different coding agent, that restores sessions after you quit.",
    "toolsUsed": [
      "Herdr",
      "Codex",
      "Claude Code",
      "OpenCode",
      "Hermes"
    ],
    "keySteps": [
      {
        "seconds": 63,
        "step": "Pick an install method: a one-line curl command, PowerShell on Windows, or Brew and other package managers on Mac."
      },
      {
        "seconds": 160,
        "step": "Run the one-line install, then start Herdr."
      },
      {
        "seconds": 189,
        "step": "Create project spaces on the left and open tabs inside each one."
      },
      {
        "seconds": 220,
        "step": "Start Codex in one tab and Claude Code in another, and keep working as usual."
      },
      {
        "seconds": 249,
        "step": "Quit and reopen Herdr to see sessions restored without resuming them by hand."
      },
      {
        "seconds": 294,
        "step": "Run OpenCode. The first free model was unavailable, so switch to another free model."
      },
      {
        "seconds": 361,
        "step": "Open Hermes in a tab and check memory use."
      }
    ],
    "notCovered": [
      "Herdr's automation features, which are only pointed to on the website.",
      "Windows or Linux installs on camera. The demo runs one install path.",
      "Any comparison with other terminal multiplexers."
    ],
    "qa": [
      {
        "q": "Which agents can Herdr run?",
        "a": "The video runs Codex, Claude Code, OpenCode and Hermes in separate tabs of the same workspace."
      },
      {
        "q": "Does Herdr keep sessions after you close it?",
        "a": "Yes. Sessions are saved when you quit and are there when you start Herdr again."
      },
      {
        "q": "Is it heavy on memory?",
        "a": "In the recording it used about 8 GB with several agents running."
      }
    ]
  },
  "qQVAnp4-EpI": {
    "summary": "Write a master brief, run market research in Runable, then generate and refine an AI Growth Audit website from that research. Stripe payments and the consultation email are not connected by the end of the recording.",
    "whatYouBuild": "A first-version marketing site and customer portal for an AI Growth Audit service, with a chatbot, Google sign-in, FAQ and a contact form, built from a brief and generated research.",
    "toolsUsed": [
      "Runable",
      "ChatGPT (to write the brief and research prompt)"
    ],
    "keySteps": [
      {
        "seconds": 120,
        "step": "Write a master brief in ChatGPT covering audience, problem, offer, promise, conversion goal and design, with a rule against invented testimonials and statistics."
      },
      {
        "seconds": 233,
        "step": "Paste a research prompt into Runable. The run took about 25 minutes, 19 steps and 2,300 credits and returned seven files."
      },
      {
        "seconds": 327,
        "step": "Review the competitor database and pricing comparison, and treat the generated pricing advice as input to check."
      },
      {
        "seconds": 539,
        "step": "Combine the research and the master brief to generate the site. The build took about 20 minutes."
      },
      {
        "seconds": 607,
        "step": "Check the first draft: chatbot and Google sign-in work, a launch checklist lists Stripe as not implemented."
      },
      {
        "seconds": 752,
        "step": "Ask for specific fixes: a simpler hero, Get your audit as the main call to action, less repeated copy."
      },
      {
        "seconds": 997,
        "step": "Review the revised homepage with a sample report preview and a secondary consultation button."
      }
    ],
    "notCovered": [
      "Stripe payments.",
      "Email delivery from the consultation form.",
      "A pricing page.",
      "Publishing the site."
    ],
    "qa": [
      {
        "q": "Can Runable do the market research too?",
        "a": "Yes. In the recording one research prompt produced seven files, including a competitor database and a pricing comparison."
      },
      {
        "q": "Is the site ready to take payments at the end?",
        "a": "No. Stripe is not connected and the contact form does not send email yet."
      },
      {
        "q": "How do you get better revisions?",
        "a": "Point to a specific part of the page and say what outcome you want, instead of asking to make it better."
      }
    ]
  },
  "UAPaM6KrC-M": {
    "summary": "Install the REA skill into several coding agents, then use it with Claude Code to rebuild a version of the Kdenlive video editor. The rebuild took four to five hours and the result imports, plays and splits clips, while effects and some sliders do not work yet.",
    "whatYouBuild": "A Kdenlive-style desktop video editor called Cutline, recreated by Claude Code with the REA (Reverse Engineer Anything) skill.",
    "toolsUsed": [
      "REA (Reverse Engineer Anything)",
      "Claude Code (Sonnet 5.5)",
      "Kdenlive"
    ],
    "keySteps": [
      {
        "seconds": 69,
        "step": "Review Kdenlive's layout: project settings, filters, timeline and effects panels."
      },
      {
        "seconds": 101,
        "step": "Run the one-line npx command and choose which coding agents get the skill."
      },
      {
        "seconds": 146,
        "step": "Ask Claude Code to use the REA skill to create its own version of Kdenlive."
      },
      {
        "seconds": 180,
        "step": "The rebuild took at least four to five hours."
      },
      {
        "seconds": 225,
        "step": "Create a 1080p 30fps project, import a video, drag it to the timeline, split and play it."
      },
      {
        "seconds": 299,
        "step": "Ask Claude to fix broken sliders."
      }
    ],
    "notCovered": [
      "Effects, which appear but do not work yet.",
      "A finished, bug-free editor.",
      "How REA analyzes the app internally, beyond the website's description."
    ],
    "qa": [
      {
        "q": "What does REA do?",
        "a": "It is a skill for coding agents that inspects an existing application and helps recreate its features in your own project."
      },
      {
        "q": "How long did the rebuild take?",
        "a": "About four to five hours with Claude Code."
      },
      {
        "q": "Does the rebuilt editor work?",
        "a": "Importing, timeline playback, splitting and zoom work. Effects do not, and some sliders needed fixing."
      }
    ]
  },
  "mPHM81X1oqc": {
    "summary": "Read through Meta's Muse Wonder announcement and published benchmarks, then try the model in practice. API key errors blocked it in OpenCode, so the test switches to Meta's Muse Code terminal agent and starts a code audit on a real project.",
    "whatYouBuild": "A working Muse Code setup in the terminal, signed in through the browser, running Muse Wonder on a repository audit.",
    "toolsUsed": [
      "Muse Wonder",
      "Muse Code",
      "OpenCode",
      "Claude Code (Opus 5.5)"
    ],
    "keySteps": [
      {
        "seconds": 52,
        "step": "Walk through Meta's announcement and benchmark charts. These are Meta's published numbers, not independent tests."
      },
      {
        "seconds": 182,
        "step": "Try the 3D kitchen game demo on Meta's page."
      },
      {
        "seconds": 202,
        "step": "Look at Meta's browser-use demos for calendar events and map pins."
      },
      {
        "seconds": 245,
        "step": "Add an API key to OpenCode. It returns an invalid key error."
      },
      {
        "seconds": 290,
        "step": "Ask Claude Code to debug the key. Tokens register but the model is still not reachable in OpenCode."
      },
      {
        "seconds": 343,
        "step": "Install Muse Code, sign in with the browser and switch the model to Muse Wonder."
      },
      {
        "seconds": 433,
        "step": "Run an audit on a project. About a dollar was spent so far when the recording ends."
      }
    ],
    "notCovered": [
      "The audit's results.",
      "Any independent benchmark testing.",
      "Muse Wonderful Full in practice.",
      "A working OpenCode setup."
    ],
    "qa": [
      {
        "q": "Can you use Muse Wonder in OpenCode?",
        "a": "Not in this recording. The API key kept failing, so the working route was Muse Code."
      },
      {
        "q": "Are the benchmark results independent?",
        "a": "No. They are the charts Meta published on its announcement page."
      },
      {
        "q": "What did the test cost?",
        "a": "Under a cent for the first checks and roughly a dollar once the audit started."
      }
    ]
  },
  "ys5tJuTFCEo": {
    "summary": "Have GrokBot install Codex and Claude Code on its virtual computer, sign in to both, and use them as fallbacks when Cursor cloud agent credits run out. GrokBot then writes a routing rule that picks the tool and model by task type.",
    "whatYouBuild": "Codex and Claude Code running inside GrokBot's virtual desktop, plus a routing rule file that sends each task type to a specific tool and model.",
    "toolsUsed": [
      "GrokBot",
      "Codex",
      "Claude Code",
      "Treg"
    ],
    "keySteps": [
      {
        "seconds": 65,
        "step": "Ask the chief of staff to open a virtual computer and install Codex and Claude Code."
      },
      {
        "seconds": 100,
        "step": "Sign in to Codex from the login screen GrokBot opens."
      },
      {
        "seconds": 147,
        "step": "Sign in to Claude Code, including a captcha."
      },
      {
        "seconds": 180,
        "step": "GrokBot warns that Claude Code auto mode in the shared folder could run live email scripts, and points it at a separate project folder."
      },
      {
        "seconds": 211,
        "step": "Run an SEO audit of two sites with Treg and Claude Code."
      },
      {
        "seconds": 268,
        "step": "Move content writing to Codex while Cursor credits are out, and save that as a fallback rule."
      },
      {
        "seconds": 333,
        "step": "Create a routing rule that picks Claude Code or Codex and a model by task."
      },
      {
        "seconds": 374,
        "step": "Review the model choices in the rule file for audits, writing, bug fixes and light work."
      }
    ],
    "notCovered": [
      "Permanently turning off Claude Code auto mode. GrokBot notes it needs a settings file edit.",
      "The SEO audit results.",
      "Measured credit savings from routing."
    ],
    "qa": [
      {
        "q": "Why connect Codex and Claude Code to GrokBot?",
        "a": "To keep coding and content work going when Cursor cloud agent credits run out."
      },
      {
        "q": "Is auto mode safe?",
        "a": "GrokBot flags that auto mode can edit files and run commands, including email scripts, so it moves Claude Code to a separate folder."
      },
      {
        "q": "How does routing work?",
        "a": "A rule file plus a small helper script picks the tool and model per task, and GrokBot shows the command before running it."
      }
    ]
  },
  "taqTVHPlJ8w": {
    "summary": "A walkthrough of Anthropic's Claude Haiku 5.5 announcement covering its benchmarks against Haiku 4.5, GPT-6 Luna and Sonnet 5.5, its pricing and where it is available. The model is not tested hands-on in this video.",
    "whatYouBuild": "Nothing is built. This is an announcement review.",
    "toolsUsed": [
      "Claude Haiku 5.5",
      "Anthropic announcement page"
    ],
    "keySteps": [
      {
        "seconds": 24,
        "step": "Compare Anthropic's charts against GPT-6 Luna."
      },
      {
        "seconds": 63,
        "step": "See where it falls short of Sonnet 5.5."
      },
      {
        "seconds": 91,
        "step": "Pricing as announced: 10 cents per million input tokens and 50 cents per million output tokens, and Anthropic's claim of about 75% lower average cost than Haiku 4.5."
      },
      {
        "seconds": 134,
        "step": "Cheaper cache reads for Claude 5.5 and a new monthly API credit for Max and Team subscribers."
      },
      {
        "seconds": 202,
        "step": "Agentic coding scores from Anthropic's charts."
      },
      {
        "seconds": 328,
        "step": "Safety and misuse safeguards as described by Anthropic."
      },
      {
        "seconds": 363,
        "step": "Availability on AWS, Google Cloud and Azure."
      }
    ],
    "notCovered": [
      "Hands-on testing of the model.",
      "Independent benchmarks.",
      "How to call it from code."
    ],
    "qa": [
      {
        "q": "Is Haiku 5.5 tested in the video?",
        "a": "No. The video reviews the announcement and says hands-on testing will come later."
      },
      {
        "q": "What does it cost?",
        "a": "As announced, 10 cents per million input tokens and 50 cents per million output tokens."
      },
      {
        "q": "Where is it available?",
        "a": "On Anthropic's platform plus AWS, Google Cloud and Azure."
      }
    ]
  },
  "Ip8KBwDixJs": {
    "summary": "An end-of-day voice session with GrokBot as chief of staff across two products, covering a failed reminder, outreach sends, page speed tests, an SEO audit and a database timeout. Several tasks stay manual or wait for approval.",
    "whatYouBuild": "Nothing is built from scratch. The video shows a working multi-agent setup handling a day's tasks by voice.",
    "toolsUsed": [
      "GrokBot",
      "Lighthouse",
      "Treg",
      "Index Machine",
      "Supabase"
    ],
    "keySteps": [
      {
        "seconds": 0,
        "step": "Ask for the day's rundown. The 9:27 checkout reminder did not fire and was paused, then the first 30 of 193 are sent."
      },
      {
        "seconds": 98,
        "step": "Pull a festival organizer's reply and decide to draft her one-page outline the next morning."
      },
      {
        "seconds": 145,
        "step": "Read Lighthouse results: TubeAnalytics mobile performance 74, VisiScan 83 mobile and 90 desktop."
      },
      {
        "seconds": 182,
        "step": "Check backlink outreach. VisiScan's prospect database had been timing out and is flagged P1."
      },
      {
        "seconds": 241,
        "step": "Review the VisiScan SEO audit: no P0 or open P1 issues, 12 of 114 pages flagged."
      },
      {
        "seconds": 341,
        "step": "Approve batch 24 of backlink drafts. 10 of 10 were sent with no failures."
      },
      {
        "seconds": 572,
        "step": "Choose to wait for Cursor credits to reset rather than turn on on-demand usage."
      },
      {
        "seconds": 701,
        "step": "Ask about open rates. No opens yet and no direct pixel numbers."
      }
    ],
    "notCovered": [
      "LinkedIn connection requests, which the bots cannot send.",
      "Code fixes, which waited for credits.",
      "Open-rate tracking results."
    ],
    "qa": [
      {
        "q": "Can GrokBot send outreach on its own?",
        "a": "Here sends wait for approval. Once approved, batch 24 went out 10 of 10."
      },
      {
        "q": "What could it not do?",
        "a": "Send LinkedIn connection requests, report pixel open rates directly, or run code fixes without Cursor credits."
      },
      {
        "q": "What caused the outreach failure?",
        "a": "The VisiScan prospect database on a free Supabase plan hibernated and timed out."
      }
    ]
  },
  "IymTRFLMY_s": {
    "summary": "A long live session where GrokBot works through SEO and business tasks for TubeAnalytics and VisiScan: backlink stats, low click-through rates, indexing errors, German redirects, weekly routines and Stripe checks. Most changes are left as pull requests or drafts that need approval.",
    "whatYouBuild": "Nothing is built from scratch. The video shows GrokBot setting up routines and fixes across existing sites.",
    "toolsUsed": [
      "GrokBot",
      "Index Machine",
      "Google Search Console",
      "Treg",
      "Stripe",
      "GitHub",
      "Gmail"
    ],
    "keySteps": [
      {
        "seconds": 35,
        "step": "Hear the backlink snapshot and outreach follow-up schedule."
      },
      {
        "seconds": 98,
        "step": "GrokBot reads about 3,600 clicks on 587,000 impressions as a 0.6% click rate and suggests title and meta refreshes."
      },
      {
        "seconds": 145,
        "step": "Index Machine shows 420 pages needing fixes and 154 excluded, mostly old German 404s."
      },
      {
        "seconds": 204,
        "step": "Redirect the German URLs to English pages, picked as the top priority."
      },
      {
        "seconds": 279,
        "step": "Pick a new title for the RPM benchmarks post based on Treg search data."
      },
      {
        "seconds": 415,
        "step": "Create a weekly Monday indexing routine for the SEO auditor."
      },
      {
        "seconds": 496,
        "step": "Route new-customer checks to a Stripe alerts bot and make them weekly."
      },
      {
        "seconds": 997,
        "step": "Gmail send stops working, and PRs wait for an explicit merge approval."
      }
    ],
    "notCovered": [
      "Whether the fixes improved indexing or clicks.",
      "The investor outreach status, which GrokBot could not find.",
      "A lint failure on one PR that was still being fixed."
    ],
    "qa": [
      {
        "q": "Will title changes fix indexing?",
        "a": "GrokBot says no. Titles lift clicks on pages Google already shows, while indexing depends on crawl and inclusion problems."
      },
      {
        "q": "Why redirect the German pages?",
        "a": "They returned 404s, which waste crawl budget, and the fix is mechanical."
      },
      {
        "q": "Does GrokBot merge code on its own?",
        "a": "No. Merges and email sends need explicit approval each time."
      }
    ]
  },
  "gNcHbc2kdzw": {
    "summary": "A tour of five GrokBot agents in daily use: podcast outreach, sponsor research, job search, a Cursor cloud agent for site fixes and backlink outreach. Then a content repurposing agent is built from a prompt and set to watch the channel for new uploads.",
    "whatYouBuild": "A content repurposing agent that turns a YouTube video into seven draft posts in Airtable, plus a routine that checks the channel twice a day for new uploads.",
    "toolsUsed": [
      "GrokBot",
      "Cursor cloud agents",
      "Treg",
      "Gmail",
      "Airtable",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 64,
        "step": "A podcast outreach agent drafts packages for 63 hosts to send through Gmail."
      },
      {
        "seconds": 89,
        "step": "A sponsor agent finds contacts at companies that already sponsor YouTubers."
      },
      {
        "seconds": 130,
        "step": "A job search agent finds fitting companies and drafts emails."
      },
      {
        "seconds": 172,
        "step": "A Cursor cloud agent fixes SEO and tracking issues on the blog and can push to GitHub."
      },
      {
        "seconds": 232,
        "step": "A backlink agent uses Treg to find emails and send follow-ups."
      },
      {
        "seconds": 314,
        "step": "Ask ChatGPT for agent ideas and a detailed prompt for a content repurposing agent."
      },
      {
        "seconds": 357,
        "step": "Paste the prompt into GrokBot. It builds the agent and an Airtable base in about three minutes."
      },
      {
        "seconds": 434,
        "step": "Review the seven drafts. The X post is too long and nothing is published automatically."
      },
      {
        "seconds": 496,
        "step": "Set a routine to check the channel at 1:30 and 5:00 p.m. Bangkok time."
      },
      {
        "seconds": 542,
        "step": "Move the routine to the chief of staff agent."
      }
    ],
    "notCovered": [
      "Publishing the drafts, which stays manual.",
      "Whether the upload watch works, since it had not run yet.",
      "Results from the outreach agents."
    ],
    "qa": [
      {
        "q": "Does it publish the repurposed posts?",
        "a": "No. It saves drafts to Airtable, and publishing is still done by hand."
      },
      {
        "q": "Does it run automatically for new videos?",
        "a": "After setup, a routine checks the channel twice a day. It had not run on a new upload by the end of the video."
      },
      {
        "q": "What does GrokBot cost?",
        "a": "As stated in the video: a free trial, then $20, $60 or $200 a month."
      }
    ]
  },
  "-cLECY10Tzg": {
    "searchTitle": "Manus AI walkthrough: Gmail, Calendar and auto-replies",
    "summary": "Try Manus AI for the first time on the free Lite model, connecting Google Calendar and Gmail and asking it to build an hourly AI email autoresponder that later switches to Gemini. The Lite model could not build a SaaS app, and a calendar delete did not work.",
    "whatYouBuild": "An hourly scheduled task in Manus that reads unread Gmail messages and drafts replies with a Python script using an AI API.",
    "toolsUsed": [
      "Manus",
      "Google Calendar",
      "Gmail",
      "OpenAI API",
      "Google AI Studio",
      "Gemini"
    ],
    "keySteps": [
      {
        "seconds": 0,
        "step": "Select the Manus 1.6 Lite model, since the Pro and Max models need a trial or paid plan."
      },
      {
        "seconds": 70,
        "step": "Connect Google Calendar and run the suggested prompt that tests the connector."
      },
      {
        "seconds": 140,
        "step": "Create and update a calendar event from Manus, then try to delete it, which did not remove it from the calendar."
      },
      {
        "seconds": 210,
        "step": "Connect Gmail and let Manus list the latest emails, then try a Lead Flow SaaS build that was too complex for the Lite model."
      },
      {
        "seconds": 420,
        "step": "Ask Manus to auto-respond to all emails, which creates a Python responder and an hourly scheduled task."
      },
      {
        "seconds": 490,
        "step": "Add an OpenAI API key and a Gemini key from Google AI Studio through the custom API connectors."
      },
      {
        "seconds": 560,
        "step": "Tell Manus to switch the autoresponder from ChatGPT to Gemini for generating replies."
      }
    ],
    "notCovered": [
      "The autoresponder is never shown sending a real reply, so it is not confirmed to work.",
      "Credit use on the free plan is not measured.",
      "The browser extension and custom MCP connections are mentioned but not set up."
    ],
    "qa": [
      {
        "q": "Can Manus AI connect to Gmail and Google Calendar?",
        "a": "Yes. The video connects both and Manus lists recent emails and creates and updates a calendar event, though deleting the event did not work."
      },
      {
        "q": "Can the free Manus Lite model build a full app?",
        "a": "Not in this test. A request to build a sales lead tracker SaaS returned a message that the task needed more power than Manus 1.6 Lite."
      },
      {
        "q": "Which AI model does the Manus email autoresponder use?",
        "a": "The script Manus wrote used OpenAI at first. After adding a Gemini API key, the presenter asked Manus to switch it to Gemini."
      }
    ]
  },
  "0tmhsHn5B30": {
    "searchTitle": "GLM 5.2 in OpenCode Go: setup and Hermes Agent test",
    "summary": "Select GLM 5.2 inside OpenCode on the Go plan, then use the same model in the OpenCode desktop app and in Hermes Agent. The free Zen option returned an insufficient balance error, so the test needed the Go plan, which costs $10 per month as stated in the recording.",
    "whatYouBuild": "Nothing is built from scratch. The video shows GLM 5.2 selected in the OpenCode terminal app, the OpenCode desktop app and Hermes Agent, then used for a site audit and a cron job list.",
    "toolsUsed": [
      "OpenCode",
      "OpenCode Go",
      "GLM 5.2",
      "Hermes Agent"
    ],
    "keySteps": [
      {
        "seconds": 65,
        "step": "Install OpenCode with its one-line curl command if it is not already set up."
      },
      {
        "seconds": 176,
        "step": "Open the model switcher in OpenCode, search for GLM and pick GLM 5.2 under OpenCode Go after Zen returns an insufficient balance error."
      },
      {
        "seconds": 214,
        "step": "Send a short test prompt, then ask the model to run a full site audit on a project folder."
      },
      {
        "seconds": 252,
        "step": "Select GLM 5.2 on the Go plan in the OpenCode desktop app and send a test message."
      },
      {
        "seconds": 295,
        "step": "Connect the OpenCode Go plan in Hermes Agent and switch the model to GLM 5.2 with the model command."
      },
      {
        "seconds": 338,
        "step": "Ask Hermes Agent to list cron jobs and check spend on the OpenCode usage page."
      }
    ],
    "notCovered": [
      "The site audit is not finished and no fixes are applied, so output quality is not judged in detail.",
      "The Claude Code and Codex setup methods the video calls more complicated are not shown or compared.",
      "Model rankings and comparisons with other models are quoted, not tested in the video."
    ],
    "qa": [
      {
        "q": "Do you need a paid plan to use GLM 5.2 in OpenCode?",
        "a": "In the video, the free Zen option returned an insufficient balance error, and GLM 5.2 worked after switching to the OpenCode Go plan, stated as $10 per month in the recording."
      },
      {
        "q": "Can Hermes Agent use GLM 5.2?",
        "a": "Yes. After connecting the OpenCode Go plan, the model command in Hermes Agent lets you pick GLM 5.2, and it works in both the terminal and the Hermes desktop app."
      },
      {
        "q": "How much did the tests cost?",
        "a": "The OpenCode usage page showed about 34 cents spent on GLM 5.2 by the end of the video, as stated in the recording, covered by the Go plan."
      }
    ]
  },
  "1TPm7B5oStw": {
    "searchTitle": "WhatsApp AI voice agent with Make.com and ElevenLabs",
    "summary": "Build a Make.com automation that answers WhatsApp texts and voice memos with an OpenAI assistant trained on YouTube transcripts and replies using an ElevenLabs voice clone. The test uses a hardcoded test number, and the router filters had to be re-added during debugging.",
    "whatYouBuild": "A Make.com scenario that routes WhatsApp texts and voice memos to an OpenAI assistant and sends back an ElevenLabs voice memo, plus a second scenario that turns YouTube transcripts into the assistant's knowledge base.",
    "toolsUsed": [
      "Make.com",
      "WhatsApp Business Cloud",
      "OpenAI Assistants",
      "ElevenLabs",
      "Dumpling AI",
      "Google Sheets"
    ],
    "keySteps": [
      {
        "seconds": 223,
        "step": "Add a WhatsApp Business Cloud Watch Events trigger and a router with filters for text messages and audio messages."
      },
      {
        "seconds": 372,
        "step": "Create an assistant in the OpenAI platform with a short role prompt and attach a vector store as its knowledge base."
      },
      {
        "seconds": 677,
        "step": "Build a second scenario that reads YouTube links from Google Sheets, pulls transcripts with Dumpling AI, saves them to Google Drive and uploads them to the vector store."
      },
      {
        "seconds": 1088,
        "step": "Create an instant voice clone in ElevenLabs and use it in a speech synthesis module with the multilingual model."
      },
      {
        "seconds": 1343,
        "step": "Upload the generated audio to WhatsApp Business Cloud and send it as an audio message, with an extra download and Whisper translation step for voice memos."
      },
      {
        "seconds": 1702,
        "step": "Create a Meta developer app, copy the access token and WhatsApp business account ID into Make.com, and subscribe the webhook to messages."
      },
      {
        "seconds": 2357,
        "step": "Test with real WhatsApp messages and fix the router after its filter conditions went missing."
      }
    ],
    "notCovered": [
      "Replies go to a hardcoded test number, so mapping the sender's number for real customers is only described.",
      "WhatsApp business verification for a production number is mentioned but not shown.",
      "Some transcript uploads to the vector store failed and the cause is not explained."
    ],
    "qa": [
      {
        "q": "How does the bot handle WhatsApp voice memos?",
        "a": "A router sends audio messages down a branch that downloads the media and uses OpenAI Whisper to translate it into English text before messaging the assistant."
      },
      {
        "q": "Which ElevenLabs plan does the video use?",
        "a": "It uses the Starter plan, about $5 a month as stated in the recording, for an instant voice clone. The Creator plan, $22 a month as stated, is recommended for a professional clone."
      },
      {
        "q": "Where does the assistant get its knowledge?",
        "a": "From a vector store of YouTube video transcripts, which a separate Make.com scenario collects with Dumpling AI and uploads to OpenAI."
      }
    ]
  },
  "4jK9RraWbiU": {
    "searchTitle": "Make.com RSS to AI video workflow walkthrough",
    "summary": "Walk through a Make.com scenario that takes a Business Insider RSS item, summarizes it with Perplexity, scripts a video with ChatGPT, renders it in JSON2Video and posts it to Facebook, Instagram and YouTube. The live test stopped when JSON2Video ran out of credits.",
    "whatYouBuild": "A Make.com scenario that turns one news article into a short AI video and posts it to a Facebook page, an Instagram business account and a YouTube channel.",
    "toolsUsed": [
      "Make.com",
      "Perplexity",
      "ChatGPT",
      "JSON2Video",
      "Facebook",
      "YouTube"
    ],
    "keySteps": [
      {
        "seconds": 30,
        "step": "Add an RSS feed reader module with the Business Insider feed URL and return one item."
      },
      {
        "seconds": 60,
        "step": "Connect a Perplexity API key and use the Sonar model with a prompt that summarizes the article for social posts."
      },
      {
        "seconds": 90,
        "step": "Pass the summary to ChatGPT to write a scene-based video script of 30 to 60 seconds, then parse the JSON output."
      },
      {
        "seconds": 120,
        "step": "Send the scenes to JSON2Video at 720p with a free Azure voice ID, wait for the render and fetch the file with an HTTP request."
      },
      {
        "seconds": 150,
        "step": "Have ChatGPT write the post text and use a router to upload the video to Facebook, Instagram and YouTube."
      },
      {
        "seconds": 180,
        "step": "Run the scenario, which fetches and summarizes the article but stops at video creation because the JSON2Video quota was exceeded."
      }
    ],
    "notCovered": [
      "A finished video and a live social post are not shown because the run failed at the rendering step.",
      "JSON2Video credit limits and costs are not explained beyond the quota error.",
      "The full ChatGPT script prompt is not read out in full, the video points to the template instead."
    ],
    "qa": [
      {
        "q": "Which AI models does this Make.com video workflow use?",
        "a": "Perplexity Sonar summarizes the article and ChatGPT writes the video script and the social post. JSON2Video renders the video with a free Azure voice."
      },
      {
        "q": "Does the workflow need paid accounts?",
        "a": "The video says Perplexity will likely need money added to billing. JSON2Video gives a free API key on signup, but the test ran out of credits on the current plan."
      },
      {
        "q": "Where can I get the template?",
        "a": "The template is on the presenter's Gumroad page as free or pay what you want. It is also linked from his Skool community, where templates need the premium plan, as stated in the recording."
      }
    ]
  },
  "4uNxh9FW6Ho": {
    "searchTitle": "Vapi voice agent walkthrough: Twilio and Make.com calls",
    "summary": "Build an outbound AI voice agent in Vapi with an ElevenLabs voice clone, a Twilio number and a Make.com scenario that calls leads from Google Sheets. The live test books a calendar slot, but the Vapi outbound campaign feature did not work for the creator.",
    "whatYouBuild": "You build a Vapi appointment scheduler assistant that a Make.com scenario uses to call leads from a Google Sheet, mark them as called and book consultations on Google Calendar.",
    "toolsUsed": [
      "Vapi",
      "ElevenLabs",
      "Twilio",
      "Make.com",
      "Google Sheets",
      "Google Calendar"
    ],
    "keySteps": [
      {
        "step": "Create a Vapi assistant from the appointment scheduler template and set OpenAI as the model with wait for user as the first message mode."
      },
      {
        "step": "Select an ElevenLabs professional voice clone, set Deepgram or OpenAI as the transcriber and add the book appointment and check availability tools."
      },
      {
        "step": "Buy a Twilio phone number and import it into Vapi with the account SID and auth token."
      },
      {
        "step": "Build a Make.com scenario that searches unsent rows in Google Sheets, aggregates and iterates them, and creates a Vapi outbound call."
      },
      {
        "step": "Update the called field in the sheet, add a sleep module between calls and run a live test call to your own phone."
      },
      {
        "step": "Create Google Calendar tools in Vapi and connect the calendar under settings and integrations."
      }
    ],
    "notCovered": [
      "The full system prompt and Make.com template are sold separately for $15, as stated in the recording, so the exact prompt is not shown.",
      "Setting up outbound call campaigns inside Vapi is skipped, and the creator says it did not work for him.",
      "The Make.com webhook for call status messages is mentioned but never configured."
    ],
    "qa": [
      {
        "q": "Do you need coding to build a Vapi voice agent?",
        "a": "No. The video builds it with Vapi's assistant settings, a Twilio number and a Make.com scenario, without writing code."
      },
      {
        "q": "Why use Twilio instead of a free Vapi number?",
        "a": "Vapi offers free numbers up to 10 per account, but only US area codes, as stated in the recording, so Twilio is used for other countries."
      },
      {
        "q": "How does the agent book appointments?",
        "a": "Vapi's Google Calendar tools check availability and create an event, and the system prompt tells the agent when to run each function."
      }
    ]
  },
  "8ieDSa8BVH4": {
    "searchTitle": "Facebook Messenger bot with ChatGPT and Make.com",
    "summary": "Build a Make.com scenario that watches Facebook Messenger, drafts a reply with ChatGPT and sends it back, then set up the Facebook developer app and webhook it needs. The bot is not shown working live because Meta business verification was not yet approved.",
    "whatYouBuild": "A three module Make.com scenario that receives Messenger messages through a webhook, creates a reply with OpenAI, and sends it back on Messenger.",
    "toolsUsed": [
      "Make.com",
      "Facebook Messenger",
      "Meta for Developers",
      "OpenAI ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 135,
        "step": "Create a new Make.com scenario with the Facebook Messenger Watch Messages trigger, a webhook and a verify token of your choice."
      },
      {
        "seconds": 210,
        "step": "Create an app in Facebook Developers with the Other use case and Business type, linked to your Facebook page."
      },
      {
        "seconds": 281,
        "step": "Connect your Facebook page to the app and generate the page access token."
      },
      {
        "seconds": 492,
        "step": "Add an OpenAI Create a Completion module that writes a reply to the incoming message text."
      },
      {
        "seconds": 587,
        "step": "Add a Messenger Send a Message module using the access token and map the ChatGPT result into the message text."
      },
      {
        "seconds": 724,
        "step": "Fix the failing webhook verification by creating a new webhook in Make.com and pasting its URL and verify token into the app."
      },
      {
        "seconds": 816,
        "step": "Request the pages messaging permissions and submit business verification before switching the app to live."
      }
    ],
    "notCovered": [
      "A real message and automated reply are never shown, since business verification was still pending.",
      "Replying to Facebook comments is not covered, and the video says it is unsure whether that is possible.",
      "Prompt design for safe or on brand replies is not tested beyond a one line instruction."
    ],
    "qa": [
      {
        "q": "Why did the Messenger webhook fail to verify?",
        "a": "The callback URL kept failing in the Facebook app. Creating a brand new webhook in Make.com and using its URL and verify token fixed it."
      },
      {
        "q": "Which ChatGPT model is used for replies?",
        "a": "The video selects a GPT-4 model in the OpenAI Create a Completion module and asks it to create a reply to the Facebook message."
      },
      {
        "q": "What is needed before the bot can go live?",
        "a": "You need to request the pages messaging permissions and pass Meta business verification, which involves uploading ID that matches your personal profile name."
      }
    ]
  },
  "9DQYe6HywT8": {
    "searchTitle": "Gamma AI tutorial: build a presentation from an outline",
    "summary": "Build a workshop presentation in Gamma by pasting a ChatGPT outline, setting the audience, tone and theme, then letting the AI generate, rewrite and restyle the slides. The export to Google Slides did not work in the test, so the deck was exported as a PDF instead.",
    "whatYouBuild": "A concise, professional slide deck for a 40 minute AI automation workshop, including a slide comparing n8n and Make.com.",
    "toolsUsed": [
      "Gamma",
      "ChatGPT",
      "Google Gemini",
      "Google Slides"
    ],
    "keySteps": [
      {
        "seconds": 155,
        "step": "Ask Google Gemini for AI presentation tools, which suggests Gamma and Beautiful.ai."
      },
      {
        "seconds": 256,
        "step": "Create a new presentation in Gamma, paste in the outline and keep the default fluid format."
      },
      {
        "seconds": 348,
        "step": "Set the text amount to concise, describe the audience and tone, and pick a professional theme with automatic images."
      },
      {
        "seconds": 419,
        "step": "Generate the deck and watch Gamma build the slides in real time."
      },
      {
        "seconds": 510,
        "step": "Use Improve writing and the theme suggestion to rewrite and restyle the whole deck."
      },
      {
        "seconds": 626,
        "step": "Prompt Gamma to add a slide comparing n8n and Make.com."
      },
      {
        "seconds": 730,
        "step": "Publish the deck as a Gamma site, then export it as a PDF after the Google Slides export failed."
      }
    ],
    "notCovered": [
      "Manual editing of individual slides is not shown in detail.",
      "The finished, revised deck is not shown.",
      "Paid plan features such as hiding the logo or custom domains are not tested."
    ],
    "qa": [
      {
        "q": "Is Gamma free to use?",
        "a": "Gamma is free to start, and the recording shows 400 credits on the free plan. As stated in the recording, paid plans are about $10 per month."
      },
      {
        "q": "Can Gamma export to PowerPoint or Google Slides?",
        "a": "The share menu offers PDF, PowerPoint, Google Slides and images. In the video the Google Slides export did not work, so a PDF was used."
      },
      {
        "q": "Can Gamma turn a presentation into a website?",
        "a": "Yes. The video converts the deck to a site and publishes it, but publishing to a custom domain needs a paid plan."
      }
    ]
  },
  "C5wEcJRo_VA": {
    "searchTitle": "Pi coding agent test: npm install, OpenRouter and models",
    "summary": "Install the open-source Pi terminal coding agent with one npm command, connect it to OpenRouter with an API key and run a site audit on a real project. The test runs into slow models, a negative OpenRouter balance and a rate limit error on Gemma 4.",
    "whatYouBuild": "Nothing is built from scratch. The video shows Pi installed, connected to OpenRouter and Google Cloud Code Assist, and used to start a technical SEO audit on an existing SaaS project.",
    "toolsUsed": [
      "Pi",
      "npm",
      "OpenRouter",
      "OpenCode",
      "Google Cloud Code Assist"
    ],
    "keySteps": [
      {
        "seconds": 25,
        "step": "Run the one-line npm install command in the terminal, then start Pi with the pi command."
      },
      {
        "seconds": 90,
        "step": "Type login, choose API key, and paste in a new OpenRouter API key."
      },
      {
        "seconds": 147,
        "step": "Pick a model from the OpenRouter list, which includes Kimi, DeepSeek, Gemma, Llama and others."
      },
      {
        "seconds": 329,
        "step": "Ask Pi to run a full site audit from the project folder and use an installed SEO skill."
      },
      {
        "seconds": 367,
        "step": "Run the session command to see messages sent, tokens used and total cost."
      },
      {
        "seconds": 404,
        "step": "Use login with the subscription option to connect accounts such as Claude Pro or Max and GitHub Copilot."
      },
      {
        "seconds": 438,
        "step": "Authenticate Google Cloud Code Assist in the browser, then add OpenRouter credits and turn on auto top up."
      }
    ],
    "notCovered": [
      "The site audit is never finished, so the quality of Pi's fixes is not shown.",
      "Extensions, packages and themes are mentioned from the website but not built or installed in the video.",
      "The OpenCode comparison is a quick impression, not a measured speed or cost test."
    ],
    "qa": [
      {
        "q": "How do you install Pi?",
        "a": "Run the one-line npm install command from pi.dev in your terminal, then type pi to open the command line interface."
      },
      {
        "q": "Can Pi use a Claude or Copilot subscription instead of API credits?",
        "a": "Yes. The login command has a use subscription option that lists Anthropic Claude Pro or Max, GitHub Copilot, Antigravity Gemini and Google Cloud Code Assist."
      },
      {
        "q": "Does Pi work with free models on OpenRouter?",
        "a": "The video selects a free Gemma 4 model and it starts running, but it later returns a temporarily rate limited error, so the creator switches to a paid low-cost model."
      }
    ]
  },
  "HlPdlZh0AHM": {
    "searchTitle": "OpusClip clone with OpenCode: build a shorts web app",
    "summary": "Use OpenCode to scaffold Short Forge, a local web app that turns long YouTube videos into shorts like OpusClip, using Clerk, Prisma, Postgres and FFmpeg. The app is still a work in progress at the end, and no finished clips are shown.",
    "whatYouBuild": "A local MVP web app called Short Forge with Clerk sign-up, a three tier pricing page and YouTube URL import, which is not yet producing clips by the end.",
    "toolsUsed": [
      "OpenCode",
      "Claude Desktop",
      "Clerk",
      "Prisma",
      "PostgreSQL",
      "Google Cloud Console"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Write a detailed build prompt in Claude Desktop and paste it into OpenCode to scaffold the project."
      },
      {
        "seconds": 87,
        "step": "Let OpenCode generate the worker files for video import and rendering, plus the API routes."
      },
      {
        "seconds": 286,
        "step": "Fill in the .env file with a Google Cloud client that has the YouTube Data API enabled, an OpenAI API key and Clerk keys."
      },
      {
        "seconds": 348,
        "step": "Run npm run dev and paste build errors back into OpenCode until the app loads on port 3000."
      },
      {
        "seconds": 534,
        "step": "Sign up through Clerk and view the three tier pricing page, where the subscribe buttons do not work yet."
      },
      {
        "seconds": 689,
        "step": "Create the Postgres user and database from the terminal and restart Postgres so the dashboard loads."
      },
      {
        "seconds": 799,
        "step": "Replace S3 with a local storage folder so imported YouTube videos download to the machine."
      }
    ],
    "notCovered": [
      "No finished short clip is generated or shown.",
      "The payment checkout is not working or configured.",
      "Deploying the app publicly is mentioned as an idea but not shown."
    ],
    "qa": [
      {
        "q": "What does the OpusClip-style app need to run?",
        "a": "The generated app asks for an OpenAI API key for Whisper transcription, a Google Cloud client for the YouTube Data API, Clerk keys and a Postgres database."
      },
      {
        "q": "How long did the first version take to build?",
        "a": "The video says the minimal viable product took about 15 minutes to build in OpenCode. More time followed fixing build and database errors."
      },
      {
        "q": "Why did the YouTube import stall?",
        "a": "The app was set to store videos in Amazon S3, which was not configured. OpenCode then switched storage to a local folder on the machine."
      }
    ]
  },
  "KLuU0Yxu9g4": {
    "searchTitle": "Scrape Klook hotels with Apify Agent Skills in Claude Code",
    "summary": "Install Apify Agent Skills into Claude Code and use them to scrape Klook for luxury hotels in Koh Samui for a travel website. The first run returned unrelated Walt Disney World results, and prices came back empty until check-in dates were added.",
    "whatYouBuild": "A JSON file of Koh Samui hotel listings scraped from Klook to update a hotel directory website built with AI coding tools.",
    "toolsUsed": [
      "Apify",
      "Apify Agent Skills",
      "Claude Code",
      "Visual Studio Code",
      "Playwright",
      "Klook"
    ],
    "keySteps": [
      {
        "seconds": 42,
        "step": "Browse the Apify Store, which the video says has about 19,000 actors for sites like Google Maps, TikTok and TripAdvisor."
      },
      {
        "seconds": 112,
        "step": "Install the skills with the one-line npx skills add command from the Apify Agent Skills GitHub page."
      },
      {
        "seconds": 141,
        "step": "Ask Claude Code to scrape Klook for four and five star hotels in Koh Samui, which starts the ultimate scraper skill and searches the store for an actor."
      },
      {
        "seconds": 286,
        "step": "Pass the direct Klook accommodation URL after the first search returned Walt Disney World results."
      },
      {
        "seconds": 330,
        "step": "Review an earlier JSON scrape of 140 plus hotels to see the kind of output the website uses."
      },
      {
        "seconds": 581,
        "step": "Let Claude Code write a custom Playwright scraper that captures Klook's hotel API and scrolls to load more results, saving about 49 hotels."
      },
      {
        "seconds": 763,
        "step": "Rescrape with check-in dates in the URL because the first results had empty price fields."
      }
    ],
    "notCovered": [
      "The final rescrape with prices is not shown finishing.",
      "Adding the new data to the website and setting up Travelpayouts affiliate links are discussed but not done.",
      "Exact Apify credit costs are not given beyond a rough few cents for this run."
    ],
    "qa": [
      {
        "q": "How do I install Apify Agent Skills for Claude Code?",
        "a": "Run the one-line npx skills add command shown on the Apify Agent Skills GitHub page in your terminal. The skills then appear inside Claude Code."
      },
      {
        "q": "What if there is no Apify actor for the site I want to scrape?",
        "a": "In the video, Claude Code wrote its own Playwright scraper that intercepted Klook's API responses when no suitable actor worked."
      },
      {
        "q": "Why were hotel prices missing from the Klook scrape?",
        "a": "The page returned empty price fields, which likely needs check-in dates. Claude Code offered to add dates to the URL and rescrape."
      }
    ]
  },
  "LqRRXcM8Kxc": {
    "searchTitle": "Kimi K2.7 Code test in OpenCode vs DeepSeek V4 Pro",
    "summary": "Test Moonshot AI's Kimi K2.7 Code inside OpenCode by running a full site audit and then applying the fixes, while tracking cost against DeepSeek V4 Pro. It used credits much faster and hit the OpenCode Go monthly limit before the fixes were finished.",
    "whatYouBuild": "Nothing is built from scratch. The video shows Kimi K2.7 Code auditing a real website codebase and starting to apply SEO fixes.",
    "toolsUsed": [
      "Kimi K2.7 Code",
      "OpenCode",
      "DeepSeek V4 Pro",
      "BridgeBench"
    ],
    "keySteps": [
      {
        "seconds": 38,
        "step": "Review Moonshot AI's announcement, which claims about 30% lower token use on long tasks and around 10% better agentic results than K2.6."
      },
      {
        "seconds": 125,
        "step": "Install OpenCode and use the Go plan, which the recording says costs $5 for the first month and then $10 per month."
      },
      {
        "seconds": 172,
        "step": "Open the model list with /models in OpenCode and select Kimi K2.7 Code."
      },
      {
        "seconds": 225,
        "step": "Run a codebase-only site audit covering technical SEO, on-page SEO, content quality, authority and links."
      },
      {
        "seconds": 282,
        "step": "Tell the model to implement the fixes, including the www canonical change, robots.txt updates and a bulk script that made about 1,700 URL replacements in blog JSON files."
      },
      {
        "seconds": 338,
        "step": "Compare spending, with the audit alone costing close to half of what DeepSeek V4 Pro used the whole previous day."
      },
      {
        "seconds": 390,
        "step": "Hit the OpenCode Go monthly limit partway through the fixes, with a top-up in billing as the way to continue."
      }
    ],
    "notCovered": [
      "The video does not test whether the applied fixes broke anything or improved the site.",
      "DeepSeek V4 Pro is not run on the same audit, so the comparison is based on cost from a different day.",
      "BridgeBench results for Kimi K2.7 Code were not available yet at recording time."
    ],
    "qa": [
      {
        "q": "Is Kimi K2.7 Code cheaper to use than DeepSeek V4 Pro?",
        "a": "Not in this test. The site audit alone cost nearly half of a full day of DeepSeek V4 Pro use, and the presenter says he rarely hits limits with DeepSeek."
      },
      {
        "q": "How do I use Kimi K2.7 Code in OpenCode?",
        "a": "Type /models in OpenCode and select Kimi K2.7 Code, which is already built in. The video uses it through the OpenCode Go plan rather than the Moonshot API."
      },
      {
        "q": "What did Kimi K2.7 Code do well in the test?",
        "a": "The audit returned high impact and critical findings that the presenter called good. It also made about 1,700 URL replacements across blog JSON files quickly."
      }
    ]
  },
  "QMcaBMjZSMA": {
    "searchTitle": "HeyGen and Make.com automation: avatar videos to YouTube",
    "summary": "Connect HeyGen and Make.com so an OpenAI assistant writes a script, HeyGen renders it with a custom avatar and voice clone, and a second scenario uploads it to YouTube as unlisted. Videos came out at 720p, and a resolution error was bypassed by hardcoding the video ID.",
    "whatYouBuild": "Two Make.com scenarios, one that sends a topic to an OpenAI script assistant and creates a HeyGen avatar video, and one that downloads finished videos and uploads them to YouTube as unlisted.",
    "toolsUsed": [
      "HeyGen",
      "Make.com",
      "OpenAI Assistants",
      "YouTube"
    ],
    "keySteps": [
      {
        "seconds": 60,
        "step": "Create a hyperrealistic HeyGen avatar by uploading about 2 minutes of video footage."
      },
      {
        "seconds": 120,
        "step": "Clone a voice with instant voice cloning from about 2 minutes of audio and set it to multilingual."
      },
      {
        "seconds": 180,
        "step": "Set up a HeyGen script assistant on platform.openai.com with a script-writing prompt and file search over past video transcripts."
      },
      {
        "seconds": 240,
        "step": "Build a two-module Make.com scenario that messages the assistant with a topic and passes the script to HeyGen."
      },
      {
        "seconds": 300,
        "step": "Choose the avatar ID, normal style, the cloned voice and a friendly emotion, turn off test mode and generate the video."
      },
      {
        "seconds": 420,
        "step": "A second scenario watches for new HeyGen videos, downloads the file with an HTTP request and uploads it to YouTube as unlisted."
      },
      {
        "seconds": 420,
        "step": "After a resolution not allowed error, hardcode the video ID so the upload goes through."
      }
    ],
    "notCovered": [
      "The Airtable topic list that would make the process run daily is suggested but not built.",
      "The cause of the resolution not allowed error is not explained.",
      "Removing the HeyGen watermark is not shown."
    ],
    "qa": [
      {
        "q": "How much footage does a HeyGen avatar and voice clone need?",
        "a": "About 2 minutes of video for the avatar and about 2 minutes of audio for the voice clone, as stated in the recording."
      },
      {
        "q": "Can Make.com create 1080p HeyGen videos?",
        "a": "In the recording, Make.com could only create 720p videos, even on a paid HeyGen plan."
      },
      {
        "q": "Is the YouTube upload fully automatic?",
        "a": "The video is uploaded as unlisted, and the title and description still need manual edits. Feeding topics from Airtable is suggested as a next step but not built."
      }
    ]
  },
  "YdvngsXEqo8": {
    "searchTitle": "Ghostty terminal setup on Debian: install and themes",
    "summary": "Install the Ghostty terminal on Debian with apt, then style it with a web config tool and reload the config file. In the video, Ghostty uses about 270 MB of memory against 1.7 GB for Konsole, a single comparison on one machine with similar tabs open.",
    "whatYouBuild": "You end up with Ghostty installed on Debian with a custom color theme, cursor colors, font size and saved window state in its config file.",
    "toolsUsed": [
      "Ghostty",
      "apt",
      "Konsole",
      "Codex",
      "Hermes Agent"
    ],
    "keySteps": [
      {
        "seconds": 47,
        "step": "Open the download page on ghostty.org and choose the package manager option for your Linux distro."
      },
      {
        "seconds": 96,
        "step": "Run sudo apt install ghostty on Debian, which here reported version 1.3.1 already installed."
      },
      {
        "seconds": 157,
        "step": "Pick a theme in the Ghostty config web tool, preview it, and copy the settings from the import and export section."
      },
      {
        "seconds": 198,
        "step": "Right-click to open the config file, paste the settings, adjust cursor, window and font options, then use reload config."
      },
      {
        "seconds": 272,
        "step": "Compare memory use of Ghostty and Konsole with a similar number of tabs open."
      },
      {
        "seconds": 318,
        "step": "Optionally ask Hermes Agent to read the Ghostty docs and suggest improvements to the config."
      }
    ],
    "notCovered": [
      "Installing on macOS and building from source are mentioned but not shown.",
      "The Hermes Agent config suggestions are started but the final result is not shown.",
      "CPU use is described as lower but not measured on screen."
    ],
    "qa": [
      {
        "q": "How do you install Ghostty on Debian?",
        "a": "Run sudo apt install ghostty. The download page on ghostty.org lists package manager commands for other distros such as Alpine and Arch."
      },
      {
        "q": "How do you change the Ghostty theme?",
        "a": "Choose a theme in the Ghostty config web tool, copy the settings from import and export, paste them into your config file and use reload config from the right-click menu."
      },
      {
        "q": "Does Ghostty use less memory than Konsole?",
        "a": "In this test Konsole used about 1.7 GB and Ghostty about 270 MB with almost the same number of tabs open, as stated in the recording."
      }
    ]
  },
  "ZKpr-vmz_iY": {
    "searchTitle": "SEO agent skills in Kilo Code: install and run site fixes",
    "summary": "Install free open source agent skills from GitHub with npx skills add, then run SEO skills in Kilo Code for image optimization, Core Web Vitals, IndexNow, schema and Search Console checks. A PageSpeed retest after the fixes showed about the same score, with Core Web Vitals still failing.",
    "whatYouBuild": "Nothing is built from scratch. The video shows installed skills auditing and fixing the Tube Analytics site and generating an IndexNow script that submits its pages to Bing.",
    "toolsUsed": [
      "skills CLI (npx skills)",
      "Kilo Code",
      "OpenCode",
      "Google PageSpeed Insights",
      "IndexNow"
    ],
    "keySteps": [
      {
        "seconds": 25,
        "step": "Run npx skills add and select skills with the space bar."
      },
      {
        "seconds": 82,
        "step": "Choose Claude Code and Kilo Code as targets, install globally and pick symlink."
      },
      {
        "seconds": 138,
        "step": "Run the image optimization skill, which flags a large avatar, images missing width and height, and no images in the sitemap."
      },
      {
        "seconds": 164,
        "step": "Run the Core Web Vitals skill to fix LCP, CLS and INP issues."
      },
      {
        "seconds": 522,
        "step": "Run the generated IndexNow script with npx tsx to submit all URLs to Bing."
      },
      {
        "seconds": 706,
        "step": "Run the Google Search Console skill and ask it for a monitoring script, since it has no direct Search Console access."
      },
      {
        "seconds": 786,
        "step": "Retest in PageSpeed Insights, where speed is about the same and desktop scores 97."
      }
    ],
    "notCovered": [
      "There is no IndexNow equivalent shown for Google search.",
      "The video does not find out why the Core Web Vitals fixes made no difference.",
      "The Search Console monitoring script is not shown running."
    ],
    "qa": [
      {
        "q": "How do you install these agent skills?",
        "a": "Run npx skills add, pick skills with the space bar, choose the agents to install into, then choose global or project scope and symlink or copy."
      },
      {
        "q": "Can you use the skills without Claude Code credits?",
        "a": "Yes. The skills were also installed in Kilo Code and OpenCode, and Kilo Code was used while the Claude Code weekly limit was maxed out."
      },
      {
        "q": "Did the skills improve page speed?",
        "a": "Not in this test. The retest showed about the same speed and a failing Core Web Vitals assessment, with desktop at 97 out of 100."
      }
    ]
  },
  "bCsSqZp0yVg": {
    "searchTitle": "vidIQ MCP in Claude Desktop: YouTube channel audit test",
    "summary": "Connect the vidIQ MCP server to the Claude Desktop app and use it to validate a video idea, audit a YouTube channel and run a competitor breakdown with real channel data. In the test, the first health check pulled the wrong channel until the channel ID was pasted in.",
    "whatYouBuild": "Nothing is built from scratch. The video shows Claude Desktop using the vidIQ MCP to audit the AI Automation Station channel and compare it with others in its niche.",
    "toolsUsed": [
      "vidIQ MCP",
      "Claude Desktop",
      "vidIQ",
      "YouTube"
    ],
    "keySteps": [
      {
        "seconds": 81,
        "step": "Click the plus icon in Claude Desktop, choose add a connector and enter the vidIQ MCP server URL."
      },
      {
        "seconds": 125,
        "step": "Run the video idea validation prompt, which does keyword research and checks outlier and trending results."
      },
      {
        "seconds": 172,
        "step": "Ask for a full channel audit to see subscribers, views, upload cadence and view velocity after publishing."
      },
      {
        "seconds": 264,
        "step": "Review the example prompts and tools on the vidIQ MCP page, such as keyword research, outlier detection and breakout channels."
      },
      {
        "seconds": 312,
        "step": "Run a channel health check, which returned the wrong channel on the first try."
      },
      {
        "seconds": 342,
        "step": "Paste the channel ID into a competitor breakdown prompt to get the growth trajectory, a 30-day snapshot and keyword opportunities."
      },
      {
        "seconds": 521,
        "step": "Read the per-video notes, where a video promoted with paid YouTube ads was flagged as looking seeded."
      }
    ],
    "notCovered": [
      "The MCP server URL is not read out in the narration.",
      "The video does not say whether the MCP needs a paid vidIQ plan.",
      "Setup in Cursor, ChatGPT or Codex is mentioned but not shown."
    ],
    "qa": [
      {
        "q": "How do you add the vidIQ MCP to Claude Desktop?",
        "a": "Click the plus icon, choose add a connector and enter the vidIQ MCP server URL. The video notes it will probably not appear in the default connector list."
      },
      {
        "q": "Which apps work with the vidIQ MCP?",
        "a": "The video says it works with Claude in the browser or desktop app, plus Cursor, ChatGPT, Codex and other MCP clients. Only Claude Desktop is shown."
      },
      {
        "q": "How much does vidIQ cost?",
        "a": "As stated in the recording, vidIQ paid plans start at $19 per month. The video does not say which plan the MCP requires."
      }
    ]
  },
  "c_WK6TImkNQ": {
    "searchTitle": "Cline tutorial: free AI coding agent in the CLI and IDE",
    "summary": "Install Cline with npm or as an extension in Google Antigravity, then use a free Xiaomi model to run GEO and schema passes on a live blog without spending credits. The video warns that running several Cline tasks in parallel is fairly CPU intensive.",
    "whatYouBuild": "Nothing is built from scratch. The video shows Cline running GEO and metadata updates on the blog of an existing SaaS site and pushing the changes to GitHub.",
    "toolsUsed": [
      "Cline",
      "Google Antigravity",
      "ChatGPT Codex",
      "GitHub"
    ],
    "keySteps": [
      {
        "seconds": 43,
        "step": "Install the Cline command line tool globally with npm i -g cline."
      },
      {
        "seconds": 68,
        "step": "Run Cline from the terminal, which opens a local web interface where new tasks can be started."
      },
      {
        "seconds": 128,
        "step": "In Google Antigravity, search for Cline in the extensions panel and install it to use it inside the IDE."
      },
      {
        "seconds": 186,
        "step": "Pick a free model, here one by Xiaomi that uses no credits, instead of paid models like Claude Sonnet or Gemini."
      },
      {
        "seconds": 244,
        "step": "Ask Cline to review recent blog changes and optimize the articles for GEO and schema."
      },
      {
        "seconds": 337,
        "step": "For a first project, copy the to-do app prompt from the Cline quick start guide and run it in a new folder."
      },
      {
        "seconds": 431,
        "step": "Cline finishes the GEO pass, refreshes metadata and author date signals, and pushes the changes to GitHub."
      }
    ],
    "notCovered": [
      "The video does not measure whether the GEO changes improve visibility in AI search results.",
      "The free Xiaomi model is not compared with paid models for output quality.",
      "The to-do app quick start is shown in the docs but not actually built."
    ],
    "qa": [
      {
        "q": "Is Cline free to use?",
        "a": "Cline can be used without adding credits by choosing a free model. The video uses a Xiaomi model that does not use any credits."
      },
      {
        "q": "How do you install Cline?",
        "a": "Run npm i -g cline in a terminal for the command line version. It can also be installed as an extension in VS Code, Google Antigravity, Cursor or Windsurf."
      },
      {
        "q": "Can Cline run several tasks at once?",
        "a": "Yes, the video starts several tasks in parallel. It notes that they are fairly CPU intensive and will put a computer through its paces."
      }
    ]
  },
  "iVI11AZvUdk": {
    "searchTitle": "Hermes Agent cron jobs tutorial: schedule AI tasks",
    "summary": "Set up scheduled cron jobs in the Hermes Agent desktop app, then use Codex to move two SEO report jobs onto Vercel cron with weekly email reports. Local jobs need the computer to stay awake, and the desktop app used heavy CPU and memory in the test.",
    "whatYouBuild": "A broken link checker and a weekly blog performance digest that run as Vercel cron jobs and email reports through Resend.",
    "toolsUsed": [
      "Hermes Agent",
      "OpenCode",
      "Codex",
      "Vercel",
      "Resend",
      "GitHub"
    ],
    "keySteps": [
      {
        "seconds": 98,
        "step": "Install or update Hermes Agent with the one-line curl command from the Hermes website, or download it for macOS or Windows."
      },
      {
        "seconds": 166,
        "step": "Run the Hermes setup wizard to connect models and gateways, then launch the desktop app with the hermes desktop command."
      },
      {
        "seconds": 233,
        "step": "Switch existing cron jobs that hit API limits to the Big Pickle model, with DeepSeek V4 Pro as the fallback, and run a job manually."
      },
      {
        "seconds": 286,
        "step": "Ask Hermes which cron jobs to create for the business and have it build a broken link checker and a blog performance digest."
      },
      {
        "seconds": 361,
        "step": "Open the generated Python scripts in the desktop app and let Hermes connect a Resend API key for email reports."
      },
      {
        "seconds": 545,
        "step": "Switch to Codex, which adds the jobs as cron routes in vercel.json so they run on the server instead of the laptop."
      },
      {
        "seconds": 675,
        "step": "Add Google Search Console traffic per blog article to the digest, push to GitHub and let Vercel deploy the weekly schedules."
      }
    ],
    "notCovered": [
      "The video does not show a finished email report arriving in the inbox.",
      "Pausing and resuming jobs is not demonstrated step by step even though a chapter is named for it.",
      "Setting up the Google Search Console connection and its credentials is not shown."
    ],
    "qa": [
      {
        "q": "Do Hermes Agent cron jobs run when my computer is off?",
        "a": "Not when they run locally. The video says the computer must stay open and awake, which is why the SEO jobs were moved to Vercel cron on the server."
      },
      {
        "q": "Can I run a Hermes cron job right away instead of waiting for the schedule?",
        "a": "Yes. The video tells Hermes to run a job immediately, and the Vercel cron jobs also have a run button."
      },
      {
        "q": "Should I use the Hermes desktop app or the terminal?",
        "a": "The video uses the desktop app for ease, but notes it maxed out the CPU and used a lot of memory. The presenter recommends the terminal in most cases."
      }
    ]
  },
  "mmiQaVfA5e0": {
    "searchTitle": "ZCode walkthrough: run GLM 5.2 in the official desktop app",
    "summary": "Install ZCode, the official desktop app from Z.ai, and run GLM 5.2 on an existing project with plugins, skills, a built-in terminal and browser, and usage tracking. The test stays on the free plan, which the recording says includes 5 million GLM tokens per day.",
    "whatYouBuild": "Nothing is built from scratch. The video shows ZCode suggesting features for and starting a code review of the existing Tube Analytics project.",
    "toolsUsed": [
      "ZCode",
      "GLM 5.2",
      "OpenCode",
      "BridgeBench"
    ],
    "keySteps": [
      {
        "seconds": 65,
        "step": "Download ZCode for macOS, Windows or Linux, here running on Debian."
      },
      {
        "seconds": 130,
        "step": "Compare the free plan with the three paid coding plans."
      },
      {
        "seconds": 195,
        "step": "Review changed files grouped by staged and unstaged edits, and open the built-in terminal and browser from the side panel."
      },
      {
        "seconds": 391,
        "step": "Set the model mode, thinking level and permission mode, and check daily credit use."
      },
      {
        "seconds": 457,
        "step": "Add plugins such as Superpowers and confirm existing skills were imported automatically."
      },
      {
        "seconds": 522,
        "step": "Turn on folder indexing and view total token usage across sessions."
      },
      {
        "seconds": 588,
        "step": "Start a new task that runs the code review plugin in ask before changes mode."
      }
    ],
    "notCovered": [
      "The finished feature suggestions and code review results are not shown.",
      "Turbo mode and the paid coding plans are not tested.",
      "Installation on macOS or Windows is not shown."
    ],
    "qa": [
      {
        "q": "Is ZCode free?",
        "a": "Yes, there is a free plan. As stated in the recording, it includes 5 million GLM tokens per day, and paid coding plans cost $16, $65 and $144 per month."
      },
      {
        "q": "Does ZCode run on Linux?",
        "a": "Yes. The video says it is available for macOS, Windows and Linux, and runs it on Debian."
      },
      {
        "q": "Why use ZCode instead of GLM 5.2 in OpenCode?",
        "a": "The video says the desktop app makes GLM 5.2 easier for people who are not comfortable in the terminal. It also shows sub-agents and file edits in a side panel."
      }
    ]
  },
  "mtpX58dNfCE": {
    "searchTitle": "Apify agent skills tutorial: scrape leads in Cursor",
    "summary": "Install the Apify agent skills globally with npm, add an Apify token to a .env file, and run them through OpenCode in Cursor to scrape AI startups in San Francisco and then pull their emails. The first Google Maps run returned no email addresses, so a second contact info scraper skill was needed.",
    "whatYouBuild": "A CSV lead list of AI startups in San Francisco from Google Maps, plus a second CSV with email addresses scraped from their websites.",
    "toolsUsed": [
      "Apify",
      "Apify agent skills",
      "Cursor",
      "OpenCode",
      "npm"
    ],
    "keySteps": [
      {
        "seconds": 81,
        "step": "Copy the npm install command from the Apify agent skills GitHub repository and run it in the terminal to install the skills globally."
      },
      {
        "seconds": 121,
        "step": "Select all 12 skills with the spacebar, choose Cursor as the target, and accept the optional find skills skill."
      },
      {
        "seconds": 215,
        "step": "Create a new project folder in Cursor, open OpenCode in the terminal and ask it to list the agent skills it can use."
      },
      {
        "seconds": 302,
        "step": "Create a .env file with your Apify API token after the lead generation skill reports that no token was found."
      },
      {
        "seconds": 378,
        "step": "Ask the lead generation skill to find AI startups in San Francisco and save them to a CSV file."
      },
      {
        "seconds": 453,
        "step": "Watch the Google Maps scraper run and its results in the Apify console."
      },
      {
        "seconds": 569,
        "step": "Ask for a skill to extract emails from the startup list, which runs the contact info scraper and writes the emails to a new CSV."
      }
    ],
    "notCovered": [
      "The video does not check whether the scraped email addresses are accurate or deliverable.",
      "Running the skills inside Claude Code is only described, not demonstrated end to end.",
      "Apify pricing is only estimated in passing, so actual costs for larger runs are not shown."
    ],
    "qa": [
      {
        "q": "How do you install the Apify agent skills?",
        "a": "Run the npm command from the Apify agent skills GitHub repository in a terminal, select the skills you want, and choose the editor to install them for. The video installs all 12 skills globally for Cursor."
      },
      {
        "q": "Do the Apify skills need an API token?",
        "a": "Yes. The lead generation skill failed with no token found until an .env file containing the Apify API token was added to the project."
      },
      {
        "q": "Does the Google Maps scrape include email addresses?",
        "a": "No. The Google Maps results had company names and websites but no emails, so a contact info scraper skill was run on the websites to collect them."
      }
    ]
  },
  "q4-LkuMDkIE": {
    "searchTitle": "Claude SEO skill test: audit and fixes in Claude Code",
    "summary": "Install the free Claude SEO skill with one curl command and run its audit, SaaS plan, image audit and GEO analysis commands on TubeAnalytics.net inside Claude Code. The run used up the Claude Pro usage limit twice in about 20 minutes, and the full audit was interrupted.",
    "whatYouBuild": "An SEO plan and a set of code edits for the TubeAnalytics.net site, covering canonical URLs, title tags, 404 pages, the sitemap and robots file, plus image SEO and GEO reports.",
    "toolsUsed": [
      "Claude SEO",
      "Claude Code",
      "OpenCode",
      "VS Code",
      "GitHub",
      "Gemini"
    ],
    "keySteps": [
      {
        "seconds": 24,
        "step": "Run the one line curl command from the Claude SEO GitHub page to install the skill files, sub agents and Python dependencies."
      },
      {
        "seconds": 74,
        "step": "Open Claude Code and type a slash to see the new SEO commands."
      },
      {
        "seconds": 85,
        "step": "Run the SEO audit command on the site URL, which fetches pages, robots.txt and the sitemap with sub agents."
      },
      {
        "seconds": 231,
        "step": "Interrupt the audit and run the SEO plan command with SaaS as the business type to get a strategy based on the audit data."
      },
      {
        "seconds": 408,
        "step": "Approve the suggested critical fixes so Claude edits files such as layout.tsx to fix canonicals, title tags and 404 errors."
      },
      {
        "seconds": 691,
        "step": "Let it rewrite the sitemap and robots file to remove low value pages."
      },
      {
        "seconds": 793,
        "step": "Run a GEO analysis in a second Claude instance to check AI crawler access, llms.txt and content citability."
      }
    ],
    "notCovered": [
      "No rankings, traffic or indexing results are shown after the changes.",
      "The edits are approved without being reviewed in detail, and the video says it is unsure what one change did.",
      "Connecting the site to Google Search Console is mentioned but not completed."
    ],
    "qa": [
      {
        "q": "How do you install Claude SEO?",
        "a": "Run the single curl command from the Claude SEO GitHub repository in a terminal. It installs the skill files, sub agents and Python dependencies in a few seconds."
      },
      {
        "q": "Does Claude SEO use a lot of Claude Code usage?",
        "a": "Yes, in this test. On Claude Pro with Sonnet 4.6 the usage limit was hit early, then reached 65 percent in about 20 minutes and 98 percent before reset."
      },
      {
        "q": "What commands does Claude SEO include?",
        "a": "The video uses the audit, plan, image and GEO commands, and the GitHub page also lists sitemap generation among others."
      }
    ]
  },
  "rZh4zVT2LKY": {
    "searchTitle": "Open Design walkthrough: local Claude Design alternative",
    "summary": "Clone and install Open Design with pnpm, then generate a SaaS analytics dashboard locally through OpenCode instead of Claude Design. The generated tabs are previewed and offered as a zip download, but the video does not show them implemented in a real codebase.",
    "whatYouBuild": "You build a dense analytics dashboard prototype in Open Design, then extend it with extra tabs using the Claude Anthropic design system and OpenCode as the generator.",
    "toolsUsed": [
      "Open Design",
      "OpenCode",
      "pnpm",
      "Claude Code"
    ],
    "keySteps": [
      {
        "step": "Clone the Open Design repository in the terminal and run pnpm install."
      },
      {
        "step": "In setup, choose which local command-line tool runs the generations, such as OpenCode, Claude Code, Codex or Pi, or add API keys instead."
      },
      {
        "step": "Create a prototype, pick a design system or free form, and optionally import a Claude Design zip file."
      },
      {
        "step": "Attach the SaaS analytics dashboard template and send a prompt to generate a dense analytics dashboard."
      },
      {
        "step": "Browse the built-in example designs, design.md files such as Airbnb, and image templates."
      },
      {
        "step": "Ask Open Design to build the remaining dashboard tabs, then download the result as a zip from the share menu."
      }
    ],
    "notCovered": [
      "Deploying to Vercel from Open Design is mentioned but not shown.",
      "Implementing the zip in a codebase with Claude Code is described, not performed in the video.",
      "Quality differences between Open Design and Claude Design are not tested side by side."
    ],
    "qa": [
      {
        "q": "Does Open Design need Claude credits?",
        "a": "No. It runs through command-line tools on your machine, and in the video it uses OpenCode, so no Claude, Gemini or Codex credits are used."
      },
      {
        "q": "Which tools can Open Design use to generate designs?",
        "a": "The setup screen lists local command-line tools such as Claude Code, Codex, Cursor, Gemini, OpenCode and Pi, plus API keys for Anthropic, OpenAI, Azure and Google Gemini."
      },
      {
        "q": "How do you use an Open Design result in your own site?",
        "a": "Download the design as a zip from the share menu, then ask a coding agent such as Claude Code to implement the design changes from that zip."
      }
    ]
  },
  "ud2su6XhtKw": {
    "searchTitle": "OpenCode walkthrough: adding Stripe billing to a SaaS app",
    "summary": "Use OpenCode in the terminal to add a Stripe subscription system to the TubeAnalytics.net SaaS app, with Gemini Code Assist for quick fixes and PM2 to keep the app running. The build fails along the way on a Prisma schema issue and missing Stripe dependencies, which OpenCode then fixes.",
    "whatYouBuild": "A Stripe subscription and billing system for TubeAnalytics.net, with a pricing page, a checkout success page, a billing invoices page and an environment variable setup file.",
    "toolsUsed": [
      "OpenCode",
      "VS Code",
      "Gemini Code Assist",
      "Stripe",
      "PM2",
      "Prisma"
    ],
    "keySteps": [
      {
        "seconds": 50,
        "step": "Review the landing page redesigned with OpenCode, with plans from $19 to $149 per month as stated in the recording."
      },
      {
        "seconds": 92,
        "step": "Paste the subscription and billing prompt from a master prompt written in Claude into OpenCode to add Stripe models and a pricing page."
      },
      {
        "seconds": 153,
        "step": "Install OpenCode with a one-line curl command and run it in the terminal."
      },
      {
        "seconds": 259,
        "step": "Fix a missing module import with the Gemini Code Assist extension in VS Code."
      },
      {
        "seconds": 305,
        "step": "Google Cloud Console approves Google OAuth after the branding and privacy policy checks."
      },
      {
        "seconds": 392,
        "step": "OpenCode creates an env setup file for the Stripe keys, which should be added to the ignore file."
      },
      {
        "seconds": 460,
        "step": "OpenCode regenerates the Prisma client, installs the missing Stripe dependencies and fixes the build errors."
      }
    ],
    "notCovered": [
      "No real Stripe checkout or payment is tested.",
      "The start free trial button does not work because the sign-up page is not connected.",
      "The OpenCode extension in VS Code could not find the opencode command, and that is not fixed."
    ],
    "qa": [
      {
        "q": "Is OpenCode free?",
        "a": "The recording says it seems essentially free because no API keys had to be connected. It is used here while Claude Code credits are waiting to reset."
      },
      {
        "q": "How do you install OpenCode?",
        "a": "Run the one-line curl command from opencode.ai, or install it with npm, bun or brew. It runs in the terminal, the browser or as an extension in VS Code, Google Antigravity or Cursor."
      },
      {
        "q": "Does the Stripe checkout work by the end of the video?",
        "a": "A working checkout is not shown. The video ends while OpenCode is still fixing build errors in the billing code."
      }
    ]
  },
  "wmjAyAth1Ug": {
    "searchTitle": "OpenClaw on Emergent: install Moltbot in the cloud",
    "summary": "Install OpenClaw, also called Moltbot, inside Emergent with its built in install script, sign in with Google, and open the OpenClaw control dashboard using a preconfigured Opus 4.5 model. Connecting WhatsApp did not work in the video, which showed a channel config schema unavailable error.",
    "whatYouBuild": "A published OpenClaw instance running on Emergent, with a basic assistant profile and a couple of skills installed, but no messaging channel connected.",
    "toolsUsed": [
      "Emergent",
      "OpenClaw",
      "Opus 4.5",
      "ClawHub",
      "WhatsApp"
    ],
    "keySteps": [
      {
        "seconds": 27,
        "step": "Click the Moltbot chip in Emergent and run the installation script, which sets up the runtime in the background."
      },
      {
        "seconds": 85,
        "step": "Let Emergent obtain the LLM key automatically instead of entering your own API key."
      },
      {
        "seconds": 141,
        "step": "Sign in with Google and choose the preconfigured Opus 4.5 option to start the OpenClaw control UI."
      },
      {
        "seconds": 260,
        "step": "Publish the server so it keeps running, which costs 50 credits per month as stated in the recording."
      },
      {
        "seconds": 314,
        "step": "Tell the assistant your name, its role, its vibe and your time zone so it updates its profile files."
      },
      {
        "seconds": 435,
        "step": "Install skills such as the Twitter skill from the skills list and browse more through ClawHub."
      }
    ],
    "notCovered": [
      "WhatsApp or Telegram is never successfully connected, so the assistant is not shown working through a messaging app.",
      "The video does not show how many credits the free plan includes or what happens when they run out.",
      "The security benefit of running on Emergent is stated but not tested or explained in detail."
    ],
    "qa": [
      {
        "q": "Do you need an API key to run OpenClaw on Emergent?",
        "a": "Not in the video. Emergent obtained the LLM key automatically and offered a preconfigured Opus 4.5 option, although you can also use your own Claude or GPT key."
      },
      {
        "q": "How much does it cost to keep OpenClaw running on Emergent?",
        "a": "Emergent says the server shuts down after inactivity unless published, and publishing costs 50 credits per month as stated in the recording."
      },
      {
        "q": "Can you connect WhatsApp to OpenClaw on Emergent?",
        "a": "The video tries but does not finish. The channels page showed a channel config schema unavailable error, and the QR code login was left to figure out later."
      }
    ]
  },
  "yR-zoMUY27Q": {
    "searchTitle": "OpenCode skill tutorial: auto-trim videos into Shorts",
    "summary": "Build a custom OpenCode skill that transcribes a long video with Faster Whisper, removes filler words and cuts a 16x9 highlight, then turns it into a 9x16 Short with animated subtitles. The first subtitle pass works but still needs bigger text and better animation.",
    "whatYouBuild": "A custom OpenCode skill called viral short cutter that trims a long video into a 1.5 to 2.5 minute 16x9 cut and can burn in animated subtitles.",
    "toolsUsed": [
      "OpenCode",
      "OpenCode Zen",
      "Faster Whisper",
      "Python"
    ],
    "keySteps": [
      {
        "seconds": 76,
        "step": "Prompt OpenCode to create a skill that turns a long video into a 1.5 to 2.5 minute 16x9 cut that starts on a hook and removes filler words."
      },
      {
        "seconds": 125,
        "step": "The skill's transcribe.py file uses Faster Whisper to output JSON with word-level timestamps and confidence scores."
      },
      {
        "seconds": 182,
        "step": "A second script of about 100 lines looks for compelling openings and lists filler words to cut."
      },
      {
        "seconds": 255,
        "step": "Running the skill on a 10-minute tutorial takes about five minutes of CPU processing and outputs a trimmed video of about a minute and a half."
      },
      {
        "seconds": 326,
        "step": "An existing Shorts skill converts the 16x9 trim into a 9x16 vertical Short in under 30 seconds."
      },
      {
        "seconds": 405,
        "step": "The pipeline detects where the talking head sits and stacks it below the screen share."
      },
      {
        "seconds": 463,
        "step": "OpenCode adds a subtitle script to the skill and burns animated captions into the middle of the Short."
      }
    ],
    "notCovered": [
      "The 9x16 Shorts conversion skill comes from an earlier tutorial and is not built in this video.",
      "Installing and configuring Faster Whisper is not shown.",
      "The video does not check whether the selected hooks perform better on YouTube."
    ],
    "qa": [
      {
        "q": "Does this OpenCode video skill cost anything to build?",
        "a": "The recording uses a free model in OpenCode Zen and says the build cost zero credits."
      },
      {
        "q": "How long does the trimming take?",
        "a": "Trimming a roughly 10-minute video took about five minutes of CPU processing, and the vertical Short conversion took under 30 seconds, as stated in the recording."
      },
      {
        "q": "What did the first test run produce?",
        "a": "It removed seven filler words, auto-detected a hook, selected five segments and output a 64-second 1920x1080 video of about 6 MB."
      }
    ]
  }
};

// Third-person rewrites of first-person YouTube description openers, for listing cards and meta descriptions.
export const listingSummaries = {
  "p_qQNolHR-c": "Generate and edit images with Google's Nano Banana in Gemini: text-to-image, reference image edits, free access options and a speed comparison.",
  "t0nQSyryTPg": "A tour of community demos made with GPT-6 Astra: exploding 3D models, a working V8 engine, browser racing games and a Counter-Strike 2 recreation.",
  "rMRsVyIsZCU": "Mike installs Open Design, a free Claude Design alternative, on Linux from source, fixes its Node and Corepack setup, connects a model with an API key, then uses it to make a motion design clip, a visual design system and an HTML slide deck from a YouTube link. The last chapter covers its pricing and credit use.",
  "-L0CVvJMzZI": "Behind the scenes of building TubeAnalytics, a YouTube analytics platform, in public.",
  "-cLECY10Tzg": "A look at Manus AI, which builds landing pages, apps and games, and its acquisition by Meta.",
  "-viL36QDF_8": "Gemini 3 tried on real tasks against ChatGPT: benchmark results, a no-code website, merch mockups, a landing page redesign and game demos.",
  "0jzTOUv_B04": "How TubeAnalytics outranks YouTube in AI search visibility by total AI citations, and the approach behind it.",
  "1TPm7B5oStw": "Connect ChatGPT to WhatsApp with a visual workflow tool to build a chatbot.",
  "1klc_1MxBdM": "Build an n8n automation that researches with Perplexity and posts to Facebook, LinkedIn and Twitter.",
  "2G5klyFz61E": "Build an AI search visibility tracker that shows a website's rankings across ChatGPT, Claude and Gemini.",
  "2pD_wqYHKlY": "Use Trakkr to check whether a website shows up in AI search results, and what affects AI visibility.",
  "3RPEo7PB7ug": "A look at Moltbook, a social network for AI agents, and the security problems it raises.",
  "3X2VU7EyaEU": "A walkthrough of GEO AEO Tracker, a free GitHub project that scores a site's visibility in ChatGPT, Gemini and other LLMs.",
  "4f9WR0T3vKQ": "A product demo of TubeAnalytics, covering YouTube analytics, competitor research and how it was built.",
  "4hwdzAiaybI": "Install the Claude SEO skill from GitHub with one curl command and run an SEO analysis of a WordPress site.",
  "4jK9RraWbiU": "A Make.com automation that pulls news from a Business Insider RSS feed and turns it into content.",
  "4sd4-9rC3As": "Use a Make.com automation to create faceless AI videos for any platform.",
  "4uNxh9FW6Ho": "Build and test an n8n workflow live, configuring each step of a voice agent flow.",
  "508QvEHI5n0": "Which AI skills are worth learning now: Make.com automation, faceless video tools, no-code web apps, and an AI agency compared with hiring a VA.",
  "6iFA7ds2PU4": "Launch a paid Skool community step by step: pricing plans and free trials, the discovery page, member engagement, settings and selling courses.",
  "8ieDSa8BVH4": "Build a Facebook Messenger bot in Make.com that replies with ChatGPT: developer app, page connection, webhooks, verification and going live.",
  "9DQYe6HywT8": "Build a conference workshop deck in Gamma step by step: set themes and visuals, generate slides, add comparison slides, then export and publish.",
  "9YueXsoNg80": "Generate Sora 2 videos inside n8n by connecting the OpenAI Sora 2 API, building a text-to-video pipeline and adding triggers.",
  "AO8NoHPU3e0": "A look at Claude Routines in Claude Code, a preview feature for automating tasks such as backlog work, PR reviews and event responses.",
  "C5wEcJRo_VA": "Install Pi, an open-source terminal coding agent, with a one-line npm command.",
  "CD2mLFgjiT8": "Build a chatbot for a Facebook page that replies to comments automatically.",
  "CGVALaueHeA": "A Make.com automation that scrapes popular YouTube channels with Apify, stores them in Airtable and uses ChatGPT to suggest similar video ideas.",
  "CfbMWB0G99E": "Build a client presentation in Gamma from a pasted coaching plan: pick audience, tone and theme, generate images, edit with AI and export to PDF.",
  "DB-9bW85TKY": "Install Hermes Agent with one curl command and schedule tasks to run hourly, daily, weekly or monthly.",
  "DbYip6KaNHo": "Connect DataForSEO's free MCP to Claude Code and use it to work on a site's SEO.",
  "DfyAAwHPJuU": "A tour of TubeAnalytics, a YouTube growth platform built with Claude Code, Gemini 3.1 and OpenCode.",
  "EECptdYND6k": "Set up, install and run Odysseus, the free open-source AI tool created by PewDiePie.",
  "FBlN3qWR9kg": "Get started with ChatGPT Images 2.0, OpenAI's latest image model, and see how it compares with NanoBanana Pro 2.",
  "GK7zjPm7G4A": "A breakdown of OpenAI's GPT-6 Sol and GPT-6 Luna announcement, covering pricing changes and the published benchmarks against Claude Opus 5 and Fable 5.1.",
  "HlPdlZh0AHM": "Build a free OpusClip-style editor with AI coding tools that cuts long videos into short clips.",
  "IlOJWfmlpGg": "Build a YouTube competitor analysis tool in Claude Code using Apify agent skills to collect channel data.",
  "KDZ7yefRv54": "Use Google NotebookLM to turn YouTube videos into detailed infographics.",
  "KEXgl3vsVMI": "What Skool's $9 a month Hobby plan includes and how it compares with the higher plans.",
  "KLuU0Yxu9g4": "Use Apify agent skills in Claude Code to scrape travel data for a travel agency website.",
  "LD2ef2uUauo": "Grok 4.5 is tested by building a live solar system app with real satellite data, then compared on efficiency, pricing and free limits.",
  "LoNsDme0XQI": "Get started with Kilo Code, an open-source coding agent available in VS Code, JetBrains and the command line.",
  "LqRRXcM8Kxc": "Moonshot AI's Kimi K2.7 Code is tested in OpenCode against DeepSeek V4 Pro and MiniMax 2.7.",
  "MABL6XZgy4g": "Redesign an AI agency website with Codex after an earlier vibe-coded version fell short.",
  "NoHkFvhbiuU": "Build a lead generation tool in Claude Code that finds website clients.",
  "OPQacEy41kM": "A tour of the free AI Automation Station community on Skool shortly after launch: tutorials, member engagement, the classroom and free resources.",
  "OUgxXuWG_wU": "Turn an existing stock tracking web app built on the Alpaca API into a desktop app using Hermes Agent and OpenCode.",
  "P7lbzDAb-qk": "A look at OpenAI's Sora 2 video model compared with Google Veo 3, with tips for better results.",
  "Qb6RG0-8O1k": "Switch from a Claude Pro subscription to Free Claude Code with OpenRouter free models and build a Next.js app for close to $0.",
  "QlL87_URHZ8": "Create images for free with Google Gemini 2.5 Flash Image, also called Nano Banana.",
  "R90zVHmoj7A": "An introduction to Make.com: build scenarios, use templates, connect Google Sheets and Airtable, handle errors and send emails from a spreadsheet.",
  "SLAnjvWK1Y4": "A 12-module Make.com automation that finds YouTube topics with Apify, writes scripts with ChatGPT, renders with JSON2Video and posts Shorts.",
  "UkYoSNiqa6o": "Build a Make.com workflow that researches company leads, writes a personalized email for each contact and sends it.",
  "ZKpr-vmz_iY": "Install and use free, open-source agent skills from GitHub in Claude Code.",
  "ZNuGmX1HpxM": "A full demo of the Cortex AI second brain system built in Claude, described in the video as a $25,000 build.",
  "Zi_PG07mDxo": "Build a desktop app for PewDiePie's Odysseus AI using Odysseus itself and DeepSeek V4 Pro, for under $1 in credits.",
  "ZlD4Z6UKS8o": "Build a website with three AI builders, Replit, Lovable and Orchids, then add calendars, chatbots, Stripe payments and a custom domain.",
  "_ikohuukGE4": "Build a landing page MVP in Google Antigravity within minutes, then review the first version.",
  "avgG3VtN2C4": "Claude Fable 5 runs a security review, a Stripe payment migration and funnel optimization on TubeAnalytics. Covers effort modes, sub-agents and credit limits.",
  "bCsSqZp0yVg": "Set up the vidIQ MCP in Claude Desktop and use it to research and optimize a YouTube channel.",
  "cfYpzY-o3fQ": "Set up and use OpenCode, a free open-source coding agent for the terminal that works with Claude, GPT and Gemini models.",
  "dEQ8OllsJmk": "A full n8n automation that takes videos from Google Drive to YouTube, with AI-generated transcripts, descriptions, tags and titles.",
  "dVC1Or0Tbo8": "Build an AI agent in Relay.app, from workflow setup to connecting AI tools.",
  "dVvazfQHhW4": "Use Hermes Agent to build a Python script that drafts LinkedIn posts from the latest YouTube videos, run daily by a cron job.",
  "e6JXdMh5Qz0": "Use Apify inside OpenCode to pull hotel data and build a luxury hotel booking website.",
  "e73WvglCLW0": "A live demo of an AI search visibility audit that checks how a website shows up in ChatGPT, Claude, Perplexity and Gemini.",
  "ffnMlBzcJOQ": "Set up an Alpaca account and build a simple trading bot with its API in under 15 minutes.",
  "fjTn95391rg": "Connect Fillout, Airtable and Make.com in about 15 minutes to collect market research and send follow-ups.",
  "ga22WZgoj9M": "Yes, for most cases. Mike recommends OpenCode as the best free coding agent he has found, after constant API request errors in Free Claude Code.",
  "uTcTJd5JaZU": "OpenAI Dots is an always-on AI agent ecosystem inside ChatGPT with its own cloud computer, announced at Dev Day 2026 alongside GPT 6.1 Sol.",
  "ghjmULTSj2Q": "A walkthrough of Kimi K3's coding performance and token pricing, and how to start using it inside OpenCode.",
  "h8KLzYPMjjE": "Claude Fable 5.1 is now public. This video covers its Enterprise Frontier Safeguards and tests it on a complex task: generating a detailed elevation map of Venus.",
  "i2na8YZI7KM": "Prompt Claude Code from the terminal to write SEO blog articles, using a YouTube thumbnail topic as the example.",
  "is7JIUfHsng": "An attempt to set up and deploy an OpenClaw personal assistant on Kilo AI.",
  "ix3C2JBFII8": "Make professional YouTube thumbnails with NanoBanana, without paid design tools or a designer.",
  "jB9hYQJGAuM": "Set up the free RTK plugin for Claude Code, which claims 60 to 95% savings in token usage.",
  "jtyWB5iGPOs": "Create a custom OpenCode skill that turns long-form videos into YouTube Shorts.",
  "kKiFzNW9fjw": "The Make.com setup, prompts and workflows behind an AI content machine that creates and repurposes content.",
  "kUbhr1QGYeU": "Build a custom AI operating system using Hermes Agent, OpenCode and Codex.",
  "kXw2yntdmo4": "A Make.com automation that scrapes leads from Apollo into a spreadsheet.",
  "kxp_dF6NEbg": "Ten custom AI skills for daily use, installed from a registry of over 600,000 skills that works with Codex, Claude Code, OpenCode, Hermes Agent and VS Code.",
  "limgGYHy6Jk": "Build a ManyChat chatbot that answers Facebook comments and DMs automatically.",
  "lumzbY6QV4Y": "A step-by-step introduction to OpenAI's Agent Builder, covering workflows and tool connections.",
  "m9VrHQHTMTE": "Install Coolify on a Linux server and deploy a self-hosted n8n instance with Docker.",
  "mkm8cz6dp8w": "Why Mike left the 9-to-5 in 2019 for Bali, Singapore and Thailand, and how six years on Koh Samui led to YouTube and teaching AI skills.",
  "mtpX58dNfCE": "Use Apify agent skills to scrape leads from Google Maps and collect emails from websites.",
  "n3NO40juUBo": "A redesign of the TubeAnalytics dashboard with new light and dark themes.",
  "nJtbBB0JBYY": "How Skool's new membership tiers work and how to use them to monetize a community.",
  "ncg6F27PYt0": "A first look at KiloCode, a free coding tool found on Reddit, covering its website, features and integrations.",
  "oP11zRs6628": "Connect n8n to an MCP server with Google Antigravity and use it to turn videos into LinkedIn posts, blog articles and tweets.",
  "pDbRjYYUjRI": "Generate a music track with Suno and process it through API calls in n8n to produce a music video.",
  "pDrMGahPnwc": "Use Otterly AI to track brand mentions across ChatGPT, Gemini and other LLMs.",
  "pYHt2qWvAr8": "A demo of a lead generation app for web agencies, edited with a custom Claude Code skill in under an hour.",
  "pwLLS6zFpKs": "Build a business second brain in Claude Code that answers from a knowledge base through a RAG system.",
  "q4-LkuMDkIE": "Set up Claude SEO, a skill in Claude Code, and run a technical SEO audit.",
  "quDDekuPQNI": "Set up BrowserAct, an AI web scraper, connect it to Claude Code, Codex, VS Code and Cursor, and use it to build a remote jobs listing site.",
  "qzIaEA0wBCw": "Track AI search visibility in ChatGPT, Claude, Gemini and Perplexity with Tracker, including competitor monitoring and its MCP for coding agents.",
  "rPhyYNMuDT4": "What changed in the n8n 2.0 beta and how to update a self-hosted n8n on a Hostinger VPS.",
  "rZh4zVT2LKY": "Set up OpenDesign, a Claude Design alternative that runs locally with Ollama and open-source models.",
  "s6004nmWG9g": "Pull targeted leads from Apollo, scrape them with Apify and automate the export in Make.com, instead of paying for lead lists.",
  "tzUhKKzwgyE": "Base44 and Lovable are compared to see which AI website builder holds up in real use.",
  "vmEac5CJcNQ": "Build a YouTube analytics web app with Claude Code, using Claude Opus 4.6 for planning and no hand-written code.",
  "vvDdXF2Yuz8": "Build a script in OpenCode that turns YouTube videos into LinkedIn posts in minutes.",
  "vxH102ZvjUg": "Install and set up Moltbot, formerly Clawdbot, as a personal AI assistant.",
  "wZ76glbPIPc": "Self-host n8n on Hostinger, from launching the VPS to installing and configuring n8n.",
  "w_MoA8lpWTg": "Continue building an OpusClip-style editor that turns long videos into multiple short clips.",
  "woyme-rVDGw": "GPT-5.6 is out, but most ChatGPT users cannot use it yet. This video explains who has access and what the limited rollout means for users and builders.",
  "xB0ChiVjWu4": "Build and deploy a landing page, a subscription starter plan and an AI answer generator with Morphic on Vercel.",
  "xlVDUw_rBXE": "Six practical n8n automations that combine AI models with workflow logic to cut manual work.",
  "yHaBYtUnzBg": "A first test of Claude Design from Anthropic Labs, making prototypes and slides.",
  "yR-zoMUY27Q": "Create a custom OpenCode skill that trims and edits videos for YouTube Shorts."
};
