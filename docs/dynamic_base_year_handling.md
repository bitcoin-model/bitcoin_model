# Bitcoin24 Web App – Dynamic Base-Year Handling

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #12 – Dynamic base-year handling.
- **Dependencies:** Shared data ingestion & calculation services ([Shared App Foundation](./shared_app_foundation.md)), scenario persistence & auth ([Authentication & Account Persistence](./authentication_account_persistence.md); [Scenario Persistence Controls](./scenario_persistence_controls.md)), guided flow UX ([Guided Model Flow](./guided_model_flow.md)), live price onboarding experience ([Live Price Onboarding Integration](./live_price_onboarding_integration.md)), and performance guardrails ([Performance & Accessibility Standards](./performance_accessibility_standards.md)).
- **Downstream impact:** BTC, Macro, micro, and nation-state models; onboarding wizard; home dashboard; charts and KPI cards; live price integration ([External BTC Price Ingestion](./external_btc_price_ingestion.md); [Live Price Onboarding Integration](./live_price_onboarding_integration.md)).

## Objectives
1. Replace the static 2025 assumption grid with a time-aware price backbone anchored to the latest historical BTC close.
2. Preserve immutable historical values for completed years while recalculating forward-looking projections from the detected base year.
3. Provide consistent time axes, ARR/CAGR calculations, and chart inputs across all modules despite rolling base years.
4. Maintain save/load integrity so persisted scenarios reopen with the same base-year context even as new historical data arrives.

## Scope
- Historical BTC price storage, indexing, and versioning inside the application data layer.
- Calculation engine adjustments to derive start year and projection windows dynamically.
- API responses that surface the current base year, last historical date, and aligned time vectors to the front end.
- Migration strategy for existing scenarios (pre-dynamic launch) to adopt the new pricing backbone.
- UI cues informing users when historical vs. projected data is displayed (shared with UX docs).

## Non-Goals
- Implementing external price fetching (covered by task #13 spec).
- Redesigning charts/visual styling beyond what's required to handle variable ranges.
- Adding volatility modeling or alternative asset data.

## Functional Requirements
1. **Historical price ledger**
   - Maintain a table keyed by `date` (UTC) with `close_usd`, `source`, and `ingested_at` metadata.
   - Seed ledger with at least 2010-01-01 → current day historical prices from a vetted source.
   - Guarantee uniqueness per date; conflict resolution should favor the most recently ingested value while retaining audit history.
2. **Base-year discovery**
   - Determine the base year as `max(historical_date).year`.
   - Expose the base year, latest price date, and close value via a `/pricing/base-year` endpoint and shared server utility.
   - Support override for regression tests (e.g., force base year) via environment flag.
3. **Projection window alignment**
   - Dynamically build the year vector as `[base_year, base_year + 1, …, base_year + 20]` for the standard 21-year horizon.
   - Retain historical data points for years < base_year (e.g., show 2024 actuals when base year is 2025) but mark them as “locked/historical.”
   - Ensure CAGR/ARR calculations use historical actuals as the year-0 anchor and operate over the dynamic horizon.
4. **Model recalibration**
   - Update macro & BTC engines to pull starting price and ARR seeds from the historical ledger rather than workbook constants.
   - Adjust micro/nation models to query the shared year vector and base-year price before applying their own assumptions.
   - Guarantee cross-sheet references (e.g., Macro feeds BTC, BTC feeds micro) are versioned off the same base year to prevent drift.
5. **Scenario persistence compatibility**
   - When saving a scenario, store the base year and `historical_price_snapshot` (date + price) used during calculation.
   - On reload, if the snapshot matches current ledger, proceed normally; if ledger has advanced, prompt user to opt-in to rebase scenario or continue with archived snapshot.
6. **Data migration**
   - Provide a script to migrate legacy scenarios (without base-year metadata) by defaulting to the historical snapshot nearest their original start price.
7. **Observability & alerts**
   - Emit metrics/logs when base year advances (new calendar year) or when ledger gaps are detected.
   - Alert engineering if ledger lacks data for the current day by market close (configurable SLA).

## Data Model & Storage Strategy
- **`pricing_daily` table** (PostgreSQL / Supabase):
  - `date` DATE PRIMARY KEY.
  - `close_usd` NUMERIC(18,2).
  - `source` TEXT.
  - `ingested_at` TIMESTAMP WITH TIME ZONE DEFAULT `NOW()`.
  - `checksum` CHAR(32) for data integrity.
- **`pricing_daily_audit` table** to capture overwritten entries with `version_id`, `date`, `close_usd`, `source`, `ingested_at`, `replaced_at`.
- Add composite index on `(date DESC)` for fast latest lookup.
- Provide SQL view `pricing_latest` returning the single most recent record.

## Calculation Engine Updates
- Extend shared calculation service (`@bitcoin24/core/pricing`) with:
  - `getLatestHistoricalPoint()` → `{ date, closeUsd, baseYear }`.
  - `buildYearAxis({ horizon })` → `number[]` using base year.
  - `getHistoricalSeries({ yearsBack })` → array of `{ year, value }` for context charts.
- Modify macro/BTC modules to accept `baseYear` and `startPrice` as required parameters; throw explicit error if missing.
- Introduce regression tests ensuring:
  - When the ledger’s latest entry rolls to Jan 1 of a new year, year axis shifts accordingly and calculations remain continuous.
  - Replaying historical data (e.g., last day of prior year) locks base year to prior year for reproducible scenario testing.

## API Surface
- `GET /api/pricing/base-year` – returns `{ baseYear, latestDate, latestPrice, historicalContextRange }`.
- `GET /api/pricing/historical?start=YYYY-MM-DD&end=YYYY-MM-DD` – paginated historical series for chart overlays.
- `POST /api/pricing/snapshot` – (internal) capture scenario snapshot; accepts optional `scenarioId` to tie to persistence.
- All endpoints require auth for write operations; read endpoints can be cached publicly for marketing pages that show charts.

## Front-End Integration
- Global state slice `pricing` stores `baseYear`, `latestPrice`, `latestDate`, `historicalSeries` (lightweight) and emits events when base year changes.
- Provide React hooks `useBaseYear()` and `useHistoricalPrice(date)` to consume data without recalculating in each screen.
- Update onboarding and home dashboards to fetch base year on mount and display “Projections begin from {baseYear} using ${latestPrice} close recorded on {latestDate}.”
- Charts/tables must visually differentiate historical vs. projected years (e.g., using muted colors or pattern fills as outlined in the [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md) guide).

## UX & Copy Considerations
- Add tooltip copy explaining that historical data is locked and new projections will auto-adjust when the calendar advances.
- When base year shifts, display toast/banner summarizing change and offering to update saved scenarios.
- Ensure accessibility by conveying historical/projected distinction via icons and aria labels, not color alone.

## Performance Considerations
- Cache `/api/pricing/base-year` responses at the edge (60s TTL) to reduce repeated DB hits.
- Lazy-load large historical series only when charts request extended ranges.
- Validate that year-axis recalculations do not trigger unnecessary re-renders; leverage memoized selectors.

## Security & Compliance
- Restrict write access (seeding/migrations) to service accounts.
- Validate inputs on historical ingestion to avoid SQL injection or malformed data.
- Log administrative actions in audit trail with user IDs for compliance.

## Testing Strategy
- **Unit tests:** pricing utilities, year-axis builders, macro/BTC modules verifying dynamic base-year handling.
- **Integration tests:** API endpoints returning expected base year; scenario save/load flows maintain snapshot metadata.
- **Regression tests:** Re-run workbook parity suite using frozen historical ledger to confirm outputs unchanged vs. Excel baseline.
- **End-to-end tests:** Simulate calendar rollover by injecting new historical record and verifying UI updates without manual refresh.

## Delivery Milestones
1. **Data layer setup** – create tables, seed historical data, expose base-year utility.
2. **Calculation updates** – refactor macro/BTC engines and dependent services to require base-year inputs.
3. **Scenario migration** – backfill existing saved scenarios with base-year metadata and validate reopen flows.
4. **Front-end wiring** – integrate base-year hooks across onboarding, home, BTC, Macro, and micro/nation screens.
5. **QA & rollout** – execute regression and end-to-end tests; monitor metrics during first calendar rollover.

## Open Questions
- What historical data source should be treated as canonical (e.g., CoinMetrics vs. CoinGecko) and how often should we reconcile discrepancies?
- Do we need to support intraday manual overrides (e.g., user inputs a custom price before official daily close)?
- Should scenarios be allowed to “freeze” on an older base year indefinitely, or do we enforce upgrades after a grace period?

