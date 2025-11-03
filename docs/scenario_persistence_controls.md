# Scenario Persistence Controls Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This blueprint fulfills task **11** of the [Development Plan](./development_plan.md). It extends the authentication platform described in the [Authentication & Account Persistence](./authentication_account_persistence.md) guide and informs the UX flows outlined in the [User Home Page](./user_home_page.md) and [Guided Model Flow](./guided_model_flow.md) documents.

## 1. Goals & Success Metrics
- **Trustworthy saves:** Users must never lose edits when moving between BTC → Macro → model screens. Auto-save cycles should finish in <400 ms and surface confirmation toasts when manual saves occur.
- **Version awareness:** Every scenario needs human-readable timestamps, change summaries, and the ability to compare against previous snapshots.
- **Multi-device continuity:** Authenticated users should see identical scenario lists on any device within 5 seconds of load thanks to server reconciliation and optimistic local caches.
- **Safety & transparency:** Destructive actions (delete, overwrite) require explicit confirmation and provide undo windows where possible.

## 2. Scenario Data Model
- **Entities:**
  - `Scenario`: root object containing `id`, `user_id`, `name`, `model_type`, `created_at`, `updated_at`, `last_run_version`, `tags`, and `notes`.
  - `ScenarioRevision`: immutable snapshots storing `scenario_id`, `revision`, `payload` (JSON of all assumptions + derived states), `created_at`, and `created_by`.
  - `ScenarioShare` (future-ready): optional entity to support collaboration/invitations without modifying existing schema.
- **Payload Schema:**
  - Partition JSON by domain: `{ btc: {...}, macro: {...}, models: {individual: {...}, corporate: {...}, ...} }` to keep calculations modular.
  - Include metadata for ARR curves, live price selection, **base-year snapshot** (`baseYear`, `latestDate`, `latestPrice`), and selected presets to rehydrate UI toggles quickly in accordance with the [Dynamic Base-Year Handling](./dynamic_base_year_handling.md) plan.
- **Indices:** composite index on `(user_id, updated_at desc)` for dashboard queries, and `(scenario_id, revision desc)` for revision history retrieval.

## 3. API Surface
- **REST Endpoints (NestJS /apps/api):**
  - `POST /scenarios` – create; validates uniqueness of `name` per user and seeds `ScenarioRevision` revision `1`.
  - `GET /scenarios` – list all scenarios for the authenticated user with pagination and optional `model_type` filter.
  - `GET /scenarios/:id` – fetch full scenario with latest payload and optionally include revision summaries.
  - `PUT /scenarios/:id` – update metadata (`name`, `tags`, `notes`) and initiate a new revision when payload changes.
  - `POST /scenarios/:id/revisions` – explicit snapshot endpoint used by auto-save and manual "Save As" actions.
  - `DELETE /scenarios/:id` – soft delete by default; purge after retention window.
  - `POST /scenarios/:id/duplicate` – create a new scenario with copied payload + incremented name suffix.
- **Realtime Hooks:** employ WebSockets (NestJS `@WebSocketGateway`) or Supabase Realtime channels for cross-tab sync.
- **Validation:** use Zod schemas shared with the front end to guard request bodies and ensure consistent typing.

## 4. Front-End State Management
- **State store:** Extend the global Zustand store (`/apps/web/src/state/scenarios.ts`) with slices for `scenarios`, `activeScenario`, `pendingChanges`, and `autosaveStatus`.
- **Optimistic updates:** Apply UI updates immediately, queue API requests, and reconcile responses (or roll back) with conflict detection using `updated_at` + revision numbers.
- **Offline handling:** Persist edits to IndexedDB via `idb-keyval`, show an "Offline" badge, and replay queued saves once connectivity returns.
- **Auto-save cadence:**
  - Trigger on blur for inputs, on navigation between steps, and every 30 seconds when edits are detected.
  - Debounce to avoid flooding the API; cancel outstanding requests if a new edit occurs before completion.

## 5. User Interface Requirements
- **Scenario toolbar:** Each modeling screen gains a sticky bar with buttons for `Save`, `Save As`, `Duplicate`, `Revert`, and a dropdown to switch scenarios.
- **Confirmation modals:** Utilize the shared modal component with secondary text describing consequences; destructive actions demand typing the scenario name to confirm.
- **Revision history drawer:** Slide-over panel listing timestamps, authors, change summaries, and quick actions (`Restore`, `Compare`).
- **Comparison view:** Display diff tables highlighting changed assumptions and KPIs between two revisions; rely on highlight colors defined in the theming guide.
- **Toast feedback:** `Success`, `Warning`, `Error` states mapped to the notification palette; include "View revision" link on successful saves.
- **Loading skeletons:** When fetching scenario lists, use card skeletons consistent with the home page blueprint to preserve perceived performance.

## 6. Integration with Guided Flow & Onboarding
- **Onboarding:** After account creation, present a "Create your first scenario" wizard step that seeds defaults and performs the initial `POST /scenarios` call.
- **Guided flow:** Navigating BTC → Macro → model automatically saves context before and after each step, ensuring the progress indicator reflects the latest persisted state and that base-year metadata stays in sync when users accept newer historical data.
- **Home dashboard:** Scenario cards show last-updated timestamps, tags, and quick actions (Continue, Duplicate, Delete). Respect filters (`model_type`, `tag`).

## 7. Security & Compliance
- Require auth middleware (`JwtAuthGuard`) for all scenario routes; enforce user scoping in Prisma queries.
- Implement per-user quotas (default 20 active scenarios) with graceful messaging when limits are reached.
- Log all create/update/delete events with audit metadata (ip, user agent) for compliance review.
- Encrypt sensitive fields at rest if infrastructure supports it; at minimum ensure database backups are encrypted.

## 8. Performance & Reliability
- API endpoints must respond within 250 ms p95 under normal load with Postgres connection pooling (pgBouncer) and Redis caching for read-heavy endpoints.
- Employ background workers for heavy diffing/comparison if payloads exceed 200 KB to keep UI responsive.
- Add retries with exponential backoff for failed auto-save calls; surface toast warnings after three consecutive failures.
- Monitor key metrics: save success rate, average auto-save latency, duplication frequency, and error codes per user.

## 9. QA Strategy
- **Unit tests:**
  - Backend: Prisma model tests + service tests validating CRUD logic, revision creation, and access control.
  - Front end: Zustand store reducers/selectors, auto-save hooks, and optimistic update behavior using Vitest + React Testing Library.
- **Integration tests:**
  - Playwright flows covering create → edit → duplicate → delete → restore.
  - Contract tests between front end Zod schemas and backend DTOs.
- **Load testing:** k6 script simulating concurrent saves to confirm API throughput and contention behavior.
- **Manual QA:** Checklist verifying offline edits, conflict resolution modals, accessibility of all controls, and localization readiness.

## 10. Delivery Milestones
1. **Schema & API implementation (Backend squad)** – 3 story points; produce Prisma migrations, NestJS controllers/services, and unit coverage.
2. **Front-end state & UI scaffolding (Web squad)** – 5 story points; deliver toolbar, store slices, and auto-save plumbing behind feature flags.
3. **Revision history & comparison (Shared feature)** – 3 story points; implement drawer UI, diff rendering, and restore flows.
4. **Polish & QA hardening** – 2 story points; finalize analytics, error messaging, load testing, and accessibility audits.

## 11. Dependencies & Open Questions
- Depends on: completed auth infrastructure, navigation guards, onboarding/home UX per their respective blueprints.
- Requires alignment with dynamic pricing tasks (12–14) to ensure payload schema captures live price sources.
- Open questions:
  - Should we support scenario sharing at MVP or defer to a later milestone?
  - What retention period applies to soft-deleted scenarios before permanent purge?
  - Do we need export/import (JSON/CSV) for compliance or backups in phase one?

Keeping this blueprint synchronized with the [Development Plan](./development_plan.md) ensures all teams share a single source of truth for scenario persistence work.
