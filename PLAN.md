# 🖋️ Peblo Notes — Full-Stack Implementation Plan
### *The definitive blueprint for building a world-class AI-powered notes workspace*

---

> **Stack**: Next.js 14 (App Router) · TypeScript · PostgreSQL (Supabase) · Prisma ORM · Anthropic Claude API · TailwindCSS · Framer Motion · Zod · next-auth · Stitch (UI generation)
>
> **Design System**: Dark-mode-first · Amber-gold accent · Orchid secondary · Editorial typography · Glassmorphism in moderation
>
> **Skill Applied**: `ui-ux-pro-max-skill` from `https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git`

---

## 📋 Table of Contents

1. [Project Bootstrap & Stitch Wiring](#1-project-bootstrap--stitch-wiring)
2. [Stitch Prompts for Missing Screens](#2-stitch-prompts-for-missing-screens)
3. [Design Tokens & System](#3-design-tokens--system)
4. [Database Schema (PostgreSQL + Prisma)](#4-database-schema-postgresql--prisma)
5. [Backend Architecture](#5-backend-architecture)
6. [API Endpoints (Full Specification)](#6-api-endpoints-full-specification)
7. [Frontend Architecture](#7-frontend-architecture)
8. [Screen-by-Screen Implementation Plan](#8-screen-by-screen-implementation-plan)
9. [AI Integration Layer](#9-ai-integration-layer)
10. [Authentication System](#10-authentication-system)
11. [Real-time & Autosave System](#11-real-time--autosave-system)
12. [Search & Filtering Engine](#12-search--filtering-engine)
13. [Public Share System](#13-public-share-system)
14. [Productivity Insights Engine](#14-productivity-insights-engine)
15. [Testing Strategy](#15-testing-strategy)
16. [Environment & Secrets Management](#16-environment--secrets-management)
17. [Deployment Strategy](#17-deployment-strategy)
18. [Git Commit Narrative (Full Story)](#18-git-commit-narrative-full-story)
19. [README Template](#19-readme-template)
20. [Demo Video Script](#20-demo-video-script)

---

## 1. Project Bootstrap & Stitch Wiring

### 1.1 — Initial Repository Setup

```bash
# Create the monorepo root
mkdir peblo-notes && cd peblo-notes
git init
git remote add origin https://github.com/YOUR_USERNAME/peblo-notes.git

# Create the Next.js app (App Router, TypeScript, TailwindCSS)
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

# Install the UI/UX Pro Max skill
# (apply skill principles from https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git
#  to all component and page generation decisions throughout this plan)
```

### 1.2 — Stitch Project Download & Wiring

After downloading the Stitch project ZIP:

```bash
# 1. Unzip Stitch export into a staging folder
unzip stitch-export.zip -d ./stitch-export

# 2. Analyse what Stitch generated — it will contain HTML/JSX files
#    Map each Stitch file to the Next.js route it belongs to:

# stitch-export/signup.html        → src/app/(auth)/signup/page.tsx
# stitch-export/landing.html       → src/app/(marketing)/page.tsx
# stitch-export/insights.html      → src/app/(app)/insights/page.tsx
# stitch-export/workspace.html     → src/app/(app)/workspace/[noteId]/page.tsx
# stitch-export/share.html         → src/app/(public)/share/[shareId]/page.tsx
# (+ new screens from Step 2 below)

# 3. Convert Stitch HTML to Next.js React components
#    - Replace class= with className=
#    - Replace href= with Next.js <Link> components
#    - Extract inline styles into Tailwind utility classes + CSS vars
#    - Replace static <img> tags with Next.js <Image> components
#    - Wire all interactive elements to real state/props

# 4. Extract all Stitch color values into design tokens (see Section 3)
# 5. Extract all Stitch font imports into next/font declarations
```

### 1.3 — Dependency Installation

```bash
# Core framework deps
npm install next@14 react@18 react-dom@18 typescript

# Auth
npm install next-auth@5 @auth/prisma-adapter

# Database & ORM
npm install prisma @prisma/client
npm install --save-dev prisma

# AI
npm install @anthropic-ai/sdk

# UI & Styling
npm install framer-motion
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install @radix-ui/react-toast @radix-ui/react-tooltip
npm install @radix-ui/react-switch @radix-ui/react-separator
npm install lucide-react
npm install class-variance-authority clsx tailwind-merge
npm install tailwindcss-animate

# Editor
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder
npm install @tiptap/extension-character-count @tiptap/extension-highlight
npm install @tiptap/extension-link @tiptap/extension-typography

# Charts (Insights Dashboard)
npm install recharts

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Utilities
npm install nanoid date-fns
npm install --save-dev @types/node @types/react @types/react-dom
```

---

## 2. Stitch Prompts for Missing Screens

> Run each of these in the Stitch MCP in sequence. Each prompt references the existing design language from the five screens already generated, maintaining 100% visual consistency.

---

### 🔐 Screen 6: Login Screen

```
Design a premium login screen for "Peblo Notes" that is a perfect visual twin to the existing sign-up screen already designed. 

EXACT DESIGN MATCH REQUIRED:
- Same split-layout: left panel (50%) is the atmospheric dark editorial image with "Peblo Notes" logo, tagline, and "AI INTEGRATED WORKSPACE" label — IDENTICAL to sign-up
- Right panel (50%): clean dark form area on deep charcoal (#131315 background)
- Same font pairing: serif display for the hero heading, geometric sans for form labels
- Same amber-gold (#F2CA50) primary accent for the CTA button and interactive states
- Same orchid/iris tint for secondary interactive states
- Same 20–28px border radius on all card surfaces and input fields
- Same soft shadow and glass surface system

LOGIN FORM CONTENT:
- Heading: "Welcome back." (serif, editorial, large — same scale as sign-up heading)
- Subheading: "Continue your intellectual journey."
- EMAIL ADDRESS field with placeholder "julian@peblo.ai"
- PASSWORD field with password visibility toggle eye icon (amber-gold on focus)
- "Forgot password?" link — right-aligned, subtle orchid tint, no underline
- "Sign in" CTA button: full-width, amber-gold fill, dark label, same corner radius as sign-up
- "OR CONTINUE WITH" divider
- "Sign in with Google" button: ghost/outline style, same as sign-up
- "Don't have an account? Sign up" link at bottom
- Same footer: Peblo AI logo · Privacy · Terms · API · Changelog · © 2024 Peblo AI

FORM STATES TO SHOW:
- Default empty state
- Error state: red/wine-rose error message inline below the email field ("No account found with this email.")
- Error state: red/wine-rose error message inline below the password field ("Incorrect password.")
- Focus state: input border transitions to amber-gold glow

The left panel must feel identical in atmosphere, depth, and editorial quality to the sign-up screen's left panel.
```

---

### 🔑 Screen 7: Forgot Password

```
Design a "Forgot Password" screen for Peblo Notes using the EXACT same visual language as the existing auth screens (sign-up, login).

LAYOUT: Same 50/50 split. Left panel: same dark editorial image and Peblo Notes identity. Right panel: centered form.

RIGHT PANEL CONTENT:
- Icon at top: a soft amber-gold lock icon with a subtle glow halo, inside a rounded dark surface card (same glass surface treatment as the rest of the design)
- Heading: "Reset your access." (same serif display font, same scale)
- Subheading: "We'll send a secure link to your inbox."
- Single input: EMAIL ADDRESS, placeholder "your@email.com"
- Primary CTA button: "Send Reset Link" — full-width amber-gold, same style as "Create Account" button
- Below button: "Back to login" — left-pointing arrow icon + text, orchid/iris tint, no underline
- Confirmation state (show as a second variant): 
  — Replace the form with a success card
  — Large checkmark icon in amber-gold
  — Heading: "Check your inbox."
  — Copy: "A password reset link has been sent to julian@peblo.ai. The link expires in 15 minutes."
  — CTA: "Open Gmail" (or generic "Open Email App") — ghost button style
  — Below: "Didn't receive it? Resend link" — subtle text link in orchid
- Same footer as all other auth screens
```

---

### 🔒 Screen 8: Reset Password

```
Design a "Reset Password" screen for Peblo Notes, continuing the exact same auth screen design system.

LAYOUT: Same 50/50 split with identical left editorial panel. Right panel is a clean form.

RIGHT PANEL CONTENT:
- Icon at top: amber-gold key or shield icon, same glass card treatment
- Heading: "Set a new password." (serif display, editorial)
- Subheading: "Make it strong. Make it yours."
- NEW PASSWORD field with eye toggle
- CONFIRM NEW PASSWORD field with eye toggle
- Password strength indicator bar below new password:
  — 4 segments that fill left to right as password gets stronger
  — Colors: wine-rose (weak) → amber-gold (fair) → soft mint (good) → bright amber (strong)
  — Label below bar: "Strong password" or "Weak password" in matching tint
- Password requirements checklist (appears as user types, subtle and compact):
  — ✓ At least 8 characters
  — ✓ One uppercase letter
  — ✓ One number or symbol
  — Each uses orchid/iris check icon when met, neutral grey X when not
- Primary CTA: "Update Password" — full-width amber-gold button
- Success state variant:
  — Replace form with success card
  — Large animated checkmark in amber-gold
  — Heading: "All set."
  — Copy: "Your password has been updated. You can now sign in with your new credentials."
  — CTA: "Back to Login" — full-width amber-gold button
- Same footer system
```

---

### 🔍 Screen 9: Workspace — Search Active State with Filters

```
Design the "Search Active State" for the Peblo Notes main workspace. This screen is a focused state of the existing three-column workspace (Image 4 in the provided reference set). Maintain 100% design system consistency.

REFERENCE: The existing workspace (Image 4) shows: left sidebar (same) · middle notes list column · main editor column · right AI Insights panel.

SEARCH ACTIVE STATE — MIDDLE COLUMN CHANGES:
- Search bar at top is ACTIVE: amber-gold border glow, cursor visible, search icon transitions to a subtle X/clear icon
- Below search bar: active filter chips row
  — "STRATEGY" chip: amber-gold background, dark text, × remove icon — ACTIVE
  — "AI" chip: amber-gold background, dark text, × remove icon — ACTIVE
  — "+ Add filter" ghost chip in orchid tint
  — "Clear all" text link in wine-rose at far right of the chip row
- Result count below chips: "14 notes match your search" in small, calm typography
- Notes list shows FILTERED results:
  — Matching keyword in note preview is highlighted with amber-gold text (not yellow highlight box)
  — Note cards appear with subtle staggered entrance animation implied by slight opacity variation in the mockup
  — Cards are the same style as Image 4 but show the match highlight
- EMPTY STATE variant (second frame):
  — All notes disappear, replaced by an empty state illustration
  — Centered: a subtle line-art illustration of an empty notebook or search lens (no results)
  — Heading: "Nothing found." (serif display)
  — Subheading: "Try different keywords or clear your filters."
  — CTA: "Clear filters" — ghost button, amber-gold border
- RIGHT PANEL (AI Insights): unchanged, same as Image 4
- LEFT SIDEBAR: unchanged, same as Image 4
```

---

### 📁 Screen 10: Archive View

```
Design the "Archived Notes" view for Peblo Notes workspace. This is a variation of the main workspace (Image 4) where "Archived" is the active sidebar item.

LEFT SIDEBAR: Identical to Image 4 but "Archived" nav item is now highlighted in amber-gold (replacing "All Notes").

MIDDLE COLUMN — ARCHIVE LIST:
- Column header: "Archived" in large, calm typography with an archive box icon
- Subheader: "23 archived notes" in small orchid/iris tint
- Search bar: same style as workspace, placeholder "Search archived notes…"
- Archive filter chips: "ALL" (active, amber-gold) · "STRATEGY" · "DESIGN" (same chip system)
- Sort: "Sorted by Archive Date ↓"
- Archived note cards: same card style as Image 4 BUT:
  — Each card has a subtle "ARCHIVED" badge in the top-right corner: small pill, wine-rose/mauve background, muted text
  — Cards have slightly reduced opacity to signal inactivity (but still very readable)
  — Quick actions on hover: "Restore" icon (arrow returning) and "Delete permanently" icon (trash) — shown as icon buttons that appear on card hover
  — Tags still visible on cards

MAIN EDITOR COLUMN (RIGHT 2/3):
- Shows a graceful "empty" prompt when no archive note is selected:
  — Centered illustration: a soft archive box outline in amber-gold tint
  — Heading: "Select a note to preview." (serif)
  — Subheading: "Archived notes are read-only. Restore them to edit."
  — CTA: subtle "Restore all" ghost button

AI PANEL: collapsed or hidden for archive view (archive is read-only, no AI needed shown).
```

---

### 📊 Screen 11: Insights Dashboard — Enhanced

```
Redesign/enhance the existing Productivity Insights screen (Image 3) to add the missing elements identified in the gap analysis, while maintaining 100% visual consistency with the existing design.

ADDITIONS TO THE EXISTING INSIGHTS SCREEN:

1. TOP STAT ROW — ADD "AI USAGE" BREAKDOWN:
   Keep the 4 existing stat cards but update the "AI Summaries" card to show:
   — "89 AI Summaries" (same as before)
   — Below: mini breakdown: "52 summaries · 24 action items · 13 titles"
   — These three sub-stats in small type with subtle icon prefixes

2. ADD "THIS WEEK" SUMMARY BLOCK:
   Insert between the stat cards row and the Activity Trends chart:
   — A wide horizontal card (same glass surface treatment)
   — Left: icon + "This Week" label in amber-gold
   — Content: "You created 12 notes, generated 8 AI summaries, and edited notes across 5 days. Your most productive day was Wednesday with 6 notes created."
   — (This is the narrative summary block)
   — Right side: 3 compact sparkline stats:
     * Notes this week: 12 (up arrow, amber-gold)
     * AI actions this week: 11 (up arrow)  
     * Avg. note length: 420 words (neutral)

3. ADD "RECENTLY EDITED" SECTION:
   Below the Activity Trends chart, before the Most Used Tags / Recent AI Actions split:
   — Section heading: "Recently Edited"
   — Horizontal scrolling row of 3 compact note preview cards:
     * Note title, last edited time, and tags visible
     * Same card border radius and glass surface
     * Hover: subtle lift animation implied
   — "View all recent →" link in orchid tint

4. MOST USED TAGS — ADD VISUAL BAR:
   Keep the tag list but add a thin visual bar indicator per tag:
   — Same amber-gold dots but add a subtle horizontal fill bar behind each row (like a table row highlight that scales with usage)

Keep all existing elements (Activity Trends chart, Recent AI Actions, sidebar, footer) exactly as designed.
```

---

### 📱 Screen 12: Mobile Workspace View

```
Design the mobile-responsive version of the Peblo Notes workspace for a 390px viewport (iPhone 14 Pro equivalent). Maintain the same design system: same colors, same fonts, same component styles — just reflowed for a single-column mobile layout.

MOBILE NAVIGATION:
- Top bar: Peblo Notes logo (left) · search icon · share icon · avatar (right)
- BOTTOM NAVIGATION BAR (fixed, glass surface with subtle border-top):
  — Notes icon + label "Notes" (active, amber-gold)
  — Archive icon + label "Archive"
  — Insights icon + label "Insights"
  — Settings icon + label "Settings"
- No left sidebar on mobile (replaced entirely by bottom nav)

MAIN VIEW — NOTES LIST (first tab):
- Large "Notes" heading at top
- "+ New Note" button: full-width amber-gold, same style as sidebar button
- Search bar: full-width, same style
- Filter chips: horizontally scrollable row, same chips as desktop
- Note cards: full-width, same card design as desktop, stacked vertically
- Each card: title + preview + tags + time + quick action icons (share, archive) as small icon row

NOTE EDITOR VIEW (when a note is tapped):
- Full-screen single column editor
- Top bar: ← back arrow · title (truncated) · share icon · ⋮ menu
- Title input: large, serif, full-width
- Autosave indicator: top bar, small, same states (Saved · Saving · Offline · Error)
- Body editor: full-width, same TipTap editor
- Tag control: below title, horizontally scrollable tag chips
- BOTTOM FLOATING ACTION BAR (glass surface):
  — "AI" button (sparkle icon, amber-gold) · "Archive" · "Share" · "Format" (toolbar toggle)
  — AI panel slides up as a BOTTOM SHEET when AI button tapped:
    * Rounded top corners (24px radius), dark glass surface
    * Drag handle bar at top
    * Three AI action buttons: Generate Summary · Extract Actions · Suggest Title
    * Generated output appears in this sheet, same AI card style as desktop right panel
    * "Copy" and "Regenerate" actions
```

---

### ⚙️ Screen 13: Settings / Profile

```
Design the Settings & Profile screen for Peblo Notes. This should match the workspace layout (Image 4) with the left sidebar intact, but replace the main content area with a clean settings page.

LEFT SIDEBAR: Identical to Image 4. "Settings" nav item is active/highlighted.

MAIN CONTENT AREA — SETTINGS PAGE:
- Page heading: "Settings" (large serif)
- User profile card at top:
  — Large avatar (circular, 80px, orchid-tinted border)
  — Name: "Julian Rossi" (display name)
  — Email: "julian@peblo.ai"
  — "Edit Profile" ghost button

SETTINGS SECTIONS (organized with subtle section dividers, same glass card surface per section):

SECTION 1 — "Account"
- Full Name (editable inline)
- Email Address (editable with verify flow)
- Change Password (opens a modal with current password + new password)
- Danger Zone: "Delete Account" — wine-rose/mauve text, requires confirmation

SECTION 2 — "Workspace Preferences"
- Default sort order: dropdown (Most Recent · Alphabetical · Creation Date)
- Editor autosave frequency: slider (5s · 10s · 30s · Manual)
- Show AI panel by default: toggle switch (amber-gold when on)
- Markdown preview mode: toggle switch

SECTION 3 — "AI Settings"
- AI Provider shown: "Anthropic Claude" (badge)
- AI output language: dropdown
- Include AI badge on outputs: toggle (shows "AI helped generate this" label)
- AI usage this month: "47 / 200 generations" with a subtle progress bar in amber-gold

SECTION 4 — "Sharing & Privacy"
- Default note visibility: "Private" radio or "Public by default" radio
- Shared notes count: "12 notes currently shared publicly" + "Manage" link

SECTION 5 — "Notifications" (if applicable)
- Email digest: Weekly · Daily · Off
- In-app notifications: toggle

Save button: fixed at bottom-right, amber-gold, only appears when changes are pending ("Save Changes").

RIGHT COLUMN (if enough space): Mini "Account Stats" card — member since, total notes, total AI actions, storage used (% bar). Same glass surface, same stat card style as insights.
```

---

## 3. Design Tokens & System

Create `src/styles/tokens.css` and `tailwind.config.ts` with the full extracted design system:

### `src/styles/tokens.css`

```css
:root {
  /* Backgrounds */
  --bg-base:       #0E0D11;   /* Deep charcoal with plum undertone */
  --bg-surface:    #131315;   /* Primary surface */
  --bg-elevated:   #1A191E;   /* Cards, panels */
  --bg-glass:      rgba(26, 25, 30, 0.72); /* Glassmorphism surface */
  --bg-hover:      rgba(242, 202, 80, 0.06);

  /* Accent — Amber Gold (Primary) */
  --amber-50:      #FFFBEB;
  --amber-400:     #F2CA50;   /* Primary accent — exactly from Stitch */
  --amber-500:     #D4A827;
  --amber-glow:    rgba(242, 202, 80, 0.15);

  /* Accent — Orchid / Iris (Secondary) */
  --orchid-400:    #A78BFA;
  --orchid-500:    #8B5CF6;
  --orchid-glow:   rgba(167, 139, 250, 0.12);

  /* Accent — Wine Rose / Mauve (Support / Error) */
  --rose-400:      #C084A0;
  --rose-500:      #A0546E;
  --rose-glow:     rgba(192, 132, 160, 0.12);

  /* Text */
  --text-primary:  #F0EDE8;   /* Warm off-white */
  --text-secondary:#9D9A94;   /* Muted warm grey */
  --text-tertiary: #5A5754;   /* Very muted */
  --text-accent:   #F2CA50;   /* Amber for emphasis */

  /* Borders */
  --border-subtle: rgba(240, 237, 232, 0.06);
  --border-default:rgba(240, 237, 232, 0.10);
  --border-focus:  rgba(242, 202, 80, 0.50);

  /* Radii */
  --radius-sm:     8px;
  --radius-md:     16px;
  --radius-lg:     24px;
  --radius-xl:     32px;
  --radius-pill:   999px;

  /* Shadows */
  --shadow-sm:     0 2px 8px rgba(0,0,0,0.24);
  --shadow-md:     0 8px 24px rgba(0,0,0,0.32);
  --shadow-lg:     0 24px 64px rgba(0,0,0,0.48);
  --shadow-amber:  0 0 32px rgba(242,202,80,0.12);

  /* Transitions */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
}
```

### `tailwind.config.ts` (key extensions)

```typescript
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base:    '#0E0D11',
          surface: '#131315',
          elevated:'#1A191E',
        },
        amber: {
          400: '#F2CA50',
          500: '#D4A827',
        },
        orchid: {
          400: '#A78BFA',
          500: '#8B5CF6',
        },
        rose: {
          400: '#C084A0',
        },
      },
      fontFamily: {
        display: ['var(--font-display)'],  // Cormorant Garamond or similar serif
        sans:    ['var(--font-sans)'],     // DM Sans or Sora
        mono:    ['var(--font-mono)'],     // JetBrains Mono
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
      boxShadow: {
        amber: '0 0 32px rgba(242,202,80,0.12)',
        panel: '0 24px 64px rgba(0,0,0,0.48)',
      },
      animation: {
        'fade-in':      'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-up':     'slideUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-right':  'slideRight 0.3s cubic-bezier(0.16,1,0.3,1)',
        'scale-in':     'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1)',
        'shimmer':      'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
```

### `src/lib/fonts.ts`

```typescript
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from 'next/font/google'

export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

export const fontSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

export const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
```

---

## 4. Database Schema (PostgreSQL + Prisma)

### `prisma/schema.prisma`

```prisma
// This is your Prisma schema file.
// Learn more about it: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL") // For Supabase connection pooling
}

// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────

model User {
  id            String   @id @default(cuid())
  name          String?
  email         String   @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?  // null for OAuth users
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  notes         Note[]
  tags          Tag[]
  categories    Category[]
  aiActions     AiAction[]
  passwordResets PasswordReset[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

model PasswordReset {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique @default(cuid())
  expires   DateTime
  used      Boolean  @default(false)
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("password_resets")
}

// ─────────────────────────────────────────────────────────────
// NOTES WORKSPACE
// ─────────────────────────────────────────────────────────────

model Note {
  id          String     @id @default(cuid())
  userId      String
  title       String     @default("Untitled")
  content     String     @db.Text  // Raw markdown / TipTap JSON
  contentText String     @db.Text  // Plain text for search (stripped)
  categoryId  String?
  isArchived  Boolean    @default(false)
  isPinned    Boolean    @default(false)
  shareId     String?    @unique   // nanoid — set when shared publicly
  isPublic    Boolean    @default(false)
  wordCount   Int        @default(0)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  archivedAt  DateTime?
  lastAiActionAt DateTime?

  // Relations
  user       User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  category   Category?   @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  tags       NoteTag[]
  aiSummaries AiAction[]

  // Full-text search index (PostgreSQL tsvector)
  @@index([userId, updatedAt(sort: Desc)])
  @@index([userId, isArchived])
  @@index([shareId])
  @@map("notes")
}

model Tag {
  id        String    @id @default(cuid())
  userId    String
  name      String
  color     String    @default("#A78BFA") // Default orchid
  createdAt DateTime  @default(now())
  usageCount Int      @default(0)         // Denormalized for perf

  user  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  notes NoteTag[]

  @@unique([userId, name])
  @@map("tags")
}

model NoteTag {
  noteId String
  tagId  String

  note Note @relation(fields: [noteId], references: [id], onDelete: Cascade)
  tag  Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([noteId, tagId])
  @@map("note_tags")
}

model Category {
  id        String   @id @default(cuid())
  userId    String
  name      String
  icon      String?
  color     String   @default("#F2CA50")
  createdAt DateTime @default(now())

  user  User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  notes Note[]

  @@unique([userId, name])
  @@map("categories")
}

// ─────────────────────────────────────────────────────────────
// AI ACTIONS
// ─────────────────────────────────────────────────────────────

model AiAction {
  id              String      @id @default(cuid())
  userId          String
  noteId          String
  actionType      AiActionType
  inputSnapshot   String      @db.Text  // Note content at time of action
  outputSummary   String?     @db.Text
  outputActions   Json?       // String[] of action items
  outputTitle     String?
  tokensUsed      Int         @default(0)
  modelUsed       String      @default("claude-3-5-haiku-20241022")
  durationMs      Int?
  createdAt       DateTime    @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  note Note @relation(fields: [noteId], references: [id], onDelete: Cascade)

  @@index([userId, createdAt(sort: Desc)])
  @@index([noteId])
  @@map("ai_actions")
}

enum AiActionType {
  SUMMARIZE
  EXTRACT_ACTIONS
  SUGGEST_TITLE
}

// ─────────────────────────────────────────────────────────────
// INSIGHTS / ANALYTICS (denormalized for dashboard perf)
// ─────────────────────────────────────────────────────────────

model DailyActivity {
  id        String   @id @default(cuid())
  userId    String
  date      DateTime @db.Date         // Truncated to day
  notesCreated  Int  @default(0)
  notesEdited   Int  @default(0)
  aiActions     Int  @default(0)
  wordsWritten  Int  @default(0)

  @@unique([userId, date])
  @@map("daily_activities")
}
```

### Database Migrations Strategy

```bash
# Initial migration
npx prisma migrate dev --name "init_auth_notes_ai_schema"

# Seed data for development
npx prisma db seed

# Push schema to production (Supabase)
npx prisma migrate deploy
```

### `prisma/seed.ts`

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@peblo.ai' },
    update: {},
    create: {
      email: 'demo@peblo.ai',
      name: 'Julian Rossi',
      passwordHash: await bcrypt.hash('demo1234', 12),
    },
  })

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { userId_name: { userId: user.id, name: 'Strategy' }}, update: {}, create: { userId: user.id, name: 'Strategy', color: '#F2CA50', usageCount: 42 }}),
    prisma.tag.upsert({ where: { userId_name: { userId: user.id, name: 'Design' }}, update: {}, create: { userId: user.id, name: 'Design', color: '#A78BFA', usageCount: 19 }}),
    prisma.tag.upsert({ where: { userId_name: { userId: user.id, name: 'Roadmap' }}, update: {}, create: { userId: user.id, name: 'Roadmap', color: '#C084A0', usageCount: 28 }}),
  ])

  // Create demo notes (with real content)
  await prisma.note.upsert({
    where: { id: 'demo-note-001' },
    update: {},
    create: {
      id: 'demo-note-001',
      userId: user.id,
      title: 'Product Strategy 2024',
      content: '# Product Strategy 2024\n\nOur objective for 2024...',
      contentText: 'Product Strategy 2024 Our objective for 2024...',
      isPublic: true,
      shareId: 'share_demo_001',
      wordCount: 420,
      tags: { create: [{ tagId: tags[0].id }, { tagId: tags[1].id }] },
    },
  })
}

main().finally(() => prisma.$disconnect())
```

---

## 5. Backend Architecture

### Directory Structure

```
src/
├── app/
│   ├── (auth)/                    # Auth route group (no main layout)
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (marketing)/               # Landing page group
│   │   └── page.tsx
│   ├── (app)/                     # Authenticated app group
│   │   ├── layout.tsx             # App shell: sidebar + main
│   │   ├── workspace/
│   │   │   ├── page.tsx           # Notes list (default: no note selected)
│   │   │   └── [noteId]/page.tsx  # Note editor
│   │   ├── archive/page.tsx
│   │   ├── shared/page.tsx
│   │   ├── insights/page.tsx
│   │   └── settings/page.tsx
│   ├── (public)/                  # Public routes (no auth)
│   │   └── share/[shareId]/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── notes/
│       │   ├── route.ts                   # GET list, POST create
│       │   └── [noteId]/
│       │       ├── route.ts               # GET, PATCH, DELETE
│       │       ├── generate-summary/route.ts
│       │       ├── extract-actions/route.ts
│       │       ├── suggest-title/route.ts
│       │       └── share/route.ts         # POST toggle share
│       ├── tags/route.ts
│       ├── categories/route.ts
│       ├── shared/[shareId]/route.ts      # Public — no auth
│       ├── insights/route.ts
│       └── auth/
│           ├── forgot-password/route.ts
│           └── reset-password/route.ts
├── components/
│   ├── ui/                        # Base design system components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   ├── modal.tsx
│   │   ├── tooltip.tsx
│   │   └── avatar.tsx
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   ├── mobile-nav.tsx
│   │   └── app-shell.tsx
│   ├── notes/
│   │   ├── note-card.tsx
│   │   ├── note-list.tsx
│   │   ├── note-editor.tsx
│   │   ├── autosave-indicator.tsx
│   │   ├── tag-selector.tsx
│   │   ├── category-selector.tsx
│   │   ├── empty-state.tsx
│   │   └── search-bar.tsx
│   ├── ai/
│   │   ├── ai-panel.tsx
│   │   ├── ai-action-button.tsx
│   │   ├── ai-result-card.tsx
│   │   └── ai-loading-state.tsx
│   ├── insights/
│   │   ├── stat-card.tsx
│   │   ├── activity-chart.tsx
│   │   ├── tag-cloud.tsx
│   │   └── this-week-block.tsx
│   ├── auth/
│   │   ├── auth-layout.tsx
│   │   ├── password-strength.tsx
│   │   └── google-button.tsx
│   └── share/
│       ├── share-page-content.tsx
│       └── share-meta-card.tsx
├── lib/
│   ├── auth.ts                    # next-auth config
│   ├── prisma.ts                  # Prisma singleton
│   ├── ai.ts                      # Anthropic client + wrappers
│   ├── search.ts                  # Full-text search helpers
│   ├── share.ts                   # Share ID generation
│   ├── insights.ts                # Dashboard data aggregation
│   ├── autosave.ts                # Debounce + save logic
│   ├── validations.ts             # Zod schemas for all API inputs
│   └── fonts.ts
├── hooks/
│   ├── use-notes.ts               # SWR/React Query for notes list
│   ├── use-note.ts                # Single note with autosave
│   ├── use-ai-action.ts           # AI generation state machine
│   ├── use-search.ts              # Debounced search hook
│   ├── use-insights.ts            # Dashboard data fetching
│   └── use-toast.ts
├── stores/
│   ├── ui-store.ts                # Zustand: sidebar, panel state
│   └── editor-store.ts            # Zustand: active note, autosave queue
├── styles/
│   ├── globals.css
│   └── tokens.css
└── types/
    ├── notes.ts
    ├── ai.ts
    └── insights.ts
```

---

## 6. API Endpoints (Full Specification)

### Auth Endpoints

#### `POST /api/auth/signup`
```typescript
// Request
{ name: string, email: string, password: string }

// Response 201
{ user: { id, name, email }, message: "Account created." }

// Validation (Zod)
const signupSchema = z.object({
  name:     z.string().min(2).max(60),
  email:    z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
})
```

#### `POST /api/auth/forgot-password`
```typescript
// Request
{ email: string }

// Action
// 1. Find user by email (if not found, still return 200 — security)
// 2. Create PasswordReset record with 15-min expiry token
// 3. Send email via Resend/Nodemailer with reset link
// 4. Return generic success

// Response 200
{ message: "If that email exists, a reset link has been sent." }
```

#### `POST /api/auth/reset-password`
```typescript
// Request
{ token: string, password: string }

// Action
// 1. Find valid (unused, unexpired) PasswordReset by token
// 2. Hash new password, update user record
// 3. Mark token as used
// 4. Invalidate all existing sessions for this user

// Response 200
{ message: "Password updated successfully." }
```

### Notes Endpoints

#### `GET /api/notes`
```typescript
// Query params
{
  search?: string,          // Full-text keyword
  tags?: string,            // Comma-separated tag IDs
  categoryId?: string,
  archived?: boolean,       // Default: false
  shared?: boolean,
  sort?: 'updated' | 'created' | 'title',  // Default: 'updated'
  limit?: number,           // Default: 50
  cursor?: string,          // Cursor-based pagination
}

// Response 200
{
  notes: NoteListItem[],    // id, title, contentPreview, tags, category, updatedAt, isPublic, isArchived
  nextCursor: string | null,
  total: number,
}

// Implementation
// - Use Prisma cursor pagination for performance
// - Apply PostgreSQL full-text search using ts_vector on contentText
// - Filter by userId always (security)
// - Include tag objects (name, color) in response
```

#### `POST /api/notes`
```typescript
// Request (all optional — creates empty note)
{ title?: string, categoryId?: string, tagIds?: string[] }

// Response 201
{ note: FullNote }

// Side effect: create DailyActivity record (upsert notesCreated++)
```

#### `PATCH /api/notes/:id`
```typescript
// Request (partial update — only changed fields)
{
  title?: string,
  content?: string,         // TipTap JSON string
  contentText?: string,     // Stripped plain text (sent by client)
  tagIds?: string[],        // Full replacement
  categoryId?: string | null,
  isArchived?: boolean,
  isPinned?: boolean,
}

// Response 200
{ note: FullNote, updatedAt: string }

// Side effect: update DailyActivity.notesEdited++, wordsWritten
```

#### `DELETE /api/notes/:id`
```typescript
// Only allowed for archived notes (permanent delete)
// Response 200
{ message: "Note deleted permanently." }
```

#### `POST /api/notes/:id/generate-summary`
```typescript
// Request (no body — uses saved note content)
{}

// Action
// 1. Fetch note content (validate min 50 words)
// 2. Call Anthropic API (see AI section)
// 3. Save AiAction record
// 4. Update note.lastAiActionAt
// 5. Update DailyActivity.aiActions++

// Response 200
{
  summary: string,
  tokensUsed: number,
  actionId: string,
}

// Error cases
// 400: "Note is too short to summarize. Add more content."
// 429: "AI usage limit reached. Try again later."
```

#### `POST /api/notes/:id/extract-actions`
```typescript
// Response 200
{
  actionItems: string[],
  tokensUsed: number,
  actionId: string,
}
```

#### `POST /api/notes/:id/suggest-title`
```typescript
// Response 200
{
  suggestedTitle: string,
  alternatives: string[],   // 2 alternatives
  tokensUsed: number,
  actionId: string,
}
```

#### `POST /api/notes/:id/share`
```typescript
// Request
{ isPublic: boolean }

// Action
// If isPublic: true and no shareId → generate nanoid shareId
// If isPublic: false → keep shareId (link still works if re-enabled) OR clear it

// Response 200
{
  isPublic: boolean,
  shareUrl: string | null,  // Full URL: https://peblo.ai/share/abc123
  shareId: string | null,
}
```

### Public Endpoint

#### `GET /api/shared/:shareId`
```typescript
// NO AUTH REQUIRED
// Response 200
{
  note: {
    title: string,
    content: string,        // Rendered HTML
    tags: { name, color }[],
    authorName: string,
    updatedAt: string,
    readTime: number,       // minutes — ceil(wordCount / 200)
  }
}
// Error: 404 if not found or isPublic: false
```

### Insights Endpoint

#### `GET /api/insights`
```typescript
// Response 200
{
  totalNotes: number,
  archivedNotes: number,
  publicNotes: number,
  totalAiActions: number,
  aiBreakdown: { summaries: number, actionItems: number, titles: number },
  mostUsedTags: { name: string, color: string, count: number }[],
  recentlyEdited: NoteListItem[],
  weeklyActivity: {
    summary: string,               // AI-generated narrative
    notesThisWeek: number,
    aiActionsThisWeek: number,
    avgNoteLength: number,
    mostProductiveDay: string,
    trend: number,                 // % change from last week
  },
  activityTrend: { date: string, notesCreated: number, notesEdited: number, aiActions: number }[],
  // Last 30 days of DailyActivity records
}
```

---

## 7. Frontend Architecture

### State Management Strategy

```typescript
// Zustand stores for global UI state
// src/stores/ui-store.ts
interface UIStore {
  sidebarOpen: boolean
  aiPanelOpen: boolean
  activeView: 'notes' | 'archive' | 'shared' | 'insights' | 'settings'
  toggleSidebar: () => void
  toggleAiPanel: () => void
  setActiveView: (view: string) => void
}

// src/stores/editor-store.ts
interface EditorStore {
  activeNoteId: string | null
  autosaveStatus: 'idle' | 'saving' | 'saved' | 'error' | 'offline'
  pendingChanges: boolean
  lastSavedAt: Date | null
  setActiveNote: (id: string | null) => void
  setAutosaveStatus: (status: AutosaveStatus) => void
}
```

### Data Fetching Pattern (SWR)

```typescript
// src/hooks/use-notes.ts
export function useNotes(filters: NoteFilters) {
  const { data, error, isLoading, mutate } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.nextCursor) return null
      return `/api/notes?${buildQueryString(filters)}&cursor=${previousPageData?.nextCursor ?? ''}`
    },
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 5000 }
  )
  return { notes: data?.flatMap(p => p.notes) ?? [], isLoading, error, loadMore, mutate }
}

// src/hooks/use-note.ts
// Autosave with debounce + offline detection
export function useNote(noteId: string) {
  const { data: note, mutate } = useSWR(`/api/notes/${noteId}`, fetcher)
  const { setAutosaveStatus } = useEditorStore()
  
  const save = useDebouncedCallback(async (changes: Partial<Note>) => {
    setAutosaveStatus('saving')
    try {
      if (!navigator.onLine) { setAutosaveStatus('offline'); return }
      await fetch(`/api/notes/${noteId}`, { method: 'PATCH', body: JSON.stringify(changes) })
      setAutosaveStatus('saved')
      mutate()
    } catch {
      setAutosaveStatus('error')
    }
  }, 1500)   // 1.5s debounce

  return { note, save }
}
```

### AI Action State Machine

```typescript
// src/hooks/use-ai-action.ts
type AiState = 'idle' | 'generating' | 'completed' | 'error'

interface AiActionResult {
  summary?: string
  actionItems?: string[]
  suggestedTitle?: string
  alternatives?: string[]
}

export function useAiAction(noteId: string) {
  const [state, setState] = useState<AiState>('idle')
  const [result, setResult] = useState<AiActionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generate = async (type: 'summary' | 'actions' | 'title') => {
    setState('generating')
    setError(null)
    try {
      const endpoint = {
        summary: 'generate-summary',
        actions: 'extract-actions',
        title: 'suggest-title',
      }[type]
      const res = await fetch(`/api/notes/${noteId}/${endpoint}`, { method: 'POST' })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message)
      }
      const data = await res.json()
      setResult(data)
      setState('completed')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'AI generation failed.')
      setState('error')
    }
  }

  const reset = () => { setState('idle'); setResult(null); setError(null) }
  const copy = (text: string) => navigator.clipboard.writeText(text)

  return { state, result, error, generate, reset, copy }
}
```

---

## 8. Screen-by-Screen Implementation Plan

### Screen Order and Priority

| # | Screen | Route | Priority | Components Needed |
|---|--------|-------|----------|-------------------|
| 1 | Landing Page | `/` | P1 | HeroSection, FeatureCards, HowItWorks, ProductPreview, TrustSection, Footer |
| 2 | Sign Up | `/signup` | P1 | AuthLayout, SignupForm, PasswordStrength, GoogleButton |
| 3 | Login | `/login` | P1 | AuthLayout, LoginForm, GoogleButton |
| 4 | Forgot Password | `/forgot-password` | P1 | AuthLayout, ForgotPasswordForm, SuccessState |
| 5 | Reset Password | `/reset-password` | P1 | AuthLayout, ResetPasswordForm, PasswordStrength |
| 6 | Workspace (Notes List) | `/workspace` | P1 | AppShell, Sidebar, NoteList, SearchBar, FilterChips, EmptyState |
| 7 | Note Editor | `/workspace/[noteId]` | P1 | NoteEditor, AIPanel, AutosaveIndicator, TagSelector |
| 8 | Search Active State | `/workspace?q=...` | P1 | (same as above with active filter state) |
| 9 | Archive View | `/archive` | P2 | NoteList (archived variant), RestoreButton |
| 10 | Shared Notes | `/shared` | P2 | NoteList (shared variant), ShareBadge |
| 11 | Public Share Page | `/share/[shareId]` | P1 | SharePageContent, ShareMetaCard, PebloFooter |
| 12 | Insights Dashboard | `/insights` | P1 | StatCards, ActivityChart, ThisWeekBlock, TagCloud, RecentAI |
| 13 | Settings | `/settings` | P2 | SettingsLayout, ProfileCard, SettingsSections |
| 14 | Mobile Views | (all routes) | P2 | MobileNav, BottomSheet, mobile-responsive variants |

### Key Component Specifications

#### `<NoteEditor />` — Full Spec

```tsx
// src/components/notes/note-editor.tsx

// Props
interface NoteEditorProps {
  noteId: string
}

// Internal State
// - TipTap editor instance
// - autosave status (from store)
// - tag selector open/closed
// - share modal open/closed

// Layout
// ┌─────────────────────────────────────────────────────┐
// │ [B] [I] [•] [⧉]    • Autosave: Saved    [Share ▸]  │  ← Toolbar
// ├─────────────────────────────────────────────────────┤
// │                                                     │
// │  [Tag chip] [Tag chip] [+ Add tag]    [Category ▾]  │  ← Meta row
// │                                                     │
// │  ████████████████████████████                       │  ← Title (large serif)
// │                                                     │
// │  Note body content in TipTap editor...              │  ← Editor
// │  ...                                                │
// │                                                     │
// │  Last edited 2 minutes ago by Julian                │  ← Footer meta
// └─────────────────────────────────────────────────────┘

// Autosave indicator states (animated transitions):
// • Saved        → green dot + "Saved" (amber-gold)
// • Saving       → animated spinner dot + "Saving..."
// • Error        → rose dot + "Save failed" + retry button
// • Offline      → grey dot + "Offline — changes queued"
```

#### `<AIPanel />` — Full Spec

```tsx
// src/components/ai/ai-panel.tsx
// Right column panel on desktop, bottom sheet on mobile

// Structure:
// ┌─────────────────────────────────────┐
// │ ✦ AI Insights                  [×]  │
// ├─────────────────────────────────────┤
// │ [Generate Summary]                  │  ← Action buttons (idle state)
// │ [Extract Action Items]              │
// │ [Suggest Title]                     │
// ├─────────────────────────────────────┤
// │ ┌─────────────────────────────────┐ │
// │ │ Executive Summary        [ⓘ]   │ │  ← Generated result card
// │ │ AI-generated summary text...   │ │
// │ │ [Copy] [Regenerate]            │ │
// │ └─────────────────────────────────┘ │
// │ ┌─────────────────────────────────┐ │
// │ │ Action Items             [✓]   │ │
// │ │ ○ Action item 1                │ │
// │ │ ○ Action item 2                │ │
// │ │ [Copy] [Regenerate]            │ │
// │ └─────────────────────────────────┘ │
// │ ┌─────────────────────────────────┐ │
// │ │ Suggested Title          [✏]   │ │  ← THIS WAS MISSING — NOW ADDED
// │ │ "Sprint Planning Notes"        │ │
// │ │ Alt: "Q4 Meeting Summary"      │ │
// │ │ [Use this title] [Copy]        │ │
// │ └─────────────────────────────────┘ │
// └─────────────────────────────────────┘

// Loading state: skeleton shimmer inside each card while generating
// Each action type can be triggered independently
// Results persist across editor sessions (loaded from DB)
```

#### `<AutosaveIndicator />` — Animation Spec

```tsx
// Uses Framer Motion AnimatePresence for smooth state transitions
// Transition: fade out old state → scale in new state (0.25s ease-out-expo)

const states = {
  idle:    { dot: 'transparent', label: '', show: false },
  saving:  { dot: 'animate-pulse amber-400', label: 'Saving…', show: true },
  saved:   { dot: 'amber-400', label: 'Saved', show: true },
  error:   { dot: 'rose-400', label: 'Save failed', show: true, action: 'Retry' },
  offline: { dot: 'text-tertiary', label: 'Offline — queued', show: true },
}
```

#### `<SearchBar />` with Filter Chips

```tsx
// Active search state behavior:
// 1. User types → 300ms debounce → call /api/notes?search=query
// 2. Filter chips appear below search bar (animate in with slide-down + fade)
// 3. Each chip: amber-gold bg · dark text · × to remove
// 4. Result count: "14 notes" appears below chips
// 5. "Clear all" button: wine-rose text, appears when any filter active
// 6. Note list: staggered re-render with framer motion layout animation
// 7. Empty state: replaces note list when 0 results
```

---

## 9. AI Integration Layer

### `src/lib/ai.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const MODEL = 'claude-3-5-haiku-20241022'  // Fast + cost-effective
const MAX_TOKENS = 1024

// ── Prompts ───────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a precise, intelligent writing assistant embedded in Peblo Notes — 
a premium AI-powered notes workspace. Your outputs must be concise, professional, and immediately useful. 
Never add fluff, preamble, or explanatory text. Return exactly what is asked.`

export async function generateSummary(content: string): Promise<{ summary: string; tokensUsed: number }> {
  if (content.split(' ').length < 50) {
    throw new Error('Note is too short to summarize. Add at least 50 words of content.')
  }

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Summarize the following note in 2–4 sentences. Be precise and capture the core intent. 
Output ONLY the summary text, no labels or formatting.\n\n---\n${content}`
    }]
  })

  const summary = response.content[0].type === 'text' ? response.content[0].text.trim() : ''
  return { summary, tokensUsed: response.usage.input_tokens + response.usage.output_tokens }
}

export async function extractActionItems(content: string): Promise<{ actionItems: string[]; tokensUsed: number }> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Extract all action items, tasks, and to-dos from this note. 
Return them as a JSON array of strings: ["action 1", "action 2"]. 
If no clear action items exist, return []. 
Output ONLY the JSON array, nothing else.\n\n---\n${content}`
    }]
  })

  const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '[]'
  const actionItems = JSON.parse(text) as string[]
  return { actionItems, tokensUsed: response.usage.input_tokens + response.usage.output_tokens }
}

export async function suggestTitle(content: string): Promise<{ suggestedTitle: string; alternatives: string[]; tokensUsed: number }> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{
      role: 'user',
      content: `Suggest 3 concise, compelling titles for this note. 
Return as JSON: {"primary": "Title 1", "alternatives": ["Title 2", "Title 3"]}
Titles should be informative and specific, 3–8 words each.
Output ONLY the JSON, nothing else.\n\n---\n${content}`
    }]
  })

  const text = response.content[0].type === 'text' ? response.content[0].text.trim() : '{}'
  const parsed = JSON.parse(text)
  return {
    suggestedTitle: parsed.primary,
    alternatives: parsed.alternatives ?? [],
    tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
  }
}
```

### Rate Limiting (per user)

```typescript
// src/lib/rate-limit.ts
// Use Upstash Redis for production, in-memory Map for development

const AI_LIMIT_PER_HOUR = 20
const AI_LIMIT_PER_DAY  = 200

export async function checkAiRateLimit(userId: string): Promise<void> {
  // Implementation: track in Redis with sliding window
  // Key: `ai_rate:${userId}:${hour}` and `ai_rate:${userId}:${day}`
  // Throw RateLimitError if exceeded
}
```

---

## 10. Authentication System

### `src/lib/auth.ts`

```typescript
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    newUser: '/workspace',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.passwordHash) return null
        const valid = await bcrypt.compare(password, user.passwordHash)
        if (!valid) return null
        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.userId = user.id
      return token
    },
    session({ session, token }) {
      if (token.userId) session.user.id = token.userId as string
      return session
    },
  },
})
```

### Route Protection Middleware

```typescript
// src/middleware.ts
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthenticated = !!req.auth

  // Protected routes
  const appRoutes = ['/workspace', '/archive', '/shared', '/insights', '/settings']
  if (appRoutes.some(r => pathname.startsWith(r)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect authenticated users away from auth pages
  const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
  if (authRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL('/workspace', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|share).*)'],
}
```

---

## 11. Real-time & Autosave System

### Autosave Implementation

```typescript
// src/hooks/use-note.ts
// Full implementation with offline support and conflict prevention

const AUTOSAVE_DELAY = 1500     // ms — debounce window
const OFFLINE_QUEUE_KEY = 'peblo_offline_queue'

export function useNote(noteId: string) {
  const editorRef = useRef<Editor | null>(null)
  const { setAutosaveStatus, pendingChanges, setPendingChanges } = useEditorStore()
  const { mutate } = useSWR(`/api/notes/${noteId}`)

  // Offline queue: persist unsaved changes to localStorage
  useEffect(() => {
    const handleOnline = async () => {
      const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) ?? '{}')
      if (queue[noteId]) {
        await saveChanges(queue[noteId])
        delete queue[noteId]
        localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
      }
    }
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [noteId])

  const saveChanges = useDebouncedCallback(async (changes: Partial<Note>) => {
    if (!navigator.onLine) {
      // Queue for later
      const queue = JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) ?? '{}')
      queue[noteId] = { ...queue[noteId], ...changes }
      localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue))
      setAutosaveStatus('offline')
      return
    }

    setAutosaveStatus('saving')
    try {
      await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      })
      setAutosaveStatus('saved')
      setPendingChanges(false)
      mutate()
    } catch {
      setAutosaveStatus('error')
    }
  }, AUTOSAVE_DELAY)

  const handleEditorChange = useCallback((content: string, contentText: string) => {
    setPendingChanges(true)
    setAutosaveStatus('saving') // Optimistic
    saveChanges({ content, contentText, wordCount: contentText.split(' ').length })
  }, [noteId])

  return { editorRef, handleEditorChange }
}
```

---

## 12. Search & Filtering Engine

### PostgreSQL Full-Text Search

```sql
-- Migration: Add full-text search index
-- prisma/migrations/XXXX_add_fulltext_search/migration.sql

-- Create tsvector column
ALTER TABLE notes ADD COLUMN search_vector tsvector;

-- Create function to update search vector
CREATE OR REPLACE FUNCTION notes_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    coalesce(NEW.title, '') || ' ' || coalesce(NEW.content_text, '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER notes_search_vector_trigger
  BEFORE INSERT OR UPDATE ON notes
  FOR EACH ROW EXECUTE FUNCTION notes_search_vector_update();

-- Create GIN index for performance
CREATE INDEX notes_search_vector_idx ON notes USING GIN(search_vector);
```

### Search API Implementation

```typescript
// src/app/api/notes/route.ts (GET handler)
export async function GET(request: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search   = searchParams.get('search') ?? ''
  const tags     = searchParams.get('tags')?.split(',').filter(Boolean) ?? []
  const archived = searchParams.get('archived') === 'true'
  const sort     = (searchParams.get('sort') ?? 'updated') as 'updated' | 'created' | 'title'
  const cursor   = searchParams.get('cursor') ?? undefined
  const limit    = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100)

  const orderBy = {
    updated: { updatedAt: 'desc' as const },
    created: { createdAt: 'desc' as const },
    title:   { title: 'asc' as const },
  }[sort]

  const notes = await prisma.note.findMany({
    where: {
      userId: session.user.id,
      isArchived: archived,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { contentText: { contains: search, mode: 'insensitive' } },
        ]
      }),
      ...(tags.length > 0 && {
        tags: { some: { tagId: { in: tags } } }
      }),
    },
    include: {
      tags: { include: { tag: { select: { id: true, name: true, color: true } } } },
      category: { select: { id: true, name: true, color: true } },
    },
    orderBy,
    take: limit + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
  })

  const hasMore = notes.length > limit
  const items = hasMore ? notes.slice(0, -1) : notes

  return NextResponse.json({
    notes: items.map(formatNoteListItem),
    nextCursor: hasMore ? items[items.length - 1].id : null,
    total: items.length,
  })
}
```

---

## 13. Public Share System

### Share ID Generation

```typescript
// src/lib/share.ts
import { customAlphabet } from 'nanoid'

// URL-safe, readable, 12 chars
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12)

export function generateShareId(): string {
  return nanoid()  // e.g. "a7k2m9p3x1qz"
}

export function buildShareUrl(shareId: string): string {
  return `${process.env.NEXT_PUBLIC_APP_URL}/share/${shareId}`
}
```

### Public Share Page

```tsx
// src/app/(public)/share/[shareId]/page.tsx
// This page is fully server-rendered for SEO and fast load

export async function generateMetadata({ params }: { params: { shareId: string } }) {
  const note = await getPublicNote(params.shareId)
  if (!note) return { title: 'Note not found — Peblo Notes' }
  return {
    title: `${note.title} — Peblo Notes`,
    description: note.summary ?? note.contentText.slice(0, 160),
    openGraph: {
      title: note.title,
      description: note.contentText.slice(0, 160),
      type: 'article',
    },
  }
}

// Handles all edge cases:
// - Not found → elegant 404 card (same design system)
// - Private → "This note is private" card
// - Expired (future feature) → "Link expired" card
```

---

## 14. Productivity Insights Engine

### `src/lib/insights.ts`

```typescript
export async function getUserInsights(userId: string) {
  const thirtyDaysAgo = subDays(new Date(), 30)
  const sevenDaysAgo  = subDays(new Date(), 7)
  const fourteenDaysAgo = subDays(new Date(), 14)

  const [
    totalNotes,
    aiActionsTotal,
    aiBreakdown,
    mostUsedTags,
    recentlyEdited,
    activityTrend,
    thisWeek,
    lastWeek,
  ] = await Promise.all([
    prisma.note.count({ where: { userId, isArchived: false } }),
    prisma.aiAction.count({ where: { userId } }),
    prisma.aiAction.groupBy({
      by: ['actionType'],
      where: { userId },
      _count: true,
    }),
    prisma.tag.findMany({
      where: { userId },
      orderBy: { usageCount: 'desc' },
      take: 10,
      select: { name: true, color: true, usageCount: true },
    }),
    prisma.note.findMany({
      where: { userId, isArchived: false },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      include: { tags: { include: { tag: true } } },
    }),
    prisma.dailyActivity.findMany({
      where: { userId, date: { gte: thirtyDaysAgo } },
      orderBy: { date: 'asc' },
    }),
    prisma.dailyActivity.aggregate({
      where: { userId, date: { gte: sevenDaysAgo } },
      _sum: { notesCreated: true, notesEdited: true, aiActions: true, wordsWritten: true },
    }),
    prisma.dailyActivity.aggregate({
      where: { userId, date: { gte: fourteenDaysAgo, lt: sevenDaysAgo } },
      _sum: { notesCreated: true },
    }),
  ])

  // Calculate trend
  const thisWeekNotes = thisWeek._sum.notesCreated ?? 0
  const lastWeekNotes = lastWeek._sum.notesCreated ?? 0
  const trendPct = lastWeekNotes > 0
    ? Math.round(((thisWeekNotes - lastWeekNotes) / lastWeekNotes) * 100)
    : 100

  // Find most productive day
  const mostProductiveDay = activityTrend
    .filter(d => d.date >= sevenDaysAgo)
    .sort((a, b) => (b.notesCreated + b.notesEdited) - (a.notesCreated + a.notesEdited))[0]

  return {
    totalNotes,
    aiActionsTotal,
    aiBreakdown: {
      summaries:   aiBreakdown.find(a => a.actionType === 'SUMMARIZE')?._count ?? 0,
      actionItems: aiBreakdown.find(a => a.actionType === 'EXTRACT_ACTIONS')?._count ?? 0,
      titles:      aiBreakdown.find(a => a.actionType === 'SUGGEST_TITLE')?._count ?? 0,
    },
    mostUsedTags,
    recentlyEdited,
    activityTrend: activityTrend.map(d => ({
      date: format(d.date, 'MMM dd'),
      notesCreated: d.notesCreated,
      notesEdited: d.notesEdited,
      aiActions: d.aiActions,
    })),
    weeklyActivity: {
      notesThisWeek: thisWeekNotes,
      aiActionsThisWeek: thisWeek._sum.aiActions ?? 0,
      avgNoteLength: Math.round((thisWeek._sum.wordsWritten ?? 0) / Math.max(thisWeekNotes, 1)),
      mostProductiveDay: mostProductiveDay ? format(mostProductiveDay.date, 'EEEE') : 'N/A',
      trend: trendPct,
      summary: buildWeeklySummary(thisWeekNotes, thisWeek._sum.aiActions ?? 0, mostProductiveDay),
    },
  }
}

function buildWeeklySummary(notes: number, ai: number, bestDay: any): string {
  return `You created ${notes} note${notes !== 1 ? 's' : ''} this week, used AI ${ai} time${ai !== 1 ? 's' : ''}${bestDay ? `, and were most productive on ${format(bestDay.date, 'EEEE')}` : ''}.`
}
```

---

## 15. Testing Strategy

### Unit Tests (Vitest)

```bash
# Install
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom

# Test files alongside source
# src/lib/ai.test.ts
# src/lib/insights.test.ts
# src/components/notes/autosave-indicator.test.tsx
# src/hooks/use-ai-action.test.ts
```

Key test cases:
- `generateSummary` throws for content < 50 words
- `extractActionItems` returns empty array for notes with no tasks
- `buildShareUrl` constructs correct URL format
- `AutosaveIndicator` renders all 5 states correctly
- `SearchBar` debounces correctly and shows filter chips

### Integration Tests (Playwright)

```typescript
// tests/e2e/auth.spec.ts
test('full signup → workspace flow', async ({ page }) => {
  await page.goto('/signup')
  await page.fill('[name=name]', 'Test User')
  await page.fill('[name=email]', 'test@peblo.ai')
  await page.fill('[name=password]', 'Password123!')
  await page.fill('[name=confirmPassword]', 'Password123!')
  await page.click('button[type=submit]')
  await expect(page).toHaveURL('/workspace')
})

// tests/e2e/notes.spec.ts
test('create note → autosave → AI summary flow', async ({ page }) => {
  // Login, navigate to workspace, create note, type content, wait for autosave, generate summary
})

// tests/e2e/share.spec.ts
test('share note publicly → access without login', async ({ page, context }) => {
  // Share note, copy link, open in new browser context (no auth), verify content
})
```

---

## 16. Environment & Secrets Management

### `.env.example`

```bash
# ─── Database ────────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# ─── Authentication ───────────────────────────────────────
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# ─── OAuth (Google) ───────────────────────────────────────
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# ─── AI Provider ─────────────────────────────────────────
ANTHROPIC_API_KEY="sk-ant-..."

# ─── Email (for password reset) ───────────────────────────
RESEND_API_KEY=""
EMAIL_FROM="noreply@peblo.ai"

# ─── App ─────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# ─── Optional: Redis (rate limiting in production) ────────
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

---

## 17. Deployment Strategy

### Vercel (Frontend + API Routes)

```json
// vercel.json
{
  "functions": {
    "src/app/api/notes/[noteId]/generate-summary/route.ts": {
      "maxDuration": 30
    },
    "src/app/api/notes/[noteId]/extract-actions/route.ts": {
      "maxDuration": 30
    },
    "src/app/api/notes/[noteId]/suggest-title/route.ts": {
      "maxDuration": 30
    }
  }
}
```

### Supabase (PostgreSQL)

```bash
# 1. Create project at supabase.com
# 2. Get connection strings (pooled for API routes, direct for migrations)
# 3. Run migrations: npx prisma migrate deploy
# 4. Run seed: npx prisma db seed
# 5. Enable Row Level Security (RLS) for additional security layer
```

### Deployment Checklist

- [ ] All env vars set in Vercel dashboard
- [ ] Database migrations run on production DB
- [ ] Google OAuth callback URLs updated for production domain
- [ ] `NEXTAUTH_URL` set to production URL
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL
- [ ] Anthropic API key has sufficient credits
- [ ] Resend API verified for email domain
- [ ] Test full auth flow on production
- [ ] Test AI generation on production
- [ ] Test public share page without login

---

## 18. Git Commit Narrative (Full Story)

> Every commit message follows the **Conventional Commits** specification.
> Format: `type(scope): subject` — body optional for significant commits.
> The commit history reads as a coherent product development story.

---

### Phase 0 — Foundation

```
chore: initialise Next.js 14 monorepo with TypeScript and Tailwind

Sets up the project structure with App Router, strict TypeScript, and Tailwind CSS.
Establishes the monorepo foundation that will house both the marketing site
and the full application under a unified codebase.
```

```
chore(deps): install core dependencies for auth, database, AI, and UI

Adds next-auth v5, Prisma, @anthropic-ai/sdk, Framer Motion, TipTap editor,
Radix UI primitives, Zod, and all supporting libraries. Locks versions for
a reproducible build environment.
```

```
design: establish the Peblo design token system and global CSS variables

Introduces the complete dark-mode-first visual identity: deep charcoal (#0E0D11)
backgrounds, amber-gold (#F2CA50) primary accent, orchid secondary, and wine-rose
support tones. Configures Tailwind with custom colors, radii, shadows, and animation
utilities. Sets the aesthetic foundation that every screen will build upon.
```

```
design(fonts): configure Cormorant Garamond display and DM Sans body font pairing

Loads premium Google Fonts via next/font for zero layout shift. Pairs the
editorial serif display font (Cormorant Garamond) with the clean geometric
DM Sans for UI — establishing the luxury editorial meets futuristic workspace
typographic identity.
```

---

### Phase 1 — Database & Auth

```
feat(db): design and implement the core PostgreSQL schema via Prisma

Introduces the complete data model: User, Account, Session (next-auth compatible),
Note, Tag, NoteTag (many-to-many), Category, AiAction, DailyActivity, and
PasswordReset. Designs for scalability with proper indices on userId+updatedAt,
isArchived, and shareId. Includes the AiActionType enum for type-safe AI tracking.
```

```
feat(db): add full-text search infrastructure with PostgreSQL tsvector

Creates a tsvector computed column on the notes table, a trigger to keep it
current on insert/update, and a GIN index for sub-millisecond search performance.
This enables native PostgreSQL full-text search without an external service.
```

```
feat(db): seed development database with realistic demo data

Creates a demo user (julian@peblo.ai), four tags, three categories, and six notes
with real content that mirrors the design mockups. Enables immediate visual
development without manual data entry.
```

```
feat(auth): implement next-auth v5 with credentials and Google OAuth providers

Configures JWT session strategy, Prisma adapter, and dual-provider auth.
Implements secure bcrypt password hashing (12 rounds), JWT callback for
userId propagation into sessions, and protected route redirects.
```

```
feat(auth): build forgot password and reset password token system

Implements the full password reset flow: token generation with 15-minute expiry,
email delivery via Resend, single-use token validation, and automatic session
invalidation on password change. Follows security best practices including
timing-safe comparisons and generic response messages.
```

```
feat(middleware): protect authenticated routes and redirect auth pages for signed-in users

Adds Next.js middleware that enforces authentication on all /workspace, /archive,
/shared, /insights, and /settings routes. Redirects already-authenticated users
away from /login and /signup to prevent confusion.
```

---

### Phase 2 — Stitch Screen Integration

```
feat(stitch): import and convert Stitch-generated screens to Next.js components

Downloads the Stitch export and converts all five existing screen designs
(landing page, sign-up, workspace, insights, share) from HTML to typed
React/Next.js components. Replaces class with className, wires Next.js
<Link> and <Image>, and extracts all design values into CSS variables.
```

```
feat(stitch): generate missing auth screens — login, forgot password, reset password

Uses Stitch MCP to generate Login, Forgot Password, and Reset Password screens
matching the existing sign-up screen's split-panel layout and visual identity.
All three screens maintain pixel-perfect consistency with the established
Peblo design system: same fonts, same color variables, same component styles.
```

```
feat(stitch): generate search active state with filter chips and empty state variant

Produces the Search Active State workspace screen showing removable filter chips
in amber-gold, result count display, highlighted keyword matches in note previews,
and the graceful empty state with illustration and "Clear filters" CTA.
```

```
feat(stitch): generate archive view with archived note cards and restore actions

Creates the Archive View screen: sidebar showing "Archived" as active, note cards
with ARCHIVED badge overlays in wine-rose, hover-revealed restore/delete icon actions,
and the read-only editor empty prompt with archive box illustration.
```

```
feat(stitch): enhance insights dashboard with This Week block, AI breakdown, and recently edited

Adds the missing Insights screen elements: the "This Week" narrative summary card
with three sparkline stats, AI usage breakdown (summaries / action items / titles),
and the recently edited notes horizontal scroll section with compact note cards.
```

```
feat(stitch): generate Settings/Profile screen with all sections

Produces the Settings screen: profile card with avatar, four organized settings
sections (Account, Workspace, AI, Sharing & Privacy), account stats sidebar card,
and the pending-changes-aware "Save Changes" button.
```

```
feat(stitch): generate mobile workspace view for 390px viewport

Creates the mobile-first workspace: bottom navigation bar replacing the sidebar,
full-width note cards, single-column editor, and the AI panel as a bottom sheet
with drag handle and amber-gold action buttons.
```

---

### Phase 3 — Core API

```
feat(api): implement notes CRUD endpoints with cursor-based pagination

GET /api/notes supports keyword search, tag filtering, archive filtering, sorting
by updated/created/title, and cursor-based pagination for infinite scroll.
POST /api/notes creates a note and increments DailyActivity. PATCH supports
partial updates for autosave. DELETE restricted to archived notes only.
All endpoints enforce userId scoping for security.
```

```
feat(api): implement tag and category management endpoints

CRUD operations for tags and categories with per-user scoping, name uniqueness
validation, and denormalized usageCount on Tag for fast dashboard queries.
Includes tag color picker support via the color field.
```

```
feat(api): implement public note sharing endpoint and share toggle

POST /api/notes/:id/share toggles public visibility. Generates a nanoid shareId
(12 chars, URL-safe) on first share. GET /api/shared/:shareId serves note data
without authentication, returning proper 404 for private or nonexistent notes.
Includes read time calculation (ceil(wordCount / 200) minutes).
```

```
feat(api): implement productivity insights aggregation endpoint

GET /api/insights executes seven parallel Prisma queries using Promise.all for
minimal latency: totalNotes, AI action counts with type breakdown, top 10 tags
by usageCount, five recently edited notes, 30-day DailyActivity trend, and
this-week vs last-week comparison for trend percentage calculation.
```

---

### Phase 4 — AI Integration

```
feat(ai): integrate Anthropic Claude API with three production-ready generation functions

Implements generateSummary, extractActionItems, and suggestTitle using
claude-3-5-haiku-20241022 for cost-effective, fast responses. Each function
includes input validation (minimum word count for summary), structured output
parsing (JSON for action items and titles), and token usage tracking.
Uses a consistent system prompt establishing Peblo's AI assistant persona.
```

```
feat(ai): build AI action API routes with AiAction persistence and DailyActivity tracking

Three endpoints (/generate-summary, /extract-actions, /suggest-title) validate
the note exists and belongs to the user, call the AI library, persist the result
as an AiAction record with input snapshot and token count, and update
DailyActivity.aiActions for the insights dashboard.
```

```
feat(ai): implement per-user AI rate limiting with hourly and daily windows

Adds sliding window rate limiting: 20 AI actions per hour, 200 per day per user.
Development mode uses an in-memory Map; production uses Upstash Redis via REST API.
Returns 429 with a clear user-facing message and retry-after header.
```

---

### Phase 5 — Frontend Components

```
feat(ui): build the core design system component library

Implements Button (5 variants × 3 sizes), Input (with error states and label),
Badge, Card, Modal (Radix Dialog + Framer Motion animations), Toast (Radix +
autoDismiss), Skeleton (shimmer animation), Tooltip, Avatar, and Select.
All components consume CSS variables for theme consistency and support keyboard
navigation and ARIA attributes.
```

```
feat(layout): build the application shell with sidebar and mobile navigation

Implements AppShell with a 240px fixed sidebar on desktop and a bottom navigation
bar on mobile. Sidebar contains logo, "+ New Note" CTA, navigation items with
active states, tags section with color dots, Settings, Help, and user profile.
Uses Zustand for sidebar open/close state with Framer Motion layout animations
for smooth collapse/expand on tablet breakpoint.
```

```
feat(notes): build the NoteCard component with hover actions and badge system

NoteCard displays: title, 2-line content preview, tag chips, updated time,
and contextual badges (Shared, Archived, Pinned). Hover reveals three icon
buttons: Edit, Share, Archive. Implements the amber-gold title highlight for
active/selected state. Motion: hover lift (translateY -2px, shadow-amber).
```

```
feat(notes): build the NoteList with search bar, filter chips, and infinite scroll

Implements the middle column of the workspace: debounced search (300ms),
tag/category/status filter chips with animated add/remove, sort control,
result count display, and "Clear all" button. Uses SWR infinite for cursor-based
pagination with an IntersectionObserver sentinel for automatic load-more.
Filter chips animate in/out with Framer Motion layout animations.
```

```
feat(editor): build the rich note editor with TipTap and autosave indicator

Implements the main editor with TipTap: bold, italic, lists, links, highlighting,
and typography extensions. Title is a large serif input (Cormorant Garamond).
AutosaveIndicator shows all five states (idle, saving, saved, error, offline)
with Framer Motion AnimatePresence transitions. Tag and category selectors
inline in the meta row. Toolbar with formatting controls and Share button.
```

```
feat(editor): implement autosave with 1.5s debounce and offline queue

Autosave fires 1.5 seconds after the last keystroke, immediately setting status
to 'saving'. On network failure, changes are serialised to localStorage keyed
by noteId and flushed automatically when the browser comes back online.
The 'offline' indicator state pulses gently to communicate queued status.
```

```
feat(ai): build the AI panel component with independent action cards

Desktop right panel, mobile bottom sheet. Three action buttons (Generate Summary,
Extract Action Items, Suggest Title) each trigger independent loading states.
Results render in distinct AI result cards with amber-gold sparkle badge,
generated output text, Copy button, and Regenerate button. Includes
"AI helped generate this" badge per design spec. Short-content warning
state shown when note has < 50 words.
```

---

### Phase 6 — Auth & Marketing Screens

```
feat(pages): build the marketing landing page

Implements the full landing page: hero section with "Thought, Refined." headline
and editorial product UI preview image, three feature cards (Intelligent Summaries,
Seamless Sharing, Deep Insights), "How it works" step section, security/trust
section (SOC2 · End-to-end encryption), testimonial block, and footer.
Smooth scroll, scroll-triggered section reveals with Framer Motion, and
responsive layout down to 375px.
```

```
feat(pages): build sign-up and login auth screens from Stitch designs

Converts both auth screens from Stitch to fully functional Next.js pages.
Sign-up: react-hook-form + Zod validation, inline field errors, password
visibility toggle, Google OAuth button, and redirect to /workspace on success.
Login: same system with "Forgot password?" link and error states for wrong
credentials. Both use AuthLayout split-panel component.
```

```
feat(pages): build forgot password and reset password screens

Forgot Password: email submission form → success state showing email address
confirmation. Reset Password: two password fields with real-time password
strength indicator (4-segment bar), requirements checklist with animated
checkmarks, and success state redirecting to login.
```

---

### Phase 7 — Feature Screens

```
feat(pages): build the main workspace page with note list and editor layout

Three-column layout: 240px sidebar, 320px notes list, fluid main editor.
Sidebar uses layout from AppShell. Notes list defaults to All Notes sorted
by updatedAt desc. Editor shows an empty state when no note is selected.
URL-driven note selection: /workspace/[noteId] loads the editor for that note.
Full keyboard navigation between list items.
```

```
feat(pages): build search active state with filter chips and empty state

When search has active query or filters, the notes list header shows active
filter chips with × remove buttons, result count, and "Clear all". Keyword
matches highlighted in amber-gold in note titles and previews. Empty state
replaces the list with a centered illustration, "Nothing found." heading,
subheading, and "Clear filters" ghost button.
```

```
feat(pages): build the archive view with restore and permanent delete actions

/archive route loads notes with isArchived: true. Archive note cards show
a ARCHIVED pill badge in wine-rose. Hover reveals Restore (arrow-up icon)
and Delete permanently (trash icon) actions. Restore calls PATCH /notes/:id
with { isArchived: false }. Delete shows a confirmation dialog before calling
DELETE /notes/:id. Editor panel shows read-only archive prompt.
```

```
feat(pages): build the public share page with SSR and error states

Server-rendered page at /share/[shareId] with generateMetadata for SEO.
Fetches note data server-side; if not found or private, renders an appropriate
error card with the same Peblo design system (not found, private, expired).
Share page layout: full-width readable typography, author avatar, tags,
visibility badge, read time, "Shared from Peblo Notes" footer with CTA.
```

```
feat(pages): build the productivity insights dashboard

Renders all insights data from GET /api/insights with loading skeletons.
Stat row: four cards (Total Notes, AI Summaries breakdown, Shared Notes,
Weekly Activity). This Week narrative block. Activity Trends chart (Recharts
bar + line combo, amber-gold palette). Most Used Tags with usage bars.
Recently Edited horizontal scroll. Recent AI Actions feed.
```

```
feat(pages): build the settings and profile page

/settings page with five sections: Account (editable name, email, change
password modal), Workspace Preferences (toggles and selects), AI Settings
(provider badge, usage progress bar), Sharing & Privacy, and Notifications.
Account stats card in right column. Save Changes button appears only when
form is dirty. Change password opens Radix Dialog with current + new password.
```

```
feat(responsive): implement mobile layout for all core screens

Applies mobile-first responsive overrides for 375–768px: bottom navigation
replaces sidebar, note list becomes full-screen with swipe-to-action on cards,
editor is single-column with floating action bar, AI panel slides up as bottom
sheet with drag handle, filter chips scroll horizontally, insights cards stack
in 2×2 grid then single column.
```

---

### Phase 8 — Polish & Production

```
feat(animation): add page transition system with Framer Motion

Implements shared layout animations for route transitions: auth → workspace
uses a horizontal slide, workspace → insights uses a fade-through, note
selection in the list uses a staggered list re-render. All transitions use
the design system timing (300ms ease-out-expo). Respects prefers-reduced-motion.
```

```
feat(states): implement comprehensive loading skeleton system

Skeleton components for: NoteCard (3 cards on initial load), AiPanel (shimmer
for each result card), StatCard (insights dashboard), ActivityChart (grey bar
placeholder), SearchBar (filtered transition). All use the CSS shimmer animation
(gradient sweep) matching the dark theme surfaces.
```

```
feat(states): implement error boundary and global error states

Root error boundary with Peblo-styled error card (not the browser default).
API error toast system: network errors, auth expiry (auto-redirect), AI rate
limit (with retry timer countdown), and validation errors with field mapping.
All toasts auto-dismiss in 5 seconds with manual close option.
```

```
feat(ux): add keyboard shortcuts and shortcuts hint UI

Implements keyboard shortcuts: ⌘N (new note), ⌘K (focus search), ⌘⇧A (archive),
⌘⇧S (share), Escape (close panels/modals). Shows shortcuts hint UI as a
floating chip in the bottom-right corner of the editor: click to open a modal
listing all available shortcuts. Stored in a keyboard-shortcuts.ts registry.
```

```
feat(ux): implement optimistic UI updates for note actions

Archive, pin, tag changes, and title edits apply immediately in the UI and
revert with a toast notification if the API call fails. Uses SWR's mutate
with optimistic data for the notes list. Note creation adds a placeholder card
that transitions to the real card on API response.
```

```
perf: add PostgreSQL connection pooling and Prisma query optimisation

Configures Prisma with connection pool size appropriate for serverless
(max 10 connections). Adds select projection to all list queries to exclude
large content fields. Adds include depth limits to prevent N+1 queries.
Implements the DailyActivity denormalization to avoid expensive aggregations
on the insights endpoint at read time.
```

```
perf: configure Next.js image optimisation and static asset caching

Configures next/image for all avatar and illustration assets with appropriate
sizes and quality settings. Sets Cache-Control headers for API routes: notes
list (no-cache, must-revalidate), public share page (s-maxage=300), and
insights (s-maxage=60). Configures ISR for the landing page.
```

```
test: add unit tests for AI library, insights aggregation, and auth utilities

Vitest test suite covering: generateSummary short-content guard, extractActionItems
JSON parse safety, suggestTitle alternatives fallback, buildWeeklySummary string
output, generateShareId uniqueness check, and password reset token expiry logic.
All tests run in CI and must pass before merge.
```

```
test: add Playwright e2e tests for the four core user flows

E2E test coverage: (1) signup → workspace, (2) create note → type → autosave,
(3) generate AI summary → copy output, (4) share note → access public link
without authentication. Tests run against a local database with seed data.
```

```
docs: write comprehensive README with architecture overview and setup guide

README covers: project overview, tech stack with rationale, local setup in
five steps, environment variable reference, database schema diagram, API
endpoint reference, architecture decisions (App Router, cursor pagination,
tsvector search, denormalized DailyActivity), and contribution guide.
Includes screenshots of all 13 screens and links to demo deployment.
```

```
chore: configure production deployment to Vercel with Supabase PostgreSQL

Adds vercel.json with extended function timeouts for AI endpoints (30s).
Documents the Supabase setup process, RLS policy recommendations, and
the migration deployment command. Adds the deployment link to the README.
All environment variables documented in .env.example with generation commands.
```

```
release: v1.0.0 — Peblo Notes full-stack submission

Complete implementation of the Peblo Full Stack Developer Challenge:
✓ Authentication (signup, login, forgot/reset password, Google OAuth)
✓ Notes workspace (create, edit, autosave, archive, tag, categorize)
✓ AI integration (summary, action items, title suggestion via Claude)
✓ Search and filtering (full-text, tag filter, sort, active chips)
✓ Public sharing (nanoid share links, SSR public page, error states)
✓ Productivity insights (stats, trends, weekly summary, AI breakdown)
✓ Premium dark-mode UI matching all Stitch design mockups
✓ Fully responsive (desktop, tablet, mobile with bottom navigation)
✓ Optional: keyboard shortcuts, optimistic UI, loading skeletons, dark mode
```

---

## 19. README Template

```markdown
# Peblo Notes

A collaborative, AI-powered notes workspace built for the Peblo Full Stack Developer Challenge.

**Live Demo**: https://peblo-notes.vercel.app  
**Demo Video**: [YouTube link]

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 (App Router) | RSC + API routes in one repo |
| Language | TypeScript | Type safety across full stack |
| Database | PostgreSQL via Supabase | Production-grade, full-text search |
| ORM | Prisma | Type-safe queries, migrations |
| Auth | next-auth v5 | Credentials + Google OAuth, JWT |
| AI | Anthropic Claude (Haiku) | Fast, cost-effective, high quality |
| Styling | Tailwind CSS + CSS variables | Design token system |
| Animation | Framer Motion | Production-grade motion |
| Editor | TipTap | Extensible rich text |

## Quick Start

\`\`\`bash
git clone https://github.com/YOUR_USERNAME/peblo-notes
cd peblo-notes
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in all required values (see Environment Variables section)

# Set up database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev
\`\`\`

Open http://localhost:3000

Demo credentials: `demo@peblo.ai` / `demo1234`

## Architecture Decisions

**Why cursor-based pagination?** Offset pagination degrades at scale; cursor-based
stays O(1) regardless of dataset size.

**Why tsvector for search?** Avoids adding Elasticsearch or Algolia for a small product;
PostgreSQL's native full-text search is sufficient and keeps the stack lean.

**Why DailyActivity table?** Aggregating notes and AI actions across 30 days at query
time is expensive. Denormalizing into a daily summary table keeps the insights endpoint
fast and cheap.

**Why Haiku over Sonnet?** The three AI tasks (summarize, extract, title) are
well-defined and low-complexity. Haiku provides sub-second responses at a fraction
of the cost, which matters for a rate-limited user-facing feature.
```

---

## 20. Demo Video Script

**Total length: 7–8 minutes**

```
0:00 – 0:30  Introduction
"Hi, I'm [Name]. This is Peblo Notes — a collaborative AI-powered notes workspace
built with Next.js, PostgreSQL, and Anthropic Claude."
[Show landing page with animations]

0:30 – 1:30  Authentication Flow
- Sign up with email and password (show inline validation, password strength)
- Log out → log back in
- Show "Forgot password" flow (send email, open reset link, set new password)

1:30 – 3:00  Notes Workspace
- Create a new note (click + New Note)
- Type a substantial note — pause and show "Saving…" → "Saved" autosave transitions
- Add tags from the tag selector
- Add a category
- Show the note in the notes list with its preview and tags

3:00 – 4:30  AI Integration
- With the note open, click "Generate Summary" in the AI panel
- Show the loading state (skeleton shimmer)
- Show the generated summary in the result card
- Click "Extract Action Items" — show the action items list
- Click "Suggest Title" — show three title suggestions, click "Use this title"
- Show the note title update in real-time

4:30 – 5:15  Search & Filtering
- Type a search keyword — show results narrowing in real-time
- Add a tag filter chip — show further narrowing
- Show result count ("8 notes")
- Remove a filter with × — show count update
- Clear all — show full list return

5:15 – 5:45  Public Sharing
- Click Share on a note → toggle to Public → copy share link
- Open share link in an incognito window (no auth)
- Show the public share page with author, tags, read time, content, footer

5:45 – 6:30  Insights Dashboard
- Navigate to Insights
- Walk through stat cards, This Week summary block
- Show Activity Trends chart (hover over bars)
- Show Most Used Tags and Recently Edited sections

6:30 – 7:00  Archive & Settings
- Archive a note — show it move to Archive view with ARCHIVED badge
- Restore it
- Show Settings page briefly

7:00 – 7:30  Mobile Responsive
- Resize browser to 390px (or show on mobile device)
- Show bottom navigation, note list, editor with floating AI button, bottom sheet

7:30 – 8:00  Closing
"The full source is at [GitHub URL]. README covers setup, architecture decisions,
and API reference. Thank you."
```

---

## ✅ Submission Checklist

- [ ] GitHub repository is public with clean commit history
- [ ] `.env.example` contains all required variables, no real secrets committed
- [ ] `README.md` covers setup, architecture, and API reference
- [ ] `prisma/seed.ts` provides demo data for evaluators
- [ ] All 13 screens are implemented and functional
- [ ] All 6 required features work end-to-end (auth, notes, AI, search, share, insights)
- [ ] Application runs from `git clone` + `npm install` + env setup
- [ ] Demo video is 5–10 minutes covering all required flows
- [ ] Sample outputs folder: `/samples/` with API responses, AI outputs, DB schema diagram, screenshots
- [ ] Deployed to Vercel with live demo URL in README
- [ ] Optional features included: keyboard shortcuts, optimistic UI, loading skeletons, dark mode ✓

---

*Built with craft for Peblo — where thought is refined.*
