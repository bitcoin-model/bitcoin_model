# Bitcoin24 Web App – Individual Micro Model Screen Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #17 – Individual micro model screen implementation.
- **Upstream dependencies:** Shared BTC & macro outputs ([BTC Model Screen Blueprint](./btc_model_screen.md), [Macro Model Screen Blueprint](./macro_model_screen.md)), scenario persistence services ([Scenario Persistence Controls](./scenario_persistence_controls.md)), authentication/onboarding ([Authentication & Account Persistence](./authentication_account_persistence.md), [Onboarding Wizard Blueprint](./onboarding_wizard.md)), guided navigation ([Guided Flow Blueprint](./guided_model_flow.md), [Route Guarding & Navigation](./route_guarding_navigation.md)), pricing infrastructure ([Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md)), and live price onboarding ([Live Price Onboarding Integration](./live_price_onboarding_integration.md)).
- **Downstream impact:** Corporate, institution, and nation-state models reuse table/chart primitives and scenario persistence patterns established here; shared UI components (task 21) should draw from the abstractions proven in this screen.

## 1. Objectives
1. Deliver a modern, high-fidelity interface that mirrors the Excel "Individual" sheet while embracing the Bitcoin24 design system.
2. Enable users to explore preset strategies (Normie → Triple Maxi), customize assumptions, and immediately view 21-year projections.
3. Provide rich comparisons (tables + charts) for 2045 outcomes and annual trajectories, integrated with auto-save and guided navigation cues.
4. Maintain performance and accessibility targets—virtualized data grids, responsive layout, keyboard navigation, and descriptive tooltips.

## 2. Scope
- Strategy selector with preset pills/cards (Normie, BTC 10%, BTC Maxi, Double Maxi, Triple Maxi) plus saved custom scenarios.
- Assumptions workspace including income, expenses, asset allocation, mortgage leverage, savings rate, and BTC conversion percentages.
- Annual forecast tables covering income statement, BTC purchases (surplus vs. debt), balance sheet evolution, and treasury holdings from start year → 2045.
- Scenario comparison grid summarizing 2045 metrics (net assets, BTC holdings, CAGR, LTV, debt) across strategies.
- Chart suite: (1) 2045 net assets bar chart, (2) 2045 BTC count bar chart, (3) 2024/Start-year → 2045 combo chart (net assets vs. BTC count).
- Action row with "Back: Macro", "Next: Save & Exit" (or "Next: Home"), scenario save/duplicate/delete, and CSV export.

## 3. Non-Goals
- Recreating workbook macro logic (handled in shared calculation services).
- Implementing corporate/institution/nation fiscal mechanics (covered in later tasks).
- Building analytics dashboards beyond the specified charts.

## 4. Data & State Dependencies
- Consume normalized assumption + result payload from calculation engine (`/models/individual`) keyed by strategy and scenario ID.
- Subscribe to shared pricing context (start year, live price timestamp) for contextual banners.
- Persist user edits via scenario persistence API (auto-save on blur + manual save CTA).
- Utilize Zustand/React Query slices defined in shared foundation for consistent cache updates and optimistic UI.

## 5. User Experience & Layout
- **Global shell:** Authenticated layout with breadcrumb `Home / Guided Flow / Individual Model`, stepper badge “Step 3 of 3”.
- **Hero KPI band:** Four KPI cards summarizing Current Year Net Assets, 2045 Net Assets, 2045 BTC Holdings, and CAGR, with status chips indicating delta vs. base strategy.
- **Strategy rail:** Horizontal pill selector featuring preset names, short descriptions, and preview stats; include "Custom" slot tied to saved scenarios.
- **Assumptions panel:**
  - Split into collapsible sections (Income & Savings, Assets & Liabilities, BTC Allocation, Mortgage & Debt, Taxes & Inflation).
  - Inline validation, helper tooltips referencing glossary, and quick-reset buttons to revert to preset defaults.
  - Support inline editing with formatted currency/percentage inputs, keyboard shortcuts, and accessible labels.
- **Results workspace:**
  - Sticky tab set toggling between Annual Projections and 2045 Snapshot.
  - Annual Projections tab hosts a virtualized table with columns grouped per section (Income, Expenses, Savings, BTC Purchases, Debt, Net Worth).
  - Provide row grouping for milestone years (initial, mid-point, 2045) and inline sparklines for quick trend scanning.
  - 2045 Snapshot tab displays comparison table plus KPI chips summarizing leverage ratio, debt service coverage, BTC % of net worth.
- **Charts row:**
  - Responsive grid of three chart cards with shared legend and color palette; support toggling logarithmic scale for BTC holdings.
  - Tooltips display formatted currency/BTC units and highlight the selected strategy vs. alternatives.
- **Insight drawer:** Optional right-rail containing textual commentary, assumption notes, and link to documentation.
- **Action footer:** Persistent bar with navigation (Back, Next/Home), Save controls, scenario menu, export button, and validation summary (e.g., warnings).

## 6. Interaction & Behavior Requirements
1. **Preset selection:** Switching presets should trigger optimistic loading state (<200ms), apply preset defaults, and log analytics event. Unsaved changes prompt confirmation before switching.
2. **Scenario save/load:** Provide dropdown of saved variants with rename/delete actions (per scenario persistence guide). Auto-save after debounce; show toast confirmations.
3. **Validation:** Enforce min/max on percentages (0–100%), non-negative asset values, mortgage caps (e.g., ≤90% LTV), with inline error states and aggregated summary in footer.
4. **Historical context:** Display banner "Projections start from [Start Year] using price $X as of [Date]" with "Adjust" link to open shared price picker.
5. **Guided flow integration:** Completing required fields enables "Next" button; if validation issues remain, show tooltip listing blockers. Navigating back to Macro retains unsaved edits via local draft store.
6. **Chart/table sync:** Hovering rows highlights corresponding chart series; selecting a chart bar highlights row. Provide keyboard navigation for charts (focusable data points).
7. **Accessibility:** Provide ARIA labels for scenario controls, ensure focus order flows logically, and support screen-reader descriptions for KPI deltas.

## 7. Performance Considerations
- Virtualize tables (e.g., React Virtualized) to maintain 60fps when scrolling 21-year projections.
- Memoize derived chart datasets using selectors; reuse color tokens from theming framework.
- Prefetch macro + BTC data when user enters screen to avoid blocking render; show skeleton loaders while awaiting responses.
- Batch scenario persistence requests and throttle analytics events to avoid network thrash during rapid edits.

## 8. Security & Privacy
- Respect auth guard requirements; redirect unauthenticated users to onboarding.
- Ensure sensitive scenario data is fetched via HTTPS with auth token/cookie; mask personally identifiable details in logs.
- Honor role-based access (future multi-role support) by checking scope before rendering advanced controls.

## 9. Testing Strategy
- **Unit tests:** Validate state reducers/selectors, input validation helpers, and chart data transformers using Vitest.
- **Component tests:** Use React Testing Library to ensure preset switching, validation states, and auto-save interactions behave correctly.
- **Integration tests:** Playwright flows for "load preset → modify → auto-save → navigate back → return with persisted values" and CSV export.
- **Visual regression:** Capture Storybook snapshots for key states (each preset, validation error, loading skeletons).
- **Performance checks:** Lighthouse CI focusing on Time to Interactive & interactivity metrics on this route; monitor React Profiler for hydration cost.

## 10. Analytics & Telemetry
- Track events: preset_selected, assumption_edited, scenario_saved, validation_error, chart_toggle, csv_exported.
- Capture performance metrics (time_to_first_render, table_scroll_latency) for monitoring.
- Log pricing context selections to correlate with outcome changes (respecting privacy guidelines).

## 11. Rollout Plan
1. Build foundational components (assumption sections, virtualized table, chart cards) in Storybook; verify design adherence.
2. Integrate API hooks and state slices; implement presets and auto-save flows behind feature flag.
3. Conduct internal QA with seeded sample scenarios; collect feedback from designers/product on accuracy vs. Excel sheet.
4. Enable route in staging; monitor analytics and performance dashboards.
5. Roll out to production with progressive exposure; gather user feedback for adjustments before cloning patterns for other micro/nation screens.

## 12. Open Questions
- Should we allow users to customize preset names or create additional custom strategies beyond the five defaults?
- Do we need per-year annotations (e.g., halving years) surfaced inline within the table or chart tooltips?
- What thresholds determine warning vs. critical status chips (e.g., debt-to-income) for 2045 snapshot KPIs?

Refer to the [Design System & Tech Stack](./design_system.md), [Theming & Motion Framework](./theming_motion_framework.md), [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md), [Shared App Foundation Blueprint](./shared_app_foundation.md), and [Performance & Accessibility Standards](./performance_accessibility_standards.md) for overarching design, technical, and quality guardrails that apply to this screen.
