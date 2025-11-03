# Bitcoin24 Development Plan

[Back to README](../README.md)

## Overview
This document is the authoritative roadmap for implementing the Bitcoin24 web application. It consolidates every scoped task, groups related efforts, and links to the deep-dive guides that describe how each initiative should be executed. All feature, UX, and infrastructure work should trace back to the initiatives catalogued below.

## Task Index
| # | Initiative | Description | Status | Key References |
|---|------------|-------------|--------|----------------|
| 1 | Modern design system & tech stack | Establish visual direction, component primitives, and platform stack inspired by Microstrategist. | ✅ Completed – blueprint authored. | [Design System & Tech Stack](./design_system.md) |
| 2 | Shared theming & motion framework | Implement Tailwind tokens, animation presets, and responsive utilities that deliver the design system. | ✅ Completed – implementation guide drafted. | [Theming & Motion Framework](./theming_motion_framework.md) |
| 3 | Flow-specific UX interactions | Define onboarding, navigation, live price handling, and data exploration behaviors. | ✅ Completed – interaction plan documented. | [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md) |
| 4 | Performance, accessibility, & observability guardrails | Set budgets, tooling, and monitoring to keep the experience fast and inclusive. | ✅ Completed – standards guide published. | [Performance & Accessibility Standards](./performance_accessibility_standards.md) |
| 5 | Shared application foundation | Scaffold repository, ingest workbook data, and stand up calculation engines and services. | ✅ Completed – architectural blueprint delivered. | [Shared App Foundation Blueprint](./shared_app_foundation.md) |
| 6 | Authentication and account persistence | Implement username/password auth, session management, and scenario storage. | ✅ Completed – implementation blueprint documented. | [Authentication & Account Persistence](./authentication_account_persistence.md) |
| 7 | Onboarding wizard | Build the Get Started flow that guides users through account creation and setup. | ✅ Completed – onboarding spec drafted. | [Onboarding Wizard Blueprint](./onboarding_wizard.md) |
| 8 | User home experience | Deliver the authenticated dashboard with saved scenarios and guided navigation. | ✅ Completed – home experience blueprint produced. | [User Home Page Blueprint](./user_home_page.md) |
| 9 | Route guarding & global navigation | Enforce authenticated access and cohesive navigation patterns. | ✅ Completed – guard & navigation blueprint documented. | [Route Guarding & Navigation](./route_guarding_navigation.md) |
| 10 | Guided BTC → Macro → model flow | Surface step indicators, auto-save, and navigation cues across modeling screens. | ✅ Completed – guided flow blueprint published. | [Guided Flow Blueprint](./guided_model_flow.md) |
| 11 | Scenario persistence controls | Provide save/load/duplicate functionality tied to user accounts. | ✅ Completed – blueprint documented. | [Scenario Persistence Controls](./scenario_persistence_controls.md) |
| 12 | Dynamic base-year handling | Shift projections to use the latest historical BTC data instead of static 2025 assumptions. | ✅ Completed – engineering spec documented. | [Dynamic Base-Year Handling](./dynamic_base_year_handling.md) |
| 13 | External BTC price ingestion | Fetch daily prices, persist them, and expose defaults to the UI. | ✅ Completed – ingestion blueprint documented. | [External BTC Price Ingestion](./external_btc_price_ingestion.md) |
| 14 | Live price onboarding integration | Let users accept live prices or choose alternatives during onboarding and in models. | ✅ Completed – integration blueprint published. | [Live Price Onboarding Integration](./live_price_onboarding_integration.md) |
| 15 | Macro model screen | Implement controls, tables, charts, and collapsible calculations for the macro layer. | ✅ Completed – blueprint documented. | [Macro Model Screen Blueprint](./macro_model_screen.md) |
| 16 | BTC model screen | Build scenario presets, yearly outputs, KPIs, and charts for the BTC sheet. | ✅ Completed – blueprint documented. | [BTC Model Screen Blueprint](./btc_model_screen.md) |
| 17 | Individual micro model screen | Translate individual strategy table, forecasts, comparisons, and charts. | ✅ Completed – blueprint documented. | [Individual Micro Model Screen Blueprint](./individual_micro_model_screen.md) |
| 18 | Corporate micro model screen | Deliver treasury strategy inputs, results tables, and visualization suite. | ✅ Completed – blueprint documented. | [Corporate Micro Model Screen Blueprint](./corporate_micro_model_screen.md) |
| 19 | Institution micro model screen | Implement portfolio assumptions, annual results, and chart trio. | ✅ Completed – blueprint documented. | [Institution Micro Model Screen Blueprint](./institution_micro_model_screen.md) |
| 20 | Nation-state model screens | Build indebted, wealthy, and US nation experiences with fiscal levers and charts. | ✅ Completed – blueprint documented. | [Nation-State Model Screens Blueprint](./nation_state_model_screens.md) |
| 21 | Shared UI component library | Extract reusable cards, tables, collapsibles, and chart wrappers. | ✅ Completed – component library blueprint published. | [Shared UI Component Library Blueprint](./shared_ui_component_library.md) |
| 22 | Validation, guidance, & analytics | Enforce input rules, contextual help, and telemetry across the app. | ✅ Completed – validation & analytics blueprint documented. | [Validation, Guidance, & Analytics Blueprint](./validation_guidance_analytics.md) |

> **Note:** Items marked "Upcoming" will receive dedicated implementation briefs as the project advances. Until then, use this
table to track sequencing, dependencies, and ownership discussions.

## Milestone Groupings
### Foundation Milestone
Tasks 1–5 establish the visual, experiential, and architectural baseline. Complete these before beginning any feature
implementation to keep subsequent work aligned.

### Access & Onboarding Milestone
Tasks 6–11 build the authentication system, onboarding flow, and scenario persistence. These unlock the primary user journey and
should be prioritized immediately after the foundation.

### Dynamic Pricing Milestone
Tasks 12–14 integrate historical pricing logic and live data ingestion. Finish these before implementing the modeling screens so
all downstream calculations rely on the same time-aware pricing.

### Modeling Experience Milestone
Tasks 15–20 cover the BTC, macro, micro, and nation-state experiences. Build them sequentially so shared calculations and UI
components can be reused efficiently.

### Shared Components & Quality Milestone
Tasks 21–22 consolidate UI primitives and apply validation, guidance, and analytics layers to the full app surface.

## Usage Guidelines
- Treat this document as the single source of truth for scope prioritization. Update it whenever new work is approved or tasks are
 reprioritized.
- Each supporting guide (linked above) should reference this plan to keep context in sync.
- When opening issues or PRs, cite the corresponding task number from this plan.

## Related Documents
- [Design System & Tech Stack](./design_system.md)
- [Theming & Motion Framework](./theming_motion_framework.md)
- [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md)
- [Performance & Accessibility Standards](./performance_accessibility_standards.md)
- [Shared App Foundation Blueprint](./shared_app_foundation.md)
- [Authentication & Account Persistence](./authentication_account_persistence.md)
- [Onboarding Wizard Blueprint](./onboarding_wizard.md)
- [User Home Page Blueprint](./user_home_page.md)

