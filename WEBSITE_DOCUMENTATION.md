# 🏠 UrbanNest Lifestyle Store — Website & Architecture Documentation

## 1. Executive Overview

**UrbanNest Lifestyle Store** is a modern, warm editorial e-commerce and brand website designed for a physical boutique store located in **Bandra West, Mumbai**. The platform transitions a traditional offline lifestyle shop to an online digital presence while providing automated AI customer support and direct query handling via **N8N.io** workflows.

---

## 2. Technology Stack & Frameworks

### Core Web Framework & Language
* **Framework**: **Next.js 14** (App Router architecture)
* **Library**: **React 18** (Client components with `'use client'`)
* **Language**: **TypeScript 5** (Strict type definitions, custom declaration modules in `types/n8n.d.ts`)

### Styling & Design System
* **CSS Framework**: **Tailwind CSS v3** with PostCSS and Autoprefixer
* **Color Token System**: Custom CSS Variables defined in `app/globals.css`:
  - Canvas / Background: `--color-canvas: #14100b` (Warm near-black)
  - Surface Cards: `--color-surface: #3a2a1c` (Rich espresso brown)
  - Accent / Primary CTA: `--color-accent: #d9591f` (Burnt terracotta orange)
  - Text & Accents: `--color-cream: #ffedd7` (Warm linen cream)
  - Border Lines: `--color-border: #453729` (Dashed editorial grid)
* **Typography**: **Inter** (via `next/font/google`), styled with uppercase editorial headers and standard body copy.

### Animations, Motion & Canvas Physics
* **Scroll Physics**: **@studio-freight/lenis** (Smooth inertial scrolling wrapper)
* **Timeline Animations**: **GSAP 3** (`ScrollTrigger`, `matchMedia` for desktop/mobile breakpoints)
* **Interactive Canvas**: **OGL / Three.js** WebGL canvas physics for particle wordmarks (`ParticleText.tsx`)

### External Backend Integrations
* **N8N.io Webhook Query Form**: Asynchronous JSON POST submission via Fetch API to N8N Cloud Webhook.
* **N8N.io AI Chatbot Widget**: **@n8n/chat** SDK embedded for 24/7 AI-powered customer concierge.

---

## 3. What is in the Website (Page Structure & Features)

The website is structured as a single-page application (SPA) with smooth anchor routing, responsive drawers, and interactive modal dialogs:

### 1. Global Navigation Bar (`Nav.tsx`)
- **Desktop Navigation**: Fixed glassmorphism bar featuring logo, active section observer (`Shop`, `About`, `Why Us`, `Contact`, `Ask Us`), and dashed underline highlights.
- **Mobile Drawer**: Responsive hamburger button (`☰` / `✕`) on screens `<768px` opening a full-height navigation drawer with store address details.

### 2. Interactive Hero Section (`Hero.tsx`)
- **Particle Text Canvas (`ParticleText.tsx`)**: Interactive WebGL particle dispersion canvas spelling "URBANNEST" that reacts to mouse hover and touch interactions.
- **Accessible Screen Reader Landmark**: Embedded `<h1 className="sr-only">` for WCAG accessibility compliance.
- **ScrollExpand Interior Visual (`ScrollExpand.tsx`)**: Full-bleed expand-on-scroll background image (`/images/hero-lifestyle.jpg`).
- **Primary Call-to-Action**: "Explore Products" button styled with burnt terracotta accent.

### 3. Brand Story & About Section (`About.tsx`)
- Two-column editorial layout explaining the shop's philosophy ("A refusal to sell disposable goods").
- Artisan photography with grain overlay (`/images/about-artisan.jpg`) highlighting craft regions (**Rajasthan, Kutch, Chettinad**).
- Stat counters: **200+ Artisans**, **6 States**, **5YR Curation**.

### 4. Interactive Featured Products & Catalog (`FeaturedProducts.tsx`)
- **3D Accordion Gallery (`AccordionGallery.tsx`)**: Expand-on-hover image gallery showing product names and live prices (`CERAMIC VASE SET | ₹2,400`).
- **Real-Time Product Search**: Instant search bar filtering catalog by product name or description.
- **Category Filter Pills**: Interactive buttons to filter items by category (*All*, *Ceramics*, *Textiles*, *Lighting*, *Living*, *Garden*).
- **Product Grid & Quick View Modal**: Interactive product cards showing image, tag, description, price, and a "Quick View" popup dialog.

### 5. Why Choose Us Section (`WhyChooseUs.tsx`)
- Desktop GSAP scroll crossfade & sticky panel sequence highlighting 4 selling points:
  1. `01` **CURATED QUALITY**
  2. `02` **ARTISAN SOURCES**
  3. `03` **GIFTING EXPERTISE**
  4. `04` **LIFETIME SUPPORT**
- Responsive mobile stacked card layout for smaller viewports.

### 6. Patron Reviews & Testimonials (`Testimonials.tsx`)
- 3-column customer feedback cards featuring rating stars (`★★★★★`), patron quotes, names, and cities (Mumbai, Bengaluru, New Delhi).

### 7. Customer Interaction & Google Maps (`CustomerInteraction.tsx`)
- Contact information: Email (`hello@urbannest.in`), Phone (`+91 98200 00001`), Address (*14, Artisan Lane, Bandra West, Mumbai*).
- **Embedded Google Maps**: Interactive grayscale map showing the store location in Bandra West, Mumbai.

### 8. Native N8N.io Query Form (`QueryForm.tsx`)
- Native form capturing Name, Email Address, and Detailed Query.
- HTML5 client-side validation.
- Submits directly to N8N cloud webhook (`https://sangita2004.app.n8n.cloud/webhook/f8253b62-1f5c-4984-98a3-be726fc4bf55`).
- Success feedback state with "Submit Another" option.

### 9. N8N.io AI Chatbot Widget (`ChatWidget.tsx`)
- Floating bottom-right widget powered by `@n8n/chat`.
- Custom-branded title ("UrbanNest") and custom welcome message.
- Answers questions about store hours, location, delivery policies, and gifting recommendations.

### 10. Footer Section (`Footer.tsx`)
- Store operating hours (Mon–Sat: 10:00–20:00, Sun: 11:00–18:00).
- Social links (Instagram, Pinterest, Facebook).
- Copyright and brand tagline strip.

---

## 4. File & Folder Hierarchy

```
URBANNEST/
├── app/
│   ├── globals.css           # Global design tokens, typography & button styles
│   ├── layout.tsx            # Root Next.js layout (Fonts, Lenis, Nav, Footer, Chat)
│   └── page.tsx              # Main homepage entry point
├── components/
│   ├── layout/
│   │   ├── Nav.tsx           # Fixed glassmorphism navbar & mobile drawer
│   │   └── Footer.tsx        # Brand footer with hours & links
│   ├── sections/
│   │   ├── Hero.tsx          # Hero section with ParticleText & ScrollExpand
│   │   ├── About.tsx         # Brand story & artisan stats
│   │   ├── FeaturedProducts.tsx # Product gallery, filters, search & quick view
│   │   ├── WhyChooseUs.tsx   # Selling points crossfade sequence
│   │   ├── Testimonials.tsx  # Patron reviews & ratings
│   │   └── CustomerInteraction.tsx # Contact info, Google Maps & N8N form
│   └── ui/
│       ├── AccordionGallery.tsx # 3D expandable image accordion
│       ├── ChatWidget.tsx    # N8N AI Chatbot floating widget
│       ├── ParticleText.tsx  # WebGL particle wordmark canvas
│       ├── QueryForm.tsx     # N8N Webhook customer query form
│       └── ScrollExpand.tsx  # Scroll-driven media expansion container
├── lib/
│   ├── animations.ts         # GSAP ScrollTrigger timeline helpers
│   ├── lenis.tsx             # Lenis smooth scroll React provider
│   └── products.ts           # Product catalog data (ID, name, price, tag, image)
├── public/
│   └── images/               # Product & lifestyle photographs
├── types/
│   └── n8n.d.ts              # TypeScript module declarations for @n8n/chat
├── package.json              # Project dependencies & build scripts
└── README.md                 # Hackathon submission documentation
```

---

## 5. Local Build & Run Instructions

1. **Development Server**:
   ```bash
   npm run dev
   ```
   Access at `http://localhost:3000`.

2. **Production Build Verification**:
   ```bash
   npm run build
   ```
   Compiles Next.js static pages with zero TypeScript errors.
