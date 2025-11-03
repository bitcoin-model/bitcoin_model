# Bitcoin24 Web App – Route Guarding & Global Navigation

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #9 – Route guarding & global navigation.
- **Dependencies:** Auth services & session persistence ([Authentication & Account Persistence](./authentication_account_persistence.md)), scenario management APIs ([Scenario Persistence Controls](./scenario_persistence_controls.md)), onboarding wizard ([Onboarding Wizard Blueprint](./onboarding_wizard.md)), and user home experience ([User Home Page Blueprint](./user_home_page.md)).
- **Downstream impact:** Guided model flows, scenario persistence controls, and all modeling screens rely on reliable navigation and access control cues.

## Objectives
1. Ensure only authenticated users can access protected modeling routes while allowing guests to explore public marketing content.
2. Provide a consistent navigation shell (header, sidebar, breadcrumbs) that reflects the authenticated state, highlights current step, and surfaces quick actions.
3. Maintain a responsive, accessible, and performant navigation experience that matches the modern design language defined in the design system and theming guides.

## Scope
- Client-side routing configuration (Next.js App Router or equivalent) including public vs. protected route segmentation.
- Session verification, token refresh, and optimistic UI around auth status.
- Global navigation components (top bar, collapsible side nav, breadcrumbs, footer quick links).
- Loading states, skeletons, and transitions used when authentication checks are in progress.
- Access control behavior for deep links, expired sessions, and permission edge cases.

## Non-Goals
- Implementing the auth API itself (covered by the authentication blueprint).
- Detailing the individual modeling screen layouts (covered in upcoming UI specs).
- Designing analytics instrumentation beyond navigation-specific events (see [Performance & Accessibility Standards](./performance_accessibility_standards.md)).

## Functional Requirements
1. **Route segmentation**
   - Public routes: `/`, `/onboarding`, `/legal`, password reset, health pages.
   - Protected routes: `/home`, `/btc`, `/macro`, `/models/*`, scenario management endpoints.
   - Attempting to access protected routes without a valid session triggers redirect to onboarding/login while preserving the intended destination for post-login routing.
2. **Session verification workflow**
   - On initial load, hydrate auth state from secure storage (httpOnly cookie) and call `/auth/session` to validate token.
   - While verification occurs, display branded skeleton header and progress indicator; no protected content should flash.
   - If verification fails, clear local state and redirect to onboarding with contextual message.
   - Refresh tokens automatically in the background before expiry; retry gracefully on transient network errors.
3. **Navigation shell**
   - Header contains logo, environment badge (if non-prod), user avatar menu, notifications (future), and “Save Scenario” shortcut when applicable.
   - Left rail (collapsible) lists the guided flow steps (BTC, Macro, chosen model), scenario library, and admin/settings entry points.
   - Breadcrumb trail appears below the header for screens deeper than level 1, enabling quick return to the home dashboard.
   - Active route states visually match theming tokens (e.g., highlight color, glow) and respond to hover/focus per accessibility guidelines.
4. **Guided flow integration**
   - Navigation rail dynamically highlights the current flow step and indicates completion with checkmarks.
   - “Next” and “Previous” buttons anchor at the footer for sequential progression, updating the router on click.
   - When a flow requires prerequisite data (e.g., Macro screen needs BTC assumptions), guard entry with modal explaining missing steps and offering to auto-navigate to prerequisite.
5. **Responsive behavior**
   - Below 1024px width, collapse the sidebar into a slide-out drawer accessible via hamburger button.
   - Ensure all navigation controls are keyboard operable and screen reader-friendly.
   - Maintain 60fps animations when toggling sidebar or switching routes using Framer Motion primitives defined in the theming guide.
6. **Error and edge cases**
   - If session expires mid-interaction, display toast + modal prompting re-authentication; unsaved form data should persist in memory/local storage until session restored.
   - Handle 403 (forbidden) responses by showing dedicated access-denied screen with support links.
   - Provide offline fallback messaging and retry controls if auth checks fail due to network loss.

## Architectural Decisions
- **Router**: Use Next.js App Router (file-based). Public routes live under `app/(public)/`, protected routes under `app/(protected)/` with a higher-order `ProtectedLayout` that performs session checks.
- **State management**: Leverage Zustand or Redux Toolkit slice `auth` to store session status (`unknown`, `loading`, `authenticated`, `unauthenticated`) and user profile. Persist minimal metadata (user id, name) in memory only; rely on cookies for tokens.
- **Server-side protection**: Implement middleware in Next.js (`middleware.ts`) that intercepts protected routes and performs lightweight session validation (e.g., cookie presence) before allowing render. Redirect to `/onboarding` if missing.
- **Prefetching**: Use Next.js `prefetch` for primary navigation links when session is valid to keep transitions snappy. Disable prefetch for unauthenticated users to avoid unnecessary protected fetches.
- **API hooks**: Encapsulate session validation and refresh logic in reusable hooks (`useSession`, `useRequireAuth`) with suspense integration for declarative loading states.

## UX & Visual Implementation
- Align header/rail styling with the glassmorphism and dark theme tokens defined in the [Design System & Tech Stack](./design_system.md) and [Theming & Motion Framework](./theming_motion_framework.md).
- Apply motion curves from the theming guide for sidebar slide-in/out and breadcrumb transitions.
- Provide inline tooltips explaining nav icons on hover/focus, sourced from copy guidelines in the UX interactions plan.
- Use skeleton loaders that mimic the shape of the navigation items during auth state hydration.

## Accessibility & Compliance
- All navigation components must achieve WCAG AA contrast ratios.
- Provide skip-to-content link at the top of the page.
- Ensure focus trapping within the mobile drawer and restore focus to triggering control on close.
- Announce route changes to screen readers using `aria-live` regions or Next.js `next/head` title updates.

## Performance Considerations
- Lazy-load the scenario library drawer and any secondary navigation modules after the primary layout renders.
- Cache `/auth/session` responses for the duration of the session using SWR or React Query with stale-while-revalidate to minimize network chatter.
- Monitor navigation latency via Web Vitals instrumentation (TTFB, FID) as outlined in the performance standards document.

## Security Requirements
- Ensure route guards do not expose sensitive data in HTML during SSR; protect using server-side session checks before data fetching.
- Sanitize redirect targets to prevent open redirect vulnerabilities (only allow internal paths).
- Log auth guard failures with correlation IDs for audit, but avoid leaking PII in client logs.

## Testing Strategy
- **Unit**: Cover `useSession`, auth slice reducers, and guard utilities with Vitest/Jest.
- **Integration**: Use Playwright to verify redirect flows (unauthenticated access, expired sessions, mobile drawer interactions).
- **Accessibility**: Run Axe against navigation pages and ensure focus order/screen reader announcements behave as expected.
- **Performance**: Add Lighthouse CI budget thresholds for navigation pages (LCP < 2.5s, CLS < 0.1).

## Delivery Milestones
1. Implement foundational guard scaffolding (`ProtectedLayout`, middleware, session hook).
2. Build global navigation shell (header, sidebar, breadcrumbs) with desktop + mobile variants.
3. Integrate guided flow state and contextual Next/Previous actions.
4. Add edge-case handling (session expiry, offline, forbidden states).
5. Finalize accessibility and performance tuning with automated checks wired into CI.

## Open Questions
- Should we differentiate roles (e.g., admin vs. standard user) at launch, or treat all authenticated users the same?
- Do we need multi-workspace navigation (e.g., teams) in v1, or is a single personal workspace sufficient?
- What telemetry events are required for navigation analytics beyond those noted in the performance guide?

