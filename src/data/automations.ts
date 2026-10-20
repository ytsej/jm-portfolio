import type { CaseStudy } from "./portfolio";

export interface Automation {
  id: string;
  title: string;
  platform: "Zapier" | "n8n" | "n8n + Node.js";
  // "client" = built for and used by DoGoodie, "demo" = portfolio demo on fictional data
  label: "client" | "demo";
  featured: boolean;
  image: string;
  tagline: string;
  summary: string;
  tools: string[];
  evidence: string;
  scope: string;
  caseStudy?: CaseStudy;
}

export const usesGoHighLevel = (item: Automation) => item.tools.some((tool) => /gohighlevel/i.test(tool));

export const automationIntro =
  "13 workflows across Zapier and n8n, shown as 12 cards. Two were built for DoGoodie; the rest are portfolio demos run on fictional data. Each one lists what was actually tested and where its limits are.";

export const automations: Automation[] = [
  {
    id: "dogoodie-email-inquiry-classifier",
    title: "DoGoodie Email Inquiry Classifier",
    platform: "Zapier",
    label: "client",
    featured: true,
    image: "/images/automation/06-zapier-email-inquiry-classifier.webp",
    tagline: "Business inquiries are processed by AI and land in the team's Discord.",
    summary:
      "Built for DoGoodie. Business inquiries from a saved Gmail search go through ChatGPT, then JavaScript and Formatter steps prepare the result before it is posted to the team's Discord channel.",
    tools: ["Gmail", "ChatGPT (OpenAI)", "Code by Zapier", "Formatter by Zapier", "Discord"],
    evidence: "Published and on at the 18 Oct 2026 review, with 27 successful runs visible.",
    scope: "Run counts show executions, not classification accuracy or complete inbox coverage.",
    caseStudy: {
      problem:
        "DoGoodie wanted business inquiries from Gmail to reach the team in Discord, already classified, instead of someone checking the inbox by hand.",
      responsibility:
        "I designed and built the whole Zap for DoGoodie: the saved Gmail search, the ChatGPT step, the JavaScript and Formatter clean-up, and the Discord post.",
      decision:
        "A saved Gmail search acts as the first filter, so only likely inquiries reach the AI step. That keeps AI usage, and its cost, limited to the emails that matter.",
      result: "Published and on at the 18 Oct 2026 review, with 27 successful runs visible in Zapier.",
      evidence:
        "Zapier run history at the 18 Oct 2026 review. A sanitized workflow diagram and sample input and output are not published yet.",
      limits:
        "Run counts show the Zap executed, not that each email was classified correctly. No labeled accuracy check has been done yet, and coverage depends on the saved search.",
    },
  },
  {
    id: "dogoodie-weekly-kpi-report",
    title: "DoGoodie Weekly KPI Report",
    platform: "Zapier",
    label: "client",
    featured: true,
    image: "/images/automation/07-zapier-weekly-kpi-report.webp",
    tagline: "A KPI row in the spreadsheet becomes a report from a Docs template.",
    summary:
      "Built for DoGoodie. An eligible KPI row in Google Sheets passes a filter, becomes a report from a Google Docs template, and the tracker row is updated afterward. It produced DoGoodie's weekly KPI report during the engagement.",
    tools: ["Google Sheets", "Filter by Zapier", "Google Docs"],
    evidence: "Ran weekly for DoGoodie while the engagement was active. Still published at the 18 Oct 2026 review.",
    scope:
      "Not in use since the DoGoodie engagement ended, so there are no recent runs. Triggered by a new or updated spreadsheet row rather than a schedule.",
  },
  {
    id: "authenticated-lead-routing",
    title: "Authenticated Lead Routing",
    platform: "n8n",
    label: "demo",
    featured: true,
    image: "/images/automation/09-n8n-authenticated-lead-routing.webp",
    tagline: "Leads from forms and websites land in the right GoHighLevel pipeline stage.",
    summary:
      "Webhook lead intake with native header authentication, a persistent event ledger, and linked GoHighLevel contact and opportunity routing. A resend with the same input returns the original record IDs; changed input under the same event ID returns a conflict instead of creating a second record.",
    tools: ["n8n", "Webhook (Header Auth)", "n8n Data Tables", "HTTP Request", "GoHighLevel API"],
    evidence:
      "Native acceptance on 16 Oct 2026 covered both routes, replays, conflicts, auth and input rejection (403 / 400 / 409), CRM-auth failure, and unfinished-event review. Backed by a local test suite that is not public yet.",
    scope:
      "Tested with sequential runs. Concurrent exactly-once delivery is out of scope, so simultaneous resends could still race.",
    caseStudy: {
      problem:
        "Leads from forms and websites need to land in the right GoHighLevel pipeline stage exactly once, even when the sender retries the same request.",
      responsibility:
        "A portfolio demo I built alone on fictional data: the n8n workflow, the event ledger, the CRM calls, and the local tests.",
      decision:
        "Each request carries an event ID stored in a ledger. A resend with the same input returns the original record IDs, and changed input under the same ID returns 409 Conflict, so retries cannot create duplicates.",
      result:
        "An acceptance run on 16 Oct 2026 covered both routes, replays, conflicts, rejected auth and input (403 and 400), a CRM auth failure, and review of unfinished events.",
      evidence: "Acceptance notes and a local test suite. The workflow export and tests are not public yet.",
      limits:
        "Tested with sequential runs only, so simultaneous resends could still race. Nothing ran against real client data.",
    },
  },
  {
    id: "crm-sync-and-reconciliation",
    title: "CRM Sync and Reconciliation",
    platform: "n8n",
    label: "demo",
    featured: true,
    image: "/images/automation/12-n8n-crm-sync-and-reconciliation.webp",
    tagline: "A CRM mirrored into a table you control, with manual edits protected.",
    summary:
      "Scoped, read-only sync of GoHighLevel opportunities into an n8n mirror table. Each record is inserted, updated, left unchanged, or flagged for review when a sync would overwrite a manual edit. Every write is checked against the returned row, not just the node finishing.",
    tools: ["n8n", "HTTP Request", "Wait", "n8n Data Tables", "GoHighLevel API (read-only)"],
    evidence:
      "16-17 Oct 2026: initial insert of 3 rows, an unchanged rerun, 1 same-ID update, 1 preserved manual edit, and invalid auth with zero writes, each checked with independent CSV audits. Backed by a local test suite that is not public yet.",
    scope:
      "Manual, sequential, one-way sync of three fictional records. No two-way sync, concurrency, or rollback guarantees, and real API throttling was not observed.",
  },
  {
    id: "retry-and-recovery-queue",
    title: "Retry and Recovery Queue",
    platform: "n8n",
    label: "demo",
    featured: false,
    image: "/images/automation/11-n8n-retry-and-recovery-queue.webp",
    tagline: "Failures are retried, logged, and recovered instead of silently lost.",
    summary:
      "Two workflows. A controlled source job retries only transient failures, up to three attempts. A separate Error Trigger monitor records each verified failure in a review queue. Recovery is operator-led and resumes from the check step without repeating completed work.",
    tools: ["n8n", "Error Trigger", "Wait", "n8n Data Tables", "Code"],
    evidence:
      "16 Oct 2026: a scheduled source failure (execution 35) was captured automatically by the monitor (36), then manual recovery (37) returned recovered with zero extra completions. Backed by a local test suite shared by both workflows, not public yet.",
    scope:
      "Uses simulated fixture statuses; no external service is called. The monitor never auto-replays, and duplicate trigger deliveries could create duplicate queue rows.",
  },
  {
    id: "transcript-to-sop-draft",
    title: "Transcript to SOP Draft",
    platform: "Zapier",
    label: "demo",
    featured: false,
    image: "/images/automation/05-zapier-transcript-to-sop.webp",
    tagline: "A plain process transcript becomes a structured SOP draft, ready to review.",
    summary:
      "Only READY records with a transcript, a process name, and no existing draft reach the AI. The AI writes a structured SOP and marks missing details as Not specified instead of inventing them. An output gate requires a title and content before the draft is saved back to the same row.",
    tools: ["Zapier Tables", "Filter by Zapier", "AI by Zapier"],
    evidence: "Test guide dated 11 Oct 2026. 1 successful and 4 filtered runs visible at the 18 Oct review.",
    scope: "The output is a draft for human review. Approval, publishing, and simultaneous-run locking are outside this flow.",
  },
  {
    id: "authenticated-ghl-contacts",
    title: "Authenticated GHL Contacts",
    platform: "n8n",
    label: "demo",
    featured: false,
    image: "/images/automation/08-n8n-authenticated-ghl-contacts.webp",
    tagline: "Clean, validated leads go into GoHighLevel, searched before created.",
    summary:
      "Validates and normalizes a lead, searches the pinned GoHighLevel location, and creates a contact only after a verified, explicit no-match. The create response is checked for the expected ID, email, and location before success is reported.",
    tools: ["n8n", "Code", "HTTP Request", "GoHighLevel API"],
    evidence:
      "15 Oct 2026: actual contact creation, independent CRM readback, and sequential replay reuse. Backed by a local test suite that is not public yet.",
    scope: "Search-before-create protects sequential runs; concurrent runs can still race. No follow-up messaging.",
  },
  {
    id: "own-lead-validation-api",
    title: "Own Lead Validation API",
    platform: "n8n + Node.js",
    label: "demo",
    featured: false,
    image: "/images/automation/10-n8n-own-lead-validation-api.webp",
    tagline: "My own validation service, called securely from an automation.",
    summary:
      "A custom Node.js service called from n8n over authenticated HTTPS. It checks the API key before parsing the body, validates and normalizes the lead, and routes it by an explicit rule. The n8n caller verifies the status, JSON shape, and matching request IDs before using the response.",
    tools: ["Node.js", "n8n", "HTTP Request", "API key auth"],
    evidence:
      "17 Oct 2026: n8n Cloud to HTTPS to API runs verified new, qualified, invalid input (400), and invalid key (401), matched by request ID in server logs. Backed by a local test suite that is not public yet.",
    scope: "No database or CRM writes. The API and tunnel were stopped after acceptance.",
  },
  {
    id: "ai-lead-intake",
    title: "AI Lead Intake and Follow-up Draft",
    platform: "Zapier",
    label: "demo",
    featured: false,
    image: "/images/automation/04-zapier-ai-lead-intake.webp",
    tagline: "New leads are processed by AI and sorted into three follow-up paths.",
    summary:
      "A new lead row goes through JavaScript, lookups, filter gates, and an AI by Zapier step. The saved records then split into three conditional paths, each updating its own record.",
    tools: ["Zapier Tables", "Code by Zapier", "Filter by Zapier", "AI by Zapier", "Paths by Zapier"],
    evidence: "5 successful and 4 filtered runs visible at the 18 Oct 2026 review.",
    scope: "The exact AI prompt, path conditions, and draft quality have not been audited. No messages are sent automatically.",
  },
  {
    id: "deadline-follow-up-digest",
    title: "Deadline and Follow-up Digest",
    platform: "Zapier",
    label: "demo",
    featured: false,
    image: "/images/automation/01-zapier-deadline-followup-digest.webp",
    tagline: "Every day, tracker rows become a digest document and a log entry.",
    summary:
      "A daily schedule reads tracker rows, processes them with JavaScript, creates a Google Docs digest, and logs the run in a spreadsheet.",
    tools: ["Schedule by Zapier", "Code by Zapier", "Google Sheets", "Filter by Zapier", "Google Docs"],
    evidence: "5 successful and 1 filtered runs visible at the 18 Oct 2026 review.",
    scope: "No email delivery. The exact selection rules have not been audited.",
  },
  {
    id: "content-approval-queue",
    title: "Content Approval Queue",
    platform: "Zapier",
    label: "demo",
    featured: false,
    image: "/images/automation/02-zapier-content-approval-queue.webp",
    tagline: "Content records pass a code check and a filter before anything is updated.",
    summary: "A content-queue record is processed by JavaScript and must pass a filter before its record is updated.",
    tools: ["Zapier Tables", "Code by Zapier", "Filter by Zapier"],
    evidence: "8 successful and 8 filtered runs visible at the 18 Oct 2026 review.",
    scope: "Updates the queue record only; nothing is published.",
  },
  {
    id: "client-onboarding-handoff",
    title: "Client Onboarding Handoff",
    platform: "Zapier",
    label: "demo",
    featured: false,
    image: "/images/automation/03-zapier-client-onboarding-handoff.webp",
    tagline: "Every new client gets a checklist, with three checkpoints along the way.",
    summary:
      "An onboarding record passes three filter checkpoints, a related-record lookup, and a checklist code step before a downstream record is created and the source is updated.",
    tools: ["Zapier Tables", "Filter by Zapier", "Code by Zapier"],
    evidence: "2 successful and 5 filtered runs visible at the 18 Oct 2026 review.",
    scope: "Table operations only; there is no external email handoff.",
  },
];
