# Bitcoin24 Web App – BTC Model Screen Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #16 – BTC model screen implementation.
- **Dependencies:** Shared calculation engine ([Shared App Foundation Blueprint](./shared_app_foundation.md)), authentication & scenario persistence ([Authentication & Account Persistence](./authentication_account_persistence.md), [Scenario Persistence Controls](./scenario_persistence_controls.md)), pricing infrastructure ([Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md)), live price onboarding ([Live Price Onboarding Integration](./live_price_onboarding_integration.md)), guided navigation ([Route Guarding & Navigation](./route_guarding_navigation.md), [Guided Flow Blueprint](./guided_model_flow.md)), and macro outputs ([Macro Model Screen Blueprint](./macro_model_screen.md)).
- **Downstream impact:** Macro and micro/nation screens rely on BTC scenario presets and 2045 KPIs defined here; ensure shared selectors surface these values consistently.

## Objectives
1. Deliver a modern, high-performance interface for selecting BTC scenarios, editing ARR assumptions, and visualizing 21-year trajectories.
2. Surface the workbook’s headline metrics (price, market cap, asset share) with responsive tables, KPI cards, and charts aligned with the design system.
3. Integrate live price defaults, auto-save, and guided flow cues so users can progress seamlessly into macro and downstream models.

## Scope
- Scenario presets (Bear, Base, Bull) with editable ARR parameters, 2024/Current price input, and toggles for advanced calculation tables.
- Yearly BTC output table (latest historical year → 2045) including ARR, price, and market cap columns with sticky headers and CSV export.
- KPI band for 2045 price, market cap, asset share, and ARR summary.
- Dual chart suite: combo line/bar trajectory (price & market cap) and 2045 market-cap comparison bars (BTC vs. benchmark assets).
- Integration with shared state, auto-save, and navigation actions (“Next: Macro Model”, “Back: Home”).

## Non-Goals
- Re-implementing macro calculations; this screen consumes outputs from shared services.
- Managing micro/nation scenario comparisons beyond providing BTC assumptions.
- Detailing authentication UX beyond leveraging existing onboarding & route guards.

## User Experience & Layout
- **Global chrome:** Authenticated shell with breadcrumb `Home / BTC Model` and guided badge “Step 1 of 3”.
- **Hero summary band:** Sticky top row of four KPI cards (Current Price, 2045 Price, 2045 Market Cap, BTC Share of Global Assets) pulling from shared selectors; include timestamp for live price source.
- **Scenario + inputs panel:**
  - Preset pills for Bear/Base/Bull with preview of ARR & price assumptions.
  - Optional dropdown for custom saved scenarios (per scenario persistence guide).
  - Editable fields: Current price (prefilled from live price service), 2025 ARR (or start-year ARR), annual reduction %, steady-state ARR target, steady-state year.
  - Toggle to reveal scenario matrix table (workbook columns E–G) for advanced users; collapsible with smooth motion per theming guide.
- **Results workspace:**
  - Yearly table using responsive virtualized grid; columns include Year, ARR, BTC Price, BTC Market Cap, Additional Notes (e.g., milestone callouts). Provide inline sparkline option for quick trend view.
  - Chart row with two cards: (1) 21-year trajectory combo chart (price line, market-cap bars), (2) 2045 market-cap comparison bar chart with micro-interactions and tooltips.
  - Insight drawer summarizing workbook commentary (e.g., ARR trends, asset share interpretation) with inline tooltips.
- **Actions:** Primary “Next: Macro Model” button, secondary “Save Scenario”, tertiary “Duplicate Scenario”, contextual “Reset to Preset” and “Download CSV”.

## Data & State Requirements
- Fetch scenario defaults from shared configuration module; include preset metadata (name, description, colors).
- Bind inputs to centralized BTC slice; update local state optimistically then trigger recalculation pipeline.
- Incorporate live price selection from onboarding/home flows; lock field when user opts into automatic daily updates.
- Align year axis with dynamic start year; ensure historical data (<= current year) displayed as read-only rows (italicized) and future years editable via assumptions.
- Expose selectors for 2045 KPIs and charts to other screens (e.g., macro screen referencing 2045 price).

## Validation & Error Handling
- Enforce numeric bounds (e.g., ARR between -50% and 500%, reduction between 0% and 50%).
- Warn users when manual overrides diverge significantly (>±20%) from presets; offer revert option.
- Show inline validation states (color-coded borders, accessible messages) and disable “Next” when critical fields invalid.
- Handle calculation failures with inline alert, retry button, and fallback to last known successful projection.

## Accessibility Considerations
- Ensure preset pills and toggles are keyboard navigable with clear focus rings per theming guide.
- Provide descriptive aria labels for charts (e.g., `aria-describedby` pointing to hidden data tables).
- Maintain WCAG AA contrast for text over gradients; offer textual fallback for KPI values.
- Announce auto-save success/failure through polite live regions.

## Performance Considerations
- Lazy load chart modules; prefetch macro screen bundle when user dwells on “Next”.
- Virtualize yearly table and memoize derived data to avoid expensive recalculations.
- Batch state updates when editing multiple fields rapidly; debounce recalculation to ~750ms.
- Cache preset data client-side and revalidate in background to keep interactions snappy.

## Analytics & Telemetry
- Track events: preset selection, manual override toggles, chart interactions, CSV downloads, Next/Back usage.
- Measure time-to-first-calculation, auto-save latency, and error frequency.
- Emit breadcrumbs for scenario changes to aid debugging in observability stack.

## Testing Strategy
- **Unit tests:** reducers/selectors for BTC state, validation helpers, KPI formatting utilities, component rendering.
- **Integration tests:** Playwright flow covering preset selection, manual edits, live price acceptance, auto-save, navigation to Macro screen.
- **Visual regression:** Snapshot hero band, tables, charts across light/dark modes.
- **Accessibility tests:** Axe scans and keyboard-only traversal; verify screen reader announcement of chart summaries.
- **Performance tests:** Lighthouse CI focusing on interaction latency; measure update time under rapid input changes.

## Security & Privacy
- Ensure scenario data mutations require valid auth token; protect live price endpoints with rate limiting.
- Sanitize user-entered notes or custom scenario names before persistence.
- Avoid exposing raw live price API keys to client; proxy through backend service.

## Rollout Plan
1. Implement layout with mocked data and motion specs; review against design system.
2. Integrate live price defaults and dynamic start-year data; verify historical rows lock correctly.
3. Wire recalculation engine and scenario persistence with optimistic updates.
4. Add charts and KPI cards; align styling with theming/motion guide.
5. Execute testing plan (unit, integration, visual, accessibility, performance).
6. Conduct stakeholder walkthrough comparing against Excel BTC sheet; adjust assumptions/labels as needed.
7. Release alongside macro screen to validate guided flow end-to-end; monitor telemetry for regressions.

## Open Questions
- Should users be able to create additional presets beyond Bear/Base/Bull, and how are they shared across accounts?
- Do we surface BTC dominance targets or other metrics beyond workbook scope (e.g., stock-to-flow)?
- What archival strategy do we need for historical scenario versions when auto-save is enabled?

