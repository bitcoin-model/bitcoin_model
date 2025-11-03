# Authentication & Account Persistence Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This blueprint spans tasks **6** and **11** of the [Development Plan](./development_plan.md), covering the authentication stack and scenario persistence controls required throughout the product.

Detailed save/load UX, revision management, and cross-screen behaviors are further elaborated in the [Scenario Persistence Controls](./scenario_persistence_controls.md) guide.

This document operationalizes the "Implement basic username/password auth" task. It details the back-end modules, database schema, session strategy, front-end UX expectations, and quality guardrails required to deliver secure sign-up/login and scenario persistence for the Bitcoin24 web application, and it underpins the guard behaviors specified in the [Route Guarding & Navigation](./route_guarding_navigation.md) guide.
This document operationalizes the "Implement basic username/password auth" task. It details the back-end modules, database schema, session strategy, front-end UX expectations, and quality guardrails required to deliver secure sign-up/login and scenario persistence for the Bitcoin24 web application.

## 1. Goals & Principles
- **Security first:** Hash passwords with Argon2id, enforce strong entropy requirements, and ship with rate limiting + anomaly detection.
- **Snappy UX:** Keep account creation < 5s with optimistic navigation, inline validation, and zero full-page reloads.
- **State continuity:** Auth state must hydrate automatically on reload and propagate to scenario stores so flows (BTC → Macro → Models) remain uninterrupted.
- **Extensibility:** Architecture should support future MFA, SSO, and account recovery without rewriting the core auth module.

## 2. Technology & Service Choices
- **Auth service:** NestJS module (within `/apps/api`) leveraging `@nestjs/passport` + `passport-local` for credential flow and `passport-jwt` for session verification.
- **Password hashing:** `argon2` library with configurable memory/time cost aligned to OWASP 2024 recommendations.
- **Token format:** Short-lived JWT access tokens (15 min) delivered via httpOnly, Secure cookies + Refresh tokens (7 days) stored server-side.
- **Database:** PostgreSQL tables managed via Prisma migrations; Redis optional for session blacklists and rate-limiting counters.
- **Email service (optional future):** Postmark/Resend integration abstracted behind provider interface; not required for MVP but scaffolding ready.

## 3. Data Model & Storage
| Table | Purpose | Columns |
|-------|---------|---------|
| `users` | Core identity record | `id (uuid)`, `username (unique)`, `email (nullable, unique)`, `password_hash`, `created_at`, `updated_at`, `last_login_at`, `failed_attempts`, `locked_until` |
| `sessions` | Refresh token tracking | `id`, `user_id`, `refresh_token_hash`, `expires_at`, `created_at`, `ip_address`, `user_agent`, `revoked_at` |
| `scenarios` | User-owned scenario snapshots | See [Shared App Foundation](./shared_app_foundation.md) schema for JSON payload | 
| `btc_prices` | Historical/live BTC price feed | Shared with pricing service for onboarding defaults |

- Index `users.username`, `sessions.refresh_token_hash`, and `scenarios.user_id` for fast lookups.
- Store refresh tokens hashed (Argon2) before persistence to mitigate DB leakage risk.

## 4. API Surface
| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/signup` | POST | Public | Accepts `{ username, password, email? }`; validates strength, checks availability, creates user, seeds default scenario, returns session cookies + profile payload. |
| `/auth/login` | POST | Public | Verifies credentials, rotates refresh token, returns session cookies + profile + active scenario summary. |
| `/auth/logout` | POST | Authenticated | Invalidates refresh token (server-side revoke) and clears cookies. |
| `/auth/refresh` | POST | Refresh token | Issues new access token if refresh token valid + not revoked. |
| `/auth/me` | GET | Authenticated | Returns user profile, latest scenario metadata, feature flags. |
| `/scenarios` | CRUD | Authenticated | Covered in [Shared App Foundation](./shared_app_foundation.md); ensure ownership enforcement via `user_id`. |

- Enforce per-IP rate limits (e.g., 10/min) on `signup`/`login` using NestJS `@nestjs/throttler` or Redis-backed limiter.
- Implement structured error payloads `{ code, message, fieldErrors }` for front-end mapping.

## 5. Front-End Integration
- **Onboarding wizard:** Reuse forms defined in [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md); call `/auth/signup` or `/auth/login` depending on branch. Display server validation inline.
- **State management:**
  - Zustand `useAuthStore` holds `user`, `status`, `sessionExpiresAt`.
  - React Query `useAuth` hooks wrap API calls, set cookies via `credentials: 'include'`, and trigger scenario prefetch on success.
- **Persistence:** On login/signup, hydrate scenario store with payload from `/auth/me` + `/scenarios` list; mark active scenario for guided flow.
- **Error handling:** Show toast with retry guidance for network errors; escalate `locked_until` responses into modal that guides to support.
- **Auto-refresh:** Silent refresh triggered by SWR interval (~10 min) or visibility change; fallback to forced relogin if refresh fails.

## 6. Security Controls
- Enforce password policy: minimum 12 chars, must include uppercase/lowercase/number/symbol; provide strength meter (zxcvbn).
- Lock account for 15 minutes after 5 failed attempts; escalate to support after repeated lockouts.
- Require HTTPS (HSTS) in production; set `SameSite=Lax` cookies.
- Log auth events (signup, login, logout, failure) to audit table and ship to centralized logging (e.g., Datadog).
- Run dependency scanning (npm audit, Snyk) as part of CI for auth module.

## 7. Scenario Lifecycle & Auto-Save
- Seed a default scenario post-signup using workbook defaults with user-selected BTC starting price.
- Implement optimistic `PUT /scenarios/:id` updates triggered on `Next`/`Back` actions and auto-save interval (every 60s).
- Provide `POST /scenarios` for "Save As" flows and `POST /scenarios/:id/duplicate` convenience route.
- Ensure deletes perform soft-delete (timestamp `deleted_at`) to support restore functionality later.

## 8. Testing & QA Strategy
- **Unit tests:**
  - Validate password hashing, token issuance, and scenario ownership guards using Vitest.
  - Mock Prisma to ensure unique constraint violations return friendly errors.
- **Integration tests:**
  - Use Supertest to exercise auth endpoints, verifying cookies and refresh workflow.
  - Playwright scenarios that cover onboarding wizard → signup → redirect → scenario auto-save.
- **Security tests:**
  - Add OWASP ZAP automated scan in CI for auth routes.
  - Pen-test checklist covering SQL injection, auth bypass, session fixation.
- **Load tests:** K6 script to simulate burst login attempts ensuring throttling engages.

## 9. Observability & Operations
- Metrics: login success rate, signup conversion, refresh token failure rate, account lockouts.
- Alerts: trigger when signup error rate > 5% or refresh token failures > 2% for 10 minutes.
- Dashboards: Grafana panels per endpoint latency (p95 < 200ms) and error codes.
- Runbooks: Document recovery steps for locked users, DB outage, or compromised refresh token.

## 10. Implementation Milestones
1. Scaffold NestJS auth module with DTO validation + Argon2 hashing.
2. Add Prisma models/migrations for `users`, `sessions`, scenario foreign key, and indexes.
3. Implement endpoints + rate limiting + logging middleware.
4. Wire React Query hooks, Zustand store, and onboarding wizard forms.
5. Integrate auto-refresh + global route guards.
6. Build regression + security test suites and add to GitHub Actions workflow.
7. Launch feature behind feature flag; run internal alpha with manual QA before public release.

## Related Documents
- Visual + tech context: [Design System & Tech Stack](./design_system.md)
- UX flow requirements: [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md)
- Architectural dependencies: [Shared App Foundation](./shared_app_foundation.md)
- Performance & compliance guardrails: [Performance & Accessibility Standards](./performance_accessibility_standards.md)
- Theming/motion integration for auth forms: [Shared Theming & Motion Framework](./theming_motion_framework.md)
- Wizard-specific implementation details: [Onboarding Wizard Implementation Blueprint](./onboarding_wizard.md)
- Post-login experience: [User Home Page Implementation Blueprint](./user_home_page.md)
