# Bitcoin24 Web App – Corporate Micro Model Screen Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #18 – Corporate micro model screen implementation.
- **Upstream dependencies:** Macro/BTC outputs ([Macro Model Screen Blueprint](./macro_model_screen.md), [BTC Model Screen Blueprint](./btc_model_screen.md)), shared calculation engine ([Shared App Foundation Blueprint](./shared_app_foundation.md)), authentication & persistence ([Authentication & Account Persistence](./authentication_account_persistence.md), [Scenario Persistence Controls](./scenario_persistence_controls.md)), guided navigation ([Guided Flow Blueprint](./guided_model_flow.md), [Route Guarding & Navigation](./route_guarding_navigation.md)), pricing infrastructure ([Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md)), and onboarding/live price flows ([Onboarding Wizard Blueprint](./onboarding_wizard.md), [Live Price Onboarding Integration](./live_price_onboarding_integration.md)).
- **Downstream impact:** Institution ([Institution Micro Model Screen Blueprint](./institution_micro_model_screen.md)) and nation-state blueprints will reuse treasury, debt, and comparison components validated here; shared UI library (task 21) should uplift successful patterns from this screen.

## 1. Objectives
1. Provide a high-fidelity corporate treasury modeling workspace that mirrors the Excel "Corporate" sheet while embracing the Bitcoin24 design system.
2. Allow users to toggle between strategy presets (e.g., Legacy Treasury, Hybrid, BTC Maxi) and customize corporate financial assumptions with immediate recalculation feedback.
3. Surface 21-year projections, 2045 comparisons, and chart visualizations that clarify how treasury conversion, debt usage, and share issuance affect long-term outcomes.
4. Maintain performance, accessibility, and responsiveness standards so finance teams can interrogate dense data tables across devices.

## 2. Scope
- Strategy selector with preset cards for the five workbook strategies plus slots for saved custom scenarios.
- Assumptions workspace covering revenue/cash flow, growth rates, valuation multiples, share dilution, treasury allocation, BTC conversion percentages, leverage, and debt terms.
- Annual results tables: income statement highlights, share price/market cap trajectory, treasury asset composition, BTC purchases (cash flow vs. debt), debt schedules, and share count changes.
- 2045 comparison grid summarizing share price, market cap, BTC holdings, treasury allocation mix, and CAGR for all strategies.
- Chart suite: (1) 2045 share price bar chart, (2) 2045 BTC treasury bar chart, (3) 21-year share price vs. BTC holdings combo chart mirroring Excel chart ranges.
- Guided navigation footer with Back/Next actions, scenario persistence controls, CSV export, and validation summary.

## 3. Non-Goals
- Re-implementing individual/institution/nation-specific fiscal logic (handled in their own tasks).
- Designing bespoke analytics dashboards beyond the prescribed tables/charts.
- Building advanced collaboration features (e.g., multi-user editing) in this iteration.

## 4. Data & State Dependencies
- Consume normalized corporate model payloads from calculation API (`/models/corporate`) keyed by strategy and scenario.
- Ingest macro context (start year, BTC price path, ARR) for consistent calculations and banners.
- Persist user edits through scenario persistence layer with optimistic updates and conflict resolution.
- Respect guided flow context to understand whether user arrived from Macro or Home screen.

## 5. User Experience & Layout
- **Global shell:** Authenticated layout with breadcrumb `Home / Guided Flow / Corporate Model`, step badge showing either "Step 3 of 3" (guided flow) or "Corporate Model" when accessed directly.
- **Hero KPI strip:** Cards summarizing Current Year Share Price, 2045 Share Price, 2045 BTC Treasury, BTC % of Treasury, and Equity CAGR. Include delta badges vs. baseline strategy.
- **Strategy rail:** Horizontal slider/pills with preset details (name, BTC allocation summary, risk tag). Provide "Custom" slot tied to saved variants.
- **Assumptions workspace:**
  - Collapsible sections: Company Profile (revenue/cash flow, growth, margins), Treasury Policy (cash allocation, BTC conversion, issuance), Capital Structure (debt terms, leverage caps), Equity Actions (buybacks/issuance), Tax & Expense assumptions.
  - Inline tooltips referencing glossary definitions and linking to supporting docs.
  - Input formatting for currency, percentages, multipliers; enforce accessible labels and descriptions.
- **Results workspace:**
  - Tabbed interface: Annual Projections, 2045 Snapshot, Sensitivity (future extension placeholder).
  - Annual Projections table grouped by category with frozen first column, virtualized rows, and sticky column summaries for quick scanning.
  - 2045 Snapshot table compares strategies using highlight states for selected strategy and saved custom scenarios.
- **Charts row:** Responsive grid containing the three required charts with shared legend alignment, toggle for logarithmic scaling, and downloadable PNG/CSV actions.
- **Insight drawer:** Optional right rail summarizing key insights (e.g., dilution impact, leverage ratio warnings) and referencing assumptions.
- **Action footer:** Persistent controls for Back (to Macro), Next (to guided completion or Home), Save, Save As, Duplicate, Delete, Export CSV, and aggregated validation messages.

## 6. Interaction & Behavior Requirements
1. **Preset switching:** Instant feedback (<200ms) applying preset defaults with optimistic skeleton states; confirm before discarding unsaved edits.
2. **Scenario management:** Integrate dropdown for saved corporate scenarios with rename/delete; auto-save after debounce (1.5s) and show toast confirmations.
3. **Validation:** Enforce percentage ranges (0–100%), leverage caps, non-negative treasury balances, and share issuance limits. Surface inline errors and summary list in footer.
4. **Debt handling:** When debt-to-buy-BTC toggles on, reveal additional controls (issuance schedule, interest rate) and update tables/charts in real time.
5. **Guided flow integration:** Completion of required fields enables Next button; show progress state when returning to Macro or Home. Preserve unsaved edits via local draft store.
6. **Historical pricing context:** Banner indicates start year and live price used; "Adjust" link opens shared price selector component.
7. **Chart/table synchronization:** Hovering table rows highlights relevant chart series; keyboard navigation supported via focusable data cells and ARIA descriptions.
8. **Accessibility:** Provide semantic headings, region landmarks, and skip links. Ensure color contrast for delta chips meets WCAG AA.

## 7. Performance Considerations
- Virtualize annual projection tables; memoize derived datasets and leverage React Suspense + skeleton loaders for asynchronous fetches.
- Prefetch corporate model data when user completes Macro step; cache results using React Query with background refetching.
- Defer heavy chart rendering until container is visible (Intersection Observer) to keep initial load snappy.
- Batch persistence updates and throttle analytics events to avoid network congestion during rapid edits.

## 8. Security & Compliance
- Protect API calls with authenticated tokens/cookies per route guarding blueprint.
- Mask sensitive corporate identifiers in telemetry; store only aggregated metrics needed for analytics.
- Validate server-side inputs to prevent injection or malicious payloads; enforce rate limits on scenario CRUD endpoints.

## 9. Testing Strategy
- **Unit tests:** Validate reducers/selectors, validation utilities, and chart data transformers via Vitest.
- **Component tests:** React Testing Library coverage for preset switching, validation messaging, debt toggle interactions, and scenario persistence prompts.
- **Integration tests:** Playwright flows for guided navigation (Macro → Corporate → Save → Return) and for scenario lifecycle (create, duplicate, delete).
- **Visual regression:** Storybook snapshots for hero KPIs, assumption panels, tables, and charts in light/dark themes.
- **Performance tests:** Lighthouse CI thresholds on this route (TTI, LCP) plus React profiler checks for table virtualization.

## 10. Analytics & Telemetry
- Track events: corporate_preset_selected, corporate_assumption_edited, corporate_scenario_saved, debt_toggle_changed, chart_exported, validation_error_shown.
- Capture performance metrics (render_time, table_scroll_latency) and scenario outcome deltas for product analytics.
- Log guided flow progression (step_completed) with timestamps to identify friction points.

## 11. Rollout Plan
1. Build assumption panel, KPI cards, and chart components in Storybook; validate against design specs.
2. Integrate API hooks and state slices; implement presets and scenario persistence, behind feature flag if needed.
3. QA data accuracy by reconciling against Excel corporate sheet outputs for baseline strategies.
4. Conduct accessibility review (keyboard navigation, screen reader labels) and performance tuning.
5. Release to staging, monitor analytics/feedback, then graduate to production with progressive rollout.

## 12. Open Questions
- Should we support importing corporate financials via CSV to seed assumptions, or manual entry only for v1?
- Do we need role-based access (e.g., corporate vs. advisor) to restrict certain controls such as share issuance toggles?
- How should we handle scenarios where valuation multiple inputs imply negative share price outcomes—warn or hard-block?

Refer to the [Design System & Tech Stack](./design_system.md), [Theming & Motion Framework](./theming_motion_framework.md), [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md), [Performance & Accessibility Standards](./performance_accessibility_standards.md), and [Shared App Foundation Blueprint](./shared_app_foundation.md) for global design, technical, and quality guardrails.
