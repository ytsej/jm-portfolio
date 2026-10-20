# Prompts para sa kabilang session (cards)

Kopyahin ang bawat prompt sa session na gumawa ng automation cards. Ilakip ang lumang card bilang reference kung meron.

## 1. Ayusin ang Authenticated Lead Routing card

Ilakip: `09-n8n-authenticated-lead-routing.png`

```
Regenerate the "Authenticated Lead Routing" n8n card with the exact same layout, size (3200 x 1984), colors, fonts, and workflow screenshot. Change only these texts:

- Header tagline: "Leads from forms and websites land in the right pipeline stage, once." -> "Leads from forms and websites land in the right pipeline stage."
- WHAT YOU GET, second line: "Resends and conflicts caught: no double entries" -> "Sequential resends and conflicts caught by an event ledger"

Reason: acceptance testing only covered sequential runs, so the card must not promise duplicate-free results under concurrent resends. Keep every other text, step, and tool tile unchanged. Save as 09-n8n-authenticated-lead-routing.png.
```

## 2. Ayusin ang Authenticated GHL Contacts card

Ilakip: `08-n8n-authenticated-ghl-contacts.png`

```
Regenerate the "Authenticated GHL Contacts" n8n card with the exact same layout, size, colors, fonts, and workflow screenshot. Change only these texts:

- Header tagline: "Clean, validated leads go into your GoHighLevel CRM without duplicates." -> "Clean, validated leads go into your GoHighLevel CRM, searched before created."
- WHAT YOU GET, second line: "No duplicate contacts: it searches before it creates" -> "Searches before it creates, so re-runs reuse the existing contact"

Reason: search-before-create was verified for sequential runs only; concurrent runs can still race. Keep everything else unchanged. Save as 08-n8n-authenticated-ghl-contacts.png.
```

## 3. Bagong "How I Work" card

Walang reference na card nito, kaya gamitin ang `05-zapier-transcript-to-sop.png` bilang design reference.

```
Create a new portfolio card called "How I Work" in the same design system as my workflow cards (use 05-zapier-transcript-to-sop.png as the style reference): dark navy background, rounded panels with thin borders, white bold title, numbered circles for steps, a "WHAT YOU GET" panel with check marks, a "PERFECT FOR" panel with a colored border, and a bottom strip of tool tiles. Use an emerald green accent (#34d399) instead of the Zapier orange. Size 3200 x 1800 PNG. No platform logo at the top; instead show a small label "JM.EXE".

Title: How I Work
Header tagline (right side, with the vertical accent bar): Spec first, test the work, and flag failures instead of hiding them.

Left column, five numbered steps:
1. Spec first — Inputs, outputs, and edge cases written down before building. AI coding tools work against that spec, and every result is reviewed.
2. Test the work — Unit tests, browser QA, and real test runs before anything is called done.
3. Fail loudly — Gates before and after risky steps, so an invalid AI result or failed write goes to a person.
4. Verify the output — A finished run isn't proof. The saved result is checked separately, with notes on what was and wasn't verified.
5. Keep the team in sync — Clear timelines, dependencies, and task breakdowns for developers, QA, and analysts.

Center panel titled "THE LOOP": a simple vertical flow diagram of five boxes connected by arrows: Spec -> Build -> Test -> Verify -> Ship, with a dashed arrow from Test back to Build labeled "fix".

WHAT YOU GET:
- Work that is tested before it is called done
- Failures flagged to a person, not silently lost
- Clear notes on what was and wasn't verified

PERFECT FOR:
Teams hiring a developer who builds websites and automations they can trust.

Bottom tool strip (four tiles, icon + name + small caption):
- Claude Code / Codex — AI-assisted, reviewed
- Vitest / Playwright — Tests and browser QA
- Zapier / n8n — Automation
- ProjectLibre / Notion — Tracking

Use only this text. Do not add statistics, client names, or claims that are not listed here. Save as how-i-work.png.
```

Kapag tapos na, ilagay ang mga file sa `public/images/automation/` (para sa 08 at 09) at `public/images/jm/how-i-work.png`, o ipadala sa akin para ako ang mag-convert at magkabit.
