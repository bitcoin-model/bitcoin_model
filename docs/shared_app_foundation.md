# Shared Application Foundation Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This blueprint corresponds to task **5** of the [Development Plan](./development_plan.md), establishing the repository structure, data ingestion, and service architecture that underpin all subsequent milestones.

This document translates the "Set up shared app foundation" task into a concrete implementation roadmap. It focuses on scaffolding the codebase, ingesting workbook data, reproducing Excel logic, and preparing persistence/state layers that power every screen in the Bitcoin24 web app.

## 1. Repository Structure & Tooling
- **Monorepo layout:**
  - `/apps/web` – Next.js front end (SPA/SSR hybrid) consuming the shared model API.
  - `/apps/api` – NestJS or Fastify service exposing REST/GraphQL endpoints for auth, scenarios, and model computations.
  - `/packages/models` – Pure TypeScript calculation library translating Excel formulas into testable functions.
  - `/packages/ui` – Shared UI kit (KPI cards, tables, charts) published via Storybook.
  - `/packages/config` – ESLint/Prettier/Tailwind configs shared across apps.
- **Dev tooling:** pnpm workspace, TurboRepo for task orchestration, Git hooks (lint-staged + Husky) enforcing formatting and type safety before commits.
- **Testing baseline:** Vitest/Jest for unit tests, Playwright for integration/smoke tests, and msw for mocking API calls.

## 2. Workbook Data Ingestion
- **Extraction script:** Node/TypeScript script using `xlsx` or `SheetJS` to parse `Bitcoin24 v1.0.xlsm` and export JSON fixtures.
- **Outputs:**
  - `macro_defaults.json` – baseline macro assumptions, year vector, scenario presets.
  - `btc_defaults.json` – price presets, ARR schedules, KPI targets.
  - `individual/corporate/institution/nation` assumption tables for each strategy preset.
- **Versioning:** Store raw dumps under `/packages/models/fixtures/<sheet>.json` with schema definitions (Zod) to validate integrity.
- **Automation:** Add npm script `pnpm ingest:workbook` to regenerate fixtures whenever the Excel file updates.

## 3. Calculation Engine
- **Goal:** Recreate Excel formulas as deterministic TypeScript functions residing in `/packages/models`.
- **Modules:**
  - `time-series` – handles date vectors, CAGR/ARR calculations, interpolation.
  - `macro` – inflation, innovation, inefficiency, asset conversion, debt issuance.
  - `btc` – scenario presets, price path calculations, KPI summarization.
  - `micro` – individual/corporate/institution models with shared helpers for taxation, BTC purchases, leverage.
  - `nation` – fiscal projections, treasury conversions, debt schedules.
- **Design:** Functions accept typed inputs (validated via Zod), return normalized outputs (tables, KPI summaries, chart-ready arrays).
- **Testing:** Unit tests covering core formulas with regression fixtures to match Excel outputs, plus snapshot tests for cross-sheet dependencies.

## 4. API & Persistence Layer
- **Database schema (PostgreSQL via Prisma):**
  - `users` (id, username, password_hash, created_at, updated_at).
  - `scenarios` (id, user_id FK, name, model_type, assumptions JSONB, created_at, updated_at).
  - `btc_prices` (id, date, price_usd, source, fetched_at).
- **Services:**
  - Auth service (sign-up, login, session refresh, password change).
  - Scenario service (CRUD operations, duplication, version history).
  - Pricing service (latest price retrieval, historical series).
  - Model service (executes calculation engine functions with inputs from scenarios/defaults).
- **API surface:** REST + optional GraphQL overlay; all protected endpoints enforce JWT/httpOnly cookie auth.
- **Background jobs:** Scheduled fetch of BTC price (CoinGecko/Coinbase) via serverless cron writing to `btc_prices` table.

## 5. Front-End State Management
- **Global stores:**
  - Auth store (user profile, session tokens, derived permissions).
  - Scenario store (active scenario metadata, dirty state, save status).
  - Pricing store (latest price, historical cache, data freshness timestamp).
- **Data fetching:** React Query hooks for API interaction with optimistic updates and cache invalidation tied to scenario IDs.
- **Persistence:** Auto-save to server when users navigate between flow steps; optional localStorage draft layer for offline resilience.
- **Routing guards:** Higher-order components that redirect unauthenticated users to onboarding and preload required data for protected routes.

## 6. Developer Experience & CI/CD
- **Local DX:** `pnpm dev` command spins up both web and API apps with hot reloading; docker-compose optional for PostgreSQL.
- **CI pipeline:** GitHub Actions running lint → type-check → unit tests → Playwright smoke → Lighthouse/Axe audits for PRs.
- **Preview environments:** Vercel previews for the web app; Render/Fly staging for the API seeded with anonymized fixture data.
- **Documentation:** Docusaurus site under `/docs` mirroring these guides, with architectural diagrams (C4 or similar) generated via PlantUML.

## 7. Success Criteria
- Monorepo bootstraps in <5 minutes on a fresh machine with `pnpm install`.
- Fixture ingestion reproduces Excel defaults with ±0.1% tolerance across KPI outputs.
- API endpoints achieve p95 latency < 300ms under load test of 50 RPS.
- End-to-end smoke test (create account → load BTC model) passes in CI within 5 minutes.

This foundation ensures that subsequent tasks—auth, onboarding flows, dynamic pricing, and model screens—build atop a stable, well-tested core mirroring the original workbook logic. Pair these architectural steps with the [Design System & Tech Stack](./design_system.md), [Theming & Motion Framework](./theming_motion_framework.md), [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md), [Authentication & Account Persistence Blueprint](./authentication_account_persistence.md), [Dynamic Base-Year Handling](./dynamic_base_year_handling.md), [External BTC Price Ingestion](./external_btc_price_ingestion.md), and [Performance & Accessibility Standards](./performance_accessibility_standards.md) documents—along with the [Onboarding Wizard Implementation Blueprint](./onboarding_wizard.md) and [User Home Page Implementation Blueprint](./user_home_page.md)—to deliver a cohesive product.
