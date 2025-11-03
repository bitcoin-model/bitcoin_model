# Onboarding Wizard Implementation Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This blueprint supports tasks **7** and **14** of the [Development Plan](./development_plan.md), guiding the onboarding journey and live price selection that bridge the cover screen and authenticated experience.

This document details how to implement the "Get Started" onboarding wizard that shepherds new and returning users from the cover screen through account creation and into the authenticated home experience. It extends the flow behaviors defined in [docs/flow_specific_ux_interactions.md](./flow_specific_ux_interactions.md) and leverages the visual and technical foundations captured in the [design system](./design_system.md) and [theming & motion framework](./theming_motion_framework.md).

Scenario creation and persistence responsibilities referenced here should follow the API and UX patterns described in the [Scenario Persistence Controls](./scenario_persistence_controls.md) blueprint.

This document details how to implement the "Get Started" onboarding wizard that shepherds new and returning users from the cover screen through account creation and into the authenticated home experience. It extends the flow behaviors defined in [docs/flow_specific_ux_interactions.md](./flow_specific_ux_interactions.md) and leverages the visual and technical foundations captured in the [design system](./design_system.md) and [theming & motion framework](./theming_motion_framework.md).

## 1. Goals & Non-Goals
- **Goals**
  - Provide a polished, low-friction account creation/sign-in experience that mirrors the Microstrategist-inspired aesthetic.
  - Capture the user's preferred starting BTC price (live, historical, or custom) before they reach the home dashboard.
  - Persist partial progress and gracefully handle validation or network errors without forcing users to restart the flow.
  - Support accessibility, localization readiness, and analytics instrumentation from day one.
- **Non-Goals**
  - Implement full profile management or MFA (defer to future account settings work).
  - Replace standalone auth routes; wizard reuses underlying auth endpoints defined in [authentication & account persistence](./authentication_account_persistence.md).

## 2. Architecture Overview
- **Route Structure**: Implement `/onboarding` as a protected public route that becomes available from the Cover page CTA. Use Next.js nested routes to render a full-screen wizard layout.
- **State Management**: Store wizard state in a dedicated Zustand slice (`useOnboardingStore`) with persistence to `sessionStorage` so progress survives refreshes within the session. Mirror the canonical auth state managed by the shared store defined in [shared app foundation](./shared_app_foundation.md).
- **Data Dependencies**:
  - Fetch live BTC price via React Query using the pricing service outlined in the [Dynamic Base-Year Handling](./dynamic_base_year_handling.md) plan and the forthcoming external BTC price feed integration guide once those modules land.
  - Use MSW mocks in development/test environments to decouple the wizard from real APIs.
- **Navigation**: On successful completion, redirect to `/home` with query flag `?onboarding=complete` for analytics.

## 3. Step-by-Step Flow
1. **Welcome**
   - Hero messaging, key value props, progress indicator set to 1/3.
   - Buttons: "Create account" (primary), "Sign in" (secondary text), "Back to cover".
2. **Account Setup / Sign-In**
   - Tabs or segmented control to switch between create/sign-in modes.
   - Inputs: username, email (optional), password, confirm password (create mode only).
   - Inline validation via Zod; password strength meter, show/hide toggle.
   - API interactions call `/auth/signup` or `/auth/login` from the auth blueprint, displaying loading state on submit.
3. **Starting Price Selection & Confirmation**
   - Display live BTC price card with timestamp + source.
   - Radio options: Use live price, Pick historical snapshot (dropdown/calendar), Enter custom (numeric input with currency formatting).
   - Summary panel recapping account and price choice.
   - Final CTA "Enter dashboard" triggers scenario seed creation and navigation.

## 4. Visual & Motion Specifications
- **Layout**: Full-height wizard with blurred/glassmorphism backdrop, responsive two-column design on desktop (form + narrative panel) collapsing to single column on mobile.
- **Motion**: Use Framer Motion variants defined in the theming/motion guide for slide transitions (`spring` easing), step progress bar animations, and success confetti micro-interaction (optional) on completion.
- **Components**: Reuse global CTA button styles, input fields, and toasts defined in the design system. Integrate skeleton loaders for price fetch waiting states.
- **Accessibility**: Respect `prefers-reduced-motion`, provide descriptive ARIA labels, ensure focus traps within the modal context, and include keyboard shortcuts (Next `Enter`, Back `Shift+Tab` from first focusable element).

## 5. Error Handling & Resilience
- Inline error banners for validation issues, non-blocking toast for network failures with retry CTA.
- Preserve user-entered data on errors; do not clear fields unless explicitly requested.
- Implement exponential backoff (up to 3 attempts) for price fetch; fallback to cached latest price if live call fails.
- Show maintenance messaging if auth service is unavailable, with link to status page.

## 6. Security & Compliance Considerations
- Ensure password fields use `type="password"` with no autocomplete for confirmation field; allow credential manager autofill on primary password and username fields.
- Use reCAPTCHA or hCaptcha toggle flag for bot protection (optional but planned per security backlog).
- Rate-limit sign-up attempts via backend; surface user-friendly error copy when limits are exceeded.
- Log auth errors and onboarding completions to observability stack specified in [performance & accessibility standards](./performance_accessibility_standards.md).

## 7. Analytics & Success Metrics
- Fire analytics events for each step start/completion, error occurrences, and final wizard success.
- Track drop-off rate per step, time-to-complete, and percentage selecting live vs. historical vs. custom price.
- Link events to user IDs post-authentication for cohort analysis while respecting privacy policies.

## 8. QA Strategy
- **Unit Tests**: Cover state store reducers/actions, price selection logic, validation schema edge cases.
- **Component Tests**: Use React Testing Library + MSW to validate step transitions, error displays, and successful redirects.
- **E2E Tests**: Playwright scripts simulating create account, sign-in, and cancellation flows on desktop and tablet breakpoints.
- **Accessibility Audits**: Axe + manual keyboard testing for focus order, screen reader labels, and motion preferences.

## 9. Delivery Milestones
1. Scaffold Next.js route + layout shell with skeleton UI.
2. Implement auth step wiring (forms, API calls, error states).
3. Integrate live price selection UI with mocked API responses.
4. Add persistence, analytics hooks, and polish (motion, accessibility tweaks).
5. Final QA pass across unit/component/e2e suites and handoff to design for sign-off.

## 10. Open Questions / Follow-Ups
- Confirm copywriting for marketing panel and error states (coordinate with content lead).
- Align on whether historical price picker should support arbitrary dates or limited presets.
- Decide if wizard should be skippable for returning signed-in users (default assumption: skip if session is valid).
- Coordinate launch sequence with marketing assets on Cover screen.

Refer to the broader blueprints for [authentication](./authentication_account_persistence.md), [shared foundation](./shared_app_foundation.md), [UX flows](./flow_specific_ux_interactions.md), and [performance standards](./performance_accessibility_standards.md) to ensure implementation remains aligned across architecture, experience, and quality guardrails.
