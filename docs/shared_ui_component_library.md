# Bitcoin24 Web App – Shared UI Component Library Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #21 – Shared UI component library.
- **Upstream dependencies:** Design system tokens ([Design System & Tech Stack](./design_system.md)), theming/motion framework ([Theming & Motion Framework](./theming_motion_framework.md)), UX interaction patterns ([Flow-Specific UX Interactions](./flow_specific_ux_interactions.md)), and screen blueprints (BTC, Macro, micro models, Nation-state).
- **Downstream impact:** Enables rapid implementation of remaining screens, ensures consistent accessibility/performance, and feeds validation/guidance instrumentation (task 22).

## 1. Objectives
1. Deliver a reusable component suite aligned with the Bitcoin24 visual language, covering layout primitives, form controls, tables, charts, navigation, and feedback patterns.
2. Centralize accessibility, motion, and responsive behaviors to avoid duplicative implementations across screens.
3. Support design token-driven theming (light/dark), animation presets, and data visualization palettes consistent with Microstrategist-inspired aesthetics.
4. Provide documentation, Storybook coverage, and testing harnesses so product teams can adopt components confidently.

## 2. Scope
- **Foundations:** Typography, spacing, color utilities, elevation, shadows, gradients exposed via Tailwind plugins or CSS variables.
- **Layout primitives:** Page shell, section containers, grids, split panels, sticky headers/footers.
- **Navigation elements:** Breadcrumbs, steppers, tabs, pill selectors, action footers, global header with auth state.
- **Form controls:** Text/number inputs, sliders, segmented controls, dropdowns, toggles, date pickers, inline validation messaging, tooltips.
- **Data display:** KPI cards, statistic tiles, accordions, collapsible panels, alert banners, badge chips, toast notifications.
- **Tables:** Virtualized data grid with column pinning, grouping, sort/filter, inline editing, skeleton loading.
- **Charts:** Wrapper around chosen charting library (Recharts/ECharts) with Bitcoin24 theme, responsive sizing, shared legend, export actions.
- **Feedback:** Skeletons, shimmer loaders, progress bars, success/error toasts, modal dialogs.
- **Utilities:** Formatting helpers (currency, percentages, abbreviations), analytics event helpers, keyboard focus management hooks.

## 3. Non-Goals
- Building domain-specific components that belong inside individual screens (e.g., bespoke conversion timeline editors) unless they generalize across models.
- Delivering a public design system site; documentation via Storybook/MDX is sufficient for internal use.
- Supporting IE11 or outdated browsers beyond agreed baseline (modern evergreen browsers).

## 4. Architecture & Tooling
- Component library implemented in TypeScript within the front-end workspace (e.g., `/apps/web/src/components` or `/packages/ui`).
- Storybook configured with dark/light themes, accessibility addons, controls, and Chromatic/visual regression pipeline.
- Testing via Vitest/Jest + React Testing Library; integration snapshots using Storybook testing utilities.
- Linting with ESLint + stylelint + Tailwind lint plugin; enforce design token usage via custom ESLint rules where possible.
- Documentation in MDX per component, linking to usage guidelines and interaction notes.

## 5. Accessibility & Internationalization
- Components must support keyboard navigation, ARIA attributes, focus rings, and high-contrast mode.
- Provide localization hooks (e.g., `aria-label` translation props, formatters) but actual translation strings handled by consumer.
- Validate color contrast per component with automated Axe tests; ensure motion can be reduced when `prefers-reduced-motion` is set.

## 6. Performance Considerations
- Tree-shakeable exports via barrel files; prefer headless patterns where appropriate to reduce bundle size.
- Lazy-load heavy chart libraries; provide lightweight skeleton wrappers.
- Ensure virtualization for large data tables and avoid excessive re-renders via memoization/hooks discipline.

## 7. Integration Strategy
1. Audit existing screen blueprints to identify shared needs and prioritize component backlog.
2. Establish naming conventions and file structure (e.g., `components/ui`, `components/data`, `components/layout`).
3. Build foundational primitives first (layout, typography, cards) followed by complex components (data grid, charts).
4. Pair with Macro/BTC screen implementation to validate components in production context.
5. Provide migration guidance for future contributions (e.g., PR checklist ensuring component reuse).

## 8. Testing Strategy
- **Unit tests:** Props handling, accessibility behavior, conditional rendering, theming variations.
- **Visual regression:** Storybook snapshots (Chromatic/Applitools) for critical components (cards, tables, charts) across themes.
- **Integration:** Smoke tests embedding components within sample pages (guided flow demo) to ensure composition works.
- **Performance tests:** Measure render timing for data grid and chart wrappers with representative datasets.

## 9. Documentation & Developer Experience
- Maintain Storybook with usage examples tied to real modeling scenarios (e.g., KPI card with BTC price, table with macro projections).
- Provide MDX notes on dos/don’ts, accessibility tips, and theming instructions.
- Publish component changelog and versioning strategy (SemVer within mono-repo) to track breaking changes.
- Offer code generators or snippets for common patterns (e.g., create new card variant) via CLI scripts or Plop.

## 10. Analytics & Telemetry
- Expose optional hooks for instrumentation (e.g., `onEvent` callbacks) so consumer screens can log interactions consistently.
- Log component-level warnings when misuse detected (e.g., missing required aria labels in dev mode).

## 11. Rollout Plan
1. Finalize component architecture and tooling configuration.
2. Build MVP set (layout shell, KPI card, button, input, accordion, chart wrapper, data table) and release internally.
3. Integrate components into Macro/BTC screens to validate ergonomics.
4. Expand library for micro/nation screens based on blueprint requirements.
5. Establish contribution guidelines, PR templates, and review checklist focused on reuse/accessibility.
6. Monitor adoption via codebase linting (flag duplicate implementations) and gather developer feedback for iteration.

## 12. Open Questions
- Do we publish the library as a separate package for potential external usage, or keep it internal-only?
- Should we integrate design token sync with Figma (e.g., via Tokens Studio) in the initial milestone or later?
- How aggressively do we enforce usage (e.g., ESLint bans on raw HTML tags for buttons/inputs outside library)?
