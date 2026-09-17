# IndraAstra content and data model

## Source-bound content summary

The company PDF is the factual source for the site. It establishes these points:

- IndraAstra.AI's positioning is "Power of Enterprise grade AI at the cost of a Database."
- Its immediate offering is AI performance engineering for businesses already using AI.
- The three stated priorities are cost reduction, latency optimization, and accuracy enhancement.
- Its engagement model is a 2-month proof of concept, expansion based on results, and end-to-end ownership from business analysis to deployment.
- Its longer-term research direction is a novel LLM algorithm intended to improve energy efficiency, create database-like scaling economics through hyper-distributed compute, and work toward independent domain-specific models.
- The sole person identified in the supplied company material is Dhiraj Daga. No other people, clients, products, partnerships, or achievements have been added.

The source presentation describes a historical target for a demo in the first half of 2026. The website deliberately does not repeat that date as a current commitment. Update `siteContent/home` when a current research-status statement is approved.

## Three-page information architecture

| Route | Goal | Main content |
| --- | --- | --- |
| `/` | Explain IndraAstra quickly | Hero, company focus, performance levers, engagement model, research direction, contact CTA |
| `/team` | Establish the human side of the work | Active team-member cards ordered by `displayOrder` |
| `/contact` | Capture qualified inquiries | Bengaluru note, focused introduction, validated contact form |

The navbar and footer are shared. Layout, accessibility, styling, and components stay in code; editable wording and people live in Firestore.

## Firestore collections

### `siteContent`

Use three known document IDs. Public browsers can read these documents but cannot edit them.

```text
siteContent/home
  eyebrow: string
  heroTitle: string
  heroLead: string
  aboutTitle: string
  aboutBody: string
  deliveryTitle: string
  deliveryLead: string
  performanceLevers: [{ title: string, description: string }]
  engagementTitle: string
  engagementSteps: [{ title: string, description: string }]
  visionEyebrow: string
  visionTitle: string
  visionLead: string
  researchFocuses: [{ title: string, description: string }]
  ctaTitle: string
  ctaBody: string

siteContent/contact
  eyebrow: string
  title: string
  lead: string
  locationLabel: string
  location: string

siteContent/settings
  companyName: string
  legalName: string
  footerDescription: string
```

### `teamMembers`

Each document represents one person. The Team page requests only `active == true`, sorts by `displayOrder`, and does not need code changes for new records.

```text
teamMembers/{memberId}
  name: string                         // required
  role: string                         // required
  bio: string                          // optional
  photoUrl: string                     // optional Firebase download URL
  photoPath: string                    // optional Storage path, e.g. team/dhiraj-daga.webp
  linkedinUrl: string                  // optional full HTTPS URL
  displayOrder: number                 // required
  active: boolean                      // required
```

Use either `photoUrl` or `photoPath`. When `photoPath` is supplied, the site resolves its Firebase Storage download URL at runtime. If no photo is available, the card intentionally renders initials instead of inventing a portrait.

### `contactSubmissions`

Created by the public form only. There is no public read permission.

```text
contactSubmissions/{autoId}
  name: string
  email: string
  organization: string
  subject: string
  message: string
  createdAt: server timestamp
  status: "new"
```

## Security model

- Public visitors can read published `siteContent` and active `teamMembers` only.
- Browser clients cannot create, update, or delete site content or team data.
- Anyone can create a tightly validated `contactSubmissions` document, but no browser client can read, list, change, or delete one.
- Files beneath `team/` may be read by the public Team page. Browser writes to all Storage paths are blocked.
- Content, people, and photographs should be changed through Firebase Console, Firebase CLI/Admin SDK, or a future authenticated admin workflow—not from the public site.

The project uses a local fallback dataset only when Firebase is unconfigured or unavailable. It is isolated in `src/data/fallbackContent.ts` and is never merged into React components or Firestore writes.
