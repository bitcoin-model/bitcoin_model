# Bitcoin24 Web App – Nation-State Model Screens Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #20 – Nation-state model screen implementations (Indebted Nation, Wealthy Nation, United States).
- **Upstream dependencies:** Macro projections and BTC baseline ([Macro Model Screen Blueprint](./macro_model_screen.md), [BTC Model Screen Blueprint](./btc_model_screen.md)), micro-model abstractions ([Individual Micro Model Screen Blueprint](./individual_micro_model_screen.md), [Corporate Micro Model Screen Blueprint](./corporate_micro_model_screen.md), [Institution Micro Model Screen Blueprint](./institution_micro_model_screen.md)), pricing infrastructure ([Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md)), live price UX ([Live Price Onboarding Integration](./live_price_onboarding_integration.md)), authentication/navigation ([Authentication & Account Persistence](./authentication_account_persistence.md), [Route Guarding & Navigation](./route_guarding_navigation.md), [Guided Flow Blueprint](./guided_model_flow.md)).
- **Downstream impact:** Shared UI components (task 21) and validation/analytics layer (task 22) will extract and harden patterns surfaced by these screens; financial reporting outputs inform future reporting exports.

## 1. Objectives
1. Provide high-fidelity modeling workspaces for Indebted Nation, Wealthy Nation, and United States scenarios that respect each sheet’s fiscal assumptions and storytelling.
2. Allow policy makers to toggle treasury conversion levers, program durations, debt issuance strategies, and see immediate recalculation feedback.
3. Surface transparent annual projections, 2045 comparison tables, and chart suites that communicate fiscal balance shifts, BTC accumulation, and reserve composition.
4. Maintain usability for dense data (keyboard accessible tables, responsive layout, performant virtualization) while aligning with the Bitcoin24 visual design system.

## 2. Scope
- Separate routes for each nation with shared shell components but customized copy, preset values, and contextual banners (e.g., US government publication note).
- Assumption workspaces covering revenues, expenditures, GDP growth, inflation, cost of debt, treasury asset allocations, conversion percentages, program timing, surplus sweep toggles, and debt-financed BTC purchases.
- Annual results tables summarizing budget balance, debt stock, BTC purchases (initial program, surplus, debt issuance), reserve allocations, and key ratios (debt-to-GDP, BTC % of reserves).
- 2045 comparison grids showing reserves, BTC holdings, BTC %, debt position, and CAGR for all strategies and saved scenarios.
- Chart suite per nation: (1) 21-year reserves vs. BTC holdings combo chart, (2) 2045 reserve comparison, (3) 2045 BTC holdings comparison, (4) optional deficit vs. BTC purchases timeline mirroring workbook charts.
- Guided flow integration (Step 3 of 3 for nation-state path) with navigation footer, scenario persistence controls, CSV export, and validation summary.

## 3. Non-Goals
- Modeling intragovernmental transfer mechanics beyond workbook scope (e.g., social security trust accounting).
- Real-time macroeconomic data ingestion beyond BTC pricing; inflation/GDP assumptions remain user-driven.
- Implementing policy collaboration or workflow management features (approvals, comments) in initial release.

## 4. Data & State Dependencies
- Consume normalized nation-state calculation payloads from API endpoints such as `/models/nation/indebted`, `/models/nation/wealthy`, `/models/nation/us` keyed by strategy/scenario.
- Require macro baseline vectors (years, CPI, BTC price path) and fiscal context for hero KPIs.
- Persist edits through the scenario persistence service with optimistic updates, conflict handling, and audit trail.
- Subscribe to guided flow store for stepper state, validation gating, and navigation behavior.
- Leverage shared localization/formatting utilities for currency, trillions/billions abbreviations, and percentage displays.

## 5. User Experience & Layout
- **Global shell:** Authenticated layout with breadcrumb `Home / Guided Flow / Nation – <Name>` and hero banner containing context text (e.g., U.S. publication reference, debt-to-GDP note).
- **Hero KPI strip:** Cards for Current Year Treasury Assets, 2045 Treasury Assets, 2045 BTC Holdings, BTC % of Reserves, Debt-to-GDP, and Surplus/Deficit delta vs. base strategy.
- **Strategy rail:** Horizontal cards/pills for presets (e.g., Status Quo, Gradual Monetization, Aggressive BTC Reserve, Debt-Funded Accumulation) plus slots for saved custom strategies.
- **Assumption workspace:**
  - Collapsible groups: Fiscal Outlook, Treasury Assets, BTC Conversion Program, Surplus Allocation, Debt Strategy, Program Governance.
  - Inline charts for sensitivity (e.g., slider linking to quick preview) and tooltips referencing glossary definitions.
  - Percentage/currency inputs with formatting, spinner controls, keyboard shortcuts, and accessible labels.
- **Results workspace:**
  - Tabbed or sectioned layout for Annual Projections, 2045 Snapshot, Debt Schedule, and Sensitivity (future placeholder).
  - Annual table with sticky headers, virtualization for 21 rows, grouped columns for Revenue/Expense, BTC Purchases, Debt Stock, Reserve Composition.
  - Snapshot table comparing presets/saved scenarios with toggles for viewing by assets, BTC count, BTC %, or debt metrics.
- **Charts row:** Responsive grid of at least three charts with shared legend, dark-mode ready palette, ability to switch metrics (stacked vs. grouped bars).
- **Insight drawer:** Optional side panel summarizing fiscal takeaways, compliance notes, or recommended actions.
- **Action footer:** Persistent controls for Back (Institution or Macro depending on entry), Next (Completion/Home), Save, Save As, Duplicate, Delete, Export, and validation summary badge.

## 6. Interaction & Behavior Requirements
1. **Preset switching:** Provide optimistic updates with unsaved-change warnings; log analytics events for strategy selection.
2. **Scenario management:** Integrate scenario persistence drop-down with rename/delete actions and auto-save after debounce. Respect permissions per account.
3. **Validation rules:** Ensure percentages sum to 100%, debt issuance respects caps, surplus allocation cannot exceed available surplus, and treasury assets remain non-negative. Inline errors plus aggregate summary in footer.
4. **Program scheduling:** Support multi-year conversion programs with timeline editor (start/end year), displaying staged BTC purchase results in tables/charts instantly.
5. **Debt toggles:** Enabling debt-funded purchases reveals additional inputs (issuance cap, tenor, rate); disabling prompts to confirm removal of dependent calculations.
6. **Historical context:** Display banner noting start year, live BTC price used, and last fetch timestamp with link to price selector.
7. **Guided flow:** Activate Next button only when required fields validate; returning to Macro or Institution retains edits. Show progress indicator for Step 3 of 3.
8. **Accessibility:** Ensure keyboard navigation across strategy rail, input grids, tables, and charts; provide ARIA annotations for KPI deltas and chart tooltips; maintain WCAG AA contrast.

## 7. Architecture & Integration
- **Front end:** React/Next.js pages backed by shared layout component and reused table/chart components (task 21). Use Zustand/Redux slices for nation-state state with selectors for each panel.
- **API contracts:** Define TypeScript interfaces mirroring calculation responses; include metadata for validation thresholds and disclaimers.
- **Calculation service:** Extend backend module to compute fiscal projections per nation; reuse macro pricing and debt amortization utilities. Provide deterministic unit tests to match workbook outputs.
- **Caching:** Cache nation responses per scenario; bust cache when assumptions change. Support diff previews for unsaved changes.
- **Analytics:** Emit events for assumption edits, preset selections, validation failures, exports, and navigation transitions.

## 8. Performance & Resilience
- Virtualize tables for 21-year rows; precompute heavy calculations server-side. Use Suspense/skeletons while data loads.
- Implement retry/backoff for API calls; surface toast on failure with option to retry. Provide offline guardrails (read-only mode with cached scenarios).
- Monitor performance metrics (FCP, TTI) specifically on data-dense screens; ensure charts lazy-load below the fold.

## 9. Security & Compliance
- Ensure role-based access (future multi-role support) but currently enforce authenticated access only. Sanitize export data and respect content-security policies.
- Mask sensitive fiscal assumptions only if flagged (e.g., non-public data). Log audit entries for assumption edits.

## 10. Testing Strategy
- **Unit tests:** Validate UI components (form validation, table summaries), utility formatters, and API selectors.
- **Integration tests:** Playwright flows for each nation: preset switch, assumption edit, validation error, save scenario, export.
- **Contract tests:** Ensure backend responses match agreed schemas, including validation metadata.
- **Regression tests:** Snapshot comparisons vs. Excel baseline for key scenarios (year 0 and 2045 metrics).

## 11. Analytics & Telemetry
- Track events: `nation_preset_selected`, `nation_assumption_changed`, `nation_validation_error`, `nation_scenario_saved`, `nation_export_triggered`, `nation_navigation_next/back`.
- Capture performance metrics per screen (TTI, hydration time). Add heatmap/scroll depth analytics for layout tuning.

## 12. Rollout & Milestones
1. Finalize API contracts and data normalization (with calculation team).
2. Build shared components required (task 21) and integrate into Indebted Nation screen as pilot.
3. Expand to Wealthy Nation using same components; incorporate nation-specific copy and defaults.
4. Implement United States screen with publication banner and additional charts.
5. Conduct QA regression (unit + Playwright + workbook comparison).
6. Beta release to internal stakeholders; gather feedback.
7. Harden telemetry, address feedback, and promote to production.

## 13. Open Questions
- Do we require localization for currency (e.g., USD vs. EUR) per nation? If yes, integrate i18n early.
- Should debt issuance modeling include variable-rate instruments or remain fixed-rate as in workbook?
- Do we expose scenario sharing/export to PDF for policy briefings in MVP?
