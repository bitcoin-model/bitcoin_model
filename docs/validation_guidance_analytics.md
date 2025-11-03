# Bitcoin24 Web App – Validation, Guidance, & Analytics Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #22 – Validation, guidance, & analytics layer.
- **Upstream dependencies:** UX behavior patterns ([Flow-Specific UX Interactions](./flow_specific_ux_interactions.md)), scenario persistence ([Scenario Persistence Controls](./scenario_persistence_controls.md)), guided flow ([Guided Flow Blueprint](./guided_model_flow.md)), shared UI components ([Shared UI Component Library Blueprint](./shared_ui_component_library.md)), and pricing/auth foundations.
- **Downstream impact:** Ensures consistent input integrity, user education, and telemetry across all screens; feeds observability guardrails defined in [Performance & Accessibility Standards](./performance_accessibility_standards.md).

## 1. Objectives
1. Enforce domain-specific validation rules so projections remain credible and aligned with workbook logic.
2. Provide contextual guidance (tooltips, help modals, inline copy) to explain assumptions, live pricing behavior, and scenario outcomes.
3. Instrument analytics/telemetry to observe user behavior, monitor performance, and support iterative improvements.
4. Deliver consistent UX across onboarding, home, macro, BTC, micro, and nation screens, integrating with shared components.

## 2. Scope
- **Validation framework:** Schema definitions (Zod/Yup) per model, cross-field rules (percent totals, non-negative values, caps), temporal constraints (historical years locked), and asynchronous validation hooks (e.g., username availability).
- **Guidance surfaces:** Inline helper text, info tooltips, glossary drawer, onboarding walkthrough, contextual banners, empty states, and success/error toasts.
- **Analytics instrumentation:** Event taxonomy, tracking library integration (e.g., PostHog/Segment), performance metrics (web vitals), error logging (Sentry), and feature flags for experimentation.
- **User feedback loops:** In-app feedback widget, NPS prompts, error reporting channel.

## 3. Non-Goals
- Building ML-driven recommendation engines or predictive analytics beyond defined metrics.
- Implementing full localization for guidance copy in initial release (structure should support future translation).
- Collecting personally identifiable information beyond account credentials and scenario metadata.

## 4. Validation Architecture
- Centralize schema definitions in shared workspace (e.g., `/packages/validation`). Export per-screen schemas and shared helpers.
- Compose synchronous validation (input-level) with form libraries (React Hook Form) and asynchronous validations via service calls (e.g., scenario name uniqueness).
- Provide reusable validators for percentages summing to 100, ARR decay bounds, leverage caps, and debt coverage thresholds.
- Integrate with shared UI components to display inline errors, aggregated summaries, and disable Next/Save actions when invalid.
- Implement unit tests covering edge cases, plus snapshot comparisons vs. Excel guardrails where applicable.

## 5. Guidance & Help Strategy
- Build glossary data structure (markdown/JSON) surfaced via tooltips and contextual modals.
- Implement guided walkthrough for first-time users (progressive disclosure) with ability to skip or revisit from Help menu.
- Add info banners for critical notices (e.g., US publication reference, live price timestamp) with dismiss persistence per user.
- Ensure accessibility: tooltips focusable, modals trap focus, guidance text meets contrast requirements.

## 6. Analytics & Telemetry Implementation
- Define analytics schema with event names, properties, and user/session context; align with scenario persistence IDs.
- Integrate analytics client in front end with consent management and opt-out support. Configuration lives in `config/telemetry/analytics.json` so environments share consistent sampling rules and destinations.
- Instrument key flows: onboarding completion, scenario save, validation errors, navigation transitions, price selection, export actions.
- Send performance metrics (LCP, FID, TTFB) to monitoring service; align thresholds with performance standards.
- Hook into backend services for structured logging of validation failures, API errors, and scenario persistence events.

## 7. Reporting & Monitoring
- Create dashboards (Data Studio/Grafana) tracking user engagement, validation error frequency, save success rate, and performance KPIs.
- Configure alerts for error spikes, API failure rates, and degraded performance.
- Schedule regular review cadence (e.g., weekly triage) with product/design/engineering stakeholders.

## 8. Integration Strategy
1. Finalize validation schemas starting with Macro/BTC screens; expand to micro/nation as calculations stabilize.
2. Embed guidance copy into shared UI components (tooltips, banners) and ensure design review for tone/clarity.
3. Wire analytics provider with environment configuration (dev/stage/prod) and verify event payloads.
4. Update onboarding and home screens to showcase guidance surfaces (FAQ links, help modals).
5. Implement centralized feedback widget and route submissions to support channel or issue tracker.

## 9. Testing Strategy
- **Unit tests:** Validation schemas, guidance component rendering, analytics helper utilities.
- **Integration tests:** Playwright flows verifying validation blocks submission, tooltips accessible via keyboard, analytics events emitted (using mock server).
- **Monitoring tests:** Synthetic checks for analytics endpoint availability and logging pipelines.

## 10. Security & Privacy
- Respect user consent for analytics; provide settings toggle to disable non-essential tracking.
- Sanitize analytics payloads (no sensitive financial values unless aggregated/hashed).
- Ensure guidance content for regulatory disclosures is vetted and versioned.

## 11. Rollout Plan
1. Implement validation schemas and guidance for BTC/Macro screens alongside initial development.
2. Expand coverage to micro and nation screens as they release, iterating on schema complexity.
3. Launch analytics instrumentation with staged rollout (internal testing → beta cohort → full release).
4. Monitor dashboards post-launch, capture feedback, and refine copy/validation thresholds.
5. Document ongoing maintenance process and assign ownership for analytics/reporting.

## 12. Open Questions
- What analytics platform will we standardize on (Segment + downstream, PostHog, self-hosted)?
- Do we require user-level data export/delete tooling for compliance (GDPR/CCPA) at MVP launch?
- Should guidance copy include external resources (links to research) or remain self-contained?
