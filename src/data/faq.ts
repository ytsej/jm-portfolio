// Plain-language answers shown on the Profile page and published as FAQPage
// structured data, so people and AI assistants get the same short answers.
// Keep every answer consistent with portfolio.ts and the case studies.
export interface Faq {
  question: string;
  answer: string;
}

export const faqs: Faq[] = [
  {
    question: "What does John Mark Dela Cruz do?",
    answer:
      "He is a software developer focused on web development and workflow and AI automation. He builds and maintains websites and web apps, and automates business work such as form intake, AI inbox triage, CRM updates, and recurring reports.",
  },
  {
    question: "Is he available for work?",
    answer:
      "Yes. He is open to full-time roles. He is based in Bacoor, Cavite, Philippines (GMT+8), and his recent roles have been remote.",
  },
  {
    question: "What client work has he delivered?",
    answer:
      "On one DoGoodie contract he built two live websites, dogoodiebuilders.com and ethicalcapacitylab.org, plus two Zapier automations: an AI email inquiry classifier and a weekly KPI report. He is now a part-time full-stack developer on iTip, a tipping platform in Kuwait, where the Payzah payment integration is still in progress.",
  },
  {
    question: "Which tools and technologies does he use?",
    answer:
      "Next.js, React, and TypeScript on the front end; Node.js and serverless functions on the back end; Zapier, n8n, and the GoHighLevel API for automation; and AI coding tools such as Claude Code and Codex, with every result reviewed.",
  },
  {
    question: "How does he check that his automations work?",
    answer:
      "He writes down the inputs, outputs, and edge cases first, adds gates before and after risky steps so an invalid AI result is flagged for a person, and checks saved results separately. Each case on this site lists what was tested and where its limits are.",
  },
  {
    question: "How can I contact him?",
    answer:
      "By email at jmcruzada.delacruz@gmail.com, on LinkedIn at linkedin.com/in/johnmark-c-delacruz, or on GitHub at github.com/ytsej. The Contact page has the full list.",
  },
];
