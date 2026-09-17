import type { ContactPageContent, HomeContent, SiteSettings, TeamMember } from '../types/content';

// This dataset is a development fallback only. It is intentionally kept outside React
// components and mirrors the Firestore documents described in docs/CONTENT_AND_DATA_MODEL.md.
export const fallbackHomeContent: HomeContent = {
  eyebrow: 'AI Research · Bengaluru, India',
  heroTitle: 'Enterprise-grade AI at the cost of a database.',
  heroLead:
    'IndraAstra helps organizations already using AI improve the economics, speed, and reliability of their systems through AI performance engineering and novel architecture.',
  aboutTitle: 'Rethinking how intelligence is built.',
  aboutBody:
    'IndraAstra is a research-driven AI company based in Bengaluru, India. We work at the intersection of artificial intelligence, computational neuroscience, and advanced machine learning to develop AI systems that are more efficient, reliable, and scalable.',
  deliveryTitle: 'Immediate value - AI performance engineering',
  deliveryLead:
    'Custom optimization for businesses already using AI, aligned to three critical performance levers.',
  performanceLevers: [
    {
      title: 'Cost reduction',
      description:
        'Lower operational expenses of using AI for improved margins or competitive pricing.',
    },
    {
      title: 'Latency optimization',
      description:
        'Faster inference for user-facing applications where response time matters.',
    },
    {
      title: 'Accuracy enhancement',
      description:
        'Improved reliability for high-stakes enterprise use cases where errors are costly.',
    },
  ],
  engagementTitle: 'A structured path from validation to scale',
  engagementSteps: [
    {
      title: '2-month POC',
      description: 'Fast validation with low commitment to establish measurable baseline improvements.',
    },
    {
      title: 'Expansion',
      description: 'Scale to full implementation based on proven POC results.',
    },
    {
      title: 'End-to-end ownership',
      description: 'From rigorous business analysis to complete production deployment.',
    },
  ],
  visionEyebrow: 'Long-term research direction',
  visionTitle: 'Next-generation LLM architecture',
  visionLead:
    'Novel algorithm under development with a fundamentally different information processing paradigm.',
  researchFocuses: [
    {
      title: '1000x energy efficiency',
      description:
        'Radically reduce hardware and electricity costs for data centers. Theoretical validation complete.',
    },
    {
      title: 'Database-like scaling economics',
      description:
        'LLMs whose cost economics mimic scaling databases via hyper-distributed compute across client hardware, eliminating centralized bottlenecks.',
    },
    {
      title: 'Independent LLM provider',
      description:
        'Building toward domain-specific, high-efficiency information processing models.',
    },
  ],
  ctaTitle: "Let's build intelligent systems differently.",
  ctaBody:
    'Interested in collaborating with IndraAstra, exploring our research, or optimizing your production AI?',
};

export const fallbackContactContent: ContactPageContent = {
  eyebrow: 'Get In Touch',
  title: 'Start with the performance question.',
  lead:
    'For organizations already deploying AI models, IndraAstra focuses on the engineering work behind lower costs, faster inference, and higher accuracy.',
  locationLabel: 'Headquarters',
  location: 'Bengaluru, India',
};

export const fallbackSiteSettings: SiteSettings = {
  companyName: 'IndraAstra',
  legalName: 'IndraAstra.AI',
  footerDescription: 'AI performance engineering and next-generation LLM architecture.',
};

export const fallbackTeamMembers: TeamMember[] = [
  {
    id: 'dhiraj-daga',
    name: 'Dhiraj Daga',
    role: 'Half Scientist - Half Engineer',
    bio:
      'AI Lead at Allen Digital (300K+ active users). Optimized Walmart defect detection (+8%). Solved document structure OCR for Project Anuvaad (Supreme Court of India). Created India’s largest Indic OCR validation dataset and parallel sentences.',
    linkedinUrl: 'https://www.linkedin.com/in/dddhiraj',
    displayOrder: 1,
    active: true,
  },
];

