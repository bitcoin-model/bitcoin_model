# Bitcoin24 Web App – Macro Model Screen Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #15 – Macro model screen implementation.
- **Dependencies:** Shared calculation engine ([Shared App Foundation Blueprint](./shared_app_foundation.md)), authentication and scenario storage ([Authentication & Account Persistence](./authentication_account_persistence.md)), pricing infrastructure ([Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md)), guided navigation ([Route Guarding & Navigation](./route_guarding_navigation.md), [Guided Flow Blueprint](./guided_model_flow.md)), and live price onboarding ([Live Price Onboarding Integration](./live_price_onboarding_integration.md)).
- **Downstream impact:** BTC screen, micro/nation model screens, and scenario comparisons depend on macro outputs and should consume shared selectors derived here.

## Objectives
1. Provide an intuitive, high-performance interface for editing macroeconomic assumptions that drive the entire workbook.
2. Surface computed outputs (BTC price path, market capitalization, asset allocation, government program impacts) with modern visualizations and collapsible detail tables.
3. Keep the experience accessible, responsive, and consistent with the design system while integrating auto-save, scenario management, and guided flow cues.

## Scope
- UI layout for macro assumptions, monetization sliders, conversion programs, and summary KPIs.
- Rendering of yearly BTC trajectory table, asset allocation matrices, and supporting calculations with expand/collapse controls.
- Two primary chart families: price/market-cap time series and asset-share comparisons.
- Integration with shared state so edits trigger recalculation and persistence.
- Skeleton/loading, optimistic updates, and error handling for computation or persistence failures.

## Non-Goals
- Re-implementing the pricing ingestion service or historical data sync (covered in pricing blueprints).
- Detailing BTC or downstream model screens beyond how they consume macro outputs.
- Designing analytics dashboards; only instrumentation hooks required for UX/performance tracking are in scope.

## User Experience & Layout
- **Global chrome:** Within the authenticated shell with breadcrumb `Home / Macro Model`. Display guided-step badge “Step 2 of 3” when user is mid-flow (per [Guided Flow Blueprint](./guided_model_flow.md)).
- **Hero summary band:** Sticky top section with key KPIs (Current BTC Price, 2045 BTC Price, 2045 BTC Market Cap, Bitcoin Share of Global Assets) using KPI card component defined in the design system.
- **Assumption grid:** Two-column responsive layout (collapsing to stacked on <1024px) with grouped panels:
  - *Scenario selection:* Toggle preset cases (Bear/Base/Bull) sourced from workbook `Macro!C7:E9`. Show pill buttons with preview of ARR/Inflation values.
  - *Inflation, innovation, inefficiency inputs:* Numeric sliders with direct input fields, including tooltips referencing workbook rationale.
  - *Asset monetization sliders:* Multi-column table with slider inputs for Gold, Equity, Bonds, Real Estate, Fiat, etc. Provide quick reset to preset values.
  - *Government programs:* Toggle and percentage inputs for Treasury Conversion, Conversion Program, Debt Monetization, with contextual helper text.
- **Results workspace:** Tabbed or sectioned area containing:
  - *BTC price & market cap table:* Yearly table (latest historical year → 2045) with columns for Year, BTC Price, BTC Market Cap, ARR. Provide sticky header, virtualization for long tables, and ability to export CSV.
  - *Asset allocation matrix:* Table showing asset classes vs. year or final allocation (depending on workbook structure). Offer collapse to hide intermediate columns.
  - *Conversion program details:* Expandable drawers showing debt issuance, government program contributions, ARR breakdown, and any intermediate values (matching Excel supporting rows).
- **Charts:**
  - Combo line/bar chart for BTC price and market cap across projection years.
  - Stacked bar or donut chart for 2045 asset share comparisons (BTC vs. Gold vs. Equity, etc.).
  - Optional area chart for cumulative conversion program contributions if workbook data supports it.
- **Call-to-actions:** Next button leading to selected model screen, Save Scenario, Reset to Preset, Download CSV.

## Data & State Requirements
- Consume macro assumption defaults, scenario presets, and formula computation functions from shared app foundation modules.
- Maintain local UI state via centralized store (e.g., Zustand/Redux slice) synced with scenario persistence service.
- On change:
  1. Update local state and optimistic UI.
  2. Trigger recalculation via client-side engine or API call (depending on final architecture).
  3. Debounced auto-save (e.g., 1.5s) to scenario endpoint when authenticated.
- Ensure state references a `startYear` from dynamic pricing service; adjust table axis accordingly.
- Provide ability to revert to last saved scenario; show unsaved changes indicator when local state diverges.

## Validation & Error Handling
- Range validation for percentage inputs (0–100%), ARR bounds, inflation/innovation rate limits, and numeric constraints pulled from workbook guardrails.
- Inline error messages with accessible descriptions; disable Save/Next when validations fail.
- Handle calculation errors by showing inline banner with retry option; log to observability platform per [Performance & Accessibility Standards](./performance_accessibility_standards.md).
- Gracefully degrade charts/tables when data unavailable (show skeletons or fallback text).

## Accessibility Considerations
- Ensure keyboard navigation through all controls; provide clear focus states consistent with theming guide.
- Use semantic headings for section hierarchy and ARIA roles for tabs, accordions, and charts (including text alternatives).
- Provide high-contrast mode support; verify color ratios meet WCAG AA.
- Offer screen-reader friendly descriptions for KPI cards and chart data (e.g., hidden table summary or “View data” button).

## Performance Considerations
- Lazy load heavy chart modules; utilize suspense/skeleton states defined in theming/motion guide.
- Virtualize tables for >20 rows; limit re-renders via memoized selectors.
- Batch state updates and throttle recomputation to maintain 60fps interactions.
- Prefetch downstream model screen bundles when user dwells on CTA (guided flow optimization).

## Analytics & Telemetry
- Track events: scenario preset selection, individual assumption adjustments (bucketed), chart view toggles, collapsible section usage, Next/Back navigation.
- Record auto-save success/fail metrics, calculation duration, and error occurrences.
- Feed data into observability pipeline defined in performance standards for monitoring.

## Testing Strategy
- **Unit tests:** Cover selector logic, validation rules, reducers/actions, and UI component rendering for key panels.
- **Integration tests:** Use Playwright/Cypress to simulate editing assumptions, verifying recalculated outputs, navigating Next/Back, and ensuring auto-save triggers.
- **Visual regression:** Capture baseline snapshots of KPI cards, tables, and charts with Chromatic/Loki.
- **Accessibility tests:** Axe automated scans plus keyboard-only walkthroughs.
- **Performance tests:** Measure render and update times under realistic input churn using Lighthouse CI with custom scripts.

## Security & Privacy
- Ensure sensitive scenario data stored securely; guard API calls with auth tokens and CSRF protections.
- Sanitize user inputs server-side before persisting; enforce rate limiting on recalculation endpoints.
- Obfuscate or redact personally identifiable information in telemetry per privacy policy.

## Rollout Plan
1. Implement skeleton UI with mocked data to validate layout and interactions.
2. Integrate with live calculation APIs and dynamic pricing service; verify parity with Excel outputs.
3. Wire auto-save and scenario persistence, including conflict resolution for multi-tab usage.
4. Conduct UX review against design system; refine animations and responsive behavior.
5. Run full QA suite (unit, integration, accessibility, performance) before promoting to staging.
6. Beta test with internal stakeholders; gather feedback and iterate on usability or performance issues.
7. Launch alongside BTC screen implementation to enable end-to-end guided flow testing.

## Open Questions
- Final decision on where macro calculations execute (client vs. server) and latency implications?
- Should advanced users access formula audit logs or download raw intermediate CSVs?
- Do we expose version history for macro assumptions beyond scenario snapshots?

