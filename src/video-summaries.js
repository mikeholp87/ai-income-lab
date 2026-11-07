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
  },
  "Qb6RG0-8O1k": {
    "summary": "Cancel a Claude Pro subscription and run Claude Code through Free Claude Code, a GitHub proxy that sends its requests to NVIDIA NIM and OpenRouter models. The default NVIDIA model was slow, so the demo switches to Step 3.5 Flash on OpenRouter and starts a Next.js app, which is not finished by the end.",
    "whatYouBuild": "A local proxy setup that lets the Claude Code command line use free or cheap models, then the first files of a Next.js app that checks how visible a website is to AI search, planned from a CLAUDE.md file.",
    "toolsUsed": [
      "Free Claude Code",
      "NVIDIA NIM",
      "OpenRouter",
      "Claude Code",
      "Claude Desktop",
      "Next.js"
    ],
    "keySteps": [
      { "seconds": 71, "step": "Cancel the Claude Pro subscription in the billing settings." },
      { "seconds": 98, "step": "Clone Free Claude Code from GitHub and copy the example environment file." },
      { "seconds": 131, "step": "Create an NVIDIA NIM account and generate an API key for the free model endpoints." },
      { "seconds": 187, "step": "Generate an OpenRouter API key and add it to the same environment file." },
      { "seconds": 226, "step": "Start the proxy on port 8082 and launch Claude Code with its base URL pointed at the proxy." },
      { "seconds": 284, "step": "Test a prompt, find the default NVIDIA model slow and switch to Step 3.5 Flash." },
      { "seconds": 384, "step": "Have Claude Desktop write a detailed CLAUDE.md prompt for an AI search visibility app." },
      { "seconds": 445, "step": "Watch the agent create package.json, the Tailwind and TypeScript config and the Next.js layout files." }
    ],
    "notCovered": [
      "A finished app. The recording ends while files are still being created.",
      "A speed or quality comparison with Claude on a paid plan beyond the remark that the default model felt slower.",
      "Setting up Ollama, LM Studio or DeepSeek, which are only mentioned.",
      "Whether routing Claude Code through a third-party proxy fits Anthropic's terms or your data-handling needs."
    ],
    "qa": [
      {
        "q": "Is Free Claude Code an Anthropic product?",
        "a": "No. It is a separate GitHub project that runs a local proxy so the Claude Code command line can use models from NVIDIA NIM, OpenRouter and other providers."
      },
      {
        "q": "What did the build cost?",
        "a": "The OpenRouter balance stayed at $1.68 while the app files were being created. The video suggests Step 3.5 Flash, priced at $0.10 per million tokens, or any of the free models."
      },
      {
        "q": "Was it as fast as a paid Claude plan?",
        "a": "No. A simple test prompt took a long time on the default NVIDIA model. Step 3.5 Flash through OpenRouter ran faster."
      }
    ]
  },
  "miBtL2fVkpg": {
    "summary": "Install 9Router, a local gateway that connects coding tools such as Kilo Code and OpenCode to more than 60 AI providers with a three-tier fallback from paid to cheap to free models. Kilo Code connects and passes a connection test. OpenCode connects but returns no output in the demo.",
    "whatYouBuild": "A local 9Router dashboard with provider connections, Kilo Code and OpenCode pointed at it, an OpenRouter key for more free models and the 9Remote add-on for coding from another device.",
    "toolsUsed": [
      "9Router",
      "Kilo Code",
      "OpenCode",
      "OpenRouter",
      "RTK",
      "9Remote"
    ],
    "keySteps": [
      { "seconds": 44, "step": "Install 9Router with the npm command and start it with 9router on localhost." },
      { "seconds": 68, "step": "See how the fallback works: paid subscriptions first, then cheap models such as GLM, MiniMax and Kimi, then free models." },
      { "seconds": 130, "step": "Read the risk notice on the Claude Code and Codex connections before deciding whether to connect them." },
      { "seconds": 180, "step": "Connect Kilo Code, select a 9Router model and run the connection test." },
      { "seconds": 205, "step": "Connect OpenCode and pick a free model such as DeepSeek V4 Flash through 9Router." },
      { "seconds": 410, "step": "Add an OpenRouter API key to reach more free models." },
      { "seconds": 435, "step": "Install 9Remote to reach a terminal from another place." },
      { "seconds": 480, "step": "Review the built-in token-saving tools: RTK, Caveman and Ponytail." }
    ],
    "notCovered": [
      "Why OpenCode returned no output during the demo. The cause was not found.",
      "A full setup of the token-saving tools, which is promised for a later video.",
      "Independent measurement of the 20 to 65 percent token savings the project claims.",
      "A walkthrough of 9Remote beyond installing it."
    ],
    "qa": [
      {
        "q": "What does 9Router do?",
        "a": "It sits between your coding tools and many AI providers. When a paid plan runs out it drops to a cheaper model tier, then to a free one, so you can keep working."
      },
      {
        "q": "Is it safe to connect Claude Code or Codex?",
        "a": "9Router shows a risk notice on both. They use a subscription session that is not officially licensed for proxy use, and the account may be restricted or banned. The video connects Claude Code but uses these tools in their own command line instead."
      },
      {
        "q": "Did the OpenCode connection work?",
        "a": "OpenCode connected and the 9Router models appeared in its model list, but no output came back during the demo and the cause was not identified."
      }
    ]
  },
  "dQ_gnts0JCE": {
    "summary": "A live walkthrough of OpenSEO, an open-source SEO platform with a free tier. It connects Google Search Console, links the MCP to Claude Code, and runs keyword research, a site audit and backlink checks on a competitor and on the presenter's own sites. Prices and star counts are quoted from the presenter, not checked here.",
    "whatYouBuild": "An OpenSEO account connected to Google Search Console and to Claude Code through MCP, used to pull keyword data, run an SEO audit and generate an HTML report of fixes.",
    "toolsUsed": [
      "OpenSEO",
      "Claude Code",
      "Google Search Console"
    ],
    "keySteps": [
      { "seconds": 27, "step": "Compare OpenSEO's free tier and plans from $10 a month with Semrush, which the presenter says starts at $149." },
      { "seconds": 56, "step": "Find the MCP install instructions for Claude Code or Codex." },
      { "seconds": 81, "step": "Connect Google Search Console so site data comes in without a custom skill." },
      { "seconds": 105, "step": "Paste the setup prompt into Claude Code to link the MCP." },
      { "seconds": 145, "step": "Run keyword research for a seed term and sort long-tail results by competition." },
      { "seconds": 231, "step": "Run the recommended SEO audit command through the MCP and authorize read access." },
      { "seconds": 260, "step": "Check a large competitor's backlinks, referring domains and domain rating." },
      { "seconds": 316, "step": "Review the backlink profile of the presenter's own domain." },
      { "seconds": 448, "step": "Read the generated report, which finds few inbound links as the main gap, and start the fixes." }
    ],
    "notCovered": [
      "The brand lookup for AI citations, which needs a paid plan and is not shown.",
      "A full-site audit. The test crawl covers 50 pages of a site the presenter says has about 5,000.",
      "Independent checks of the pricing, star counts and backlink figures quoted in the video.",
      "A side-by-side accuracy comparison with paid tools such as Semrush or Ahrefs."
    ],
    "qa": [
      {
        "q": "Is OpenSEO free?",
        "a": "The video shows a free tier and says paid plans start at $10 a month. Check the current pricing page before relying on that."
      },
      {
        "q": "What does the MCP add?",
        "a": "It lets Claude Code or Codex read OpenSEO data directly, so an audit command can pull the data and produce a written report without leaving the coding tool."
      },
      {
        "q": "What did the audit find?",
        "a": "On one site the report said pages load and are set up correctly and the main gap is that almost no other sites link to it, plus six smaller fixes. Another test showed slow server responses and long titles and meta descriptions."
      }
    ]
  },
  "t0nQSyryTPg": {
    "summary": "A tour of demos that other people made with GPT-6 Astra, shown from posts and the product site: exploded 3D models, a V8 engine, a Zillow-style house, browser racing games and a Counter-Strike recreation. The presenter does not build or test any of them in this video.",
    "whatYouBuild": "Nothing is built in this video. It reviews finished community demos so you can see what GPT-6 Astra is being used for.",
    "toolsUsed": [
      "GPT-6 Astra",
      "Three.js",
      "Blender",
      "Unreal Engine"
    ],
    "keySteps": [
      { "seconds": 70, "step": "An interactive exploded 3D Tesla that names each part on mouseover." },
      { "seconds": 140, "step": "A mechanical 3D design of a turbofan jet engine." },
      { "seconds": 206, "step": "A real estate listing turned into a navigable 3D model." },
      { "seconds": 256, "step": "Polished interface elements in a macOS style." },
      { "seconds": 317, "step": "A V8 engine with moving internal parts such as the crankshaft." },
      { "seconds": 409, "step": "A browser racing game with a speedometer and map." },
      { "seconds": 582, "step": "A game built with Fable 5.1 compared with one built by GPT-6 Astra." },
      { "seconds": 653, "step": "A Counter-Strike 2 style game running in the browser with Three.js." },
      { "seconds": 720, "step": "A BMX downhill game with physics, rain and cinematic cameras." }
    ],
    "notCovered": [
      "Any build or test by the presenter. Every demo comes from other creators.",
      "Prompts, build times and costs for most demos, which the video says it does not know.",
      "Independent checks of claims such as one-shot builds and view counts, which come from the original posts.",
      "How well these demos run on average hardware."
    ],
    "qa": [
      {
        "q": "Did the presenter make these demos?",
        "a": "No. They are shared by other creators and the product site, and the video walks through them."
      },
      {
        "q": "Are the one-shot claims verified?",
        "a": "No. The video repeats what creators say about how a demo was made, and it does not reproduce any of them."
      },
      {
        "q": "What plan does the presenter suggest for building games like these?",
        "a": "The $200 a month max plan, since the presenter expects this kind of build to use credits quickly. That is an opinion, and the presenter does not run a build to show the usage."
      }
    ]
  },
  "wzC2r426KWs": {
    "summary": "A work-in-progress virtual office for at least 35 AI agents in GrokBot, built with its Pages feature. A chief-of-staff agent sits in the middle, tasks and an event log show on screen, and click-to-approve is added. A blank-page bug is fixed during the video, but approvals do not update the office automatically yet.",
    "whatYouBuild": "A GrokBot Page showing every agent as a character in an office, with active tasks, a quest log and an approve-in-chat button, driven by plain-language requests to the chief-of-staff agent.",
    "toolsUsed": [
      "GrokBot",
      "GrokBot Pages"
    ],
    "keySteps": [
      { "seconds": 60, "step": "Tour the office map, the active and waiting tasks and the quest log." },
      { "seconds": 94, "step": "Ask GrokBot to fix the blurry canvas, which came from the canvas being stretched." },
      { "seconds": 149, "step": "Ask for a separate viewer bot dedicated to the virtual office." },
      { "seconds": 188, "step": "Open an agent that drafts and posts to the Skool community and read its event log." },
      { "seconds": 218, "step": "Ask for a click-to-approve button on each agent." },
      { "seconds": 290, "step": "Move the office from the slow virtual computer to a GrokBot Page." },
      { "seconds": 354, "step": "Report and fix a blank page that appears after pressing approve." },
      { "seconds": 445, "step": "Press approve in chat, which copies an approval line to paste into the conversation." }
    ],
    "notCovered": [
      "Automatic updates of the office after a task is approved. The presenter asks for this at the end.",
      "The agent avatar update, which has not been done when the video ends.",
      "How the 35 agents were built, beyond what the office shows.",
      "Usage limits in detail. The presenter mentions being on a $60 a month plan and a base plan from $20."
    ],
    "qa": [
      {
        "q": "What is the virtual office for?",
        "a": "It gives a visual overview of many agents at once, with their tasks, event logs and items waiting for approval."
      },
      {
        "q": "Does click-to-approve work?",
        "a": "Partly. The button copies an approval line to paste into chat. After a blank-page bug was fixed it worked, but the office did not update on its own yet."
      },
      {
        "q": "Why use a Page instead of the virtual computer?",
        "a": "The office ran slowly inside the virtual computer, and a Page loaded faster and was easier to preview."
      }
    ]
  },
  "6jDcOXSOT00": {
    "summary": "A first test of GrokBot for SEO on a free trial: import the site audit bot, turn on weekly and monthly audits, connect Treg for keyword data and DataForSEO, then run an audit and an AI citation plan. The audit scores the site 83 out of 100 across 30 pages. Opening a fix pull request needs a paid plan.",
    "whatYouBuild": "A GrokBot SEO setup with an imported site audit bot, scheduled audits, Treg as a keyword source with DataForSEO behind it, and an audit report with prioritized fixes.",
    "toolsUsed": [
      "GrokBot",
      "Treg",
      "DataForSEO",
      "GitHub"
    ],
    "keySteps": [
      { "seconds": 20, "step": "Browse the GrokBot marketplace of bots and plugins." },
      { "seconds": 63, "step": "Import the site audit bot, which sets up its routines and memory." },
      { "seconds": 112, "step": "Turn on the weekly audit and monthly re-audit and set the primary domain." },
      { "seconds": 140, "step": "Look for SEO plugins and find no DataForSEO plugin in the catalog." },
      { "seconds": 186, "step": "Connect Treg with an API key and use it as the keyword source." },
      { "seconds": 254, "step": "Run a full site audit and an AI visibility pull, which the bot estimates at 15 to 20 cents." },
      { "seconds": 320, "step": "Connect DataForSEO through the Treg account so GrokBot can use its data." },
      { "seconds": 413, "step": "Read the audit report with an 83 out of 100 score and the top five actions, then connect GitHub." },
      { "seconds": 504, "step": "Request an AI citation plan built from keyword data." }
    ],
    "notCovered": [
      "The fixes being made. Cloud agents are not on the free trial, so the presenter files GitHub issues instead.",
      "The contents of the AI citation plan briefs.",
      "Getting the three bots to pass work to one another, which is planned but not done.",
      "Independent checks of the traffic and keyword estimates shown."
    ],
    "qa": [
      {
        "q": "What did the audit find?",
        "a": "A score of 83 out of 100 across 30 public pages. The top actions include fixing the HTML language attribute on localized routes, hreflang, and desktop homepage performance."
      },
      {
        "q": "What does it cost?",
        "a": "The video uses a free trial and mentions a Pro plan at $20 a month. Treg data is billed from a credit balance, shown as 77 cents at the time."
      },
      {
        "q": "Could it open a pull request with the fixes?",
        "a": "Not on the free trial. The cloud agent that does that needs the paid plan, so the presenter files issues and plans to fix them with another coding tool."
      }
    ]
  },
  "QMqe2ubsn0g": {
    "summary": "A walkthrough of DextroLab, a tool for giving agency clients a branded portal to run Make.com or n8n automations, with usage billing through Stripe. The presenter connects Make.com, delivers a voice agent workflow to a client and sets example pricing. A custom-variable step fails with an invalid API key error and is dropped. The link in the description is an affiliate link.",
    "whatYouBuild": "A white-label client setup in DextroLab: a Make.com connection, a workflow delivered to a client for approval, and example pricing with a per-run fee, a monthly base fee and a one-time setup fee.",
    "toolsUsed": [
      "DextroLab",
      "Make.com",
      "n8n",
      "Stripe"
    ],
    "keySteps": [
      { "seconds": 37, "step": "Review the free start and the paid plan, quoted at about £47 a month with a 14-day trial when recorded." },
      { "seconds": 103, "step": "Set example prices: $0.05 per run, a $100 monthly base fee and a $250 one-time setup fee." },
      { "seconds": 167, "step": "Look at the agency dashboard and the custom domain setting." },
      { "seconds": 202, "step": "Add a connection with an API key and base URL for Make.com or n8n." },
      { "seconds": 276, "step": "Pick a Make.com voice agent workflow and deliver it to the one client, where it waits for approval." },
      { "step": "Try adding the DextroLab variables node to a scenario, get an unauthorized error and remove the node." },
      { "step": "Look at the Stripe payment settings and the subscription plans for clients." },
      { "seconds": 640, "step": "View the client portal a client sees after accepting the workflow." }
    ],
    "notCovered": [
      "The custom-variable feature working. The error was not solved.",
      "The client accepting the workflow and being billed.",
      "Current pricing, which was quoted in pounds when the video was recorded in August 2025.",
      "Any result from running the delivered workflow."
    ],
    "qa": [
      {
        "q": "Which platforms does DextroLab connect to?",
        "a": "The video shows two connection options, n8n and Make.com, each using an API key and a base URL."
      },
      {
        "q": "How do clients pay?",
        "a": "Through Stripe. The presenter shows a per-run fee, a recurring monthly fee and a one-time setup fee that DextroLab bills automatically."
      },
      {
        "q": "Is the link in the description an affiliate link?",
        "a": "Yes. The presenter says they earn a recurring commission if you sign up through it."
      }
    ]
  },
  "dVvazfQHhW4": {
    "summary": "Build a Python script with an AI agent that fetches your latest YouTube video and writes a LinkedIn post and a 1,500-word newsletter from it, then schedule it as a daily Hermes cron job. The first Hermes output is weak, so the presenter moves the edits to OpenCode and the OpenAI API. The results still need editing, and posting is done by hand.",
    "whatYouBuild": "A Python script and a daily Hermes cron job that find the newest video, then write two LinkedIn post versions (one for reach, one for engagement) and a long newsletter into date-stamped files.",
    "toolsUsed": [
      "Hermes Agent",
      "OpenCode",
      "OpenAI API",
      "Python",
      "Google AI Studio",
      "LinkedIn"
    ],
    "keySteps": [
      { "seconds": 45, "step": "Give Hermes the channel URL and ID so it can write the script." },
      { "seconds": 138, "step": "Review the first script, which pulls the latest video without a YouTube API key." },
      { "seconds": 183, "step": "Try a Google AI Studio key, then switch to an OpenAI API key in the environment file." },
      { "seconds": 291, "step": "Move the edits to OpenCode after the Hermes drafts read poorly." },
      { "seconds": 406, "step": "Fix the unsupported max_tokens error by switching to max_completion_tokens." },
      { "seconds": 442, "step": "Compare version A for reach with version B for engagement." },
      { "seconds": 517, "step": "Require a newsletter of at least 1,500 words." },
      { "seconds": 544, "step": "Create the daily YouTube-to-LinkedIn cron job in Hermes." },
      { "seconds": 607, "step": "Add dates to the output file names so each run keeps its own files." }
    ],
    "notCovered": [
      "Automatic posting to LinkedIn. The presenter pastes the newsletter in by hand.",
      "A successful scheduled run. The cron job shows an error because the API limit was exceeded.",
      "Measured results from the posts, and the cost of each run.",
      "A fair model comparison. Hermes and OpenCode are run on different prompts and models."
    ],
    "qa": [
      {
        "q": "Do I need a YouTube API key?",
        "a": "Not in this build. The presenter says the script found the latest video without a key from Google Cloud Console."
      },
      {
        "q": "Why switch from Hermes to OpenCode?",
        "a": "The presenter did not like the Hermes drafts and found OpenCode edited the script faster. This is a personal view from one run."
      },
      {
        "q": "Is the output ready to post?",
        "a": "No. The presenter says the newsletter needs editing and formatting before it goes to subscribers."
      }
    ]
  },
  "9A2StjrxOms": {
    "summary": "A sponsored demo of Treg, a pay-per-call catalog of agent tools, connected to Codex and GrokBot. The presenter calls DataForSEO through Treg for keyword and backlink data, and builds an SEO auditor in GrokBot that reports a total spend of 13 cents. The video states that Treg sponsored it and that the sign-up link is an affiliate link.",
    "whatYouBuild": "Treg installed in Codex and as a GrokBot plugin, a DataForSEO connection, example keyword and backlink calls with their costs, and a GrokBot SEO auditor that creates a report and next actions.",
    "toolsUsed": [
      "Treg",
      "GrokBot",
      "Codex",
      "DataForSEO",
      "Cursor cloud agents"
    ],
    "keySteps": [
      { "seconds": 30, "step": "Set the task: find backlink opportunities by comparing data providers on price and reliability." },
      { "seconds": 74, "step": "Install Treg in Codex with the copied one-line command." },
      { "seconds": 106, "step": "Add the Treg plugin to GrokBot from its marketplace." },
      { "seconds": 134, "step": "Watch live API calls, request JSON and responses in the Treg dashboard." },
      { "seconds": 230, "step": "See how pay-per-call billing works against a topped-up balance." },
      { "seconds": 295, "step": "Fetch keyword data through DataForSEO, where a prompt left the example keyword as coffee." },
      { "seconds": 457, "step": "Run a DataForSEO backlink summary on the presenter's domain at a quoted per-call price." },
      { "seconds": 576, "step": "Build the GrokBot SEO auditor and read its report, which starts a Cursor cloud agent for fixes." }
    ],
    "notCovered": [
      "A comparison of providers on real accuracy or reliability. Prices are shown but quality is not tested.",
      "Costs without the presenter's balance. The presenter says a paid collaboration funded a $100 balance.",
      "The fixes the cloud agent makes after the audit.",
      "Independent checks of the traffic, keyword and backlink figures returned."
    ],
    "qa": [
      {
        "q": "Is this video sponsored?",
        "a": "Yes. The presenter says Treg sponsored it and asked for a practical workflow. The link is also an affiliate link that gives a $5 credit after a $10 deposit, and the presenter earns $5."
      },
      {
        "q": "How does Treg charge?",
        "a": "Per call from a prepaid balance, rather than a monthly subscription. Each endpoint shows its price, and the dashboard shows the calls made."
      },
      {
        "q": "What did the SEO audit cost?",
        "a": "GrokBot reported a total spend of 13 cents through Treg for pulling ranked keywords, competitors, backlinks and AI mentions."
      }
    ]
  },
  "AkIz84oXvdk": {
    "summary": "A walkthrough of Syllaby for making faceless videos and scheduling them to YouTube, TikTok, Instagram and other networks. It covers styles, voices, credits, the script assistant and the bulk scheduler. The script assistant fails with a not found error several times before it works. The link in the description is an affiliate link.",
    "whatYouBuild": "A faceless video made from a script in Syllaby, plus a bulk schedule that generates scripts and videos for 7 to 30 days and posts them from a content calendar.",
    "toolsUsed": [
      "Syllaby",
      "ElevenLabs",
      "YouTube"
    ],
    "keySteps": [
      { "seconds": 59, "step": "See the AI avatar and voice clone options." },
      { "seconds": 121, "step": "Tour the dashboard and analytics." },
      { "seconds": 157, "step": "Start a faceless video and choose a style, subtitles, voice and aspect ratio. The presenter quotes 13 credits per minute and 500 credits a month on the paid plan." },
      { "seconds": 195, "step": "Adjust animation, sound effects, background music and subtitle position." },
      { "seconds": 270, "step": "Use the AI script assistant, which returns not found errors at first." },
      { "seconds": 560, "step": "Schedule a post from the content calendar." },
      { "seconds": 866, "step": "Set up the bulk scheduler for 7 to 30 days of videos with up to five posts a day." }
    ],
    "notCovered": [
      "Results from the presenter's own videos. The claim of good results after three months is not shown.",
      "The cause of the not found script errors.",
      "The finished bulk-scheduled videos, which were still rendering at the end.",
      "Current pricing. Paid plans were quoted from $25 a month in August 2025."
    ],
    "qa": [
      {
        "q": "Is Syllaby free?",
        "a": "It offers some free credits to start. The presenter says most people will need a paid plan, quoted from $25 a month when recorded."
      },
      {
        "q": "Can I use my own ElevenLabs voice?",
        "a": "The presenter could not find a direct ElevenLabs integration. Syllaby makes voice clones itself and the presenter says it uses ElevenLabs behind the scenes."
      },
      {
        "q": "Does the presenter recommend Shorts for income?",
        "a": "Not for direct income. The presenter says Shorts pay little without millions of views and favors long-form videos for monetization."
      }
    ]
  },
  "EECptdYND6k": {
    "summary": "Install Odysseus, the free self-hosted AI chat workspace that the video attributes to PewDiePie, on Linux and try it with OpenRouter, OpenCode Go and OpenAI models. The setup takes about five minutes. The tour covers the windowed interface, model comparison, an evening email digest task and the cookbook. The shell tool and a local-model run are not set up, and the Gmail connection takes several tries.",
    "whatYouBuild": "A local Odysseus install running in the browser, connected to OpenRouter, OpenCode Go, OpenCode Zen and OpenAI models, with an email digest task scheduled for 7 pm.",
    "toolsUsed": [
      "Odysseus",
      "OpenRouter",
      "OpenCode Go",
      "OpenCode Zen",
      "OpenAI API",
      "Gmail",
      "Playwright"
    ],
    "keySteps": [
      { "step": "Clone the repository from GitHub, create a Python virtual environment and install the requirements." },
      { "step": "Start Odysseus on localhost and sign in with the username and password you created." },
      { "step": "Add an OpenRouter key and test it, which finds 341 models, then add OpenCode Go, OpenCode Zen and OpenAI keys the same way." },
      { "step": "Set default models for chat and research, and DuckDuckGo for search." },
      { "step": "Switch between chat mode and agent mode, and see that the agent has no shell access until it is set up." },
      { "step": "Browse the cookbook for local model and dependency installs, including Playwright." },
      { "step": "Move, dock and resize the browser windows, change themes, and compare two models side by side." },
      { "step": "Ask the agent to create an evening email digest task, enable two-factor sign-in and connect Gmail with an app password." }
    ],
    "notCovered": [
      "Running a local model. The presenter says the hardware cannot handle one.",
      "Setting up the agent's shell, so it could not run local skills.",
      "A finished model comparison. The Pong test failed for one model.",
      "Proof that the scheduled email digest arrives. The video ends after an inbox summary of 30 emails.",
      "An independent check of the star count and view numbers quoted in the video."
    ],
    "qa": [
      {
        "q": "Is Odysseus free?",
        "a": "The video says it is free and open source with no subscription. Model usage is billed by whichever provider you connect, such as OpenRouter."
      },
      {
        "q": "How long does installing it take?",
        "a": "About five minutes on Debian Linux in this video, using a Python virtual environment and pip."
      },
      {
        "q": "What did the demo cost?",
        "a": "Using DeepSeek V4 Flash through OpenCode, the presenter reports about two cents early on and about five cents by the end."
      },
      {
        "q": "Did the email connection work?",
        "a": "After several failed tests, adding a Gmail app password with IMAP and SMTP passed and an inbox summary returned."
      }
    ]
  },
  "Zi_PG07mDxo": {
    "summary": "Wrap Odysseus in an Electron desktop app. The presenter asks Odysseus with DeepSeek V4 Pro to build it, the run stalls on an npm install, and Codex plus the terminal finish the job. The app crashes once, then runs in its own window using about 2.3 GB of memory. Credits used in OpenCode: 31 cents.",
    "whatYouBuild": "A standalone Electron desktop app for Odysseus that opens the local web interface in its own window, with a launch script and a README.",
    "toolsUsed": [
      "Odysseus",
      "Electron",
      "DeepSeek V4 Pro",
      "Codex",
      "OpenCode"
    ],
    "keySteps": [
      { "step": "Ask Odysseus to build an Electron desktop app for its own project." },
      { "step": "Let the agent inspect the FastAPI and static web app and create the Electron wrapper files." },
      { "step": "Hit a long npm install that has not finished after about eight minutes, so stop it." },
      { "step": "Ask Codex for the same job and run npm install in the terminal." },
      { "step": "Start the app with the launch script, which crashes once, then with npm start." },
      { "step": "Sign in with two-factor authentication, check memory use and compare speed with the browser." }
    ],
    "notCovered": [
      "Odysseus completing the job on its own. The install stalled and the finish used Codex and the terminal.",
      "Packaging an installer or testing on Windows and Mac. The wrapper is described for all three but only run on Debian Linux.",
      "How to share the app. The presenter has not merged it into the main repository.",
      "A speed measurement. The faster feel is the presenter's impression."
    ],
    "qa": [
      {
        "q": "Did Odysseus build the whole app?",
        "a": "It created the wrapper structure, but its npm install stalled. Codex and terminal commands finished the setup."
      },
      {
        "q": "What did it cost?",
        "a": "The presenter reports 31 cents in total on DeepSeek V4 Pro through OpenCode."
      },
      {
        "q": "Where can I get the app?",
        "a": "It is not published. The presenter says they may suggest it to the Odysseus project."
      }
    ]
  },
  "tzSGF7gu6EE": {
    "summary": "Use 9Router as a local proxy to track what OpenCode Go costs, then look at its token savers, auto-fallback tiers and model combos. The dashboard shows 52 million input tokens as an estimated cost, not a bill. Kilo Code is left unconfigured, and Claude Code and Codex are kept off the proxy because of the account-restriction notice.",
    "whatYouBuild": "A 9Router setup that routes OpenCode through the proxy for usage tracking, with token savers turned on and example model combos.",
    "toolsUsed": [
      "9Router",
      "OpenCode",
      "OpenCode Go",
      "Kilo Code",
      "Codex",
      "Headroom",
      "Caveman",
      "Ponytail"
    ],
    "keySteps": [
      { "seconds": 52, "step": "Run 9Router as a local proxy and send OpenCode requests through it." },
      { "seconds": 107, "step": "Read the risk notices on provider connections that use a subscription login." },
      { "seconds": 149, "step": "Try to configure Kilo Code and skip it for now." },
      { "seconds": 186, "step": "Explain why OpenCode is used here to keep costs low and visible." },
      { "seconds": 264, "step": "Turn on Headroom, Caveman and Ponytail token savers and pick a mode." },
      { "seconds": 364, "step": "Look at proxy pools and the built-in skills." },
      { "seconds": 394, "step": "See the subscription, cheap and free fallback tiers." },
      { "seconds": 434, "step": "Set model combos and reorder their priority." },
      { "seconds": 525, "step": "Check weekly quota use across Codex and Claude." }
    ],
    "notCovered": [
      "Measured savings from the token savers. The dashboard shows none yet because only OpenCode is routed.",
      "A working Kilo Code connection.",
      "A comparison of the dashboard estimate with actual provider bills, beyond the presenter's remark that it is an estimate.",
      "Claude Code or Codex routed through the proxy, which the presenter avoids."
    ],
    "qa": [
      {
        "q": "Is the cost shown in 9Router what I will pay?",
        "a": "No. The presenter says it is an estimate, and compares it with the actual spend shown in the OpenCode account."
      },
      {
        "q": "Why not route Claude Code or Codex through 9Router?",
        "a": "9Router warns that these connections use a subscription login that is not officially licensed for proxy use and the account may be restricted or banned. The presenter avoids it to protect the accounts."
      },
      {
        "q": "What do the token savers claim?",
        "a": "The dashboard text quotes 60 to 95 percent fewer tokens for JSON data and 15 to 20 percent fewer for coding agents. The video does not measure this."
      }
    ]
  },
  "kXw2yntdmo4": {
    "summary": "A Make.com scenario that runs an Apify scraper on an Apollo search, takes 100 leads and writes their names, emails and other fields into a new Google Sheet. The run works after a sheet-name clash is fixed, but the phone number column comes back wrong. The presenter offers the template on Gumroad as pay what you want.",
    "whatYouBuild": "A Make.com scenario that creates a Google Sheet, runs an Apify Apollo actor with a search URL and a 100-lead limit, reads the dataset items and adds one row per lead.",
    "toolsUsed": [
      "Make.com",
      "Apify",
      "Apollo",
      "Google Sheets"
    ],
    "keySteps": [
      { "seconds": 67, "step": "Choose the Apify Apollo actor and paste in the URL of an Apollo people search." },
      { "seconds": 108, "step": "Run the actor from Make.com with a JSON input that limits the scrape to 100 leads." },
      { "seconds": 159, "step": "Get the dataset items, map first name, last name, email, phone, industry and location into an array, and iterate it into sheet rows." },
      { "step": "Rename the sheet after a name clash and run the scenario again." }
    ],
    "notCovered": [
      "Sending any emails. The leads are only collected and the next step is left to you.",
      "Fixing the phone number column, which the presenter says is not working.",
      "Apollo's and Apify's terms of use, or the privacy rules and consent that apply to cold email in your country.",
      "A clear cost per lead. The spoken price in this video is garbled. A companion Apollo video quotes $1.20 per 1,000 leads for the same actor."
    ],
    "qa": [
      {
        "q": "Why use Apify instead of Apollo directly?",
        "a": "The presenter was nearly out of Apollo credits, which are spent per lead, and says Apify's free monthly credit meant their usage did not rise in the demo."
      },
      {
        "q": "How many leads did it collect?",
        "a": "100 in the demo. The actor can scrape far more, but the presenter limited the test."
      },
      {
        "q": "Where is the template?",
        "a": "On the presenter's Gumroad page as pay what you want, according to the video."
      }
    ]
  },
  "ztEj6zCJh5k": {
    "summary": "Install an open-source Video Use skill and ask Claude Code to cut a long tutorial into a 9:16 YouTube Short with the screen share on top and the webcam below. The first result repeats the webcam in both halves. A second, more exact prompt produces a roughly 17-second clip with burned-in subtitles. The presenter calls the result a work in progress.",
    "whatYouBuild": "A Claude Code skill setup that transcribes a long video with Faster Whisper, picks a clip, crops the layout with FFmpeg and renders a vertical Short with captions.",
    "toolsUsed": [
      "Video Use",
      "Claude Code",
      "FFmpeg",
      "Faster Whisper",
      "Claude"
    ],
    "keySteps": [
      { "step": "Clone the skill from GitHub, install FFmpeg and place the skill under .claude/skills." },
      { "seconds": 44, "step": "Prompt for a 1080p vertical 30-second Short with the screen share on top and the webcam below." },
      { "seconds": 98, "step": "Watch FFmpeg find the webcam in the bottom right and plan the crop." },
      { "seconds": 186, "step": "Spot a second webcam at the top and ask Claude for a better prompt for a 15 to 30 second clip with no webcam in the top half." },
      { "seconds": 271, "step": "Run the skill again with Faster Whisper transcribing the audio to find the best standalone moment." },
      { "seconds": 298, "step": "Note the optional ElevenLabs voiceover, which is skipped because there is no API key." },
      { "seconds": 410, "step": "Render burned-in subtitles and verify three sample frames." },
      { "seconds": 518, "step": "Review the finished Short." }
    ],
    "notCovered": [
      "A polished result. The presenter says the subtitles could sit better and the output could be improved.",
      "A fair comparison with Opus Clip. The presenter says the free plan results were poor but does not run the same clip through both.",
      "Which model ran the work and its cost beyond a remark that it was cheap through OpenRouter.",
      "Automating the process with a scheduled job, which is only suggested."
    ],
    "qa": [
      {
        "q": "What do I need to install?",
        "a": "The skill from GitHub and FFmpeg, plus a package to download videos from YouTube if you want that. Claude Code then runs it from the skills folder."
      },
      {
        "q": "How long did the Short take to make?",
        "a": "The second run was still working after about five minutes of analysis, and the video render itself took about a minute and a half. The finished clip is about 17 seconds."
      },
      {
        "q": "Did the first prompt work?",
        "a": "Only partly. The webcam appeared in both halves of the layout, so a second prompt was written to remove it from the top."
      }
    ]
  },
  "1LN7TqmW--w": {
    "summary": "Run an SEO audit skill in OpenCode on the presenter's own AI search visibility site, then let the agent fix blog articles and work on llms.txt, ai.txt and sitemap.xml before a commit and redeploy on Vercel. The presenter hits 98 percent of the OpenCode Go monthly limit and switches to a free model. No ranking result is shown, so the video does not answer its own title question.",
    "whatYouBuild": "An OpenCode session that runs an SEO audit skill on a live site and applies fixes to blog posts and discovery files, followed by a commit and push for a Vercel deploy.",
    "toolsUsed": [
      "OpenCode",
      "OpenCode Go",
      "OpenCode Zen",
      "Hermes Agent",
      "RTK",
      "Vercel"
    ],
    "keySteps": [
      { "seconds": 48, "step": "Look at the OpenCode Go plan and the desktop app for Linux, Windows and Mac." },
      { "seconds": 97, "step": "List installed skills with the skills command and start the SEO audit skill." },
      { "seconds": 135, "step": "Run the audit on the presenter's own site and read the issues found." },
      { "seconds": 180, "step": "Check DeepSeek V4 Pro usage, which is at 98 percent of the month's limit." },
      { "seconds": 211, "step": "Switch to a free OpenCode Zen model to keep working." },
      { "seconds": 344, "step": "Look at the existing llms.txt, the missing ai.txt and the sitemap.xml the agent is working on." },
      { "seconds": 401, "step": "Use the same OpenCode models inside Hermes Agent." },
      { "seconds": 477, "step": "See RTK token compression reporting 81 percent efficiency." }
    ],
    "notCovered": [
      "Any improvement in search or AI answer rankings. The deploy happens at the end of the video.",
      "A review of the changes the agent made, or how the audit skill scores a site.",
      "A comparison with a human SEO team or a paid SEO tool.",
      "Exact costs. The usage figures spoken in the video are hard to read, so they are not quoted here."
    ],
    "qa": [
      {
        "q": "Can OpenCode replace an SEO team?",
        "a": "The video shows one audit and one round of fixes on one site, without ranking results. It does not show that, and the presenter does not claim a measured gain."
      },
      {
        "q": "What does OpenCode Go cost?",
        "a": "The video says $10 a month. The description link is an affiliate link that gives $5 in credits to a new user and $5 to the presenter."
      },
      {
        "q": "What happens when the Go limit runs out?",
        "a": "The presenter switches to a free model under OpenCode Zen, such as DeepSeek V4 Flash Free, and keeps going."
      }
    ]
  },
  "wRqpZ9F3rmI": {
    "summary": "A sponsored walkthrough of connecting the DataForSEO MCP server to Claude, then using plain-language prompts for an SEO audit, a seven-day action plan, a competitor and keyword-gap report, and an AI search visibility check on the presenter's own site. The video says DataForSEO sponsored it and that the sign-up link gives $5 in trial credits instead of the usual $1.",
    "whatYouBuild": "Claude connected to DataForSEO through MCP, with three reusable prompts: a domain audit, a competitor and keyword-gap report, and an AI search visibility review.",
    "toolsUsed": [
      "DataForSEO",
      "Claude"
    ],
    "keySteps": [
      { "seconds": 52, "step": "Create a DataForSEO account through the referral link and open the MCP setup instructions." },
      { "seconds": 99, "step": "Add the DataForSEO MCP connection in Claude's settings and restart Claude so it appears." },
      { "step": "Note the pay-as-you-go model, where you pay per API request instead of a monthly subscription." },
      { "seconds": 242, "step": "Ask Claude to audit a domain and list the five most important issues, then read the tool calls behind each finding." },
      { "seconds": 314, "step": "Ask Claude to rank the issues by business impact and difficulty and write a seven-day action plan." },
      { "seconds": 343, "step": "Request a competitor report with overlapping long-tail keywords and keyword gaps, summarized in a table." },
      { "seconds": 421, "step": "Ask Claude to investigate the site's AI search visibility using the available DataForSEO tools." }
    ],
    "notCovered": [
      "The numbers returned. The narration describes the outputs but does not read the data out.",
      "A per-request price breakdown. The video explains the pay-as-you-go idea but gives no figures.",
      "Checking the findings against another SEO tool, or carrying out the action plan.",
      "Any comparison with other SEO data providers."
    ],
    "qa": [
      {
        "q": "Is this video sponsored?",
        "a": "Yes. The presenter thanks DataForSEO for sponsoring it and shares a referral link that gives $5 in trial credits instead of the usual $1."
      },
      {
        "q": "How long does the setup take?",
        "a": "The presenter says under five minutes: create the account, add the MCP connection in Claude and restart it."
      },
      {
        "q": "How does DataForSEO charge?",
        "a": "Per API request rather than a required monthly subscription, so the cost depends on how much data you ask for."
      }
    ]
  },
  "ga22WZgoj9M": {
    "summary": "A tour of an AI search visibility app built with OpenCode, Codex and Free Claude Code, followed by the reasons the presenter moves away from Free Claude Code: repeated API request errors, slow replies and a 401 error tied to startup order. OpenCode answers quickly on free models and Codex on a $20 plan is preferred over Claude Pro. The app is only on a local server.",
    "whatYouBuild": "A local Next.js app that scores a site's AI visibility, with a crawler-tracking mock-up and a new meta tag optimizer feature started in OpenCode.",
    "toolsUsed": [
      "OpenCode",
      "Free Claude Code",
      "Codex",
      "Clerk",
      "Trakkr",
      "Google PageSpeed Insights",
      "Next.js"
    ],
    "keySteps": [
      { "seconds": 64, "step": "Run the app's free audit on a domain and read the AI visibility score, quick wins and seven pillars." },
      { "seconds": 144, "step": "Look at Trakkr's AI crawler tracking as a model for a crawler dashboard." },
      { "seconds": 169, "step": "Show Free Claude Code failing with API request errors on several models." },
      { "seconds": 304, "step": "Explain a 401 unauthorized error that came from the order of starting the proxy and Claude Code." },
      { "seconds": 339, "step": "Switch to OpenCode and compare how quickly it responds." },
      { "seconds": 418, "step": "Start a meta tag optimizer feature in OpenCode on a free model." },
      { "seconds": 461, "step": "Explain why Codex at about $20 a month is preferred over Claude Pro." },
      { "seconds": 628, "step": "Switch between free models in OpenCode and run the audit on a blog article." }
    ],
    "notCovered": [
      "The cause of the API request failed errors, which the presenter asks viewers to help with.",
      "A timed comparison. Statements that OpenCode is quicker than Claude Code are impressions.",
      "Checking that the app's AI visibility score is accurate. The presenter says this still needs work.",
      "A finished meta tag optimizer, or a public release of the app."
    ],
    "qa": [
      {
        "q": "Is OpenCode better than Free Claude Code?",
        "a": "For this presenter, yes. Free Claude Code was slow and kept failing with API errors, while OpenCode responded quickly on free models. This is one person's experience on one setup."
      },
      {
        "q": "Why did the presenter move to Codex?",
        "a": "They say Codex at about $20 a month used credits more slowly than Claude Code and was more reliable."
      },
      {
        "q": "Where can I use the app?",
        "a": "It only runs on the presenter's local machine. The presenter offers to share a link on request."
      }
    ]
  },
  "UnnN2i90ALg": {
    "summary": "Install Hermes Agent on Linux with the one-line installer, run the full setup, and try it on a code review, sub-agents and a research task. The first model attempts fail with 401 and balance errors until a free OpenCode Zen model works. The title says Hermes beats OpenClaw, but the video never runs OpenClaw, so that is the presenter's opinion.",
    "whatYouBuild": "A local Hermes Agent install with OpenRouter, Codex and Gemini keys set up, switched to a free OpenCode Zen model, then used for a code review of a Next.js app and a sub-agent research task.",
    "toolsUsed": [
      "Hermes Agent",
      "OpenRouter",
      "OpenCode Zen",
      "Google AI Studio"
    ],
    "keySteps": [
      { "seconds": 118, "step": "Run the one-line curl installer and let it set up dependencies." },
      { "seconds": 226, "step": "Choose the full setup, add an OpenRouter API key and pick text-to-speech and image providers." },
      { "seconds": 304, "step": "Set the terminal backend to local and review the gateway and tool choices." },
      { "seconds": 498, "step": "Start Hermes chat, change the default model, and hit 401 and insufficient balance errors on several models." },
      { "seconds": 771, "step": "Switch to the free Big Pickle model in OpenCode Zen and run a full code review of a SaaS project." },
      { "seconds": 852, "step": "Ask for an autonomous agent and see the coding agents it can orchestrate, then start a research task." },
      { "seconds": 1042, "step": "Fix a candlestick chart problem that had defeated OpenCode in an earlier video by updating a package." }
    ],
    "notCovered": [
      "A side-by-side run with OpenClaw. The presenter says OpenClaw did not impress them but shows no comparison.",
      "The cause of the OpenRouter 401 error, which was bypassed by changing provider.",
      "The research result the presenter wanted. The agent returned a list of AI YouTube channels instead.",
      "Messaging gateways such as Telegram or WhatsApp, which are skipped."
    ],
    "qa": [
      {
        "q": "Is Hermes Agent better than OpenClaw?",
        "a": "The presenter says they like it more, but the video does not test OpenClaw, so there is no evidence for a comparison here."
      },
      {
        "q": "Why did the first models fail?",
        "a": "Hermes returned a 401 user not found error through OpenRouter and an insufficient balance error through a Zen model. Switching to the free Big Pickle model worked."
      },
      {
        "q": "What did the code review find?",
        "a": "It called the project well structured and suggested adding Zod validation to remaining API routes, merging duplicate scripts, expanding pricing tests and checking the dual write path."
      }
    ]
  },
  "b0Izj5Pv0sQ": {
    "summary": "A sponsored hands-on test of Bluehost's all-in-one AI assistant, a $20 a month bundle that puts ChatGPT, Gemini, Claude and Grok models in one dashboard. The video tries auto model routing, web search, image generation and editing, a research report, a 1,500-word SEO article and a five-slide PowerPoint. The video says Bluehost sponsored it. The price comparison is the presenter's own arithmetic.",
    "whatYouBuild": "A Bluehost AI assistant account used to chat with several models, search the web, make and edit an image, and run the research, article writer and presentation builder agents.",
    "toolsUsed": [
      "Bluehost AI Assistant",
      "ChatGPT Images 2.0",
      "Microsoft PowerPoint"
    ],
    "keySteps": [
      {
        "seconds": 0,
        "step": "Compare the $20 a month all-access pack with paying for ChatGPT, Claude, Grok and Google AI Pro separately."
      },
      {
        "seconds": 83,
        "step": "Review the pack's features, the $25 privacy plan with encrypted searches, and the bundled agents."
      },
      {
        "seconds": 163,
        "step": "Switch between the listed models, including GPT 5.5, Gemini 3.1 Pro, Claude Opus and Sonnet, and Grok 4.3."
      },
      {
        "seconds": 247,
        "step": "Use the Auto setting, which picks a model for each prompt."
      },
      {
        "seconds": 341,
        "step": "Turn on web search for the latest tech news and open the cited sources."
      },
      {
        "seconds": 415,
        "step": "Generate an image with GPT Images 2.0 and edit it to add a waterfall."
      },
      {
        "seconds": 545,
        "step": "Run the AI research assistant for a report with references."
      },
      {
        "seconds": 627,
        "step": "Generate a 1,500-word article with the SEO article writer and ask the assistant if it is optimized."
      },
      {
        "seconds": 778,
        "step": "Build a five-slide presentation and export it to PowerPoint."
      }
    ],
    "notCovered": [
      "Usage limits or message caps on each model, which decide whether the bundle really replaces separate plans.",
      "The privacy plan and encrypted search, which are described but not tested.",
      "A fact check of the article or the research report. The SEO check is the assistant grading its own article.",
      "A side-by-side comparison with using the same models directly."
    ],
    "qa": [
      {
        "q": "Is this video sponsored?",
        "a": "Yes. The presenter says Bluehost sponsored it and thanks them for reaching out."
      },
      {
        "q": "How much does it cost?",
        "a": "The video quotes $20 a month for the all-access pack and $25 for the privacy version. Check Bluehost for current pricing."
      },
      {
        "q": "Is the $70 a month saving real?",
        "a": "It is the presenter's sum of separate subscriptions at the prices quoted in the video. It does not account for usage limits."
      },
      {
        "q": "How good was the presentation?",
        "a": "The presenter calls it simplistic but impressive for under two minutes, and says the slides could be improved."
      }
    ]
  },
  "4x2gxyIFUa8": {
    "summary": "A 95-second teaser for a full Vapi course. It plays a sample call where an AI voice agent introduces an automation service, asks two qualifying questions and books a consultation, then describes Vapi and a Make.com automation that places the calls. The build itself is not in this clip.",
    "whatYouBuild": "Nothing is built in this clip. It previews an AI voice agent made in Vapi, with a Make.com automation that starts the calls.",
    "toolsUsed": [
      "Vapi",
      "Make.com"
    ],
    "keySteps": [
      {
        "step": "Listen to a sample sales call where the agent asks if it is a good time and describes the service."
      },
      {
        "step": "Hear the agent confirm a consultation time and send a confirmation email."
      },
      {
        "step": "Get the course overview: Vapi account, credits to run the agent, and Make.com for placing calls."
      }
    ],
    "notCovered": [
      "The build steps, which are in the full course.",
      "How natural the voice sounds beyond this one sample, or what each call costs.",
      "Independent checks of Vapi's quoted numbers of one million assistants and 220,000 developers."
    ],
    "qa": [
      {
        "q": "Is this the full tutorial?",
        "a": "No. It is a short preview of a longer course on building the agent in Vapi."
      },
      {
        "q": "What do I need?",
        "a": "A Vapi account with credits to run the agent. The video says you can start for free, and Make.com handles the calling automation."
      },
      {
        "q": "Which apps can Vapi connect to?",
        "a": "The video lists OpenAI, Anthropic Claude, ElevenLabs, Google Sheets and calendars, and says it connects with 40 or more apps."
      }
    ]
  },
  "nJtbBB0JBYY": {
    "summary": "A walkthrough of Skool's membership tiers, announced on October 29, 2025, using the presenter's own community: a free tier, a $29 a month premium tier and an $89 a month VIP tier, with classroom modules unlocked by tier. It also compares Skool's $9 Hobby and $99 Pro plans. All prices and fees are as stated in October 2025. The link in the description is an affiliate link.",
    "whatYouBuild": "A tiered membership on Skool with free, premium and VIP levels, annual discounts, tier-locked classroom modules and tier-locked live calls.",
    "toolsUsed": [
      "Skool"
    ],
    "keySteps": [
      {
        "seconds": 59,
        "step": "Open the community settings and go to pricing to set up membership tiers."
      },
      {
        "seconds": 92,
        "step": "Compare the Hobby plan at $9 a month with the Pro plan at $99 a month and their transaction fees."
      },
      {
        "seconds": 225,
        "step": "Set the VIP tier with the coaching program and all classroom modules."
      },
      {
        "seconds": 258,
        "step": "Preview the plans page that new members see when they join."
      },
      {
        "seconds": 325,
        "step": "Lock classroom modules and live calls to specific tiers."
      },
      {
        "seconds": 358,
        "step": "Switch from one-time module prices to monthly tier access."
      }
    ],
    "notCovered": [
      "Whether the tiers raised revenue. The video is recorded the day after launch.",
      "Skool's current prices and fees, which may have changed since October 2025.",
      "A fair comparison with other community platforms. The reasons for choosing Skool are the presenter's opinion."
    ],
    "qa": [
      {
        "q": "What tiers does the presenter set up?",
        "a": "Free with community access and beginner training, premium at $29 a month or $280 a year, and VIP at $89 a month or $850 a year."
      },
      {
        "q": "What are Skool's platform fees?",
        "a": "The video says the $9 Hobby plan has a 10 percent transaction fee and the $99 Pro plan 2.9 percent. Confirm on Skool before deciding."
      },
      {
        "q": "Is the Skool link an affiliate link?",
        "a": "Yes. The presenter says they earn a commission on new sign-ups."
      }
    ]
  },
  "pDbRjYYUjRI": {
    "summary": "An n8n workflow that takes a music genre from a form, writes a Suno prompt with OpenAI, generates instrumental tracks and a Nano Banana Pro background image through the KIE API, then assembles a video in Creatomate and saves it to Google Drive. Everything works up to the Creatomate step, which errors in the demo and still needs debugging.",
    "whatYouBuild": "An n8n workflow with a form trigger, OpenAI prompt steps, KIE API calls for Suno music and Nano Banana Pro images with polling loops, a Creatomate render and a Google Drive upload.",
    "toolsUsed": [
      "n8n",
      "Suno",
      "KIE",
      "Nano Banana Pro",
      "Creatomate",
      "OpenAI API",
      "Google Drive"
    ],
    "keySteps": [
      {
        "seconds": 70,
        "step": "Add an n8n form trigger that collects the music genre."
      },
      {
        "seconds": 96,
        "step": "Ask an OpenAI node for a Suno prompt under 500 characters."
      },
      {
        "seconds": 195,
        "step": "Call the KIE Suno endpoint for instrumental tracks using the prompt, genre and model version."
      },
      {
        "seconds": 330,
        "step": "Poll the task every 10 seconds until the track status is a success."
      },
      {
        "seconds": 425,
        "step": "Generate an image prompt, then create a 16:9, 2K PNG with Nano Banana Pro and poll until done."
      },
      {
        "seconds": 640,
        "step": "Render a Creatomate template with the two audio URLs and the image, then wait for the render."
      },
      {
        "seconds": 908,
        "step": "Download the video and upload it to Google Drive."
      }
    ],
    "notCovered": [
      "A working Creatomate render. The presenter says that part is not working yet and the run errors there.",
      "Costs for Suno, KIE and Creatomate credits per video.",
      "Automatic YouTube upload. The presenter advises uploading manually because YouTube can detect automated uploads.",
      "Music quality beyond one short sample, and any rights questions around publishing AI-generated music."
    ],
    "qa": [
      {
        "q": "Does the whole workflow run end to end?",
        "a": "Not in this video. The music and image steps run, but the video render step fails and needs debugging."
      },
      {
        "q": "Why does the Suno prompt have a length limit?",
        "a": "The presenter says prompts must be under 500 characters or Suno will not generate the track."
      },
      {
        "q": "Is there a manual option?",
        "a": "Yes. Generate tracks in Suno and put them together in a video editor such as Kdenlive or CapCut, which the presenter says is easier in the long run."
      }
    ]
  },
  "vmEac5CJcNQ": {
    "summary": "Use Claude Opus 4.6 to plan a YouTube analytics web app as a ten-phase master prompt, then paste the prompts one by one into Claude Code. The video shows the performance chart and video list prompts being built with Prisma and a dashboard. The app cannot be previewed yet, and Claude Pro rate limits are already a problem.",
    "whatYouBuild": "A Next.js style YouTube analytics dashboard built from a technical spec and a series of prompts, with a performance timeline chart, an API route and a video list page.",
    "toolsUsed": [
      "Claude Code",
      "Claude Opus 4.6",
      "VS Code",
      "Prisma"
    ],
    "keySteps": [
      {
        "step": "Ask Opus 4.6 to write a technical specification and a master prompt for a YouTube analytics platform."
      },
      {
        "step": "Answer its questions about the focus and features, then copy each phase prompt into Claude Code."
      },
      {
        "step": "Build a performance timeline chart with an API endpoint and a Prisma query for daily views and subscribers."
      },
      {
        "step": "Build a video list page with a video model, a card component and bulk actions."
      },
      {
        "step": "Approve each to-do and let Claude Code verify, build and lint after every prompt."
      }
    ],
    "notCovered": [
      "A running app. There is no index page to preview yet and the presenter plans ten phases.",
      "The final cost and the planned $19 a month price, which are only floated.",
      "How well the generated code works, since the presenter does not read it.",
      "Rate limits in detail. The presenter says they are hitting them on Claude Pro and may switch to API credits."
    ],
    "qa": [
      {
        "q": "How does the planning work?",
        "a": "Opus 4.6 writes a master prompt split into numbered phases, and each phase is pasted into Claude Code in order."
      },
      {
        "q": "Did the presenter write any code?",
        "a": "The presenter says no, and approves each step in Claude Code instead."
      },
      {
        "q": "Is the app available?",
        "a": "Not yet. The presenter was still building it and waiting on a domain name."
      }
    ]
  },
  "OUgxXuWG_wU": {
    "summary": "Turn a stock tracker web app into an Electron desktop app for Linux using Hermes Agent with a free MiniMax 2.5 model through OpenCode. The wrapper takes about ten minutes and runs. A chart scroll-to-load bug resists Hermes and OpenCode, and Codex fixes it. A modify-order bug is noted but not fixed. Trades use Alpaca's sandbox data, not real money.",
    "whatYouBuild": "An Electron wrapper around an existing stock tracking web app, run with npm run electron, plus a short tour of three Hermes cron jobs.",
    "toolsUsed": [
      "Hermes Agent",
      "OpenCode",
      "Electron",
      "Alpaca API",
      "Codex"
    ],
    "keySteps": [
      {
        "seconds": 24,
        "step": "Tour the stock tracker, which uses the Alpaca API for sandbox orders."
      },
      {
        "seconds": 60,
        "step": "Run the same prompt in the Hermes terminal and the Hermes desktop app."
      },
      {
        "seconds": 135,
        "step": "Switch to the free MiniMax 2.5 model in OpenCode after the desktop app hits a 404 on its default model."
      },
      {
        "seconds": 202,
        "step": "Watch the agent add Electron, a main.js entry point and scripts to the project."
      },
      {
        "seconds": 358,
        "step": "Run the native Linux app and place a sandbox order."
      },
      {
        "seconds": 400,
        "step": "Find that scrolling the chart does not load newer data."
      },
      {
        "seconds": 525,
        "step": "See three Hermes cron jobs for email list syncing, channel reports and topic research."
      },
      {
        "seconds": 613,
        "step": "Switch to Codex, which fixes the chart history loading, then commit and push."
      }
    ],
    "notCovered": [
      "An installer or packaged build. The app runs from npm run electron.",
      "Fixing the modify-order bug the presenter spots.",
      "How the cron jobs are created, which the presenter saves for another video.",
      "Real trading, security of the API keys, or a speed test. The desktop Hermes app feeling slower is an impression."
    ],
    "qa": [
      {
        "q": "Is the trading real?",
        "a": "No. The presenter says the orders use sandboxed test data and are not real money."
      },
      {
        "q": "Which tool fixed the chart bug?",
        "a": "Codex on GPT 5.4 Mini. Hermes and OpenCode could not get the scroll loading to work."
      },
      {
        "q": "How long did the desktop app take?",
        "a": "About ten minutes for the wrapper. The presenter says the original web app took roughly three hours."
      }
    ]
  },
  "_ikohuukGE4": {
    "summary": "Build a landing page for a Skool community in Google Antigravity with Gemini 3.1 Pro, using a master prompt that Claude writes from screenshots of a reference site. The first version appears in about five minutes, the presenter edits names and links by hand, and OpenCode finishes all 16 sections after Gemini credits run low. Placeholder testimonials and the pricing still need fixing, and no conversion results are shown.",
    "whatYouBuild": "A single-file HTML landing page with inline CSS and JavaScript, built section by section from prompts, with plans, FAQs and links to the Skool community.",
    "toolsUsed": [
      "Google Antigravity",
      "Gemini 3.1 Pro",
      "Claude",
      "OpenCode"
    ],
    "keySteps": [
      {
        "seconds": 33,
        "step": "Ask Claude for a master prompt based on screenshots of a reference landing page."
      },
      {
        "seconds": 71,
        "step": "Copy the reference site's color scheme and layout through the screenshots."
      },
      {
        "seconds": 127,
        "step": "Choose a production-ready single HTML file with inline CSS and JavaScript."
      },
      {
        "seconds": 173,
        "step": "Switch between Claude Code, Gemini and OpenCode to manage credit limits."
      },
      {
        "seconds": 253,
        "step": "Open the first draft, which includes hero, testimonials and pricing sections."
      },
      {
        "seconds": 431,
        "step": "Edit the brand name and community links directly in index.html."
      },
      {
        "seconds": 633,
        "step": "Run the section prompts in OpenCode to build all 16 sections."
      },
      {
        "seconds": 711,
        "step": "Review the finished responsive page with its FAQ and plans."
      }
    ],
    "notCovered": [
      "Replacing the generated placeholder testimonials with real ones, which the presenter says still has to be done.",
      "Correct pricing. The page shows wrong prices the presenter plans to fix.",
      "Any conversion data or the Facebook pixel for ads, which are only planned.",
      "Whether copying a reference site's look and layout raises design or copyright concerns."
    ],
    "qa": [
      {
        "q": "Why build a landing page at all?",
        "a": "The presenter says the Skool about page for a free community shows only the free plan, so visitors never see the paid plans."
      },
      {
        "q": "How long did it take?",
        "a": "About five minutes for the first draft and about ten more minutes in OpenCode to build all 16 sections."
      },
      {
        "q": "Which tools cost money?",
        "a": "The presenter quotes about $10 a month for Gemini and $20 a month for Claude Code, with OpenCode used as a mostly free fallback."
      }
    ]
  },
  "wakl0ayO_fk": {
    "summary": "An introduction to Jev, a fast decision model from Typesafe AI that returns structured answers with probabilities instead of text, plus a hands-on install in Claude Code and Codex. The speed and cost figures come from the vendor and its demos. The presenter tests a site slop checker, routes Codex through the Jev router and runs an SEO and GEO orchestrator that reports a citation gap.",
    "whatYouBuild": "Jev set up in Claude Code and Codex with the Typesafe skill, the Jev Browser Use skill and the Jev router, followed by an SEO and GEO audit bundle.",
    "toolsUsed": [
      "Jev",
      "Typesafe AI",
      "Claude Code",
      "Codex"
    ],
    "keySteps": [
      {
        "seconds": 66,
        "step": "Read the Jev site and its benchmark claims of much lower cost and latency."
      },
      {
        "seconds": 96,
        "step": "Understand Jev as a quick decision step beside a larger model that does the thinking."
      },
      {
        "seconds": 212,
        "step": "Run the Made with Jev slop detector on the presenter's site, which scores about 50 percent."
      },
      {
        "seconds": 278,
        "step": "Join the waitlist and create a Typesafe AI account."
      },
      {
        "seconds": 336,
        "step": "Add the Typesafe plugin marketplace in Claude Code and install the skill."
      },
      {
        "seconds": 420,
        "step": "Install the Jev Browser Use skill from the terminal."
      },
      {
        "seconds": 469,
        "step": "Install the Jev router with npm, set the API key and start Codex through it."
      },
      {
        "seconds": 578,
        "step": "Run the SEO and GEO orchestrator and read the audit and citation reports."
      }
    ],
    "notCovered": [
      "Independent checks of the quoted 20 to 200 times faster and 40 to 400 times cheaper claims, or of the cost of the demos.",
      "How Jev decisions compare with a general model on the presenter's own tasks.",
      "Fixing the citation gaps the report found.",
      "Access beyond the waitlist, which the presenter already had."
    ],
    "qa": [
      {
        "q": "What does Jev do?",
        "a": "It answers structured questions quickly and returns probabilities and confidence scores. It does not write text, so it sits beside a general model."
      },
      {
        "q": "Are the speed and price claims verified?",
        "a": "No. They come from the founder's post, the Jev site and its demos. The video does not test them independently."
      },
      {
        "q": "What did the test spend show?",
        "a": "After the API key was set, the presenter saw three requests and about 4,200 tokens, at a cost of roughly two cents."
      }
    ]
  },
  "dEQ8OllsJmk": {
    "summary": "An n8n workflow that watches a Google Drive folder for new short clips, uploads each one to YouTube as unlisted, then generates a description, tags and title from the transcript and publishes it. The upload works, but the Apify transcript step fails in the demo, so the AI steps run without a transcript.",
    "whatYouBuild": "An n8n workflow with a Google Drive trigger, a download and YouTube upload, an Apify transcript call, OpenAI and Gemini steps for description, tags and title, and a final YouTube update that makes the video public.",
    "toolsUsed": [
      "n8n",
      "Google Drive",
      "YouTube",
      "Apify",
      "OpenAI API",
      "Google Gemini",
      "Opus Clip"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Add a Google Drive trigger that polls a Shorts folder every hour."
      },
      {
        "seconds": 70,
        "step": "Download the new file by its ID."
      },
      {
        "seconds": 105,
        "step": "Upload it with the YouTube node, using the file name as the title and unlisted visibility."
      },
      {
        "seconds": 140,
        "step": "Call an Apify YouTube transcript actor with an HTTP request."
      },
      {
        "seconds": 175,
        "step": "Write the description with a GPT-4.1 nano node using the transcript."
      },
      {
        "seconds": 210,
        "step": "Generate comma-separated tags with an AI agent on Gemini."
      },
      {
        "seconds": 245,
        "step": "Generate a title of up to 100 characters."
      },
      {
        "seconds": 280,
        "step": "Update the video with the title, description and tags, notify subscribers and set it to public."
      }
    ],
    "notCovered": [
      "A working transcript step. It fails in the demo and the presenter does not know why.",
      "YouTube API quota or any platform rules on automated uploads.",
      "Quality control before a video goes public, since the final step publishes automatically.",
      "Costs for the OpenAI, Gemini and Apify calls."
    ],
    "qa": [
      {
        "q": "Where do the short clips come from?",
        "a": "The presenter makes them with Opus Clip, downloads them and drops them into the Google Drive folder."
      },
      {
        "q": "Why upload as unlisted first?",
        "a": "The workflow uploads unlisted, adds the metadata, and only then switches the video to public."
      },
      {
        "q": "Where is the template?",
        "a": "The presenter says it is on Gumroad and in their Skool community."
      }
    ]
  },
  "ByncCPWeGNY": {
    "summary": "Set up the official Hermes Agent desktop app from Nous Research on Linux with the one-line installer and the setup wizard, using a free Step 3.7 Flash model. The tour covers models, themes, memory, provider keys, messaging gateways, MCP servers, skills and tools, and a cron job tab with two existing jobs. Gateways and the new cron job are not completed.",
    "whatYouBuild": "A Hermes desktop app install connected to a free Nous model, OpenRouter and OpenCode Go models, with persistent memory on and an existing cron job list.",
    "toolsUsed": [
      "Hermes Agent",
      "OpenRouter",
      "OpenCode Go",
      "Codex"
    ],
    "keySteps": [
      {
        "seconds": 34,
        "step": "Run the curl command that installs or updates the desktop app on Linux, with downloads for Windows and Mac."
      },
      {
        "seconds": 67,
        "step": "Look at the plans, which run from free up to $200 a month, and enter the setup wizard code."
      },
      {
        "seconds": 134,
        "step": "Open the app, install the available update and send a first message."
      },
      {
        "seconds": 182,
        "step": "Pick models, including Codex and OpenCode Go, and change the theme."
      },
      {
        "seconds": 259,
        "step": "Add an OpenRouter API key and turn on the models you want."
      },
      {
        "seconds": 314,
        "step": "Review the messaging gateways and MCP server settings, and skip the phone gateways."
      },
      {
        "seconds": 359,
        "step": "Check the built-in skills and tools, such as cron jobs and search."
      },
      {
        "seconds": 469,
        "step": "Ask for cron job ideas, list the existing jobs and open the cron tab."
      },
      {
        "seconds": 568,
        "step": "Check credit usage per model."
      }
    ],
    "notCovered": [
      "Connecting WhatsApp, Telegram or other gateways, which the presenter skips.",
      "Whether the suggested health watchdog cron job was created or ran.",
      "What the paid plans add beyond the free plan, or current prices, which are quoted from the video.",
      "Data handling and privacy for the memory feature."
    ],
    "qa": [
      {
        "q": "Is this the official app?",
        "a": "Yes. The presenter contrasts it with an unofficial desktop app covered in an earlier video."
      },
      {
        "q": "Which systems does it support?",
        "a": "Linux through the curl command, plus a Windows executable and a Mac DMG, according to the video."
      },
      {
        "q": "Do I need the terminal afterwards?",
        "a": "Mostly no. The presenter says provider keys, models, skills and cron jobs can all be handled inside the app."
      }
    ]
  },
  "YCjvrNI1pa4": {
    "summary": "A beginner walkthrough of Apollo for B2B lead generation: filter people by job title, location, industry, keywords and company size, save a list, and review a cold email sequence. The presenter then shows an Apify actor that scrapes Apollo searches for about $1.20 per 1,000 leads and exports a CSV. Free plan limits apply, and no cold email law or terms of use are covered.",
    "whatYouBuild": "An Apollo search narrowed from about 2 million people to about 3,700, a saved list of 25 contacts at a time, and an Apify export of leads to CSV for an email tool.",
    "toolsUsed": [
      "Apollo",
      "Apify",
      "Make.com",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 65,
        "step": "Sign up for the free Apollo plan and open the People tab."
      },
      {
        "seconds": 123,
        "step": "Filter to verified emails, founder and CEO titles, US companies, management consulting, the AI keyword and 1 to 10 employees."
      },
      {
        "seconds": 314,
        "step": "Create a list and add contacts 25 at a time, within the free plan's five pages of results."
      },
      {
        "seconds": 387,
        "step": "Copy the search URL into an Apify Apollo actor, set 100 records and export the leads to CSV."
      },
      {
        "seconds": 516,
        "step": "Review an example email sequence for HVAC companies with follow-ups after five and seven days."
      },
      {
        "seconds": 608,
        "step": "Check mailbox settings, the deliverability rating and the ramp-up option."
      }
    ],
    "notCovered": [
      "Legal rules for cold email such as consent, opt-out and data protection laws in different countries.",
      "Apollo's and Apify's terms of use on scraping, or whether scraping avoids credits fairly.",
      "Results. The sequence shows 470 contacts, 369 scheduled and about 99 delivered, with no replies or sales reported.",
      "Pricing beyond what is quoted: unlimited sequences are said to need the $99 a month plan."
    ],
    "qa": [
      {
        "q": "What are the free plan limits?",
        "a": "The presenter says five pages of search results, about 100 contacts, and two email sequences."
      },
      {
        "q": "How much does the Apify Apollo scraper cost?",
        "a": "The presenter quotes $1.20 per 1,000 leads and says the monthly free credit could cover around 3,000 leads."
      },
      {
        "q": "Can Make.com automate the scraping?",
        "a": "The presenter says automating through the API needs a paid Apify plan."
      }
    ]
  },
  "bBGqWXXIw44": {
    "summary": "A backlink outreach pipeline built in Hermes Agent for two of the presenter's sites. Cron jobs search for articles that mention competitors, use Firecrawl, Playwright and Hunter to find author contact details, write personalized pitches into a markdown file and send them through Mailgun with warm-up, follow-ups and bounce checks. Delivery rate is about 78 percent, and no replies or backlinks are shown.",
    "whatYouBuild": "Two Hermes cron jobs that find articles, extract author emails, draft pitches into a markdown log and send emails through Mailgun with safety limits and follow-ups.",
    "toolsUsed": [
      "Hermes Agent",
      "Firecrawl",
      "Hunter",
      "Mailgun",
      "Playwright"
    ],
    "keySteps": [
      {
        "seconds": 67,
        "step": "Walk through the architecture: search for competitor mentions, dedupe, check safety, read each article and find the author."
      },
      {
        "seconds": 100,
        "step": "Set sending limits and safety gates in Mailgun, including blocked risky domains and skipped bounces."
      },
      {
        "seconds": 139,
        "step": "Generate a personalized pitch for each article into a markdown file."
      },
      {
        "seconds": 258,
        "step": "Install Firecrawl and note the free tier limit of 10 requests a minute."
      },
      {
        "seconds": 283,
        "step": "Add Hunter to find email addresses, using its API key in the environment file."
      },
      {
        "seconds": 369,
        "step": "Wire Firecrawl into the cron job, keeping Playwright for contact forms."
      },
      {
        "seconds": 495,
        "step": "Check Mailgun delivery, send volume and the cron job list, and fix a failing job."
      }
    ],
    "notCovered": [
      "Replies, accepted pitches or new backlinks. The video shows sending, not outcomes.",
      "Anti-spam and data protection rules for emailing people whose addresses were scraped.",
      "Website terms that restrict scraping, and the accuracy of found emails, which the presenter says is not always right.",
      "How often a blocked or failing step stops the job."
    ],
    "qa": [
      {
        "q": "How does it avoid spam problems?",
        "a": "It starts at about five emails a day and ramps up, blocks risky domains, skips addresses that bounced and follows up at 3, 5 and 7 days. The video does not test whether this keeps inbox placement."
      },
      {
        "q": "What does each tool do?",
        "a": "Firecrawl scrapes pages, Hunter finds email addresses, Playwright submits contact forms and Mailgun sends and tracks the emails."
      },
      {
        "q": "What are the free tier limits mentioned?",
        "a": "Firecrawl at 10 requests a minute, Hunter at 50 credits a month and Mailgun at about 100 emails a day, as stated in the video."
      }
    ]
  },
  "7UMrV3w1e40": {
    "summary": "Install n8n on Ubuntu with Node.js and npm, run it on localhost, build a first OpenAI workflow and try several templates from the n8n site. Some templates need extra keys or missing nodes and do not run. A Gemini image generator template works. This is a local test setup, not a production server.",
    "whatYouBuild": "A local n8n instance on Ubuntu started from the terminal, a manual-trigger OpenAI workflow, and imported templates for image generation, video generation and YouTube summaries.",
    "toolsUsed": [
      "n8n",
      "Ubuntu",
      "Node.js",
      "OpenAI API",
      "Apify"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Update Ubuntu, install Node.js and the Node package manager, then install and start n8n."
      },
      {
        "seconds": 80,
        "step": "Open the local dashboard and sign in."
      },
      {
        "seconds": 120,
        "step": "Create a workflow with a manual trigger and an OpenAI message node."
      },
      {
        "seconds": 165,
        "step": "Import a free template from the n8n templates site into the local instance."
      },
      {
        "seconds": 210,
        "step": "Import a daily video generation template, which stops on an unrecognized node and a missing Veo key."
      },
      {
        "seconds": 255,
        "step": "Try a YouTube summary template, which needs an Apify key."
      },
      {
        "seconds": 300,
        "step": "Run a free AI image generator template and view the generated island image."
      }
    ],
    "notCovered": [
      "Running n8n on a server with HTTPS, webhooks reachable from the internet or backups.",
      "Updating n8n or keeping it running after a reboot.",
      "Whether the quoted cloud price range of $20 to $800 a month is current.",
      "Posting to Facebook, which needs an access token that is not set up."
    ],
    "qa": [
      {
        "q": "Is this the same as the cloud version?",
        "a": "The presenter says it looks and works like the standard n8n, running on a local machine instead of a paid cloud plan."
      },
      {
        "q": "Do the templates work right away?",
        "a": "Not always. Some need credentials, API keys or nodes that are missing, and the presenter shows several that stop for that reason."
      },
      {
        "q": "Why Linux?",
        "a": "The presenter finds it faster than Windows and simpler than setting up Docker on Windows. This is a personal view."
      }
    ]
  },
  "ncg6F27PYt0": {
    "summary": "A first look at Kilo Code, an open-source coding agent, in the terminal, in VS Code and in its browser app builder, using a free model to build a one-page SEO checker in about ten minutes for roughly four cents of credit. The result scores a site at 69 percent but looks rough and its analyzer does not work locally at first. It also provisions KiloClaw, a hosted assistant. The description link is a referral link.",
    "whatYouBuild": "A single-page SEO checker built with Kilo Code in VS Code and in the browser app, plus a KiloClaw cloud assistant on a free trial.",
    "toolsUsed": [
      "Kilo Code",
      "VS Code",
      "KiloClaw"
    ],
    "keySteps": [
      {
        "seconds": 60,
        "step": "Install Kilo Code and check the modes: plan, debug, orchestrator, ask and code."
      },
      {
        "seconds": 102,
        "step": "Open the command line version with the kilocode command."
      },
      {
        "seconds": 134,
        "step": "Choose modes and switch models in the terminal."
      },
      {
        "seconds": 173,
        "step": "Install the VS Code extension and set reasoning effort to high."
      },
      {
        "seconds": 295,
        "step": "Sign in to the browser app builder, which comes with about $2.50 in free credits."
      },
      {
        "seconds": 388,
        "step": "Ask both versions to build an SEO tool using the free auto model and compare them."
      },
      {
        "seconds": 554,
        "step": "Start a KiloClaw instance on the free trial and ask it a first question."
      }
    ],
    "notCovered": [
      "Connecting KiloClaw to WhatsApp, Discord or Slack. Those channels are shown as options only.",
      "A polished app. The presenter says the styling needs work and the local analyzer cannot fetch the site yet.",
      "A fair test against OpenCode or Cursor. The comparison is the presenter's impression.",
      "Paid plan details, which are mentioned only briefly."
    ],
    "qa": [
      {
        "q": "What did the app cost to build?",
        "a": "The presenter's credit balance went from about $2.50 to $2.46, using the free auto model."
      },
      {
        "q": "Is the SEO score trustworthy?",
        "a": "The checker gave 69 percent with a breakdown, but the video does not verify its accuracy."
      },
      {
        "q": "Is the sign-up link a referral link?",
        "a": "Yes. The description link is a referral link that the presenter says adds credits on a first top-up."
      }
    ]
  },
  "xB0ChiVjWu4": {
    "summary": "Deploy the Morphic AI answer engine template on Vercel from a GitHub clone, using OpenAI and Tavily keys, then look at Vercel's subscription starter and SaaS landing page templates that connect to Stripe. The deploy works and the app answers questions, but one model provider errors. The Stripe and custom domain steps are shown as demos, not completed.",
    "whatYouBuild": "A deployed Morphic app on Vercel linked to the presenter's GitHub, plus cloned subscription starter and landing page templates.",
    "toolsUsed": [
      "Vercel",
      "GitHub",
      "Morphic",
      "Stripe",
      "OpenAI API"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Sign in with GitHub and pick the Morphic template from Vercel's templates."
      },
      {
        "seconds": 75,
        "step": "Try the Morphic demo to see how it answers questions with sources."
      },
      {
        "seconds": 125,
        "step": "Clone it into GitHub, add OpenAI and Tavily API keys and deploy."
      },
      {
        "seconds": 185,
        "step": "Test models in the live app, where one provider returns an error and GPT 4.1 works."
      },
      {
        "seconds": 230,
        "step": "Preview the subscription starter template that uses Stripe keys for monthly and yearly plans."
      },
      {
        "seconds": 280,
        "step": "Clone the SaaS landing page template built with Next.js and Tailwind."
      },
      {
        "seconds": 335,
        "step": "Look at buying a domain through Vercel and adding an existing one."
      }
    ],
    "notCovered": [
      "A real Stripe connection or a paid sign-up. Only the demo templates are shown.",
      "Abuse and cost control for a public app that spends your OpenAI and Tavily keys.",
      "Actually adding a custom domain. The presenter says they would buy one later.",
      "Template licenses and whether the template's features match what is claimed."
    ],
    "qa": [
      {
        "q": "What keys does Morphic need?",
        "a": "An OpenAI API key and a Tavily search key, according to the deploy form in the video."
      },
      {
        "q": "Did every model work?",
        "a": "No. The DeepSeek option returned a provider not available error, and switching to GPT 4.1 worked."
      },
      {
        "q": "How much was the domain?",
        "a": "The presenter says a morphic.dev domain is about $9 a year through Vercel. Check current prices."
      }
    ]
  },
  "7p3n6-FH9IQ": {
    "summary": "An n8n workflow for answering WhatsApp messages with an AI agent: a WhatsApp Business Cloud trigger, an OpenRouter chat model with memory, and a send-message node, set up through a Meta developer app. The Meta side tests fine, but the n8n send step still errors because the business number is not yet verified, so the workflow does not run end to end.",
    "whatYouBuild": "A two-part n8n workflow that receives WhatsApp messages through a Meta webhook, replies with an AI agent on OpenRouter, and is meant to send the reply back through the WhatsApp node.",
    "toolsUsed": [
      "n8n",
      "WhatsApp Business Cloud API",
      "Meta for Developers",
      "OpenRouter"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Add the WhatsApp Business Cloud trigger and note its test and production webhook URLs."
      },
      {
        "seconds": 80,
        "step": "Create an app in Meta for Developers and copy the app ID and client secret into n8n."
      },
      {
        "seconds": 180,
        "step": "Add an AI agent with a chat model and a memory node."
      },
      {
        "seconds": 230,
        "step": "Create an OpenRouter key and pick a GPT model."
      },
      {
        "seconds": 280,
        "step": "Add a WhatsApp send-message node with an access token and the business account ID."
      },
      {
        "seconds": 340,
        "step": "Turn on the messages webhook field in Meta and test it with the n8n callback URL."
      }
    ],
    "notCovered": [
      "A working reply. Sending fails while Meta business verification and number registration are pending.",
      "The cause of the n8n error. The presenter guesses it is the unverified number and asks viewers for help.",
      "Cost of messages or model calls, and WhatsApp business messaging policies.",
      "Handling of private customer messages by a third-party model."
    ],
    "qa": [
      {
        "q": "Does the automation work?",
        "a": "Not yet in this video. The Meta webhook test passes, but the send step errors and the number is awaiting verification."
      },
      {
        "q": "Why OpenRouter?",
        "a": "The presenter wants to avoid burning ChatGPT or Claude credits on a high volume of messages and can pick cheaper models."
      },
      {
        "q": "How long does Meta verification take?",
        "a": "The presenter expects two or three days after submitting the business information."
      }
    ]
  },
  "jtyWB5iGPOs": {
    "summary": "Create a custom OpenCode skill that turns a long screen recording with a webcam overlay into a 1080 by 1920 YouTube Short, with the screen share on top and the webcam below. The generated skill uses FFmpeg and OpenCV to find the webcam, and a render takes about 20 seconds. A follow-up prompt closes a black gap. Subtitles are left out.",
    "whatYouBuild": "An OpenCode skill with a SKILL.md and two Python scripts that detect the webcam and stack the screen share over it into a vertical 45 to 55 second Short.",
    "toolsUsed": [
      "OpenCode",
      "FFmpeg",
      "OpenCV",
      "Python"
    ],
    "keySteps": [
      {
        "seconds": 50,
        "step": "Install the OpenCode skill creator globally with the npx command."
      },
      {
        "seconds": 81,
        "step": "Write a prompt that sets the layout: webcam in the bottom half, screen share on top, 1080 by 1920, 45 to 55 seconds."
      },
      {
        "seconds": 146,
        "step": "Let OpenCode check for FFmpeg and install OpenCV, then generate the skill."
      },
      {
        "seconds": 221,
        "step": "Read the generated SKILL.md and the pip detection and transform scripts."
      },
      {
        "seconds": 318,
        "step": "Run the skill on a recording, which finishes in about 20 seconds."
      },
      {
        "seconds": 424,
        "step": "Ask for the black gap between the two halves to be closed and regenerate."
      },
      {
        "seconds": 480,
        "step": "Review the aligned Short and run it on a second video."
      }
    ],
    "notCovered": [
      "How the 45 to 55 second segment is chosen from a longer video.",
      "Subtitles, which the presenter leaves off.",
      "Results across different recordings or webcam positions. The prompt tells the skill the webcam is bottom right.",
      "A fair timing comparison. The 20 seconds versus five to eight minutes for another skill is the presenter's own observation."
    ],
    "qa": [
      {
        "q": "Which model did the presenter use?",
        "a": "A free Qwen 3.6 Plus model in OpenCode, so the build cost essentially nothing."
      },
      {
        "q": "Is the skill available?",
        "a": "Not yet. The presenter says they may put it on Gumroad."
      },
      {
        "q": "Why not use the earlier Video Use skill?",
        "a": "The presenter found that skill had problems producing the Shorts layout and took much longer."
      }
    ]
  },
  "4hwdzAiaybI": {
    "summary": "Install the free Claude SEO skill in Claude Code and run a full audit on a WordPress consulting site. The report is 561 lines with an action plan, health scores and top issues such as no schema markup, missing meta descriptions on 93 pages and no llms.txt. The presenter cannot apply fixes because the WordPress plan has no SSH or SFTP, and the GEO run only starts.",
    "whatYouBuild": "A Claude SEO skill install and a full-site audit that writes a markdown report and an action plan for a WordPress site.",
    "toolsUsed": [
      "Claude SEO",
      "Claude Code",
      "WordPress"
    ],
    "keySteps": [
      {
        "step": "Install Claude SEO with the one-line curl command, which also works in Antigravity."
      },
      {
        "step": "Run a full audit, which fetches every page, identifies the business type and checks technical SEO and content quality."
      },
      {
        "step": "Read the 561-line audit report with pass and fail marks, such as a sitemap reference warning."
      },
      {
        "step": "Review the action plan with health scores and the top five critical issues."
      },
      {
        "step": "Start a GEO check, which notes the missing llms.txt file."
      }
    ],
    "notCovered": [
      "Any of the fixes. The site is on a WordPress plan without SSH or SFTP, so the skill cannot edit its files.",
      "The GEO analysis results. The run starts at the end and is not shown.",
      "Checking the scores or findings against another tool or by hand.",
      "A comparison with paid SEO suites."
    ],
    "qa": [
      {
        "q": "Is Claude SEO free?",
        "a": "The presenter says it is free and installs from GitHub as a Claude Code skill."
      },
      {
        "q": "What does it check?",
        "a": "Full site audits, single pages, sitemaps and generative engine optimization, per the presenter."
      },
      {
        "q": "What were the biggest issues?",
        "a": "No schema markup, missing meta descriptions on 93 pages, missing or multiple H1 tags and a nearly empty homepage, according to the report."
      }
    ]
  },
  "uTYZC3Kxwjo": {
    "summary": "A first-impression tour of MindStudio, a no-code AI agent builder, recorded by someone who has never used it. The presenter explores the free plan, templates, launch variables and the pricing page, does not get an agent running, and concludes that Make.com is easier for their needs. API access needs the business plan. The MindStudio and Make.com links are affiliate links.",
    "whatYouBuild": "Nothing working. The video starts an agent in MindStudio, hits launch variable errors and a publishing paywall, and compares the tool with Make.com.",
    "toolsUsed": [
      "MindStudio",
      "Make.com"
    ],
    "keySteps": [
      {
        "seconds": 103,
        "step": "Review the plans: a free tier with 1,000 runs a month and paid plans from about $20 a month."
      },
      {
        "seconds": 143,
        "step": "Start a new agent with an on-demand trigger and try to run it, which errors without launch variables."
      },
      {
        "seconds": 232,
        "step": "Look at data sources for uploading a knowledge base and at user inputs."
      },
      {
        "seconds": 396,
        "step": "Browse more than 100 templates, some of which need the Chrome extension."
      },
      {
        "seconds": 559,
        "step": "Find that API access, needed for the Make.com connection, is on the business plan."
      }
    ],
    "notCovered": [
      "A working agent. The presenter says they do not know what they are doing and stops before finishing one.",
      "What launch variables do in practice, which the documentation does not make clear to the presenter.",
      "Publishing, which needs a paid plan, or any fair comparison of results with Make.com or Zapier.",
      "Whether the learning curve claim holds up. It rests on one short session."
    ],
    "qa": [
      {
        "q": "Is this a tutorial?",
        "a": "Not really. The presenter says so at the end and apologizes that it is not the complete tutorial they hoped for."
      },
      {
        "q": "Can I use the free plan to publish an agent?",
        "a": "The presenter could not publish on the free plan and was asked to upgrade."
      },
      {
        "q": "Are the links affiliate links?",
        "a": "Yes, for both MindStudio and Make.com, according to the video."
      }
    ]
  },
  "P7lbzDAb-qk": {
    "summary": "A look at ways to try OpenAI's Sora 2 in October 2025. The presenter checks the official iOS app, Higgsfield, Sora2.run, Artlist and HeyGen and finds each needs a paid plan. No finished video is shown, and the one HeyGen attempt is blocked by Sora's content policy. The HeyGen link is an affiliate link, so the title's promise of professional videos in minutes is not delivered.",
    "whatYouBuild": "Nothing is finished. The video compares access routes and prices for Sora 2 and attempts one HeyGen UGC-style ad video.",
    "toolsUsed": [
      "Sora 2",
      "Higgsfield",
      "Artlist",
      "HeyGen"
    ],
    "keySteps": [
      {
        "seconds": 80,
        "step": "Watch sample Sora 2 clips from OpenAI's announcement."
      },
      {
        "seconds": 125,
        "step": "Check Higgsfield, where Sora 2 needs a paid plan from about $9 a month."
      },
      {
        "seconds": 170,
        "step": "Try Sora2.run, which asks for a paid plan before generating."
      },
      {
        "seconds": 210,
        "step": "Try Artlist, which asks for a $20 a month plan."
      },
      {
        "seconds": 255,
        "step": "Open HeyGen, which includes Veo 3.1 and Sora 2 features."
      },
      {
        "seconds": 300,
        "step": "Find the Sora 2 UGC ad video tool in HeyGen and submit a photo, which is blocked by the content policy."
      },
      {
        "seconds": 345,
        "step": "Review the HeyGen plan prices and what the Creator plan includes."
      }
    ],
    "notCovered": [
      "Any finished Sora 2 video. The only attempt fails with a content moderation block.",
      "Free access. The presenter does not find a free route and suggests an invite code from a friend.",
      "Current prices, which are quoted as seen in October 2025.",
      "Why the photo was blocked, and consent and likeness rules for AI video of real people."
    ],
    "qa": [
      {
        "q": "Can I use Sora 2 for free?",
        "a": "Not in this video. Every platform tried asks for a paid plan, and the presenter points to an invite code on the official app as the other route."
      },
      {
        "q": "Did the HeyGen test work?",
        "a": "No. The request was blocked by Sora's content policy before a video was made."
      },
      {
        "q": "Is the HeyGen link an affiliate link?",
        "a": "Yes. The presenter says they earn a commission, which they put at 20 to 30 percent."
      }
    ]
  },
  "MABL6XZgy4g": {
    "summary": "Rebuild an agency website that was first made in Lovable, using Claude Desktop to write a replication prompt and Codex to generate a Vite and React site. The first version runs in about ten minutes and the polished one in about thirty. It is pushed to GitHub and deployed on Vercel, with PageSpeed scores of 90 on mobile and 98 on desktop. The custom domain and the code review results are not finished.",
    "whatYouBuild": "A Vite and React landing page with a sticky nav, animated hero, pricing toggle, FAQ and consultation modal, deployed on Vercel from a GitHub repository.",
    "toolsUsed": [
      "Codex",
      "Claude Desktop",
      "Vercel",
      "GitHub"
    ],
    "keySteps": [
      {
        "seconds": 65,
        "step": "Ask Claude Desktop for a detailed prompt that replicates the current site in Vite and React."
      },
      {
        "seconds": 86,
        "step": "Paste the prompt into Codex and answer its questions about copy and design direction."
      },
      {
        "seconds": 138,
        "step": "Watch Codex create the components, sections, styles and a written implementation plan."
      },
      {
        "seconds": 335,
        "step": "Preview the local dev server and ask for extra polish such as scroll highlighting and a mobile menu."
      },
      {
        "seconds": 423,
        "step": "Commit and push to GitHub, then import the project into Vercel with the Vite preset."
      },
      {
        "seconds": 550,
        "step": "Ask Codex for a full code review of the live build."
      },
      {
        "seconds": 693,
        "step": "Run PageSpeed Insights and read the mobile and desktop performance scores."
      }
    ],
    "notCovered": [
      "The results of the code review, which the presenter requests but does not read out.",
      "Connecting the custom domain. The site runs on a Vercel domain and the DNS step is left for later.",
      "A measured comparison with the old Lovable site. The claim it would be slower is not tested.",
      "Accessibility, SEO and real visitor performance, since PageSpeed here is a single lab run."
    ],
    "qa": [
      {
        "q": "How long did the rebuild take?",
        "a": "About ten minutes for the first version and about thirty minutes of work in total, according to the presenter."
      },
      {
        "q": "Why leave Lovable?",
        "a": "The presenter found the old site clearly vibe coded and wanted a better design on their own hosting."
      },
      {
        "q": "What were the speed scores?",
        "a": "90 on mobile and 98 on desktop in one PageSpeed Insights run."
      }
    ]
  },
  "SplwScUztfM": {
    "summary": "The presenter shows their own Facebook dashboard and bank payments to explain how they earn from Facebook content monetization, then gives the general steps: post original content, wait for a personal invite from Facebook, and get paid monthly. The earnings, reach and requirement figures are the presenter's own statements and are not verified here. The video also promotes the presenter's paid Facebook monetization guides.",
    "whatYouBuild": "Nothing is built. The video explains how Facebook's content monetization program works from one creator's account and what to do to become eligible.",
    "toolsUsed": [
      "Meta Business Suite",
      "Facebook"
    ],
    "keySteps": [
      {
        "seconds": 26,
        "step": "See the presenter's claimed monthly payments of roughly $700 to $1,000 and their reach this month."
      },
      {
        "seconds": 107,
        "step": "Review post insights, reach and link clicks in Meta Business Suite."
      },
      {
        "seconds": 188,
        "step": "Compare the older in-stream ads and reels ads programs with the content monetization program now used."
      },
      {
        "seconds": 340,
        "step": "Hear the requirements the presenter lists, including follower and watch time thresholds that may have changed."
      },
      {
        "seconds": 441,
        "step": "Learn that photo and text posts can earn performance bonuses."
      },
      {
        "seconds": 477,
        "step": "Understand the invitation process, which can take weeks, months or years."
      }
    ],
    "notCovered": [
      "Independent verification of the earnings, reach and payment amounts shown.",
      "Current eligibility rules. The follower and watch hour numbers are unsure even in the video.",
      "How to get an invitation, which depends on Facebook and is not guaranteed.",
      "The paid guides at $19, $29 and $49, which are promoted but not shown."
    ],
    "qa": [
      {
        "q": "Can anyone start earning?",
        "a": "No. The presenter says you need a personal invite from Facebook, and original content that meets its standards."
      },
      {
        "q": "How much does the presenter earn?",
        "a": "They show payments of $700 to $1,000 in several months and call themselves a top earner. These are their own claims."
      },
      {
        "q": "Is the video selling something?",
        "a": "Yes. It points to the presenter's Facebook monetization training, priced from $19 to $49."
      }
    ]
  },
  "GK7zjPm7G4A": {
    "summary": "A walkthrough of OpenAI's announcement of GPT-6 Sol and GPT-6 Luna on September 23, 2026. Sol is priced at $2 per million input tokens, half its predecessor, and Luna at 10 cents. The presenter reads OpenAI's own benchmark charts against Opus 5 and Fable 5.1 and says Sol used 2 percent of a weekly limit. Benchmark and price figures are from the announcement and were not tested here.",
    "whatYouBuild": "Nothing is built. The video summarizes the release, prices, benchmarks and availability of two new models.",
    "toolsUsed": [
      "GPT-6 Sol",
      "GPT-6 Luna",
      "Codex",
      "RTK"
    ],
    "keySteps": [
      {
        "seconds": 13,
        "step": "Hear that Sol targets complex coding and professional work and Luna targets fast, high-volume work."
      },
      {
        "seconds": 81,
        "step": "Hear the presenter's early use of Sol in the terminal and the lower weekly limit use."
      },
      {
        "seconds": 133,
        "step": "Read the halved input and output token prices for both models."
      },
      {
        "seconds": 238,
        "step": "Review professional work benchmarks against Claude Opus 5."
      },
      {
        "seconds": 337,
        "step": "Review coding benchmarks against Fable 5.1 on Frontier Code."
      },
      {
        "seconds": 445,
        "step": "Review computer use scores, where Astra still leads."
      }
    ],
    "notCovered": [
      "Independent tests. The benchmark charts come from OpenAI's announcement.",
      "Side-by-side coding results on the presenter's own projects.",
      "Long-term limits or price changes after the launch date.",
      "A comparison with the competing models beyond the charts shown."
    ],
    "qa": [
      {
        "q": "What does Sol cost?",
        "a": "$2 per million input tokens, cut from $4, with output prices also halved, per the announcement shown. Luna is 10 cents per million input tokens and 50 cents for output."
      },
      {
        "q": "Where are the models available?",
        "a": "In ChatGPT and Codex for paid plans from September 23, 2026, and Luna in the desktop app for free users, according to the video."
      },
      {
        "q": "Is Sol better than Astra?",
        "a": "The presenter says Astra still leads on computer use at 73 percent against Sol's 64 percent, but Sol is about five times cheaper."
      }
    ]
  },
  "K2UeJZ_7mS0": {
    "summary": "Build a single-file Three.js rocket launch simulator in GPT-6 Astra on medium mode from one 10,000-character prompt taken from Bridgebench. The first build takes about 23 minutes and runs with audio and quality settings. A follow-up prompt adds mouse zoom and rotation. The presenter says it looks decent but not very realistic, and wants clouds.",
    "whatYouBuild": "A single index.html rocket launch scene in Three.js with a booster liftoff, staging, audio, a frame rate readout, quality and debug modes, and mouse controls added afterwards.",
    "toolsUsed": [
      "GPT-6 Astra",
      "Three.js",
      "Bridgebench"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Copy the Three.js rocket launcher prompt from Bridgebench."
      },
      {
        "seconds": 84,
        "step": "Paste it into an empty folder in GPT-6 Astra."
      },
      {
        "seconds": 97,
        "step": "Run it on medium mode, which balances speed and reasoning depth."
      },
      {
        "seconds": 125,
        "step": "Open the finished scene after about 23 minutes."
      },
      {
        "seconds": 161,
        "step": "Try the audio, graphics quality and debug options."
      },
      {
        "seconds": 221,
        "step": "Ask Astra to add mouse wheel zoom and drag rotation."
      },
      {
        "seconds": 315,
        "step": "Test the new click, drag and zoom controls."
      }
    ],
    "notCovered": [
      "The exact usage cost. The presenter only guesses it is under about 5 percent of a Pro plan.",
      "A review of the generated code, which the presenter says they cannot follow.",
      "Realism improvements such as clouds, which are only wished for.",
      "Performance on other hardware. It ran on a laptop at 1920 by 1080 with a visible frame rate."
    ],
    "qa": [
      {
        "q": "Where is the prompt from?",
        "a": "Bridgebench, which also lists prompts for a Minecraft clone and a Mario Kart style game."
      },
      {
        "q": "How long did it take?",
        "a": "About 23 minutes for the first scene and 5 to 10 minutes for the zoom and rotate controls."
      },
      {
        "q": "Is it realistic?",
        "a": "The presenter calls it impressive for the time but not very realistic."
      }
    ]
  },
  "n3NO40juUBo": {
    "summary": "Redesign an analytics web app with Claude Design, which was in research preview. A design.md written in Claude Code seeds a design system, Claude Design builds marketing and dashboard UI kits from the GitHub repo, and the result is handed off to Claude Code. Claude Code says the code already matches, Claude usage limits interrupt, and Codex applies the CSS changes. The live site looks only slightly different.",
    "whatYouBuild": "A Claude Design system with logos, typography, colors, preview cards and UI kits for a marketing site and dashboard, implemented in the existing codebase through Codex and pushed to GitHub.",
    "toolsUsed": [
      "Claude Design",
      "Claude Code",
      "Codex",
      "GitHub"
    ],
    "keySteps": [
      {
        "seconds": 54,
        "step": "Create a design system and import a design.md that holds fonts, colors, layout and animation rules."
      },
      {
        "seconds": 98,
        "step": "Connect GitHub, authorizing access after the private repo is first unreachable."
      },
      {
        "seconds": 150,
        "step": "Let Claude Design generate the marketing site and dashboard mockups."
      },
      {
        "seconds": 235,
        "step": "Rebuild components and update preview cards against the real source."
      },
      {
        "seconds": 410,
        "step": "Add dashboard screens for analytics, audience and engagement."
      },
      {
        "seconds": 490,
        "step": "Hand off with the fetch command in Claude Code, which reports the code is already aligned."
      },
      {
        "seconds": 615,
        "step": "Give the design system to Codex, which updates buttons, badges, cards and typography."
      },
      {
        "seconds": 706,
        "step": "Deploy and compare the typography, buttons and dark and light modes."
      }
    ],
    "notCovered": [
      "A large visual change. The presenter says the live site does not look much different and needs more work.",
      "Why Claude Code found nothing to change after the handoff.",
      "The cost of the work. Usage limits were hit and extra usage of $5 was added, with Haiku used for the retry.",
      "Dashboard pages in production, which are private and not shown."
    ],
    "qa": [
      {
        "q": "How does the design get from Claude Design into code?",
        "a": "The video uses a command that fetches the design file into Claude Code. It also offers a zip download and a web handoff that would create a new app."
      },
      {
        "q": "Did Claude Code implement it?",
        "a": "Not visibly. It reported the design was already implemented, so the presenter used Codex to apply the changes."
      },
      {
        "q": "What is a design.md?",
        "a": "A file made in Claude Code with the fonts, color palette, layout, radius, animations and navigation styles, used to seed the design system."
      }
    ]
  },
  "CD2mLFgjiT8": {
    "summary": "Build a Facebook page chatbot in SendPulse that replies to comments, sends a direct message with a YouTube link, tags and logs interested people, and hands later replies to an AI agent. The presenter says it saves time on a page with about 180,000 followers. The AI agent step needs a paid plan, and the link is an affiliate link.",
    "whatYouBuild": "A SendPulse flow with a comment trigger on any post, public reply variants, a yes or no direct message, a tag and Google Sheets row, an unsubscribe path and an AI agent step.",
    "toolsUsed": [
      "SendPulse",
      "Facebook",
      "Google Sheets",
      "OpenAI API"
    ],
    "keySteps": [
      {
        "seconds": 180,
        "step": "Create a trigger that fires on any comment on any page post and add a few randomized public replies."
      },
      {
        "seconds": 240,
        "step": "Design the direct message asking whether to share the YouTube channel, with yes and no branches."
      },
      {
        "seconds": 240,
        "step": "On yes, send the link, add an interested tag, append a Google Sheets row and close the chat."
      },
      {
        "seconds": 240,
        "step": "On no, unsubscribe the person from the automation."
      },
      {
        "seconds": 360,
        "step": "Add an AI agent step on GPT-4.1 Mini with a customer service prompt, web search and an exit condition."
      },
      {
        "seconds": 420,
        "step": "Reply to conversations and pause or resume automations from the SendPulse inbox."
      },
      {
        "seconds": 480,
        "step": "Connect WhatsApp as another channel."
      }
    ],
    "notCovered": [
      "Meta's rules on automated comment replies and messages, or on consent before messaging people.",
      "Results such as clicks, subscribers gained or reply quality from the AI agent.",
      "Costs beyond the quoted plan prices, including OpenAI usage.",
      "The claim that the page has never been restricted, which is the presenter's experience."
    ],
    "qa": [
      {
        "q": "Is SendPulse free?",
        "a": "There is a free start. The presenter quotes paid plans from about $8 a month for 500 subscribers and about $10 a month for the AI agent feature."
      },
      {
        "q": "Why randomize the public replies?",
        "a": "The presenter uses several variations to avoid looking repetitive to Facebook."
      },
      {
        "q": "Is the link an affiliate link?",
        "a": "Yes. The presenter says they earn a commission on sign-ups."
      }
    ]
  },
  "dVC1Or0Tbo8": {
    "summary": "A first test of Relay.app for building AI workflows from templates. A social media video promoter template fails with too many requests errors, a meeting briefing template needs Gmail, and a custom workflow starts from a Cal.com booking, emails the invitee and creates a HubSpot contact, which tests successfully. Relay has fewer integrations than Make.com, and the title's comparison is not carried out.",
    "whatYouBuild": "A Relay workflow triggered by a new Cal.com booking that sends a Gmail message to the invitee and creates a HubSpot contact with their name and email.",
    "toolsUsed": [
      "Relay.app",
      "Cal.com",
      "Gmail",
      "HubSpot"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Browse Relay's template categories such as sales, recruitment, finance and meetings."
      },
      {
        "seconds": 90,
        "step": "Open the social media video promoter template that pulls new YouTube videos and drafts a post."
      },
      {
        "seconds": 135,
        "step": "Hit a too many requests error on the transcript step."
      },
      {
        "seconds": 180,
        "step": "Use the meeting briefing template, which needs Gmail and runs before meetings."
      },
      {
        "seconds": 270,
        "step": "Build a custom workflow with a Cal.com trigger and an API key."
      },
      {
        "seconds": 315,
        "step": "Add a Gmail step that emails the invitee."
      },
      {
        "seconds": 360,
        "step": "Add a HubSpot step that creates a contact from the booking, then run a successful test."
      }
    ],
    "notCovered": [
      "A working YouTube template. The transcript step keeps failing.",
      "A real comparison with competitors. The presenter only says Relay has fewer apps than Make.com.",
      "Pricing and credit limits, which are mentioned in passing.",
      "Whether the meeting briefing template ran."
    ],
    "qa": [
      {
        "q": "Did the templates work?",
        "a": "The YouTube template failed, and the meeting template was configured but not run on screen. The custom Cal.com workflow tested successfully."
      },
      {
        "q": "How does it compare with Make.com?",
        "a": "The presenter says it has quite a few apps but not nearly as many as Make.com."
      },
      {
        "q": "What did the custom workflow do?",
        "a": "On a new Cal.com booking it sent a thank you email and created the contact in HubSpot."
      }
    ]
  },
  "kxp_dF6NEbg": {
    "summary": "A tour of ten third-party skills the presenter installs with npx skills add from the skills.sh registry and runs in Codex, OpenCode and VS Code: front-end design, Vercel React and Next.js best practices, web design guidelines, SEO audit, AI SEO, page speed and Lighthouse, and GEO content tools. The front-end design skill fixes a light theme on the presenter's landing page. Install counts, citation numbers and traffic figures are the presenter's own and are not verified.",
    "whatYouBuild": "A set of installed agent skills, each run with a full site audit prompt, with the front-end design skill used to repair the light theme of a landing page.",
    "toolsUsed": [
      "skills.sh",
      "Codex",
      "OpenCode",
      "VS Code",
      "Vercel"
    ],
    "keySteps": [
      {
        "seconds": 36,
        "step": "Update installed skills with npx skills update and install new ones with the npx skills add command, locally or globally."
      },
      {
        "seconds": 100,
        "step": "Run the front-end design skill with a site audit and fix the landing page's light theme."
      },
      {
        "seconds": 321,
        "step": "Run the Vercel React best practices skill on the codebase."
      },
      {
        "seconds": 424,
        "step": "Run the web design guidelines and Next.js best practices skills and push the fixes to GitHub."
      },
      {
        "seconds": 535,
        "step": "Run the SEO audit skill, which reads robots, sitemap, metadata and public routes."
      },
      {
        "seconds": 587,
        "step": "Run the AI SEO skill for AI answer engine visibility and apply schema fixes."
      },
      {
        "seconds": 671,
        "step": "Check PageSpeed Insights scores of 95 on mobile and 99 on desktop, kept up with the Page Speed and Lighthouse skills."
      },
      {
        "seconds": 731,
        "step": "Run the GEO content optimizer on recent blog articles."
      }
    ],
    "notCovered": [
      "Reviewing third-party skills for safety before installing them, since a skill gives instructions to your coding agent.",
      "Independent checks of the quoted install counts, GitHub stars, AI crawler visits and competitor citation counts.",
      "Whether each skill's fixes improved rankings. The video shows audits and edits, not results over time.",
      "The names of every skill in a copyable list, since several are only described."
    ],
    "qa": [
      {
        "q": "How do I install a skill?",
        "a": "Copy the npx skills add command from the registry page, run it in the terminal and choose the agents and local or global install."
      },
      {
        "q": "Which agents can use them?",
        "a": "The video installs into Codex, Gemini, OpenCode and Antigravity, and says Claude Code and OpenClaw are supported too."
      },
      {
        "q": "What did the front-end design skill change?",
        "a": "It rewrote the CSS so the landing page's light theme has dark text and a visible dashboard sample, though the presenter says it still needs work."
      }
    ]
  },
  "QlL87_URHZ8": {
    "summary": "A beginner tour of Nano Banana, Google's Gemini 2.5 Flash Image model, in Google AI Studio and the Gemini app. Images such as an elephant playing basketball generate in under ten seconds, and the Gemini app output is larger. The Make.com attempt fails with a quota error because billing is not set up, so the automation is not shown working.",
    "whatYouBuild": "Images generated in Google AI Studio and Gemini, and a Make.com Gemini module that is set up with an API key but stops on a quota error.",
    "toolsUsed": [
      "Nano Banana",
      "Google AI Studio",
      "Gemini",
      "Make.com"
    ],
    "keySteps": [
      {
        "seconds": 72,
        "step": "Open Google AI Studio and choose Gemini 2.5 Flash Image."
      },
      {
        "seconds": 85,
        "step": "Review its features: character consistency, intelligent editing and merging images."
      },
      {
        "seconds": 193,
        "step": "Generate images from prompts and compare variations."
      },
      {
        "seconds": 333,
        "step": "Create an API key and add a Gemini module in Make.com."
      },
      {
        "seconds": 423,
        "step": "Run the Make.com scenario, which fails with an exceeded quota error until billing is linked."
      },
      {
        "seconds": 615,
        "step": "Generate the same kind of image in the Gemini app, which gives a larger file with a Gemini logo."
      },
      {
        "seconds": 790,
        "step": "Hear about Google's paid Gemini plan and Veo 3 access."
      }
    ],
    "notCovered": [
      "A working Make.com image automation. The presenter skips setting up Google Cloud billing.",
      "Generating video, which the presenter says they have not figured out.",
      "Current Gemini plan prices, quoted as about $10 for two months then $20.",
      "Free tier limits and rate limits over time."
    ],
    "qa": [
      {
        "q": "Is Nano Banana free?",
        "a": "The presenter uses it free in AI Studio and the Gemini app. API use from Make.com hit a quota limit and needs billing."
      },
      {
        "q": "Why did Make.com fail?",
        "a": "It returned a quota exceeded error. The presenter says billing through Google Cloud would be needed."
      },
      {
        "q": "Which gives better images, AI Studio or Gemini?",
        "a": "The presenter liked the Gemini app output more and noted a larger file, but this is a quick impression."
      }
    ]
  },
  "p_qQNolHR-c": {
    "summary": "A comparison of free ways to try Nano Banana, Google's Gemini 2.5 Flash Image model, three days after its launch. The presenter tries several third-party sites, finds LMArena direct chat the fastest with no account, and edits a photo by replacing the background and a statue with other subjects. One site fails, and an OpenRouter test errors. The incognito tip for getting past free credit limits is the presenter's, not an official method.",
    "whatYouBuild": "Images made with Nano Banana on third-party sites, including edits of a reference photo, with no automation built.",
    "toolsUsed": [
      "Nano Banana",
      "Gemini 2.5 Flash Image",
      "LMArena",
      "OpenRouter"
    ],
    "keySteps": [
      {
        "seconds": 37,
        "step": "See the sites that offer Nano Banana and try nanobanana.ai, which needs an account and a paid plan to download."
      },
      {
        "seconds": 172,
        "step": "Try other tools, one of which fails and one of which is slow."
      },
      {
        "seconds": 235,
        "step": "Open LMArena, choose direct chat and the Gemini 2.5 Flash Image model."
      },
      {
        "seconds": 260,
        "step": "Generate an image in under ten seconds and download a roughly 2 MB file."
      },
      {
        "seconds": 322,
        "step": "Upload a reference photo and replace the background and a statue with new subjects."
      },
      {
        "seconds": 426,
        "step": "Compare the speed of the tools."
      },
      {
        "seconds": 474,
        "step": "Try Gemini 2.5 Flash Image Preview on OpenRouter, which returns a user not found error."
      }
    ],
    "notCovered": [
      "Privacy of photos uploaded to third-party sites, which are not Google products.",
      "Whether using an incognito window to continue past free credit limits fits each site's terms.",
      "The Make.com automation the presenter promises for a later video.",
      "A reliable swap of the presenter into the photo. The robot was added beside them instead."
    ],
    "qa": [
      {
        "q": "Which tool was best?",
        "a": "LMArena in direct chat mode, according to the presenter. It was quick, needed no account and produced larger files."
      },
      {
        "q": "Is nanobanana.ai free?",
        "a": "No. The presenter says downloading needs a subscription of about $8 to $10 a month for 100 credits."
      },
      {
        "q": "Why did OpenRouter fail?",
        "a": "It returned a user not found error twice, and the presenter did not resolve it."
      }
    ]
  },
  "tzUhKKzwgyE": {
    "summary": "Try Base44 by building a ChatGPT-style web app from a prompt written in ChatGPT. The app is generated in about ten minutes and previews well, but adding an OpenAI API connection runs into the free plan's daily credit limit, so the build stops. The presenter then names Lovable, Replit, Bolt and Emergent as better options. Despite the title, no Lovable build is shown side by side.",
    "whatYouBuild": "A ChatGPT-like chat interface generated by Base44 from a single prompt, without a connected AI model.",
    "toolsUsed": [
      "Base44",
      "ChatGPT",
      "Lovable"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Ask ChatGPT for a prompt that builds a ChatGPT clone and paste it into Base44."
      },
      {
        "seconds": 80,
        "step": "Preview the generated chat app and send a first message."
      },
      {
        "seconds": 120,
        "step": "Ask Base44 to connect the OpenAI API, which is blocked because the free plan's credits are used up."
      },
      {
        "seconds": 165,
        "step": "Review Base44 pricing: the free plan gives 25 messages a month and paid plans start around $16."
      },
      {
        "seconds": 205,
        "step": "Show an agency site previously built in Lovable over about eight hours."
      },
      {
        "seconds": 290,
        "step": "Mention Replit, Bolt and Emergent as alternatives with their approximate prices."
      }
    ],
    "notCovered": [
      "A working AI chat. The OpenAI integration is not completed.",
      "A like-for-like comparison with Lovable. Lovable is shown only as an earlier project.",
      "Current prices, which are quoted as of October 2025.",
      "Whether the Base44 limit on integrations is a real platform restriction or a free plan one."
    ],
    "qa": [
      {
        "q": "What does the free plan include?",
        "a": "The presenter says 25 message credits a month with a daily allowance of five, and 100 integration credits."
      },
      {
        "q": "Why did the presenter move on?",
        "a": "They ran out of daily credits right when they asked for the API connection, and prefer Lovable or Replit for building."
      },
      {
        "q": "How long did the app take?",
        "a": "About ten minutes to generate."
      }
    ]
  },
  "bt-zM7QuKkU": {
    "summary": "A short demonstration of repurposing a YouTube video into an infographic and a LinkedIn post. Gemini 3 summarizes the transcript, Nano Banana Pro in Google AI Studio draws an infographic with correct text, and Gemini 3 Pro writes the post, which the presenter pastes into LinkedIn by hand. An n8n version works for the summary but not the image, because n8n lacks Nano Banana Pro.",
    "whatYouBuild": "A manual workflow in Google AI Studio from video summary to infographic to LinkedIn post, and an n8n flow that extracts and summarizes the transcript.",
    "toolsUsed": [
      "Gemini 3",
      "Nano Banana Pro",
      "Google AI Studio",
      "n8n",
      "Apify"
    ],
    "keySteps": [
      {
        "seconds": 30,
        "step": "Create an infographic from a video summary with Nano Banana Pro, which gets the text right."
      },
      {
        "seconds": 60,
        "step": "Switch to Gemini 3 Pro Preview to write a professional LinkedIn post about the infographic."
      },
      {
        "seconds": 90,
        "step": "Show an n8n flow that pulls the transcript with Apify and summarizes it with Gemini 3 Flash."
      },
      {
        "seconds": 120,
        "step": "Find that n8n only has the earlier Nano Banana, so its infographics look poor."
      },
      {
        "seconds": 150,
        "step": "Fall back to doing the infographic manually in Google AI Studio, then paste the post and upload the image to LinkedIn."
      }
    ],
    "notCovered": [
      "A fully automated pipeline. Other attempts through KIE and fal did not work.",
      "Posting to LinkedIn automatically, which stays manual.",
      "The cost of the paid plan needed for Gemini 3 and Nano Banana Pro.",
      "A review of the summary's accuracy against the video."
    ],
    "qa": [
      {
        "q": "Why do the infographics work in AI Studio and not in n8n?",
        "a": "AI Studio offers Nano Banana Pro, while the n8n version used only has the earlier Nano Banana model."
      },
      {
        "q": "Do I need a paid plan?",
        "a": "The presenter recommends the paid plan to get Gemini 3 and Nano Banana Pro."
      },
      {
        "q": "What is still manual?",
        "a": "Saving the infographic and creating the LinkedIn newsletter edition with the pasted text."
      }
    ]
  },
  "jB9hYQJGAuM": {
    "summary": "Install RTK, a free open-source tool that compresses command output before it reaches a coding agent's context, and connect it to Claude Code, Codex and OpenCode. The presenter's own readings show about 57 to 65 percent token savings, with 120,000 tokens saved in one session and 169,000 in OpenCode. The 60 to 95 percent in the intro is RTK's claim. Headroom, a proxy dashboard, was removed after connection problems.",
    "whatYouBuild": "An RTK install with hooks in Claude Code and Codex and an RTK plugin in OpenCode, checked with the rtk gain command.",
    "toolsUsed": [
      "RTK",
      "Claude Code",
      "Codex",
      "OpenCode",
      "Headroom"
    ],
    "keySteps": [
      {
        "seconds": 31,
        "step": "Run rtk gain to read token efficiency, which sits around 57 to 65 percent."
      },
      {
        "seconds": 88,
        "step": "Install RTK with the curl command or with brew."
      },
      {
        "seconds": 115,
        "step": "Ask each coding agent to add RTK to its config file."
      },
      {
        "seconds": 160,
        "step": "Compare RTK with Headroom, a proxy on port 8787 with a dashboard that the presenter dropped."
      },
      {
        "seconds": 232,
        "step": "Run rtk init to connect the hook and restart Claude Code."
      },
      {
        "seconds": 262,
        "step": "Compare RTK with the Caveman skill, which the presenter has used less."
      },
      {
        "seconds": 346,
        "step": "Add the RTK plugin to OpenCode, which prefixes bash commands with rtk."
      },
      {
        "seconds": 380,
        "step": "Check savings on GLM 5.2 in OpenCode: 169,000 tokens, 57.8 percent, across 447 commands."
      }
    ],
    "notCovered": [
      "Whether compressed command output changes the quality of the agent's answers.",
      "Independent measurement. The figures come from RTK's own report on the presenter's machine.",
      "Windows setup in detail, which is mentioned only in passing.",
      "How much of the saving is usage credit and how much is context length."
    ],
    "qa": [
      {
        "q": "How much does RTK save?",
        "a": "The tool claims 60 to 95 percent. The presenter's own readings in the video are around 57 to 65 percent."
      },
      {
        "q": "Do I need Headroom too?",
        "a": "No. The presenter removed it because Claude Code had trouble connecting and calls RTK alone enough."
      },
      {
        "q": "How do I check it is working?",
        "a": "Run rtk gain for the efficiency number, and rtk init to make sure the hook is present in your agent's config."
      }
    ]
  },
  "pRnJdlMSSqM": {
    "summary": "An overview of Z.AI's GLM 5.2 model and where to use it, mostly through OpenCode Go. The presenter reads benchmark pages and side-by-side demos made by another creator against Opus 4.8, and notes lower costs. The presenter had hit the OpenCode Go usage limit and does not run GLM 5.2 live, so the comparison rests on other people's results.",
    "whatYouBuild": "Nothing is built. The video shows how to select GLM 5.2 in OpenCode and the desktop app and reviews third-party benchmark and demo comparisons.",
    "toolsUsed": [
      "GLM 5.2",
      "OpenCode",
      "OpenCode Go",
      "Bridgebench"
    ],
    "keySteps": [
      {
        "seconds": 19,
        "step": "Read benchmark claims comparing GLM 5.2 with Claude Opus and Fable models."
      },
      {
        "seconds": 74,
        "step": "Note the model size, a 1 million token context window and the option to run it locally."
      },
      {
        "seconds": 106,
        "step": "Select GLM 5.2 in OpenCode with the models command, which is possible on the Go plan."
      },
      {
        "seconds": 186,
        "step": "See it in the free OpenCode desktop app."
      },
      {
        "seconds": 206,
        "step": "Compare another creator's demos from GLM 5.2 and Opus 4.8, including cost and time for one-shot pages."
      },
      {
        "seconds": 381,
        "step": "Review Bridgebench reasoning and BS meter rankings."
      },
      {
        "seconds": 444,
        "step": "Check OpenCode's pricing and usage data, including cheaper DeepSeek models."
      }
    ],
    "notCovered": [
      "A live run of GLM 5.2 by the presenter, who has hit the Go credit limit.",
      "Independent verification of the benchmark rankings and demo costs.",
      "Which design wins overall. The presenter prefers Opus 4.8 in some demos and GLM 5.2 in others.",
      "Current prices. The video quotes $1.40 per million input tokens and $4.40 per million output tokens."
    ],
    "qa": [
      {
        "q": "How do I use GLM 5.2?",
        "a": "Install OpenCode, run the models command and pick GLM 5.2. It is available on the OpenCode Go plan and in the desktop app."
      },
      {
        "q": "How much cheaper is it than Opus 4.8?",
        "a": "In the demos shown, roughly 5 to 8 cents against about 21 to 22 cents per page. These are single runs, not a benchmark."
      },
      {
        "q": "What does OpenCode Go cost?",
        "a": "The video says $5 for the first month, then $10 a month."
      }
    ]
  },
  "jhmTXc5ZyJk": {
    "summary": "A beginner attempt at running local models with Ollama on Debian Linux. The 20B GPT model downloads but cannot run on 13 GB of memory, Open WebUI will not install because Docker and pip fail, and AnythingLLM is used instead. A DeepSeek R1 8B model finally runs on the laptop, slowly. The presenter ends by recommending cloud models for most people.",
    "whatYouBuild": "Ollama installed with a curl command, and a DeepSeek R1 8B model running locally and queried through a chat interface.",
    "toolsUsed": [
      "Ollama",
      "Open WebUI",
      "AnythingLLM",
      "DeepSeek R1"
    ],
    "keySteps": [
      {
        "seconds": 0,
        "step": "Install Ollama on Linux with the curl command and browse its models and sizes."
      },
      {
        "seconds": 102,
        "step": "Try to install Open WebUI from GitHub, which fails on Docker and pip."
      },
      {
        "seconds": 172,
        "step": "Use AnythingLLM instead, where the GPT API model hits a billing quota."
      },
      {
        "seconds": 282,
        "step": "Download the 20B GPT model, then find it needs more memory than the 13 GB available."
      },
      {
        "seconds": 362,
        "step": "Pull the smaller DeepSeek R1 8B model."
      },
      {
        "seconds": 466,
        "step": "Run DeepSeek locally and see a slow reply."
      }
    ],
    "notCovered": [
      "A working Open WebUI install.",
      "GPU use, which the presenter says helps but does not test.",
      "Measured speed or quality, beyond the remark that local replies are slow.",
      "A check of the privacy claim in the title, since the video does not audit what leaves the machine."
    ],
    "qa": [
      {
        "q": "How big are the GPT models?",
        "a": "The presenter shows about 14 GB for the 20B model and 65 GB for the 120B model."
      },
      {
        "q": "What hardware is needed?",
        "a": "More memory than the 13 GB laptop had for the 20B model. The presenter suggests 32 GB or more and says a good graphics card helps."
      },
      {
        "q": "Does the presenter recommend running models locally?",
        "a": "Not for most people. They recommend using cloud models in the browser unless you have the hardware."
      }
    ]
  },
  "DB-9bW85TKY": {
    "summary": "Set up scheduled jobs in Hermes Agent: install it, run the setup wizard with a free DeepSeek V4 Flash model, ask the agent what to automate, and let it write scripts and schedule five cron jobs. The video also tours existing jobs that sync email subscribers and write YouTube reports, and shows pausing and triggering jobs in the desktop app. The new jobs are created but their results are not shown.",
    "whatYouBuild": "Five Hermes cron jobs written by the agent, namely a nightly database backup, a morning channel digest, a trading app job, a server health check every four hours and an IndexNow ping, managed from the CLI and desktop app.",
    "toolsUsed": [
      "Hermes Agent",
      "DeepSeek V4 Flash",
      "IndexNow"
    ],
    "keySteps": [
      {
        "seconds": 32,
        "step": "Run the curl installer and the Hermes setup wizard, choosing the Nous portal and DeepSeek V4 Flash."
      },
      {
        "seconds": 74,
        "step": "Look through the built-in skills and optional skills."
      },
      {
        "seconds": 96,
        "step": "Ask Hermes which cron jobs it would recommend for the business."
      },
      {
        "seconds": 171,
        "step": "Review the suggested jobs and tell Hermes to go ahead."
      },
      {
        "seconds": 233,
        "step": "List existing jobs with hermes cron list, including a daily email subscriber sync."
      },
      {
        "seconds": 286,
        "step": "Open the generated Python scripts and markdown reports for YouTube trends and channel performance."
      },
      {
        "seconds": 361,
        "step": "Pause and trigger jobs from the desktop app's schedules tab."
      },
      {
        "seconds": 459,
        "step": "Create a custom scheduled task from the desktop app with a prompt, destination and frequency."
      }
    ],
    "notCovered": [
      "Whether any of the new jobs ran successfully. The video shows them being scheduled.",
      "Where database backups are stored, how they are secured or restored.",
      "Error handling for jobs that fail, or limits on what scripts an agent may run unattended.",
      "Costs of running model-driven jobs on a schedule."
    ],
    "qa": [
      {
        "q": "What kind of schedules can I set?",
        "a": "The desktop app offers every 30 minutes, hourly, daily at a time, weekly with a day, or a custom schedule."
      },
      {
        "q": "Which jobs did Hermes recommend?",
        "a": "A nightly backup, a morning stats digest, trading app jobs, a four-hourly server health check and an IndexNow ping."
      },
      {
        "q": "Do I have to use the terminal?",
        "a": "No. The desktop app can create, pause and trigger jobs, although the presenter also shows the CLI."
      }
    ]
  },
  "wL6bjqaUcd8": {
    "summary": "Add Supermemory, a hosted long-term memory service, to Hermes Agent and OpenCode, with notes on its Codex plugin. The setup uses an API key, the hermes memory setup command and an npm package. The dashboard shows a memory graph and app connections. The presenter does not test recall, and the Codex login is left unfinished because credits ran out.",
    "whatYouBuild": "Supermemory selected as Hermes Agent's memory provider with an API key, the Supermemory SDK added to OpenCode, and a look at the dashboard and Codex plugin.",
    "toolsUsed": [
      "Supermemory",
      "Hermes Agent",
      "OpenCode",
      "Codex"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Hear the pitch: persistent memory that the vendor says cuts memory usage by about 40 percent against RAG."
      },
      {
        "seconds": 78,
        "step": "Install the CLI with the curl command or the npm package."
      },
      {
        "seconds": 107,
        "step": "Run hermes memory setup and choose Supermemory instead of the built-in memory file."
      },
      {
        "seconds": 130,
        "step": "Create an API key in the console and paste it into Hermes, then start a new session."
      },
      {
        "seconds": 234,
        "step": "Install the SDK in OpenCode."
      },
      {
        "seconds": 259,
        "step": "Start the Codex plugin setup, which needs a login."
      },
      {
        "seconds": 345,
        "step": "Explore the dashboard, app connections and the memory graph."
      }
    ],
    "notCovered": [
      "A test that the agent actually recalls earlier work in a new session.",
      "Where memories are stored and what data is sent to the service, which matters for private projects.",
      "Finishing the Codex plugin login, which the presenter expects to fail without credits.",
      "Independent checks of the quoted 40 percent figure. Paid plans are quoted from $19 a month."
    ],
    "qa": [
      {
        "q": "What does Supermemory replace?",
        "a": "In Hermes it replaces the built-in memory markdown file as the memory provider."
      },
      {
        "q": "Which tools does it connect to?",
        "a": "The video shows Hermes, OpenCode and Codex, and mentions Claude Code, Cursor, Notion, GitHub and Slack."
      },
      {
        "q": "Is it free?",
        "a": "There is a free start. The presenter quotes paid plans from $19 a month."
      }
    ]
  },
  "c3AtpUbpXNA": {
    "summary": "A first test of ChatGPT Images 2.5, announced September 8, 2026, which OpenAI says is up to 50 percent faster than Images 2.0 and adds a Sketch feature. The presenter turns a rough drawing into a scene in about 25 seconds, makes an 80s photo, a caricature and a 3D toy avatar from a personal photo, and iterates on a YouTube thumbnail. Fetching a thumbnail by URL fails, and the final image is a little blurry.",
    "whatYouBuild": "Images made with ChatGPT Images 2.5, including a sketch-to-image scene, stylized portraits and a before and after YouTube thumbnail.",
    "toolsUsed": [
      "ChatGPT Images 2.5",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 27,
        "step": "Read the announcement's claims: sharper details, more precise editing and up to 50 percent lower latency."
      },
      {
        "seconds": 76,
        "step": "Learn about the Sketch feature for drawing a reference in the chat."
      },
      {
        "seconds": 120,
        "step": "Draw two windows, a chair and a dog and get a similar scene back in about 25 seconds."
      },
      {
        "seconds": 212,
        "step": "Sketch an extra dog onto the generated image."
      },
      {
        "seconds": 235,
        "step": "Make an 80s style photo from a personal picture."
      },
      {
        "seconds": 270,
        "step": "Create a career caricature and a 3D designer toy avatar."
      },
      {
        "seconds": 363,
        "step": "Iterate on a YouTube thumbnail, simplifying the text and fixing the face swap."
      }
    ],
    "notCovered": [
      "A timed comparison with Images 2.0. The 50 percent claim comes from OpenAI.",
      "Privacy of uploading personal photos.",
      "Reproducing another creator's thumbnail. The presenter says they would not copy it and makes their own.",
      "Fetching a thumbnail from a URL, which fails in this session."
    ],
    "qa": [
      {
        "q": "What is new in Images 2.5?",
        "a": "Per the announcement shown: sharper details, richer textures, more reliable multi-turn edits, lower latency and a Sketch tool."
      },
      {
        "q": "How long does an image take?",
        "a": "About 25 seconds for the sketch and 35 to 40 seconds for the caricature in the demo."
      },
      {
        "q": "How did the thumbnail turn out?",
        "a": "The presenter liked the final before and after version but noted it was a little blurry when zoomed in."
      }
    ]
  },
  "p7kV1iHSP54": {
    "summary": "A walkthrough of xAI's Grok 4.7 launch on September 22, 2026: benchmarks and prices from the announcement, demos by other users, and the presenter's attempt to use it through OpenRouter in Hermes Agent. The announced price is $2 per million input tokens and $6 for output. The presenter cannot see 4.7 in the Grok command line tool, only 4.6, and does not test coding quality.",
    "whatYouBuild": "Nothing is built. The video reviews the release and sets Grok 4.7 as the model in Hermes Agent through OpenRouter, using it to repair the Grok CLI's API key setup.",
    "toolsUsed": [
      "Grok 4.7",
      "OpenRouter",
      "Hermes Agent",
      "Cursor"
    ],
    "keySteps": [
      {
        "seconds": 34,
        "step": "Read the Cursor benchmark and price comparison with Fable 5.1 and Opus 5."
      },
      {
        "seconds": 82,
        "step": "Compare token use and input and output prices."
      },
      {
        "seconds": 131,
        "step": "Review professional knowledge work scores."
      },
      {
        "seconds": 172,
        "step": "Hear what is stronger than 4.6, including a 256,000 token context and 500,000 long context."
      },
      {
        "seconds": 196,
        "step": "Watch user demos of a racing game, a Blender scene and a 3D ship."
      },
      {
        "seconds": 275,
        "step": "Find Grok 4.7 on OpenRouter and use an API key."
      },
      {
        "seconds": 333,
        "step": "Switch Hermes Agent to Grok 4.7 and use it to fix the Grok CLI login."
      },
      {
        "seconds": 420,
        "step": "Compare the Super Grok Lite plan at $10 a month and Super Grok at $30 a month."
      },
      {
        "seconds": 527,
        "step": "Check the intelligence index rank and speed on OpenRouter."
      }
    ],
    "notCovered": [
      "The presenter's own coding tests of Grok 4.7.",
      "Independent verification of the benchmark scores and per-task costs quoted from the announcement.",
      "The Grok CLI running 4.7. The presenter only sees 4.6 there.",
      "Speed. The video says 4.7 is among the slowest models on the speed chart shown."
    ],
    "qa": [
      {
        "q": "What does Grok 4.7 cost?",
        "a": "$2 per million input tokens and $6 per million output tokens in the announcement. OpenRouter showed $1.60 and $4.80 at the time of recording."
      },
      {
        "q": "Where can I use it?",
        "a": "In Cursor, Grok Build, the Grok API and through OpenRouter and other model routers, according to the video."
      },
      {
        "q": "Did the presenter run it on a real task?",
        "a": "Only a short fix of the Grok CLI configuration in Hermes, costing a few cents in tokens."
      }
    ]
  },
  "ghjmULTSj2Q": {
    "summary": "A look at Moonshot AI's Kimi K3 on release, mostly through benchmark pages and OpenCode Go. The presenter notes it is cheaper per token than Fable 5 but, in another creator's test, used about 21 million tokens against 3.5 million and ran three to four times longer. A site audit hits a priority queue limit, and signing in to the Kimi Code CLI fails.",
    "whatYouBuild": "Nothing complete. The video selects Kimi K3 in OpenCode Go, starts a site audit, and tries and fails to log in to Kimi Code.",
    "toolsUsed": [
      "Kimi K3",
      "OpenCode",
      "OpenCode Go",
      "Kimi Code"
    ],
    "keySteps": [
      {
        "seconds": 30,
        "step": "Read arena and blog benchmark claims against Fable 5 and GPT 5.6 Sol."
      },
      {
        "seconds": 72,
        "step": "Compare token prices of $3 per million input and $15 per million output with Fable 5."
      },
      {
        "seconds": 181,
        "step": "Select Kimi K3 in OpenCode on the Go plan."
      },
      {
        "seconds": 229,
        "step": "Read Moonshot's note that new subscriptions are paused because of demand."
      },
      {
        "seconds": 283,
        "step": "Run a full site audit and hit a rate limit message pointing to a paid priority queue."
      },
      {
        "seconds": 483,
        "step": "Install the Kimi Code CLI on Linux."
      },
      {
        "seconds": 540,
        "step": "Try OAuth login, which fails with a membership error."
      }
    ],
    "notCovered": [
      "A finished audit or any comparison run by the presenter. The Chase AI test is another creator's.",
      "Independent verification of the benchmark rankings and the token counts quoted.",
      "Getting the Kimi Code CLI working.",
      "Whether the Moonshot subscription limits have eased."
    ],
    "qa": [
      {
        "q": "Is Kimi K3 cheaper than Fable 5?",
        "a": "Per token, yes. In the test the presenter cites, it used far more tokens and time, so the savings were small."
      },
      {
        "q": "Where is the easiest place to try it?",
        "a": "OpenCode Go at $10 a month, according to the presenter, because it is built in and avoids a Moonshot subscription."
      },
      {
        "q": "What went wrong with the audit?",
        "a": "A provider rate limit message said too many people were using Kimi and suggested a paid priority queue."
      }
    ]
  },
  "2OB6_oZAe9s": {
    "summary": "A tour of Kilo Code in the terminal, cloud agents and app builder, with Hermes Agent connected to the Kilo gateway. A security audit on the free Step 3.7 Flash model finds package vulnerabilities and the fixes are applied and pushed in about three minutes. The cloud agent needs credits and the cloud app build fails with output limit and connection errors. The sign-up link is an affiliate link.",
    "whatYouBuild": "A Kilo Code CLI session that audits and fixes a project's security issues, an AI code review configuration for a repository, and the Kilo gateway set as a provider in Hermes Agent.",
    "toolsUsed": [
      "Kilo Code",
      "Hermes Agent",
      "Step 3.7 Flash",
      "GitHub"
    ],
    "keySteps": [
      {
        "step": "Open the Kilo Code CLI, pick the free Step 3.7 Flash model from the model list and ask for a full security audit."
      },
      {
        "step": "Read the audit, which lists critical, high, medium and low issues, then ask it to fix them all."
      },
      {
        "step": "Commit and push the fixes so Vercel redeploys."
      },
      {
        "step": "Try a cloud agent and the app builder, which need credits and then fail with output limit and connection errors."
      },
      {
        "step": "Configure AI code review on one repository with chosen focus areas."
      },
      {
        "step": "Add the Kilo gateway to Hermes Agent with an API key and run a test message."
      }
    ],
    "notCovered": [
      "Testing the fixes, or confirming the vulnerabilities in the audit were real and are gone.",
      "A finished cloud-built app. The habit tracker build does not complete.",
      "KiloClaw, which the presenter skips because of the price.",
      "A fair comparison with OpenCode. Both are open-source agents with many models."
    ],
    "qa": [
      {
        "q": "Is the link an affiliate link?",
        "a": "Yes. The presenter says they earn a commission and that new users get some free credits."
      },
      {
        "q": "What does it cost?",
        "a": "Kilo Code is free and open source. The video quotes a Kilo Pass from $19 a month and KiloClaw hosting at $55 a month."
      },
      {
        "q": "Can I use it with Hermes Agent?",
        "a": "Yes. The presenter adds the Kilo gateway in Hermes setup with an API key and a base URL, and a test message returns."
      }
    ]
  },
  "1klc_1MxBdM": {
    "summary": "Import an n8n template that researches trending topics and posts to social media, then walk through its steps: a daily trigger, a SerpApi Google Trends call, topic and keyword picks, a ChatGPT topic choice, Perplexity research, posts to Facebook, LinkedIn and X, and a Google Sheets log. The workflow does not run end to end because the Perplexity credentials fail and the social accounts are not connected. Despite the title, it is not built in ten minutes.",
    "whatYouBuild": "A local self-hosted n8n instance with an imported multi-platform posting template, with the Trends and keyword steps tested and the research and posting steps unfinished.",
    "toolsUsed": [
      "n8n",
      "SerpApi",
      "Perplexity",
      "OpenAI API",
      "Google Sheets"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Import the AI-powered multi-social media post template into a local n8n."
      },
      {
        "seconds": 85,
        "step": "Set a schedule trigger that runs daily at 6 am."
      },
      {
        "seconds": 125,
        "step": "Call SerpApi's Google Trends endpoint for AI agents topics in the US."
      },
      {
        "seconds": 190,
        "step": "Pick the top two trending topics."
      },
      {
        "seconds": 235,
        "step": "Find high-volume keywords and have ChatGPT choose a blog topic."
      },
      {
        "seconds": 280,
        "step": "Set up Perplexity, which fails on authorization and needs credits."
      },
      {
        "seconds": 340,
        "step": "Review the Facebook, LinkedIn and X posting nodes and the Google Sheets log, none of which are connected."
      }
    ],
    "notCovered": [
      "A working Perplexity step. The credentials fail and the presenter asks viewers for help.",
      "Posting to any platform, since none of the accounts are authenticated.",
      "Automated posting on LinkedIn, which the presenter avoids after a past account suspension.",
      "Costs of SerpApi, Perplexity and OpenAI calls for a daily run."
    ],
    "qa": [
      {
        "q": "Does the workflow run?",
        "a": "No. The presenter says it has issues that must be fixed first and calls it a proof of concept."
      },
      {
        "q": "Where do the templates come from?",
        "a": "The n8n templates site, which the presenter says has about 5,900 free workflows, plus a local folder of roughly 2,000 workflows from GitHub."
      },
      {
        "q": "Why skip LinkedIn?",
        "a": "The presenter's earlier account was suspended and they do not want to use automation tools there again."
      }
    ]
  },
  "M_4KgrWyycI": {
    "summary": "An n8n workflow that turns a YouTube video into an infographic, a LinkedIn post and a newsletter. It pulls the transcript with Apify, summarizes it with Gemini, makes a 4K infographic with Nano Banana Pro through KIE, writes the post with Gemini Flash from the infographic and a newsletter with Claude, and saves them to Google Drive and Docs. The presenter posts to LinkedIn by hand, and the results quoted are their own.",
    "whatYouBuild": "An n8n workflow with an Apify transcript step, a Gemini summary, a KIE image task with a polling loop, a Google Drive upload, a base64 code node, and Gemini and Claude steps that write a post and a newsletter into Google Docs.",
    "toolsUsed": [
      "n8n",
      "Apify",
      "Gemini",
      "Nano Banana Pro",
      "KIE",
      "Google Drive",
      "Claude"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Run the Apify YouTube transcript actor and join the transcript pieces into one text."
      },
      {
        "seconds": 80,
        "step": "Summarize it with Gemini, then call KIE to create a 4K PNG infographic with Nano Banana Pro and poll until it finishes."
      },
      {
        "seconds": 130,
        "step": "Download the image, upload it to Google Drive and convert it to base64."
      },
      {
        "seconds": 130,
        "step": "Write the LinkedIn post with Gemini Flash from the infographic and a sample post."
      },
      {
        "seconds": 170,
        "step": "Write a roughly 400-word newsletter at about a sixth grade level with Claude and save it to Google Docs."
      }
    ],
    "notCovered": [
      "Posting to LinkedIn, which is done manually.",
      "Checking the AI summary against the video for accuracy.",
      "Per-run costs for Apify, KIE and the AI models.",
      "Independent checks of the presenter's quoted 19 percent open rate and 47,000 weekly impressions."
    ],
    "qa": [
      {
        "q": "Where is the template?",
        "a": "On the presenter's Gumroad page as pay what you want, and in their Skool community's paid plans, according to the video."
      },
      {
        "q": "Why use KIE for the image?",
        "a": "It gives API access to Nano Banana Pro, which n8n does not offer directly."
      },
      {
        "q": "Does it run automatically?",
        "a": "Not yet. It starts with a manual trigger, and the presenter plans an RSS trigger for new uploads."
      }
    ]
  },
  "exXV5ehmsEU": {
    "summary": "A first run of DeepSeek's new agentic coding harness, in developer preview, where models, tools and skills are all plugins. It installs with npx and pnpm and opens a web UI on localhost. The DeepSeek balance is empty, the OpenCode key errors, and an OpenRouter key works with DeepSeek V4 Pro. The generated engine simulation is buggy and a fix is requested.",
    "whatYouBuild": "A DeepSeek harness web UI on localhost, connected to DeepSeek V4 Pro through OpenRouter, used to generate a single-file two-stroke engine simulation.",
    "toolsUsed": [
      "DeepSeek coding harness",
      "OpenRouter",
      "DeepSeek V4 Pro",
      "pnpm"
    ],
    "keySteps": [
      {
        "seconds": 41,
        "step": "Run the npx install command, which needs Node.js."
      },
      {
        "seconds": 85,
        "step": "Build from source with pnpm install and pnpm build."
      },
      {
        "seconds": 112,
        "step": "Start the web UI on localhost."
      },
      {
        "seconds": 142,
        "step": "Enter a DeepSeek API key, which fails for lack of balance."
      },
      {
        "seconds": 162,
        "step": "Choose standard mode and review the enabled session and global plugins."
      },
      {
        "seconds": 213,
        "step": "Switch to OpenRouter after the OpenCode key returns a model unavailable error."
      },
      {
        "seconds": 287,
        "step": "Generate the engine simulation with DeepSeek V4 Pro."
      },
      {
        "seconds": 325,
        "step": "Open the agent trajectory view and check token use and cost."
      },
      {
        "seconds": 385,
        "step": "Preview the HTML, which is buggy, and ask for a fix."
      }
    ],
    "notCovered": [
      "A working simulation. The result is still buggy at the end.",
      "A comparison with other harnesses. The cost is described as low, with about 196,000 tokens and an approximate 18 cents.",
      "Plugin development, which is the harness's main idea.",
      "Stability. The harness itself warns that many areas still need improvement."
    ],
    "qa": [
      {
        "q": "Is the harness ready for daily use?",
        "a": "Not yet by its own notice. It is a developer preview and the presenter's first test produced buggy output."
      },
      {
        "q": "What does it cost?",
        "a": "The presenter's run used about 196,000 tokens and roughly 18 cents on DeepSeek V4 Pro through OpenRouter."
      },
      {
        "q": "Why did the first keys fail?",
        "a": "The DeepSeek platform balance was empty and the OpenCode key returned a model unavailable error. OpenRouter worked."
      }
    ]
  },
  "bjTr9p-zQ1M": {
    "summary": "A Make.com scenario that writes an ebook with Claude: Airtable holds the title, description and outline, a Google Doc is created, and a loop writes one chapter at a time. A fresh Claude API key is needed after repeated credit balance errors, and a status field blocks one run. The first chapter is 12 pages and chapter headings repeat, and the video ends mid-run, so a finished ebook is not shown.",
    "whatYouBuild": "A Make.com scenario using Airtable, Google Sheets and Docs and Claude Sonnet 4 to generate an outline and then chapters appended to a document.",
    "toolsUsed": [
      "Make.com",
      "Airtable",
      "Claude",
      "Google Docs",
      "Google Sheets"
    ],
    "keySteps": [
      {
        "seconds": 16,
        "step": "Set up an Airtable record with the ebook title, description, topic and status."
      },
      {
        "seconds": 69,
        "step": "Create the Google Doc and sheet that hold the chapters."
      },
      {
        "seconds": 152,
        "step": "Ask Claude for an outline and save it back to Airtable, then loop through chapters."
      },
      {
        "seconds": 255,
        "step": "Hit credit balance too low errors even after topping up, and fix it by creating a new API key."
      },
      {
        "seconds": 384,
        "step": "Switch the writing step to Claude Sonnet 4."
      },
      {
        "seconds": 460,
        "step": "Reset the Airtable status that blocked a run and start chapter writing."
      }
    ],
    "notCovered": [
      "A finished ebook. The run is still on chapter three when the video ends.",
      "Quality. The presenter says the first chapter is long, headings repeat and formatting needs editing.",
      "The total API cost for a full book.",
      "Rights and quality issues in selling an AI-written ebook, which the presenter plans to list in a shop."
    ],
    "qa": [
      {
        "q": "Why did the Claude step keep failing?",
        "a": "It reported a credit balance too low even after adding funds. Creating a new API key fixed it."
      },
      {
        "q": "Is the template available?",
        "a": "Yes, on the presenter's Gumroad page as pay what you want."
      },
      {
        "q": "How long does it take?",
        "a": "The presenter claims 15 to 30 minutes for a full ebook, but the video does not run it to the end."
      }
    ]
  },
  "cfYpzY-o3fQ": {
    "summary": "Set up OpenCode, the open-source coding agent, on Linux, start with its three free models, then upgrade to the OpenCode Go plan at $5 for the first month and $10 after. The presenter runs several terminals on MiniMax 2.7, Kimi 2.6 and Qwen 3.5 Plus, fixes an animation bug, and runs a PageSpeed skill from skills.sh that lists performance issues. The sign-up link is an affiliate link.",
    "whatYouBuild": "An OpenCode install with Go plan models connected by API key, used for a website fix and a performance audit across several terminal tabs.",
    "toolsUsed": [
      "OpenCode",
      "OpenCode Go",
      "OpenCode Zen",
      "skills.sh"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Install OpenCode with the curl command or npm."
      },
      {
        "seconds": 97,
        "step": "See the free models in Zen: DeepSeek V4 Flash, Big Pickle and Nemotron 3 Super Free."
      },
      {
        "seconds": 160,
        "step": "Subscribe to OpenCode Go, which the presenter prefers to topping up Zen credits."
      },
      {
        "seconds": 265,
        "step": "Copy a Go API key into OpenCode and choose models such as Qwen 3.5."
      },
      {
        "seconds": 314,
        "step": "Watch sub-agents work in parallel and open each task's output."
      },
      {
        "seconds": 368,
        "step": "Fix a site animation problem with Qwen 3.5 Plus."
      },
      {
        "seconds": 397,
        "step": "Install a Google PageSpeed skill and run a performance audit."
      },
      {
        "seconds": 466,
        "step": "Read the audit and check usage across models."
      }
    ],
    "notCovered": [
      "The effect of the performance fixes, which are only starting at the end.",
      "A fair comparison of the three models used, which were chosen to try different ones.",
      "Limits of the Go plan beyond the usage meters shown, which were 5 percent monthly and 11 percent weekly.",
      "Whether the free models are enough for daily work."
    ],
    "qa": [
      {
        "q": "Is OpenCode free?",
        "a": "The agent is free and open source, and three Zen models are free. The Go plan is $5 the first month, then $10."
      },
      {
        "q": "Is the link an affiliate link?",
        "a": "Yes. The presenter says new sign-ups and the presenter each get $5."
      },
      {
        "q": "Why use it alongside Codex?",
        "a": "The presenter says they run out of Codex credits often and switch to OpenCode to keep working."
      }
    ]
  },
  "avgG3VtN2C4": {
    "summary": "A hands-on session with Claude Fable 5 after its return, used in Claude Code at high effort for a security review and for a trial conversion and checkout review of the presenter's own web app. Sonnet writes the prompts, Fable 5 reports no critical, high or medium security findings in pending changes, then plans fixes for payment bugs. Fable 5 uses credits very quickly, reaching 95 to 98 percent of a session limit.",
    "whatYouBuild": "Two Claude Code plans on a SaaS project: a security audit with a fix plan, and a funnel review that finds payment and trial bugs and closes them in auto mode.",
    "toolsUsed": [
      "Claude Fable 5",
      "Claude Code",
      "Claude Desktop",
      "Stripe"
    ],
    "keySteps": [
      {
        "seconds": 54,
        "step": "Ask Claude Desktop for the best use cases: long-running agent work, full app builds and document-heavy analysis."
      },
      {
        "seconds": 108,
        "step": "Switch the Claude Code model to Fable 5 and set the effort level to high."
      },
      {
        "seconds": 131,
        "step": "Run a security audit prompt in plan mode, written by Sonnet."
      },
      {
        "seconds": 217,
        "step": "Check session and weekly usage, which climb fast."
      },
      {
        "seconds": 244,
        "step": "Write a prompt for UI and trial conversion fixes between signup and payment."
      },
      {
        "seconds": 321,
        "step": "Read the audit results and the implementation plan."
      },
      {
        "seconds": 426,
        "step": "Use sub-agents on the checkout backend, webhooks and marketing funnel, then run the plan in auto mode."
      }
    ],
    "notCovered": [
      "Proof that the fixes work in production or improve trial conversions.",
      "Whether the issues found are real. The video relies on the model's report.",
      "A comparison with other models on the same audit. The presenter has already used Codex and OpenCode on this site.",
      "Cost. Usage reached 51 percent of a session in about ten minutes and 98 percent shortly after."
    ],
    "qa": [
      {
        "q": "What did the security review find?",
        "a": "Zero critical, high or medium findings in the pending changes, and a fix plan with two issues that were closed."
      },
      {
        "q": "What bugs did the funnel review find?",
        "a": "A post-payment race where the success page does not confirm the subscription, stale copy from the old payment provider, and no second trial prevention."
      },
      {
        "q": "Is Fable 5 expensive to use?",
        "a": "On the Pro plan it used credits faster than any other model the presenter has tried, per the video."
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
