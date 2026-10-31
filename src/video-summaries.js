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
  }
};

// Third-person rewrites of first-person YouTube description openers, for listing cards and meta descriptions.
export const listingSummaries = {
  "-L0CVvJMzZI": "Behind the scenes of building TubeAnalytics, a YouTube analytics platform, in public.",
  "-cLECY10Tzg": "A look at Manus AI, which builds landing pages, apps and games, and its acquisition by Meta.",
  "-viL36QDF_8": "Gemini and ChatGPT are compared on a series of real tasks.",
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
  "508QvEHI5n0": "The AI skills worth learning now and why they matter for a career.",
  "6iFA7ds2PU4": "Set up and optimize a Skool community as a source of online income.",
  "8ieDSa8BVH4": "Build a Facebook Messenger chatbot that replies with ChatGPT.",
  "9DQYe6HywT8": "Build a presentation for an AI workshop with Gamma, step by step.",
  "9YueXsoNg80": "Generate Sora 2 videos inside n8n by connecting the OpenAI Sora 2 API, building a text-to-video pipeline and adding triggers.",
  "AO8NoHPU3e0": "A look at Claude Routines in Claude Code, a preview feature for automating tasks such as backlog work, PR reviews and event responses.",
  "C5wEcJRo_VA": "Install Pi, an open-source terminal coding agent, with a one-line npm command.",
  "CD2mLFgjiT8": "Build a chatbot for a Facebook page that replies to comments automatically.",
  "CGVALaueHeA": "Build a Make.com automation that finds trending YouTube topics.",
  "CfbMWB0G99E": "Build a client presentation with Gamma, step by step.",
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
  "OPQacEy41kM": "Practical ways to use AI to save time and money in a business.",
  "OUgxXuWG_wU": "Turn an existing stock tracking web app built on the Alpaca API into a desktop app using Hermes Agent and OpenCode.",
  "P7lbzDAb-qk": "A look at OpenAI's Sora 2 video model compared with Google Veo 3, with tips for better results.",
  "Qb6RG0-8O1k": "Switch from a Claude Pro subscription to Free Claude Code with OpenRouter free models and build a Next.js app for close to $0.",
  "QlL87_URHZ8": "Create images for free with Google Gemini 2.5 Flash Image, also called Nano Banana.",
  "R90zVHmoj7A": "Build AI automations in Make.com step by step.",
  "SLAnjvWK1Y4": "Set up a system that produces YouTube Shorts on a regular schedule.",
  "UkYoSNiqa6o": "Build a Make.com workflow that researches company leads, writes a personalized email for each contact and sends it.",
  "ZKpr-vmz_iY": "Install and use free, open-source agent skills from GitHub in Claude Code.",
  "ZNuGmX1HpxM": "A full demo of the Cortex AI second brain system built in Claude, described in the video as a $25,000 build.",
  "Zi_PG07mDxo": "Build a desktop app for PewDiePie's Odysseus AI using Odysseus itself and DeepSeek V4 Pro, for under $1 in credits.",
  "ZlD4Z6UKS8o": "Build a full web app with Lovable in under an hour.",
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
  "ga22WZgoj9M": "A SaaS app built with Free Claude Code and OpenCode in about 10 to 15 minutes, comparing the two coding agents.",
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
  "mkm8cz6dp8w": "Why Mike left the rat race and moved to Thailand, six years on.",
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
  "s6004nmWG9g": "Scrape lead data with an automation tool instead of paying for leads.",
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
