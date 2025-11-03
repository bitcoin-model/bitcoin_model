# Live Price Onboarding Integration Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #14 – Live price onboarding integration.
- **Related guides:** [Onboarding Wizard](./onboarding_wizard.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md), [Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md), [Scenario Persistence Controls](./scenario_persistence_controls.md).

This blueprint defines how the onboarding experience, home dashboard, and modeling entry points should surface live BTC pricing, historical anchors, and custom overrides. It builds on the pricing data pipelines and guided flow mechanics established in the complementary documents listed above.

## Objectives
1. Present today’s BTC price (with timestamp and source) during onboarding and on the home dashboard so users can anchor scenarios with minimal friction.
2. Allow users to accept the live price, select a historical date, or input a custom value—persisting their choice into their default scenario.
3. Ensure all downstream flows (BTC → Macro → model) receive the selected starting price automatically, while still letting users adjust it later with clear audit context.
4. Handle outages or stale data gracefully by falling back to cached values, surfacing status messaging, and prompting users when manual confirmation is required.

## Scope
- Onboarding wizard price selection step, including live data fetch, historical picker, and custom input validation.
- Home dashboard widgets summarizing current price selection and allowing quick adjustments.
- Shared state and API contracts that propagate the chosen price to guided flow steps and scenario persistence.
- UX copy, analytics, and accessibility considerations specific to live price handling.

## Non-Goals
- Changing the underlying pricing ingestion jobs or historical data storage (covered by tasks #12 and #13).
- Implementing advanced market visualizations beyond the selection UI (charts remain part of modeling screens).
- Supporting sub-daily price updates; daily close is sufficient for onboarding and scenario seeding.

## Functional Requirements
1. **Live Price Retrieval**
   - Fetch latest price via `/api/pricing/latest` (see [External BTC Price Ingestion](./external_btc_price_ingestion.md)).
   - Display status chip (Fresh, Stale, Error) with tooltip describing data recency.
   - Show skeleton loader until data resolves; if request fails after retries, display fallback price with warning state.
2. **Price Selection Options**
   - Radio options: `Use live price`, `Pick historical snapshot`, `Enter custom price`.
   - Historical selection uses date picker limited to available historical dataset returned from `/api/pricing/history` (to be added as part of dynamic base-year implementation).
   - Custom entry validates currency formatting, enforces positive value, and respects locale-aware separators.
3. **Persistence & Propagation**
   - On confirmation, call `/api/scenarios` with payload `{ startingPriceSource, startingPriceValue, startingPriceDate }` to seed or update the active scenario.
   - Store selection in onboarding state (session storage) and global scenario store so the BTC and Macro screens automatically reflect it.
   - Display confirmation toast (“Starting price saved”) with undo option that reverts to live price.
4. **Home Dashboard Integration**
   - Add “Current Starting Price” card summarizing value, date, source, and last updated timestamp.
   - Include quick actions: `Refresh to live`, `Adjust`, `View history`. Adjust opens the same modal used in onboarding for consistency.
   - Highlight discrepancies (e.g., live price has moved >X% since saved) with alert banner prompting user to reconsider their anchor.
5. **Guided Flow Hooks**
   - BTC and Macro screens display banner referencing selected starting price with “Edit” button linking back to price modal.
   - When user edits from within flow, reuse same API/state logic and update breadcrumbs so progress indicator remains accurate.
   - Record analytics event (`starting_price.updated`) with metadata: source, delta from previous value, flow location.
6. **Resilience & Offline Handling**
   - Cache last successful price selection locally so UI can render even when offline; mark status as “Offline” and disable live refresh until connection returns.
   - Provide manual entry path when live data unavailable—pre-fill with last known price but require confirmation checkbox acknowledging stale data.

## UX & Visual Guidelines
- Use card layout consistent with design system: glassmorphism background, accent gradient highlights, legible typography in dark theme.
- Progress indicator reflects price selection as Step 3 in onboarding (after account creation).
- Tooltips describe pros/cons of each selection option; include info icon linking to FAQ.
- Accessibility: ensure radio buttons, date picker, and numeric input have clear labels, helper text, and error messaging; respect `prefers-reduced-motion`.

## Analytics & Telemetry
- Track events for viewing price step, selecting each option, confirming selection, encountering live fetch errors, and overriding from downstream screens.
- Include metadata: `source` (`live`, `historical`, `custom`), `priceValue`, `priceDate`, `deltaFromLive` when applicable.
- Log warnings when scenario price remains unchanged for >30 days to prompt follow-up in future iterations.

## Testing Strategy
- **Unit Tests:** selection reducer, validation schemas, API handlers for price persistence.
- **Component Tests:** render live/historical/custom paths with MSW mocks, verifying UI states and toasts.
- **Integration Tests:** Playwright scenario covering onboarding selection, home dashboard update, and BTC screen banner reflection.
- **Accessibility Tests:** Axe scans for modal and card, manual keyboard navigation across date picker and inputs.

## Delivery Milestones
1. Implement shared price selection modal component with state management and validation hooks.
2. Wire onboarding wizard to use component, integrating live API calls and persistence.
3. Extend home dashboard with current price card and adjustment actions.
4. Update BTC/Macro screens to consume shared state and surface edit banner.
5. Complete QA (unit/component/e2e/accessibility) and finalize analytics instrumentation.

## Open Questions
- What threshold should trigger “price drift” alerts (e.g., >5% change since saved)?
- Should historical picker default to the most recent completed year or allow arbitrary dates back to dataset start?
- Do we require email confirmation before allowing custom price entry (for spam mitigation)?
- How should we communicate when live price is unavailable for extended periods—banner vs. modal vs. email notification?

For implementation details on the surrounding systems, refer to the [Onboarding Wizard](./onboarding_wizard.md), [User Home Page](./user_home_page.md), [Guided Model Flow](./guided_model_flow.md), [Scenario Persistence Controls](./scenario_persistence_controls.md), [Dynamic Base-Year Handling](./dynamic_base_year_handling.md), and [External BTC Price Ingestion](./external_btc_price_ingestion.md) blueprints.
