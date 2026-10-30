# Schema / Structured Data — www.ai-automation-station.com

Audit date: 2026-10-28 · Specialist: seo-schema · Status: **FINAL**

## Score: 78 / 100

| Area | Weight | Score | Notes |
|---|---|---|---|
| Coverage (templates with schema) | 20 | 18 | 271/274 crawled URLs carry JSON-LD; only privacy/terms/search (fine) lack it |
| Validity & required props | 25 | 24 | 0 invalid JSON; all VideoObject + Article required props present |
| Entity graph (@id, sameAs, logo) | 25 | 15 | Good `@id` reuse, but no `logo`, brand "AI Income Lab" absent, Person `url` inconsistent, Person `sameAs` incomplete |
| Rich-result readiness | 15 | 13 | Video key moments (Clip) on 195/220 watch pages; breadcrumbs on 246 pages |
| Commercial / offering markup | 15 | 8 | Paid community, 4 courses and 3 price tiers visible on homepage, zero schema for them |

## Method / evidence

- `evidence/crawl.json` (274 pages, per-page `schema` types).
- Live fetch (`curl`, extracted `application/ld+json`) of `/`, `/guides/claude-code-for-beginners.html`, `/guides.html`, `/start-here.html`, `/search.html`, `/videos/claude-code`, `/videos/2`, `/watch/wLIiTkra7uM`, `/watch/VE66JDHoS6Y`.
- Scripted sweep of all 24 `/guides/*.html` and all 220 `/watch/*` pages, validating property presence.
- No Microdata (`itemscope` = 0) or RDFa (`typeof=` = 0) found; JSON-LD only (correct).
- All JSON-LD is in server-rendered HTML (no JS-injection delay risk).

### Schema by template

| Template | Count | Types | Source |
|---|---|---|---|
| Homepage | 1 | `@graph`: Person, Organization, WebSite | `index.html` L34–66 |
| Guides | 24 | Article + BreadcrumbList (+ FAQPage on 13) | static `public/guides/*.html` |
| Guides hub | 1 | CollectionPage (+ ItemList) + BreadcrumbList | `public/guides.html` |
| Start here | 1 | WebPage + BreadcrumbList | `public/start-here.html` |
| Video archive + topics | 22 | CollectionPage (+ ItemList) | `src/archive.js` `renderArchive()` L122–127 |
| Watch pages | 220 | VideoObject (+ Clip) + BreadcrumbList | `src/archive.js` `renderWatch()` L218–232 |
| privacy / terms / search | 3 | none | n/a (search is `noindex,follow`) |

### Validation results

| Schema | Status | Issues |
|---|---|---|
| VideoObject (220) | ✅ | name/description/thumbnailUrl/uploadDate(ISO+Z)/duration/embedUrl present on 220/220. `contentUrl` absent (OK — `embedUrl` satisfies Google). `hasPart` Clip on 195/220. `?t=` clip URLs return 200, canonical to clean URL, player gets `start=N` ✔ |
| Article (24) | ✅/⚠️ | headline, image (1200×630), datePublished, dateModified, author(+url), publisher present on 24/24. Publisher has no `logo`; author `url` differs from homepage Person `url` |
| BreadcrumbList (246) | ✅ | Absolute URLs, positions correct. Missing on 22 `/videos*` pages |
| FAQPage (13) | ℹ️ | All questions verified visible on-page (13/13). No Google rich result (retired) |
| CollectionPage (24) | ✅ | Valid; `/videos*` ItemList items only carry `url` (no `name`) |
| Organization (1) | ⚠️ | No `logo`, no `alternateName` for "AI Income Lab" |
| Person (1) | ⚠️ | `sameAs` lacks YouTube/Skool; `url` inconsistent across pages |
| WebSite (1) | ✅ | Valid; no SearchAction (correct — see Info finding) |

## What works

- **Single entity graph with stable `@id`s.** `#mike`, `#org`, `#website` are defined on the homepage and referenced from every Article, CollectionPage, WebPage and VideoObject (`src/archive.js` L125, L226–227; `public/guides/*.html`). Google and AI engines can resolve every page back to one Person and one Organization.
- **VideoObject is excellent.** All 220 watch pages have every required and recommended property, ISO-8601 dates with timezone, ISO durations, `interactionStatistic`, author/publisher links, and **key-moment `Clip` markup on 195 pages** with real, server-honoured `?t=` URLs (verified: `/watch/VE66JDHoS6Y?t=63` → 200, canonical clean, iframe `?start=63`). Last clip `endOffset` matches duration (472 s = PT7M52S).
- **Unique video descriptions**: 0 duplicate descriptions across 220 pages; only 1 falls back to the template text.
- **Articles are complete**: 24/24 have headline, 1200×630 image, both dates, author with `@id` + `url`, publisher, `isPartOf`, `inLanguage`.
- **FAQ markup is honest**: every marked-up question is visible on the page.
- **Safe serialisation**: `jsonLd()` escapes `<` as `\u003c` (`src/archive.js` L94), preventing `</script>` breakouts from video titles.
- **No deprecated types** (no HowTo, SpecialAnnouncement, etc.).

---

## Findings

### 1. Organization has no `logo` (and Article publishers inherit none) — **High**

- **Evidence:** Homepage Organization node (`index.html` L48–56) has no `logo` or `image`. All 24 Article `publisher` objects lack `logo` (sweep: `pubLogo False` 24/24). No logo file exists in `public/`; nearest candidates are `apple-touch-icon.png` (180×180) and `favicon.svg`.
- **Why it matters:** `logo` is the property Google uses for the brand logo in Search/knowledge panels (min 112×112, crawlable raster). Without it the Organization entity is weak, and AI engines have no canonical brand image.
- **Recommendation:** Add a square raster logo (e.g. `public/logo-512.png`, ≥112×112, ideally 512×512) and reference it from the `#org` node in `index.html`. Interim: use `https://www.ai-automation-station.com/apple-touch-icon.png` (180×180 qualifies). Because Articles reference `#org` by `@id`, adding it once on the homepage is sufficient for graph merging; optionally also add `logo` to the publisher block in `public/guides/*.html`. See snippet A.

### 2. Brand "AI Income Lab" is not represented in schema — **High**

- **Evidence:** Homepage `<title>` = "AI Income Lab: AI Automation Courses & Community"; site header brand = "AI Income Lab" (`src/archive.js` L151); but Organization `name` = "AI Automation Station" with no `alternateName`, and "AI Income Lab" appears only inside the Org `description` string. WebSite `alternateName` is "Mike Holp" (a person, not a site name).
- **Why it matters:** Entity disambiguation for brand queries ("AI Income Lab", "AI Income Lab Skool") and AI citations relies on explicit name/alternateName links. Currently the community brand that drives revenue has no entity node.
- **Recommendation:** In `index.html`: add `"alternateName": ["AI Income Lab", "AI Automation Station by Mike Holp"]` to `#org`; change WebSite `alternateName` to `"AI Income Lab"`; add a dedicated `#community` node for the paid offering (finding 3). See snippet A.

### 3. Paid community, courses and pricing have no schema (Product/Offer, Course, ItemList) — **Medium**

- **Evidence:** Homepage server-rendered HTML shows `#pricing` with Standard $29/mo, Premium $49/mo, VIP $89/mo, annual $290/$490/$890; `Inside the classroom` lists Runable Course, Beginner’s Automation Course, Claude Code & Skills / Codex Tutorials & Courses, Complete AI Avatar Video Course, VAPI AI Voice Agent Course. Crawl: 0 Product, 0 Offer, 0 Course types sitewide.
- **Why it matters:** These are the conversion objects. Explicit `Offer`/`UnitPriceSpecification` lets AI engines answer "how much is AI Income Lab" with correct prices; `Course` nodes tie the guide/video topics to the paid curriculum. Note: Google's Course-info rich result was retired June 2025 and membership subscriptions are generally not eligible for merchant listings, so the payoff is primarily entity clarity / AI answers, not a guaranteed SERP feature.
- **Recommendation:** Add a `#community` node (typed `Product`, `brand` → `#org`) with three `Offer`s using `UnitPriceSpecification` (`billingDuration: P1M`) and an `ItemList` of `Course` nodes (each with `provider` → `#org`, `isAccessibleForFree: false`). Place in the homepage `@graph` in `index.html`. Keep prices in sync with the visible `#pricing` section (a test in `src/homepage.test.js` asserting schema price == rendered price would prevent drift). See snippet B. Do **not** add `aggregateRating`/`review` unless genuine, on-page reviews exist.

### 4. Person `url` is inconsistent across pages for the same `@id` — **Medium**

- **Evidence:** `#mike` has `url: https://www.ai-automation-station.com/` on homepage (`index.html` L41-ish) and all 220 VideoObjects (`src/archive.js` L226), but `url: https://www.ai-automation-station.com/#about` on 24 Articles, `guides.html`, and `start-here.html`.
- **Why it matters:** Nodes sharing an `@id` are merged; conflicting values for the same property create ambiguous entity data. Homepage has a real `id="about"` section, so `/#about` is the better, more specific target.
- **Recommendation:** Standardise on `https://www.ai-automation-station.com/#about`. Fewest edits: change Person `url` in `index.html` and `author.url` in `src/archive.js` L226 (guides already use `/#about`).

### 5. Person `sameAs` omits YouTube and Skool; jobTitle omits the channel/community — **Medium**

- **Evidence:** `#mike.sameAs` = GitHub, LinkedIn, X only. YouTube (`@ai-automation-station`) and Skool are only on `#org.sameAs`. `jobTitle` = "Founder of TubeAnalytics and VisiScan" — the About section on the same page says he runs AI Automation Station and hosts AI Income Lab. No `worksFor`/reciprocal link from Person → Org (only Org → `founder`).
- **Why it matters:** Mike is the face of the YouTube channel; author E-E-A-T and AI "who is Mike Holp" answers improve when the Person entity links to the channel and community he runs.
- **Recommendation:** In `index.html` Person node: add `worksFor: {"@id": "#org"}`, extend `jobTitle` (e.g. "Founder, AI Automation Station and AI Income Lab"), add `description`, and add `https://www.youtube.com/@ai-automation-station` to Person `sameAs` (channel is personally fronted). Keep Skool on Org/community. Add `https://www.tubeanalytics.net` and `https://www.visiscan.app` via `owns`/`founder` rather than `sameAs` (they are products, not profiles). See snippet A.

### 6. `/videos` archive and topic pages have no BreadcrumbList — **Low**

- **Evidence:** Crawl: all 22 `/videos`, `/videos/2…15`, `/videos/<topic>` pages carry only `CollectionPage`. Watch pages' breadcrumb level 2 points to `/videos`, which itself has no breadcrumb.
- **Recommendation:** In `src/archive.js` `renderArchive()` emit a second `jsonLd()` with Home → Videos (→ Topic name or "Page N"). See snippet C.

### 7. Two guides embed a video but Article does not reference it — **Low**

- **Evidence:** `public/guides/ai-automation.html` L85 embeds `<iframe class="player" src="https://www.youtube-nocookie.com/embed/Lifl4PC2_3M">`; its Article has no `video`. (The canonical VideoObject lives on `/watch/Lifl4PC2_3M`.) `chatgpt-pro-20x.html` references `i.ytimg.com/vi/uSx_lW4oppY`.
- **Recommendation:** Add `"video": {"@id": "https://www.ai-automation-station.com/watch/Lifl4PC2_3M#video"}` to the Article in `public/guides/ai-automation.html` (and the equivalent in `chatgpt-pro-20x.html` if a player is embedded). Referencing by `@id` avoids duplicating a full VideoObject and keeps `/watch/` as the video's canonical page. Also consider `about`/`mentions` (e.g. `{"@type":"SoftwareApplication","name":"Claude Code"}`) on tool guides for AI topical clarity.

### 8. VideoObject minor gaps (1 template description, 5 short, 25 without chapters) — **Low**

- **Evidence:** `/watch/VE66JDHoS6Y` description = "Watch Herdr Lets You Run Claude Code And Codex In One Place by AI Automation Station." (fallback in `src/archive.js` L168). 5 descriptions < 80 chars (e.g. `t0nQSyryTPg`: "These new GPT-6 Astra demos are insane!"). 25/220 have no `hasPart` (e.g. `4x2gxyIFUa8`, `pwLLS6zFpKs`). `thumbnailUrl` is `hqdefault.jpg` (480×360 letterboxed).
- **Recommendation:** Add notes for these IDs in `src/watch-notes.js` / `src/video-notes.js`; add YouTube chapters to the 25 videos (they flow into `hasPart` automatically via `validChapters`). Optionally make `thumbnailUrl` an array `[maxresdefault.jpg, hqdefault.jpg]` in `src/archive.js` L167 (only if maxres exists for all IDs — fall back otherwise).

### 9. `/videos*` ItemList entries have no `name` — **Low**

- **Evidence:** `src/archive.js` L126 emits `{ "@type":"ListItem", position, url }` only.
- **Recommendation:** Add `name: video.title` for AI/LLM readability. No Google carousel applies (ItemList carousels are limited to Course/Movie/Recipe/Restaurant), so this is a clarity improvement only.

### 10. FAQPage on 13 guides — no Google rich result — **Info**

- **Evidence:** 13 guides carry FAQPage; all questions visible (verified 13/13).
- **Note:** Google retired FAQ rich results for all sites (May 2026; previously restricted to gov/health since Aug 2023). Keep the markup — it's accurate, harmless, and useful for AI answer extraction. Optional: the homepage `#faq` section ("Questions people ask", 6+ Q&As incl. pricing) is visible but unmarked; adding a FAQPage there is low-cost for AI engines, but do not expect a SERP feature.

### 11. WebSite SearchAction — do not add — **Info**

- **Evidence:** `public/search.html` reads `?q=` (`URLSearchParams(...).get('q')`, L46) and is `noindex,follow`. WebSite has no `potentialAction`.
- **Note:** A `SearchAction` with `urlTemplate: https://www.ai-automation-station.com/search.html?q={search_term_string}` would be syntactically valid, but Google removed the sitelinks search box in Nov 2024, so it has no Search benefit. Not recommended; harmless if added.

### 12. No schema on privacy / terms / search — **Info**

- Acceptable. Optional `WebPage` with `isPartOf: #website` on privacy/terms for graph completeness; no action needed on `search.html` (noindex).

---

## Ready-to-paste JSON-LD

### Snippet A — Homepage `@graph` (replace block in `index.html` L34–66)

> Replace `logo` URL with a dedicated ≥112×112 square PNG once created; `apple-touch-icon.png` (180×180) is a valid interim.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.ai-automation-station.com/#mike",
      "name": "Mike Holp",
      "url": "https://www.ai-automation-station.com/#about",
      "image": "https://www.ai-automation-station.com/mike-holp.jpg",
      "description": "Software developer since 2013 who tests AI tools on real builds for the AI Automation Station YouTube channel and hosts the AI Income Lab community.",
      "jobTitle": "Founder, AI Automation Station and AI Income Lab",
      "worksFor": { "@id": "https://www.ai-automation-station.com/#org" },
      "knowsAbout": ["Claude Code", "Codex", "OpenCode", "n8n", "Make.com", "AI agents", "AI automation"],
      "sameAs": [
        "https://www.youtube.com/@ai-automation-station",
        "https://github.com/mikeholp87",
        "https://www.linkedin.com/in/mikeholp",
        "https://x.com/mikeholp"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.ai-automation-station.com/#org",
      "name": "AI Automation Station",
      "alternateName": ["AI Income Lab", "AI Automation Station by Mike Holp"],
      "description": "Practical AI builds by Mike Holp, with AI Income Lab as the paid learning community on Skool.",
      "url": "https://www.ai-automation-station.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.ai-automation-station.com/#logo",
        "url": "https://www.ai-automation-station.com/apple-touch-icon.png",
        "width": 180,
        "height": 180
      },
      "image": "https://www.ai-automation-station.com/og-card.jpg",
      "founder": { "@id": "https://www.ai-automation-station.com/#mike" },
      "sameAs": [
        "https://www.youtube.com/@ai-automation-station",
        "https://www.skool.com/ai-automation-station-7346/about"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ai-automation-station.com/#website",
      "name": "AI Automation Station",
      "alternateName": "AI Income Lab",
      "url": "https://www.ai-automation-station.com/",
      "publisher": { "@id": "https://www.ai-automation-station.com/#org" },
      "inLanguage": "en"
    },
    {
      "@type": "WebPage",
      "@id": "https://www.ai-automation-station.com/#webpage",
      "url": "https://www.ai-automation-station.com/",
      "name": "AI Income Lab: AI Automation Courses & Community",
      "isPartOf": { "@id": "https://www.ai-automation-station.com/#website" },
      "about": { "@id": "https://www.ai-automation-station.com/#community" },
      "primaryImageOfPage": "https://www.ai-automation-station.com/og-card.jpg",
      "inLanguage": "en"
    }
  ]
}
```

### Snippet B — Community offering + courses (add as extra nodes in the same homepage `@graph`)

> Prices/course names copied from the live `#pricing` and `Inside the classroom` sections on 2026-10-28. Keep in sync with on-page copy.

```json
{
  "@type": "Product",
  "@id": "https://www.ai-automation-station.com/#community",
  "name": "AI Income Lab",
  "description": "Paid AI automation learning community on Skool: step-by-step courses, templates, and help while you build. VIP adds weekly coaching and a 6,400+ n8n template library.",
  "url": "https://www.ai-automation-station.com/#pricing",
  "image": "https://www.ai-automation-station.com/og-card.jpg",
  "brand": { "@id": "https://www.ai-automation-station.com/#org" },
  "category": "Online course membership",
  "offers": [
    {
      "@type": "Offer",
      "name": "Standard",
      "url": "https://www.skool.com/ai-automation-station-7346/plans",
      "price": "29.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceSpecification": { "@type": "UnitPriceSpecification", "price": "29.00", "priceCurrency": "USD", "billingDuration": "P1M", "unitCode": "MON" }
    },
    {
      "@type": "Offer",
      "name": "Premium",
      "url": "https://www.skool.com/ai-automation-station-7346/plans",
      "price": "49.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceSpecification": { "@type": "UnitPriceSpecification", "price": "49.00", "priceCurrency": "USD", "billingDuration": "P1M", "unitCode": "MON" }
    },
    {
      "@type": "Offer",
      "name": "VIP",
      "url": "https://www.skool.com/ai-automation-station-7346/plans",
      "price": "89.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceSpecification": { "@type": "UnitPriceSpecification", "price": "89.00", "priceCurrency": "USD", "billingDuration": "P1M", "unitCode": "MON" }
    }
  ],
  "hasPart": { "@id": "https://www.ai-automation-station.com/#courses" }
},
{
  "@type": "ItemList",
  "@id": "https://www.ai-automation-station.com/#courses",
  "name": "Courses inside AI Income Lab",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": { "@type": "Course", "name": "Runable Course", "description": "Build and launch an AI-powered business website.", "provider": { "@id": "https://www.ai-automation-station.com/#org" }, "isAccessibleForFree": false, "inLanguage": "en" } },
    { "@type": "ListItem", "position": 2, "item": { "@type": "Course", "name": "Beginner’s Automation Course", "description": "Build simple business automations in Make.com.", "provider": { "@id": "https://www.ai-automation-station.com/#org" }, "isAccessibleForFree": false, "inLanguage": "en" } },
    { "@type": "ListItem", "position": 3, "item": { "@type": "Course", "name": "VAPI AI Voice Agent Course", "description": "Build a voice agent with VAPI and ElevenLabs.", "provider": { "@id": "https://www.ai-automation-station.com/#org" }, "isAccessibleForFree": false, "inLanguage": "en" } },
    { "@type": "ListItem", "position": 4, "item": { "@type": "Course", "name": "Complete AI Avatar Video Course", "description": "Create an avatar, generate a voice, and automate the workflow with HeyGen, ElevenLabs, and Make.com.", "provider": { "@id": "https://www.ai-automation-station.com/#org" }, "isAccessibleForFree": false, "inLanguage": "en" } },
    { "@type": "ListItem", "position": 5, "item": { "@type": "Course", "name": "Claude Code & Skills / Codex Tutorials & Courses", "description": "Follow coding workflows, prompts, and practical lessons.", "provider": { "@id": "https://www.ai-automation-station.com/#org" }, "isAccessibleForFree": false, "inLanguage": "en" } }
  ]
}
```

### Snippet C — Breadcrumbs for `/videos*` (`src/archive.js`, inside `renderArchive()`)

```js
const breadcrumbs = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    ['Home', `${site}/`],
    ['Videos', `${site}/videos`],
    ...(topic ? [[`${topic.name} videos`, url]] : page > 1 ? [[`Page ${page}`, url]] : []),
  ].map(([name, item], index) => ({ '@type': 'ListItem', position: index + 1, name, item })),
};
// then: ${jsonLd(schema)}\n${jsonLd(breadcrumbs)}
```

### Snippet D — Article ↔ embedded video link (`public/guides/ai-automation.html`, inside the Article object)

```json
"video": { "@id": "https://www.ai-automation-station.com/watch/Lifl4PC2_3M#video" }
```

## Validation checklist after shipping

1. Google Rich Results Test on `/`, one guide, one `/watch/` page, one `/videos/<topic>` page.
2. Schema.org validator on homepage `@graph` (checks Product/Offer/Course nesting).
3. Confirm the logo URL returns 200, `image/png`, ≥112×112.
4. Search Console → Enhancements → Videos / Breadcrumbs: no new errors after re-crawl.
