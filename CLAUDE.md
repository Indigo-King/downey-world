# downey.world — Project Brief

## What This Is

A personal family website for John Downey, hosted at `downey.world`. Hand-coded HTML/CSS with minimal, justified JavaScript. Built on IndieWeb principles — owned content, personal expression, no frameworks, no build tools.

Core design concept: **one HTML skeleton, many aesthetic skins.** Each section of the site has a completely distinct visual personality achieved through per-page stylesheets. The HTML structure stays consistent; the CSS defines a different look per section.

**The site is a place, not a brand. Inconsistency between sections is intentional and desirable.**

---

## Owners

- **John Downey** — hacker, software/hardware, gaming, tabletop, card games, fantasy/sci-fi reader, atheist with interest in religion and magic. Self-described wizard and king.
- **Courtney Downey** — John's wife. Midlevel manager for social workers at county level. Was into customizing her own Myspace theme as a kid. Her section is maintained by John on her behalf.

These personalities directly inform the section aesthetics. Do not sanitize them into generic web design.

---

## Hosting & Deployment

- **Domain**: `downey.world` (transferring from GoDaddy to Cloudflare)
- **Host**: Cloudflare Pages
- **Repo**: `https://github.com/Indigo-King/downey-world`
- **Deploy**: Push to GitHub → auto-deploys via Cloudflare Pages
- No build step — plain HTML/CSS/JS served as-is from repo root

---

## Tech Philosophy

- **HTML first** — semantic, clean, no div soup
- **CSS second** — presentation layer; per-page aesthetics via separate stylesheets
- **JS only where unavoidable** — two justified uses exist in this project (see below)
- No frameworks, no npm, no build tools
- Flat HTML files for blog posts — no CMS

---

## File Structure

### Target Architecture

```
/
├── CLAUDE.md
├── base.css                  ← resets only (box-sizing, margin, flex column body)
├── components.js             ← shared header/footer as vanilla web components
├── index.html                ← home page
├── styles/
│   ├── home.css
│   ├── recipes.css
│   ├── john.css
│   └── courtney.css
└── pages/
    ├── recipes/
    │   ├── recipe-page.html
    │   └── [recipe html files]
    ├── john/
    │   ├── index.html
    │   └── blog/
    │       └── [flat html post files]
    └── courtney/
        ├── index.html
        └── blog/
            └── [flat html post files]
```

### Current State

**Exists:**
- `index.html` — home page, using web components
- `components.js` — `<site-header>` and `<site-footer>` web components (done)
- `base.css` — CSS resets only (box-sizing, margin, flex column body)
- `styles/home.css` — warm honeydew/grey aesthetic (done)
- `styles/recipes.css` — old cookbook/parchment aesthetic (done)
- `styles/john.css` — terminal/wizard-king aesthetic (done)
- `styles/courtney.css` — Myspace era aesthetic (done)
- ~~`style.css`~~ — deleted, fully superseded
- `pages/recipes/recipe-page.html` — recipe hub
- `pages/recipes/brntbrcl.html` — Burnt Broccoli
- `pages/recipes/msssspprst.html` — Mississippi Roast
- `pages/recipes/swtpttpmpchll.html` — Sweet Potato Pumpkin Chilli
- `pages/recipes/images/` — placeholder PNGs for each recipe
- `pages/john/index.html` — placeholder, using web components
- `pages/courtney/index.html` — placeholder, using web components

**Still needed:**
- Supabase guestbook integration on home page
- Blog directories and post files for John and Courtney

**Note on `components.js` paths:** All pages load the script with a relative path (`components.js` from root, `../../components.js` from `pages/*/`). Do not switch to absolute paths — relative paths are required for local file:// browsing.

Nav hrefs inside `components.js` are also relative, computed dynamically at runtime:
```js
const root = window.location.pathname.includes('/pages/') ? '../../' : './';
```
All pages are either at root depth or exactly 2 levels deep (`pages/section/`). Do not use absolute paths in nav hrefs — they break under file:// browsing.

**Important:** The Home link must use `${root}index.html`, not `${root}` — bare directory paths show a directory listing under file:// instead of loading index.html.

### Legacy: `style.css`

`style.css` was the original single shared stylesheet. Migration is complete — all styles have been split into `base.css` and the four per-section stylesheets. No page references `style.css` anymore.

**Do not add new styles to `style.css`.** It is fully deprecated and can be deleted at any time.

### Filename Convention

Recipe pages use abbreviated, vowel-dropped names (`brntbrcl`, `msssspprst`, `swtpttpmpchll`). Follow this convention for new recipes.

---

## Shared Components (`components.js`)

Header and footer are shared across all pages via **vanilla JS web components with no shadow DOM**.

No shadow DOM is intentional — it lets per-page stylesheets style the components normally without encapsulation fights.

```html
<site-header></site-header>
<site-footer></site-footer>
```

Each page loads (using relative paths — required for file:// browsing):
```html
<!-- root pages -->
<link rel="stylesheet" href="base.css">
<link rel="stylesheet" href="styles/[section].css">
<script src="components.js" defer></script>

<!-- pages/section/ pages -->
<link rel="stylesheet" href="../../base.css">
<link rel="stylesheet" href="../../styles/[section].css">
<script src="../../components.js" defer></script>
```

**Header content** (consistent across all pages):
- Site title: "Downey"
- Nav: Home | Recipes | John | Courtney

**Footer content**: Simple centered placeholder, consistent across pages.

---

## Per-Page Stylesheets

Each stylesheet defines the same class names (`.header-content`, `.main-content`, `.footer-content`, `.side-by-side`, etc.) but with completely different visual values. This is how the per-section aesthetic shift works.

---

### `home.css`

**Aesthetic:** Warm, personal, welcoming front door. Honeydew/grey palette — refined and intentional, not placeholder.

| Role | Token | Hex |
|---|---|---|
| Page background | `--bg` | `#f1fff1` |
| Surface / card | `--surface` | `#e8f8e8` |
| Header / footer bg | `--chrome-bg` | `#6b7f6b` |
| Header / footer text | `--chrome-text` | `#f1fff1` |
| Primary text | `--text` | `#3a4a3a` |
| Secondary / muted text | `--text-muted` | `#6b7f6b` |
| Primary accent | `--accent` | `#4a7c59` |
| Link | `--link` | `#3a6b4a` |
| Link hover | `--link-hover` | `#2a5a3a` |
| Border / divider | `--border` | `#c2d9c2` |
| Guestbook bubble bg | `--bubble-bg` | `#dff0df` |

**Fonts:** System serif stack — Georgia, 'Times New Roman', serif.

**Notes:** No gradients. Subtle, calm. The most understated of the four — lets content breathe.

---

### `recipes.css`

**Aesthetic:** Old cookbook, recipe index card, printed zine. Analog and tactile — feels like something pulled from a family binder.

| Role | Token | Hex |
|---|---|---|
| Page background | `--bg` | `#f5f0e8` |
| Surface / card | `--surface` | `#fdf8f0` |
| Header / footer bg | `--chrome-bg` | `#5c3d2e` |
| Header / footer text | `--chrome-text` | `#fdf8f0` |
| Primary text | `--text` | `#3b2a1a` |
| Secondary / muted text | `--text-muted` | `#8b6f5e` |
| Primary accent | `--accent` | `#8b5e3c` |
| Secondary accent | `--accent-2` | `#c4813a` |
| Link | `--link` | `#7a4a2a` |
| Link hover | `--link-hover` | `#5c3d2e` |
| Border / divider | `--border` | `#d9c9b0` |
| Recipe card bg | `--card-bg` | `#fffdf5` |
| Recipe card border | `--card-border` | `#c4a882` |

**Fonts:** Lora (Google Fonts) for headings — elegant old-book serif. Georgia fallback. Body in Georgia or readable serif.

**Notes:** Recipe cards should have a slight box-shadow suggesting a physical card lifted off the page. Consider a subtle paper texture via CSS background pattern or very faint noise overlay.

---

### `john.css`

**Aesthetic:** Pure terminal CLI. Black screen, bright phosphor green text, blue accents. Full commitment to the CLI environment — no hardware shell framing, the whole page is the terminal. Wizard-king energy throughout.

| Role | Token | Hex |
|---|---|---|
| Page background | `--bg` | `#000000` |
| Surface / panel bg | `--surface` | `#0a0a0a` |
| Header / footer bg | `--chrome-bg` | `#0a0a0a` |
| Header / footer text | `--chrome-text` | `#00ff41` |
| Primary text (phosphor) | `--text` | `#00ff41` |
| Dimmed text | `--text-muted` | `#008f2f` |
| Blue accent | `--accent` | `#00aaff` |
| Vibrant button red | `--btn-red` | `#ff3366` |
| Vibrant button cyan | `--btn-cyan` | `#00aaff` |
| Vibrant button yellow | `--btn-yellow` | `#ffe600` |
| Link | `--link` | `#00ff41` |
| Link hover | `--link-hover` | `#00aaff` |
| Border / divider | `--border` | `#003300` |
| Scanline overlay | `--scanline` | `rgba(0,0,0,0.15)` |

**Fonts:** JetBrains Mono (Google Fonts). Courier New fallback. Everything monospace — full commitment to the terminal aesthetic.

**Notes:**
- Header and footer are part of the terminal — same black background, green text. No bezel/shell concept on this page.
- Apply a subtle CSS scanline effect to main content via repeating linear gradient with `--scanline`
- Text-shadow on primary text: `0 0 8px #00ff41` for soft phosphor glow
- Headings use `--accent` (blue) with matching glow: `0 0 8px #00aaff`
- `cursor: crosshair` is implemented on `body`
- A hardware shell aesthetic may be explored on a separate page in the future — do not reintroduce it here

---

### `courtney.css`

**Aesthetic:** Myspace era (~2004–2007). Deep teal-black background, electric teal and purple accents, early 2000s gradient energy. Personal and nostalgic — built for Courtney's actual personality, not as an ironic gag. Teal is the primary accent; purple is secondary. No pink.

| Role | Token | Hex |
|---|---|---|
| Page background | `--bg` | `#000d0f` |
| Surface / panel bg | `--surface` | `#001a1f` |
| Header / footer bg | `--chrome-bg` | `#001520` |
| Header / footer text | `--chrome-text` | `#00e5cc` |
| Primary text | `--text` | `#e0fffa` |
| Secondary / muted text | `--text-muted` | `#7abfb8` |
| Primary accent (teal) | `--accent` | `#00e5cc` |
| Secondary accent (purple) | `--accent-2` | `#9b00ff` |
| Tertiary accent (dim teal) | `--accent-3` | `#00b8a0` |
| Link | `--link` | `#00ccb8` |
| Link hover | `--link-hover` | `#00e5cc` |
| Border / divider | `--border` | `#005566` |
| Gradient start | `--grad-start` | `#001528` |
| Gradient end | `--grad-end` | `#000d0f` |
| Glitter / sparkle color | `--sparkle` | `#ffffff` |

**Fonts:** 'Trebuchet MS' as primary (authentically Myspace era). Pacifico (Google Fonts) for headings — captures early 2000s decorative handwritten feel.

**Notes:**
- Header background: `linear-gradient(135deg, var(--grad-start), var(--grad-end))`
- Borders on panels/cards should use `--accent` or `--accent-2` — colored borders were a Myspace staple
- Box shadows: `0 0 10px #00e5cc55`
- Consider a repeating tiled background pattern — subtle dark damask or star pattern at very low opacity
- Custom cursor is appropriate and very on-brand
- Text shadows on headings: `0 0 6px #00e5cc`

---

## Pages & Features

### Home (`index.html`)
- Welcoming front door to the family site
- **Guestbook/chat widget** — visitors can leave messages
- Backend: **Supabase** (free tier, Postgres, realtime capable)
- JS is justified here — live data persistence requires it
- Keep the JS footprint small; one small script file for the Supabase client

### Recipes (`/pages/recipes/`)
- Recipe collection — files already exist in repo
- Each recipe is its own HTML file
- Cookbook/parchment aesthetic via `recipes.css`

### John's Page (`/pages/john/`)
- Personal hub for John
- Terminal/wizard-king aesthetic via `john.css`
- **Blog** — flat HTML post files in `/pages/john/blog/`
- Sections: about, blog, projects/hobbies

### Courtney's Page (`/pages/courtney/`)
- Personal hub for Courtney
- Myspace era aesthetic via `courtney.css`
- **Blog** — flat HTML post files in `/pages/courtney/blog/`
- Maintained by John on Courtney's behalf

---

## Blog System

No CMS, no database. Each blog post is a flat `.html` file. The section index page links to and renders posts within the section's aesthetic.

Post file naming: `YYYY-MM-DD-post-title.html`

Paths:
- `/pages/john/blog/YYYY-MM-DD-post-title.html`
- `/pages/courtney/blog/YYYY-MM-DD-post-title.html`

---

## Justified JavaScript

Only two uses of JS in this project:

1. **`components.js`** — Vanilla web components (no shadow DOM) for shared header/footer. Justified because there is no way to share HTML includes in plain HTML without either a build step or JS.

2. **Supabase guestbook** — Small script on home page for visitor messages. Justified because live data persistence requires a backend and client JS.

Everything else is HTML and CSS only. Do not introduce JS for anything else without explicit instruction.

---

## Git Rules

**Never perform any git operation without an explicit, direct instruction.** This includes commits, staging, branching, pushing, pulling, rebasing, or anything else git-related.

If you think a git action would be useful, **do not attempt it and do not trigger a permission prompt**. Mention it conversationally in your response — e.g. "Want me to commit these changes?" — and wait for a clear yes before doing anything.

When writing commit messages, never mention Claude, AI, or any AI assistant. Write messages as if authored by a human developer.

---

## Ignore

- `31626 Session A.md` — session notes file, not part of the website
