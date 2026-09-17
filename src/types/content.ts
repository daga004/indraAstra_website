export interface PerformanceLever {
  title: string;
  description: string;
}

export interface EngagementStep {
  title: string;
  description: string;
}

export interface ResearchFocus {
  title: string;
  description: string;
}

export interface HomeContent {
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  aboutTitle: string;
  aboutBody: string;
  deliveryTitle: string;
  deliveryLead: string;
  performanceLevers: PerformanceLever[];
  engagementTitle: string;
  engagementSteps: EngagementStep[];
  visionEyebrow: string;
  visionTitle: string;
  visionLead: string;
  researchFocuses: ResearchFocus[];
  ctaTitle: string;
  ctaBody: string;
}

export interface ContactPageContent {
  eyebrow: string;
  title: string;
  lead: string;
  locationLabel: string;
  location: string;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  footerDescription: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photoUrl?: string;
  photoPath?: string;
  linkedinUrl?: string;
  displayOrder: number;
  active: boolean;
}

export interface ContactSubmissionInput {
  name: string;
  email: string;
  organization: string;
  subject: string;
  message: string;
}

export type ContentSource = 'firebase' | 'local';

export interface ContentResult<T> {
  data: T;
  source: ContentSource;
  warning?: string;
}
