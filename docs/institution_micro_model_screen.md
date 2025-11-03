# Bitcoin24 Web App – Institution Micro Model Screen Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #19 – Institution micro model screen implementation.
- **Upstream dependencies:** Macro and BTC projections ([Macro Model Screen Blueprint](./macro_model_screen.md), [BTC Model Screen Blueprint](./btc_model_screen.md)), corporate treasury patterns ([Corporate Micro Model Screen Blueprint](./corporate_micro_model_screen.md)), shared calculation services ([Shared App Foundation Blueprint](./shared_app_foundation.md)), authentication/persistence ([Authentication & Account Persistence](./authentication_account_persistence.md), [Scenario Persistence Controls](./scenario_persistence_controls.md)), navigation/onboarding ([Onboarding Wizard Blueprint](./onboarding_wizard.md), [Guided Flow Blueprint](./guided_model_flow.md), [Route Guarding & Navigation](./route_guarding_navigation.md)), pricing infrastructure ([Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md)), and live price UX ([Live Price Onboarding Integration](./live_price_onboarding_integration.md)).
- **Downstream impact:** Nation-state model blueprint will reuse allocation, debt, and comparison primitives defined here; shared UI component work (task 21) should extract mature table/chart abstractions validated on this screen.

## 1. Objectives
1. Deliver a modern institutional treasury modeling workspace that mirrors the Excel "Institution" sheet while embracing the Bitcoin24 design language.
2. Allow asset managers to toggle between strategy presets, customize portfolio conversion assumptions, and inspect immediate recalculation feedback.
3. Surface 21-year projections, 2045 comparison tables, and chart visualizations that clarify BTC accumulation, asset mix shifts, and leverage usage.
4. Maintain responsive, accessible, and performant interactions for dense financial tables across desktop and tablet breakpoints.

## 2. Scope
- Strategy selector with preset cards (e.g., Legacy Portfolio, Conservative Allocation, Balanced Allocation, BTC Maxi, BTC + Debt) plus slots for saved custom scenarios.
- Assumption workspace covering starting portfolio mix (cash, bonds, equities, alternatives, BTC), conversion percentages over time, debt-to-buy-BTC toggles, leverage caps, growth/return expectations, and operating expense ratios.
- Annual results tables for assets under management, BTC purchased via conversion/debt, debt schedules, treasury composition, and key ratios (BTC % of AUM, leverage, coverage).
- 2045 comparison grid summarizing AUM, BTC holdings, BTC % allocation, leverage, and CAGR for all strategies (presets + saved scenarios).
- Chart suite: (1) 21-year AUM vs. BTC holdings combo chart, (2) 2045 AUM comparison bar chart, (3) 2045 BTC holdings comparison bar chart mirroring workbook visuals.
- Guided navigation footer with Back/Next actions, scenario persistence controls, CSV export, and validation summary alerts.

## 3. Non-Goals
- Re-implementing individual/corporate/nation-specific fiscal mechanics beyond shared abstractions.
- Building multi-manager collaboration workflows (out-of-scope for initial release).
- Delivering bespoke risk analytics dashboards beyond the prescribed charts and tables.

## 4. Data & State Dependencies
- Consume normalized institution model payload from calculation API (`/models/institution`) keyed by strategy and scenario ID.
- Ingest macro context (start year, BTC price path, ARR) for consistent banners and KPI calculations.
- Persist edits through scenario persistence layer with optimistic updates, conflict detection, and audit metadata.
- Subscribe to guided flow state to determine stepper progress, validation gating, and navigation transitions.

## 5. User Experience & Layout
- **Global shell:** Authenticated layout with breadcrumb `Home / Guided Flow / Institution Model`, step badge showing "Step 3 of 3" when accessed via guided sequence.
- **Hero KPI strip:** Cards summarizing Current Year AUM, 2045 AUM, 2045 BTC Holdings, BTC % Allocation, and Portfolio CAGR with delta chips vs. base strategy.
- **Strategy rail:** Horizontal pills/cards showing preset title, short description, and quick metrics; include "Custom" slot tied to saved scenarios.
- **Assumptions workspace:**
  - Collapsible sections: Portfolio Composition, Conversion Programs, Debt Strategy, Return & Growth Assumptions, Operating Expenses & Fees, Governance & Constraints.
  - Inline tooltips linking to glossary; quick reset to preset defaults; numeric inputs with currency/percentage formatting and accessible labels.
  - Conditional reveals for debt issuance schedules, repayment tenor, and rate inputs when leverage toggles are enabled.
- **Results workspace:**
  - Tabbed interface: Annual Projections, 2045 Snapshot, Sensitivity (placeholder for future what-if analysis).
  - Annual Projections table with grouped columns (Assets, BTC Purchases, Debt, Coverage Ratios). Support column pinning, inline sparklines, and row grouping for milestone years.
  - 2045 Snapshot table comparing presets/saved scenarios with highlight state for active scenario and ability to toggle metrics (AUM, BTC count, BTC %).
- **Charts row:** Responsive grid of three chart cards with shared legend, dark-mode friendly palettes, and download/export actions.
- **Insight drawer:** Optional right rail summarizing key takeaways (e.g., debt utilization, allocation shift) with contextual links to documentation.
- **Action footer:** Persistent controls for Back (Macro), Next (Home/Completion), Save, Save As, Duplicate, Delete, Export CSV, plus validation summary and unsaved change indicator.

## 6. Interaction & Behavior Requirements
1. **Preset switching:** Provide sub-200ms optimistic state updates; confirmation modal appears if unsaved edits exist. Log analytics events for selection.
2. **Scenario management:** Integrate saved scenario dropdown with rename/delete actions; auto-save after debounce (≈1.5s) and surface toast confirmations.
3. **Validation:** Enforce percentage totals (portfolio mix sums to 100%), leverage caps, non-negative cash balances, and debt coverage thresholds. Display inline errors and aggregate summary in footer.
4. **Conversion scheduling:** Allow users to stage conversion programs (e.g., 20% over 4 years); timeline editor should recalculate annual BTC purchases instantly.
5. **Debt toggles:** Enabling debt-to-buy-BTC reveals additional inputs and recalculates tables/charts in real time; disabling should prompt to confirm removal of associated assumptions.
6. **Guided flow integration:** When required inputs are satisfied, Next button activates; validation tooltip enumerates blockers. Navigating back to Macro retains draft edits.
7. **Historical pricing context:** Banner indicates start year and live price used, with "Adjust" link to shared price selector component.
8. **Accessibility:** Ensure keyboard navigation across strategy rail, assumption inputs, tables, and charts; provide ARIA descriptions for KPI deltas and chart tooltips.

## 7. Performance Considerations
- Virtualize annual tables (React Virtualized/React Window) to maintain 60fps on dense datasets.
- Memoize derived datasets and reuse selectors to avoid redundant recalculations on input changes.
- Prefetch institution model data when user completes Macro step; use React Query for caching and background refresh.
- Lazy-load heavy chart libraries when container becomes visible; display skeleton loaders during async fetches.
- Batch persistence writes and throttle analytics events to reduce network chatter during rapid edits.

## 8. Security & Compliance
- Enforce authenticated access per route guarding blueprint; redirect unauthenticated users to onboarding.
- Protect API payloads over HTTPS with auth tokens/cookies; validate server-side inputs to prevent injection or malformed data.
- Limit telemetry to aggregated metrics (no PII); honor audit log requirements for scenario changes if enterprise accounts are introduced.

## 9. Testing Strategy
- **Unit tests:** Cover state reducers, validation helpers, conversion scheduling utilities, and chart data transformers via Vitest.
- **Component tests:** React Testing Library scenarios for preset switching, validation messaging, debt toggle workflows, and auto-save.
- **Integration tests:** Playwright flows for guided navigation (Macro → Institution → Save → Return), scenario lifecycle (create/duplicate/delete), and conversion schedule editing.
- **Visual regression:** Storybook snapshots for hero KPIs, assumption panels, tables, and charts across light/dark themes and responsive breakpoints.
- **Performance checks:** Lighthouse CI thresholds (TTI, LCP) plus React profiler to ensure virtualization prevents jank.

## 10. Analytics & Telemetry
- Track events such as institution_preset_selected, institution_assumption_edited, conversion_schedule_updated, debt_toggle_changed, institution_scenario_saved, validation_error_shown, and chart_exported.
- Emit guided flow milestones (institution_step_entered, institution_step_completed) for funnel tracking.
- Capture non-PII context (strategy, debt enabled, conversion duration) as event properties for cohort analysis.

## 11. Rollout & Milestones
1. **Design sign-off:** Validate Figma screens and interaction prototypes align with blueprint before engineering kickoff.
2. **Data contract readiness:** Finalize calculation API schema and sample payloads for presets/custom scenarios.
3. **Development sprint:** Implement UI, integrate APIs, wire persistence, and add tests (unit/component/integration).
4. **QA & accessibility:** Run manual QA, Lighthouse/Axe scans, and cross-browser/device checks; address issues prior to release.
5. **Release & observability:** Deploy behind feature flag, monitor analytics and logs, collect feedback, then graduate to general availability.
