# JM.EXE: John Mark Dela Cruz's portfolio

Portfolio of John Mark Dela Cruz, software developer focused on web development and workflow & AI automation. The interface is styled after the GTA V pause menu.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion.

Developed with AI-assisted tools (ChatGPT, Codex, Claude Code, and Claude) for code, copy, and image generation. Every change was reviewed, built, and checked in the browser before shipping.

## Sections

| Tab (URL) | What it shows |
| --- | --- |
| HOME (`/`) | Name, role, value statement, and quick facts with Resume and Contact links; three featured cases plus the ongoing iTip role; Explore tiles |
| PROJECTS (`/projects`) | Client & work projects, then academic & personal builds, with a brief that opens at `/projects/<slug>` |
| AUTOMATION (`/automation`) | Featured Zapier and n8n workflow cards plus "View all", each opening at `/automation/<id>` |
| PROFILE (`/profile`) | Headshot with a GTA-style character switch, about, How I Work, experience, education, resume |
| STACKS (`/stacks`) | Skills grouped like the resume, each with its logo (`src/components/TechIcon.tsx`) |
| ROLES (`/roles`) | Kinds of work, most relevant first, with logo + name skill chips |
| ACHIEVEMENTS (`/achievements`) | Milestones, locked ones in progress |
| CONTACT (`/contact`) | Email, LinkedIn, GitHub, WhatsApp (green), and a purple Social Club group |

Every section and case has its own URL, so refresh, Back/Forward, and shared links land on the same view. Tabs switch in place through the History API, with no page reload.

Keyboard: `Q` / `E` switch tabs, `Enter` selects, `Esc` closes the top overlay (brief, image viewer, phone, intro) or returns home. Overlays keep `Tab` focus inside and return focus to the control that opened them. The intro video plays only from the footer's "Play intro" control.

Featured cases carry a `caseStudy` (problem, my part, key decision, result, evidence, limits) that the panels show before the technical details.

## Search and AI answers

- Per-page titles, descriptions, canonical URLs, and Open Graph tags: `app/[[...path]]/page.tsx`
- `robots.txt`, `sitemap.xml`, and `llms.txt` are generated from the same data: `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`
- Person and WebSite structured data (JSON-LD): `app/layout.tsx`
- The site URL comes from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, so it switches to a custom domain automatically: `src/data/site.ts`

## Getting started

```bash
npm install
npm run dev   # http://localhost:3003
npm run build && npm start
```

## Updating content

| What | Where |
| --- | --- |
| Profile, experience, skills, roles, achievements, projects | `src/data/portfolio.ts` |
| Section labels, URLs, and search descriptions | `src/data/sections.ts` |
| Automation workflows | `src/data/automations.ts` |
| Contact links | `src/data/contacts.ts` |
| Phone menu messages, contacts, call logs | `src/data/phone-*.json` |
| Resume PDF | `public/images/jm/cv.pdf` (HTML source in `docs/cv/cv.html`) |

Projects are split by `category` (`"client"` or `"academic"`). Entries in `src/data/projects.json` (written by `/admin/projects`) are only shown if their title isn't already in `portfolio.ts`.

## Images

- GTA V-style art: `public/images/jm/gta/` (hero slides, home tiles, profile portrait)
- Project screenshots: `public/images/projects/<project>/`
- Workflow cards: `public/images/automation/`
- Link preview: `public/og.jpg` (1200 × 630)

When replacing an image, save it as WebP under a **new filename** and update the path; reusing a filename can serve the old cached version. Prompts for generating the art are in `docs/IMAGE_PROMPTS.md`.

## Fonts

- Bebas Neue (display) and Inter (body) from Google Fonts
- Barlow Semi Condensed for the HUD-style labels
- Titles use Bebas Neue. To switch to Pricedown, add `public/fonts/pricedown.woff2` and an `@font-face` for it in `app/globals.css` (only once the file exists, so there is no 404)

## Environment variables

Only needed for the phone gallery admin (`/admin/phone-gallery`):

- `BLOB_READ_WRITE_TOKEN`: Vercel Blob read/write token
- `ADMIN_PASSWORD`: password for gallery uploads and deletes

The rest of the site works without them. See `DEPLOYMENT_GUIDE.md`.

## Notes

- No copyrighted GTA V assets or logos are used; the art is original, generated in the style of the game's loading screens.
- Automation demos run on fictional data and are labeled as such; client work is labeled separately.
