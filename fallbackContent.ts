import type { ContactPageContent, HomeContent, SiteSettings, TeamMember } from '../types/content';

// This dataset is a development fallback only. It is intentionally kept outside React
// components and mirrors the Firestore documents described in docs/CONTENT_AND_DATA_MODEL.md.
export const fallbackHomeContent: HomeContent = {
  eyebrow: 'AI Research · Bengaluru, India',
  heroTitle: 'Get the most of your AI journey',
  heroLead: '',
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
  visionEyebrow: 'What we are building',
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
    role: 'Chief Technical Officer',
    bio: 'AI scientist-engineer leading impactful AI initiatives across education, computer vision, OCR, and Indic-language technologies, including work used by the Supreme Court of India.',
    photoUrl: '/team/dhiraj-daga.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/dddhiraj',
    displayOrder: 1,
    active: true,
  },
  {
    id: 'sarthak-jain',
    name: 'Sarthak Jain',
    role: 'Founding AI Engineer',
    bio: 'Worked in multiple ML startups and graduated from IIT(BHU) in 2025.',
    photoUrl: '/team/sarthak-jain.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/sartj/',
    displayOrder: 2,
    active: true,
  },
  {
    id: 'manik-sharma',
    name: 'Manik Sharma',
    role: 'Founding AI Engineer',
    bio: 'Graduated from IIT (BHU) in 2026 with an Integrated Dual Degree in Engineering Physics.',
    photoUrl: '/team/manik-sharma.jpg',
    linkedinUrl: 'https://in.linkedin.com/in/manik-sharma-72495b24a',
    displayOrder: 3,
    active: true,
  },
  {
    id: 'sunil-khana',
    name: 'Sunil Khana',
    role: 'Mentor',
    bio: 'Director - SAI Agroforestry, Co-Founder & Director - GreenBloom Energy',
    photoUrl: '/team/sunil-khana.jpg',
    displayOrder: 4,
    active: true,
  },
  {
    id: 'yash-sahay',
    name: 'Yash Sahay',
    role: 'Intern',
    bio: 'Data Science student at IIT Madras and passionate on strengthening fundamentals and exploring deeper AI concepts.',
    photoUrl: '/team/yash-sahay.jpg',
    linkedinUrl: 'https://www.linkedin.com/in/yash-sahay-profile/',
    displayOrder: 5,
    active: true,
  },
  {
    id: 'eswar-kompalli',
    name: 'Eswar Kompalli',
    role: 'Intern',
    bio: 'Data-driven business analytics student building hands-on experience.',
    photoUrl: '/team/eswar-kompalli.jpg',
    displayOrder: 6,
    active: true,
  },
];

