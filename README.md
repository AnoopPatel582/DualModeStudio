# DualMode Studio — Official Website

> **Live Site:** [dualmodestudio.com](https://dualmodestudio.com)

A modern, performance-driven agency website for **DualMode Studio** — a Delhi-based video editing and content production agency serving creators and brands globally.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Sections](#pages--sections)
- [Services Offered](#services-offered)
- [Pricing](#pricing)
- [Key Features](#key-features)
- [Data Files](#data-files)
- [Components](#components)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contact & Social](#contact--social)

---

## About the Project

DualMode Studio is a **Delhi-based creative video editing agency** that fuses data-driven strategy with cinematic execution. The studio serves 50+ global creators and brands, having produced **1,000+ videos** generating over **50 million views on YouTube alone**.

The website serves as the agency's digital home — showcasing their portfolio, services, pricing, results, and providing a direct contact channel for prospective clients.

**Founders:**
- **Vivaan Kashyap** — Founder & Senior Video Editor — Specializes in long-form YouTube editing, high-retention storytelling, and performance-driven strategies.
- **Ayush Kaushal** — Co-Founder & Creative Lead — Expert in short-form video editing and creative direction for rapid audience growth.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Runtime** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) v12 |
| **Icons** | [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/) |
| **Email / Contact** | [Resend](https://resend.com/) |
| **Form Validation** | [Validator.js](https://github.com/validatorjs/validator.js) |
| **Video Streaming** | [HLS.js](https://github.com/video-dev/hls.js/) |
| **Media Hosting** | Cloudinary, YouTube (embed), Vimeo (embed) |
| **Fonts** | Inter + Syne (via `next/font/google`) |
| **Linting** | ESLint (eslint-config-next) |

---

## Project Structure

```
dualmodestudio/
├── public/                        # Static assets
│   ├── logo.png                   # Brand logo mark
│   ├── logo_title.png             # Full wordmark logo
│   ├── bg_image.avif              # Background image
│   ├── ayush.avif                 # Co-founder photo
│   ├── vivaan.avif                # Founder photo
│   ├── whatsapp.png               # WhatsApp icon
│   ├── thumb1–6.png/.jpeg         # Thumbnail portfolio samples
│   ├── long.avif                  # Long-form service image
│   ├── short.avif                 # Short-form service image
│   ├── thumbnail.avif             # Thumbnail service image
│   ├── Trust Logo/                # Client / brand trust logos (9 logos)
│   ├── Feedback/                  # Client feedback screenshots (12 images)
│   ├── Views/                     # View count screenshots (4 images)
│   └── Before&After/              # Before & after edit comparisons (4 images)
│
└── src/
    ├── app/                       # Next.js App Router
    │   ├── layout.js              # Root layout (fonts, footer, scroll helper)
    │   ├── page.js                # Homepage
    │   ├── fonts.js               # Google Fonts config (Inter + Syne)
    │   ├── globals.css            # Global styles & CSS custom properties
    │   ├── portfolio/             # /portfolio route
    │   ├── long-form-editing/     # /long-form-editing route
    │   ├── short-form-editing/    # /short-form-editing route
    │   ├── thumbnail-design/      # /thumbnail-design route
    │   ├── contact/               # /contact route (also embedded in homepage)
    │   └── api/
    │       └── contact/           # POST /api/contact — email via Resend
    │
    ├── components/                # Reusable UI components
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── ContactForm.jsx
    │   ├── VideoModal.jsx
    │   ├── PortfolioCard.jsx
    │   ├── WorkCard.jsx
    │   ├── FounderCard.jsx
    │   ├── CapabilityCard.jsx
    │   ├── AdaptiveVideo.jsx
    │   ├── ScrollReveal.jsx
    │   └── ScrollToHash.jsx
    │
    ├── sections/                  # Page-level sections
    │   ├── homepage/
    │   │   ├── Hero.jsx
    │   │   ├── HeroVideoSection.jsx
    │   │   ├── GrowthFrameworkSection.jsx
    │   │   ├── AuthorityAndAdvantageSection.jsx
    │   │   ├── TrustSection.jsx
    │   │   ├── MotionGraphicsSection.jsx
    │   │   ├── ResultsSection.jsx
    │   │   ├── PainPointsSection.jsx
    │   │   └── FoundersSection.jsx
    │   ├── portfolio/
    │   ├── longformediting/
    │   ├── shortformediting/
    │   └── thumbnaildesign/
    │
    └── lib/                       # Data files & utility functions
        ├── mediaUrl.js            # URL helpers (YouTube + Vimeo detection & embed conversion)
        ├── worksData.js           # Homepage featured works (landscape + reels)
        ├── portfolioData.js       # Full portfolio grid data
        ├── servicesData.js        # Services list
        ├── foundersData.js        # Founder bios & social links
        ├── trustSectionData.js    # Client logos, feedback, trust stats
        ├── resultsSectionData.js  # View count & before/after screenshots
        ├── longFormPlansData.js   # Long-form pricing plans
        ├── shortFormPlansData.js  # Short-form pricing plans
        ├── thumbnailPlansData.js  # Thumbnail pricing plans
        ├── longFormWorksData.js   # Long-form service page samples
        ├── shortFormWorksData.js  # Short-form service page samples
        └── thumbnailWorksData.js  # Thumbnail service page samples
```

---

## Pages & Sections

### Homepage (`/`)

The homepage is a **single-page scroll experience** composed of the following sections in order:

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Animated word-by-word headline with a muted Cloudinary background video loop. Core copy: *"Social Media production, retention editing & more"* |
| 2 | **Hero Video Section** | Featured work preview — 4 landscape YouTube embeds (top row) + 4 vertical Vimeo reel embeds (bottom row). Click to open in a modal. |
| 3 | **Growth Framework** | Two service capability cards outlining the studio's core execution pillars — short-form repurposing, YouTube optimization, personal brand building, thumbnail design & scripting. |
| 4 | **Authority & Advantage** | Three numbered reasons to partner with the studio: YouTube-First Focus, Proven Frameworks, Transparent Tracking. |
| 5 | **Trust Section** | Scrolling marquee of 9 client/brand logos + two rows of auto-scrolling client feedback screenshots + trust statistics (50+ clients, 1,000+ videos, 50M+ YouTube views). |
| 6 | **Motion Graphics** | Showcases motion graphics capabilities. |
| 7 | **Results Section** | Real view-count screenshots linked to live Instagram reels, plus before/after edit comparison images. |
| 8 | **Pain Points** | Three pain-point cards (No Time to Build, Content That Doesn't Convert, Freelancer Chaos) followed by a CTA linking to a Calendly strategy session. |
| 9 | **Founders** | Profile cards for both founders with name, role, expertise, and social links (LinkedIn, Instagram, X). |
| 10 | **Contact** | Full-width embedded contact form (name, email, message) — submits via the `/api/contact` route using Resend. |

### Portfolio (`/portfolio`)

A **filterable portfolio grid** supporting four category tabs:

- **All** — Shows the complete portfolio (27+ items)
- **Long Form Video** — 12 YouTube-embedded long-form videos
- **Short Form Video** — 10 items (YouTube + Vimeo short-form reels)
- **Thumbnails** — 6 sample thumbnail designs displayed as images

Each card is clickable and opens a full-size **VideoModal** with autoplay.

### Service Pages

| Route | Service |
|---|---|
| `/long-form-editing` | Long-Form Video Editing — plans, work samples, CTA |
| `/short-form-editing` | Short-Form Video Editing — plans, work samples, CTA |
| `/thumbnail-design` | Thumbnail Design — plans, samples, CTA |

---

## Services Offered

1. **Long-Form Video Editing** — High-retention edits engineered for watch time, pacing, and audience engagement.
2. **Short-Form Video Editing** — Platform-native short content optimized for reach, hooks, and rapid audience growth.
3. **Thumbnail Designing** — CTR-optimized visual systems built to command attention and drive clicks.
4. **Script Writing** — Strategic scripting aligned with audience psychology and retention mechanics.
5. **Channel Automation** — End-to-end production workflows designed for scalable content execution.
6. **Advertisements** — Performance-driven ad creatives engineered for conversions and ROI.

---

## Pricing

### Long-Form Video Editing

| Plan | Duration | Price |
|---|---|---|
| Essential Plan | Up to 8 min | $100 / video |
| Creator Growth | Up to 15 min | $240 / video |
| Cinematic Plan | Up to 25 min | $300 / video |
| Custom Category | Advanced edits (docs, podcasts, gaming, series) | $500 / video |

**Cinematic Plan features:** Cinematic storytelling, advanced transitions, dynamic motion graphics, sound design, priority delivery.

### Short-Form Video Editing

| Plan | Price |
|---|---|
| Pay-Per-Reel | $20 / reel (up to 60 sec, 24hr delivery, 2 revisions) |
| Momentum Plan | $240 / month (12 reels, priority turnaround, 3 revisions/reel) |
| Scale Plan | $550 / month (up to 30 reels, unlimited revisions, thumbnail + caption suggestions) |
| Unlimited Plan | $750 / month (unlimited submissions, dedicated editor, same-day possible) |

### Thumbnail Design

| Plan | Price |
|---|---|
| Basic | $5 |
| Standard ⭐ | $15 |
| Premium | $20 |

---

## Key Features

### Video Embedding
The site supports three video source types with automatic detection and correct rendering:

- **YouTube** — Detected via `isYouTubeUrl()`. Share links and `watch?v=` URLs auto-converted to embed format via `toYouTubeEmbedUrl()`.
- **Vimeo** — Detected via `isVimeoUrl()`. Share links (`vimeo.com/{id}?share=copy`) auto-converted to player embed URLs (`player.vimeo.com/video/{id}`) via `toVimeoEmbedUrl()`.
- **Direct MP4** — Cloudinary-hosted MP4 files rendered via `<video>` tag with autoplay, mute, and loop.
- **Images** — Static image files rendered via `<img>` tag (used for thumbnails in the portfolio).

All video cards are non-interactive overlays (pointer-events disabled) with click-to-modal behaviour. The **VideoModal** component opens the video full-size with autoplay enabled.

### Animations & Interactions
- **Framer Motion** — Word-by-word stagger animation on the Hero headline and subheading; scroll-triggered `whileInView` reveals on sections.
- **ScrollReveal** — Wrapper component using Framer Motion `whileInView` to fade/slide sections in on scroll.
- **Glow Cards** — CSS `@property` + `conic-gradient` animated border with a rotating glow sweep effect (`borderSpin` keyframe).
- **Marquee** — CSS keyframe marquee animations (`animate-marquee-left` / `animate-marquee-right`) for the trust logos and feedback screenshots.
- **Navbar** — Fixed, frosted-glass (`backdrop-blur-md bg-black/80`) with animated mobile hamburger → X transition and an AnimatePresence-powered dropdown.

### Contact System
- Form fields: First Name, Last Name, Email, Message.
- Client-side email validation via `validator.js`.
- Server-side submission via `/api/contact` (Next.js API Route) using the **Resend** email SDK.
- Success/error states shown inline without page reload.

### Navigation
- Active-section-aware smooth scrolling via `scrollToSection()`.
- `ScrollToHash` — a client component that reads `window.location.hash` on mount and scrolls to the correct section, enabling cross-page anchor deep links (e.g. `/portfolio` → `/#contact`).
- WhatsApp CTA button in the navbar links directly to the studio's WhatsApp number: `+91 88009 46239`.
- **Calendly** integration for booking strategy sessions: `calendly.com/business-dualmodestudio/strategy-session`.

### Design System

| Token | Value |
|---|---|
| Background | `#000000` (pure black) |
| Foreground | `#ffffff` |
| Primary | `hsl(204, 100%, 50%)` — electric sky blue |
| Body Font | Inter (Google Fonts) |
| Display Font | Syne (Google Fonts) — used for all headings |
| Base text opacity | `text-white/60` — `text-white/80` |
| Card style | `bg-white/[0.04]`, `border border-white/10`, `rounded-2xl` / `rounded-[32px]` |

---

## Data Files

All content data is stored as simple JavaScript export files in `src/lib/` — making content updates straightforward without touching component code.

| File | Purpose |
|---|---|
| `worksData.js` | Exports `worksLandscape` (4 YouTube videos for top row) and `worksReels` (first 4 from `allWorks` for the vertical reel row) |
| `portfolioData.js` | Full portfolio — 27 entries across Long Form Video, Short Form Video, and Thumbnails categories |
| `servicesData.js` | 6 service definitions with title, description, and route slug |
| `foundersData.js` | Founder bios with name, role, expertise, avatar path, and social links |
| `trustSectionData.js` | Client logos array, two feedback image rows, one portrait feedback array, and trust stats |
| `resultsSectionData.js` | View screenshot images with Instagram reel links, and before/after comparison images |
| `longFormPlansData.js` | 4 long-form pricing plans with features |
| `shortFormPlansData.js` | 4 short-form pricing plans with features |
| `thumbnailPlansData.js` | 3 thumbnail pricing tiers |
| `mediaUrl.js` | `isYouTubeUrl`, `toYouTubeEmbedUrl`, `buildYouTubePortfolioCardEmbedSrc`, `isVimeoUrl`, `toVimeoEmbedUrl`, `isImageMediaUrl`, `appendQueryParams` |

---

## Components

| Component | Description |
|---|---|
| `Navbar.jsx` | Fixed top nav with logo, desktop links (Portfolio, Services, Contact), WhatsApp CTA button, and animated mobile hamburger menu |
| `Footer.jsx` | Logo, tagline, business email (`business@dualmodestudio.com`), WhatsApp + Instagram social icons, copyright |
| `ContactForm.jsx` | Client-side form with loading/success states, submits to `/api/contact` |
| `VideoModal.jsx` | Full-screen modal overlay; handles YouTube (autoplay iframe), Vimeo (autoplay iframe), images, and MP4 video |
| `PortfolioCard.jsx` | Filterable portfolio card with YouTube iframe / Vimeo iframe / image / video preview; click opens `VideoModal` |
| `WorkCard.jsx` | Homepage featured work card supporting landscape and reel (9:16) aspect ratios; YouTube / Vimeo / MP4 preview |
| `FounderCard.jsx` | Founder profile card with avatar, name, role, expertise, and social link icons |
| `CapabilityCard.jsx` | Service capability highlight card |
| `AdaptiveVideo.jsx` | Adaptive HLS/MP4 video player using HLS.js for streaming video support |
| `ScrollReveal.jsx` | Framer Motion `whileInView` wrapper for scroll-based entrance animations |
| `ScrollToHash.jsx` | Client component that reads the URL hash on load and scrolls to the matching section element |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/AnoopPatel582/DualModeStudio.git
cd DualModeStudio/dualmodestudio

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Create a `.env.local` file in the project root with the following:

```env
RESEND_API_KEY=your_resend_api_key_here
```

> The `RESEND_API_KEY` is used by the `/api/contact` route to send emails via the Resend API. Without this key, the contact form submission will fail.

---

## Deployment

The site is deployed and live at **[dualmodestudio.com](https://dualmodestudio.com)**.

The project is hosted on **Vercel** (recommended for Next.js). To deploy:

1. Push to the `main` branch on GitHub (`AnoopPatel582/DualModeStudio`).
2. Vercel automatically builds and deploys on every push.
3. Set the `RESEND_API_KEY` environment variable in the Vercel project settings.

---

## Contact & Social

| Channel | Link |
|---|---|
| 🌐 Website | [dualmodestudio.com](https://dualmodestudio.com) |
| 📧 Business Email | [business@dualmodestudio.com](mailto:business@dualmodestudio.com) |
| 💬 WhatsApp | [+91 88009 46239](https://wa.me/+918800946239) |
| 📸 Instagram | [@bydualmodestudio](https://www.instagram.com/bydualmodestudio) |
| 🔗 Vivaan — LinkedIn | [vivaan-kashyap](https://www.linkedin.com/in/vivaan-kashyap-a06b802a4/) |
| 🔗 Ayush — LinkedIn | [ayush-kaushal](https://www.linkedin.com/in/ayush-kaushal-a7923b338/) |
| 📅 Book a Strategy Call | [Calendly](https://calendly.com/business-dualmodestudio/strategy-session) |

---

© 2025 DualMode Studio. All rights reserved. Operating remotely worldwide.
