import { lateQa, lateSummaries } from './video-summaries-late.js';

// Reviewed summaries for recent uploads. Entries without a saved transcript identify their sources in sourceNote.
// Summary precedence: watchNotes > watchSeo > videoNotes > videoSummaries > listingSummaries > YouTube description > fallback.
// keySteps seconds are chapter starts, so they link to the same #t= cues as the chapter list.
export const videoSummaries = {
  YYZSR1p32EQ: {
    searchTitle: 'Herdr on Windows: Installation, Themes, Mods and Usage',
    summary: 'Explore Herdr on Windows: PowerShell installation, themes, a credit-usage mod and Insights. The recording also tours an Update Forge app build.',
    whatYouBuild: 'The recording demonstrates a Windows workspace for coding agents, theme changes and custom mods, then turns to an Update Forge application. Use the desktop companion for workspace setup and check each mod against your installed version. This walkthrough is not a controlled comparison of agent performance or credit savings.',
    toolsUsed: ['Herdr Desktop', 'Update Forge'],
    keySteps: [
      { seconds: 36, step: 'Review the PowerShell installation and Windows setup.' },
      { seconds: 104, step: 'Inspect the custom credit-usage mod, then browse themes and plugins.' },
      { seconds: 197, step: 'Follow the Insights mod demonstration and inspect the usage dashboard.' },
      { seconds: 453, step: 'Tour the Update Forge project and its update workflow.' },
    ],
    notCovered: ['Independent testing of every mod or Windows installation.', 'A controlled benchmark of credit savings or a verified production update rollout.'],
    qa: [],
    sourceNote: 'Summary based on the saved video description and the published chapter list. No separate transcript review or independent Windows test was performed for this summary.',
  },
  IV6q81wRay4: {
    searchTitle: 'Herdr Desktop Setup: Workspaces, Themes and Claude Code',
    summary: 'Set up Herdr Desktop, open coding-agent workspaces and try themes. The walkthrough resumes Claude Code and explores agent panes, with migration and access limits.',
    whatYouBuild: 'A desktop workspace for terminal coding agents that are already installed and authenticated. The written companion records a resumed Claude Code session, changes appearing in the file panel, and responses from several agent panes. Existing terminal workspaces did not migrate automatically, and Kimi was not authenticated.',
    toolsUsed: ['Herdr Desktop', 'Claude Code', 'Codex', 'OpenCode', 'Hermes'],
    keySteps: [
      { seconds: 73, step: 'Choose a theme and panels, then open a workspace in the desktop app.' },
      { seconds: 147, step: 'Launch Claude Code in a terminal pane and resume its own session.' },
      { seconds: 432, step: 'Open agent panes side by side and check which agents actually respond.' },
    ],
    notCovered: ['Installing or authenticating every coding agent.', 'Migrating all Herdr terminal workspaces or setting up a remote machine.', 'A controlled memory benchmark or proof that several agents can safely edit the same files.'],
    qa: [],
    sourceNote: "Summary based on the saved video description, chapters and the Herdr Desktop written guide. No separate transcript review was performed for this summary.",
  },
  V0PoYhOprBI: {
    searchTitle: 'Tasky, Restic-Studio and Luma-Launcher: Project Demos',
    summary: 'Tour Tasky, Restic-Studio and Luma-Launcher: a task monitor, backup app and Linux launcher. See the project interfaces and the AI coding workflow behind them.',
    whatYouBuild: 'This is a tour of three existing projects rather than a complete build-along. It introduces a task manager, a backup interface built with Rust, and a Linux application launcher, then returns to project details and the coding-agent prompting workflow. Check each project for current source availability, supported platforms and build instructions.',
    toolsUsed: ['Tasky', 'Restic-Studio', 'Luma-Launcher', 'Rust', 'Claude Code', 'Codex'],
    keySteps: [],
    notCovered: ['A complete installation or source build for all three projects on a clean machine.', 'Independent verification of backup recovery, operating-system compatibility or performance.'],
    qa: [],
    sourceNote: "Summary based on the saved video description and chapter list. No transcript or independent project test was reviewed for this summary.",
  },
  phVQuQMojA8: {
    searchTitle: 'Claude Code Task-Manager Demo: Processes and Packaging',
    summary: 'Tour a task manager built with Claude Code for Linux and Windows. Inspect process metrics, the prompting approach and a request for Debian and AppImage packages.',
    whatYouBuild: 'A process and performance-monitoring app is the subject of this project walkthrough. The companion guide describes CPU and memory views, expandable process details and a paused history display. Start with a small brief and checks against the operating system. The recording explains the prompting approach but does not supply the complete original prompt or confirm every installer on a clean machine.',
    toolsUsed: ['Claude Code', 'ChatGPT', 'Rust', 'Tauri', 'React'],
    keySteps: [
      { seconds: 59, step: 'Inspect the process list and performance-monitoring views.' },
      { seconds: 96, step: 'Review how a short task-manager brief becomes a more detailed coding prompt.' },
      { seconds: 135, step: 'Separate the request for Debian and AppImage packages from the development demo.' },
    ],
    notCovered: ['Feature parity across Linux and Windows. The guide records that benchmarking was not yet available on Linux.', 'A complete source build or verified installation of every generated package.'],
    qa: [],
    sourceNote: "Summary based on the saved video description, chapters and the Claude Code task-manager written guide. No separate transcript review was performed for this summary.",
  },
  '0iTOlQjNdhs': {
    summary: 'Customize an Android TV launcher with CleanYourTV and Claude Code. The recording covers backups and a Docker build, with remote-button issues still unresolved.',
    whatYouBuild: 'A replacement Android TV home screen is built and tried on the recorded device. The companion guide describes backing up settings, selecting apps and building a launcher through Docker when the local Android SDK is missing. The launcher opens retained apps and accepts a theme, but Settings and other remote-button problems remain. Check the exact device, supported project instructions and a recovery path before following the workflow.',
    toolsUsed: ['CleanYourTV', 'Claude Code', 'Android TV', 'Docker'],
    keySteps: [
      { seconds: 250, step: 'Review the settings backup before changing the TV configuration.' },
      { seconds: 462, step: 'Follow the recorded Docker launcher build and its environment limits.' },
      { seconds: 565, step: 'Inspect the new home screen and distinguish working apps from unresolved physical remote controls.' },
    ],
    notCovered: ['A universal fix for every TV, advertisement or physical remote button.', 'A complete reproducible Docker build command or independently tested restore procedure.'],
    qa: [],
    sourceNote: "Summary based on the saved video description, chapters and the CleanYourTV written guide. No separate transcript review was performed for this summary.",
  },
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
        "a": "The agent stops until the weekly limit resets. For Mike, that was about four days away at the time."
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
        "a": "Codex, Claude Code, OpenCode and Hermes, which Mike runs in separate tabs of the same workspace."
      },
      {
        "q": "Does Herdr keep sessions after you close it?",
        "a": "Yes. Sessions are saved when you quit and are there when you start Herdr again."
      },
      {
        "q": "Is it heavy on memory?",
        "a": "It used about 8 GB with several agents running in Mike's test."
      }
    ]
  },
  "qQVAnp4-EpI": {
    "summary": "Write a master brief, run market research in Runable, then generate and refine an AI Growth Audit website from that research. Stripe payments and the consultation email are not connected by the end of the recording.",
    "whatYouBuild": "A first-version marketing site and customer portal for an AI Growth Audit service, with a chatbot, Google sign-in, FAQ and a contact form, built from a brief and generated research.",
    "toolsUsed": [
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
        "q": "How long did the REA Kdenlive rebuild take?",
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
        "a": "Mike could not get it working there. The API key kept failing, so the working route was Muse Code."
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
        "a": "No. Mike reviews the announcement and says hands-on testing will come later."
      },
      {
        "q": "How much does Claude Haiku 5.5 cost?",
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
        "a": "A free trial, then $20, $60 or $200 a month, as Mike states."
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
        "a": "The script Manus wrote used OpenAI at first. After adding a Gemini API key, Mike asked Manus to switch it to Gemini."
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
        "a": "The free Zen option returned an insufficient balance error, and GLM 5.2 worked after switching to the OpenCode Go plan, which Mike states costs $10 per month."
      },
      {
        "q": "Can Hermes Agent use GLM 5.2?",
        "a": "Yes. After connecting the OpenCode Go plan, the model command in Hermes Agent lets you pick GLM 5.2, and it works in both the terminal and the Hermes desktop app."
      },
      {
        "q": "How much did the GLM 5.2 tests cost in OpenCode?",
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
        "a": "It uses the Starter plan, about $5 a month as Mike states, for an instant voice clone. Mike recommends the Creator plan, $22 a month as stated, for a professional clone."
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
        "a": "Perplexity will likely need money added to billing, Mike says. JSON2Video gives a free API key on signup, but the test ran out of credits on the current plan."
      },
      {
        "q": "Where can I get the Make.com RSS to AI video template?",
        "a": "The template is on Mike's Gumroad page as free or pay what you want. It is also linked from his Skool community, where templates need the premium plan, Mike says."
      }
    ]
  },
  "4uNxh9FW6Ho": {
    "searchTitle": "Vapi voice agent walkthrough: Twilio and Make.com calls",
    "summary": "Build an outbound AI voice agent in Vapi with an ElevenLabs voice clone, a Twilio number and a Make.com scenario that calls leads from Google Sheets. The live test books a calendar slot, but the Vapi outbound campaign feature did not work for Mike.",
    "whatYouBuild": "Mike builds a Vapi appointment scheduler assistant that a Make.com scenario uses to call leads from a Google Sheet, mark them as called and book consultations on Google Calendar.",
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
      "Setting up outbound call campaigns inside Vapi is skipped, and Mike says it did not work for him.",
      "The Make.com webhook for call status messages is mentioned but never configured."
    ],
    "qa": [
      {
        "q": "Do you need coding to build a Vapi voice agent?",
        "a": "No. Mike builds it with Vapi's assistant settings, a Twilio number and a Make.com scenario, without writing code."
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
      "Replying to Facebook comments is not covered, and Mike says he is unsure whether that is possible.",
      "Prompt design for safe or on brand replies is not tested beyond a one line instruction."
    ],
    "qa": [
      {
        "q": "Why did the Messenger webhook fail to verify?",
        "a": "The callback URL kept failing in the Facebook app. Creating a brand new webhook in Make.com and using its URL and verify token fixed it."
      },
      {
        "q": "Which ChatGPT model is used for replies?",
        "a": "A GPT-4 model is selected in the OpenAI Create a Completion module and asked to create a reply to the Facebook message."
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
        "a": "Gamma is free to start, and the free plan shows 400 credits. Mike says paid plans are about $10 per month."
      },
      {
        "q": "Can Gamma export to PowerPoint or Google Slides?",
        "a": "The share menu offers PDF, PowerPoint, Google Slides and images. In Mike's test the Google Slides export did not work, so a PDF was used."
      },
      {
        "q": "Can Gamma turn a presentation into a website?",
        "a": "Yes. Mike converts the deck to a site and publishes it, but publishing to a custom domain needs a paid plan."
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
        "a": "A free Gemma 4 model starts running, but it later returns a temporarily rate limited error, so Mike switches to a paid low-cost model."
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
        "a": "The minimal viable product took about 15 minutes to build in OpenCode, Mike says. More time followed fixing build and database errors."
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
        "a": "Claude Code wrote its own Playwright scraper that intercepted Klook's API responses when no suitable actor worked."
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
        "a": "Not in this test. The site audit alone cost nearly half of a full day of DeepSeek V4 Pro use, and Mike says he rarely hits limits with DeepSeek."
      },
      {
        "q": "How do I use Kimi K2.7 Code in OpenCode?",
        "a": "Type /models in OpenCode and select Kimi K2.7 Code, which is already built in. The video uses it through the OpenCode Go plan rather than the Moonshot API."
      },
      {
        "q": "What did Kimi K2.7 Code do well in the test?",
        "a": "The audit returned high impact and critical findings that Mike called good. It also made about 1,700 URL replacements across blog JSON files quickly."
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
        "a": "About 2 minutes of video for the avatar and about 2 minutes of audio for the voice clone, as Mike states."
      },
      {
        "q": "Can Make.com create 1080p HeyGen videos?",
        "a": "Make.com could only create 720p videos in Mike's test, even on a paid HeyGen plan."
      },
      {
        "q": "Is the YouTube upload fully automatic?",
        "a": "Uploads go to YouTube as unlisted, and the title and description still need manual edits. Feeding topics from Airtable is suggested as a next step but not built."
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
        "a": "It works with Claude in the browser or desktop app, plus Cursor, ChatGPT, Codex and other MCP clients, Mike says. Only Claude Desktop is shown."
      },
      {
        "q": "How much does vidIQ cost?",
        "a": "vidIQ paid plans start at $19 per month, Mike says. The video does not say which plan the MCP requires."
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
        "a": "Mike uses the desktop app for ease, but notes it maxed out the CPU and used a lot of memory. He recommends the terminal in most cases."
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
        "a": "The desktop app makes GLM 5.2 easier for people who are not comfortable in the terminal, Mike says. It also shows sub-agents and file edits in a side panel."
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
        "a": "The audit, plan, image and GEO commands are used here, and the GitHub page also lists sitemap generation among others."
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
        "a": "It seems essentially free because no API keys had to be connected, Mike says. He uses it here while Claude Code credits are waiting to reset."
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
        "a": "Not in this test. The channels page showed a channel config schema unavailable error, and the QR code login was left to figure out later."
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
        "a": "The build used a free model in OpenCode Zen and cost zero credits, Mike says."
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
        "q": "What did the Free Claude Code build cost?",
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
    "summary": "A live walkthrough of OpenSEO, an open-source SEO platform with a free tier. It connects Google Search Console, links the MCP to Claude Code, and runs keyword research, a site audit and backlink checks on a competitor and on Mike's own sites. Prices and star counts are quoted from Mike, not checked here.",
    "whatYouBuild": "An OpenSEO account connected to Google Search Console and to Claude Code through MCP, used to pull keyword data, run an SEO audit and generate an HTML report of fixes.",
    "toolsUsed": [
      "OpenSEO",
      "Claude Code",
      "Google Search Console"
    ],
    "keySteps": [
      { "seconds": 27, "step": "Compare OpenSEO's free tier and plans from $10 a month with Semrush, which Mike says starts at $149." },
      { "seconds": 56, "step": "Find the MCP install instructions for Claude Code or Codex." },
      { "seconds": 81, "step": "Connect Google Search Console so site data comes in without a custom skill." },
      { "seconds": 105, "step": "Paste the setup prompt into Claude Code to link the MCP." },
      { "seconds": 145, "step": "Run keyword research for a seed term and sort long-tail results by competition." },
      { "seconds": 231, "step": "Run the recommended SEO audit command through the MCP and authorize read access." },
      { "seconds": 260, "step": "Check a large competitor's backlinks, referring domains and domain rating." },
      { "seconds": 316, "step": "Review the backlink profile of Mike's own domain." },
      { "seconds": 448, "step": "Read the generated report, which finds few inbound links as the main gap, and start the fixes." }
    ],
    "notCovered": [
      "The brand lookup for AI citations, which needs a paid plan and is not shown.",
      "A full-site audit. The test crawl covers 50 pages of a site Mike says has about 5,000.",
      "Independent checks of the pricing, star counts and backlink figures quoted in the video.",
      "A side-by-side accuracy comparison with paid tools such as Semrush or Ahrefs."
    ],
    "qa": [
      {
        "q": "Is OpenSEO free?",
        "a": "OpenSEO has a free tier, and Mike says paid plans start at $10 a month. Check the current pricing page before relying on that."
      },
      {
        "q": "What does the OpenSEO MCP add?",
        "a": "It lets Claude Code or Codex read OpenSEO data directly, so an audit command can pull the data and produce a written report without leaving the coding tool."
      },
      {
        "q": "What did the OpenSEO audit find?",
        "a": "On one site the report said pages load and are set up correctly and the main gap is that almost no other sites link to it, plus six smaller fixes. Another test showed slow server responses and long titles and meta descriptions."
      }
    ]
  },
  "t0nQSyryTPg": {
    "summary": "A tour of demos that other people made with GPT-6 Astra, shown from posts and the product site: exploded 3D models, a V8 engine, a Zillow-style house, browser racing games and a Counter-Strike recreation. Mike does not build or test any of them in this video.",
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
      "Any build or test by Mike. Every demo comes from other creators.",
      "Prompts, build times and costs for most demos, which the video says it does not know.",
      "Independent checks of claims such as one-shot builds and view counts, which come from the original posts.",
      "How well these demos run on average hardware."
    ],
    "qa": [
      {
        "q": "Did Mike make these GPT-6 Astra demos?",
        "a": "No. They are shared by other creators and the product site, and the video walks through them."
      },
      {
        "q": "Are the one-shot claims verified?",
        "a": "No. The video repeats what creators say about how a demo was made, and it does not reproduce any of them."
      },
      {
        "q": "What plan does Mike suggest for building games like these?",
        "a": "The $200 a month max plan, since Mike expects this kind of build to use credits quickly. That is an opinion, and he does not run a build to show the usage."
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
      "Automatic updates of the office after a task is approved. Mike asks for this at the end.",
      "The agent avatar update, which has not been done when the video ends.",
      "How the 35 agents were built, beyond what the office shows.",
      "Usage limits in detail. Mike mentions being on a $60 a month plan and a base plan from $20."
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
      "The fixes being made. Cloud agents are not on the free trial, so Mike files GitHub issues instead.",
      "The contents of the AI citation plan briefs.",
      "Getting the three bots to pass work to one another, which is planned but not done.",
      "Independent checks of the traffic and keyword estimates shown."
    ],
    "qa": [
      {
        "q": "What did the GrokBot SEO audit find?",
        "a": "A score of 83 out of 100 across 30 public pages. The top actions include fixing the HTML language attribute on localized routes, hreflang, and desktop homepage performance."
      },
      {
        "q": "What does the GrokBot SEO setup cost?",
        "a": "Mike uses a free trial and mentions a Pro plan at $20 a month. Treg data is billed from a credit balance, shown as 77 cents at the time."
      },
      {
        "q": "Could it open a pull request with the fixes?",
        "a": "Not on the free trial. The cloud agent that does that needs the paid plan, so Mike files issues and plans to fix them with another coding tool."
      }
    ]
  },
  "QMqe2ubsn0g": {
    "summary": "A walkthrough of DextroLab, a tool for giving agency clients a branded portal to run Make.com or n8n automations, with usage billing through Stripe. Mike connects Make.com, delivers a voice agent workflow to a client and sets example pricing. A custom-variable step fails with an invalid API key error and is dropped. The link in the description is an affiliate link.",
    "whatYouBuild": "A white-label client setup in DextroLab: a Make.com connection, a workflow delivered to a client for approval, and example pricing with a per-run fee, a monthly base fee and a one-time setup fee.",
    "toolsUsed": [
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
        "a": "Two connection options are shown, n8n and Make.com, each using an API key and a base URL."
      },
      {
        "q": "How do clients pay?",
        "a": "Through Stripe. Mike shows a per-run fee, a recurring monthly fee and a one-time setup fee that DextroLab bills automatically."
      },
    ]
  },
  "dVvazfQHhW4": {
    "summary": "Build a Python script with an AI agent that fetches your latest YouTube video and writes a LinkedIn post and a 1,500-word newsletter from it, then schedule it as a daily Hermes cron job. The first Hermes output is weak, so Mike moves the edits to OpenCode and the OpenAI API. The results still need editing, and posting is done by hand.",
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
      "Automatic posting to LinkedIn. Mike pastes the newsletter in by hand.",
      "A successful scheduled run. The cron job shows an error because the API limit was exceeded.",
      "Measured results from the posts, and the cost of each run.",
      "A fair model comparison. Hermes and OpenCode are run on different prompts and models."
    ],
    "qa": [
      {
        "q": "Do I need a YouTube API key?",
        "a": "Not in this build. Mike says the script found the latest video without a key from Google Cloud Console."
      },
      {
        "q": "Why switch from Hermes to OpenCode?",
        "a": "Mike did not like the Hermes drafts and found OpenCode edited the script faster. This is a personal view from one run."
      },
      {
        "q": "Is the output ready to post?",
        "a": "No. Mike says the newsletter needs editing and formatting before it goes to subscribers."
      }
    ]
  },
  "9A2StjrxOms": {
    "summary": "A sponsored demo of Treg, a pay-per-call catalog of agent tools, connected to Codex and GrokBot. Mike calls DataForSEO through Treg for keyword and backlink data, and builds an SEO auditor in GrokBot that reports a total spend of 13 cents. The video states that Treg sponsored it and that the sign-up link is an affiliate link.",
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
      { "seconds": 457, "step": "Run a DataForSEO backlink summary on Mike's domain at a quoted per-call price." },
      { "seconds": 576, "step": "Build the GrokBot SEO auditor and read its report, which starts a Cursor cloud agent for fixes." }
    ],
    "notCovered": [
      "A comparison of providers on real accuracy or reliability. Prices are shown but quality is not tested.",
      "Costs without Mike's balance. Mike says a paid collaboration funded a $100 balance.",
      "The fixes the cloud agent makes after the audit.",
      "Independent checks of the traffic, keyword and backlink figures returned."
    ],
    "qa": [
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
      { "seconds": 157, "step": "Start a faceless video and choose a style, subtitles, voice and aspect ratio. Mike quotes 13 credits per minute and 500 credits a month on the paid plan." },
      { "seconds": 195, "step": "Adjust animation, sound effects, background music and subtitle position." },
      { "seconds": 270, "step": "Use the AI script assistant, which returns not found errors at first." },
      { "seconds": 560, "step": "Schedule a post from the content calendar." },
      { "seconds": 866, "step": "Set up the bulk scheduler for 7 to 30 days of videos with up to five posts a day." }
    ],
    "notCovered": [
      "Results from Mike's own videos. The claim of good results after three months is not shown.",
      "The cause of the not found script errors.",
      "The finished bulk-scheduled videos, which were still rendering at the end.",
      "Current pricing. Paid plans were quoted from $25 a month in August 2025."
    ],
    "qa": [
      {
        "q": "Is Syllaby free?",
        "a": "It offers some free credits to start. Mike says most people will need a paid plan, quoted from $25 a month when recorded."
      },
      {
        "q": "Can I use my own ElevenLabs voice?",
        "a": "Mike could not find a direct ElevenLabs integration. Syllaby makes voice clones itself and he says it uses ElevenLabs behind the scenes."
      },
      {
        "q": "Does Mike recommend Shorts for income?",
        "a": "Not for direct income. Mike says Shorts pay little without millions of views and favors long-form videos for monetization."
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
      "Running a local model. Mike says his hardware cannot handle one.",
      "Setting up the agent's shell, so it could not run local skills.",
      "A finished model comparison. The Pong test failed for one model.",
      "Proof that the scheduled email digest arrives. The video ends after an inbox summary of 30 emails.",
      "An independent check of the star count and view numbers quoted in the video."
    ],
    "qa": [
      {
        "q": "Is Odysseus free?",
        "a": "It is free and open source with no subscription, Mike says. Model usage is billed by whichever provider you connect, such as OpenRouter."
      },
      {
        "q": "How long does installing Odysseus take?",
        "a": "About five minutes on Debian Linux in this video, using a Python virtual environment and pip."
      },
      {
        "q": "What did the Odysseus test cost in credits?",
        "a": "Using DeepSeek V4 Flash through OpenCode, Mike reports about two cents early on and about five cents by the end."
      },
      {
        "q": "Did the email connection work?",
        "a": "After several failed tests, adding a Gmail app password with IMAP and SMTP passed and an inbox summary returned."
      }
    ]
  },
  "Zi_PG07mDxo": {
    "summary": "Wrap Odysseus in an Electron desktop app. Mike asks Odysseus with DeepSeek V4 Pro to build it, the run stalls on an npm install, and Codex plus the terminal finish the job. The app crashes once, then runs in its own window using about 2.3 GB of memory. Credits used in OpenCode: 31 cents.",
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
      "How to share the app. Mike has not merged it into the main repository.",
      "A speed measurement. The faster feel is Mike's impression."
    ],
    "qa": [
      {
        "q": "Did Odysseus build the whole app?",
        "a": "It created the wrapper structure, but its npm install stalled. Codex and terminal commands finished the setup."
      },
      {
        "q": "What did the Odysseus app cost to build?",
        "a": "Mike reports 31 cents in total on DeepSeek V4 Pro through OpenCode."
      },
      {
        "q": "Where can I get the Odysseus desktop app?",
        "a": "It is not published. Mike says he may suggest it to the Odysseus project."
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
      "A comparison of the dashboard estimate with actual provider bills, beyond Mike's remark that it is an estimate.",
      "Claude Code or Codex routed through the proxy, which Mike avoids."
    ],
    "qa": [
      {
        "q": "Is the cost shown in 9Router what I will pay?",
        "a": "No. Mike says it is an estimate, and compares it with the actual spend shown in the OpenCode account."
      },
      {
        "q": "Why not route Claude Code or Codex through 9Router?",
        "a": "9Router warns that these connections use a subscription login that is not officially licensed for proxy use and the account may be restricted or banned. Mike avoids it to protect the accounts."
      },
      {
        "q": "What do the token savers claim?",
        "a": "The dashboard text quotes 60 to 95 percent fewer tokens for JSON data and 15 to 20 percent fewer for coding agents. The video does not measure this."
      }
    ]
  },
  "kXw2yntdmo4": {
    "summary": "A Make.com scenario that runs an Apify scraper on an Apollo search, takes 100 leads and writes their names, emails and other fields into a new Google Sheet. The run works after a sheet-name clash is fixed, but the phone number column comes back wrong. Mike offers the template on Gumroad as pay what you want.",
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
      "Fixing the phone number column, which Mike says is not working.",
      "Apollo's and Apify's terms of use, or the privacy rules and consent that apply to cold email in your country.",
      "A clear cost per lead. The spoken price in this video is garbled. A companion Apollo video quotes $1.20 per 1,000 leads for the same actor."
    ],
    "qa": [
      {
        "q": "Why use Apify instead of Apollo directly?",
        "a": "Mike was nearly out of Apollo credits, which are spent per lead, and says Apify's free monthly credit meant his usage did not rise in the demo."
      },
      {
        "q": "How many leads did it collect?",
        "a": "100 in the demo. The actor can scrape far more, but Mike limited the test."
      },
      {
        "q": "Where can I get the Apollo lead scraper Make.com template?",
        "a": "On Mike's Gumroad page as pay what you want, according to the video."
      }
    ]
  },
  "ztEj6zCJh5k": {
    "summary": "Install an open-source Video Use skill and ask Claude Code to cut a long tutorial into a 9:16 YouTube Short with the screen share on top and the webcam below. The first result repeats the webcam in both halves. A second, more exact prompt produces a roughly 17-second clip with burned-in subtitles. Mike calls the result a work in progress.",
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
      "A polished result. Mike says the subtitles could sit better and the output could be improved.",
      "A fair comparison with Opus Clip. Mike says the free plan results were poor but does not run the same clip through both.",
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
    "summary": "Run an SEO audit skill in OpenCode on Mike's own AI search visibility site, then let the agent fix blog articles and work on llms.txt, ai.txt and sitemap.xml before a commit and redeploy on Vercel. Mike hits 98 percent of the OpenCode Go monthly limit and switches to a free model. No ranking result is shown, so the video does not answer its own title question.",
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
      { "seconds": 135, "step": "Run the audit on Mike's own site and read the issues found." },
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
        "a": "Not on this evidence. One audit and one round of fixes on one site are shown, without ranking results, and Mike does not claim a measured gain."
      },
      {
        "q": "What does OpenCode Go cost?",
        "a": "$10 a month, according to Mike. The description link is an affiliate link that gives $5 in credits to a new user and $5 to Mike."
      },
      {
        "q": "What happens when the Go limit runs out?",
        "a": "Mike switches to a free model under OpenCode Zen, such as DeepSeek V4 Flash Free, and keeps going."
      }
    ]
  },
  "wRqpZ9F3rmI": {
    "summary": "A sponsored walkthrough of connecting the DataForSEO MCP server to Claude, then using plain-language prompts for an SEO audit, a seven-day action plan, a competitor and keyword-gap report, and an AI search visibility check on Mike's own site. The video says DataForSEO sponsored it and that the sign-up link gives $5 in trial credits instead of the usual $1.",
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
        "q": "How long does the setup take?",
        "a": "Under five minutes, Mike says: create the account, add the MCP connection in Claude and restart it."
      },
      {
        "q": "How does DataForSEO charge?",
        "a": "Per API request rather than a required monthly subscription, so the cost depends on how much data you ask for."
      }
    ]
  },
  "ga22WZgoj9M": {
    "summary": "A tour of an AI search visibility app built with OpenCode, Codex and Free Claude Code, followed by the reasons Mike moves away from Free Claude Code: repeated API request errors, slow replies and a 401 error tied to startup order. OpenCode answers quickly on free models and Codex on a $20 plan is preferred over Claude Pro. The app is only on a local server.",
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
      "The cause of the API request failed errors, which Mike asks viewers to help with.",
      "A timed comparison. Statements that OpenCode is quicker than Claude Code are impressions.",
      "Checking that the app's AI visibility score is accurate. Mike says this still needs work.",
      "A finished meta tag optimizer, or a public release of the app."
    ],
    "qa": [
      {
        "q": "Is OpenCode better than Free Claude Code?",
        "a": "For Mike, yes. Free Claude Code was slow and kept failing with API errors, while OpenCode responded quickly on free models. This is one person's experience on one setup."
      },
      {
        "q": "Why did Mike move to Codex?",
        "a": "They say Codex at about $20 a month used credits more slowly than Claude Code and was more reliable."
      },
      {
        "q": "Where can I use Mike's AI visibility app?",
        "a": "It only runs on Mike's local machine. He offers to share a link on request."
      }
    ]
  },
  "UnnN2i90ALg": {
    "summary": "Install Hermes Agent on Linux with the one-line installer, run the full setup, and try it on a code review, sub-agents and a research task. The first model attempts fail with 401 and balance errors until a free OpenCode Zen model works. The title says Hermes beats OpenClaw, but the video never runs OpenClaw, so that is Mike's opinion.",
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
      "A side-by-side run with OpenClaw. Mike says OpenClaw did not impress him but shows no comparison.",
      "The cause of the OpenRouter 401 error, which was bypassed by changing provider.",
      "The research result Mike wanted. The agent returned a list of AI YouTube channels instead.",
      "Messaging gateways such as Telegram or WhatsApp, which are skipped."
    ],
    "qa": [
      {
        "q": "Is Hermes Agent better than OpenClaw?",
        "a": "Mike says he likes it more, but the video does not test OpenClaw, so there is no evidence for a comparison here."
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
    "summary": "A sponsored hands-on test of Bluehost's all-in-one AI assistant, a $20 a month bundle that puts ChatGPT, Gemini, Claude and Grok models in one dashboard. The video tries auto model routing, web search, image generation and editing, a research report, a 1,500-word SEO article and a five-slide PowerPoint. The video says Bluehost sponsored it. The price comparison is Mike's own arithmetic.",
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
        "q": "How much does the Bluehost AI assistant cost?",
        "a": "The all-access pack is quoted at $20 a month and the privacy version at $25. Check Bluehost for current pricing."
      },
      {
        "q": "Is the $70 a month saving real?",
        "a": "It is Mike's sum of separate subscriptions at the prices quoted in the video. It does not account for usage limits."
      },
      {
        "q": "How good was the presentation?",
        "a": "Mike calls it simplistic but impressive for under two minutes, and says the slides could be improved."
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
        "a": "A Vapi account with credits to run the agent. Mike says you can start for free, and Make.com handles the calling automation."
      },
      {
        "q": "Which apps can Vapi connect to?",
        "a": "Vapi connects with 40 or more apps, Mike says, including OpenAI, Anthropic Claude, ElevenLabs, Google Sheets and calendars."
      }
    ]
  },
  "nJtbBB0JBYY": {
    "summary": "A walkthrough of Skool's membership tiers, announced on October 29, 2025, using Mike's own community: a free tier, a $29 a month premium tier and an $89 a month VIP tier, with classroom modules unlocked by tier. It also compares Skool's $9 Hobby and $99 Pro plans. All prices and fees are as stated in October 2025. The link in the description is an affiliate link.",
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
      "A fair comparison with other community platforms. The reasons for choosing Skool are Mike's opinion."
    ],
    "qa": [
      {
        "q": "What Skool membership tiers does Mike set up?",
        "a": "Free with community access and beginner training, premium at $29 a month or $280 a year, and VIP at $89 a month or $850 a year."
      },
      {
        "q": "What are Skool's platform fees?",
        "a": "The $9 Hobby plan has a 10 percent transaction fee and the $99 Pro plan 2.9 percent, Mike says. Confirm on Skool before deciding."
      },
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
      "A working Creatomate render. Mike says that part is not working yet and the run errors there.",
      "Costs for Suno, KIE and Creatomate credits per video.",
      "Automatic YouTube upload. Mike advises uploading manually because YouTube can detect automated uploads.",
      "Music quality beyond one short sample, and any rights questions around publishing AI-generated music."
    ],
    "qa": [
      {
        "q": "Does the whole workflow run end to end?",
        "a": "Not in this video. The music and image steps run, but the video render step fails and needs debugging."
      },
      {
        "q": "Why does the Suno prompt have a length limit?",
        "a": "Suno prompts must be under 500 characters or Suno will not generate the track, Mike says."
      },
      {
        "q": "Is there a manual option?",
        "a": "Yes. Generate tracks in Suno and put them together in a video editor such as Kdenlive or CapCut, which Mike says is easier in the long run."
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
      "A running app. There is no index page to preview yet and Mike plans ten phases.",
      "The final cost and the planned $19 a month price, which are only floated.",
      "How well the generated code works, since Mike does not read it.",
      "Rate limits in detail. Mike says he is hitting them on Claude Pro and may switch to API credits."
    ],
    "qa": [
      {
        "q": "How does the planning work?",
        "a": "Opus 4.6 writes a master prompt split into numbered phases, and each phase is pasted into Claude Code in order."
      },
      {
        "q": "Did Mike write any code?",
        "a": "No. Mike approves each step in Claude Code instead, he says."
      },
      {
        "q": "Is the app available?",
        "a": "Not yet. Mike was still building it and waiting on a domain name."
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
      "Fixing the modify-order bug Mike spots.",
      "How the cron jobs are created, which Mike saves for another video.",
      "Real trading, security of the API keys, or a speed test. The desktop Hermes app feeling slower is an impression."
    ],
    "qa": [
      {
        "q": "Is the trading real?",
        "a": "No. Mike says the orders use sandboxed test data and are not real money."
      },
      {
        "q": "Which tool fixed the chart bug?",
        "a": "Codex on GPT 5.4 Mini. Hermes and OpenCode could not get the scroll loading to work."
      },
      {
        "q": "How long did the desktop app take?",
        "a": "About ten minutes for the wrapper. Mike says the original web app took roughly three hours."
      }
    ]
  },
  "_ikohuukGE4": {
    "summary": "Build a landing page for a Skool community in Google Antigravity with Gemini 3.1 Pro, using a master prompt that Claude writes from screenshots of a reference site. The first version appears in about five minutes, Mike edits names and links by hand, and OpenCode finishes all 16 sections after Gemini credits run low. Placeholder testimonials and the pricing still need fixing, and no conversion results are shown.",
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
      "Replacing the generated placeholder testimonials with real ones, which Mike says still has to be done.",
      "Correct pricing. The page shows wrong prices Mike plans to fix.",
      "Any conversion data or the Facebook pixel for ads, which are only planned.",
      "Whether copying a reference site's look and layout raises design or copyright concerns."
    ],
    "qa": [
      {
        "q": "Why build a landing page at all?",
        "a": "The Skool about page for a free community shows only the free plan, so visitors never see the paid plans, Mike says."
      },
      {
        "q": "How long did the Antigravity landing page take to build?",
        "a": "About five minutes for the first draft and about ten more minutes in OpenCode to build all 16 sections."
      },
      {
        "q": "Which tools cost money?",
        "a": "Gemini costs about $10 a month and Claude Code $20 a month, Mike says, with OpenCode used as a mostly free fallback."
      }
    ]
  },
  "wakl0ayO_fk": {
    "summary": "An introduction to Jev, a fast decision model from Typesafe AI that returns structured answers with probabilities instead of text, plus a hands-on install in Claude Code and Codex. The speed and cost figures come from the vendor and its demos. Mike tests a site slop checker, routes Codex through the Jev router and runs an SEO and GEO orchestrator that reports a citation gap.",
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
        "step": "Run the Made with Jev slop detector on Mike's site, which scores about 50 percent."
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
      "How Jev decisions compare with a general model on Mike's own tasks.",
      "Fixing the citation gaps the report found.",
      "Access beyond the waitlist, which Mike already had."
    ],
    "qa": [
      {
        "q": "What does Jev do?",
        "a": "It answers structured questions quickly and returns probabilities and confidence scores. It does not write text, so it sits beside a general model."
      },
      {
        "q": "Are the speed and price claims verified?",
        "a": "No. They come from the founder's post, the Jev site and its demos. Mike does not test them independently."
      },
      {
        "q": "What did the test spend show?",
        "a": "After the API key was set, Mike saw three requests and about 4,200 tokens, at a total of less than a fraction of a cent."
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
      "A working transcript step. It fails in the demo and Mike does not know why.",
      "YouTube API quota or any platform rules on automated uploads.",
      "Quality control before a video goes public, since the final step publishes automatically.",
      "Costs for the OpenAI, Gemini and Apify calls."
    ],
    "qa": [
      {
        "q": "Where do the short clips come from?",
        "a": "Mike makes them with Opus Clip, downloads them and drops them into the Google Drive folder."
      },
      {
        "q": "Why upload as unlisted first?",
        "a": "The workflow uploads unlisted, adds the metadata, and only then switches the video to public."
      },
      {
        "q": "Where can I get the n8n YouTube Shorts uploader template?",
        "a": "Mike says it is on Gumroad and in his Skool community."
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
      "Connecting WhatsApp, Telegram or other gateways, which Mike skips.",
      "Whether the suggested health watchdog cron job was created or ran.",
      "What the paid plans add beyond the free plan, or current prices, which are quoted from the video.",
      "Data handling and privacy for the memory feature."
    ],
    "qa": [
      {
        "q": "Is this the official Hermes Agent desktop app?",
        "a": "Yes. Mike contrasts it with an unofficial desktop app covered in an earlier video."
      },
      {
        "q": "Which systems does it support?",
        "a": "Linux through the curl command, plus a Windows executable and a Mac DMG, according to the video."
      },
      {
        "q": "Do I need the terminal afterwards?",
        "a": "Mostly no. Mike says provider keys, models, skills and cron jobs can all be handled inside the app."
      }
    ]
  },
  "YCjvrNI1pa4": {
    "summary": "A beginner walkthrough of Apollo for B2B lead generation: filter people by job title, location, industry, keywords and company size, save a list, and review a cold email sequence. Mike then shows an Apify actor that scrapes Apollo searches for about $1.20 per 1,000 leads and exports a CSV. Free plan limits apply, and no cold email law or terms of use are covered.",
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
        "a": "Five pages of search results, about 100 contacts, and two email sequences, Mike says."
      },
      {
        "q": "How much does the Apify Apollo scraper cost?",
        "a": "About $1.20 per 1,000 leads, according to Mike, who says the monthly free credit could cover around 3,000 leads."
      },
      {
        "q": "Can Make.com automate the scraping?",
        "a": "Automating through the API needs a paid Apify plan, Mike says."
      }
    ]
  },
  "bBGqWXXIw44": {
    "summary": "A backlink outreach pipeline built in Hermes Agent for two of Mike's sites. Cron jobs search for articles that mention competitors, use Firecrawl, Playwright and Hunter to find author contact details, write personalized pitches into a markdown file and send them through Mailgun with warm-up, follow-ups and bounce checks. Delivery rate is about 78 percent, and no replies or backlinks are shown.",
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
      "Website terms that restrict scraping, and the accuracy of found emails, which Mike says is not always right.",
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
        "a": "It looks and works like the standard n8n, Mike says, running on a local machine instead of a paid cloud plan."
      },
      {
        "q": "Do the templates work right away?",
        "a": "Not always. Some need credentials, API keys or nodes that are missing, and Mike shows several that stop for that reason."
      },
      {
        "q": "Why Linux?",
        "a": "Mike finds it faster than Windows and simpler than setting up Docker on Windows. This is a personal view."
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
      "A polished app. Mike says the styling needs work and the local analyzer cannot fetch the site yet.",
      "A fair test against OpenCode or Cursor. The comparison is Mike's impression.",
      "Paid plan details, which are mentioned only briefly."
    ],
    "qa": [
      {
        "q": "What did the Kilo Code SEO checker cost to build?",
        "a": "Roughly four cents. Mike's credit balance went from about $2.50 to $2.46 on the free auto model."
      },
      {
        "q": "Is the SEO score trustworthy?",
        "a": "The checker gave 69 percent with a breakdown, but the video does not verify its accuracy."
      },
    ]
  },
  "xB0ChiVjWu4": {
    "summary": "Deploy the Morphic AI answer engine template on Vercel from a GitHub clone, using OpenAI and Tavily keys, then look at Vercel's subscription starter and SaaS landing page templates that connect to Stripe. The deploy works and the app answers questions, but one model provider errors. The Stripe and custom domain steps are shown as demos, not completed.",
    "whatYouBuild": "A deployed Morphic app on Vercel linked to Mike's GitHub, plus cloned subscription starter and landing page templates.",
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
      "Actually adding a custom domain. Mike says he would buy one later.",
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
        "q": "How much is a morphic.dev domain through Vercel?",
        "a": "Mike says a morphic.dev domain is about $9 a year through Vercel. Check current prices."
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
      "The cause of the n8n error. Mike guesses it is the unverified number and asks viewers for help.",
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
        "a": "Mike wants to avoid burning ChatGPT or Claude credits on a high volume of messages and can pick cheaper models."
      },
      {
        "q": "How long does Meta verification take?",
        "a": "Mike expects two or three days after submitting the business information."
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
      "Subtitles, which Mike leaves off.",
      "Results across different recordings or webcam positions. The prompt tells the skill the webcam is bottom right.",
      "A fair timing comparison. The 20 seconds versus five to eight minutes for another skill is Mike's own observation."
    ],
    "qa": [
      {
        "q": "Which model did Mike use to build the skill?",
        "a": "A free Qwen 3.6 Plus model in OpenCode, so the build cost essentially nothing."
      },
      {
        "q": "Is the OpenCode Shorts layout skill available?",
        "a": "Not yet. Mike says he may put it on Gumroad."
      },
      {
        "q": "Why not use the earlier Video Use skill?",
        "a": "Mike found that skill had problems producing the Shorts layout and took much longer."
      }
    ]
  },
  "4hwdzAiaybI": {
    "summary": "Install the free Claude SEO skill in Claude Code and run a full audit on a WordPress consulting site. The report is 561 lines with an action plan, health scores and top issues such as no schema markup, missing meta descriptions on 93 pages and no llms.txt. Mike cannot apply fixes because the WordPress plan has no SSH or SFTP, and the GEO run only starts.",
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
        "a": "It is free and installs from GitHub as a Claude Code skill, Mike says."
      },
      {
        "q": "What does it check?",
        "a": "Full site audits, single pages, sitemaps and generative engine optimization, per Mike."
      },
      {
        "q": "What were the biggest issues?",
        "a": "No schema markup, missing meta descriptions on 93 pages, missing or multiple H1 tags and a nearly empty homepage, according to the report."
      }
    ]
  },
  "uTYZC3Kxwjo": {
    "summary": "A first-impression tour of MindStudio, a no-code AI agent builder, recorded by Mike, who had never used it before. He explores the free plan, templates, launch variables and the pricing page, does not get an agent running, and concludes that Make.com is easier for his needs. API access needs the business plan. The MindStudio and Make.com links are affiliate links.",
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
      "A working agent. Mike says he does not know what he is doing and stops before finishing one.",
      "What launch variables do in practice, which the documentation does not make clear to Mike.",
      "Publishing, which needs a paid plan, or any fair comparison of results with Make.com or Zapier.",
      "Whether the learning curve claim holds up. It rests on one short session."
    ],
    "qa": [
      {
        "q": "Is this a tutorial?",
        "a": "Not really. Mike says so at the end and apologizes that it is not the complete tutorial they hoped for."
      },
      {
        "q": "Can MindStudio's free plan publish an agent?",
        "a": "Mike could not publish on the free plan and was asked to upgrade."
      },
    ]
  },
  "P7lbzDAb-qk": {
    "summary": "A look at ways to try OpenAI's Sora 2 in October 2025. Mike checks the official iOS app, Higgsfield, Sora2.run, Artlist and HeyGen and finds each needs a paid plan. No finished video is shown, and the one HeyGen attempt is blocked by Sora's content policy. The HeyGen link is an affiliate link, so the title's promise of professional videos in minutes is not delivered.",
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
      "Free access. Mike does not find a free route and suggests an invite code from a friend.",
      "Current prices, which are quoted as seen in October 2025.",
      "Why the photo was blocked, and consent and likeness rules for AI video of real people."
    ],
    "qa": [
      {
        "q": "Can I use Sora 2 for free?",
        "a": "Not in this video. Every platform tried asks for a paid plan, and Mike points to an invite code on the official app as the other route."
      },
      {
        "q": "Did the HeyGen test work?",
        "a": "No. The request was blocked by Sora's content policy before a video was made."
      },
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
      "The results of the code review, which Mike requests but does not read out.",
      "Connecting the custom domain. The site runs on a Vercel domain and the DNS step is left for later.",
      "A measured comparison with the old Lovable site. The claim it would be slower is not tested.",
      "Accessibility, SEO and real visitor performance, since PageSpeed here is a single lab run."
    ],
    "qa": [
      {
        "q": "How long did the Codex rebuild of the Lovable site take?",
        "a": "About ten minutes for the first version and about thirty minutes of work in total, according to Mike."
      },
      {
        "q": "Why leave Lovable?",
        "a": "Mike found the old site clearly vibe coded and wanted a better design on his own hosting."
      },
      {
        "q": "What were the speed scores?",
        "a": "90 on mobile and 98 on desktop in one PageSpeed Insights run."
      }
    ]
  },
  "SplwScUztfM": {
    "summary": "Mike shows his own Facebook dashboard and bank payments to explain how he earns from Facebook content monetization, then gives the general steps: post original content, wait for a personal invite from Facebook, and get paid monthly. The earnings, reach and requirement figures are Mike's own statements and are not verified here. The video also promotes Mike's paid Facebook monetization guides.",
    "whatYouBuild": "Nothing is built. The video explains how Facebook's content monetization program works from one creator's account and what to do to become eligible.",
    "toolsUsed": [
      "Meta Business Suite",
      "Facebook"
    ],
    "keySteps": [
      {
        "seconds": 26,
        "step": "See Mike's claimed monthly payments of roughly $700 to $1,000 and his reach this month."
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
        "step": "Hear the requirements Mike lists, including follower and watch time thresholds that may have changed."
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
        "a": "No. Mike says you need a personal invite from Facebook, and original content that meets its standards."
      },
      {
        "q": "How much does Mike earn from Facebook monetization?",
        "a": "He shows payments of $700 to $1,000 in several months and calls himself a top earner. These are his own claims."
      },
      {
        "q": "Is the video selling something?",
        "a": "Yes. It points to Mike's Facebook monetization training, priced from $19 to $49."
      }
    ]
  },
  "GK7zjPm7G4A": {
    "summary": "A walkthrough of OpenAI's announcement of GPT-6 Sol and GPT-6 Luna on September 23, 2026. Sol is priced at $2 per million input tokens, half its predecessor, and Luna at 10 cents. Mike reads OpenAI's own benchmark charts against Opus 5 and Fable 5.1 and says Sol used 2 percent of a weekly limit. Benchmark and price figures are from the announcement and were not tested here.",
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
        "step": "Hear Mike's early use of Sol in the terminal and the lower weekly limit use."
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
      "Side-by-side coding results on Mike's own projects.",
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
        "a": "Astra still leads on computer use at 73 percent against Sol's 64 percent, Mike says, but Sol is about five times cheaper."
      }
    ]
  },
  "K2UeJZ_7mS0": {
    "summary": "Build a single-file Three.js rocket launch simulator in GPT-6 Astra on medium mode from one 10,000-character prompt taken from Bridgebench. The first build takes about 23 minutes and runs with audio and quality settings. A follow-up prompt adds mouse zoom and rotation. Mike says it looks decent but not very realistic, and wants clouds.",
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
      "The exact usage cost. Mike only guesses it is under about 5 percent of a Pro plan.",
      "A review of the generated code, which Mike says he does not need to know how to write.",
      "Realism improvements such as clouds, which are only wished for.",
      "Performance on other hardware. It ran on a laptop at 1920 by 1080 with a visible frame rate."
    ],
    "qa": [
      {
        "q": "Where is the prompt from?",
        "a": "Bridgebench, which also lists prompts for a Minecraft clone and a Mario Kart style game."
      },
      {
        "q": "How long did GPT-6 Astra take to build the rocket simulator?",
        "a": "About 23 minutes for the first scene and 5 to 10 minutes for the zoom and rotate controls."
      },
      {
        "q": "Is it realistic?",
        "a": "Impressive for the time but not very realistic, Mike says."
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
      "A large visual change. Mike says the live site does not look much different and needs more work.",
      "Why Claude Code found nothing to change after the handoff.",
      "The cost of the work. Usage limits were hit and extra usage of $5 was added, with Haiku used for the retry.",
      "Dashboard pages in production, which are private and not shown."
    ],
    "qa": [
      {
        "q": "How does the design get from Claude Design into code?",
        "a": "A command fetches the design file into Claude Code. Claude Design also offers a zip download and a web handoff that would create a new app."
      },
      {
        "q": "Did Claude Code implement it?",
        "a": "Not visibly. It reported the design was already implemented, so Mike used Codex to apply the changes."
      },
      {
        "q": "What is a design.md?",
        "a": "A file made in Claude Code with the fonts, color palette, layout, radius, animations and navigation styles, used to seed the design system."
      }
    ]
  },
  "CD2mLFgjiT8": {
    "summary": "Build a Facebook page chatbot in SendPulse that replies to comments, sends a direct message with a YouTube link, tags and logs interested people, and hands later replies to an AI agent. Mike says it saves time on his page with about 180,000 followers. The AI agent step needs a paid plan, and the link is an affiliate link.",
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
      "The claim that the page has never been restricted, which is Mike's own experience."
    ],
    "qa": [
      {
        "q": "Is SendPulse free?",
        "a": "There is a free start. Mike quotes paid plans from about $8 a month for 500 subscribers and about $10 a month for the AI agent feature."
      },
      {
        "q": "Why randomize the public replies?",
        "a": "Mike uses several variations to avoid looking repetitive to Facebook."
      },
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
      "A real comparison with competitors. Mike only says Relay has fewer apps than Make.com.",
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
        "a": "Relay has quite a few apps but not nearly as many as Make.com, Mike says."
      },
      {
        "q": "What did the custom workflow do?",
        "a": "On a new Cal.com booking it sent a thank you email and created the contact in HubSpot."
      }
    ]
  },
  "kxp_dF6NEbg": {
    "summary": "A tour of ten third-party skills Mike installs with npx skills add from the skills.sh registry and runs in Codex, OpenCode and VS Code: front-end design, Vercel React and Next.js best practices, web design guidelines, SEO audit, AI SEO, page speed and Lighthouse, and GEO content tools. The front-end design skill fixes a light theme on Mike's landing page. Install counts, citation numbers and traffic figures are Mike's own and are not verified.",
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
        "a": "Mike installs them into Codex, Gemini, OpenCode and Antigravity, and says Claude Code and OpenClaw are supported too."
      },
      {
        "q": "What did the front-end design skill change?",
        "a": "It rewrote the CSS so the landing page's light theme has dark text and a visible dashboard sample, though Mike says it still needs work."
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
      "A working Make.com image automation. Mike skips setting up Google Cloud billing.",
      "Generating video, which Mike says he has not figured out.",
      "Current Gemini plan prices, quoted as about $10 for two months then $20.",
      "Free tier limits and rate limits over time."
    ],
    "qa": [
      {
        "q": "Is Nano Banana free?",
        "a": "Mike uses it free in AI Studio and the Gemini app. API use from Make.com hit a quota limit and needs billing."
      },
      {
        "q": "Why did Make.com fail?",
        "a": "It returned a quota exceeded error. Mike says billing through Google Cloud would be needed."
      },
      {
        "q": "Which gives better images, AI Studio or Gemini?",
        "a": "Mike liked the Gemini app output more and noted a larger file, but this is a quick impression."
      }
    ]
  },
  "p_qQNolHR-c": {
    "summary": "A comparison of free ways to try Nano Banana, Google's Gemini 2.5 Flash Image model, three days after its launch. Mike tries several third-party sites, finds LMArena direct chat the fastest with no account, and edits a photo by replacing the background and a statue with other subjects. One site fails, and an OpenRouter test errors. The incognito tip for getting past free credit limits is Mike's, not an official method.",
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
      "The Make.com automation Mike promises for a later video.",
      "A reliable swap of Mike into the photo. The robot was added beside him instead."
    ],
    "qa": [
      {
        "q": "Which tool was best?",
        "a": "LMArena in direct chat mode, according to Mike. It was quick, needed no account and produced larger files."
      },
      {
        "q": "Is nanobanana.ai free?",
        "a": "No. Mike says downloading needs a subscription of about $8 to $10 a month for 100 credits."
      },
      {
        "q": "Why did OpenRouter fail?",
        "a": "It returned a user not found error twice, and Mike did not resolve it."
      }
    ]
  },
  "tzUhKKzwgyE": {
    "summary": "Try Base44 by building a ChatGPT-style web app from a prompt written in ChatGPT. The app is generated in about ten minutes and previews well, but adding an OpenAI API connection runs into the free plan's daily credit limit, so the build stops. Mike then names Lovable, Replit, Bolt and Emergent as better options. Despite the title, no Lovable build is shown side by side.",
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
        "q": "What does the Base44 free plan include?",
        "a": "Mike says 25 message credits a month with a daily allowance of five, and 100 integration credits."
      },
      {
        "q": "Why did Mike move on from Base44?",
        "a": "He ran out of daily credits right when he asked for the API connection, and prefers Lovable or Replit for building."
      },
      {
        "q": "How long did Base44 take to generate the app?",
        "a": "About ten minutes to generate."
      }
    ]
  },
  "bt-zM7QuKkU": {
    "summary": "A short demonstration of repurposing a YouTube video into an infographic and a LinkedIn post. Gemini 3 summarizes the transcript, Nano Banana Pro in Google AI Studio draws an infographic with correct text, and Gemini 3 Pro writes the post, which Mike pastes into LinkedIn by hand. An n8n version works for the summary but not the image, because n8n lacks Nano Banana Pro.",
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
        "q": "Do Gemini 3 and Nano Banana Pro need a paid plan?",
        "a": "Mike recommends the paid plan to get Gemini 3 and Nano Banana Pro."
      },
      {
        "q": "What is still manual?",
        "a": "Saving the infographic and creating the LinkedIn newsletter edition with the pasted text."
      }
    ]
  },
  "jB9hYQJGAuM": {
    "summary": "Install RTK, a free open-source tool that compresses command output before it reaches a coding agent's context, and connect it to Claude Code, Codex and OpenCode. Mike's own readings show about 57 to 65 percent token savings, with 120,000 tokens saved in one session and 169,000 in OpenCode. The 60 to 95 percent in the intro is RTK's claim. Headroom, a proxy dashboard, was removed after connection problems.",
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
        "step": "Compare RTK with Headroom, a proxy on port 8787 with a dashboard that Mike dropped."
      },
      {
        "seconds": 232,
        "step": "Run rtk init to connect the hook and restart Claude Code."
      },
      {
        "seconds": 262,
        "step": "Compare RTK with the Caveman skill, which Mike has used less."
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
      "Independent measurement. The figures come from RTK's own report on Mike's machine.",
      "Windows setup in detail, which is mentioned only in passing.",
      "How much of the saving is usage credit and how much is context length."
    ],
    "qa": [
      {
        "q": "How much does RTK save?",
        "a": "The tool claims 60 to 95 percent. Mike's own readings in the video are around 57 to 65 percent."
      },
      {
        "q": "Do I need Headroom too?",
        "a": "No. Mike removed it because Claude Code had trouble connecting and calls RTK alone enough."
      },
      {
        "q": "How do I check it is working?",
        "a": "Run rtk gain for the efficiency number, and rtk init to make sure the hook is present in your agent's config."
      }
    ]
  },
  "pRnJdlMSSqM": {
    "summary": "An overview of Z.AI's GLM 5.2 model and where to use it, mostly through OpenCode Go. Mike reads benchmark pages and side-by-side demos made by another creator against Opus 4.8, and notes lower costs. Mike had hit the OpenCode Go usage limit and does not run GLM 5.2 live, so the comparison rests on other people's results.",
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
      "A live run of GLM 5.2 by Mike, who has hit the Go credit limit.",
      "Independent verification of the benchmark rankings and demo costs.",
      "Which design wins overall. Mike prefers Opus 4.8 in some demos and GLM 5.2 in others.",
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
        "a": "$5 for the first month, then $10 a month, Mike says."
      }
    ]
  },
  "jhmTXc5ZyJk": {
    "summary": "A beginner attempt at running local models with Ollama on Debian Linux. The 20B GPT model downloads but cannot run on 13 GB of memory, Open WebUI will not install because Docker and pip fail, and AnythingLLM is used instead. A DeepSeek R1 8B model finally runs on the laptop, slowly. Mike ends by recommending cloud models for most people.",
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
      "GPU use, which Mike says helps but does not test.",
      "Measured speed or quality, beyond the remark that local replies are slow.",
      "A check of the privacy claim in the title, since the video does not audit what leaves the machine."
    ],
    "qa": [
      {
        "q": "How big are the GPT models?",
        "a": "Mike shows about 14 GB for the 20B model and 65 GB for the 120B model."
      },
      {
        "q": "What hardware is needed?",
        "a": "More memory than the 13 GB laptop had for the 20B model. Mike suggests 32 GB or more and says a good graphics card helps."
      },
      {
        "q": "Does Mike recommend running models locally with Ollama?",
        "a": "Not for most people. He recommends using cloud models in the browser unless you have the hardware."
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
        "a": "No. The desktop app can create, pause and trigger jobs, although Mike also shows the CLI."
      }
    ]
  },
  "wL6bjqaUcd8": {
    "summary": "Add Supermemory, a hosted long-term memory service, to Hermes Agent and OpenCode, with notes on its Codex plugin. The setup uses an API key, the hermes memory setup command and an npm package. The dashboard shows a memory graph and app connections. Mike does not test recall, and the Codex login is left unfinished because credits ran out.",
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
      "Finishing the Codex plugin login, which Mike expects to fail without credits.",
      "Independent checks of the quoted 40 percent figure. Paid plans are quoted from $19 a month."
    ],
    "qa": [
      {
        "q": "What does Supermemory replace?",
        "a": "In Hermes it replaces the built-in memory markdown file as the memory provider."
      },
      {
        "q": "Which tools does it connect to?",
        "a": "Hermes, OpenCode and Codex are shown, and Claude Code, Cursor, Notion, GitHub and Slack are mentioned."
      },
      {
        "q": "Is Supermemory free?",
        "a": "There is a free start. Mike quotes paid plans from $19 a month."
      }
    ]
  },
  "c3AtpUbpXNA": {
    "summary": "A first test of ChatGPT Images 2.5, announced September 8, 2026, which OpenAI says is up to 50 percent faster than Images 2.0 and adds a Sketch feature. Mike turns a rough drawing into a scene in about 25 seconds, makes an 80s photo, a caricature and a 3D toy avatar from a personal photo, and iterates on a YouTube thumbnail. Fetching a thumbnail by URL fails, and the final image is a little blurry.",
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
      "Reproducing another creator's thumbnail. Mike says he would not copy it and makes his own.",
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
        "a": "Mike liked the final before and after version but noted it was a little blurry when zoomed in."
      }
    ]
  },
  "p7kV1iHSP54": {
    "summary": "A walkthrough of xAI's Grok 4.7 launch on September 22, 2026: benchmarks and prices from the announcement, demos by other users, and Mike's attempt to use it through OpenRouter in Hermes Agent. The announced price is $2 per million input tokens and $6 for output. Mike cannot see 4.7 in the Grok command line tool, only 4.6, and does not test coding quality.",
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
      "Mike's own coding tests of Grok 4.7.",
      "Independent verification of the benchmark scores and per-task costs quoted from the announcement.",
      "The Grok CLI running 4.7. Mike only sees 4.6 there.",
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
        "q": "Did Mike run Grok 4.7 on a real task?",
        "a": "Only a short fix of the Grok CLI configuration in Hermes, costing a few cents in tokens."
      }
    ]
  },
  "ghjmULTSj2Q": {
    "summary": "A look at Moonshot AI's Kimi K3 on release, mostly through benchmark pages and OpenCode Go. Mike notes it is cheaper per token than Fable 5 but, in another creator's test, used about 21 million tokens against 3.5 million and ran three to four times longer. A site audit hits a priority queue limit, and signing in to the Kimi Code CLI fails.",
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
      "A finished audit or any comparison run by Mike. The Chase AI test is another creator's.",
      "Independent verification of the benchmark rankings and the token counts quoted.",
      "Getting the Kimi Code CLI working.",
      "Whether the Moonshot subscription limits have eased."
    ],
    "qa": [
      {
        "q": "Is Kimi K3 cheaper than Fable 5?",
        "a": "Per token, yes. In the test Mike cites, it used far more tokens and time, so the savings were small."
      },
      {
        "q": "Where is the easiest place to try it?",
        "a": "OpenCode Go at $10 a month, according to Mike, because it is built in and avoids a Moonshot subscription."
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
      "KiloClaw, which Mike skips because of the price.",
      "A fair comparison with OpenCode. Both are open-source agents with many models."
    ],
    "qa": [
      {
        "q": "What does Kilo Code cost?",
        "a": "Kilo Code is free and open source. The video quotes a Kilo Pass from $19 a month and KiloClaw hosting at $55 a month."
      },
      {
        "q": "Can I use Kilo Code with Hermes Agent?",
        "a": "Yes. Mike adds the Kilo gateway in Hermes setup with an API key and a base URL, and a test message returns."
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
      "A working Perplexity step. The credentials fail and Mike asks viewers for help.",
      "Posting to any platform, since none of the accounts are authenticated.",
      "Automated posting on LinkedIn, which Mike avoids after a past account suspension.",
      "Costs of SerpApi, Perplexity and OpenAI calls for a daily run."
    ],
    "qa": [
      {
        "q": "Does the workflow run?",
        "a": "No. Mike says it has issues that must be fixed first and calls it a proof of concept."
      },
      {
        "q": "Where do the templates come from?",
        "a": "The n8n templates site, which Mike says has about 5,900 free workflows, plus a local folder of roughly 2,000 workflows from GitHub."
      },
      {
        "q": "Why skip LinkedIn?",
        "a": "Mike's earlier account was suspended and he does not want to use automation tools there again."
      }
    ]
  },
  "M_4KgrWyycI": {
    "summary": "An n8n workflow that turns a YouTube video into an infographic, a LinkedIn post and a newsletter. It pulls the transcript with Apify, summarizes it with Gemini, makes a 4K infographic with Nano Banana Pro through KIE, writes the post with Gemini Flash from the infographic and a newsletter with Claude, and saves them to Google Drive and Docs. Mike posts to LinkedIn by hand, and the results quoted are his own.",
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
      "Independent checks of Mike's quoted 19 percent open rate and 47,000 weekly impressions."
    ],
    "qa": [
      {
        "q": "Where can I get the n8n LinkedIn infographic workflow template?",
        "a": "On Mike's Gumroad page as pay what you want, and in the paid plans of his Skool community, according to Mike."
      },
      {
        "q": "Why use KIE for the image?",
        "a": "It gives API access to Nano Banana Pro, which n8n does not offer directly."
      },
      {
        "q": "Does it run automatically?",
        "a": "Not yet. It starts with a manual trigger, and Mike plans an RSS trigger for new uploads."
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
        "a": "Not yet by its own notice. It is a developer preview and Mike's first test produced buggy output."
      },
      {
        "q": "How much did the DeepSeek harness test run cost?",
        "a": "Mike's run used about 196,000 tokens and roughly 18 cents on DeepSeek V4 Pro through OpenRouter."
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
      "Quality. Mike says the first chapter is long, headings repeat and formatting needs editing.",
      "The total API cost for a full book.",
      "Rights and quality issues in selling an AI-written ebook, which Mike plans to list in a shop."
    ],
    "qa": [
      {
        "q": "Why did the Claude step keep failing?",
        "a": "It reported a credit balance too low even after adding funds. Creating a new API key fixed it."
      },
      {
        "q": "Is the Make.com ebook template available?",
        "a": "Yes, on Mike's Gumroad page as pay what you want."
      },
      {
        "q": "How long does the Make.com ebook automation take?",
        "a": "Mike claims 15 to 30 minutes for a full ebook, but the video does not run it to the end."
      }
    ]
  },
  "cfYpzY-o3fQ": {
    "summary": "Set up OpenCode, the open-source coding agent, on Linux, start with its three free models, then upgrade to the OpenCode Go plan at $5 for the first month and $10 after. Mike runs several terminals on MiniMax 2.7, Kimi 2.6 and Qwen 3.5 Plus, fixes an animation bug, and runs a PageSpeed skill from skills.sh that lists performance issues. The sign-up link is an affiliate link.",
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
        "step": "Subscribe to OpenCode Go, which Mike prefers to topping up Zen credits."
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
        "q": "Why use OpenCode alongside Codex?",
        "a": "Mike says he runs out of Codex credits often and switches to OpenCode to keep working."
      }
    ]
  },
  "avgG3VtN2C4": {
    "summary": "A hands-on session with Claude Fable 5 after its return, used in Claude Code at high effort for a security review and for a trial conversion and checkout review of Mike's own web app. Sonnet writes the prompts, Fable 5 reports no critical, high or medium security findings in pending changes, then plans fixes for payment bugs. Fable 5 uses credits very quickly, reaching 95 to 98 percent of a session limit.",
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
      "A comparison with other models on the same audit. Mike has already used Codex and OpenCode on this site.",
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
        "a": "On the Pro plan it used credits faster than any other model Mike has tried, he says."
      }
    ]
  },
  "yHaBYtUnzBg": {
    "summary": "A first test of Claude Design, an Anthropic Labs product launched on April 17, 2026 in research preview for paid Claude plans. Mike uploads one screenshot of his app and gets a ten-slide investor pitch deck from a few qualifying questions. The deck needs work and one slide overflows before it is fixed. Mike does not yet see it as a Canva competitor.",
    "whatYouBuild": "A ten-slide investor pitch deck in Claude Design, built from an app screenshot and short answers on round size, audience, tone and competitors, then exported or presented full screen.",
    "toolsUsed": [
      "Claude Design",
      "Claude Opus 4.7",
      "Canva"
    ],
    "keySteps": [
      {
        "seconds": 93,
        "step": "Upload a screenshot and ask for an investor pitch deck."
      },
      {
        "seconds": 132,
        "step": "Answer questions about the round, audience, slide count, tone and competitors."
      },
      {
        "seconds": 184,
        "step": "Watch it write a JavaScript and HTML deck with speaker notes and fix an overflowing slide."
      },
      {
        "seconds": 308,
        "step": "Look at export options: PowerPoint, PDF, HTML and a send-to-Canva option."
      },
      {
        "seconds": 341,
        "step": "Switch from Opus 4.7 to Sonnet 4.6 to save credits."
      },
      {
        "seconds": 365,
        "step": "Present the deck in full screen."
      },
      {
        "seconds": 441,
        "step": "Give the verdict on whether it competes with Canva."
      }
    ],
    "notCovered": [
      "A finished deck. Mike gave a minimal prompt and says it needs a lot of work.",
      "Accuracy of the competitor comparisons shown in the slides.",
      "Credit use over a full project, since Mike was already out of Claude Pro credits.",
      "The Figma stock reaction mentioned at the start, which comes from a news article."
    ],
    "qa": [
      {
        "q": "Who can use Claude Design?",
        "a": "Claude Pro, Max, Team and Enterprise subscribers in research preview, according to the announcement shown."
      },
      {
        "q": "What can it export?",
        "a": "PowerPoint, PDF, HTML and sending the design to Canva are all shown."
      },
      {
        "q": "Does it replace Canva?",
        "a": "Not yet in Mike's view, though he thinks it could become a serious competitor."
      }
    ]
  },
  "rMRsVyIsZCU": {
    "summary": "Build Open Design, a free open-source alternative to Claude Design, from source on Linux and use it with DeepSeek V4 Flash. A 20-second paper cutout motion video takes about a minute for roughly a cent, and a slide deck built from a YouTube transcript takes three to four minutes for about 16 cents and exports to HTML. Mac and Windows have downloads, while Linux needs a source build with Node and corepack fixes.",
    "whatYouBuild": "A local Open Design workspace connected to model credits, used to make a motion design sample and an HTML slide deck from a YouTube video.",
    "toolsUsed": [
      "Open Design",
      "DeepSeek V4 Flash",
      "Herdr"
    ],
    "keySteps": [
      {
        "seconds": 37,
        "step": "Pull the Open Design source from GitHub since Linux has no download."
      },
      {
        "seconds": 84,
        "step": "Fix a missing node_modules folder and install corepack with brew."
      },
      {
        "seconds": 138,
        "step": "Sign in and open the workspace with its sample prompts."
      },
      {
        "seconds": 172,
        "step": "Pick a model such as DeepSeek V4 Flash or add an API key."
      },
      {
        "seconds": 204,
        "step": "Generate a 20-second paper cutout motion design video."
      },
      {
        "seconds": 281,
        "step": "Create a slide deck from a YouTube URL as a reference."
      },
      {
        "seconds": 330,
        "step": "Preview and export the deck as a standalone HTML file."
      }
    ],
    "notCovered": [
      "Pricing in detail. Mike says free plans go up to about $8 a month, which is not checked here.",
      "Design systems, which are shown only as a menu option.",
      "Accuracy of the slide content drawn from the video transcript.",
      "Independent checks of the 100,000 GitHub stars quoted."
    ],
    "qa": [
      {
        "q": "Does it run on Linux?",
        "a": "Not as a download. Mike builds it from source after installing the missing Node dependencies and corepack."
      },
      {
        "q": "What did the tests cost?",
        "a": "About 1 cent for the motion video and about 16 cents for the slide deck, from a starting balance near 50 cents."
      },
      {
        "q": "Which models can it use?",
        "a": "Mike lists Claude, DeepSeek, GPT and Gemini options, some of which need your own API key."
      }
    ]
  },
  "UoMuiKjDu4A": {
    "summary": "A walkthrough of OpenAI's GPT-6 Astra launch, using the announcement page, OpenAI's demos and third-party benchmark charts. Mike has not used the model yet because it has not rolled out to Codex or ChatGPT. Claims such as 99.9 percent on ARC-AGI-3 and the intelligence and cost rankings come from OpenAI and the charts shown.",
    "whatYouBuild": "Nothing is built. The video reviews launch claims, demos, availability and benchmark comparisons for GPT-6 Astra.",
    "toolsUsed": [
      "GPT-6 Astra",
      "Codex",
      "Unreal Engine",
      "KiCad"
    ],
    "keySteps": [
      {
        "seconds": 54,
        "step": "See a villa tour demo compared with Fable 5.1."
      },
      {
        "seconds": 93,
        "step": "Read the rollout plan for Plus, Pro, Business and Enterprise and the banked usage resets while waiting."
      },
      {
        "seconds": 144,
        "step": "Watch OpenAI's PCB layout demo in KiCad."
      },
      {
        "seconds": 184,
        "step": "See a Unity city scene built from existing assets."
      },
      {
        "seconds": 231,
        "step": "See front-end QA and a Blender to Unreal Engine 5 house walkthrough."
      },
      {
        "seconds": 343,
        "step": "See computer use demos such as apartment hunting in a browser."
      },
      {
        "seconds": 383,
        "step": "Compare benchmark, speed and cost charts with Fable 5.1 and Opus 5."
      }
    ],
    "notCovered": [
      "Mike's own tests of the model.",
      "Independent verification of the benchmark claims. One chart in the video puts Astra at 61 against 66 for Fable 5.1 on an intelligence index.",
      "How soon each plan actually gets access.",
      "Mike's remark that this is near AGI, which is an opinion."
    ],
    "qa": [
      {
        "q": "Is GPT-6 Astra available to everyone?",
        "a": "It is described as launching to paid ChatGPT plans over a few days, and not yet in Codex or ChatGPT when the video was recorded."
      },
      {
        "q": "Does it beat Fable 5.1?",
        "a": "On the charts shown it leads on speed and often on cost, while one intelligence index has Fable 5.1 ahead."
      },
      {
        "q": "Do I need API credits?",
        "a": "Mike says it is included in subscription plans, unlike Fable 5.1, which he says needs usage credits."
      }
    ]
  },
  "GhHYtL5pQXU": {
    "summary": "An n8n workflow that watches a YouTube channel's RSS feed, pulls the new video's transcript with Apify, and has Claude write a 400-word LinkedIn newsletter that is saved to Google Docs. The run works in the demo. Posting to LinkedIn stays manual because Mike cannot verify his account and prefers not to automate LinkedIn.",
    "whatYouBuild": "An n8n workflow with an RSS trigger every 10 minutes, an Apify transcript actor, split and aggregate steps, a Claude newsletter prompt, and Google Docs create and update nodes.",
    "toolsUsed": [
      "n8n",
      "Apify",
      "Claude",
      "Google Docs",
      "Google Drive"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Add an RSS feed trigger with the channel's YouTube feed URL."
      },
      {
        "seconds": 94,
        "step": "Run the Apify YouTube transcript actor with the video URL and fetch its dataset items."
      },
      {
        "seconds": 152,
        "step": "Split out the dataset items to remove timestamps."
      },
      {
        "seconds": 205,
        "step": "Aggregate the text into one transcript."
      },
      {
        "seconds": 260,
        "step": "Write a prompt for a 400-word newsletter at about a sixth grade reading level and add the transcript."
      },
      {
        "seconds": 318,
        "step": "Enable the Google Docs and Drive APIs in Google Cloud Console and add OAuth credentials."
      },
      {
        "seconds": 385,
        "step": "Create a document, then update it with Claude's text."
      },
      {
        "seconds": 450,
        "step": "Copy the text into a LinkedIn newsletter by hand and add the video link."
      }
    ],
    "notCovered": [
      "Posting to LinkedIn automatically, which fails because the account is not verified.",
      "Checking the newsletter against the video for accuracy.",
      "Costs of Apify and Claude per run.",
      "Whether a 10-minute poll is the right interval, which Mike suggests could be 30 or 60 minutes."
    ],
    "qa": [
      {
        "q": "Why not post to LinkedIn automatically?",
        "a": "Mike cannot get the credentials verified and also worries that LinkedIn may detect automation."
      },
      {
        "q": "Why remove the timestamps?",
        "a": "The transcript actor returns lines with timestamps, so the workflow splits and aggregates them into plain text for the prompt."
      },
      {
        "q": "What does the n8n LinkedIn newsletter workflow need?",
        "a": "An Apify account and actor, an Anthropic API key, and Google Cloud OAuth credentials for Docs and Drive."
      }
    ]
  },
  "lumzbY6QV4Y": {
    "summary": "A first look at OpenAI's Agent Builder one day after its announcement. Mike creates a customer service workflow, picks GPT-5, adds tool options and reviews two templates, but cannot run any of it. Preview is blocked for unverified organizations, and verification with a passport had not cleared by the end. The title promises a test, which does not happen.",
    "whatYouBuild": "Nothing runs. The video builds a workflow with an agent node, a vector store file search and guardrails, and walks through the customer service and data enrichment templates.",
    "toolsUsed": [
      "OpenAI Agent Builder",
      "GPT-5",
      "n8n"
    ],
    "keySteps": [
      {
        "seconds": 30,
        "step": "Create a customer service agent workflow and publish it."
      },
      {
        "seconds": 70,
        "step": "Set the instructions, the GPT-5 model and the reasoning effort."
      },
      {
        "seconds": 110,
        "step": "Look at tool options such as MCP servers, Gmail, Google Calendar and Stripe."
      },
      {
        "seconds": 150,
        "step": "Hit the message that preview is unavailable for non-verified organizations and start identity verification."
      },
      {
        "seconds": 190,
        "step": "Add a file search node pointing at a vector store."
      },
      {
        "seconds": 230,
        "step": "Read the customer service template: a jailbreak guardrail, an intent classifier, branches for returns, subscription cancellation and questions, and an approval step."
      },
      {
        "seconds": 270,
        "step": "Read the data enrichment template that uses web search."
      },
      {
        "seconds": 310,
        "step": "Look at the guardrails for personal information and errors."
      }
    ],
    "notCovered": [
      "Running or deploying any agent, because preview stays unavailable.",
      "Costs, limits and the SDK, which are mentioned only as options.",
      "A comparison with n8n or Make.com beyond the opinion that the builder is less advanced.",
      "Whether organization verification later cleared."
    ],
    "qa": [
      {
        "q": "Why couldn't Mike run the agent?",
        "a": "The preview needs a verified organization. Mike submitted a passport and selfies, but the page still showed it as unverified."
      },
      {
        "q": "What does the customer service template do?",
        "a": "It checks input with a guardrail, classifies the request as a return, a cancellation or a question, then sends it down the matching branch."
      },
      {
        "q": "Does Mike recommend OpenAI Agent Builder?",
        "a": "For something simple, yes, but for most automations he recommends n8n."
      }
    ]
  },
  "dIZ7xNyWu3M": {
    "summary": "A Make.com scenario that reads YouTube links from Google Sheets, extracts transcripts with Dumpling AI, saves them to Google Drive and uploads them to an OpenAI vector store as a knowledge base. The goal is an ElevenLabs voice clone that answers WhatsApp messages, but the voice clone and WhatsApp parts are not built in this video. Mike offers the template in his free community.",
    "whatYouBuild": "A Make.com loop that fetches transcripts without timestamps, writes each to a Drive file, downloads it and adds it to an OpenAI assistant's vector store.",
    "toolsUsed": [
      "Make.com",
      "Dumpling AI",
      "Google Drive",
      "OpenAI",
      "ElevenLabs"
    ],
    "keySteps": [
      {
        "seconds": 25,
        "step": "Search a Google Sheet of YouTube video links and titles."
      },
      {
        "seconds": 87,
        "step": "Extract each transcript with a Dumpling AI module with timestamps turned off."
      },
      {
        "seconds": 116,
        "step": "Create a Google Drive file per video, then download it."
      },
      {
        "seconds": 140,
        "step": "Upload the files to an OpenAI vector store attached to a custom assistant."
      },
      {
        "seconds": 228,
        "step": "See where the ElevenLabs voice clone would be built, which needs a paid plan and about 30 minutes of audio."
      }
    ],
    "notCovered": [
      "The voice clone, which is not built here.",
      "The WhatsApp auto-reply, which is described as the eventual goal.",
      "Checking the assistant's answers against the videos.",
      "Consent, disclosure and impersonation concerns when replying to messages in a cloned voice."
    ],
    "qa": [
      {
        "q": "What is the knowledge base for?",
        "a": "It trains a custom assistant on Mike's own videos so a later voice clone can answer messages."
      },
      {
        "q": "Does the scenario run?",
        "a": "It runs once in the demo: it gets a transcript, saves it to Drive, downloads it and uploads it to the vector store, then moves to the next link."
      },
      {
        "q": "Where can I get the YouTube transcript Make.com template?",
        "a": "In Mike's free Skool community, according to the video."
      }
    ]
  },
  "uTcTJd5JaZU": {
    "summary": "A recap of OpenAI's September 29, 2026 dev day announcements and a first try of Dots, an always-on agent inside ChatGPT with its own cloud computer. Mike customizes a dot, gets task suggestions drawn from past chats and email, and prepares a podcast application, though a site is blocked in the cloud browser. Prices, benchmarks and model claims are from OpenAI's recap. Mike plans more videos before judging it.",
    "whatYouBuild": "A Dots agent named by Mike, connected to ChatGPT history and plugins, used to prepare a podcast guest application and explore the cloud computer's terminal and file explorer.",
    "toolsUsed": [
      "OpenAI Dots",
      "GPT-6 Astra",
      "Codex",
      "GrokBot"
    ],
    "keySteps": [
      {
        "step": "Read OpenAI's recap: Dots, GPT-6.1 Sol, an Ultra fast mode and Codex in the cloud."
      },
      {
        "step": "Set up a dot from ChatGPT, name it and choose an avatar."
      },
      {
        "step": "Accept a suggested task to prepare a podcast guest application with bio, pitch and talking points."
      },
      {
        "step": "Open the cloud computer to use the terminal, file explorer and browser, where the application site is blocked."
      },
      {
        "step": "Ask the dot to gather knowledge from past ChatGPT projects."
      }
    ],
    "notCovered": [
      "Dots' permissions and safety controls, which the video does not detail.",
      "Connecting a large number of apps, or a full automation run.",
      "Independent checks of the cost and benchmark claims in OpenAI's recap.",
      "Whether the dot handles private email and chat history safely, which matters before connecting it."
    ],
    "qa": [
      {
        "q": "What are Dots?",
        "a": "An always-on AI agent in ChatGPT that can run on a local or cloud computer, take tasks and send updates, per the announcement."
      },
      {
        "q": "What does Ultra fast mode cost?",
        "a": "A new $500 a month plan, Mike says, and a $200 plan returned with about half the usage. These are quoted from the recap."
      },
      {
        "q": "Did the podcast application get submitted?",
        "a": "No. It was prepared for review, and the form site did not load fully in the cloud browser."
      }
    ]
  },
  "oQot9GoNZDA": {
    "summary": "A news summary of Anthropic's announcement that Claude Fable 5 would return globally on the next day, read from the company's post and press coverage. It says Fable 5 comes back with new classifiers, some routine coding tasks fall back to Opus 4.8, and Pro, Max, Team and some Enterprise plans include it for up to 50 percent of weekly limits through July 7. The model had not returned when this was recorded.",
    "whatYouBuild": "Nothing is built. The video summarizes the redeployment details and compares Fable 5's price with GLM 5.2.",
    "toolsUsed": [
      "Claude Fable 5",
      "Claude Code",
      "OpenCode"
    ],
    "keySteps": [
      {
        "seconds": 72,
        "step": "Hear why Fable 5 was paused on June 9, which the video links to US export controls."
      },
      {
        "seconds": 118,
        "step": "Hear that the controls were lifted on June 30 and that redeployment was announced."
      },
      {
        "seconds": 194,
        "step": "See where it returns: the Claude platform, Claude.ai and Claude Code, with cloud providers to follow."
      },
      {
        "seconds": 235,
        "step": "Read the new safeguards: classifiers that drop some requests back to Opus 4.8."
      },
      {
        "seconds": 322,
        "step": "Compare its $10 and $50 per million token prices with GLM 5.2."
      }
    ],
    "notCovered": [
      "Fable 5 actually back online. Mike is still waiting for it.",
      "Independent confirmation of the export control details, which come from the announcement and press coverage.",
      "How often the classifiers fall back to Opus 4.8 in real coding work.",
      "A quality comparison with GLM 5.2. Mike only compares prices and recommends cheaper models."
    ],
    "qa": [
      {
        "q": "Which plans get Fable 5?",
        "a": "Pro, Max, Team and select Enterprise plans, for up to 50 percent of weekly usage limits through July 7, and then through usage credits."
      },
      {
        "q": "Why was Claude Fable 5 paused?",
        "a": "US export controls triggered a suspension days after its June 9 release, Mike explains."
      },
      {
        "q": "What does Claude Fable 5 cost?",
        "a": "$10 per million input tokens and $50 per million output tokens, according to the video."
      }
    ]
  },
  "i2na8YZI7KM": {
    "summary": "Use Claude Code in the terminal to write SEO blog articles for Mike's own site, first with a general skill and then with a custom project-local skill file. An article takes about 10 to 15 minutes and includes a slug, excerpt, internal links and an FAQ. The video also covers llms.txt and ai.txt files. No ranking results are shown, so the title's claim that the articles rank is not demonstrated.",
    "whatYouBuild": "A Claude Code SKILL.md for writing blog articles with format, SEO link target, E-E-A-T and citation rules, plus llms.txt, ai.txt and llms-full.txt files for AI crawlers.",
    "toolsUsed": [
      "Claude Code",
      "Ubersuggest",
      "Claude skills"
    ],
    "keySteps": [
      {
        "seconds": 33,
        "step": "Review an article Claude Code wrote with a slug, excerpt, category, internal links and FAQ."
      },
      {
        "seconds": 91,
        "step": "Pick another topic from keyword research in Ubersuggest and run the same prompt."
      },
      {
        "seconds": 154,
        "step": "Create a custom skill so the prompt does not need repeating."
      },
      {
        "seconds": 199,
        "step": "Look at the llms.txt file that lists the site's pages for AI search."
      },
      {
        "seconds": 232,
        "step": "Look at an ai.txt that lists which AI crawlers may access the site."
      },
      {
        "seconds": 287,
        "step": "Read the skill file's rendering constraints, blog format, link targets and E-E-A-T rules."
      },
      {
        "seconds": 344,
        "step": "Run the skill, which Claude reads directly because it is project-local."
      }
    ],
    "notCovered": [
      "Rankings. No search or AI citation results are shown.",
      "Fact-checking the generated articles or search engine guidance on AI-written content.",
      "Whether llms.txt or ai.txt files change AI recommendations, which the video asserts without evidence.",
      "Costs of running article generation at scale."
    ],
    "qa": [
      {
        "q": "How long does an article take?",
        "a": "About 10 to 15 minutes, according to Mike."
      },
      {
        "q": "What is in the skill file?",
        "a": "Rendering constraints, a blog post format, SEO link targets, E-E-A-T requirements and citation and data point rules."
      },
      {
        "q": "Do these articles rank?",
        "a": "Rankings are not shown. Mike only says the aim is to help them rank in search and AI answers."
      }
    ]
  },
  "vvDdXF2Yuz8": {
    "summary": "Build a script with OpenCode and DeepSeek V4 Flash that turns a video, from YouTube or a local file, into five LinkedIn post variants. OpenCode trims videos to two minutes with FFmpeg, then writes a Node.js script that gets a transcript with yt-dlp captions or Whisper and asks ChatGPT 5.4 for thought leadership, storytelling, listicle, hot take and question posts. Posting stays manual. The sign-up link is an affiliate link.",
    "whatYouBuild": "A Node.js script that extracts a transcript, writes five LinkedIn post variants into one file and applies LinkedIn formatting rules such as a hook, short lines and tighter hashtags.",
    "toolsUsed": [
      "OpenCode",
      "OpenCode Go",
      "DeepSeek V4 Flash",
      "FFmpeg",
      "OpenAI API",
      "Whisper"
    ],
    "keySteps": [
      {
        "seconds": 62,
        "step": "Trim videos to two minutes for LinkedIn by telling OpenCode to run FFmpeg."
      },
      {
        "seconds": 98,
        "step": "Ask for a script that gets transcripts from YouTube or local videos and writes posts, and answer its clarifying questions."
      },
      {
        "seconds": 128,
        "step": "Create an OpenAI API key and keep it in the environment file."
      },
      {
        "seconds": 206,
        "step": "Fix a missing OpenAI import and heavy package installs."
      },
      {
        "seconds": 289,
        "step": "Test the Node.js script on a video, since it chose Node instead of the Python asked for."
      },
      {
        "seconds": 364,
        "step": "Generate five post variants and merge them into a single file."
      },
      {
        "seconds": 522,
        "step": "Rewrite the prompt for LinkedIn engagement with a hook first and short lines."
      }
    ],
    "notCovered": [
      "Automatic posting to LinkedIn, which is manual.",
      "Which variant performs best, since no engagement results are shown.",
      "Total cost. The spoken spend figure is unclear, and Mike reports 6 percent of the day's and 19 percent of the month's OpenCode Go usage.",
      "The lost earlier output files, which Mike notes were deleted by a script change."
    ],
    "qa": [
      {
        "q": "Why Node.js instead of Python?",
        "a": "OpenCode chose Node.js on its own. Mike would have preferred Python but kept it."
      },
      {
        "q": "Which post styles does it make?",
        "a": "Thought leadership, storytelling, listicle, hot take and question, all saved in one file."
      }
    ]
  },
  "pwLLS6zFpKs": {
    "summary": "A build-in-public look at Cortex, Mike's business second brain made in Claude Code and Codex. It tracks 26 project notes and the channel transcripts, has a capture inbox, a theme graph and a planned radar for what to build and film next. The vidIQ MCP is connected and a LeadScope CRM integration is prompted. Mike says he is not yet sure the tool helps earn more.",
    "whatYouBuild": "A local dashboard with project spaces, transcripts, an inbox, a theme graph and a radar recommendation page, with Claude Haiku summarizing items in a queue.",
    "toolsUsed": [
      "Claude Code",
      "Codex",
      "vidIQ",
      "Claude Haiku"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Look at project spaces and the transcripts script for one channel."
      },
      {
        "seconds": 80,
        "step": "Open a project markdown file that lists the stack, state and file structure."
      },
      {
        "seconds": 120,
        "step": "See the radar idea for suggesting what to build and film next."
      },
      {
        "seconds": 160,
        "step": "Test the new theme graph and the capture inbox."
      },
      {
        "seconds": 200,
        "step": "Check the vidIQ MCP in Claude Code and its credit balance."
      },
      {
        "seconds": 240,
        "step": "Prompt for a LeadScope CRM integration to show outreach and open rates."
      },
      {
        "seconds": 280,
        "step": "Move the build to Codex because Claude rate limits are used up."
      },
      {
        "seconds": 320,
        "step": "Run the Claude Haiku summary queue, which has 218 summaries and nothing pending."
      }
    ],
    "notCovered": [
      "Whether the radar gives useful recommendations, since it is only started.",
      "The second YouTube channel's 1,200 video transcripts, which are still to be collected.",
      "How the retrieval system works or how business data is protected.",
      "Any measured business benefit. Mike says it is not obvious that it will make more money."
    ],
    "qa": [
      {
        "q": "What is Cortex for?",
        "a": "A single place that tracks Mike's projects and channels and, eventually, suggests what to do next."
      },
      {
        "q": "What does it connect to?",
        "a": "Project markdown files, YouTube transcripts, the vidIQ MCP and a planned LeadScope CRM."
      },
      {
        "q": "Why switch to Codex?",
        "a": "Claude usage was exhausted and about 45 minutes from resetting, so Mike continued in Codex."
      }
    ]
  },
  "IlOJWfmlpGg": {
    "summary": "A sponsored build of a YouTube competitor analysis dashboard in Claude Code using Apify agent skills to scrape channels. Claude writes scraper, topic analysis and HTML dashboard files, the scrape takes about ten minutes, and the dashboard loads after fixes and a top-up of Anthropic credits. The video says Apify sponsored it and gave $50 in credits. The numbers on screen do not match each other.",
    "whatYouBuild": "A local project with an Apify-powered YouTube scraper, a topic analysis script and a standalone HTML dashboard served on localhost showing topics, trending keywords and channel specialties.",
    "toolsUsed": [
      "Apify",
      "Claude Code",
      "VS Code"
    ],
    "keySteps": [
      {
        "step": "Install the Apify agent skills and ask Claude Code to build a competitor analysis tool, choosing top competitors and the last 30 days."
      },
      {
        "step": "Pick a standalone HTML and JavaScript dashboard and let Claude write the scraper, the topic analysis script and the dashboard."
      },
      {
        "step": "Add the Apify token to the environment file."
      },
      {
        "step": "Run the scrape, which takes about ten minutes."
      },
      {
        "step": "Top up Anthropic credits after a balance error, run the analysis and start the dashboard."
      },
      {
        "step": "Fix a no analysis data error and review the topics, keywords and channel charts."
      }
    ],
    "notCovered": [
      "Terms of service for scraping YouTube through Apify.",
      "Accuracy of the topic analysis and the channel list that Claude chose.",
      "A match between the numbers shown: the scrape reports 305 videos while the dashboard shows 74, with 175 million views in total.",
      "Links from the dashboard to each video, which Mike says could be added."
    ],
    "qa": [
      {
        "q": "How long did the competitor dashboard take to build?",
        "a": "About 15 to 20 minutes, plus a ten-minute scrape, Mike says."
      },
      {
        "q": "How much does Apify cost for YouTube scraping?",
        "a": "Apify has a free plan with $5 of credits a month and paid plans from $29 a month, Mike says."
      }
    ]
  },
  "wniZpV6LZsE": {
    "summary": "Set up a SendPulse chatbot that replies to comments on any post of a Facebook page and sends each commenter one direct message with buttons to Mike's Facebook group, YouTube channel and Skool community. Mike has used it for about two years on a page with roughly 175,000 followers. The ChatGPT agent step needs the paid plan, and the contact limit on the free plan has already been exceeded.",
    "whatYouBuild": "A SendPulse comment trigger on any post with randomized replies, a repeat-trigger delay, and a direct message with three link buttons that then closes the chat.",
    "toolsUsed": [
      "SendPulse",
      "Facebook Messenger",
      "ChatGPT",
      "Make.com"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Connect Facebook Messenger by logging in and entering a code."
      },
      {
        "seconds": 80,
        "step": "Create a trigger for public comments on any post and add randomized replies."
      },
      {
        "seconds": 125,
        "step": "Edit the workflow so each commenter gets one message with buttons to a Facebook group, a YouTube channel and a Skool community."
      },
      {
        "seconds": 170,
        "step": "Ignore repeated triggers for 12 hours so the same person is not messaged again."
      },
      {
        "seconds": 210,
        "step": "See the AI agent node for ChatGPT replies, which needs the paid plan."
      },
      {
        "seconds": 260,
        "step": "Compare with ManyChat, which Mike says starts at $15 a month."
      },
      {
        "seconds": 310,
        "step": "Use the inbox and built-in CRM, where 1,700 contacts exceed the free limit of 500."
      }
    ],
    "notCovered": [
      "Meta's rules on automated replies and direct messages to people who commented.",
      "Results such as clicks to the group, channel or community.",
      "A working ChatGPT reply, which needs a paid plan.",
      "The claim that Make.com cannot reply to comments and send DMs, which is Mike's understanding."
    ],
    "qa": [
      {
        "q": "How much does SendPulse cost?",
        "a": "SendPulse has a free start and paid plans from about $10 a month that scale with the number of subscribers, Mike says."
      },
      {
        "q": "Why close the chat after one message?",
        "a": "To avoid messaging the same person every time they comment, which Mike says would bother them."
      },
      {
        "q": "Can it use ChatGPT?",
        "a": "Yes, through an AI agent node, but Mike says that now needs the paid plan."
      }
    ]
  },
  "9hs6n1enosI": {
    "summary": "A news summary of Anthropic's June 9, 2026 launch of Claude Fable 5, which Anthropic calls a Mythos-class model with safeguards for general use. Mike reads the press release and benchmark pages: it is included on paid plans until June 22, then needs usage credits, and costs $10 per million input tokens and $50 for output. Mike had not used it yet. The title mentions Mythos, but the video is about Fable 5.",
    "whatYouBuild": "Nothing is built. The video reviews the release, the Glass Wing partner rollout, the plan access dates and benchmark charts for Fable 5.",
    "toolsUsed": [
      "Claude Fable 5",
      "Claude Opus 4.8"
    ],
    "keySteps": [
      {
        "seconds": 135,
        "step": "Read the benchmark comparison with Opus 4.8, GPT 5.5 and Gemini 3.1 Pro from Anthropic's page."
      },
      {
        "seconds": 270,
        "step": "Read the access terms: included on Pro, Max, Team and seat-based Enterprise through June 22, then usage credits from June 23."
      }
    ],
    "notCovered": [
      "Mike's own tests, which are planned after upgrading to Pro.",
      "Independent checks of the benchmark claims. A separate index in the video ranks it first on intelligence but near the bottom on input price and mid-tier on speed.",
      "How the Glass Wing partner rollout affects individual users.",
      "Whether the included-plan window was extended."
    ],
    "qa": [
      {
        "q": "Why does the title say Mythos?",
        "a": "Anthropic describes Fable 5 as a Mythos-class model. The earlier Mythos preview was kept from general release over cyber security concerns, according to the announcement."
      },
      {
        "q": "How much does Fable 5 cost?",
        "a": "$10 per million input tokens and $50 per million output tokens, more than Opus 4.8."
      },
      {
        "q": "Who can use it?",
        "a": "Paid plan users until June 22, then usage credits through the API, per the announcement as read in the video."
      }
    ]
  },
  "woyme-rVDGw": {
    "summary": "A news explainer on OpenAI's GPT 5.6, which is reported to be limited to about 20 pre-approved organizations through the API and Codex, with no paid ChatGPT tier unlocking it. Mike attributes the staggered rollout to a US government request, based on reports and OpenAI's statements. Benchmark numbers and rollout rumors are repeated, not tested. Mike advises staying with existing models and distrusting early access offers.",
    "whatYouBuild": "Nothing is built. The video summarizes who can use GPT 5.6, what the Sol, Terra and Luna models are, and how to tell when it reaches ChatGPT.",
    "toolsUsed": [
      "GPT 5.6",
      "ChatGPT",
      "Codex"
    ],
    "keySteps": [
      {
        "seconds": 75,
        "step": "Hear that access is limited to about 20 approved organizations, many of them Glass Wing partners."
      },
      {
        "seconds": 118,
        "step": "Learn that access is through the API and Codex only for those partners."
      },
      {
        "seconds": 162,
        "step": "Hear why ChatGPT Plus and free users cannot unlock it."
      },
      {
        "seconds": 205,
        "step": "Read the reports that the staggered release was requested by the US government on cyber security grounds."
      },
      {
        "seconds": 340,
        "step": "See the signs that general availability has arrived, such as a 5.6 option in the model picker."
      }
    ],
    "notCovered": [
      "Independent confirmation of the government request, which is reported in the video from news coverage.",
      "Independent benchmark results, since the model is not public. The scores quoted are from OpenAI's materials.",
      "A release date. The video says only that wider availability is promised in coming weeks, and cites betting market rumors.",
      "Whether the identity checks Mike mentions as a rumor will apply."
    ],
    "qa": [
      {
        "q": "Can I use GPT 5.6 now?",
        "a": "Not according to the video. It is limited to about 20 organizations, and paying for ChatGPT does not unlock it."
      },
      {
        "q": "What are Sol, Terra and Luna?",
        "a": "Sol is the flagship model, Terra is for everyday work and Luna is the minimal, lower-cost one."
      },
      {
        "q": "What does Mike suggest while GPT 5.6 is restricted?",
        "a": "Keep using the models you already have, such as GPT 5.4 mini for coding, and be skeptical of sites offering early access."
      }
    ]
  },
  "Z03CpV_8OIA": {
    "summary": "An n8n workflow that pulls a resume from Google Docs, scrapes remote digital marketing jobs from Indeed with Apify, has GPT-4.1 judge fit, writes a tailored resume in a Google Doc for good matches and logs every job in a Google Sheet. Google authentication errors stop the live run in the demo, so it is explained rather than shown working. Applying to jobs stays manual.",
    "whatYouBuild": "An n8n workflow with a manual trigger, an Apify Indeed scraper in batches of five, a fit-check filter, a resume rewrite step, HTML to markdown conversion, Google Docs creation and a Google Sheets tracker.",
    "toolsUsed": [
      "n8n",
      "Apify",
      "OpenAI API",
      "Google Docs",
      "Google Sheets"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Start with a manual trigger and fetch the resume from Google Docs, which fails on authentication."
      },
      {
        "seconds": 80,
        "step": "Configure the Apify Indeed scraper for remote digital marketing jobs in the United States."
      },
      {
        "seconds": 125,
        "step": "Loop over jobs in batches of five and ask GPT-4.1 whether the resume fits each description."
      },
      {
        "seconds": 170,
        "step": "Tailor the resume with GPT-4.1 mini, written in HTML for easy copying."
      },
      {
        "seconds": 215,
        "step": "Create the resume document in Google Docs and set its sharing permission."
      },
      {
        "seconds": 260,
        "step": "Add every matching job to a Google Sheets tracker."
      }
    ],
    "notCovered": [
      "A successful run. The Google Docs authentication error is not resolved in the video.",
      "Checking that tailored resumes stay truthful, since an AI model can overstate or invent qualifications.",
      "The sharing setting that makes each resume document readable by anyone with the link, which matters for personal data.",
      "Applying, which Mike says cannot be easily automated."
    ],
    "qa": [
      {
        "q": "Does the workflow apply for jobs?",
        "a": "No. It finds jobs, scores fit, writes tailored resumes and logs them. Mike says applying still has to be done by hand."
      },
      {
        "q": "Where can I get the n8n job search resume template?",
        "a": "On Mike's Gumroad page as pay what you want."
      },
      {
        "q": "Why did the demo fail?",
        "a": "Google Docs returned a client authentication error that Mike could not resolve during recording."
      }
    ]
  },
  "X0X8kJTK7vA": {
    "summary": "A Make.com scenario that finds businesses on Google Maps, creates a Google Sheet, fetches each business website and uses a pattern from ChatGPT to extract email addresses into a column. A run for marketing agencies in Bangkok fills the sheet automatically, though some emails are wrong or missing. Mike plans to send the leads cold email. Terms of use and cold email rules are not covered.",
    "whatYouBuild": "A Make.com scenario with a Google Maps text search, HTTP requests for place details and website HTML, a regular expression for emails, and rows added to Google Sheets.",
    "toolsUsed": [
      "Make.com",
      "Google Maps API",
      "Google Sheets",
      "ChatGPT",
      "MailerLite"
    ],
    "keySteps": [
      {
        "seconds": 127,
        "step": "Create a Google Sheet and sheet name from the scenario."
      },
      {
        "seconds": 198,
        "step": "Connect the Google Maps API with a Google Cloud key and run a text search for marketing agencies in Bangkok, limited to 50."
      },
      {
        "seconds": 281,
        "step": "Call the place details endpoint for each result's website and add name and website rows."
      },
      {
        "seconds": 333,
        "step": "Fetch each site's HTML and extract emails with a regular expression written by ChatGPT."
      },
      {
        "seconds": 371,
        "step": "Ignore validation errors so the run continues, and run or schedule the scenario."
      },
      {
        "seconds": 409,
        "step": "Watch the sheet fill in real time and review which emails were found."
      }
    ],
    "notCovered": [
      "Accuracy of the emails. Mike says some are image file names or are missing and need a tool such as Hunter.",
      "Google Maps Platform terms on storing business data, and anti-spam and data protection rules for cold email.",
      "A count that matches the 50 requested. The sheet shows 72 rows added.",
      "Results from emailing the leads."
    ],
    "qa": [
      {
        "q": "Can I use it for any city or industry?",
        "a": "Any location and industry works as long as the business is on Google Maps, Mike says."
      },
      {
        "q": "What do you need besides Make.com?",
        "a": "A Google Cloud project with an API key for Google Maps, and a Google account for Sheets."
      },
      {
        "q": "Are the emails reliable?",
        "a": "No. Mike says it does not always get the right address and sometimes finds none."
      }
    ]
  },
  "is7JIUfHsng": {
    "summary": "An attempt to set up an OpenClaw assistant on KiloClaw, Kilo's hosted version, on a 21-day free trial. The dashboard, soul.md personality file, skills and update settings are shown, but a LinkedIn post generator fails to submit approval, WhatsApp and Telegram channels cannot be linked and an error message is unexplained. Mike says he prefers Claude Code and finds OpenClaw hard to get working.",
    "whatYouBuild": "A KiloClaw instance on its free trial, with a LinkedIn post generator request that errors and unfinished channel connections.",
    "toolsUsed": [
      "KiloClaw",
      "OpenClaw",
      "Claude Sonnet"
    ],
    "keySteps": [
      {
        "seconds": 24,
        "step": "Set up the hosted assistant and see the trial period and prices quoted at $8 or $9 a month."
      },
      {
        "seconds": 62,
        "step": "Open the OpenClaw dashboard and read the soul.md personality file."
      },
      {
        "seconds": 109,
        "step": "Try to approve a LinkedIn post generator, which fails to submit approval."
      },
      {
        "seconds": 161,
        "step": "Review configuration, the gateway token and environment variables."
      },
      {
        "seconds": 183,
        "step": "See bundled skills and the skill hub."
      },
      {
        "seconds": 219,
        "step": "Turn on auto-updates on the stable channel."
      },
      {
        "seconds": 252,
        "step": "Try WhatsApp and Telegram, where the QR code option is unavailable."
      },
      {
        "seconds": 312,
        "step": "Switch the model to Claude Sonnet and retry the generator."
      }
    ],
    "notCovered": [
      "A working assistant or LinkedIn generator. The approval and send errors are not resolved.",
      "Connecting WhatsApp or Telegram.",
      "Security of giving an assistant API keys, which Mike says he does not trust OpenClaw with.",
      "Current KiloClaw price. The video quotes $8 a month, while a later video by Mike quotes $55."
    ],
    "qa": [
      {
        "q": "Did it work?",
        "a": "Not in this video. Mike hits several errors and ends with a negative view of OpenClaw."
      },
      {
        "q": "What does KiloClaw offer?",
        "a": "A hosted OpenClaw instance on a private virtual server, so you do not install it yourself."
      },
      {
        "q": "Why does Mike prefer Claude Code?",
        "a": "He finds it faster and more secure for what he wants, which is a personal view."
      }
    ]
  },
  "KKw2Q9-Ge_0": {
    "summary": "Use Gemini 3 Pro Preview in Google AI Studio to build single-file HTML versions of Tetris, Snake, Asteroids and Pac-Man from prompts written in ChatGPT. Tetris, Snake and Asteroids each take a couple of minutes and play, though the snake looks like a Tetris block and Asteroids runs slowly. The Pac-Man version does not work. Mike may host the games online.",
    "whatYouBuild": "Four browser games as single HTML files, previewed in AI Studio and downloaded to run locally.",
    "toolsUsed": [
      "Gemini 3 Pro",
      "Google AI Studio",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 102,
        "step": "Ask ChatGPT to write a detailed Gemini prompt for a Tetris replica as one HTML, CSS and JavaScript file."
      },
      {
        "seconds": 222,
        "step": "Run the prompt in AI Studio, preview the playable Tetris game and download the HTML."
      },
      {
        "seconds": 380,
        "step": "Build Asteroids and Snake in parallel tabs."
      },
      {
        "seconds": 466,
        "step": "Play Snake, which works but looks wrong, and download it."
      },
      {
        "seconds": 652,
        "step": "Try Pac-Man, which does not run properly."
      },
      {
        "seconds": 750,
        "step": "Wrap up with the idea of publishing many classic games online."
      }
    ],
    "notCovered": [
      "A fix for Pac-Man, which Mike says needs more prompting.",
      "Code quality or how Gemini's output compares with other models on the same prompts.",
      "Rights questions around publishing copies of well-known games.",
      "Graphics polish. Mike calls the Asteroids graphics not great."
    ],
    "qa": [
      {
        "q": "How long did Gemini 3 take to build each game?",
        "a": "About one and a half to two minutes for Tetris and a few minutes for the others."
      },
      {
        "q": "Did all four work?",
        "a": "No. Tetris, Snake and Asteroids ran, while the Pac-Man file was broken."
      },
      {
        "q": "Do you need a paid plan to build games in AI Studio?",
        "a": "Mike used the free version of AI Studio, and says upgrading would probably help."
      }
    ]
  },
  "pYHt2qWvAr8": {
    "summary": "A tour of LeadScope, a lead generation tool Mike built in about four hours with Codex and GPT 5.6. It searches businesses by category and place through the Google Places API, audits their websites with PageSpeed, writes pitch emails, keeps a CRM and sends through Gmail or Mailgun. Mailgun and the automations page are not working reliably, and redesign mockups are weak. Spending so far is $1.73 on Places.",
    "whatYouBuild": "A web app with lead search, Playwright contact discovery, website audits, drafted emails, a built-in CRM, sequences and an insights page.",
    "toolsUsed": [
      "Codex",
      "Google Places API",
      "PageSpeed Insights",
      "Playwright",
      "Mailgun",
      "Gmail",
      "Vercel"
    ],
    "keySteps": [
      {
        "seconds": 33,
        "step": "See the landing page built in GPT 5.6 and the idea of audit-based outreach."
      },
      {
        "seconds": 100,
        "step": "Search for HVAC businesses in Phoenix with the Places API and find contact details with Playwright."
      },
      {
        "seconds": 145,
        "step": "Open a lead page with rating, phone and email, or view it in the CRM."
      },
      {
        "seconds": 184,
        "step": "Run automated site audits that flag missing HTTPS, meta descriptions, JSON-LD and image alt text."
      },
      {
        "seconds": 225,
        "step": "Generate pitch emails and send one through Gmail."
      },
      {
        "seconds": 306,
        "step": "Switch between Mailgun and Gmail settings, since Mailgun is not working fully."
      },
      {
        "seconds": 382,
        "step": "Set up follow-up sequences and pipeline tracking."
      },
      {
        "seconds": 472,
        "step": "Read the insights page and discovery funnel."
      },
      {
        "seconds": 566,
        "step": "Look at the unfinished redesign preview and deep research plans."
      }
    ],
    "notCovered": [
      "Results from outreach, such as replies or clients won.",
      "Automatic sending and open or reply tracking, which wait on Mailgun working.",
      "Rules on cold email and on collecting contact details from business websites in different countries.",
      "Pricing for the tool, which is still to be built."
    ],
    "qa": [
      {
        "q": "How much has LeadScope cost to run?",
        "a": "Mike says $1.73 on the Places API and nothing for PageSpeed, which was called about 1,300 times."
      },
      {
        "q": "What does the audit look for?",
        "a": "Things like missing HTTPS, meta descriptions, structured data, Open Graph tags and image alt text."
      },
      {
        "q": "Is LeadScope available to use?",
        "a": "Not yet. Mike asks viewers to comment if they would use it, and the landing page and pricing are unfinished."
      }
    ]
  },
  "ZNuGmX1HpxM": {
    "summary": "An update on Cortex, Mike's business second brain built with Claude Code and Codex. It now maps 27 projects with Graphify, imports Claude chat history into a retrieval library, answers questions through a Claude managed agent, stores contacts and campaigns, and has a content kanban and radar. The title's $25,000 figure is Mike's idea of what it could be sold for to clients, not a measured value. The Tube Analytics connector is planned.",
    "whatYouBuild": "A local knowledge system with a project map, a library of imported chats and transcripts, an Ask Cortex page backed by a Claude managed agent, contact and campaign tabs, a content studio board and a signals radar.",
    "toolsUsed": [
      "Claude Code",
      "Codex",
      "Graphify",
      "Mailgun",
      "Claude"
    ],
    "keySteps": [
      {
        "seconds": 60,
        "step": "Look at the project map of 27 projects built with Graphify."
      },
      {
        "seconds": 120,
        "step": "Browse the library of imported Claude chats and video transcripts behind the retrieval system."
      },
      {
        "seconds": 180,
        "step": "Ask a question through the Ask Cortex page, which starts a read-only managed agent on Sonnet 5."
      },
      {
        "seconds": 240,
        "step": "Open spaces for each project with its inbox, transcripts and skills."
      },
      {
        "seconds": 300,
        "step": "Review contacts and email campaigns, where Mailgun email verification needs a paid account."
      },
      {
        "seconds": 360,
        "step": "See the content studio kanban and the build and content radar."
      },
      {
        "seconds": 420,
        "step": "Search the full chat history for a topic."
      },
      {
        "seconds": 480,
        "step": "Plan an MCP connector from Mike's analytics app into Cortex."
      }
    ],
    "notCovered": [
      "Any customer or sale. The $25,000 to $35,000 figures are what Mike says he could charge.",
      "The accuracy of the radar's recommendations, which Mike has not yet tested.",
      "Privacy of importing full chat histories and contact lists into a new system.",
      "The finished analytics connector, which is still being planned."
    ],
    "qa": [
      {
        "q": "What does Ask Cortex use?",
        "a": "A read-only Claude managed agent on Sonnet 5, working over the imported chats, transcripts and project notes."
      },
      {
        "q": "Is the project map useful?",
        "a": "Mike calls it pretty but not particularly useful."
      },
      {
        "q": "Why can't it verify emails yet?",
        "a": "Mailgun's email verification is only available on paid accounts, and Mike is still on the free plan."
      }
    ]
  },
  "_1bZhPHcsm4": {
    "summary": "An n8n workflow that watches an Airtable table for new community members and adds them to an email marketing platform, then marks each record done so it is not added again. A separate automation in the email tool sends the welcome message. Tests run in batches of ten before a full import of about 770 people, and everyone is re-sent the welcome email. Mike cancelled Make.com after running out of free credits.",
    "whatYouBuild": "An n8n workflow with an Airtable trigger every hour, a filter on status equal to new, a limit node for testing, a contact add step with first name, and an Airtable update that sets status to done.",
    "toolsUsed": [
      "n8n",
      "Airtable",
      "Engine Mailer"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Add an Airtable trigger that runs hourly, with a status field of new or done."
      },
      {
        "seconds": 90,
        "step": "Search records with the formula status equals new, sorted by created time."
      },
      {
        "seconds": 130,
        "step": "Add a limit node of ten so tests do not import all 770 people."
      },
      {
        "seconds": 170,
        "step": "Add each person to the email platform with email and first name, using an API key."
      },
      {
        "seconds": 215,
        "step": "Update the Airtable record to done, which needs the record ID to match."
      },
      {
        "seconds": 260,
        "step": "Check the welcome email automation in the email tool."
      },
      {
        "seconds": 305,
        "step": "Remove the limit and run the full import."
      }
    ],
    "notCovered": [
      "Consent and unsubscribe handling for emailing existing community members. Mike re-sends the welcome email to everyone.",
      "Adding members to Airtable, which stays manual.",
      "Delivery results beyond the first test sends.",
      "Limits beyond the quoted cap of 500 emails a day on the platform's free plan."
    ],
    "qa": [
      {
        "q": "Why mark records as done?",
        "a": "So the hourly run does not add the same person to the email list again."
      },
      {
        "q": "Why move from Make.com?",
        "a": "Mike ran out of free credits on Make.com and switched to n8n, cancelling his Make.com plan."
      },
      {
        "q": "What bug came up?",
        "a": "The status did not update to done until the Airtable record ID was added as the matching field."
      }
    ]
  },
  "NH6t9M2vFrk": {
    "summary": "A look at Claude Opus 5.5 two days after its announcement, using Anthropic's benchmark charts and pricing, then a live design audit of Mike's homepage in the Claude desktop app with $100 of free cloud session credits. The quoted benchmarks come from Anthropic. The audit finds layout and copy bugs, and the fix plan is approved, but the results are not shown.",
    "whatYouBuild": "A Claude cloud session that runs a design audit on a site, writes an implementation plan in plan mode and starts applying fixes on a branch.",
    "toolsUsed": [
      "Claude Opus 5.5",
      "Claude Desktop",
      "GitHub"
    ],
    "keySteps": [
      {
        "seconds": 38,
        "step": "Read the announcement's benchmark comparison with Fable 5.1 and GPT-6 models."
      },
      {
        "seconds": 112,
        "step": "Check pricing of $4 and $20 per million tokens against $5 and $25 for Opus 5, and the claimed 30 percent speed gain."
      },
      {
        "seconds": 203,
        "step": "Claim free cloud session credits and a usage reset in the Claude desktop app."
      },
      {
        "seconds": 271,
        "step": "Start a cloud session, which pulls the project from GitHub."
      },
      {
        "seconds": 304,
        "step": "Run a design audit of the homepage using screenshots."
      },
      {
        "seconds": 331,
        "step": "Review bugs such as doubled dollar signs on pricing cards and an early affiliate pitch."
      },
      {
        "seconds": 383,
        "step": "Create an implementation plan in plan mode and approve it for automatic implementation."
      }
    ],
    "notCovered": [
      "The fixes landing or improving the site. The video ends as implementation starts, with about $5 of the $100 credit used.",
      "Independent verification of Anthropic's benchmarks and the 40 percent cost reduction.",
      "How the free credits and reset are limited.",
      "Whether Opus 5.5 beats Fable 5.1 on Mike's own work."
    ],
    "qa": [
      {
        "q": "How much does Opus 5.5 cost?",
        "a": "$4 per million input tokens and $20 per million output tokens, against $5 and $25 for Opus 5, according to the announcement."
      },
      {
        "q": "What are cloud sessions?",
        "a": "Claude runs the task in the cloud on a copy of your GitHub project instead of on your machine."
      },
      {
        "q": "What did the Opus 5.5 design audit find?",
        "a": "Two bugs and layout issues on the homepage, including doubled dollar signs and an oversized hero, plus a suggested reorder of the affiliate pitch."
      }
    ]
  },
  "eui7NABhRV8": {
    "summary": "A live first test of Syllaby on a free trial: set the style, voice, music and subtitles, use a custom topic to script a one-minute faceless video about low-cost places for digital nomads, wait about three minutes for it to render and publish it to YouTube from inside Syllaby. An application error appears but the video still renders. Results are unknown, and the cost-of-living claims in the AI script are not checked. The link is an affiliate link.",
    "whatYouBuild": "A portrait faceless video made with Syllaby from a custom topic script, with ambient music and karaoke-style subtitles, published straight to a YouTube channel.",
    "toolsUsed": [
      "Syllaby",
      "ChatGPT",
      "YouTube"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Start a faceless video and choose portrait format and a short length, since the trial has about 50 credits."
      },
      {
        "seconds": 80,
        "step": "Pick a visual style, subtitle style and an American male voice."
      },
      {
        "seconds": 120,
        "step": "Use ChatGPT for topic ideas and enter a custom topic for the script assistant."
      },
      {
        "seconds": 200,
        "step": "Generate and read the AI script, adding ambient music and sound effects."
      },
      {
        "seconds": 240,
        "step": "Create the video, which shows an error and then renders in about three minutes."
      },
      {
        "seconds": 280,
        "step": "Connect a YouTube account and publish the video directly."
      },
      {
        "seconds": 320,
        "step": "Review pricing of about $25 a month for 500 credits."
      }
    ],
    "notCovered": [
      "How the video performs on YouTube, which Mike says he will watch for a couple of weeks.",
      "Checking the facts in the script, such as the countries and costs listed.",
      "YouTube's disclosure rules for AI-generated or synthetic content.",
      "Avatars, thumbnails and analytics, which Mike says he may explore later."
    ],
    "qa": [
      {
        "q": "Is Syllaby free?",
        "a": "There is a 7-day free trial with limited credits. Mike quotes about $25 a month afterwards."
      },
      {
        "q": "How long does Syllaby take to render a video?",
        "a": "About three minutes to render a video of roughly one minute."
      },
    ]
  },
  "PS31s8REvlw": {
    "summary": "A walkthrough of Anthropic's Claude Sonnet 5.5, announced as over 30 percent faster than Sonnet 5 and up to 30 percent cheaper for most work at the same $2 and $10 per million token price. Mike reads Anthropic's benchmark charts, runs a side-by-side HTML game speed test against Sonnet 5, and recommends high effort for coding. The benchmark claims come from Anthropic's announcement.",
    "whatYouBuild": "Nothing is built beyond a short speed test of a sand dune game and a starling flock page generated by Sonnet 5.5 and Sonnet 5 side by side.",
    "toolsUsed": [
      "Claude Sonnet 5.5",
      "Claude Desktop",
      "Claude Code"
    ],
    "keySteps": [
      {
        "seconds": 24,
        "step": "Compare Sonnet 5.5 and Opus 5.5 benchmarks from Anthropic's post."
      },
      {
        "seconds": 78,
        "step": "Read the pricing: $2 and $10 per million tokens for Sonnet 5.5, against $4 and $20 for Opus 5.5."
      },
      {
        "seconds": 140,
        "step": "Look at coding scores by effort level and why high effort is worth using."
      },
      {
        "seconds": 265,
        "step": "See image understanding and chart recognition gains."
      },
      {
        "seconds": 321,
        "step": "Watch a speed test creating HTML games with Sonnet 5.5 and Sonnet 5, where 5.5 uses about 13,000 tokens against 21,000."
      },
      {
        "seconds": 380,
        "step": "Learn that Claude Code defaults to medium effort and the platform to high."
      },
      {
        "seconds": 410,
        "step": "Read how higher-risk cyber security tasks fall back to Sonnet 5."
      }
    ],
    "notCovered": [
      "Independent benchmarks. The charts and percentages come from Anthropic.",
      "A quality comparison of the two models' games beyond speed and token use.",
      "Real project results from Mike, who is only starting to use the model.",
      "How often the cyber safeguards trigger a fallback during normal coding."
    ],
    "qa": [
      {
        "q": "What does Sonnet 5.5 cost?",
        "a": "$2 per million input tokens and $10 per million output tokens, the same as Sonnet 5, with cache reads at 20 cents."
      },
      {
        "q": "What did the speed test show?",
        "a": "Sonnet 5.5 finished a game faster and used about 13,000 tokens against 21,000 for Sonnet 5, in one run."
      },
      {
        "q": "Which effort level is suggested?",
        "a": "High for coding, instead of the medium default in Claude Code."
      }
    ]
  },
  "lKqe0r0zoGY": {
    "summary": "A first test of Lindy, a platform that builds AI agents from prompts. On a free account with 400 credits, Mike finds software engineers in Hong Kong, tries the contact finder, lead outreacher and lead generator templates, and gets a Google Sheet of profiles, emails and phone numbers. Several agents need app permissions he skips. The referral link pays $50 to each side, according to the video.",
    "whatYouBuild": "Lindy agents from templates: a contact finder, a lead generator that fills a Google Sheet, and an unfinished lead outreach flow and WhatsApp support agent.",
    "toolsUsed": [
      "Lindy",
      "Google Sheets",
      "Perplexity"
    ],
    "keySteps": [
      {
        "seconds": 37,
        "step": "Create a free account and try a prompt to find 10 software engineers in Hong Kong."
      },
      {
        "seconds": 131,
        "step": "Review the results with LinkedIn profiles, work emails and job titles."
      },
      {
        "seconds": 208,
        "step": "Add the contact finder template and enrich a contact with email, phone and profiles."
      },
      {
        "seconds": 255,
        "step": "Add the lead outreacher template, which needs Slack and email permissions."
      },
      {
        "seconds": 412,
        "step": "Authorize Google, add the lead generator and find engineers at a company in San Francisco."
      },
      {
        "seconds": 491,
        "step": "Check the Google Sheet Lindy created with the contact data."
      },
      {
        "seconds": 577,
        "step": "Review the credits left and paid plans from about $49 a month."
      }
    ],
    "notCovered": [
      "Accuracy of the contact details, and the legal basis and privacy rules for collecting people's emails and phone numbers.",
      "A deployed outreach agent, because permissions are skipped.",
      "The WhatsApp support agent, which needs an access token.",
      "Costs per run, beyond 167 of 400 free credits left after the demo."
    ],
    "qa": [
      {
        "q": "Is Lindy free?",
        "a": "There is a free account with 400 credits in the video. Paid plans are quoted from about $49 a month, up to $300 or more for 5,000 credits."
      },
      {
        "q": "What data does the Lindy lead generator return?",
        "a": "Names, LinkedIn and other profiles, work emails, phone numbers, job titles and company details, saved to a Google Sheet."
      },
    ]
  },
  "qzIaEA0wBCw": {
    "summary": "Use Trakkr, an AI search visibility tracker with a new MCP server, from Codex to find content gaps and write articles with a GEO blog writer skill. Trakkr shows citations, AI crawler visits and prompt coverage for Mike's site, and the MCP returns citation trends, top-cited pages and competitor gaps. Codex then drafts a 16-article cluster and a competitor gap plan. Whether the articles earn more citations is not shown.",
    "whatYouBuild": "Trakkr's MCP connected to Codex, a GEO content skill installed from skills.sh, and batches of blog articles with quick answers, key takeaways, tables, sources and schema.",
    "toolsUsed": [
      "Trakkr",
      "Codex",
      "skills.sh",
      "Vercel"
    ],
    "keySteps": [
      {
        "seconds": 52,
        "step": "Read the Trakkr dashboard: citations, AI crawler traffic and the share of prompts where the brand appears."
      },
      {
        "seconds": 93,
        "step": "Add the Trakkr MCP to Codex by pasting its config."
      },
      {
        "seconds": 134,
        "step": "Ask for citation trends and top-cited pages through the MCP tools."
      },
      {
        "seconds": 221,
        "step": "Find citation gaps where competitors appear and Mike's site does not."
      },
      {
        "seconds": 242,
        "step": "Install the GEO content optimizer skill with the skills command."
      },
      {
        "seconds": 316,
        "step": "Review articles the skill wrote, with a quick answer at the top and sources at the bottom."
      },
      {
        "seconds": 413,
        "step": "Plan a 16-article cluster and a second round aimed at competitor gaps."
      }
    ],
    "notCovered": [
      "Any change in citations after the new articles go live.",
      "Whether the crawler visit counts quoted, such as 10,000 and 15,000 a day, reflect real readers. They come from Mike's tracker.",
      "A review of the articles' accuracy and sources.",
      "Trial terms and prices for Trakkr, which are not stated clearly in the video."
    ],
    "qa": [
      {
        "q": "What does the Trakkr MCP add?",
        "a": "It lets a coding agent read visibility, citations, competitor gaps and content ideas directly, so articles can be planned from the data."
      },
      {
        "q": "Where does the GEO skill come from?",
        "a": "From skills.sh, the skills registry, installed with a copied command and set to global."
      },
      {
        "q": "How are the articles structured?",
        "a": "With a quick answer at the top, key takeaways, tables, sources, an FAQ, schema and an author section."
      }
    ]
  },
  "enKnxKJJFZw": {
    "summary": "Mike explains why he launched a free Skool community two weeks earlier, how it grew to 160 members and how he plans to earn from it with templates, a course and consultation calls. The earnings and ranking claims are Mike's own. The Skool link is an affiliate link, and the video encourages viewers to start their own community.",
    "whatYouBuild": "Nothing is built. The video describes a free community with paid upsells and a welcome email automation made in Make.com.",
    "toolsUsed": [
      "Skool",
      "Make.com"
    ],
    "keySteps": [
      {
        "seconds": 68,
        "step": "Hear how the community was promoted on Facebook, YouTube and an email list."
      },
      {
        "seconds": 106,
        "step": "Hear the offers inside: paid templates, a Make.com course and consultation calls at $150 an hour."
      },
      {
        "seconds": 154,
        "step": "Learn that a welcome email is sent automatically when someone joins."
      },
      {
        "seconds": 262,
        "step": "Hear about affiliate links as another income source."
      },
      {
        "seconds": 288,
        "step": "Hear the pitch for starting your own Skool community."
      }
    ],
    "notCovered": [
      "Proof of the roughly $300 earned in two weeks or of the page six ranking.",
      "How the free-first model compares with a paid community, beyond Mike's view that a free one lets him collect emails.",
      "Skool's rules on member emails and marketing to them.",
      "Whether the community stayed profitable. The video is from the first two weeks."
    ],
    "qa": [
      {
        "q": "How does the community earn money?",
        "a": "Through paid templates, a Make.com course, consultation calls and affiliate links, per Mike."
      },
      {
        "q": "How big was Mike's Skool community after two weeks?",
        "a": "About 160 members after two weeks, according to Mike."
      }
    ]
  },
  "h8KLzYPMjjE": {
    "summary": "A news summary of Claude Fable 5.1, released on September 2, 2026, read from Anthropic's press release and benchmark pages. Anthropic says it costs about 25 percent less than Fable 5, with larger savings on agentic work, and it needs usage credits rather than Pro or Max plans. The chart Mike shows has only a small intelligence lead over Opus 5, and he will mostly keep using cheaper models.",
    "whatYouBuild": "Nothing is built. The video reviews pricing, access, safeguards and benchmarks and shows the model picker in Claude Code.",
    "toolsUsed": [
      "Claude Fable 5.1",
      "Claude Code"
    ],
    "keySteps": [
      {
        "seconds": 28,
        "step": "Read the press release on safeguards and the Fable 5.1 and Mythos 5.1 versions."
      },
      {
        "seconds": 56,
        "step": "Read the pricing changes: about 25 percent cheaper for typical workloads and up to about 45 percent for agentic work."
      },
      {
        "seconds": 85,
        "step": "Note that it needs API usage credits, with discounts of 20 percent at $250 and 30 percent at $1,000."
      },
      {
        "seconds": 113,
        "step": "Compare intelligence, speed and cost charts with Opus 5, GPT 5.6 Sol and Kimi K3."
      },
      {
        "seconds": 170,
        "step": "See Fable listed in the terminal model picker, which opens the Claude website to enable usage credits."
      },
      {
        "seconds": 198,
        "step": "Hear about the Enterprise Frontier Safeguards for data retention."
      }
    ],
    "notCovered": [
      "Mike's own tests, since he will not use usage credits.",
      "Independent checks of the benchmark and discount claims, which come from Anthropic's materials.",
      "Exact prices per token, which are not read out clearly.",
      "How the safeguards change day-to-day coding."
    ],
    "qa": [
      {
        "q": "Can I use it on a Pro or Max plan?",
        "a": "No. The video says it needs usage credits through the API."
      },
      {
        "q": "How much cheaper is it than Fable 5?",
        "a": "About 25 percent for typical token-billed workloads and up to about 45 percent for highly agentic work, according to Anthropic."
      },
      {
        "q": "Is it much smarter than Opus 5?",
        "a": "On the chart shown, only about three points higher on one intelligence index."
      }
    ]
  },
  "s6004nmWG9g": {
    "summary": "Pull B2B lead lists without spending Apollo credits: filter people in Apollo for owners and founders of small US marketing companies in the AI space, then scrape the search with an Apify actor and export to CSV. A Make.com version reads search URLs from Airtable, runs the actor and writes leads to Google Sheets, but hits Apify's free daily run limit. Mike's view that this is safe under the terms of service is an opinion.",
    "whatYouBuild": "An Apollo search narrowed to about 1,200 people, an Apify scrape of that search to CSV, and a paid Make.com template that automates it with Airtable and Google Sheets.",
    "toolsUsed": [
      "Apollo",
      "Apify",
      "Make.com",
      "Airtable",
      "Google Sheets"
    ],
    "keySteps": [
      {
        "seconds": 71,
        "step": "Filter Apollo for verified emails, owner and founder titles, the United States, 1 to 10 employees, marketing and advertising, and an AI keyword."
      },
      {
        "seconds": 132,
        "step": "Paste the search URL into the Apify Apollo scraper and start it, using free monthly credits."
      },
      {
        "seconds": 195,
        "step": "Export the scraped leads to CSV for use elsewhere."
      },
      {
        "seconds": 268,
        "step": "Walk through a Make.com scenario that reads search URLs from Airtable, runs the actor, reads dataset items and adds rows to Google Sheets."
      },
      {
        "seconds": 509,
        "step": "Hit the free Apify limit of 10 runs a day and compare paid plan prices with Apollo."
      },
      {
        "seconds": 644,
        "step": "See other Apify scrapers for YouTube, LinkedIn, Upwork, Google Maps and TikTok."
      }
    ],
    "notCovered": [
      "Whether scraping is allowed by Apollo's and Apify's terms. Mike says it is safe if you do not scrape huge numbers, which is not verified here.",
      "Laws on cold email and on using scraped personal data.",
      "Lead quality or what happens after the leads are exported. Mike imports them into their Skool community.",
      "A clean automation run, since the free Apify limit interrupts it."
    ],
    "qa": [
      {
        "q": "Why scrape instead of using Apollo credits?",
        "a": "Apollo gives a limited number of credits a month and caps the free plan at five pages, while Apify gives $5 of monthly credit and Mike used $3."
      },
      {
        "q": "How much does the Make.com template cost?",
        "a": "It is $15 on Gumroad, Mike says."
      },
      {
        "q": "What do paid plans cost?",
        "a": "Apify starts at $39 a month and Apollo at about $60 a month, Mike says."
      }
    ]
  },
  "LoNsDme0XQI": {
    "summary": "Build a Kilo Code skill that scores a blog article against a 23-point AI visibility checklist taken from a LinkedIn guide, then run it on Mike's own articles. One article scores 91 out of 100 and 98 after the skill's fixes. The score and the 80 to 90 percent citation probability come from the skill itself and are not checked against real AI citations. Mike has about 350 articles to go.",
    "whatYouBuild": "A custom AI Visibility Optimizer skill with TypeScript scripts that audit a page against 23 elements and apply fixes such as a direct answer, FAQ, freshness and meta description changes.",
    "toolsUsed": [
      "Kilo Code",
      "VS Code"
    ],
    "keySteps": [
      {
        "seconds": 32,
        "step": "Install Kilo Code from the command line with npm."
      },
      {
        "seconds": 54,
        "step": "Ask it to read a published AI visibility guide and create a skill from it."
      },
      {
        "seconds": 119,
        "step": "Review the 23 criteria, including four critical elements."
      },
      {
        "seconds": 200,
        "step": "Read the generated scripts, types and skill documentation."
      },
      {
        "seconds": 255,
        "step": "Check rules such as a direct answer in the first 100 words with no links."
      },
      {
        "seconds": 314,
        "step": "Run the skill on a live blog article and read the analysis."
      },
      {
        "seconds": 376,
        "step": "See the initial 91 out of 100 score and a prioritized action plan."
      },
      {
        "seconds": 590,
        "step": "Apply the fixes and see the score rise to 98."
      }
    ],
    "notCovered": [
      "Any increase in real citations by ChatGPT, Claude, Perplexity or Gemini after the changes.",
      "How well the skill's reading of the guide matches the guide, or the guide's own evidence for its percentages.",
      "Several of the skill's checks that fail or are only partial, such as the 61-word opening and the citation mix.",
      "Running it across the 350 articles."
    ],
    "qa": [
      {
        "q": "Where do the 23 criteria come from?",
        "a": "From a LinkedIn playbook by another author, which Mike credits and turns into a skill."
      },
      {
        "q": "Is the 98 percent score proof of citations?",
        "a": "No. It is the skill's own rating of the page against the checklist."
      },
      {
        "q": "Is the AI Visibility Optimizer skill available?",
        "a": "Mike says he may put it on Gumroad if viewers ask."
      }
    ]
  },
  "VYx1wZ0Ct38": {
    "summary": "A look at OpenAI's GPT 5.6 release of July 9, 2026 with its Sol, Terra and Luna models, ChatGPT Work and the GPT Live voice model, from the news page and the Codex model picker. Mike says he built a Chrome extension for his analytics app with GPT 5.6 in about an hour and a half and found credits last longer than with Fable 5. Benchmark and price figures come from OpenAI's materials.",
    "whatYouBuild": "Nothing in the video is built live. It shows a previously built Chrome extension with a creator score sidebar and title analysis.",
    "toolsUsed": [
      "GPT 5.6",
      "Codex",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 13,
        "step": "Meet the three models: Sol, Terra and Luna."
      },
      {
        "seconds": 30,
        "step": "See reasoning levels in Codex, including extra high and a maximum depth."
      },
      {
        "seconds": 56,
        "step": "Look at ChatGPT Work, which connects apps and plugins."
      },
      {
        "seconds": 93,
        "step": "Hear a demo of the GPT Live voice model."
      },
      {
        "seconds": 140,
        "step": "Open the Chrome extension built with GPT 5.6 and test its sidebar on a YouTube page."
      },
      {
        "seconds": 215,
        "step": "Compare usage credit life with Fable 5."
      },
      {
        "seconds": 248,
        "step": "Read Terminal Bench scores and token prices for Sol and Fable 5."
      }
    ],
    "notCovered": [
      "Independent benchmark checks. The 88.8 against 84 Terminal Bench figure is quoted from the release.",
      "The extension's accuracy or its code quality.",
      "Exact limits of the plan Mike recommends, which he describes as $20 a month.",
      "A side-by-side build with another model."
    ],
    "qa": [
      {
        "q": "What are Sol, Terra and Luna?",
        "a": "Sol is the flagship, Terra the mid-tier and Luna the lightest, cheapest model, per the release."
      },
      {
        "q": "How does Sol compare on price?",
        "a": "Mike quotes $5 per million input and $30 per million output tokens, against $10 and $50 for Fable 5."
      },
      {
        "q": "What did Mike build with GPT 5.6?",
        "a": "A Chrome extension for his own SaaS that adds a sidebar with research, keyword and title analysis on YouTube pages."
      }
    ]
  },
  "w_MoA8lpWTg": {
    "summary": "A live demo of ShortForge, Mike's own Opus Clip alternative, built in about four hours with Codex and OpenCode. It imports a YouTube link or a file, transcribes with Whisper, finds about nine clips in a ten-minute video, renders them with FFmpeg and scores each for virality. Exports work, but subtitles are not burned in, the webcam-over-screen layout from Mike's skill is not integrated and the app is not live.",
    "whatYouBuild": "A local web app with video import, Whisper transcripts, AI clip detection, FFmpeg rendering, a virality score per clip, a simple editor, local export and batch export.",
    "toolsUsed": [
      "Codex",
      "OpenCode",
      "FFmpeg",
      "Whisper",
      "OpenAI API"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Compare the clips from Opus Clip, which hide the screen share, with the goal of a custom layout."
      },
      {
        "seconds": 105,
        "step": "Import a YouTube URL, download the video, extract audio and transcribe with Whisper."
      },
      {
        "seconds": 140,
        "step": "Render about nine clips from a ten-minute video with FFmpeg."
      },
      {
        "seconds": 158,
        "step": "Open the editor and read a virality score broken into hook, emotion, shareability, clarity and trend."
      },
      {
        "seconds": 201,
        "step": "Export a Short, which is stored on the local machine."
      },
      {
        "seconds": 255,
        "step": "Start integrating Mike's own webcam and subtitle skill so clips match the target layout."
      },
      {
        "seconds": 390,
        "step": "Fix a failing file upload with Codex and import a file from the computer."
      },
      {
        "seconds": 482,
        "step": "Outline plans for auto-publishing, batch exports and tiered pricing."
      }
    ],
    "notCovered": [
      "Burned-in animated subtitles and the webcam and screen layout, which are still unfinished.",
      "How the virality score is calculated. Mike says it is probably ChatGPT.",
      "A public release. The app runs locally and would need cloud storage such as S3.",
      "Pricing in practice. The plan is free up to $49 a month, and the YouTube publishing feature is not built."
    ],
    "qa": [
      {
        "q": "Is ShortForge available?",
        "a": "Not yet. It runs on Mike's computer, and he asks viewers to comment if they would use it."
      },
      {
        "q": "How long did ShortForge take to build?",
        "a": "About four hours so far with Codex and OpenCode, according to Mike."
      },
      {
        "q": "Why not use Opus Clip?",
        "a": "Mike found its clips show only the webcam and hide the screen share."
      }
    ]
  },
  "3X2VU7EyaEU": {
    "summary": "Set up a free self-hosted GEO and AEO tracker from GitHub that queries six AI models through Bright Data scrapers, then run an audit, add competitors and schedule checks every 12 hours. The audit gives readiness scores around 75 to 80 percent and lists fixes. Bright Data's free trial is used, and one run costs about two cents. Mike points to Trakkr as another tool.",
    "whatYouBuild": "A local dashboard from a GitHub repo with Bright Data keys, the Bright Data CLI and MCP in Claude Code, an AEO readiness audit, citation tracking, competitor tracking and a 12-hour auto-run schedule.",
    "toolsUsed": [
      "GEO AEO Tracker",
      "Bright Data",
      "Claude Code",
      "OpenRouter"
    ],
    "keySteps": [
      {
        "seconds": 83,
        "step": "Clone the repo, run npm install and put the skill in the Claude Code skills folder."
      },
      {
        "seconds": 105,
        "step": "Create a free Bright Data account and use its free trial credits for the scrapers."
      },
      {
        "seconds": 231,
        "step": "Install the Bright Data CLI and add its MCP to Claude Code, Cursor and Codex."
      },
      {
        "seconds": 324,
        "step": "Run an AEO audit, which shows 17 of 20 checks passing and a score near 75 percent for one article."
      },
      {
        "seconds": 389,
        "step": "Track brand mentions and citations across the six models over time."
      },
      {
        "seconds": 468,
        "step": "Add competitors and track prompts to generate niche queries."
      },
      {
        "seconds": 526,
        "step": "Use the generated queries to improve articles and set the auto-run to every 12 hours."
      }
    ],
    "notCovered": [
      "How accurate the scraped AI answers are, or whether Bright Data's terms cover scraping those chat products.",
      "Real changes in citations over time, since the tracker has only just started.",
      "Bright Data costs at scale. The video quotes a $500 a month plan and $1.50 per 1,000 records, and only about two cents spent.",
      "The project's maturity. The repo had about 108 stars at the time."
    ],
    "qa": [
      {
        "q": "Is the GEO AEO Tracker free?",
        "a": "The software is free and self-hosted, but it needs Bright Data credits for scraping, covered by a trial in the video."
      },
      {
        "q": "Which AI models does it query?",
        "a": "ChatGPT, Perplexity, Copilot, Gemini, Google AI and Grok."
      },
      {
        "q": "What did the audit find?",
        "a": "A score of 75 to 80 percent on the pages tested, with issues such as page size, inline JavaScript weight and a missing no-script fallback."
      }
    ]
  },
  "508QvEHI5n0": {
    "summary": "An opinion and pitch video arguing that AI automation, faceless video tools and no-code app builders are the skills to learn. Mike shares his background, says he built his agency site in Lovable in six to eight hours, and promotes Make.com, Syllaby and his community and consultation. No steps are taught and the claims about leverage and job loss are Mike's own.",
    "whatYouBuild": "Nothing is built. The video describes tools Mike uses and why he recommends learning them.",
    "toolsUsed": [
      "Make.com",
      "n8n",
      "Syllaby",
      "Lovable"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Hear why Mike teaches Make.com rather than n8n: a gentler learning curve for beginners."
      },
      {
        "seconds": 130,
        "step": "Hear how faceless video tools could have helped Mike monetize their channel sooner."
      },
      {
        "seconds": 185,
        "step": "Hear that no-code builders like Lovable, Bolt and Emergent remove the need to code."
      },
      {
        "seconds": 235,
        "step": "Hear how the agency site was built in Lovable in about six to eight hours."
      },
      {
        "seconds": 285,
        "step": "Hear why Make.com's thousands of templates and free plan suit beginners."
      }
    ],
    "notCovered": [
      "Any build or demo. The video is explanation and persuasion.",
      "Evidence for the claims that automation makes people irreplaceable or that AI is replacing jobs across every sector.",
      "Costs of hiring a virtual assistant versus automation, which Mike mentions without a clear figure.",
      "Limits of no-code builders for larger projects."
    ],
    "qa": [
      {
        "q": "Is there a tutorial in this video?",
        "a": "No. It is a talk about why to learn automation and no-code tools, ending with an offer of a free consultation."
      },
      {
        "q": "Why Make.com instead of n8n?",
        "a": "Make.com has a less steep learning curve for the beginners watching his channel, Mike says."
      },
      {
        "q": "How long did the agency site take?",
        "a": "About six to eight hours in total, with a first version in 10 to 15 minutes, per Mike."
      }
    ]
  },
  "DbYip6KaNHo": {
    "summary": "Connect the free DataForSEO MCP server from GitHub to Claude Code, pull keyword and AI mention data, and have Claude write an SEO audit report, implementation summary, keyword map and priority list for Mike's site. Codex then carries out the fixes, including less DOM bloat, product schema and render-blocking resources, and a Lighthouse run shows better desktop performance. Rankings are not shown, and the AI mention check returns a result Mike says is wrong.",
    "whatYouBuild": "A DataForSEO MCP install in Claude Code with generated audit files, followed by a Codex run of the fixes and a Lighthouse before and after check.",
    "toolsUsed": [
      "DataForSEO",
      "Claude Code",
      "Codex",
      "Lighthouse"
    ],
    "keySteps": [
      {
        "seconds": 41,
        "step": "Create a DataForSEO account, copy the API key, clone the MCP from GitHub, run npm install and add a .env file."
      },
      {
        "seconds": 105,
        "step": "Ask for search volume on the top keywords the domain ranks for, approving the ranked keywords tool."
      },
      {
        "seconds": 150,
        "step": "Check LLM mention metrics, which needs a 14-day trial and returns no tracked mentions."
      },
      {
        "seconds": 231,
        "step": "Generate an SEO audit report, implementation summary, keyword map and priority list."
      },
      {
        "seconds": 341,
        "step": "Review fixes such as reducing the DOM size and adding product schema."
      },
      {
        "seconds": 455,
        "step": "Use Codex with its plan skills to implement the fixes."
      },
      {
        "seconds": 520,
        "step": "Fix page speed issues and render-blocking resources."
      },
      {
        "seconds": 555,
        "step": "Run Lighthouse on desktop and mobile and see performance rise on desktop."
      }
    ],
    "notCovered": [
      "Search ranking or traffic changes. Only Lighthouse performance is rechecked.",
      "Mobile results, which are not read out.",
      "Why the AI mention check says nothing is tracked when Mike knows otherwise.",
      "DataForSEO costs beyond the free MCP and the trial."
    ],
    "qa": [
      {
        "q": "Is the MCP free?",
        "a": "Mike says the MCP server on GitHub is free. The data itself needs a DataForSEO account, and the LLM mention module needed a 14-day trial."
      },
      {
        "q": "What files does Claude write?",
        "a": "An SEO audit report, an implementation summary, a keyword map and an SEO issues priority list."
      },
      {
        "q": "Did it fix the SEO?",
        "a": "It applied performance and schema fixes, and desktop performance went up. Whether rankings improved is not shown."
      }
    ]
  },
  "LD2ef2uUauo": {
    "summary": "A first try of Grok 4.5 and the Grok command line tool, using a documentation prompt to build a single-file solar system app with satellites and asteroids from real-time data. Prices of $2 and $6 per million tokens and benchmark rankings are from xAI's article. The app works with some visual glitches, and the free daily usage limit is reached before Mike can finish.",
    "whatYouBuild": "A single index.html solar system with zoom, orbit and label controls, plus satellites and asteroids pulled from public catalog data such as CelesTrak.",
    "toolsUsed": [
      "Grok 4.5",
      "Grok CLI",
      "CelesTrak"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Read xAI's benchmark claims against Opus 4.8, Fable 5 and GPT 5.5."
      },
      {
        "seconds": 91,
        "step": "Note the price of $2 per million input tokens and $6 per million output tokens."
      },
      {
        "seconds": 120,
        "step": "Install the Grok CLI with the curl command and bring over existing skills."
      },
      {
        "seconds": 185,
        "step": "Ask it to add satellites and asteroids from real-time data, which it fetches from public sources."
      },
      {
        "seconds": 216,
        "step": "Test orbit controls, the pause slider and focus on Earth and Mars."
      },
      {
        "seconds": 252,
        "step": "Skim the voice and Imagine API overview."
      },
      {
        "seconds": 415,
        "step": "Hit the free usage limit and consider the $30 Super Grok plan."
      }
    ],
    "notCovered": [
      "Independent checks of xAI's benchmark and token efficiency claims.",
      "Labels for satellites, and fixes for glitches such as labels showing through the sun.",
      "The voice and image APIs beyond a quick look.",
      "A fair comparison with other coding agents. This is Mike's first use of Grok."
    ],
    "qa": [
      {
        "q": "What does Grok 4.5 cost?",
        "a": "$2 per million input tokens and $6 per million output tokens, according to the article shown."
      },
      {
        "q": "Where does the satellite data come from?",
        "a": "The agent pulled it from public sources including CelesTrak, NASA and JPL, per the video."
      },
      {
        "q": "Why did the demo stop?",
        "a": "Mike reached the free daily usage limit, and upgrading would cost about $30 a month."
      }
    ]
  },
  "bAgP_0uW0dY": {
    "summary": "Improve the title and description of a YouTube video with a popular ChatGPT custom GPT for YouTube SEO, then recreate the same format with the OpenAI API when free usage runs out. Mike edits the description, tests a title with a vidIQ score, tries Nano Banana on the thumbnail and advises changing one thing at a time. No view results are shown. The links in the description include affiliate links.",
    "whatYouBuild": "An SEO description and title for one video, made with a custom GPT and a custom assistant that keeps the same format, then pasted into YouTube Studio.",
    "toolsUsed": [
      "ChatGPT",
      "OpenAI API",
      "vidIQ",
      "Nano Banana",
      "YouTube Studio"
    ],
    "keySteps": [
      {
        "seconds": 23,
        "step": "Search ChatGPT's GPT store for YouTube SEO and open the most used one."
      },
      {
        "seconds": 49,
        "step": "Ask for an SEO description from a video title and choose the keyword-dense version."
      },
      {
        "seconds": 107,
        "step": "Paste it into YouTube Studio and edit it by hand."
      },
      {
        "seconds": 204,
        "step": "Plan to check analytics after about a week."
      },
      {
        "seconds": 277,
        "step": "Use a custom assistant on the API when the GPT plan runs out, fixing its output format."
      },
      {
        "seconds": 366,
        "step": "Test titles with the vidIQ score and keep the version that scores higher."
      },
      {
        "seconds": 477,
        "step": "Try Nano Banana on a thumbnail, then keep the original to change one thing at a time."
      },
      {
        "seconds": 668,
        "step": "Add timestamps and links to the description."
      }
    ],
    "notCovered": [
      "Whether views or ranking improved. Mike says to check back in a week or two.",
      "How reliable the vidIQ score is for predicting performance.",
      "Fact checking the description text the GPT writes.",
      "A controlled test, since only one video is changed and without a comparison."
    ],
    "qa": [
      {
        "q": "Why change only one thing at a time?",
        "a": "So you can tell whether the title, description or thumbnail caused a change in views."
      },
      {
        "q": "What if free ChatGPT usage runs out?",
        "a": "Mike builds a custom assistant with the OpenAI API and the same prompt format."
      },
    ]
  },
  "3j4YyYFRQKU": {
    "summary": "A Make.com scenario that posts a daily AI-generated image and caption to a Facebook page: ChatGPT writes a visual post of under 150 words, DALL-E 3 makes the image, an HTTP step fetches the file and a Facebook step publishes a photo post, scheduled for 10 am. Mike built it in about 20 minutes. The first run errors and a retry works. The engagement benefit is Mike's expectation. The Make.com link is an affiliate link.",
    "whatYouBuild": "A Make.com scenario with an OpenAI chat completion, a DALL-E 3 image, a set variable step, an HTTP get-file step and a Facebook Pages post with photos, set to run daily.",
    "toolsUsed": [
      "Make.com",
      "OpenAI API",
      "DALL-E 3",
      "Facebook"
    ],
    "keySteps": [
      {
        "seconds": 77,
        "step": "Add an OpenAI create-completion module with an API key and a prompt for a short, visually descriptive post."
      },
      {
        "seconds": 113,
        "step": "Choose the ChatGPT 4o model and enter the prompt."
      },
      {
        "seconds": 205,
        "step": "Add a second OpenAI module that creates an image with DALL-E 3 from the first output."
      },
      {
        "seconds": 285,
        "step": "Add an HTTP step that downloads the image from its URL."
      },
      {
        "seconds": 332,
        "step": "Replace the plain post module with Create a Post with Photos for a Facebook page."
      },
      {
        "seconds": 416,
        "step": "Run once, see an error, then run again and get the post."
      },
      {
        "seconds": 461,
        "step": "Schedule the scenario to run daily at 10 am Bangkok time."
      }
    ],
    "notCovered": [
      "Evidence that engagement rises over time. Mike only says it will.",
      "Facebook's rules on automated or AI-generated content, and labeling of AI images.",
      "Costs of the OpenAI calls and images per day.",
      "Quality control, since posts are published without review."
    ],
    "qa": [
      {
        "q": "How long did the Make.com Facebook posting scenario take to build?",
        "a": "About 20 minutes, according to Mike."
      },
      {
        "q": "Why use the Facebook with-photos module?",
        "a": "The plain post module does not upload an image, so Mike swaps it for Create a Post with Photos."
      },
    ]
  },
  "1aG1XbAQj-k": {
    "summary": "A rundown of Anthropic's Claude Opus 5 from the company's press release and benchmark pages. Anthropic says it comes close to Fable 5 on coding and knowledge work at about half the price, $5 per million input tokens and $25 for output, with a 1 million token context window. Mike has not yet tested it. All performance and safety claims are Anthropic's.",
    "whatYouBuild": "Nothing is built. The video reviews price, benchmarks and examples from the launch post, and Mike's RTK token savings.",
    "toolsUsed": [
      "Claude Opus 5",
      "Claude Code",
      "RTK"
    ],
    "keySteps": [
      {
        "seconds": 26,
        "step": "Read the press release and price comparison with Fable 5, Sonnet 5 and Haiku."
      },
      {
        "seconds": 79,
        "step": "Review benchmark charts against Fable 5, Opus 4.8 and GPT 5.6 Sol."
      },
      {
        "seconds": 121,
        "step": "See an independent speed, intelligence and price chart that has it slower than Fable 5."
      },
      {
        "seconds": 195,
        "step": "Read coding benchmark claims on Frontier Bench and Cursor Bench."
      },
      {
        "seconds": 246,
        "step": "See RTK reporting about 67 percent token savings."
      },
      {
        "seconds": 287,
        "step": "Read Anthropic's examples: rebuilding a part from raw pixels, fixing a package manager bug and building a market data feed."
      },
      {
        "seconds": 404,
        "step": "Read the alignment and misuse resistance claims."
      }
    ],
    "notCovered": [
      "Mike's own tests. He is waiting for usage credits to reset.",
      "Independent verification of the benchmark scores and example stories, which come from Anthropic.",
      "Cyber security tasks, where Anthropic says Opus 5 stays behind Mythos 5.",
      "How much quota Opus 5 uses in practice, other than the remark that it uses about twice as much as Sonnet."
    ],
    "qa": [
      {
        "q": "What does Opus 5 cost?",
        "a": "$5 per million input tokens and $25 per million output tokens, against $10 and $50 for Fable 5."
      },
      {
        "q": "Who gets it?",
        "a": "It is the default model on Claude Max and the strongest on Claude Pro, per the press release."
      },
      {
        "q": "Is it smarter than Fable 5?",
        "a": "Anthropic says it comes close, and one independent chart in the video has it one point ahead, but it is slower."
      }
    ]
  },
  "F5PwcTwtEos": {
    "summary": "A news reaction to Anthropic's report that a US export control directive forced it to suspend access to Fable 5 and Mythos 5 for all foreign nationals, inside or outside the US. Mike reads Anthropic's statement, which complies but disagrees, and adds speculation about causes that is not supported in the video. The title says banned, but the report describes a suspension for foreign nationals. A later video covers its return.",
    "whatYouBuild": "Nothing is built. The video summarizes the directive, Anthropic's response, the earlier call for a pause on frontier AI development and reactions.",
    "toolsUsed": [
      "Claude Fable 5",
      "Claude"
    ],
    "keySteps": [
      {
        "seconds": 63,
        "step": "Read the details of the export control directive from Anthropic's statement."
      },
      {
        "seconds": 101,
        "step": "Read Anthropic's disagreement, which says it received only verbal evidence of a possible jailbreak."
      },
      {
        "seconds": 143,
        "step": "Hear Anthropic's view that the same capability is available in other public models."
      },
      {
        "seconds": 187,
        "step": "Hear about the company's June 4 post calling for a pause on frontier AI development."
      },
      {
        "seconds": 233,
        "step": "Note that Fable 5 could roll back to Opus 4.8 for sensitive requests."
      },
      {
        "seconds": 339,
        "step": "See reports of the effect on pre-IPO share prices."
      }
    ],
    "notCovered": [
      "Independent confirmation of the directive's details or the existence of the jailbreak.",
      "How the restriction is checked or enforced for individual users.",
      "Mike's suggestion that politics or the Pentagon played a part, which is speculation.",
      "What happened next. Another video covers Fable 5's return after the controls were lifted."
    ],
    "qa": [
      {
        "q": "Was Fable 5 banned?",
        "a": "According to Anthropic's statement as read in the video, access was suspended for foreign nationals under a US export control directive."
      },
      {
        "q": "What does Anthropic say?",
        "a": "It is complying but strongly disagrees, and says the claimed jailbreak evidence is weak."
      },
      {
        "q": "Is the share price claim verified?",
        "a": "No. It comes from news coverage quoted in the video, not from Mike's own check."
      }
    ]
  },
  "FBlN3qWR9kg": {
    "summary": "A hands-on tour of ChatGPT Images 2.0 right after launch: OpenAI's sample prompts, the selection tool for editing part of an image, a caricature from a selfie, an aspect ratio change, a house blueprint from a photo, a sketch turned photorealistic and a book back cover whose generated ISBN barcode scans to the right listing. The leaderboard lead over Nano Banana Pro 2 is a claim from the video, and results vary between runs.",
    "whatYouBuild": "Images made in ChatGPT's image mode, including selection edits that change hair color and swap animals, plus a scannable ISBN image.",
    "toolsUsed": [
      "ChatGPT Images 2.0",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 15,
        "step": "Hear the claim that Images 2.0 leads Nano Banana Pro 2 by about 242 points on a leaderboard."
      },
      {
        "seconds": 35,
        "step": "Browse OpenAI's gallery for text, multilingual and logic examples."
      },
      {
        "seconds": 121,
        "step": "Open image creation mode in ChatGPT and run OpenAI's sample prompts, which give similar but different results."
      },
      {
        "seconds": 223,
        "step": "Select part of an image to change the hair color and replace rabbits with elephants."
      },
      {
        "seconds": 338,
        "step": "Turn a selfie into a caricature that includes a Boba Fett shirt."
      },
      {
        "seconds": 400,
        "step": "Change the aspect ratio from portrait to landscape."
      },
      {
        "seconds": 423,
        "step": "Create a house blueprint from a photo."
      },
      {
        "seconds": 471,
        "step": "Turn a simple sketch into a photorealistic portrait."
      },
      {
        "seconds": 511,
        "step": "Recreate a book back cover so the generated ISBN barcode scans to the right Amazon page."
      }
    ],
    "notCovered": [
      "Independent confirmation of the leaderboard scores.",
      "The accuracy of the house blueprint, since Mike says he is not an architect.",
      "Privacy of uploading selfies and photos, and rights questions around reproducing a book cover or copyrighted characters.",
      "A repeatable test. OpenAI's sample prompts do not reproduce its gallery images."
    ],
    "qa": [
      {
        "q": "What can the selection tool do?",
        "a": "You select an area of a generated image and describe a change, such as hair color or replacing objects, and ChatGPT edits only that part."
      },
      {
        "q": "Do OpenAI's sample prompts give the same images?",
        "a": "No. The results are similar in style but different characters and scenes."
      },
      {
        "q": "Did the ISBN trick work?",
        "a": "Yes in the demo. Scanning the generated barcode opened the right book listing."
      }
    ]
  },
  "qA683UQVDt4": {
    "summary": "A Make.com scenario that updates YouTube video descriptions automatically: it reads records with status to-do from Airtable, fetches each transcript with Dumpling AI, asks a custom OpenAI assistant to write an SEO description from a template, updates the video through the YouTube module and marks the Airtable record done. An OpenAI credit error is fixed with a $6 top-up. The scenario runs every five minutes and titles are not changed. The template costs $15.",
    "whatYouBuild": "A Make.com scenario with an Airtable search, a Dumpling AI transcript step, an OpenAI assistant message, a YouTube video update and an Airtable status update, scheduled every five minutes.",
    "toolsUsed": [
      "Make.com",
      "Airtable",
      "Dumpling AI",
      "OpenAI API",
      "YouTube"
    ],
    "keySteps": [
      {
        "seconds": 35,
        "step": "Set up an Airtable table with the title, YouTube URL, video ID, description template, description and status."
      },
      {
        "seconds": 101,
        "step": "Search records with status to-do, limited to one video at a time."
      },
      {
        "seconds": 171,
        "step": "Get the video transcript with the Dumpling AI module."
      },
      {
        "seconds": 184,
        "step": "Message a custom OpenAI assistant that writes a description from the transcript and a template."
      },
      {
        "seconds": 274,
        "step": "Update the video's description with the YouTube module using the video ID."
      },
      {
        "seconds": 363,
        "step": "Hit a quota error from OpenAI and top up the balance."
      },
      {
        "seconds": 454,
        "step": "Run the scenario and confirm the description and timestamps on YouTube."
      },
      {
        "seconds": 577,
        "step": "Switch the scenario on to run every five minutes."
      }
    ],
    "notCovered": [
      "Review before publishing. The scenario overwrites live descriptions automatically and Mike still edits some by hand.",
      "Changes to titles, which are left manual.",
      "Results from the new descriptions, such as views or subscribers.",
      "YouTube API quota or per-run costs for the AI and transcript calls."
    ],
    "qa": [
      {
        "q": "Why is there a status field?",
        "a": "So only to-do videos are processed, and each is marked done so it is not updated again."
      },
      {
        "q": "Why did the first run fail?",
        "a": "OpenAI reported an exceeded quota because the account balance was negative. Adding $6 fixed it."
      },
      {
        "q": "Where can I get the Make.com YouTube description template?",
        "a": "Mike sells it for $15, he says in the video."
      }
    ]
  },
  "L_dAm5Xh-fQ": {
    "summary": "Build a local dashboard that shows token usage, estimated cost and token savings across coding tools, using the free ccusage command line tool and a Python server written with Codex and Hermes Agent. It reads daily usage by model and tool, shows RTK, Ponytail and Caveman savings and refreshes every 60 seconds. The cost figures are estimates at API rates, not what a subscription plan actually charges.",
    "whatYouBuild": "A Python server on localhost that wraps ccusage output and RTK stats in a dashboard with daily, weekly and monthly breakdowns by model and tool.",
    "toolsUsed": [
      "ccusage",
      "Codex",
      "Hermes Agent",
      "RTK",
      "Supermemory"
    ],
    "keySteps": [
      {
        "seconds": 74,
        "step": "Meet ccusage, a free tool that reads usage from Claude Code, Codex, OpenCode, Hermes and Copilot."
      },
      {
        "seconds": 103,
        "step": "Look at the local Python server that serves the dashboard."
      },
      {
        "seconds": 143,
        "step": "Ask Hermes Agent, on DeepSeek V4 Pro, to read the ccusage docs and improve the script."
      },
      {
        "seconds": 166,
        "step": "Run npx ccusage latest and its per-tool commands."
      },
      {
        "seconds": 198,
        "step": "Read daily usage and cost by model."
      },
      {
        "seconds": 266,
        "step": "Compare rtk gain with the dashboard's savings numbers."
      },
      {
        "seconds": 309,
        "step": "See savings from Caveman and Ponytail alongside RTK."
      },
      {
        "seconds": 365,
        "step": "Restart the server after a failed to fetch error so the updated dashboard loads."
      }
    ],
    "notCovered": [
      "How ccusage prices subscription usage. The roughly $1,600 and $1,000 monthly figures for Claude Code and Codex are estimates at API prices, not real charges.",
      "Independent measurement of the token savings, which come from the tools' own reports.",
      "Securing the local server or exposing it beyond one machine.",
      "The Supermemory and Graphify tools mentioned at the end, which are not shown working."
    ],
    "qa": [
      {
        "q": "Is ccusage free?",
        "a": "Yes. It is a free command line tool, run with npx."
      },
      {
        "q": "Did Mike really spend $4,000 on tokens?",
        "a": "No. Mike says it is not the real cost, because he uses subscription plans and no API credits."
      },
      {
        "q": "How much have the savings tools saved?",
        "a": "The dashboard shows about 35 million tokens from RTK, 8 million from Ponytail and 2.4 million from Caveman."
      }
    ]
  },
  "9WPazkEp7VU": {
    "summary": "Use CrowdReply, an AI search visibility platform with an MCP server, to see where Mike's site is cited by ChatGPT, Gemini, Claude and Perplexity and to feed that data into Codex. The dashboard and MCP show citation records, competitor visibility, sentiment and tracked keywords, and Codex writes reports and applies fixes before a push to Vercel. The video shows a 7-day trial and plans from $99 a month. The paid backlink marketplace is described but not used.",
    "whatYouBuild": "CrowdReply's MCP connected to Codex to pull 178 citation records, competitor data and keyword reports, followed by fixes committed to GitHub and deployed on Vercel.",
    "toolsUsed": [
      "CrowdReply",
      "Codex",
      "Vercel"
    ],
    "keySteps": [
      {
        "seconds": 60,
        "step": "Review the platform's features: AI visibility tracking, social listening and a backlink marketplace."
      },
      {
        "seconds": 114,
        "step": "Walk through the dashboard with competitor visibility, mention coverage and top citations."
      },
      {
        "seconds": 218,
        "step": "Browse the AI backlinks marketplace with domain traffic and prices, such as $98 and $589 links."
      },
      {
        "seconds": 325,
        "step": "Connect the CrowdReply MCP to Codex with a short prompt."
      },
      {
        "seconds": 378,
        "step": "Pull citation data into Codex, which finds 178 citation records across 15 responses."
      },
      {
        "seconds": 436,
        "step": "Ask for an implementation plan to increase citations."
      },
      {
        "seconds": 494,
        "step": "Compare competitors on visibility, which is 25 percent against 65 and 75 percent for two rivals, and on sentiment."
      },
      {
        "seconds": 590,
        "step": "Pull tracked keyword and prompt reports via the MCP."
      },
      {
        "seconds": 750,
        "step": "Implement the fixes and commit and push to deploy."
      }
    ],
    "notCovered": [
      "Whether the fixes raise citations over the following weeks.",
      "Buying backlinks. Mike browses the marketplace but does not purchase, and paid links can conflict with search engine guidelines.",
      "Consistent figures. Mike's visibility rank is shown as both fifth of eleven and third, and sentiment is early data.",
      "Pricing beyond the quoted 7-day trial and $99 a month starting plan."
    ],
    "qa": [
      {
        "q": "What does the MCP give Codex?",
        "a": "Live citation records, competitor visibility, sentiment and keyword reports from CrowdReply, so fixes can be planned from real data."
      },
      {
        "q": "Did Mike buy backlinks?",
        "a": "No. They looked at the marketplace's prices and domain data and said few sites fit their niche."
      },
      {
        "q": "How is Mike's site doing?",
        "a": "Second in citations behind YouTube, with 25 percent visibility against 65 and 75 percent for two competitors, per the dashboard."
      }
    ]
  },
  "TZxNymn9msU": {
    "summary": "A scripted-style overview of five AI automation tools for business in 2025: ChatGPT, Google Gemini, Lindy, Microsoft Power Automate and a fifth enterprise platform whose name is garbled in the transcript. Each gets a general description and use cases, followed by advice on choosing by company size and tech stack. There are no demos, prices or evidence for the savings claims.",
    "whatYouBuild": "Nothing is built. It is a narrated list of tools and use cases.",
    "toolsUsed": [
      "ChatGPT",
      "Google Gemini",
      "Lindy",
      "Microsoft Power Automate"
    ],
    "keySteps": [
      {
        "seconds": 66,
        "step": "Hear how ChatGPT is used for customer service, content and reports."
      },
      {
        "seconds": 156,
        "step": "Hear how Gemini fits Google Workspace for data insights and research."
      },
      {
        "seconds": 253,
        "step": "Hear how Lindy builds no-code AI agents for sales and support."
      },
      {
        "seconds": 362,
        "step": "Hear how Power Automate suits regulated enterprise processes."
      },
      {
        "seconds": 480,
        "step": "Hear about a fifth platform for intelligent, predictive automation."
      },
      {
        "seconds": 599,
        "step": "Get advice on choosing by business size, industry and existing tools."
      }
    ],
    "notCovered": [
      "Demos, screenshots or hands-on testing of any tool.",
      "Prices, limits or setup steps.",
      "Evidence for claims such as saving thousands of hours.",
      "The correct name of the fifth platform, which the transcript spells inconsistently."
    ],
    "qa": [
      {
        "q": "Which tool is suggested for small teams without developers?",
        "a": "Lindy, for its no-code approach and quick setup."
      },
      {
        "q": "Which fits a Google Workspace business?",
        "a": "Gemini, because of its integration with Google apps."
      },
      {
        "q": "Is anything shown working?",
        "a": "No. The tools are described, but none of them is run."
      }
    ]
  },
  "zWM4AjUto2A": {
    "summary": "A three-minute list of five AI automation ideas for a business: customer service chatbots, email triage, invoice processing, content and social media automation, and no-code workflow automation. It names no tools and shows no demos. The claim that chatbots can resolve up to 80 percent of routine questions is stated without a source.",
    "whatYouBuild": "Nothing is built. It only lists automation ideas.",
    "toolsUsed": [],
    "keySteps": [
      {
        "seconds": 21,
        "step": "Customer service chatbots and virtual assistants for routine questions."
      },
      {
        "seconds": 46,
        "step": "Email filtering, categorizing and automated replies to common questions."
      },
      {
        "seconds": 74,
        "step": "Invoice processing, verification and recording."
      },
      {
        "seconds": 98,
        "step": "Content creation and scheduled posting across social platforms."
      },
      {
        "seconds": 122,
        "step": "No-code platforms that run business workflows without programming."
      }
    ],
    "notCovered": [
      "Which tools to use or how to build any of the automations.",
      "A source for the 80 percent figure.",
      "Costs, risks or accuracy of invoice and email automation.",
      "Any demonstration."
    ],
    "qa": [
      {
        "q": "Does the video show how to build these?",
        "a": "No. It lists the ideas in general terms."
      },
      {
        "q": "What is the main claim?",
        "a": "That chatbots can resolve up to 80 percent of routine customer questions, with no source given."
      },
      {
        "q": "Who is it for?",
        "a": "Small businesses wanting to save time, as the video frames it."
      }
    ]
  },
  "KDZ7yefRv54": {
    "summary": "Make an infographic from a YouTube video with Google's NotebookLM in about a minute or two, then compare it with Mike's own n8n workflow that calls Nano Banana Pro through KIE. Mike finds the n8n version more detailed with cleaner text, but NotebookLM is quicker for a one-off. The n8n template is in Mike's paid community tiers.",
    "whatYouBuild": "A NotebookLM notebook from a YouTube URL with a generated infographic, compared against an n8n workflow that writes an infographic, a LinkedIn post and a newsletter.",
    "toolsUsed": [
      "NotebookLM",
      "n8n",
      "Nano Banana Pro",
      "KIE",
      "Google Drive"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Add a YouTube URL as a source in NotebookLM and read the summary."
      },
      {
        "seconds": 90,
        "step": "Choose the infographic option and wait for it to generate."
      },
      {
        "seconds": 135,
        "step": "See other NotebookLM outputs: slide decks, reports, audio overviews and mind maps."
      },
      {
        "seconds": 180,
        "step": "Run the n8n automation on the same video, which uses KIE's Nano Banana Pro and saves to Google Drive."
      },
      {
        "seconds": 270,
        "step": "Compare the two infographics, where the Nano Banana Pro one is more detailed."
      },
      {
        "seconds": 315,
        "step": "Hear where the template is offered in Mike's community."
      }
    ],
    "notCovered": [
      "Which model NotebookLM uses, which Mike does not know.",
      "A timed, side-by-side test. The comparison is Mike's impression from one video.",
      "Checking that either infographic matches the video's content.",
      "The cost of KIE credits per image."
    ],
    "qa": [
      {
        "q": "Which is better, NotebookLM or the n8n workflow?",
        "a": "Mike prefers his own workflow for detail, and NotebookLM for quick one-off infographics."
      },
      {
        "q": "Is NotebookLM free?",
        "a": "It is free to get started, Mike says."
      },
      {
        "q": "Where is the n8n infographic workflow template?",
        "a": "In the templates section of Mike's Skool community, for paid members."
      }
    ]
  },
  "rPhyYNMuDT4": {
    "summary": "A look at the n8n 2.0 beta announced on December 8, 2025, after updating a self-hosted instance on a Hostinger VPS. Mike notes a cleaner look, easier movement between nodes, a new execution spinner, a resizable sidebar and a separate publish step. He finds the new features somewhat underwhelming, and shows updating with a Docker pull and docker compose up. Security and performance changes are only mentioned.",
    "whatYouBuild": "An n8n instance updated to the 2.0 beta with Docker, then a tour of its interface changes on existing workflows.",
    "toolsUsed": [
      "n8n",
      "Hostinger",
      "Docker"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "See the refreshed interface and easier navigation between nodes."
      },
      {
        "seconds": 80,
        "step": "Watch executions with the new spinner, resize the sidebar and see the publish step that separates saving from going live."
      },
      {
        "seconds": 200,
        "step": "Update the Hostinger VPS by pulling the 2.0 beta image and restarting with docker compose up -d."
      },
      {
        "seconds": 250,
        "step": "Read the announcement's notes on secure-by-default execution and performance."
      }
    ],
    "notCovered": [
      "Breaking changes and how to migrate workflows safely, or taking a backup before updating.",
      "A before and after comparison, since the instance was already updated.",
      "Details of the security and speed improvements, which are mentioned but not tested.",
      "Whether the beta is stable enough for production workflows."
    ],
    "qa": [
      {
        "q": "What is the biggest change?",
        "a": "Mike picks easier switching between nodes, and also mentions the publish step as a safer way to push changes live."
      },
      {
        "q": "How do you update on a VPS?",
        "a": "Pull the 2.0 beta image tag with Docker and restart the container with docker compose up -d."
      },
      {
        "q": "Is it worth upgrading?",
        "a": "Mike calls it a positive step but a little underwhelming for new capabilities."
      }
    ]
  },
  "e73WvglCLW0": {
    "summary": "A demo of VisiScan, Mike's own AI search visibility tool. A free scan gives a readiness score and visibility across ChatGPT, Claude, Perplexity and Gemini, and a one-time $79 full report checks 30 or more signals and is generated through Codex. Mike's own site scores 56 out of 100, and two other businesses' results are shown as examples. This is a product demo of his own tool, so the results are not independently validated.",
    "whatYouBuild": "Nothing is built live. The video shows a domain scan, example audits and a full PDF report from Mike's tool.",
    "toolsUsed": [
      "VisiScan",
      "Codex"
    ],
    "keySteps": [
      {
        "seconds": 28,
        "step": "Enter a domain for the free scan, with a full report available for a one-time $79."
      },
      {
        "seconds": 65,
        "step": "Read the readiness and visibility scores across the four AI models."
      },
      {
        "seconds": 86,
        "step": "Look at an example site with zero visibility despite a decent readiness score."
      },
      {
        "seconds": 126,
        "step": "Look at a hosting company's audit results as another example."
      },
      {
        "seconds": 157,
        "step": "See what is audited: localized buyer questions to the four AIs and 30 or more signals."
      },
      {
        "seconds": 188,
        "step": "Check llms.txt, AI crawler access, sitemap and robots.txt."
      },
      {
        "seconds": 266,
        "step": "Generate the full report in Codex, which runs 12 questions and 30 signal checks."
      },
      {
        "seconds": 294,
        "step": "Preview the PDF full report."
      }
    ],
    "notCovered": [
      "Proof that fixing the flagged items raises visibility.",
      "How the scores compare with other tools or with the real answers people see.",
      "The permission of businesses whose scan results are shown as examples.",
      "The accuracy of results from only 12 questions per run."
    ],
    "qa": [
      {
        "q": "What does the free scan give?",
        "a": "A readiness score and visibility across ChatGPT, Claude, Perplexity and Gemini for the domain you enter."
      },
      {
        "q": "What is in the $79 report?",
        "a": "A one-time full report with the signal checks and fixes, including entity presence, citations, schema, crawler access and technical health."
      },
      {
        "q": "How did Mike's own site score in VisiScan?",
        "a": "56 out of 100 on readiness, with room to improve."
      }
    ]
  },
  "dILjZszMZ5o": {
    "summary": "A 98-second promotional pitch for Mike's free Skool community, arguing that businesses should automate scheduling, invoicing, customer inquiries and data entry with AI before competitors do. It names no tools, shows no demo and gives no evidence for its claims about cost savings or error rates.",
    "whatYouBuild": "Nothing is built. The video invites viewers to join a free community to learn automations.",
    "toolsUsed": [
      "Skool"
    ],
    "keySteps": [
      {
        "step": "Hear the problem: repetitive tasks that eat time and profit."
      },
      {
        "step": "Hear the pitch that AI automations can cut costs and reliance on extra staff."
      },
      {
        "step": "Hear the call to join the free community."
      }
    ],
    "notCovered": [
      "Any specific automation, tool or example.",
      "Evidence for claims that AI agents rarely make mistakes or that competitors are already using them.",
      "What members actually learn or get inside the community."
    ],
    "qa": [
      {
        "q": "Is there a tutorial here?",
        "a": "No. It is a short advertisement for the free community."
      },
      {
        "q": "Did the Skool community cost anything to join?",
        "a": "Joining the community is free, according to the video."
      },
      {
        "q": "Which tools are covered?",
        "a": "None are named."
      }
    ]
  },
  "OPQacEy41kM": {
    "summary": "A walkthrough of Mike's new Skool community about two weeks after launch, with almost 200 members and a classroom of free tutorials and paid products. Mike says upsells earned about $500 against Skool's $99 a month fee and that it ranks on page six of the tech category. These figures are Mike's own, and one spoken coaching price is unclear.",
    "whatYouBuild": "Nothing is built. The video shows a community feed, a classroom with free guides and paid courses, templates and consultation offers.",
    "toolsUsed": [
      "Skool",
      "Make.com"
    ],
    "keySteps": [
      {
        "seconds": 25,
        "step": "See the free tutorials the community shares from Mike's YouTube channel."
      },
      {
        "seconds": 45,
        "step": "Look at member introductions and how Mike replies quickly to build engagement."
      },
      {
        "seconds": 79,
        "step": "Hear how members find the community through Skool's marketplace and how Mike joins other communities."
      },
      {
        "seconds": 137,
        "step": "Tour the classroom: start here, free how-to guides and paid items such as a $39 beginner course, a $97 template pack and a $197 n8n agent pack."
      },
      {
        "seconds": 235,
        "step": "See the other offers: a book, mentorship calls, a $150 consultation and a high-ticket coaching program."
      }
    ],
    "notCovered": [
      "Verification of the roughly $500 in upsells or the page six ranking.",
      "The coaching program's price, which is spoken unclearly.",
      "Whether the community stayed profitable after the first weeks.",
      "How the free-first model compares with other Skool setups."
    ],
    "qa": [
      {
        "q": "How big was the AI Automation Station Skool community?",
        "a": "Almost 200 members after about two weeks, according to Mike."
      },
      {
        "q": "How does it make money?",
        "a": "Through paid items in the classroom, such as courses, templates, consultations and coaching."
      },
      {
        "q": "What does Skool cost?",
        "a": "$99 a month, Mike says, and the upsells had already covered it."
      }
    ]
  },
  "-viL36QDF_8": {
    "summary": "A first look at Google's Gemini 3 in Google AI Studio, shortly after its November 18, 2025 release. Mike reads the benchmark charts, has it redesign his landing page, builds a merch mockup app from a client's logo and deploys it to Google Cloud, and browses a gallery game. The landing page misses some details, and the claim that these tools will replace software engineers is Mike's opinion.",
    "whatYouBuild": "A redesigned landing page and a logo-to-mockup web app made in Google AI Studio with Gemini 3, with the mockup app deployed to Google Cloud.",
    "toolsUsed": [
      "Gemini 3",
      "Google AI Studio",
      "Google Cloud",
      "Lovable"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Read Google's benchmark charts against Claude Sonnet 4.5 and GPT 5.1."
      },
      {
        "seconds": 80,
        "step": "Ask Gemini 3 to rebuild an existing landing page with a new color scheme."
      },
      {
        "seconds": 130,
        "step": "Use a mockup app that puts an uploaded logo on products and signage."
      },
      {
        "seconds": 190,
        "step": "Deploy the app to Google Cloud and compare the new landing page with the earlier Lovable version."
      },
      {
        "seconds": 250,
        "step": "Hear Mike's view that such tools will replace developers."
      },
      {
        "seconds": 300,
        "step": "Play a Voxel toy box demo from the AI Studio gallery."
      }
    ],
    "notCovered": [
      "A fair comparison with the Lovable site, which took 8 to 10 hours. The Gemini page needs button wiring and missed some details.",
      "Independent benchmark checks. The charts come from Google's press release.",
      "Evidence for the claim about layoffs and replacing engineers.",
      "Cloud costs of the deployed mockup app."
    ],
    "qa": [
      {
        "q": "How fast was the landing page?",
        "a": "Gemini 3 built a first version in about a minute, though it did not get everything right."
      },
      {
        "q": "Can you deploy from AI Studio?",
        "a": "Yes, Mike creates a Google Cloud project and deploys the mockup app from AI Studio."
      },
      {
        "q": "Does it beat ChatGPT?",
        "a": "On the press release charts shown, it scores higher than Sonnet 4.5 and GPT 5.1, but those are Google's figures."
      }
    ]
  },
  "wZ76glbPIPc": {
    "summary": "Set up n8n on a Hostinger VPS: choose a KVM plan, pick the n8n template with 100 included workflows, pay about $10.69 for one month, and open n8n from the control panel. Mike prices Hostinger from $5 a month against about $24 for n8n's cloud, creates an account, claims a free license key and imports a template. Backups, updates, HTTPS and hardening are not covered, and whether the Hostinger link is an affiliate link is not stated.",
    "whatYouBuild": "A Hostinger VPS running n8n on Ubuntu 24.04 in a Malaysia data center, with a bundled set of 100 workflows and an imported template.",
    "toolsUsed": [
      "Hostinger",
      "n8n"
    ],
    "keySteps": [
      {
        "seconds": 32,
        "step": "Compare Hostinger KVM plans, from $5 a month for one core and 4 GB of RAM to a $6.50 popular plan."
      },
      {
        "seconds": 180,
        "step": "Choose a one-month term, the Malaysia location for lower latency, and the n8n template with 100 workflows."
      },
      {
        "seconds": 252,
        "step": "Finish the VPS setup, set a root password, keep the free malware scanner on and open n8n with Manage App."
      },
      {
        "seconds": 349,
        "step": "Create the owner account, claim the free license key and import a template from n8n's site."
      }
    ],
    "notCovered": [
      "Backups, updates, a custom domain with HTTPS and securing the server.",
      "Long-term prices. The video buys one month, and promotional rates may renew higher.",
      "Connecting credentials to make the imported workflows run.",
      "Whether the description link is an affiliate link."
    ],
    "qa": [
      {
        "q": "How much did the Hostinger n8n VPS cost?",
        "a": "Mike was charged $10.69 for one month with the n8n and 100 workflows option."
      },
      {
        "q": "Why not self-host locally?",
        "a": "Mike found local hosting with Coolify or Docker hard to set up with a custom domain."
      },
      {
        "q": "How many templates are on n8n's site?",
        "a": "More than 6,400, Mike says."
      }
    ]
  },
  "3RPEo7PB7ug": {
    "summary": "A cautionary overview of Moltbook, a Reddit-style social network where AI agents post and upvote while humans only watch, launched about five days before the video. Mike reads Gemini's description and press coverage, repeats reports of 1.6 million agents and an exposed pile of API keys, and says the site is full of crypto promotion. He advises against joining. The figures and the breach come from social posts and articles, not from tests in the video.",
    "whatYouBuild": "Nothing is built. The video explains what Moltbook is, how agents join through OpenClaw and why Mike considers it a security risk.",
    "toolsUsed": [
      "Moltbook",
      "OpenClaw",
      "Gemini"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Hear what Moltbook is and the headline numbers: 1.6 million agents, 15,000 submolds, 157,000 posts and 780,000 comments."
      },
      {
        "seconds": 135,
        "step": "Read a researcher's post that says thousands of API keys and email addresses were exposed within 30 minutes."
      },
      {
        "seconds": 225,
        "step": "Learn how an agent registers through the OpenClaw platform and gets claimed by its human owner."
      },
      {
        "seconds": 270,
        "step": "Hear about agents promoting crypto scams and inventing religions."
      }
    ],
    "notCovered": [
      "Independent verification of the user counts, which Mike reads from the site and press.",
      "How the reported key exposure happened or whether it was fixed.",
      "The developer platform, which Mike skips as insecure.",
      "A hands-on test of Moltbook. Mike does not join."
    ],
    "qa": [
      {
        "q": "What is Moltbook?",
        "a": "A social network designed for AI agents to post and comment, with humans as observers."
      },
      {
        "q": "What is the main risk?",
        "a": "Reported exposure of API keys and email addresses, plus scams, according to posts and articles shown in the video."
      },
      {
        "q": "What does Mike suggest instead of Moltbook?",
        "a": "Skip it, or run OpenClaw only on a separate VPS or hosted setup, as in his earlier tutorials."
      }
    ]
  },
  "mkm8cz6dp8w": {
    "summary": "A personal story rather than a tutorial: Mike explains moving to Bali in November 2019 on a one-way ticket, doing hotel collaborations in Singapore, settling in Phuket and then Koh Samui for about six years, and living on YouTube and Facebook income with a low cost of living. He also mentions a remote AI strategist job interview and a Facebook group of 19,000 members. No AI tools or steps are covered, and income comparisons are Mike's own.",
    "whatYouBuild": "Nothing is built. The video tells a lifestyle story and invites viewers to ask questions.",
    "toolsUsed": [
      "YouTube",
      "Facebook"
    ],
    "keySteps": [
      {
        "seconds": 21,
        "step": "Hear about the one-way ticket to Bali in 2019."
      },
      {
        "seconds": 53,
        "step": "Hear how hotel collaborations in Singapore covered tight finances."
      },
      {
        "seconds": 112,
        "step": "Hear about arriving in Phuket and the culture shock."
      },
      {
        "seconds": 171,
        "step": "Hear why Koh Samui became the home base."
      },
      {
        "seconds": 209,
        "step": "Hear the case for leaving the nine to five commute cycle."
      },
      {
        "seconds": 296,
        "step": "Hear how a Western income goes further in Thailand."
      },
      {
        "seconds": 328,
        "step": "Hear about teaching AI skills and a pending remote job interview."
      }
    ],
    "notCovered": [
      "Any AI tutorial, tool or workflow.",
      "Proof of income or of how much the YouTube and Facebook channels earn.",
      "Visa, tax and legal requirements for living and working abroad.",
      "The outcome of the job interview."
    ],
    "qa": [
      {
        "q": "Is this an AI video?",
        "a": "Not really. It is a personal story, and Mike says it is different from his usual format."
      },
      {
        "q": "Where can viewers get more on moving abroad?",
        "a": "Mike points to his 19,000-member Facebook group on escaping the rat race."
      },
      {
        "q": "Does it cover visas?",
        "a": "No. It only mentions renewing a visa once in Bali."
      }
    ]
  },
  "9YueXsoNg80": {
    "summary": "Add OpenAI's Sora 2 video generation to an n8n workflow. Mike first updates a self-hosted n8n on a Hostinger VPS, because the Sora 2 option needs version 1.118.1, then builds a form that takes a prompt and product image and calls Sora 2 for an 8-second 1280 by 720 video. A bad request error turns out to be a negative OpenAI balance, fixed with a $6 top-up. The generated video does not match the product exactly.",
    "whatYouBuild": "An n8n workflow with a form trigger, an image resize step and an OpenAI video generation node using Sora 2 for a short UGC-style ad.",
    "toolsUsed": [
      "n8n",
      "Sora 2",
      "OpenAI API",
      "Hostinger",
      "Docker"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Open the Hostinger terminal for the n8n VPS."
      },
      {
        "seconds": 75,
        "step": "Run docker compose pull and docker compose down, then restart to update n8n."
      },
      {
        "seconds": 110,
        "step": "Confirm the new version in profile settings."
      },
      {
        "seconds": 150,
        "step": "Add the OpenAI node and choose video generation with the Sora 2 model."
      },
      {
        "seconds": 190,
        "step": "Set an 8-second length and a 1280 by 720 size, with the prompt from the form."
      },
      {
        "seconds": 230,
        "step": "Upload a product photo through the form and resize it."
      },
      {
        "seconds": 270,
        "step": "Fix a bad request error by adding OpenAI credits."
      },
      {
        "seconds": 370,
        "step": "Review the finished video."
      }
    ],
    "notCovered": [
      "A faithful product video. The result does not look exactly like the uploaded bottle.",
      "Posting the video to social media, which is described as a next step.",
      "Cost per video, since only the account balance is checked.",
      "Disclosure of AI-generated ads or rules for using real people's likeness."
    ],
    "qa": [
      {
        "q": "Which n8n version is needed?",
        "a": "Mike's instance showed 1.118.1 after the update, which gave access to the Sora 2 option."
      },
      {
        "q": "Why did it return bad request?",
        "a": "The OpenAI balance was negative. After adding about $6 the run worked."
      },
      {
        "q": "How long does Sora 2 take to generate a clip in n8n?",
        "a": "A couple of minutes for an 8-second clip."
      }
    ]
  },
  "Fw-RqLjArc8": {
    "summary": "Use the Semrush MCP from OpenCode and Hermes Agent to pull AI visibility, keyword gap and backlink gap data, then have scripts act on it. Mike's AI visibility score is 14 out of 100 with about 428 citations, and ChatGPT, Gemini and AI Mode mentions are shown. API exhaustion errors interrupt the backlink script. The video is an affiliate promotion, and Mike is on a $300 a month Semrush plan despite the title.",
    "whatYouBuild": "A Semrush MCP connected through an API key to coding agents that generate keyword gap plans, backlink gap scripts and a list of low-quality backlinks to consider disavowing.",
    "toolsUsed": [
      "Semrush",
      "OpenCode",
      "Hermes Agent",
      "DeepSeek V4 Flash",
      "Google Search Console"
    ],
    "keySteps": [
      {
        "seconds": 48,
        "step": "Review the AI visibility dashboard: a score of 14 out of 100 and about 428 citations across ChatGPT, Claude, Gemini and Perplexity."
      },
      {
        "seconds": 83,
        "step": "Connect Semrush tools to the coding agents."
      },
      {
        "seconds": 112,
        "step": "Generate a Semrush API key and have the agent set up the MCP."
      },
      {
        "seconds": 146,
        "step": "Create a keyword gap implementation plan and implement it on a free DeepSeek V4 Flash model."
      },
      {
        "seconds": 225,
        "step": "Create a script to pull backlink gaps, which throttles on API credit limits."
      },
      {
        "seconds": 328,
        "step": "Send backlink outreach emails with an AI email agent."
      },
      {
        "seconds": 352,
        "step": "Identify weak backlinks to disavow and upload them to Google Search Console."
      },
      {
        "seconds": 400,
        "step": "Read LLM mention shares: about 29 percent of ChatGPT mentions, 35 percent in Gemini and 23 percent in AI Mode."
      }
    ],
    "notCovered": [
      "Ranking or traffic results from the keyword and backlink work.",
      "Whether disavowing links is needed. Search engines often say it is rarely necessary.",
      "Rules on cold outreach for backlinks and on automated email agents.",
      "The cost of API credits against the $300 a month plan, since Mike hits throttling."
    ],
    "qa": [
      {
        "q": "Does the Semrush MCP need a paid plan?",
        "a": "Mike recommends a paid plan for MCP access, and uses a $300 a month plan. A 7-day free trial is mentioned."
      },
      {
        "q": "What was the AI visibility score?",
        "a": "14 out of 100, which Mike says is lower than expected."
      }
    ]
  },
  "JJe2G17_eRU": {
    "summary": "Build a thumbnail audit pipeline from 242 of Mike's own thumbnails: Python scripts measure brightness, saturation, contrast, edge density, faces and keywords, join the data with YouTube Studio click-through rates, and find ranges that correlate with higher CTR. The result is a master prompt used in ChatGPT Images 2.0 to redesign weak thumbnails. The one before and after shown looks similar but sharper. Correlation is not proven causation, and no CTR change is shown.",
    "whatYouBuild": "Four Python scripts, a CTR-enriched audit, a low-CTR optimization plan and a master designer prompt for redesigning thumbnails in ChatGPT Images 2.0.",
    "toolsUsed": [
      "ChatGPT Images 2.0",
      "Python",
      "YouTube Data API",
      "YouTube Studio",
      "KIE"
    ],
    "keySteps": [
      {
        "seconds": 48,
        "step": "Review the pipeline: export Studio data, add YouTube API data, run correlation analysis and write a prompt."
      },
      {
        "seconds": 60,
        "step": "Analyze 242 thumbnails for brightness, saturation, contrast, edge density, dominant colors, faces and keywords."
      },
      {
        "seconds": 109,
        "step": "Find visual attributes that correlate with higher click-through rate."
      },
      {
        "seconds": 146,
        "step": "Read the target ranges, such as brightness of about 40 to 60."
      },
      {
        "seconds": 220,
        "step": "Look at the scripts that audit thumbnails and join Studio CTR data to each file."
      },
      {
        "seconds": 271,
        "step": "Consider piping prompts to an image API through KIE instead of using ChatGPT."
      },
      {
        "seconds": 302,
        "step": "Upload a thumbnail to ChatGPT with the master prompt."
      },
      {
        "seconds": 432,
        "step": "Compare the original and redesigned thumbnails."
      }
    ],
    "notCovered": [
      "Any measured CTR change after replacing thumbnails.",
      "Whether 242 thumbnails and their correlations are enough to infer cause.",
      "The claimed 3 percent lift and 1,000 extra views, which are projections.",
      "The master prompt, which Mike says only works with his own data."
    ],
    "qa": [
      {
        "q": "What did the analysis look at?",
        "a": "Brightness, saturation, contrast, edge density, dominant colors, faces and keywords against CTR, impressions and views."
      },
      {
        "q": "Did the new thumbnail beat the old one?",
        "a": "Not shown. The redesign looked similar with higher resolution and a smoother background."
      },
      {
        "q": "Can I use the same prompt?",
        "a": "Mike says it is trained on his data, so you would need to rebuild it from your own channel."
      }
    ]
  },
  "pDrMGahPnwc": {
    "summary": "A tour of Otterly AI, a tracker for how often a brand appears in ChatGPT, Gemini, Perplexity and Microsoft Copilot answers. For Mike's analytics site it shows about 43 percent brand coverage against 68 percent for VidIQ, about 20 mentions, a brand rank of four, citation share, a crawlability checker and a content readiness checker. The plan is a 2-week trial then about $29 a month, and the link is a referral link.",
    "whatYouBuild": "An Otterly dashboard tracking prompts, brand coverage, citations and sentiment, with crawler and content checks and a backlink outreach idea.",
    "toolsUsed": [
      "Otterly AI",
      "Claude Code",
      "Claude SEO"
    ],
    "keySteps": [
      {
        "step": "Sign up for the trial and view tracked prompts and search volume."
      },
      {
        "step": "Read the overview of brand coverage, mentions, position and brand ranking against competitors."
      },
      {
        "step": "Check citation share and counts, where Mike's blog is cited often."
      },
      {
        "step": "Use the crawlability checker to confirm AI crawlers can reach the site."
      },
      {
        "step": "Open the content checker for quick answer, how-to and structured data analysis."
      },
      {
        "step": "Open individual prompts to see AI responses, sources and sentiment."
      },
      {
        "step": "Spot a high authority article that omits the site and plan to ask for a link."
      }
    ],
    "notCovered": [
      "How the tracker measures coverage or the likelihood to buy figure of about 78 percent.",
      "Any improvement in coverage after changes.",
      "Whether asking for a link exchange breaks a publisher's rules.",
      "Trial and plan terms beyond the quoted $29 a month."
    ],
    "qa": [
      {
        "q": "Which AI products does Otterly track?",
        "a": "ChatGPT, Gemini, Perplexity and Microsoft Copilot, per the video."
      },
      {
        "q": "How does Mike's site compare with VidIQ in Otterly?",
        "a": "About 43 percent brand coverage against 68 percent for VidIQ, and fourth in brand ranking."
      },
    ]
  },
  "4f9WR0T3vKQ": {
    "summary": "A February 2026 demo of Mike's own YouTube analytics web app while it was still in development. It shows a dashboard, analytics, competitor analysis, trend and idea tools, a keyword and title tool and planned pricing from $19 a month with a 7-day trial. Several parts are broken or unfinished, including the behavior tab and AI thumbnail testing. The video describes a product that was planned for public release the following month, so check its current availability.",
    "whatYouBuild": "A Node.js and Supabase web app built with Claude Code and OpenCode that reads YouTube Analytics and Data API data into dashboards, competitor comparison, ideas, keyword and title tools.",
    "toolsUsed": [
      "Claude Code",
      "OpenCode",
      "VS Code",
      "Supabase",
      "YouTube Analytics API"
    ],
    "keySteps": [
      {
        "step": "Watch VS Code and OpenCode build an audience and subscriber health feature with Claude Opus 4.6."
      },
      {
        "step": "Tour the pricing page, planned at $19 a month with limits of one, three or five channels by plan."
      },
      {
        "step": "View the dashboard with subscribers, views, engagement, retention and an optimization score."
      },
      {
        "step": "Open analytics and audience breakdowns, noting the behavior tab does not work yet."
      },
      {
        "step": "Add competitor channels and compare them, then see trends and AI-generated content ideas."
      },
      {
        "step": "See a screenshot of AI thumbnail testing, which is down because of a bug."
      },
      {
        "step": "Try the keyword search, title generator and tag optimizer."
      }
    ],
    "notCovered": [
      "A finished product. Mike says it still needs debugging, testing and a contact form.",
      "Current availability and prices, which may have changed since February 2026.",
      "The accuracy of the keyword volumes, which Mike calls a proof of concept.",
      "Security and data handling for creators who connect their channels."
    ],
    "qa": [
      {
        "q": "Is TubeAnalytics live?",
        "a": "It is technically live but needs much more work, Mike says, with a public launch planned about a month after the video. Check the current status."
      },
      {
        "q": "What was the planned price?",
        "a": "Most likely $19 a month, or $15 a month annually, with a 7-day free trial."
      },
      {
        "q": "What is it built with?",
        "a": "Node.js in VS Code with Claude Code and OpenCode, and Supabase for the database."
      }
    ]
  },
  "mKZHLQLaq2k": {
    "summary": "Install Claude Code on Debian Linux from the terminal, add Visual Studio Code from Flathub with its Claude Code extension, and sign in through the Claude console. The first login attempts need authorizing again and a path fix before Claude Code runs inside VS Code on Sonnet 4.5. Mike has not used Claude Code much before, and the pricing he quotes is as of January 2026.",
    "whatYouBuild": "Claude Code running in a terminal and inside VS Code on Linux, signed in through the console.",
    "toolsUsed": [
      "Claude Code",
      "VS Code",
      "Flathub"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Run the native installer for Claude Code in the terminal and add it to the path."
      },
      {
        "seconds": 80,
        "step": "Install VS Code from the Flathub software store after the apt command does not work."
      },
      {
        "seconds": 120,
        "step": "Install the Claude Code extension in VS Code."
      },
      {
        "seconds": 200,
        "step": "Log in with the Claude console and authorize, which needs a second attempt."
      },
      {
        "seconds": 240,
        "step": "Run Claude in VS Code's terminal and accept the trust and recommended settings prompts."
      },
      {
        "seconds": 280,
        "step": "Try a first prompt, fix type check errors, and look at shortcuts."
      }
    ],
    "notCovered": [
      "A real coding task. The first prompt only starts Claude searching the local folder.",
      "Costs. Mike says a Pro plan was about $17 a month and he has not paid for one yet.",
      "Windows and Mac setup, which Mike says is harder.",
      "Troubleshooting beyond the path fix."
    ],
    "qa": [
      {
        "q": "Which model did Claude Code use?",
        "a": "Sonnet 4.5 after login."
      },
      {
        "q": "Why did the install seem to do nothing?",
        "a": "The command was not on the path, so Mike ran it with the full path and then fixed the setup."
      },
      {
        "q": "Do I need a paid plan for Claude Code?",
        "a": "Regular use will likely need a subscription or API credits, Mike expects."
      }
    ]
  },
  "PDfEWpyyRMI": {
    "summary": "A hands-on trial of Syllaby on a free 7-day account: pick a style, voice and music, write a custom-topic script about low-cost countries for digital nomads, render a one-minute faceless video in about three minutes and publish it to YouTube from Syllaby. The recording appears nearly identical to another video on this channel about Syllaby, so one of them may be a re-upload. The link is an affiliate link, and results after publishing are not shown.",
    "whatYouBuild": "A portrait faceless video with ambient music and karaoke subtitles, published directly to YouTube.",
    "toolsUsed": [
      "Syllaby",
      "ChatGPT",
      "YouTube"
    ],
    "keySteps": [
      {
        "seconds": 29,
        "step": "Tour the dashboard: ideas, a clone of yourself and AI thumbnails."
      },
      {
        "seconds": 113,
        "step": "Start a faceless video and pick a style, subtitles and a voice."
      },
      {
        "seconds": 210,
        "step": "Choose portrait format and a short length because the trial has about 50 credits."
      },
      {
        "seconds": 259,
        "step": "Use the script assistant with a custom topic after the first script misses the point."
      },
      {
        "seconds": 569,
        "step": "Publish the finished video to a connected YouTube channel."
      },
      {
        "seconds": 660,
        "step": "Learn about the bulk scheduler for automatic posting."
      }
    ],
    "notCovered": [
      "How the video performs on YouTube, which Mike says he will watch for a couple of weeks.",
      "Fact checking the cost-of-living claims in the AI script.",
      "YouTube's disclosure rules for AI-generated content.",
      "Plan prices beyond the quoted $25 a month for 500 credits."
    ],
    "qa": [
      {
        "q": "How many credits does the Syllaby free trial give?",
        "a": "About 50, enough for roughly three minutes of video, per Mike."
      },
      {
        "q": "Is this the same as the other Syllaby video?",
        "a": "The content is nearly identical, so it looks like the same recording uploaded twice."
      }
    ]
  },
  "CfbMWB0G99E": {
    "summary": "Build a ten-card presentation in Gamma from a pasted four-day ChatGPT coaching plan for a beginner client: choose concise text, a light theme, auto-selected AI images in a line art style, and let Gamma generate the deck in about three minutes. Mike edits a heading, changes one image with Gamma's AI agent and exports to Google Slides. Plan prices are quoted, and the link is an affiliate link.",
    "whatYouBuild": "A ten-card Gamma presentation made from a pasted outline, with an edited image and an export to Google Slides.",
    "toolsUsed": [
      "Gamma",
      "Google Slides",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 131,
        "step": "Choose to paste text rather than use a one-line prompt, template or file import."
      },
      {
        "seconds": 181,
        "step": "Paste a detailed four-day coaching plan and choose the presentation format."
      },
      {
        "seconds": 223,
        "step": "Set the free plan's 10 cards, concise text, the audience, tone, language and a light theme."
      },
      {
        "seconds": 287,
        "step": "Let Gamma pick the image model and choose a line art style."
      },
      {
        "seconds": 344,
        "step": "Generate the deck, which takes about three minutes."
      },
      {
        "seconds": 411,
        "step": "Check plan prices: Plus at $12, Pro at $25 and Ultra at $100 a month."
      },
      {
        "seconds": 580,
        "step": "Edit an image with the built-in AI agent."
      },
      {
        "seconds": 619,
        "step": "Export to Google Slides, PowerPoint, PDF or PNG."
      }
    ],
    "notCovered": [
      "Whether the deck is accurate or well suited to the client, since the content was fed in as an outline.",
      "Formatting problems after export, which Mike says need some work.",
      "Credit use per deck or per image model.",
      "The claim that more than 80 percent of people have never paid for an AI service, which is Mike's own."
    ],
    "qa": [
      {
        "q": "How many cards does the Gamma free plan allow?",
        "a": "10 cards per prompt, per the video."
      },
      {
        "q": "How fast did Gamma generate the deck?",
        "a": "About three minutes or less to generate the whole deck."
      }
    ]
  },
  "CGVALaueHeA": {
    "summary": "A Make.com scenario that finds video ideas from other creators' popular videos: it scrapes chosen YouTube channels with an Apify actor, stores titles and view counts in Airtable, asks an OpenAI assistant for ten similar ideas in JSON and saves them to a second Airtable table. The run produces idea lists for a travel and Thailand niche. A faceless video step is unlinked, the template is pay what you want, and the Make.com link is an affiliate link.",
    "whatYouBuild": "A Make.com scenario with a channel list, an Apify YouTube channel scraper, an array aggregator, an iterator, Airtable records, a text aggregator, an OpenAI assistant and a parsed JSON write to an ideas table.",
    "toolsUsed": [
      "Make.com",
      "Apify",
      "Airtable",
      "OpenAI API"
    ],
    "keySteps": [
      {
        "seconds": 82,
        "step": "Set up the channels to scrape and pick Apify's YouTube channel scraper."
      },
      {
        "seconds": 111,
        "step": "Connect Apify to Make.com with an API token and paste the actor's input JSON."
      },
      {
        "seconds": 199,
        "step": "Get the dataset items, limited to 100, and aggregate the date, title, duration, views and channel name into an array."
      },
      {
        "seconds": 260,
        "step": "Create Airtable tables for scraped videos and ideas."
      },
      {
        "seconds": 322,
        "step": "Iterate over the array and create Airtable records."
      },
      {
        "seconds": 448,
        "step": "Aggregate titles and view counts into a single text block."
      },
      {
        "seconds": 472,
        "step": "Ask a custom OpenAI assistant for ten original ideas with summaries in a JSON format."
      },
      {
        "seconds": 609,
        "step": "Parse the JSON and store the ideas in Airtable."
      }
    ],
    "notCovered": [
      "Whether the suggested ideas perform well. They are patterned on other creators' popular videos.",
      "The faceless video posting step, which Mike has unlinked.",
      "Rules for scraping channels through Apify, and the cost beyond the quoted $5 per 1,000 videos.",
      "Originality, since the prompt asks for ideas similar to other creators' hits."
    ],
    "qa": [
      {
        "q": "Where can I get the YouTube topic finder Make.com template?",
        "a": "On Mike's Gumroad page, free or pay what you want."
      },
      {
        "q": "What does the assistant return?",
        "a": "Ten video ideas with short summaries and steps, formatted as JSON."
      },
    ]
  },
  "AO8NoHPU3e0": {
    "summary": "A first look at Claude Code Routines, announced April 14, 2026 in preview: saved prompts that run on a schedule, a GitHub event or an API call. Mike keeps a daily email triage routine, adds a GitHub security audit on pull requests and a calendar update, then creates a daily site speed audit and a weekly blog strategy routine from the Claude Code command line. Routines use plan credits, with a Pro plan allowing five included runs a day, and Mike reaches about 90 percent usage.",
    "whatYouBuild": "Several Claude routines: a daily email triage, a GitHub pull request security review, a Google Calendar update, a daily site performance analysis and a weekly blog content strategy file committed to a repo.",
    "toolsUsed": [
      "Claude Code Routines",
      "GitHub",
      "Google Calendar",
      "Claude Code"
    ],
    "keySteps": [
      {
        "seconds": 11,
        "step": "Read the announcement: routines can work through a backlog, review pull requests and react to events in the cloud."
      },
      {
        "seconds": 81,
        "step": "Look at the daily email triage routine, which categorizes, summarizes and drafts replies."
      },
      {
        "seconds": 117,
        "step": "Create a routine triggered by GitHub events to review pull requests for security issues."
      },
      {
        "seconds": 241,
        "step": "Run it manually and see it start."
      },
      {
        "seconds": 302,
        "step": "Add a daily Google Calendar update using a connector."
      },
      {
        "seconds": 374,
        "step": "Read the security review of four open pull requests, rated medium concern."
      },
      {
        "seconds": 425,
        "step": "Create a routine from the Claude Code command line and fix a 401 error by logging in again."
      },
      {
        "seconds": 649,
        "step": "Create a weekly blog strategy routine that commits a strategy document."
      },
      {
        "seconds": 714,
        "step": "Notice credit use climbing and troubleshoot session tokens."
      }
    ],
    "notCovered": [
      "Whether the speed audit produces useful data, since the site returns 403 to the automated requests.",
      "The strategy document produced by the weekly routine, which is still running at the end.",
      "A YouTube connector, which is not available, so the comments report is dropped.",
      "Costs. Mike says creating routines in the command line burns many tokens and recommends the web interface."
    ],
    "qa": [
      {
        "q": "What triggers a routine?",
        "a": "A schedule, a GitHub event or an API call, per the video."
      },
      {
        "q": "How many runs does Pro include?",
        "a": "Mike says five included daily runs."
      },
      {
        "q": "Which way is cheaper to create them?",
        "a": "The web interface, according to Mike, because doing it in Claude Code used a lot of tokens."
      }
    ]
  },
  "NoHkFvhbiuU": {
    "summary": "A demo of LeadScope, Mike's local lead generation and website audit tool built in phases with Claude Code on Sonnet 5, Codex and OpenCode. It searches Google Maps by category and place, audits sites with PageSpeed and Lighthouse, takes screenshots with Playwright, drafts a redesign preview and email copy, and exports leads to CSV. Contact extraction and the redesign preview are weak, rate limits slow the audits and the tool is not deployed.",
    "whatYouBuild": "A local app with Google Places API search, a PageSpeed and Lighthouse audit, Playwright screenshots, template-based redesign previews, personalized email drafts, a usage cost dashboard and a CSV export.",
    "toolsUsed": [
      "Claude Code",
      "Codex",
      "OpenCode",
      "Google Places API",
      "Playwright",
      "Postgres",
      "Vercel AI Gateway"
    ],
    "keySteps": [
      {
        "seconds": 42,
        "step": "Hear how the tool finds businesses, audits and screenshots their sites and builds a before and after redesign."
      },
      {
        "seconds": 83,
        "step": "Review the master prompt written in Claude for the six build phases."
      },
      {
        "seconds": 134,
        "step": "Look at example hotel leads in Los Angeles, including a hostel with no website."
      },
      {
        "seconds": 212,
        "step": "Run a live search for hotels in Koh Samui and watch audits and screenshots start."
      },
      {
        "seconds": 284,
        "step": "Open a lead with an HTTPS issue and see its redesign preview, which looks poor."
      },
      {
        "seconds": 335,
        "step": "Export the leads to CSV."
      },
      {
        "seconds": 463,
        "step": "Draft personalized email copy from audit data using DeepSeek V4 Pro in OpenCode."
      },
      {
        "seconds": 494,
        "step": "Finish phase six, a usage and cost dashboard for PageSpeed calls."
      },
      {
        "seconds": 628,
        "step": "Plan AI vision analysis of screenshots through the Vercel AI Gateway for better redesigns."
      }
    ],
    "notCovered": [
      "Reliable email discovery. Many leads show only phone numbers.",
      "A good redesign preview. Mike calls the current one ugly and plans to improve it.",
      "Clients won with the tool.",
      "The legal and platform terms on collecting business contact details, though Mike says the Places API use is compliant."
    ],
    "qa": [
      {
        "q": "Does it actually find clients?",
        "a": "The title says so, but the video only shows leads and audits. No outreach results or clients are shown."
      },
      {
        "q": "Which AI models were used to build LeadScope?",
        "a": "Claude Sonnet 5 for most of the build, Codex for the redesign work and DeepSeek V4 Pro in OpenCode for emails."
      },
      {
        "q": "Can people use LeadScope yet?",
        "a": "No. It runs on Mike's computer, and a Prisma error blocks the Vercel deployment."
      }
    ]
  },
  "2G5klyFz61E": {
    "summary": "A live build of Beacon, Mike's early AI search visibility tracker, using OpenCode with GLM 5.2 and DeepSeek V4 Pro, Codex and Claude Code. Design and features are modeled on a paid tracker, live data comes from the DataForSEO MCP, and GLM 5.2 builds a three-tier pricing page, though Stripe is not configured. The OpenCode Go five-hour limit is reached mid-build. It is an unfinished minimum viable product, and the sign-up link is an affiliate link.",
    "whatYouBuild": "A Next.js style dashboard with Clerk login, overview metrics, a task board, integrations and a pricing page, with DataForSEO data replacing mock data and Prisma for storage.",
    "toolsUsed": [
      "OpenCode",
      "GLM 5.2",
      "DeepSeek V4 Pro",
      "Codex",
      "Claude Code",
      "DataForSEO",
      "Clerk",
      "Stripe"
    ],
    "keySteps": [
      {
        "seconds": 67,
        "step": "Tour the landing page and Clerk sign-in of the early MVP."
      },
      {
        "seconds": 91,
        "step": "Walk through the dashboard's visibility score, presence, win rate and trend."
      },
      {
        "seconds": 110,
        "step": "Compare GLM 5.2 and DeepSeek V4 Pro costs in OpenCode, where DeepSeek is several times cheaper."
      },
      {
        "seconds": 193,
        "step": "Have Claude Desktop write a build prompt that mirrors a competitor's functionality."
      },
      {
        "seconds": 274,
        "step": "Connect the DataForSEO MCP and AI optimization data API for live data."
      },
      {
        "seconds": 372,
        "step": "Explain GEO and the robots, llms.txt and ai.txt files an AI crawler needs."
      },
      {
        "seconds": 562,
        "step": "Balance work across Claude Code, Codex and OpenCode as limits are reached."
      },
      {
        "seconds": 612,
        "step": "Ask GLM 5.2 to build a three-tier Stripe pricing page, which finishes after a usage reset."
      }
    ],
    "notCovered": [
      "Working billing. Stripe is not configured yet.",
      "A verified live data flow, since localhost login and organization connection are not working.",
      "Whether copying a paid competitor's layout and features raises design or intellectual property concerns.",
      "Any users or a release date."
    ],
    "qa": [
      {
        "q": "Why build it instead of buying a tracker?",
        "a": "Mike did not want to pay $100 a month for the tracker he admires, which recently rose from $70."
      },
      {
        "q": "How much did the Beacon build cost in OpenCode Go?",
        "a": "About $12 on GLM 5.2 and $2.50 on DeepSeek V4 Pro inside the $10 a month Go plan, which was at 37 percent of its monthly usage."
      },
    ]
  },
  "ix3C2JBFII8": {
    "summary": "Make YouTube thumbnails with Nano Banana Pro through KIE: ChatGPT writes a thumbnail prompt, KIE regenerates an existing thumbnail from it at 16:9 and 1K, and Gemini swaps in Mike's face with a wide-open-mouth expression. Each run costs about 18 credits, roughly 30 images for $5. The thumbnails are replaced on three videos with starting click-through rates around 3.3 to 3.8 percent, but no new rates are shown, and one face swap fails.",
    "whatYouBuild": "Regenerated YouTube thumbnails from a ChatGPT-written prompt in KIE's Nano Banana Pro, with face replacement in Gemini and manual uploads in YouTube Studio.",
    "toolsUsed": [
      "Nano Banana Pro",
      "KIE",
      "ChatGPT",
      "Gemini",
      "vidIQ"
    ],
    "keySteps": [
      {
        "seconds": 60,
        "step": "Sign up for KIE, add credits and open Nano Banana Pro in the models market."
      },
      {
        "seconds": 120,
        "step": "Write a detailed thumbnail prompt in ChatGPT and paste it into KIE with an existing thumbnail."
      },
      {
        "seconds": 180,
        "step": "Replace the generated person with Mike's face in Gemini, keeping the surprised expression."
      },
      {
        "seconds": 300,
        "step": "Set 16:9, 1K and PNG, then regenerate another low-CTR thumbnail."
      },
      {
        "seconds": 360,
        "step": "Mention automating the process in n8n in a later video."
      },
      {
        "seconds": 420,
        "step": "Check title, description and thumbnail scores in vidIQ."
      }
    ],
    "notCovered": [
      "Click-through rate after the changes. Only the old rates of about 3.3 to 3.8 percent are shown.",
      "A reliable face swap. One attempt does not insert Mike and Gemini's limit is reached.",
      "Whether the wide-open-mouth style works for every audience, which is Mike's belief.",
      "Disclosure of AI-edited faces and thumbnails, and the cost beyond the quoted credits."
    ],
    "qa": [
      {
        "q": "How much does each thumbnail cost?",
        "a": "About 18 credits per run, and Mike estimates around 30 images for $5."
      },
      {
        "q": "Why 1K resolution?",
        "a": "Higher resolution makes files too large to upload to YouTube, Mike says."
      },
      {
        "q": "Do I need a designer?",
        "a": "Not according to Mike, but no CTR improvement is shown yet."
      }
    ]
  },
  "quDDekuPQNI": {
    "summary": "A sponsored walkthrough of BrowserAct's Skill Forge scraper skill, which Mike installs with npx and uses in Codex to scrape remote job listings from We Work Remotely: category pages, filtered categories and each job's details into a 3,200-line JSON and a CSV. Claude Desktop then writes a React and Vite prompt and Codex builds a searchable remote job board in about 20 minutes. The salary field is wrong, and applying sends users back to the source site. The video says BrowserAct sponsored it.",
    "whatYouBuild": "A BrowserAct-powered scraper in Python and a React and Vite remote jobs website with categories, search and job detail pages built from the scraped JSON.",
    "toolsUsed": [
      "BrowserAct",
      "Codex",
      "Claude Desktop",
      "React",
      "Vite"
    ],
    "keySteps": [
      {
        "seconds": 75,
        "step": "Install the Skill Forge skill into the coding tools with the npx command."
      },
      {
        "seconds": 131,
        "step": "Ask Codex to scrape the job board, which writes a Python script and skill file."
      },
      {
        "seconds": 213,
        "step": "Batch scrape the category pages."
      },
      {
        "seconds": 283,
        "step": "Filter to frontend and sales categories and fetch each job's details."
      },
      {
        "seconds": 350,
        "step": "Hear about the stealth mode meant to avoid bot detection."
      },
      {
        "seconds": 403,
        "step": "Convert the output to JSON and CSV."
      },
      {
        "seconds": 449,
        "step": "Have Claude Desktop write a React and Vite prompt for the jobs site."
      },
      {
        "seconds": 520,
        "step": "Let Codex execute an implementation plan and build the site."
      },
      {
        "seconds": 587,
        "step": "Search and browse the finished site and notice the wrong salary data."
      }
    ],
    "notCovered": [
      "Whether copying and republishing another job board's listings is allowed by its terms or copyright.",
      "The accuracy of the scraped data, since the salary is not scraped correctly.",
      "Bot detection avoidance and its ethics. Mike says the tool avoids detection and blocks.",
      "A deployed site, which Mike plans to put on Vercel."
    ],
    "qa": [
      {
        "q": "How long did the remote job board take to build?",
        "a": "About 20 minutes with Codex, or about an hour including scraping."
      },
      {
        "q": "Where does the apply button go?",
        "a": "To the original We Work Remotely listing, where users create an account to apply."
      }
    ]
  },
  "4sd4-9rC3As": {
    "summary": "A Make.com scenario that makes faceless AI videos from Airtable topics and posts them: Airtable rows with status to-do, an OpenAI script, JSON2Video's toolbox to render a 720 by 1280 video, a wait for the render, an Airtable update with the video URL, and a router posting to a Facebook page and a YouTube channel. A test video on expat-friendly cities renders in about 60 to 70 seconds. The resolution is lowered to fit Make.com's 5 MB free plan file cap.",
    "whatYouBuild": "A Make.com scenario with Airtable, ChatGPT, JSON2Video, an HTTP file download and Facebook and YouTube upload modules.",
    "toolsUsed": [
      "Make.com",
      "Airtable",
      "OpenAI API",
      "JSON2Video",
      "YouTube",
      "Facebook"
    ],
    "keySteps": [
      {
        "seconds": 37,
        "step": "Create a JSON2Video account for a free API key and build an Airtable table of titles, topics, language, voice and status."
      },
      {
        "seconds": 64,
        "step": "Search Airtable records with status to-do and update the record later."
      },
      {
        "seconds": 112,
        "step": "Write a script with an OpenAI chat completion using the topic, language and voice."
      },
      {
        "seconds": 316,
        "step": "Set the JSON2Video toolbox: 720 by 1280, the free voice, free image model, vertical ratio and subtitles."
      },
      {
        "seconds": 391,
        "step": "Wait for the movie to render and save its URL back to Airtable."
      },
      {
        "seconds": 665,
        "step": "Download the file and post it to a Facebook page and a YouTube channel through a router."
      }
    ],
    "notCovered": [
      "Quality of the videos. Mike suggests better image models for improvement.",
      "Engagement or growth from posting AI videos, and platform rules on automated and repetitive posting.",
      "Costs after the 600 free JSON2Video credits, with paid plans mentioned around $50 a month.",
      "Instagram and TikTok posting, which are only mentioned as possible additions."
    ],
    "qa": [
      {
        "q": "Why scale the video down?",
        "a": "Make.com's free plan caps downloaded files at about 5 MB, so Mike uses 720 by 1280."
      },
      {
        "q": "How does the YouTube upload handle AI content?",
        "a": "Mike turns on the altered or synthetic media setting because the video is AI generated."
      },
      {
        "q": "How fast does a video render?",
        "a": "About 60 to 70 seconds for a roughly 35 second clip."
      }
    ]
  },
  "fjTn95391rg": {
    "summary": "Connect a Fillout form to Airtable, first with a Make.com scenario that watches for new Fillout responses and creates an Airtable record, then with Fillout's built-in Airtable integration that needs no Make.com. The form collects name, email, phone, how members found the community, tools used and monthly online income, with an optional call booking. Both versions put a test submission into Airtable. The links are promotional, and the data collected is personal.",
    "whatYouBuild": "A Fillout form for new community members, a Make.com webhook scenario into Airtable, and the same result using Fillout's native Airtable integration.",
    "toolsUsed": [
      "Fillout",
      "Make.com",
      "Airtable",
      "Google Calendar"
    ],
    "keySteps": [
      {
        "seconds": 40,
        "step": "Build the Fillout form with questions, a theme and a calendar booking step for people who want a call."
      },
      {
        "seconds": 120,
        "step": "Create a Make.com scenario with a Fillout watch-responses trigger and connect Fillout."
      },
      {
        "seconds": 160,
        "step": "Create an Airtable base with fields for name, email, phone, discovery, income and call interest."
      },
      {
        "seconds": 200,
        "step": "Map each Fillout answer to an Airtable field in a Create Record module."
      },
      {
        "seconds": 250,
        "step": "Submit a test form and see the record appear in Airtable."
      },
      {
        "seconds": 300,
        "step": "Use Fillout's built-in Airtable integration instead and test again without Make.com."
      }
    ],
    "notCovered": [
      "Consent and privacy notices for collecting phone numbers and income.",
      "Sending follow-up emails, which is only suggested with a to-do status and a search step.",
      "The claimed 25 percent conversion rate of the community, which is Mike's own figure.",
      "Pricing details beyond the free 1,000 responses a month and paid plans from $19."
    ],
    "qa": [
      {
        "q": "Do I need Make.com to send form answers to Airtable?",
        "a": "No. Fillout has its own Airtable integration, which also saves Make.com runs."
      },
      {
        "q": "How much does Fillout cost?",
        "a": "Free to start with 1,000 responses a month, and paid plans from $19 a month, per Mike."
      },
      {
        "q": "Why ask about income?",
        "a": "Mike uses it to judge how ready members are for AI automation."
      }
    ]
  },
  "tR7AYN5FiqA": {
    "summary": "A tour of OpenAI's Codex coding tool in the terminal and in Codex Cloud after Mike upgrades to ChatGPT Plus and drops Claude Code. He runs a code review through Codex Cloud connected to GitHub, switch models and reasoning levels, use the superpowers skill for a review of his site, fix a newsletter form and push to GitHub for a Vercel deploy. Mike launches it in a mode that skips approvals, which is a risk to know about.",
    "whatYouBuild": "Codex set up with a ChatGPT Plus login, a cloud code review task, and a local review that results in fixes pushed to a repo.",
    "toolsUsed": [
      "Codex",
      "ChatGPT",
      "GitHub",
      "Vercel",
      "EmailJS"
    ],
    "keySteps": [
      {
        "step": "Compare the Codex plans and note ChatGPT Plus at $20 a month, with Pro around $100."
      },
      {
        "step": "Open Codex Cloud, connect GitHub and start a code review on a repo."
      },
      {
        "step": "Start Codex in the terminal with an approval-skipping flag and sign in with ChatGPT."
      },
      {
        "step": "Pick GPT 5.4 mini and medium reasoning instead of the costlier GPT 5.5."
      },
      {
        "step": "Use the superpowers skill for a full code review and read the ranked findings."
      },
      {
        "step": "Ask Codex to fix the newsletter email form, then commit and push."
      },
      {
        "step": "Resume an interrupted session with codex resume."
      }
    ],
    "notCovered": [
      "The risks of running with approvals skipped, where a coding agent can edit files and run commands without asking.",
      "Whether the code review findings were all valid, since they are applied without a separate check.",
      "Install steps, which Mike has already done.",
      "A cost comparison with Claude Code beyond the equal $20 plan price and Mike's view that Codex is faster."
    ],
    "qa": [
      {
        "q": "Which Codex model does Mike use?",
        "a": "GPT 5.4 mini at medium reasoning for most tasks, since GPT 5.5 uses more credits."
      },
      {
        "q": "Can I run Codex without my computer?",
        "a": "Yes, Codex Cloud runs tasks against a connected GitHub repo, which Mike says helps on a slow laptop."
      },
      {
        "q": "Why did Mike switch to Codex?",
        "a": "He found Claude Code slower and ran out of credits often, so he cancelled it for Codex and OpenCode."
      }
    ]
  },
  "limgGYHy6Jk": {
    "summary": "A SendPulse walkthrough for a Facebook page with about 160,000 followers: comment triggers with randomized public replies, a direct message flow, ChatGPT-written replies in the commenter's language, a CRM and DM campaigns that show 70 to 77 percent read rates. Mike pays $48 a month for the 5,000-subscriber plan. The CRM is not receiving contacts, ChatGPT replies are cut off on the free API model and the link is an affiliate link. He also offers to build chatbots as a service.",
    "whatYouBuild": "A SendPulse bot with a standard reply flow that responds to page comments, an AI reply step using the OpenAI API, and DM campaigns to subscribers.",
    "toolsUsed": [
      "SendPulse",
      "Facebook Messenger",
      "ChatGPT",
      "OpenAI API"
    ],
    "keySteps": [
      {
        "seconds": 90,
        "step": "See what SendPulse chatbots do across Facebook, WhatsApp, Instagram, Telegram, Viber and live chat."
      },
      {
        "seconds": 180,
        "step": "Review pricing, where Mike pays $48 a month for the 5,000 subscriber tier."
      },
      {
        "seconds": 270,
        "step": "Tour the dashboard with about 3,200 subscribers and conversations viewable without Messenger."
      },
      {
        "seconds": 360,
        "step": "Edit the comment trigger and add several different public replies to avoid looking repetitive."
      },
      {
        "seconds": 450,
        "step": "Edit the flow so a comment starts a DM with a quick reply, then passes responses to ChatGPT."
      },
      {
        "seconds": 540,
        "step": "See a German reply produced automatically."
      },
      {
        "seconds": 630,
        "step": "Read campaign results and the offer to build chatbots for others."
      }
    ],
    "notCovered": [
      "Meta's rules on automated replies and messages to people who commented.",
      "CRM sync, which Mike says is not adding contacts yet.",
      "Long AI replies, which are cut off because of the API limits on the free plan.",
      "Verification of the read rates and group growth Mike quotes."
    ],
    "qa": [
      {
        "q": "How does the bot reply in other languages?",
        "a": "It passes the message through ChatGPT, which answers in the sender's language."
      },
      {
        "q": "What does Mike charge to set up a Facebook chatbot?",
        "a": "$150 as a one-time service, or $99 a month for up to two platforms, per the video."
      }
    ]
  },
  "oP11zRs6628": {
    "summary": "Use Google Antigravity with Gemini 3 Pro to build a small web dashboard that sends a YouTube URL to an n8n workflow on a Hostinger VPS, which should return a LinkedIn post, blog article and tweets. The first attempts show failed to fetch and a 500 error, then the workflow runs for 3 minutes 39 seconds after a webhook fix and a Gemini billing setup. The app does not yet display the post or infographic, which only appear in Google Drive and KIE.",
    "whatYouBuild": "A React dashboard on localhost calling an n8n webhook that transcribes a video with Apify, summarizes it with Gemini, writes content with Claude and makes an infographic through KIE.",
    "toolsUsed": [
      "Google Antigravity",
      "Gemini 3 Pro",
      "n8n",
      "Hostinger",
      "Apify",
      "KIE",
      "Claude"
    ],
    "keySteps": [
      {
        "step": "Ask Gemini for instructions, install the n8n MCP and put the n8n API key into an MCP config file."
      },
      {
        "step": "Have Antigravity build the dashboard files and an implementation plan."
      },
      {
        "step": "Switch from a local n8n to the Hostinger instance and install the Apify node."
      },
      {
        "step": "Replace the form trigger with a webhook and set the path and response mode."
      },
      {
        "step": "Debug the failed to fetch and 500 errors, passing the video URL into the next node."
      },
      {
        "step": "Set up Google Cloud billing to clear a Gemini rate limit and top up Claude credits."
      },
      {
        "step": "See the run complete, with the infographic created in KIE and uploaded to Google Drive."
      }
    ],
    "notCovered": [
      "Showing the LinkedIn post and infographic inside the app, which is not finished.",
      "Security of exposing a webhook to a public web app that triggers paid API calls.",
      "Costs per run for the transcription, Gemini, Claude and KIE steps.",
      "A release. Mike may host the app and charge a subscription later."
    ],
    "qa": [
      {
        "q": "Did the dashboard work?",
        "a": "Partly. It triggered the n8n workflow, which completed, but it does not yet display the generated content."
      },
      {
        "q": "Why did it say failed to fetch?",
        "a": "The app could not reach the n8n instance or the right webhook path. It improved after switching to the remote instance and correcting the path."
      },
      {
        "q": "How long did the workflow take?",
        "a": "About 3 minutes 39 seconds for the full run."
      }
    ]
  },
  "yUibdYhO1ms": {
    "summary": "An n8n workflow that runs every three days, scrapes remote digital marketing jobs from Indeed with Apify, has GPT-5 mini score each job against Mike's resume out of 10, and for scores of 5 or more writes a cover letter. Every job goes into an Airtable tracker, and good matches also get a Google Doc cover letter. Applying stays manual, and some cover letter files are hard to match to their jobs because company names are missing.",
    "whatYouBuild": "An n8n workflow with a schedule trigger, an Apify Indeed actor, dataset retrieval, an OpenAI fit score, an if branch, a cover letter generator, Airtable records and Google Docs creation.",
    "toolsUsed": [
      "n8n",
      "Apify",
      "OpenAI API",
      "Airtable",
      "Google Docs"
    ],
    "keySteps": [
      {
        "seconds": 45,
        "step": "Run the Apify Indeed scraper every three days for 25 remote digital marketing jobs from the past week."
      },
      {
        "seconds": 135,
        "step": "Fetch the dataset items with description, company, location and salary."
      },
      {
        "seconds": 180,
        "step": "Score each job out of 10 with GPT-5 mini, giving points for resume fit, pay, remote work, benefits and full-time status."
      },
      {
        "seconds": 225,
        "step": "Branch on a score of 5 or more and add every job to Airtable with its rating."
      },
      {
        "seconds": 270,
        "step": "Generate a cover letter for good matches from the job listing and the resume."
      },
      {
        "seconds": 315,
        "step": "Create a Google Doc for each cover letter and update it with the text."
      },
      {
        "seconds": 360,
        "step": "Open a job link from Airtable and apply by hand."
      }
    ],
    "notCovered": [
      "How well the fit scoring matches a human judgment of the jobs.",
      "Naming that makes cover letters easy to find. Jobs without a company name get a generic CV file name.",
      "Truthfulness of AI-written cover letters and sending a full resume to a third-party model.",
      "Google Cloud setup, which Mike leaves for viewers to figure out."
    ],
    "qa": [
      {
        "q": "Does the n8n job workflow apply for me?",
        "a": "No. It finds, scores and drafts, and Mike applies manually."
      },
      {
        "q": "Why only write letters for good fits?",
        "a": "To save OpenAI credits, using a threshold of a 5 out of 10 score."
      },
      {
        "q": "Which scrapers can it use?",
        "a": "LinkedIn, Simply Hired, ZipRecruiter and others also work as Apify actors, Mike says."
      }
    ]
  },
  "2pD_wqYHKlY": {
    "summary": "A tour of Trakkr, a tool for tracking AI crawler visits, citations and visibility, using Mike's own analytics site. It shows 1,700 AI crawler visits in seven days, prompt tests in ChatGPT and Perplexity where the site ranks third, and steps such as tracking code, llms.txt and ai.txt. Mike credits GEO-optimized blog articles and a move from Hostinger to Vercel. These results are self-reported and causes are not proven.",
    "whatYouBuild": "A Trakkr setup with tracking code on a site, plus scripts to submit URLs to Bing and Google and a blog post workflow driven by tracked prompts.",
    "toolsUsed": [
      "Trakkr",
      "OpenCode",
      "Vercel",
      "Google Tag Manager",
      "Index Guru"
    ],
    "keySteps": [
      {
        "seconds": 63,
        "step": "Read the dashboard for visibility score, mentions, rank and competitor comparison."
      },
      {
        "seconds": 104,
        "step": "Check AI crawler visits by day, top pages and sources, mostly from ChatGPT."
      },
      {
        "seconds": 147,
        "step": "See how blog articles use quick answers, key takeaways and expanded FAQ sections so crawlers can read them."
      },
      {
        "seconds": 212,
        "step": "Install the tracking snippet directly or through Google Tag Manager."
      },
      {
        "seconds": 253,
        "step": "Test prompts in ChatGPT about the best YouTube analytics tools and see where the site appears."
      },
      {
        "seconds": 364,
        "step": "Test follow-up questions in Perplexity about pricing and features."
      },
      {
        "seconds": 615,
        "step": "Submit URLs to Bing and Google with custom scripts, with Index Guru as a paid option at about $9 a month."
      },
      {
        "seconds": 878,
        "step": "Look at llms.txt and ai.txt files that list pages and allow AI crawling."
      }
    ],
    "notCovered": [
      "Proof that the blog changes or the host switch caused more citations and crawler visits.",
      "Statistics beyond a single site, a week of data and a handful of manual prompt tests.",
      "Whether crawler visit counts are all real AI crawlers, since they come from the tracker's own snippet.",
      "Trial terms for Trakkr, which differ between this video's 14-day mention and other videos."
    ],
    "qa": [
      {
        "q": "What does the tracker measure?",
        "a": "AI crawler visits, citations, mentions and visibility across several AI models, per the dashboard shown."
      },
      {
        "q": "Why are FAQs expanded by default?",
        "a": "Crawlers cannot read collapsed content that needs JavaScript to open, Mike says."
      },
      {
        "q": "Why move to Vercel?",
        "a": "Vercel's built-in CDN, analytics and speed insights, at about $20 a month on Pro, beat his Hostinger setup, Mike says."
      }
    ]
  },
  "Zza-S7YsLy0": {
    "summary": "A Make.com scenario that watches a Google Sheet of new Skool community members, adds them to EmailOctopus and starts a three-email welcome sequence, with notes on a WhatsApp option and a Zapier route for paid members. Skool had no public API at the time, so Zapier writes members to the sheet. Mike recently made the community paid and can no longer collect emails, so the automation now depends on paid-member rows. Scraping Skool members through Apify is mentioned and skipped over terms of service.",
    "whatYouBuild": "A Make.com scenario that watches a members sheet, adds each person to EmailOctopus with first name and email, and a Zapier zap that appends new paid members to a Google Sheet.",
    "toolsUsed": [
      "Make.com",
      "Zapier",
      "Skool",
      "EmailOctopus",
      "Google Sheets",
      "Apify"
    ],
    "keySteps": [
      {
        "seconds": 49,
        "step": "Use Skool's Zapier integration to add each new member and their answers to a Google Sheet."
      },
      {
        "seconds": 139,
        "step": "Look at Apify actors for Skool, which Mike skips because of terms of service."
      },
      {
        "seconds": 200,
        "step": "Watch the sheet for new rows in Make.com and add each person to EmailOctopus."
      },
      {
        "seconds": 273,
        "step": "See the optional WhatsApp Business Cloud module, unused because phone numbers are not collected."
      },
      {
        "seconds": 437,
        "step": "Invite people to Skool through a webhook with the email appended, or by importing a CSV."
      },
      {
        "seconds": 580,
        "step": "Build a Zap with a new paid member trigger that writes first name, last name and email to a new sheet."
      },
      {
        "seconds": 670,
        "step": "Review the welcome sequence: an intro email, a 12-hour wait, a second email, a 2-day wait and a last email."
      }
    ],
    "notCovered": [
      "Consent for emailing and WhatsApp messaging members, and for bulk-inviting about 8,000 pending contacts scraped from Apollo.",
      "Whether the paid-member zap triggers, since no paid members exist yet and the test uses sample data.",
      "Current Skool features, since the video says there is no public API yet.",
      "Results of the sequence beyond 666 emails sent with open and click rates shown."
    ],
    "qa": [
      {
        "q": "Why use Zapier for Skool?",
        "a": "Skool has a built-in Zapier integration and no public API, so Zapier is the way to get member data out, per the video."
      },
      {
        "q": "Why can't Mike collect Skool member emails now?",
        "a": "The community became paid, which removed the membership questions that gathered emails."
      },
      {
        "q": "How much does EmailOctopus cost?",
        "a": "Mike says there is a free plan for up to 1,000 contacts and paid plans from about $18 a month for 2,500 contacts."
      }
    ]
  },
  "kKiFzNW9fjw": {
    "summary": "A Make.com scenario for AI avatar videos: it reads topics from Airtable, researches with Perplexity, writes a script with a custom ChatGPT assistant, creates a HeyGen avatar video with a voice clone, waits for rendering, uploads to a Facebook page and updates Airtable. The HeyGen API limits videos to 3 minutes and 720p with a watermark on lower plans, and a script over the limit fails. Mike makes the video manually in HeyGen to finish the demo, and the upload to Facebook works.",
    "whatYouBuild": "A Make.com scenario with Airtable, Perplexity, an OpenAI assistant, HeyGen, sleep steps, a Facebook video upload and an Airtable update.",
    "toolsUsed": [
      "Make.com",
      "Airtable",
      "Perplexity",
      "OpenAI API",
      "HeyGen",
      "Facebook"
    ],
    "keySteps": [
      {
        "seconds": 39,
        "step": "Search Airtable for the first topic with status to-do."
      },
      {
        "seconds": 105,
        "step": "Research the topic with Perplexity's Sonar model."
      },
      {
        "seconds": 151,
        "step": "Write a script with a custom assistant from the topic and research."
      },
      {
        "seconds": 212,
        "step": "Create a HeyGen avatar video with an avatar ID, a voice clone and the script."
      },
      {
        "seconds": 281,
        "step": "Find that the API limits videos to 3 minutes and lower resolution unless an expensive plan is used."
      },
      {
        "seconds": 382,
        "step": "Upload the finished video to a Facebook page from its URL."
      },
      {
        "seconds": 447,
        "step": "Update the Airtable record with the video URL and mark it done."
      },
      {
        "seconds": 796,
        "step": "Generate the video manually in HeyGen, then run the upload steps with its video ID."
      }
    ],
    "notCovered": [
      "A fully automatic run. The script exceeded 180 seconds and the render failed, so the video was made by hand.",
      "HeyGen API pricing in detail. Mike quotes Pro at about $99 a month and Scale at about $330.",
      "Quality control before posting and disclosure of AI avatar videos on Facebook.",
      "Consent and rights around voice and avatar clones."
    ],
    "qa": [
      {
        "q": "Why did the automatic run fail?",
        "a": "HeyGen's API rejected a script that made a video over 180 seconds."
      },
      {
        "q": "What does the API limit?",
        "a": "Videos up to 3 minutes and 1280 by 720, with a watermark on lower plans, per Mike."
      },
      {
        "q": "Did the Facebook upload work?",
        "a": "Yes, after a delay the manually made video appeared on the page."
      }
    ]
  },
  "J86tffN9nmg": {
    "summary": "Build a ChatGPT-style web app in Rocket.new from a prompt written in ChatGPT. After about ten minutes it produces a chat interface and a settings panel with some broken controls. Prompts fix the color scheme and connect an OpenAI API key. The assistant still answers as a GPT-4 model, and a custom domain needs a $25 a month plan. Mike prefers Lovable. The link is a promotion, and an API key is shown on screen and deleted afterwards.",
    "whatYouBuild": "A chat web app with a main interface and settings panel generated by Rocket.new, connected to the OpenAI API through a prompt.",
    "toolsUsed": [
      "Rocket.new",
      "ChatGPT",
      "OpenAI API",
      "Lovable"
    ],
    "keySteps": [
      {
        "seconds": 42,
        "step": "Choose a web app in Rocket.new and have ChatGPT write the prompt."
      },
      {
        "seconds": 132,
        "step": "Select the main chat interface and settings screens and build them, with tokens charged per screen."
      },
      {
        "seconds": 216,
        "step": "Compare with an agency site previously built in Lovable in about two hours."
      },
      {
        "seconds": 347,
        "step": "Ask Rocket to fix the broken color scheme setting, which works after a prompt."
      },
      {
        "seconds": 496,
        "step": "Ask it to connect OpenAI, paste in an API key and see real responses."
      },
      {
        "seconds": 677,
        "step": "Publish the app and find that a custom domain needs the $25 a month plan with 5 million tokens."
      }
    ],
    "notCovered": [
      "Keeping the API key secret. Pasting it into a prompt of a hosted builder may expose it in the app's code, so Mike says he deletes it afterwards.",
      "Why the app answers as GPT-4 after being asked to use GPT-5.",
      "Remaining broken features such as font size and the profile page.",
      "A fair comparison with Lovable, beyond Mike's opinion that Lovable is better."
    ],
    "qa": [
      {
        "q": "How long did the first version take?",
        "a": "About 10 to 12 minutes, using around 200,000 of the plan's tokens."
      },
      {
        "q": "What does a paid plan cost?",
        "a": "$25 a month for 5 million tokens and $50 for 10 million, according to Mike."
      },
      {
        "q": "Did the chat work with a real key?",
        "a": "Yes, it returned real OpenAI answers, but slowly, and it reported a GPT-4 architecture."
      }
    ]
  },
  "0jzTOUv_B04": {
    "summary": "A walkthrough of how Mike tracks and improves his analytics site's visibility in AI answers with Trakkr: a rank of ninth out of 209 competitors, crawler visits from ChatGPT and Claude, and a Codex run that pulls fixes through the Trakkr MCP. Mike notes AI search still sends few visitors compared with Google. The link is an affiliate link, and the Trakkr plan is $100 a month after a trial.",
    "whatYouBuild": "A Trakkr MCP connection to Codex that lists crawler and citation actions, followed by fixes to llms.txt, sitemap and robots files.",
    "toolsUsed": [
      "Trakkr",
      "Codex",
      "skills.sh",
      "Google Search Console"
    ],
    "keySteps": [
      {
        "step": "Test a ChatGPT prompt for the best apps for tracking YouTube competitors and see Mike's site listed first."
      },
      {
        "step": "Read the dashboard: rank nine of 209 competitors, visibility and win rate."
      },
      {
        "step": "Check AI crawler visits by bot, including about 4,300 from Claude and 7,400 from ChatGPT on one day."
      },
      {
        "step": "Review per-page citation readiness and the article structure that helps citations."
      },
      {
        "step": "Use the Trakkr MCP in Codex to list actions ranked by crawlability and citation impact, and start the fixes."
      },
      {
        "step": "Compare AI referrals with Google: 21 ChatGPT visitors and 18 Claude visitors in a week against 39,000 Google visitors over three months."
      },
      {
        "step": "Review Trakkr's growth plan at $100 a month with eight models and MCP access."
      }
    ],
    "notCovered": [
      "Proof that the blog work caused the ranking, or that AI mentions bring paying users. The video shows few AI visitors.",
      "The comparison with YouTube.com, which is about citations in AI answers and not search ranking.",
      "Trial terms. Mike mentions both a two-day and a 14-day trial.",
      "Fixing the file issues Codex starts on, since the video ends as it begins."
    ],
    "qa": [
      {
        "q": "How much AI traffic does the site get?",
        "a": "Little. Mike says ChatGPT sent about 21 visitors in a week and about 700 over three months, against 39,000 from Google."
      },
      {
        "q": "How much does Trakkr cost?",
        "a": "$100 a month for the growth plan after a free trial, per the video."
      },
    ]
  },
  "MIwd2pzmUf0": {
    "summary": "Another n8n workflow that turns a YouTube video into a LinkedIn post, a newsletter and a detailed infographic: a form takes the URL, Apify fetches the transcript, Gemini summarizes it, KIE's Nano Banana Pro makes a 2K 16:9 infographic that is polled until ready and saved to Google Drive, and Claude Sonnet 4 writes the post and newsletter into a Google Doc. Mike says it produced nearly 200,000 LinkedIn impressions in a month. That figure is self-reported, and posting stays manual.",
    "whatYouBuild": "An n8n workflow with a form trigger, Apify transcript, split and aggregate steps, a Gemini summary, a KIE image task with a polling loop, a Drive upload, a base64 code step and Claude steps that write the post and newsletter.",
    "toolsUsed": [
      "n8n",
      "Apify",
      "Gemini",
      "Nano Banana Pro",
      "KIE",
      "Claude",
      "Google Drive"
    ],
    "keySteps": [
      {
        "seconds": 60,
        "step": "Start with a form trigger that takes the YouTube URL."
      },
      {
        "seconds": 120,
        "step": "Run the Apify YouTube transcript actor, then split and aggregate the text to drop timestamps."
      },
      {
        "seconds": 180,
        "step": "Summarize the transcript with a Gemini node."
      },
      {
        "seconds": 240,
        "step": "Turn the summary into an infographic prompt and call KIE's Nano Banana Pro at 2K and 16:9."
      },
      {
        "seconds": 300,
        "step": "Poll the KIE task every five seconds until its state is success."
      },
      {
        "seconds": 360,
        "step": "Download the image, upload it to Google Drive and convert it to base64."
      },
      {
        "seconds": 420,
        "step": "Ask Claude for a LinkedIn post and a newsletter from the transcript and save both to a Google Doc."
      }
    ],
    "notCovered": [
      "Automatic posting to LinkedIn, which is manual.",
      "Independent evidence for the quoted impressions or newsletter growth.",
      "The accuracy of the summaries and whether repurposing other creators' videos needs permission.",
      "Per-run credit costs, beyond the note that KIE is the main cost."
    ],
    "qa": [
      {
        "q": "Why 2K resolution?",
        "a": "4K files reach about 20 MB, while 2K infographics are around 5 to 6 MB, Mike says."
      },
      {
        "q": "Why remove timestamps?",
        "a": "So the prompts to Gemini and Claude contain clean text, which is why the transcript is split and aggregated first."
      },
      {
        "q": "Where can I get the n8n YouTube to LinkedIn workflow template?",
        "a": "In the classroom of Mike's Skool community, with a 7-day trial for paid tiers."
      }
    ]
  },
  "X9Bo29B_46k": {
    "summary": "Tips for getting more from Claude Fable 5 on limited credits after its July 2026 return: lower the effort level, use plan mode with the superpowers skill, give clear briefs, set goals and loops, and add the Compound Engineering plugin to Claude Code and Codex. Mike also installs a CLAUDE.md improver, a memory optimizer and the Caveman skill, and falls back to Opus 4.8 for routine work. Claims about savings and about Fable being nerfed are not measured.",
    "whatYouBuild": "A Claude Code and Codex setup with the Compound Engineering plugin, an improved CLAUDE.md scoring 95 out of 100, a memory optimization skill and Caveman, plus habits for choosing effort and models.",
    "toolsUsed": [
      "Claude Fable 5",
      "Claude Code",
      "Codex",
      "Compound Engineering",
      "Caveman"
    ],
    "keySteps": [
      {
        "seconds": 84,
        "step": "Meet the Compound Engineering plugin that spends most effort on planning and review."
      },
      {
        "seconds": 156,
        "step": "Lower effort from high to medium or low to save credits, with max and ultra code costing the most."
      },
      {
        "seconds": 197,
        "step": "Read Anthropic's prompting notes: short clear instructions, effort as the main dial, boundaries and memory."
      },
      {
        "seconds": 283,
        "step": "Work in plan mode with superpowers, then switch back to build mode."
      },
      {
        "seconds": 372,
        "step": "Use goal and loop commands and effective briefs for long unattended work."
      },
      {
        "seconds": 458,
        "step": "Install the Compound Engineering plugin in Claude Code and Codex."
      },
      {
        "seconds": 637,
        "step": "Run a CLAUDE.md improver skill and switch the model to Opus 4.8 for that routine job."
      },
      {
        "seconds": 713,
        "step": "Install a memory optimizer and the Caveman skill to cut text and credit use."
      }
    ],
    "notCovered": [
      "Measured credit savings from the plugin and skills.",
      "Safety review of third-party plugins and skills before installing them.",
      "Evidence for the claim that Fable 5 was nerfed after re-release, which rests on a chart Mike reads.",
      "The one-shot island game demo, which is shown rather than built."
    ],
    "qa": [
      {
        "q": "How do I use fewer Claude Fable 5 credits?",
        "a": "Use medium effort for most tasks, plan before building, and switch to Opus 4.8 for simple jobs, Mike advises."
      },
      {
        "q": "What does the Compound Engineering plugin do?",
        "a": "It guides a plan, work, review cycle, with about 80 percent of effort in planning and review, according to its description."
      },
      {
        "q": "Did Fable 5 use many credits?",
        "a": "Yes. Mike was at his Fable 5 limit and says it uses credits faster than any other model he has tried."
      }
    ]
  },
  "3cP3DeBG5Q0": {
    "summary": "Build and tune a Claude Code skill that edits long-form YouTube videos: it merges clips, transcribes with Whisper, picks a hook and the best segments, removes filler and dead pauses, normalizes audio, and exports a 1080p 30 fps MP4 with a chapters file. Mike has Claude write a gap report and phased improvements until the skill's own confidence rating reaches 94 out of 100, with an 804-line Python script behind it. The skill is sold on Gumroad. The scores are the model's self-ratings, and Mike says the final video was edited with it.",
    "whatYouBuild": "A SKILL.md plus an editorial guide and a long-form Python editing script, shared across Claude Code, Codex and OpenCode by symlinks, with a changelog and project memory.",
    "toolsUsed": [
      "Claude Code",
      "Codex",
      "OpenCode",
      "Whisper",
      "FFmpeg"
    ],
    "keySteps": [
      {
        "seconds": 33,
        "step": "See how the skill works: import clips, transcribe, select segments, clean filler and pauses, normalize audio, export with chapters."
      },
      {
        "seconds": 189,
        "step": "Answer Claude Desktop's questions to write an optimization prompt for the skill."
      },
      {
        "seconds": 293,
        "step": "Read a gap report scored against the phase two spec, with retention, call to action and natural feel missing or partial."
      },
      {
        "seconds": 413,
        "step": "Approve the rewrite of the editorial rules, including a cold-open hook and a mid-video re-hook."
      },
      {
        "seconds": 547,
        "step": "Add guardrails and failure handling, such as timestamp and low-confidence word checks, in the Python script."
      },
      {
        "seconds": 671,
        "step": "Reach a confidence rating of 88 out of 100, then 94 after later phases."
      },
      {
        "seconds": 873,
        "step": "Link the updated skill into Codex and OpenCode."
      },
      {
        "seconds": 931,
        "step": "Hear where to get the skill and run the edit command."
      }
    ],
    "notCovered": [
      "An independent quality check of the edited videos. The confidence ratings are produced by the model.",
      "The previous day's rough result, which Mike says was not completely correct.",
      "What the Python script actually does, which Mike says he cannot read.",
      "Licensing and price of the Gumroad download."
    ],
    "qa": [
      {
        "q": "How long did a Claude Code skill edit take?",
        "a": "About 45 minutes for a 13-minute video the day before, which Mike says would have taken at least an hour by hand."
      },
      {
        "q": "What does the Claude Code video editing skill export?",
        "a": "A 1080p, 30 fps MP4 and a separate YouTube chapters file."
      },
      {
        "q": "Does it work outside Claude Code?",
        "a": "Yes. Mike links the same skill into Codex and OpenCode."
      }
    ]
  },
  "DtmxxnAbS00": {
    "summary": "Create a custom OpenAI assistant for writing community posts: use the OpenAI platform's prompt generator, copy the developer message into a new assistant on GPT-4, test and improve it, then call it from Make.com with the Message an Assistant module. Mike pastes the output into Skool by hand because Skool has no public API, and tops up API credits to $5.70. The first outputs miss the wanted format until the prompt is edited.",
    "whatYouBuild": "An OpenAI assistant named school community post creator, tested in the platform and connected to a one-module Make.com scenario.",
    "toolsUsed": [
      "OpenAI Platform",
      "Make.com",
      "Skool",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 53,
        "step": "Use the OpenAI platform's chat prompt tool to generate a detailed developer message for the assistant."
      },
      {
        "seconds": 135,
        "step": "Create an assistant, paste the prompt in as system instructions and pick GPT-4."
      },
      {
        "seconds": 243,
        "step": "Note the option to upload files as a knowledge base with file search."
      },
      {
        "seconds": 307,
        "step": "Test with a request, then edit the prompt to add reasoning and examples until posts improve."
      },
      {
        "seconds": 434,
        "step": "Mention free plan and API credit details."
      },
      {
        "seconds": 546,
        "step": "Add a Make.com scenario with the assistant module and a simple message, and read the post text."
      },
      {
        "seconds": 673,
        "step": "Post the text manually to Skool with a GIF and add thread-style comments."
      }
    ],
    "notCovered": [
      "Posting to Skool automatically, which is not possible without a public API. The Make.com Skool module can only invite members.",
      "Output quality at scale. Mike says the first posts are too broad and need prompt tuning.",
      "Whether the platform's assistants feature remains available, since OpenAI changes these tools.",
      "Costs beyond a $5.70 balance and the claim of about 30 cents spent over a few days."
    ],
    "qa": [
      {
        "q": "Why use the OpenAI platform to write the prompt?",
        "a": "Its prompt generator produces a prompt about ten times better than a plain ChatGPT one, Mike finds, though that is a personal view."
      },
      {
        "q": "Can the post be published automatically?",
        "a": "Not to Skool. Mike pastes the result in by hand."
      },
      {
        "q": "What do I need for the API?",
        "a": "Credits in the OpenAI platform billing page, or the scenario errors with an insufficient credit message."
      }
    ]
  },
  "UkYoSNiqa6o": {
    "summary": "A Make.com scenario that reads contacts from a Google Sheet, researches each person's organization niche with Perplexity, writes a short PR pitch with a ChatGPT model, and either emails it in HTML or saves it to Airtable for review. Mike tests on one and then five editors, tightens the prompt to a seventh-grade reading level, and finds some pitches contain unfilled placeholders, which is why drafts go to Airtable before sending. A 60-second wait between sends is added. Targeting in the sample list was off.",
    "whatYouBuild": "A Make.com scenario with Google Sheets rows, an array and iterator, a Perplexity niche lookup, a ChatGPT pitch, an HTML conversion, an email send and an Airtable record with first name, company, email, body and status.",
    "toolsUsed": [
      "Make.com",
      "Google Sheets",
      "Perplexity",
      "ChatGPT",
      "Airtable"
    ],
    "keySteps": [
      {
        "seconds": 26,
        "step": "Search Google Sheets rows and limit to one contact for testing."
      },
      {
        "seconds": 66,
        "step": "Build an array of first name, email, organization, website and title."
      },
      {
        "seconds": 101,
        "step": "Step through each contact with an iterator."
      },
      {
        "seconds": 124,
        "step": "Ask Perplexity's Sonar reasoning model for the organization's niche."
      },
      {
        "seconds": 148,
        "step": "Write the pitch with a ChatGPT model, then shorten it by asking for simple language and no subject line."
      },
      {
        "seconds": 250,
        "step": "Convert the text to HTML for the email."
      },
      {
        "seconds": 275,
        "step": "Send by email with a subject line, a 60-second wait between sends and an optional attachment."
      },
      {
        "seconds": 411,
        "step": "Save drafts to Airtable with a to-do status instead of sending right away."
      }
    ],
    "notCovered": [
      "Anti-spam and consent rules for cold outreach, and whether unsolicited pitches to editors are welcome.",
      "Deliverability, replies and results. No email is actually sent in the video.",
      "Fixing the unfilled placeholder in one pitch, which is why review is suggested.",
      "How the follow-up sending automation from Airtable would work."
    ],
    "qa": [
      {
        "q": "Why save to Airtable first?",
        "a": "Some drafts came out with placeholders such as an unfilled topic idea, so Mike reviews them before any send."
      },
      {
        "q": "How is the pitch kept simple?",
        "a": "The prompt asks for language a seventh grader could understand and no subject line or extra text."
      },
      {
        "q": "Is the Make.com PR pitch template free?",
        "a": "It is free or pay what you want, through a link in the description, Mike says."
      }
    ]
  },
  "ffnMlBzcJOQ": {
    "summary": "An unfinished attempt to build a stock dashboard with Alpaca's API using OpenCode's free models. A detailed prompt from Claude Desktop scaffolds a Node.js and Express app with a WebSocket bridge, then a 401 Unauthorized error persists until Mike realizes the keys must come from the paper trading account and not the broker API. Prices then load, but the chart never renders by the end. Paper trading only, no real money, and the key is shown on screen and deleted later.",
    "whatYouBuild": "A local Node.js dashboard at localhost:3000 with an Alpaca client, routes for account, positions and orders, a WebSocket stream, a symbol lookup and a chart that is still not displaying.",
    "toolsUsed": [
      "Alpaca",
      "OpenCode",
      "Claude Desktop",
      "Node.js"
    ],
    "keySteps": [
      {
        "seconds": 44,
        "step": "Write a detailed MVP prompt in Claude Desktop and paste it into OpenCode."
      },
      {
        "seconds": 81,
        "step": "Create a free Alpaca developer account."
      },
      {
        "seconds": 138,
        "step": "Let OpenCode scaffold the project with its free models."
      },
      {
        "seconds": 335,
        "step": "Generate API keys and enter them in the .env file."
      },
      {
        "seconds": 427,
        "step": "Run npm start and open the dashboard on localhost:3000."
      },
      {
        "seconds": 480,
        "step": "Chase the 401 error and let OpenCode read Alpaca's docs."
      },
      {
        "seconds": 722,
        "step": "Fix it by generating keys under the paper trading account, which gives a $100,000 test balance."
      },
      {
        "seconds": 834,
        "step": "Add console logging to debug the chart, which still does not render."
      }
    ],
    "notCovered": [
      "A working chart. The data arrives but nothing displays by the end of the video.",
      "Trading or investment advice. Only paper trading is used.",
      "Safe handling of API keys. A key is shown on screen and Mike says he deletes it later.",
      "The accuracy of the displayed prices, which Mike says he cannot confirm."
    ],
    "qa": [
      {
        "q": "Why did the API return 401?",
        "a": "Mike had keys from the broker API, and the market data worked only after creating keys under the paper trading account."
      },
      {
        "q": "Was real money involved?",
        "a": "No. The account is a sandbox or paper account with fake balances."
      },
      {
        "q": "Which models did OpenCode use?",
        "a": "Free ones such as MiniMax 2.5, with Qwen and Kimi also available, per Mike."
      }
    ]
  },
  "a3TwomrR6pw": {
    "summary": "A news-reading video from July 2025 on YouTube's announced update to Partner Program rules on inauthentic, mass-produced and repetitive content, taking effect July 15. Mike reads several articles aloud (TechCrunch and others), adds opinions on AI avatar and faceless channels, and lists strategies the articles suggest: add human input, edit with care, transform reused material and disclose AI use. Exact policy wording had not been released at recording, and enforcement details are the articles' speculation. Nothing here is legal or policy advice.",
    "whatYouBuild": "No build. A summary of reported policy changes and Mike's reading of what they mean for AI avatar, faceless and reused content.",
    "toolsUsed": [
      "YouTube Studio",
      "HeyGen",
      "Synthesia",
      "Syllaby",
      "Perplexity",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "seconds": 60,
        "step": "Read TechCrunch's report that YouTube is preparing a crackdown on mass-produced and repetitive videos from July 15."
      },
      {
        "seconds": 131,
        "step": "Hear that YouTube's Rene Ritchie described the change as a minor update to long-standing Partner Program rules."
      },
      {
        "seconds": 206,
        "step": "Consider what the update could mean for AI avatar videos made with tools such as HeyGen and Synthesia."
      },
      {
        "seconds": 316,
        "step": "Review the content types the articles say are at risk: aggregators, templated Shorts, low-effort AI and slideshow videos."
      },
      {
        "seconds": 388,
        "step": "Note that simply adding music, changing speed or cropping reused clips is described as not enough."
      },
      {
        "seconds": 497,
        "step": "Read the possible penalties: demonetized videos, removal from the program or suspension, with appeals."
      },
      {
        "seconds": 621,
        "step": "Go through suggested strategies: show your voice and face, edit thoughtfully, transform reused material and disclose AI use."
      }
    ],
    "notCovered": [
      "YouTube's own policy text, which the video says was not yet released. Check YouTube's help page for the current rules.",
      "Whether avatar or faceless channels are actually affected. Mike relays a tool founder's claim that they are not and says it is unofficial.",
      "What happened after July 15.",
      "Sources beyond news articles. Mike mixes quotes from the articles with his own opinions."
    ],
    "qa": [
      {
        "q": "When did YouTube's monetization update start?",
        "a": "July 15, 2025, according to the articles read in the video."
      },
      {
        "q": "Does YouTube ban AI content?",
        "a": "The articles say it does not explicitly ban AI, but low-effort, repetitive or unoriginal content risks losing monetization."
      },
      {
        "q": "Do I need to disclose AI?",
        "a": "Mike recommends turning on YouTube's AI-generated label when uploading, as one of the articles advises."
      },
      {
        "q": "Who needs to worry?",
        "a": "Channels in the Partner Program, which requires 1,000 subscribers and 4,000 watch hours, according to the video."
      }
    ]
  },
  "kUbhr1QGYeU": {
    "summary": "An experiment in building a personal AI operating system dashboard with Hermes Agent, ChatGPT and OpenCode. A generated prompt creates a React dashboard with pages for content, analytics, revenue and operations, then a 13-page extension plan runs on OpenCode with DeepSeek V4 Flash. It runs locally on mock data, and live YouTube data was not working by the end. Mike says he is not sure yet why he needs it, and mentions his own analytics product and an OpenCode sign-up link along the way.",
    "whatYouBuild": "A local React dashboard served with npm run dev, with mock data for two YouTube channels, an analytics product and a Skool community, plus a Google Cloud project with the YouTube Data and Analytics APIs enabled.",
    "toolsUsed": [
      "Hermes Agent",
      "OpenCode Go",
      "MiniMax 2.7",
      "DeepSeek V4 Flash",
      "ChatGPT",
      "Codex",
      "Google Cloud Console"
    ],
    "keySteps": [
      {
        "seconds": 67,
        "step": "Run the generated system prompt in Hermes Agent with MiniMax 2.7 through OpenCode Go."
      },
      {
        "seconds": 120,
        "step": "Switch to ChatGPT for the dashboard prompt after hitting a Claude Desktop usage limit."
      },
      {
        "seconds": 249,
        "step": "Fix a build error and a blank page by running npm run dev from the dashboard folder and having OpenCode fix a line in App.tsx."
      },
      {
        "seconds": 308,
        "step": "Open the first version of the dashboard in the browser."
      },
      {
        "seconds": 413,
        "step": "Run a 13-page extension plan in OpenCode with sub-agents on DeepSeek V4 Flash."
      },
      {
        "seconds": 570,
        "step": "Create a Google Cloud project and enable the YouTube Data API for live analytics."
      },
      {
        "seconds": 852,
        "step": "Add the community as a sidebar link and command center card, since Skool has no API."
      },
      {
        "seconds": 954,
        "step": "Debug the credentials in Codex and run a front-end design skill on the color scheme."
      }
    ],
    "notCovered": [
      "Live YouTube data. The connection was still failing at the end and all numbers shown are mock data.",
      "A clear use for the dashboard. Mike says he does not yet understand why he needs it.",
      "OAuth consent setup and key handling for the Google project.",
      "Costs beyond the quoted $10 a month OpenCode Go plan and about $1.26 of MiniMax usage."
    ],
    "qa": [
      {
        "q": "Why switch from Hermes Agent to OpenCode?",
        "a": "Hermes was slow and struggled with a rendering error, while OpenCode fixed it quickly, Mike says."
      },
      {
        "q": "Is the data real?",
        "a": "No. It is mock data, and the live YouTube integration was unfinished."
      },
      {
        "q": "Can it pull Skool data?",
        "a": "No, Skool has no API, so it only links to the community."
      }
    ]
  },
  "KEXgl3vsVMI": {
    "summary": "A July 2025 look at Skool's new $9 a month Hobby plan next to the $99 Pro plan. As Mike describes them, Hobby has one admin, a 10 percent transaction fee against 2.9 percent, no custom URL, no plugins such as Zapier, no sidebar links, no Facebook pixel and no hiding suggested communities. Mike downgraded two communities and shows their about page, email capture, discovery ranking and activity habits. The sign-up link is an affiliate link and plan details may have changed since.",
    "whatYouBuild": "No build. A comparison of Skool plans with a tour of Mike's free and paid communities and an EmailOctopus welcome sequence.",
    "toolsUsed": [
      "Skool",
      "EmailOctopus",
      "Zapier",
      "Facebook Pixel"
    ],
    "keySteps": [
      {
        "seconds": 12,
        "step": "Meet the new $9 Hobby plan beside the $99 Pro plan."
      },
      {
        "seconds": 81,
        "step": "Compare features: admins, 10 percent against 2.9 percent transaction fee, custom URL and suggested communities."
      },
      {
        "seconds": 136,
        "step": "See what only Pro includes: plugins and affiliates, sidebar links and the Facebook pixel."
      },
      {
        "seconds": 216,
        "step": "Start a free trial, which Mike corrects to 14 days."
      },
      {
        "seconds": 270,
        "step": "Design the about page and classroom with a cover image, video and low-ticket courses."
      },
      {
        "seconds": 381,
        "step": "Collect emails with membership questions, now available on free and paid communities."
      },
      {
        "seconds": 428,
        "step": "Use Skool's affiliate program and an EmailOctopus sequence."
      },
      {
        "seconds": 558,
        "step": "Browse Discovery rankings, examples and activity levels."
      }
    ],
    "notCovered": [
      "Current Skool pricing and features. The video is from July 2025 and the plans may have changed.",
      "Independent checks of the example earnings, such as $39,000 or $300,000 a month, which are Mike's estimates from public member counts.",
      "Full costs and tax. The 10 percent fee is Skool's, before payment processing.",
      "Whether the 69 percent conversion rate holds, since Mike says it reset after downgrading."
    ],
    "qa": [
      {
        "q": "What does Skool's Hobby plan cost?",
        "a": "$9 a month at the time of the video, with a 10 percent transaction fee, according to Mike."
      },
      {
        "q": "What does Skool's Hobby plan lack compared with Pro?",
        "a": "Multiple admins, a custom URL, plugins like Zapier, sidebar links and the Facebook pixel, per the video."
      },
    ]
  },
  "YNpIRq7O3UE": {
    "summary": "A tour of agents and scheduled jobs in Odysseus, an AI coding harness Mike says PewDiePie announced. The main build is a sponsorship outreach agent in Node.js that lists sponsor targets, drafts pitch and follow-up emails, tracks a small CRM and runs weekly by cron, with sending set to go through the connected Gmail account. The $81,000 in the title is the agent's own estimated pipeline for 32 prospects, not deals won. Sponsor values and email addresses were generated by the model and unchecked, and Mike starts sending live emails at the end.",
    "whatYouBuild": "A sponsorship outreach project with agent.js, youtube.js, research.js, outreach.js, pipeline.js and sponsors.json, using OpenRouter with Gemini 2.5 Flash, plus a Monday 9 a.m. Bangkok-time cron job for pitches, follow-ups and a report.",
    "toolsUsed": [
      "Odysseus",
      "OpenCode Go",
      "DeepSeek V4 Pro",
      "OpenRouter",
      "Gemini 2.5 Flash",
      "Gmail",
      "Node.js"
    ],
    "keySteps": [
      {
        "step": "Ask Odysseus which agents to build and pick a sponsorship outreach agent and an end-to-end video pipeline agent."
      },
      {
        "step": "Look at existing cron jobs, such as a daily LinkedIn newsletter, competitor checks, rank tracking and an evening email digest."
      },
      {
        "step": "Build the sponsorship agent files and generate sponsor targets with estimated deal sizes."
      },
      {
        "step": "Hit an OpenAI quota error and switch the model calls to an OpenCode key and then OpenRouter."
      },
      {
        "step": "Run the agent commands for stats, dashboard, research, pitch and report, showing a pipeline of $29,000 across 12 deals."
      },
      {
        "step": "Schedule the weekly cron job, then add 20 more prospects for 32 deals worth $81,000."
      },
      {
        "step": "Send the first batch of pitch emails through the connected Gmail account."
      }
    ],
    "notCovered": [
      "Any deal won or any reply. The $81,000 is an estimate generated by the model.",
      "Checking the sponsor values and contact emails, which Mike says might need a verifier.",
      "Consent, spam rules and reputation risk of automatic cold emails to brands.",
      "How the video ends, since the sending is still in progress.",
      "Timestamps, because the video's automatic chapters do not match the content."
    ],
    "qa": [
      {
        "q": "Did the agent really find $81,000 in deals?",
        "a": "No. It is the total of estimated sponsorship values for 32 prospects it listed, none of which had replied."
      },
      {
        "q": "What does the Odysseus outreach agent cost to run?",
        "a": "Mike shows about 51 cents of DeepSeek V4 Pro on one day inside a $10 a month OpenCode Go plan."
      },
      {
        "q": "Will it send emails by itself?",
        "a": "Yes. The cron job is set to send from the connected Gmail account each Monday, and Mike also sends a batch right away."
      }
    ]
  },
  "vxH102ZvjUg": {
    "summary": "Install Clawdbot, renamed Moltbot the same day and later Clawbot in the terminal, on a Hostinger VPS instead of a personal computer, to limit the risk of an agent that can act on files. Mike runs the one-line installer over SSH, picks quick start, uses a Gemini API key with Gemini 3 Flash Preview, enables skills and hooks, names the agent Echo and links WhatsApp with a QR code. A morning briefing cron job gives no output and a skill install fails, so the setup is unfinished. The Hostinger link is an affiliate link.",
    "whatYouBuild": "A Debian VPS with the assistant installed, a Gemini key, a WhatsApp link, an agent named Echo, soul and identity files and a morning-briefing cron job that does not yet work.",
    "toolsUsed": [
      "Moltbot",
      "Hostinger VPS",
      "Gemini",
      "WhatsApp",
      "Google AI Studio",
      "ClawHub"
    ],
    "keySteps": [
      {
        "step": "Explain the security reason for installing on a VPS and not a personal machine."
      },
      {
        "step": "Create a Hostinger KVM VPS with Debian and connect over SSH."
      },
      {
        "step": "Run the installer command, which sets up Node.js and the assistant in about a minute."
      },
      {
        "step": "Accept the security warning, choose quick start and add a Gemini API key from Google AI Studio."
      },
      {
        "step": "Choose Gemini 3 Flash Preview, pick WhatsApp, enable skills and hooks and hatch the bot in the terminal."
      },
      {
        "step": "Name the agent Echo and test a daily 8 a.m. morning briefing cron job, which returns no output."
      },
      {
        "step": "Link WhatsApp with the channels login command, list and enable plugins, and try a ClawHub skill install that errors."
      }
    ],
    "notCovered": [
      "A working morning briefing, since no calendar, weather or email sources were connected.",
      "A completed skill install. ClawHub returned an error.",
      "Securing the VPS itself, such as non-root users and firewall rules. Mike runs as root.",
      "The project's current name, install command and security status. The video is from January 2026 and the rebrand was happening that day.",
      "Costs beyond the VPS plan and Gemini usage."
    ],
    "qa": [
      {
        "q": "Why install Clawdbot on a VPS?",
        "a": "The agent could damage files on a personal computer, so a server limits the risk, Mike says."
      },
      {
        "q": "Did the WhatsApp link work?",
        "a": "Yes, after the QR code failed during setup and Mike ran the channels login command."
      },
    ]
  },
  "SLAnjvWK1Y4": {
    "summary": "A long Make.com build of a YouTube Shorts pipeline: Apify scrapes the latest videos of three AI-automation creators, Airtable stores them, an OpenAI assistant turns the most viewed titles into video ideas, GPT-4.1 writes scene-by-scene scripts, JSON2Video renders a vertical video and the file uploads to YouTube with an AI-generated label. The final run fails because the free JSON2Video quota is used up, so Mike hardcodes an older render to show the download. The template costs $15, and HeyGen is suggested as an avatar alternative.",
    "whatYouBuild": "A Make.com scenario of about a dozen modules with Apify, an array aggregator and iterator, two Airtable tables, a text aggregator, an OpenAI assistant, a JSON parser, a GPT-4.1 script step, JSON2Video, a render wait, an HTTP download and a YouTube upload.",
    "toolsUsed": [
      "Make.com",
      "Apify",
      "Airtable",
      "OpenAI Assistants",
      "GPT-4.1",
      "JSON2Video",
      "YouTube",
      "HeyGen"
    ],
    "keySteps": [
      {
        "seconds": 107,
        "step": "Set channel URL variables and run Apify's fast YouTube channel scraper, then fetch the dataset items."
      },
      {
        "seconds": 450,
        "step": "Aggregate the results, iterate and save creator, title, link, duration and views into an Airtable table, then sort by views."
      },
      {
        "seconds": 669,
        "step": "Send the titles and views to a YouTube idea generator assistant and ask for JSON ideas with summaries."
      },
      {
        "seconds": 749,
        "step": "Parse the JSON and save the ideas to a second Airtable table."
      },
      {
        "seconds": 942,
        "step": "Ask GPT-4.1 for a script in scenes, each with voiceover text and an image prompt."
      },
      {
        "seconds": 1121,
        "step": "Render a vertical video with JSON2Video, wait, store the URL in Airtable, download the file and upload it to YouTube with the AI label."
      }
    ],
    "notCovered": [
      "A successful end-to-end run. JSON2Video's free quota ran out and the render step failed.",
      "Terms of service for scraping YouTube, which Mike flags as a risk.",
      "Whether Shorts built from other creators' top topics and unedited stock imagery meet YouTube's rules on repetitive or mass-produced content.",
      "Cleaning up duplicate Airtable rows created by repeated test runs.",
      "Results from posting."
    ],
    "qa": [
      {
        "q": "Why did the final run fail?",
        "a": "JSON2Video reported the free plan's time quota was exceeded and asked for a paid plan."
      },
      {
        "q": "Is there a ready-made template for the Shorts automation?",
        "a": "Yes, Mike sells it for $15 on Gumroad and in his Skool community."
      },
      {
        "q": "Can I use an avatar instead?",
        "a": "Mike suggests swapping JSON2Video for HeyGen with a 720 by 1280 vertical output."
      }
    ]
  },
  "R90zVHmoj7A": {
    "summary": "An introductory Make.com course recorded as lessons: the dashboard and operation limits, a Gmail-from-Google-Sheet template, a scenario from scratch that chains OpenAI, Airtable, an image model and a Facebook post, and an Apify-based Apollo lead scraper that writes to Google Sheets. Errors are left in on purpose, such as an image model needing a verified organization and a Facebook upload needing an HTTP download step. The sign-up link is an affiliate link, and the lead-scraper template is sold in a bundle.",
    "whatYouBuild": "A Google Sheets to Gmail scenario from a template, a scenario from scratch with OpenAI completion, Airtable record, image generation, HTTP download and a Facebook photo post, and a scraper scenario with Apify, array, iterator and Google Sheets.",
    "toolsUsed": [
      "Make.com",
      "Google Sheets",
      "Gmail",
      "OpenAI",
      "Airtable",
      "Facebook",
      "Apify",
      "Apollo"
    ],
    "keySteps": [
      {
        "step": "Tour the dashboard: operations used, scenarios, templates, connections and webhooks."
      },
      {
        "step": "Create a scenario from a template that sends a Gmail message for each new Google Sheet row, and send a test to your own address."
      },
      {
        "step": "Build from scratch with an OpenAI chat completion, save the result to an Airtable record and generate an image."
      },
      {
        "step": "Fix errors as they appear: a 400 from one image model, an organization verification requirement on another, and a Facebook upload that needs an HTTP file download first."
      },
      {
        "step": "Post the generated image to a Facebook page."
      },
      {
        "step": "Review the Apollo lead scraper: Airtable supplies search URLs, Apify scrapes 100 leads and Google Sheets stores them."
      },
      {
        "step": "Run the scraper live for a head of growth search and watch 100 rows arrive."
      }
    ],
    "notCovered": [
      "Terms of service and privacy rules for scraping Apollo with Apify and contacting the people scraped.",
      "Exact Make.com pricing. Mike says paid plans start around $10 a month for about 10,000 operations.",
      "A fix for the phone number field, which did not format correctly.",
      "Timestamps, because the video's automatic chapters do not match the lessons."
    ],
    "qa": [
      {
        "q": "How much does the Apify Apollo lead scraping cost?",
        "a": "About $1.20 per 1,000 leads on Apify, with $5 of free credit each month, Mike says."
      },
      {
        "q": "Why did the Facebook post fail at first?",
        "a": "The image URL had to be downloaded with an HTTP request step before the photo upload, and the first image models returned errors."
      }
    ]
  },
  "mKsPxDi7uM0": {
    "summary": "Build a Facebook thread generator with Replit's AI agent, modeled on a competing tool. The prompt creates a landing page and generator, an OpenAI key is added, and several errors follow, including max tokens, JSON object format and a 500, before posts generate in a numbered thread style. Mike adds a demo popup, AI-made images, a thread history with copy and edit, and Postgres with Google sign-in, then hits the free plan limit. Deploying needs a paid plan, and the link is a referral link.",
    "whatYouBuild": "A Replit web app called Viral Post Genie with a topic, style and call to action form, an OpenAI-backed generator that outputs numbered thread posts, a demo popup, generated images, a thread history and Google sign-in on a temporary Postgres database.",
    "toolsUsed": [
      "Replit",
      "OpenAI API",
      "ChatGPT",
      "Postgres"
    ],
    "keySteps": [
      {
        "step": "Choose web app in Replit and paste a prompt written in ChatGPT."
      },
      {
        "step": "Add an OpenAI API key when the agent asks."
      },
      {
        "step": "Fix the generator after errors about max tokens and unsupported JSON object format by switching to GPT-4, then a 500 error."
      },
      {
        "step": "Prompt for a thread format with two to four numbered connected posts."
      },
      {
        "step": "Add a Watch demo popup and AI-generated feature images."
      },
      {
        "step": "Add a thread history with copy and inline edit, though edits are not saved."
      },
      {
        "step": "Add Google sign-in and a temporary Postgres database, then hit the starter plan usage limit."
      }
    ],
    "notCovered": [
      "A finished product. Saving posts, working sign-in and payments were not completed.",
      "Deployment, which needs a paid plan of about $25 a month according to Mike.",
      "Facebook's rules on spammy or engagement-bait posts for generated viral content.",
      "API key handling and costs, beyond the key being pasted into Replit.",
      "Timestamps, because the video has no chapters."
    ],
    "qa": [
      {
        "q": "Why did the generator keep failing?",
        "a": "Each fix exposed another API issue, starting with a max tokens parameter on a newer model, then JSON mode, then a 500 error."
      },
      {
        "q": "Can it be deployed on the free plan?",
        "a": "No. Mike says deploying and the database need the paid plan."
      },
      {
        "q": "Which tool is it copied from?",
        "a": "Threadmaster, a thread generator Mike shows as the model for the layout."
      }
    ]
  },
  "ZlD4Z6UKS8o": {
    "summary": "The same landing-page prompt for an automation agency is run in Replit, Lovable and Orchids, and Mike prefers Lovable's result. Over the rest of the video he adds a Cal.com booking button and floating popup, connect Supabase and Stripe, buy a domain and email through Lovable, and publish a live site in under an hour. Stripe is only partly working at the end. The page prices differ from the Stripe products, and the buttons still send visitors to account creation. The Lovable link is an affiliate link.",
    "whatYouBuild": "A landing page published at a custom domain, with a Cal.com booking link and popup, Supabase connected, Stripe products and payment links, and edited pricing text.",
    "toolsUsed": [
      "Replit",
      "Lovable",
      "Orchids",
      "Cal.com",
      "Supabase",
      "Stripe",
      "Namecheap",
      "ChatGPT"
    ],
    "keySteps": [
      {
        "step": "Paste one ChatGPT-written prompt into Replit, Lovable and Orchids and compare the results."
      },
      {
        "step": "Note the costs: Replit's $25 a month plan to deploy, Lovable's $25 a month plan for custom domains and Orchids publishing for free."
      },
      {
        "step": "Prompt Lovable to connect the booking button to a Cal.com link and add a floating calendar popup."
      },
      {
        "step": "Change the See our work button to Pricing and scroll to that section."
      },
      {
        "step": "Upgrade Lovable, connect Supabase and add the Stripe secret key for recurring subscriptions."
      },
      {
        "step": "Create Stripe products and payment links, then ask Lovable to attach them to the plan buttons."
      },
      {
        "step": "Buy the domain and an email address through Lovable and publish."
      }
    ],
    "notCovered": [
      "Working payments. The plan buttons still opened an account creation page, and a test checkout was not completed.",
      "Matching prices. The Stripe products were set to $4.99 and $9.99 a month while the page was edited to show $499 and $999.",
      "Safe handling of the Stripe secret key, which was entered off camera.",
      "A fair test of the three builders, since Mike ran them live and judges by look.",
      "Timestamps, because the video's automatic chapters do not match the order of the lessons."
    ],
    "qa": [
      {
        "q": "Which AI website builder did Mike choose?",
        "a": "Lovable, over Replit and Orchids, mostly for the design and prompt-following."
      },
      {
        "q": "What did the website's custom domain cost?",
        "a": "About $9 a year at Namecheap, Mike says, versus about $0 for the first year plus $1 for email through Lovable's partner."
      },
    ]
  },
  "gibc7oWLCn4": {
    "summary": "A walkthrough of about ten of Mike's own Make.com scenarios: an email auto-responder, Skool members into EmailOctopus, a Messenger bot, a social video poster, Instagram comment replies, a Google Sheets cold-email sender, an Apollo lead scraper, YouTube description and topic idea generators, and Make's template library. Each is shown running or described briefly, with some left unfinished. Templates are sold at $15 each or $150 for a bundle. Auto-reply and cold-email setups carry consent and quality caveats, and the Instagram scenario can only send a static reply.",
    "whatYouBuild": "No single build. Each scenario is short, such as email, ChatGPT, Markdown to HTML and reply, or a webhook, ChatGPT and a Messenger response.",
    "toolsUsed": [
      "Make.com",
      "OpenAI",
      "Gmail",
      "Airtable",
      "EmailOctopus",
      "Facebook Messenger",
      "Instagram",
      "Google Sheets",
      "Apify",
      "Apollo",
      "Dumpling AI",
      "Perplexity",
      "JSON2Video"
    ],
    "keySteps": [
      {
        "step": "Auto-reply to unread sales emails with a ChatGPT draft, converted to HTML and sent every 30 minutes."
      },
      {
        "step": "Add free Skool members from Airtable to EmailOctopus every hour, ignoring duplicates."
      },
      {
        "step": "Reply to Facebook Messenger messages with a ChatGPT answer through a webhook, then turn it off as too impersonal."
      },
      {
        "step": "Reply to Instagram comments with a fixed message, since the comment text is not available to the module."
      },
      {
        "step": "Send cold emails one lead at a time from a Google Sheet every 15 minutes."
      },
      {
        "step": "Scrape Apollo leads with Apify into a Google Sheet."
      },
      {
        "step": "Generate YouTube descriptions from Dumpling AI transcripts with a custom assistant, and topic ideas with Perplexity."
      },
      {
        "step": "Browse Make's template library for Google Sheets, ChatGPT and GoHighLevel."
      }
    ],
    "notCovered": [
      "Consent and spam rules for the cold-email and auto-reply scenarios.",
      "How the cold-email sender marks leads as already emailed. Mike says duplicates might happen.",
      "Results from any scenario. They are shown running or described, with few outcomes.",
      "Timestamps, because the video's automatic chapters do not match the scenarios shown."
    ],
    "qa": [
      {
        "q": "What do Mike's Make.com templates cost?",
        "a": "$15 each on Gumroad or about $150 for the bundle, per Mike."
      },
      {
        "q": "Can Make reply to Instagram comments with AI?",
        "a": "Not in this setup. The module does not return the comment text, so the reply is a static message."
      },
      {
        "q": "What does Make.com cost?",
        "a": "It is free to start and about $10 a month for a paid plan, Mike says."
      }
    ]
  },
  "pMLyxz6Dyt4": {
    "summary": "A course-style HeyGen tutorial: train an avatar from a short consented recording, add a voice clone from ElevenLabs through an API key, make a scripted video in the studio, then automate it in Make.com with Airtable topics, Perplexity research, a ChatGPT assistant script, HeyGen, a wait, a download, a YouTube upload with the AI label and a thumbnail. The automation fails twice because HeyGen's API rejects videos over 180 seconds on Mike's plan, so the finished route is manual video creation. Links to HeyGen, ElevenLabs and Make.com include affiliate links, and the end pitches a coaching program.",
    "whatYouBuild": "A HeyGen avatar and voice clone, a studio video from a script, and a Make.com scenario with Airtable, Perplexity, OpenAI assistant, HeyGen, sleep, HTTP downloads, YouTube upload, thumbnail upload and Airtable update.",
    "toolsUsed": [
      "HeyGen",
      "ElevenLabs",
      "Make.com",
      "Airtable",
      "Perplexity",
      "ChatGPT",
      "YouTube"
    ],
    "keySteps": [
      {
        "step": "Open the HeyGen dashboard and see avatar, translation and quick video options on the $29 a month Creator plan."
      },
      {
        "step": "Train an avatar from about two and a half minutes of footage plus a recorded consent statement."
      },
      {
        "step": "Create a professional voice clone in ElevenLabs, make an API key and import the voice into HeyGen."
      },
      {
        "step": "Make a landscape video in the studio with the avatar, the imported voice and a script, at 30 fps."
      },
      {
        "step": "Import a Make.com blueprint that researches a topic in Perplexity, writes a script and calls HeyGen with the avatar ID."
      },
      {
        "step": "Fix an avatar ID error after retraining, then hit the 180-second API video limit twice."
      },
      {
        "step": "Fall back to a separate scenario that writes scripts into a Google Doc, then paste them into HeyGen by hand."
      }
    ],
    "notCovered": [
      "A working automatic upload. The API limit blocked it, and Mike says Pro API access is about $99 a month and Max about $330.",
      "Consent and disclosure issues around cloning a likeness and voice, beyond the consent recording HeyGen requires.",
      "YouTube's policies on AI-generated content, which Mike says are tightening.",
      "Coaching program terms, which are described briefly and not shown in detail.",
      "Timestamps, because the video's automatic chapters are evenly spaced and do not match the lessons."
    ],
    "qa": [
      {
        "q": "Why did the automation fail?",
        "a": "HeyGen's API rejected a video longer than 180 seconds, and the avatar ID also had to be updated after retraining."
      },
      {
        "q": "How much footage trains the avatar?",
        "a": "HeyGen asks for 2 to 5 minutes, and Mike uploads about two and a half."
      },
    ]
  },
  "6iFA7ds2PU4": {
    "summary": "A September 2025 tour of starting and running a Skool community, shown through Mike's own free community of about 870 members. It covers the $9 Hobby and $99 Pro plans, the Discovery ranking, switching to a paid price, membership questions, settings, posts and polls, member management, the About page and a classroom that upsells courses and coaching. Mike reports about $700 in one-time sales in three months, and the Skool sign-up link is an affiliate link. Income examples at the start are quoted from Skool pages and not verified.",
    "whatYouBuild": "A Skool community with an About page, membership questions, categories, pinned posts, a classroom with free and paid modules, and a Discovery listing.",
    "toolsUsed": [
      "Skool",
      "Gumroad",
      "Cal.com",
      "Airtable",
      "Zapier"
    ],
    "keySteps": [
      {
        "seconds": 65,
        "step": "Launch a community and choose between the $9 Hobby plan and the $99 Pro plan, with a 14-day free trial."
      },
      {
        "seconds": 182,
        "step": "Use the Discovery page as a marketplace and get the first three members to be listed."
      },
      {
        "seconds": 271,
        "step": "Set monthly or monthly and annual pricing, with an optional free trial."
      },
      {
        "seconds": 552,
        "step": "Go through settings: cover image, privacy, payouts, membership questions, plugins and categories."
      },
      {
        "seconds": 1208,
        "step": "Write posts, polls and pinned introductions, and send an email to all members at most every 72 hours."
      },
      {
        "seconds": 1424,
        "step": "Manage members, levels, the leaderboard and the map."
      },
      {
        "seconds": 1654,
        "step": "Build the About page with video, copy and testimonial."
      },
      {
        "seconds": 1882,
        "step": "Set up a classroom with free tutorials, templates on Gumroad, a $19 course and coaching sold by call."
      }
    ],
    "notCovered": [
      "Independent checks of the income examples shown at the start, such as monthly figures for other communities.",
      "Current Skool pricing and features. The video is from September 2025 and details may have changed.",
      "Consent for the 13,000 pending invites Mike says he imported from CSV files.",
      "How well the coaching program sells. It is described as $2,000 for six weeks with a $150 consultation, without results."
    ],
    "qa": [
      {
        "q": "Which Skool plan should I start on?",
        "a": "Mike uses Hobby at $9 a month with a 10 percent transaction fee, and says Pro at $99 with 2.9 percent suits communities that earn more."
      },
      {
        "q": "How does Mike earn from a free Skool community?",
        "a": "Through paid classroom items, about $700 of one-time sales in three months, plus coaching sold by call."
      },
    ]
  },
  "e6JXdMh5Qz0": {
    "summary": "A live build of a luxury hotel listing site for Koh Samui with OpenCode and Apify agent skills: one prompt scrapes about 100 hotels from Booking.com through Apify's Voyager Booking Scraper, then generates an HTML, CSS and JavaScript site with filters and a detail popup. The first pages show no data, some images and links are wrong, and the scrape initially returns only a handful of hotels before a rerun gets 100. The plan is to earn Booking.com affiliate commissions, which Mike has not yet been approved for. Mike says Apify gave him $50 of credits to collaborate, and the links are affiliate links.",
    "whatYouBuild": "A static site in a local folder with a hotel data file, a filter and sort interface, a detail modal with a gallery and booking links, produced by prompts in OpenCode.",
    "toolsUsed": [
      "OpenCode",
      "Apify",
      "Booking.com",
      "Travelpayouts",
      "Namecheap",
      "Hostinger",
      "Gemini"
    ],
    "keySteps": [
      {
        "step": "Prompt OpenCode to use Apify to list the top 100 luxury hotels in Koh Samui and build a site with images, prices, reviews and booking links."
      },
      {
        "step": "Watch it pick the wrong Apify skill, switch to the ultimate scraper and run the Voyager Booking Scraper for about 20 to 50 cents a run."
      },
      {
        "step": "Open the generated page, find that hotels do not display, and prompt for fixes until filtering by price and rating works."
      },
      {
        "step": "Ask for a hotel detail popup with a gallery, and lose context when OpenCode is closed by accident."
      },
      {
        "step": "Find that the first scrape had only sample data, supply the Apify token and rerun to get 100 hotels."
      },
      {
        "step": "Look at Booking.com affiliate links by appending the affiliate ID, and check domain and hosting prices."
      }
    ],
    "notCovered": [
      "A finished site. Popups, galleries, link accuracy and the full 100 listings were still being fixed at the end.",
      "Booking.com's terms for scraping, and the rights to reuse its images, descriptions and reviews.",
      "Approval into the Booking.com affiliate program. Mike was not yet a member and links stay unaffiliated.",
      "Hosting and a published domain. Mike compares about $12 a year at Namecheap with $44 to $79 at Hostinger and buys neither.",
      "Timestamps, because the video has no chapters."
    ],
    "qa": [
      {
        "q": "How much did the Apify Booking.com scraping cost?",
        "a": "About 20 to 50 cents per run and around $6 in total, paid from Apify credits."
      },
      {
        "q": "Were the hotel images and links correct?",
        "a": "Not all. Mike spots wrong photos and some broken links and says they need checking."
      },
    ]
  }
};

// Transcript-based Q&A for entries first written from the description, then entries added later.
for (const [id, extra] of Object.entries(lateQa)) videoSummaries[id] = { ...videoSummaries[id], ...extra };
Object.assign(videoSummaries, lateSummaries);


// Third-person rewrites of first-person YouTube description openers, for listing cards and meta descriptions.
export const listingSummaries = {
  "ndG48skyZZY": "Mike runs a Rank Prompt AI visibility scan on VisiScan, then connects its MCP in Claude Code to fix pages and draft outreach. Rank Prompt sponsored it.",
  "tv_A-CN76Cg": "Mike builds a GrokBot job search agent with the Treg plugin. It rewrites his resume for ATS checks and queues remote job emails for his approval.",
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
