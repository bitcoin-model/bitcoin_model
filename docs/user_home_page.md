# User Home Page Implementation Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This blueprint fulfills task **8** of the [Development Plan](./development_plan.md), detailing the authenticated dashboard experience that connects onboarding outcomes with the modeling workflows.

This document translates task 8 of the roadmap—"Create user Home page"—into an actionable implementation plan. It aligns with the design direction, theming, motion, and flow guides already established for the Bitcoin Model web app.

Scenario management interactions on the Home experience should follow the patterns defined in the [Scenario Persistence Controls](./scenario_persistence_controls.md) blueprint, while live pricing banners and status affordances rely on the [External BTC Price Ingestion](./external_btc_price_ingestion.md), [Dynamic Base-Year Handling](./dynamic_base_year_handling.md), and [Live Price Onboarding Integration](./live_price_onboarding_integration.md) plans.

## 1. Objectives & Success Criteria
- Deliver a personalized, data-rich landing experience immediately after onboarding or sign-in.
- Provide clear navigation into the guided BTC → Macro → Model flow while still supporting free exploration.
- Surface saved scenarios, live-price context, and quick actions in a performant, accessible UI.
- Success metrics: Home load < 1.2s on broadband, task completion (launch a model) within 2 clicks, ≥95% Lighthouse accessibility score, and ≥70% of returning users interacting with at least one saved scenario per session.

## 2. Information Architecture
- **Hero Overview**: Greeting, summary of active scenario, last modified timestamp, and "Resume" CTA.
- **Guided Flow Banner**: Horizontal stepper (BTC → Macro → Models) with progress tracking and deep links.
- **Model Catalog**: Responsive grid of cards grouped by category (Core BTC, Macro Engine, Individuals, Corporate, Institution, Nation-State variants).
- **Saved Scenarios**: Tabbed list (All, Recently Viewed, Favorites) with table rows, filters, and inline actions.
- **Insights & Updates**: Optional announcement card (release notes, price feed status) and checklist for next steps.
- **Support & Resources**: Links to documentation, tutorials, and contact support.

## 3. Data Dependencies & State
- Fetch authenticated user profile, scenario metadata, and pricing preferences via React Query on route entry.
- Maintain local Zustand slice for UI state (active tab, search filters, card layout mode) to avoid excessive renders.
- Subscribe to pricing context so the banner shows "Starting from $X as of DATE" with edit affordance.
- Ensure scenario actions (save, duplicate, delete) update the optimistic cache and trigger toast confirmations.

## 4. UI & Interaction Patterns
- **Hero Card**: Glassmorphism surface with subtle gradient, animated avatar initials, and "Resume" button using accent gradient.
- **Guided Flow Stepper**: Framer Motion transitions on progress changes; display completion badges when steps finished.
- **Model Cards**: Hover tilt and glow, status chips (Not started, In progress, Complete), quick action buttons (Start guided, Jump in, View docs).
- **Saved Scenario Table**: Virtualized rows for performance, inline rename via double-click, kebab menu for actions.
- **Search & Filters**: Debounced search input, filter chips (model type, status), and sort dropdown.
- **Empty States**: Friendly illustrations when no scenarios; CTA to "Start guided flow".
- **Notifications**: Toast stack bottom-right for scenario actions; inline warning banner if price feed stale.

## 5. Responsiveness & Layout
- Desktop: 12-column grid with hero and flow banner spanning top row, cards below in 3–4 column layout.
- Tablet: Collapse left rail navigation into top tabs; cards in 2-column layout; table switches to stacked cards with key metrics.
- Mobile: Stack sections vertically with accordions; hero condenses into condensed card; scenario list uses swipe actions.
- Employ CSS clamp for responsive typography and Tailwind container queries for layout adjustments.

## 6. Accessibility & Localization
- Semantic landmarks (`<main>`, `<section>`, `<nav>`) and ARIA labels for hero, flow banner, and scenario list.
- Keyboard support: Tab-order through hero → flow stepper → cards → scenarios; Enter activates primary CTA, Space toggles filters.
- Announce toast updates via ARIA live regions; ensure focus management when dialogs (rename, delete confirm) open.
- Provide translation keys for all copy to facilitate future localization; keep number/date formats locale-aware.

## 7. Performance & Observability
- Prefetch BTC and Macro routes when user hovers or focuses related CTAs using Next.js `prefetch`.
- Split scenario table into dynamic chunk; lazy load announcement widget to keep initial bundle light.
- Instrument analytics events: home_viewed, scenario_resume_clicked, guided_flow_started, model_card_opened.
- Log pricing fetch status to Sentry breadcrumbs to aid debugging when live price context fails.

## 8. Security & Privacy Considerations
- Only display scenarios belonging to the authenticated user; enforce API filtering by `user_id`.
- Mask sensitive metadata (e.g., custom scenario notes) in logs; ensure toast messages avoid personal data.
- Rate-limit scenario mutations from the home page to prevent accidental rapid-fire saves/deletes.

## 9. QA Checklist
- Verify hero card renders with and without existing scenarios.
- Confirm progress stepper reflects real completion state after BTC/Macro/model steps.
- Test scenario actions (rename, duplicate, delete) across desktop, tablet, and mobile breakpoints.
- Validate keyboard-only navigation including search, filters, and action menus.
- Check performance metrics via Lighthouse and ensure skeleton loaders display during data fetches.
- Run accessibility scans (Axe) ensuring ARIA labels and focus management pass.

## 10. Dependencies & References
- Visual/motion specs: [Design System & Tech Stack](./design_system.md) and [Theming & Motion Framework](./theming_motion_framework.md).
- Flow behaviors: [Flow-Specific UX Interactions Blueprint](./flow_specific_ux_interactions.md), [Guided Flow Blueprint](./guided_model_flow.md), and [Onboarding Wizard Blueprint](./onboarding_wizard.md).
- Architecture & data: [Shared App Foundation Blueprint](./shared_app_foundation.md) and [Authentication & Account Persistence](./authentication_account_persistence.md).
- Performance guardrails: [Performance & Accessibility Standards](./performance_accessibility_standards.md).

Delivering this blueprint first ensures the upcoming implementation of the authenticated landing experience remains aligned with the broader product vision, technical stack, and UX patterns established for the Bitcoin Model web app.
