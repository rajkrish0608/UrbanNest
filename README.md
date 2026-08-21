# 🏠 UrbanNest Lifestyle Store — Hackathon Project Documentation

> **Hackathon Challenge:** Take a Local Shop Online  
> **Target Business:** UrbanNest Lifestyle Store (Bandra West, Mumbai)  
> **Live Website:** [Render Live URL Placeholder]  
> **Source Code Repository:** [GitHub Repository URL Placeholder]

---

## 1. Problem Being Solved

**UrbanNest Lifestyle Store** is a traditional offline boutique operating in Bandra West, Mumbai, selling handcrafted home décor, gift items, ceramics, textiles, and lifestyle accessories sourced directly from artisans in Rajasthan, Kutch, and Chettinad. 

Without an online digital presence:
- Local customers could only discover products by physically visiting the store.
- Customer inquiries and custom gifting briefs had to be handled manually via phone/in-person.
- Potential patrons outside Mumbai had no way to explore the curated collection or interact with the brand.

---

## 2. Proposed Solution

We built a **commercial-grade, highly aesthetic digital storefront** for UrbanNest that bridges the offline-to-online gap:
1. **Warm Editorial Showroom**: Designed an online presence that feels like a luxury interior magazine combined with an interactive e-commerce catalog.
2. **Interactive Product Curation**: Features 3D interactive `AccordionGallery` panels, instant product category filters (Ceramics, Textiles, Lighting, Living, Garden), real-time search, and Quick View modals displaying prices and details.
3. **Automated Customer Inquiries (N8N Workflow)**: A native inquiry form connected directly to an N8N.io Webhook backend for automated inquiry processing.
4. **AI Customer Assistant (N8N Chatbot)**: Integrated a floating N8N.io AI agent branded as **UrbanNest** to answer store questions 24/7 (store hours, delivery policies, gifting recommendations, product catalog).

---

## 3. Technology Stack

- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Styling**: Tailwind CSS, CSS Custom Design Tokens (`--color-canvas: #14100B`, `--color-accent: #D9591F`)
- **Animations & Physics**: GSAP 3 (ScrollTrigger), Lenis Smooth Scroll, WebGL Canvas (`ParticleText`)
- **Backend Integrations**: N8N.io Cloud Webhook (Query Form) & `@n8n/chat` Embed SDK (AI Chatbot)
- **Deployment**: Render / Vercel

---

## 4. Team Member Contributions

| Team Member | Primary Role | Key Responsibilities |
| :--- | :--- | :--- |
| **Member 1** | UI/UX & Landing Page | Designed dark warm editorial system, typography scale, responsive layouts & color tokens |
| **Member 2** | Web Development | Next.js architecture, GSAP scroll physics, search & filter state, product modal & components |
| **Member 3** | AI & N8N Integration | Integrated N8N query form webhook, N8N `@n8n/chat` AI widget, testing & deployment setup |

---

## 5. N8N.io Integrations

### A. N8N Query Form Integration
- **Implementation**: Built inside `QueryForm.tsx` in the Customer Interaction section.
- **Workflow Connection**: Native React form submitting POST JSON requests to the N8N Cloud Webhook endpoint (`https://sangita2004.app.n8n.cloud/webhook/f8253b62-1f5c-4984-98a3-be726fc4bf55`).
- **Data Captured**: Customer Name, Email Address, and Detailed Query/Gifting Message.

### B. N8N AI Chatbot Integration
- **Implementation**: Built inside `ChatWidget.tsx` using `@n8n/chat`.
- **Customizations**: Customized widget branding to **UrbanNest**, customized welcome greeting, and configured input placeholder text.
- **Customer Assistance Capabilities**: Store timings, store address/location in Bandra West, product catalog advice, delivery policies, and gifting recommendations.

---

## 6. Deployment Process

1. **Build Verification**: Compiled locally via `next build` to verify clean TypeScript checks and zero build errors.
2. **Environment Configuration**: Configured `@n8n/chat` types in `types/n8n.d.ts`.
3. **Render Deployment**: Connected GitHub repository (`main` branch) to Render web service with build command `npm run build` and start command `npm run start`.

---

## 7. Future Improvements & Roadmap

- **Full E-Commerce Cart & Checkout**: Slide-out shopping bag drawer with online payment gateway integration (Razorpay/Stripe).
- **Expanded Artisan Catalog**: Dynamic CMS integration (Sanity/Strapi) for store managers to add new seasonal collections.
- **Augmented Reality (AR) Product Preview**: 3D AR view allowing patrons to visualize ceramic vases and lighting inside their own living rooms.
