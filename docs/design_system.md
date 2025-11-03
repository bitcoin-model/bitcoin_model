# Bitcoin Model Web App – Design System & Tech Stack

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This guide fulfills task **1** of the [Development Plan](./development_plan.md) and establishes visual precedents referenced by the shared component initiative (task **21**).

## 1. UX Vision
- **Inspiration:** Mirror the sleek, dark-mode aesthetic of Microstrategist with high-contrast typography, glassmorphism cards, and cinematic hero imagery.
- **Tone:** Professional, data-forward, and trustworthy while remaining approachable for power users and newcomers.
- **Key Experiences:**
  - Fast, animated onboarding that introduces the app's value proposition.
  - Data exploration surfaces with sticky summaries, collapsible deep dives, and responsive charts.
  - Guidance overlays and contextual tooltips to support first-time users.

## 2. Visual Language Foundations
### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `bg.base` | #0B0E11 | Primary background for dark theme.
| `bg.surface` | rgba(25, 32, 40, 0.85) | Translucent card surfaces (glass effect).
| `accent.primary` | #F7931A | Bitcoin brand color for CTAs, key data points, and chart highlights.
| `accent.secondary` | #2DD4BF | Complementary highlight for positive trends and active states.
| `accent.warning` | #F59E0B | Risk alerts and cautionary copy.
| `accent.error` | #F87171 | Validation errors.
| `text.primary` | #F8FAFC | Main copy, high contrast.
| `text.secondary` | #94A3B8 | Secondary copy labels.
| `border.subtle` | rgba(148, 163, 184, 0.2) | Card borders, dividers.

Include light-theme variants for accessibility, but default to dark.

### Typography
- **Display:** `Space Grotesk` (bold) for hero headings, numbers, and KPI metrics.
- **Body:** `Inter` for copy, tables, and forms.
- **Code/Mono:** `JetBrains Mono` for formula snippets.
- Implement responsive scale with clamp-based CSS to keep readability across devices.

### Iconography & Imagery
- Custom line icons derived from BTC motifs (nodes, blocks) using duotone accent colors.
- Hero/section backgrounds with subtle animated particle shaders or gradient noise.

## 3. Layout & Interaction Patterns
- **Grid:** 12-column responsive grid with 24px base gutter. Collapse to stacked layout below 768px.
- **Cards:** Glassmorphism cards with backdrop blur (12px) and subtle drop shadows (`0 20px 45px rgba(0,0,0,0.35)`).
- **Navigation:**
  - Persistent top app bar with logo, breadcrumbs, and user menu.
  - Secondary left rail for quick switching between BTC, Macro, and user-specific models.
- **Motion:**
  - Use spring easing (e.g., Framer Motion `type: "spring"`, `stiffness: 120`, `damping: 20`) for route transitions.
  - Micro-interactions: hover lifts, button ripple, loading skeleton shimmer.
- **Tables & Charts:**
  - Sticky headers and columns for long data tables.
  - Toggle panels for advanced calculations to reduce initial cognitive load.

## 4. Accessibility & Responsiveness
- Target WCAG 2.1 AA contrast ratios (ensure text on glass surfaces remains 4.5:1+).
- Keyboard navigable modals and forms; focus states use accent outlines.
- Provide high-contrast mode toggle and respect prefers-reduced-motion to disable heavy animations.

## 5. Core Technology Stack
### Front End
- **Framework:** Next.js 14 with React 18 + TypeScript for hybrid SSR/SSG and built-in routing.
- **Styling:** Tailwind CSS with custom design tokens + CSS variables for theming; apply `tailwindcss-animate` for motion primitives.
- **Animation:** Framer Motion for route transitions, staggered lists, and onboarding wizard.
- **State Management:** Zustand for lightweight global state (auth, scenarios, pricing) complemented by React Query for server cache.
- **Charts:** ECharts (dark-mode friendly, high-performance) wrapped in reusable chart components.
- **Forms:** React Hook Form + Zod for validation, aligning with input guardrails.

### Back End
- **Runtime:** Node.js 20 + TypeScript using NestJS for modular architecture or Fastify for lighter footprint.
- **Database:** PostgreSQL (hosted via Supabase or Neon) for users, scenarios, and price history.
- **Auth:** Supabase Auth or custom NestJS module with JWT/argon2 hashing and httpOnly cookies.
- **Data Pipelines:** Scheduled serverless function (Vercel Cron or Supabase Edge) fetching BTC prices from CoinGecko API, writing to `btc_prices` table.

### Infrastructure & DevOps
- Deploy front end via Vercel for edge caching and preview deployments.
- Host backend on Fly.io or Render with autoscaling, exposing REST/GraphQL endpoints.
- Use Prisma ORM for schema management and migrations.
- CI/CD with GitHub Actions running linting, type checks, unit tests, and Lighthouse/Axe audits.

## 6. Tooling & Collaboration
- **Design:** Figma library capturing tokens, components, and interaction specs.
- **Documentation:** Storybook for interactive component gallery; Docusaurus for developer docs.
- **Analytics & Monitoring:** Vercel Analytics + Sentry for frontend; OpenTelemetry for backend metrics.
- **Implementation Guide:** Refer to [docs/theming_motion_framework.md](./theming_motion_framework.md) for concrete Tailwind configuration steps, motion presets, and responsive layout utilities derived from this design system.
- **Flow Behaviors:** Consult [docs/flow_specific_ux_interactions.md](./flow_specific_ux_interactions.md) for onboarding, navigation, and scenario-flow UX patterns that complement these visual foundations.
- **Onboarding Wizard:** Pair the flow guidance with [docs/onboarding_wizard.md](./onboarding_wizard.md) for implementation details on the Get Started journey and price selection step.
- **Architecture & Data Layer:** Pair this guide with [docs/shared_app_foundation.md](./shared_app_foundation.md) to understand how the monorepo, services, and calculation engine operationalize the design vision.
- **Authentication & Persistence:** Coordinate with [docs/authentication_account_persistence.md](./authentication_account_persistence.md) so account flows and saved scenarios mirror the visual language and UX expectations set here.
- **Home Experience:** Reference the [User Home Page Implementation Blueprint](./user_home_page.md) for detailed layout, interaction, and performance goals of the authenticated landing hub.
- **Performance & Accessibility:** Follow [docs/performance_accessibility_standards.md](./performance_accessibility_standards.md) to uphold the speed, inclusivity, and observability targets that make the experience feel polished in practice.

## 7. Success Metrics
- LCP < 2s on mid-tier devices, CLS < 0.1, accessibility score ≥ 95.
- Auth signup-to-first-scenario completion rate > 70%.
- Daily BTC price sync success ≥ 99% with automated alerts for failures.

This design system and stack blueprint ensures the Bitcoin model web app delivers a visually striking, performant, and maintainable experience aligned with the inspiration source.
