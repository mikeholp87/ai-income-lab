# Offer and claims register — October 28, 2026

Sources: the homepage (`src/main.jsx`, `index.html`) and Skool's public `/about` and `/plans` pages for `ai-automation-station-7346`, read on October 28, 2026.

## Offer map

| Item | Current state | Source |
|---|---|---|
| Brand | AI Income Lab is the paid Skool community from the AI Automation Station YouTube channel, hosted by Mike Holp | Homepage, Skool group name "AI Income Lab" |
| Audience | People learning to build AI automations, from beginners (Beginner's Automation Course in Make.com) to builders using Claude Code, Codex and voice agents | Plan "Best for" lines, classroom list |
| Problem | Videos show what a tool can do; members want step-by-step courses, templates and somewhere to ask questions while building | FAQ |
| Primary action | Join AI Income Lab: opens Skool's plan picker in a new tab | All Join buttons (verified in the browser) |
| Secondary actions | Watch a free build; free written guides; subscribe on YouTube; weekly build-notes email | Hero, guides, footer |
| Separate audience | Brands: sponsor packages, media kit, booking calendar, contact form | Homepage lower half |

## Plans (verified on Skool)

| Plan | Monthly | Annual | Skool benefits list | Extra detail on the homepage |
|---|---|---|---|---|
| Standard | $29 | $290 | Community Access, Courses & Tutorials | Runable course; beginner course unlocks at level 2, VAPI course at level 4 |
| Premium | $49 | $490 | + Advanced Training | Immediate access to both courses; Complete AI Avatar Video Course |
| VIP | $89 | $890 | + Weekly Coaching Calls, Curated Software Deals, 6,400+ N8N Templates | Same |

- Free trial: none configured (no trial days on any tier).
- Refunds: no refund policy is stated on the site or the Skool page. None was added.
- Cancellation: "cancel anytime from your Skool account" (homepage). Skool's checkout uses "Cancel anytime" wording.
- Annual pricing equals 10 months of the monthly price; the homepage now says so.

## Claims

| Claim | Where | Evidence | Status |
|---|---|---|---|
| 2,900+ members | Hero, plans, stats, sponsor cards | Skool `totalMembers` = 2,970 | Supported |
| 6,400+ n8n templates (VIP) | Plans, classroom, hero | Skool VIP benefit "6,400+ N8N Templates" | Supported |
| Weekly coaching (VIP) | Plans, hero, FAQ | Skool VIP benefit "Weekly Coaching Calls" | Supported |
| Course names and level unlocks | Plans, FAQ | Homepage copy; Skool's public data lists only "Courses & Tutorials" / "Advanced Training" | Needs owner confirmation |
| YouTube subscribers, views, videos | Stats | Live YouTube API, refreshed daily | Supported |
| Income | FAQ: "Is income guaranteed? No." | — | Correctly disclaimed |
| Testimonials | None on the site | The owner asked for none (Oct 8 CRO notes) | — |

## Open questions and contradictions

1. Skool's group description reads "Start earning an online income by learning the AI skills of the future." The website avoids income promises. Consider aligning the Skool description with the site; that is a Skool setting, so it was not changed.
2. The Premium course list and level unlocks can only be confirmed inside the Skool classroom.
3. The homepage still carries a TubeAnalytics/VisiScan section. Per the owner's decision on Oct 28, it stays but is no longer in the nav and no longer uses primary buttons. `public/llms.txt` and the About page still mention both products as Mike's other work.
