# IndraAstra website

A TypeScript, React, and Vite website for IndraAstra. It has three public routes—Home, Team, and Contact—and is designed for editable content through Firebase.

The supplied company PDF is the factual source. The included local data is only a development preview. Before launch, publish approved content in Firestore and remove any content that is no longer current.

## Technology

- React + TypeScript + Vite
- React Router for `/`, `/team`, and `/contact`
- Firebase Cloud Firestore for site content, team members, and contact submissions
- Firebase Storage for replaceable team images
- Firebase Hosting configuration with SPA route rewrites
- Plain CSS design tokens and responsive styles

## Folder structure

```text
src/
  components/     Reusable UI: navigation, form, cards, buttons
  data/           Deliberately separated local preview fallback
  firebase/        Firebase client initialisation
  hooks/          Async data and page metadata helpers
  pages/          Home, Team, Contact, and fallback route composition
  services/       Firestore, Storage, and contact-submission access
  styles/         Global tokens and responsive visual system
  types/          Strict TypeScript data contracts
docs/
  CONTENT_AND_DATA_MODEL.md  Source summary, architecture, schema, security model
firestore.rules              Firestore access control
storage.rules                Storage access control
firebase.json                Hosting, Firestore, and Storage deployment configuration
```

## Run locally

1. Install a current Node.js LTS release.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in the Firebase web-app configuration.
4. Start the site:

   ```bash
   npm run dev
   ```

5. Open the localhost URL Vite prints. Without `.env.local`, the site still renders approved local fallback content and clearly notes that Firebase is not configured. Contact-form submission is intentionally unavailable until Firebase is configured.

For a production verification build:

```bash
npm run typecheck
npm run build
```

## Firebase setup

This repository contains the Firebase configuration, rules, and deployment files. It does not create a Firebase project or put credentials in source control.

1. Create or select a Firebase project in Firebase Console.
2. Add a **Web app** to that project.
3. Copy the web configuration values into `.env.local`, following `.env.example`.
4. Create the Firestore database and Storage bucket in Firebase Console.
5. Install Firebase CLI and authenticate locally:

   ```bash
   npm install -g firebase-tools
   firebase login
   ```

6. Replace `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` in `.firebaserc` with the actual project ID.
7. Deploy rules first:

   ```bash
   firebase deploy --only firestore:rules,storage
   ```

8. Build and deploy Hosting:

   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## Firestore content

The proposed collection layout and all field definitions are documented in [docs/CONTENT_AND_DATA_MODEL.md](docs/CONTENT_AND_DATA_MODEL.md).

Create these documents in Firestore Console:

- `siteContent/home`
- `siteContent/contact`
- `siteContent/settings`
- One document in `teamMembers` for each person

Copy the approved values from `src/data/fallbackContent.ts` into the matching documents as the initial publishing pass. The app gives each document safe defaults if an optional field is absent, but production content should remain complete.

### Edit Home page content

In Firestore Console, edit fields in `siteContent/home`. For example, changing `heroTitle`, `deliveryLead`, or an item inside `performanceLevers` updates the page without a code deployment. Keep the data shape intact—arrays must contain objects with the fields shown in the data-model document.

### Add or update a team member

1. Add a document under `teamMembers`.
2. Set `name`, `role`, `displayOrder`, and `active`.
3. Add a short `bio` and `linkedinUrl` only when approved.
4. Set `active: true` to publish the card. Set it to `false` to hide the card without deleting the record.
5. Use `displayOrder` to control the order; lower numbers appear first.

The page reads only active documents and reorders them automatically.

### Replace a team photograph

1. Prepare a compressed, consistently cropped WebP or AVIF image.
2. Upload it to Firebase Storage under `team/`, for example `team/dhiraj-daga.webp`.
3. Add that path to the matching team document as `photoPath`, or use the Firebase download URL in `photoUrl`.
4. Confirm the image displays in the Team page.

Storage browser writes are blocked by design. Use Firebase Console, CLI, or a future authenticated admin workflow for uploads.

### Contact submissions & automated email dispatch

The Contact page validates fields before writing a document to `contactSubmissions`. It records a Firebase server timestamp and a `new` status. In addition, an automated notification containing all inquiry details is dispatched immediately to:
- `eswar@indraastra.in`
- `dhiraj.daga@indraastra.in`

Email forwarding supports:
1. **Direct mail dispatch (default)**: Inquiries are automatically forwarded to `eswar@indraastra.in` (with `dhiraj.daga@indraastra.in` CC'd) with direct reply-to set to the inquirer.
2. **Internal Google Workspace webhook**: Deploy the provided `scripts/google-apps-script-mailer.js` under `common@indraastra.in` in Google Apps Script and configure `VITE_CONTACT_WEBHOOK_URL` in `.env.local`.
3. **Firebase Extension**: Writes to `mail` collection are permitted by [firestore.rules](firestore.rules) for use with Firebase's official `Trigger Email` extension.

## Backend ownership & Firebase account

To connect the backend to `common@indraastra.in`:
- **Option A (Grant Ownership)**: In Firebase Console under Project Settings > Users and Permissions, add `common@indraastra.in` as **Owner**.
- **Option B (New Project under common@indraastra.in)**: Create a project under `common@indraastra.in`, update `.firebaserc` and `.env.local` with the new project settings, authenticate using `firebase login:add`, and deploy rules and hosting.

## Security notes

Firebase web configuration values are not secret; they appear in a browser build. The protection comes from [firestore.rules](firestore.rules) and [storage.rules](storage.rules): public clients cannot modify published content or team records, cannot upload assets, and cannot read contact submissions. Review and deploy these rules before going live.

The rules do not include an in-browser admin editor. That keeps the public attack surface small. If non-developers need an editor later, add Firebase Authentication and custom-claim rules before enabling any client-side content writes.

## Deployment checklist

- Replace `.firebaserc` placeholder project ID (or verify existing).
- Add `.env.local` locally or set matching `VITE_` environment values in the build environment. Never commit `.env.local`.
- Publish approved `siteContent` and `teamMembers` records.
- Upload approved, optimized team images under `team/`.
- Deploy Firestore and Storage rules (`firebase deploy --only firestore:rules,storage`).
- Run `npm run typecheck` and `npm run build`.
- Deploy Firebase Hosting (`firebase deploy --only hosting`).
