# Implementation log

Branch `site-optimization`, October 28, 2026. One batch; not deployed.

| # | Problem | Change | Files |
|---|---|---|---|
| 1 | Products competed with the membership in the nav and with primary buttons | Removed "Tools" from the header nav; changed the products' eyebrow to "Also by Mike"; their trial/scan buttons are now underlined text links (`.tool-link`, 44 px tall). The section, copy and footer links are unchanged | `src/main.jsx`, `src/styles.css` |
| 2 | Runable course CTA went to the Skool group page | It now opens the plan picker like every other Join button, with the same UTM handling. Removed the unused `communityUrl` | `src/main.jsx` |
| 3 | Annual prices were hidden in the FAQ | Each plan card shows "or $290/$490/$890 a year"; the billing note says a year costs the same as 10 months. Product JSON-LD gained three annual offers (`unitCode` ANN) | `src/main.jsx`, `src/styles.css`, `index.html` |
| 4 | The hand-off to Skool was unexplained | Hero note: "From $29 a month or $290 a year. You pick a plan on Skool and can cancel anytime." New FAQ: "What happens when I click Join?" | `src/main.jsx` |
| 5 | "Services" / "What I offer." read as member services | Nav label "Sponsors"; section heading "For brands — Sponsorship packages." Added "FAQ" to the nav, because the FAQ now sits at the end of the page | `src/main.jsx` |
| 6 | The hero implied templates come with every plan and didn't say what the courses cover | Hero now names the courses (beginner Make.com, Claude Code, Codex, AI voice agents) and states that VIP adds weekly coaching and the 6,400+ n8n templates | `src/main.jsx` |
| 7 | Plan choice wasn't reportable | Pricing clicks add `plan_name`, `plan_price` and `currency` to the existing `CTA Clicked` / `Skool Outbound Clicked` events (Vercel, GA4, Meta) | `src/main.jsx` |
| 8 | 14 px brand tap target | `.brand` has `min-height: 44px` | `src/styles.css` |

Tests updated or added in `src/homepage.test.js`: the products use text links and are absent from the nav; the nav order includes FAQ and Sponsors; the Runable CTA uses the plan picker; plan prices (monthly and annual) and plan tracking properties are pinned.

Unchanged by design: prices, plan benefits, cancellation wording, URLs, the FAQ's position (moved to the end earlier at the owner's request), the products section itself, the sponsor content, and the forms.
