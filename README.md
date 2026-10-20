# JM.EXE — John Mark Dela Cruz's portfolio

Portfolio of John Mark Dela Cruz, software developer focused on web development and workflow & AI automation. The interface is styled after the GTA V pause menu.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion.

Developed with AI-assisted tools (ChatGPT, Codex, Claude Code, and Claude) for code, copy, and image generation. Every change was reviewed, built, and checked in the browser before shipping.

## Sections

| Tab | What it shows |
| --- | --- |
| HOME | Hero slides, quick tiles, featured work carousel |
| PROJECTS | Client & work projects, then academic & personal builds, with a details panel |
| AUTOMATION | Featured Zapier and n8n workflow cards plus "View all", each with what was tested and its limits |
| PROFILE | Headshot with a GTA-style character switch, about, How I Work, experience, education, resume |
| STACKS | Skills grouped like the resume |
| ROLES | Kinds of work, most relevant first |
| ACHIEVEMENTS | Milestones, locked ones in progress |
| CONTACT | Email, LinkedIn, GitHub, WhatsApp, and a Social Club group |

Keyboard: `Q` / `E` switch tabs, `Enter` selects, `Esc` closes a panel or returns home.

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
| Automation workflows | `src/data/automations.ts` |
| Contact links | `src/components/Quit.tsx` |
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
- Optional Pricedown title font: add `public/fonts/pricedown.woff2`; otherwise titles fall back to Bebas Neue

## Environment variables

Only needed for the phone gallery admin (`/admin/phone-gallery`):

- `BLOB_READ_WRITE_TOKEN` — Vercel Blob read/write token
- `ADMIN_PASSWORD` — password for gallery uploads and deletes

The rest of the site works without them. See `DEPLOYMENT_GUIDE.md`.

## Notes

- No copyrighted GTA V assets or logos are used; the art is original, generated in the style of the game's loading screens.
- Automation demos run on fictional data and are labeled as such; client work is labeled separately.
