# Bitcoin24 Web App – External BTC Price Ingestion

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #13 – External BTC price ingestion.
- **Dependencies:** Shared app foundation ([Shared App Foundation](./shared_app_foundation.md)), dynamic base-year handling ([Dynamic Base-Year Handling](./dynamic_base_year_handling.md)), authentication ([Authentication & Account Persistence](./authentication_account_persistence.md)), performance guardrails ([Performance & Accessibility Standards](./performance_accessibility_standards.md)).
- **Downstream impact:** Onboarding wizard, home dashboard, BTC/Macro screens, scenario persistence, analytics, and any marketing surfaces showing live pricing (see [Live Price Onboarding Integration](./live_price_onboarding_integration.md)).

## Objectives
1. Automate retrieval of the latest BTC/USD daily close from a reputable public API.
2. Persist fetched prices with audit metadata so the system can power dynamic base-year calculations and user defaults.
3. Expose API and event surfaces that keep the web app in sync with the most recent price while handling outages gracefully.
4. Provide operational visibility and failover controls so pricing stays reliable without manual intervention.

## Scope
- Selection and integration of one or more upstream data providers (primary + optional fallback).
- Backend jobs/services that fetch, validate, and store prices on a daily cadence.
- API endpoints and pub/sub events to distribute updated pricing to front-end clients and other services.
- Administrative tooling and observability for troubleshooting ingestion issues.

## Non-Goals
- Real-time streaming or intraday minute-by-minute updates (daily close suffices for modeling).
- Implementing full historical backfill (covered in [Dynamic Base-Year Handling](./dynamic_base_year_handling.md)).
- Building user-facing charting dashboards beyond what is required for modeling screens.

## Functional Requirements
1. **Provider integration**
   - Support at least one primary provider (e.g., CoinGecko `/coins/bitcoin/history` or Coinbase `/prices/BTC-USD/spot`).
   - Optional secondary provider configured as fallback with health checks.
   - Allow provider configuration via environment variables for different deployments.
2. **Fetch cadence**
   - Schedule automated job to run shortly after UTC midnight (configurable window) to capture the previous day's close.
   - Provide manual trigger (CLI or admin endpoint) to re-fetch for a given date when corrections are required.
   - Enforce exponential backoff and retry limits; surface failures to alerting stack.
3. **Data validation**
   - Normalize provider response to `{ date, closeUsd, source, fetchedAt }` in UTC.
   - Reject values that deviate more than configurable percentage (e.g., ±10%) from the last stored value unless explicitly overridden.
   - Ensure monotonic date progression; prevent duplicate entries without audit trail.
4. **Persistence**
   - Insert records into `pricing_daily` with conflict handling (updates should create audit entries in `pricing_daily_audit`).
   - Track `provider_latency_ms`, `status`, and `checksum` fields to aid troubleshooting.
   - Maintain service metadata on last successful ingestion timestamp and provider used.
5. **Distribution**
   - Publish ingestion results to message bus (e.g., `pricing.latest` topic) so dependent services (calculation engine, cache warmers) can react.
   - Expose REST endpoint `GET /api/pricing/latest` returning `{ latestDate, latestPrice, source, fetchedAt }` with caching headers.
   - Implement webhook/event emitter for front end to optionally subscribe via SSE/WebSocket for near-real-time updates.
6. **Resilience & fallbacks**
   - If primary provider fails consecutively (configurable threshold), automatically switch to fallback and raise alert.
   - If all providers fail, reuse last successful price but mark status as `STALE`; notify ops channel.
   - Provide runbooks for manual data entry/backfill.
7. **Security & compliance**
   - Store provider API keys/credentials securely (secrets manager or environment variables with restricted access).
   - Rate-limit public endpoints and ensure admin controls require authentication with appropriate roles.
   - Log all ingestion attempts with provider responses (sanitized) for audit.

## Architecture & Components
- **Worker service (`pricing-ingestor`)** responsible for scheduled pulls, validation, persistence, and event publication.
- **Shared pricing module** (extends `@bitcoin24/core/pricing`) exposing helpers like `fetchLatestPriceFromProvider`, `validatePrice`, `savePriceRecord`.
- **API gateway** endpoints layered on existing backend (e.g., Next.js API routes or FastAPI) delegating to pricing module.
- **Background scheduler** using hosted cron (e.g., GitHub Actions, AWS EventBridge, Supabase cron) triggering ingestion job.
- **Monitoring stack** leveraging existing observability tooling (Sentry, Datadog) to emit metrics and alerts.

## Implementation Steps
1. **Provider evaluation & abstraction**
   - Benchmark response quality, rate limits, and latency for candidate APIs.
   - Create provider interface `PricingProvider` with methods `getDailyClose(date)` and `getLatest()`; implement adapters per provider.
2. **Ingestion worker**
   - Scaffold worker job with lifecycle hooks: `prepare` → `fetch` → `validate` → `persist` → `publish`.
   - Support CLI `yarn pricing:ingest --date=YYYY-MM-DD` for manual runs.
   - Integrate with scheduler via command or HTTP webhook.
3. **Validation & persistence layer**
   - Reuse tables defined in task #12; add new columns `provider`, `status`, `latency_ms` as needed.
   - Implement optimistic locking/transactions to guard against concurrent writes.
   - Write unit tests covering acceptance/rejection scenarios.
4. **Distribution endpoints & events**
   - Add REST `GET /api/pricing/latest` and `POST /api/pricing/refresh` (authenticated) endpoints.
   - Emit event payloads conforming to `PricingUpdatedEvent` schema; document message contract.
   - Update shared front-end hooks to listen for events and refresh local caches.
5. **Observability & alerts**
   - Record metrics: success/failure counts, provider latency, drift from previous close, stale duration.
   - Configure alerts for consecutive failures, stale data thresholds, and validation rejections.
   - Document runbooks and escalation paths in ops wiki (link TBD).
6. **QA & rollout**
   - Stage environment dry run with mock providers to validate scheduler & retries.
   - Backfill missing days via manual CLI to ensure workflow handles historical corrections.
   - Launch to production with heightened monitoring during first week; review logs daily.

## Front-End & UX Touchpoints
- Onboarding wizard and home dashboard display "Latest BTC close: ${price} (as of {date})" using `/api/pricing/latest`.
- Provide inline status chip (Fresh/ Stale) with tooltip copy explaining data recency.
- Trigger gentle toast when a newer price becomes available while user is active.
- Follow accessibility guidance: convey status via icons/labels, not color alone.

## Performance Considerations
- Cache `GET /api/pricing/latest` at edge for short TTL (e.g., 60s) while ensuring updates propagate quickly after ingestion.
- Use connection pooling and batch writes when backfilling large date ranges.
- Keep worker dependencies lightweight to reduce cold-start time on serverless platforms.

## Security Considerations
- Restrict admin endpoints to privileged roles; log request metadata.
- Apply request signing or IP allowlists if providers support callbacks/webhooks.
- Sanitize provider responses before logging to avoid inadvertently storing PII.

## Testing Strategy
- **Unit tests:** provider adapters (happy path & error handling), validation rules, persistence logic.
- **Integration tests:** end-to-end ingestion run against sandbox provider, ensuring DB records and events emit correctly.
- **Contract tests:** verify `/api/pricing/latest` response schema consumed by front end.
- **Load tests:** simulate backfill of several months to ensure job handles rate limits and DB constraints.

## Delivery Milestones
1. Provider abstraction & sandbox integration completed.
2. Scheduled ingestion job running in staging with monitoring.
3. API endpoints and event distribution wired to front end.
4. Production launch with alerting and runbooks handed off to operations.

## Open Questions
- Which provider SLAs satisfy business requirements, and do we need a paid tier for reliability?
- Should we store OHLC data for future analytics or stick to daily close only for now?
- Do marketing pages require unauthenticated access to latest price, influencing caching strategy?

