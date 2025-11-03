# Flow-Specific UX Interactions & Navigation Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This blueprint informs tasks **3**, **10**, **12**, **13**, **14**, and **22** from the [Development Plan](./development_plan.md), ensuring the onboarding, guided model progression, dynamic pricing interactions, live price decisions, and validation/help strategies deliver a coherent user journey.

This guide translates the onboarding, home, and modeling flows into detailed UX behaviors that align with the Bitcoin Model web app's design language. It supplements the overarching design system and theming/motion frameworks, and pairs with the [Route Guarding & Navigation](./route_guarding_navigation.md) blueprint for implementation specifics. For Step 1 UI patterns see the [BTC Model Screen Blueprint](./btc_model_screen.md); for the price-selection journey reference the dedicated [Live Price Onboarding Integration](./live_price_onboarding_integration.md); for macro-screen execution details consult the [Macro Model Screen Blueprint](./macro_model_screen.md); and for Step 3 behavior align with the [Individual Micro Model Screen Blueprint](./individual_micro_model_screen.md).

Persistence interactions described here should adhere to the save/load patterns codified in the [Scenario Persistence Controls](./scenario_persistence_controls.md) plan and stay synchronized with the base-year behavior defined in the [Dynamic Base-Year Handling](./dynamic_base_year_handling.md) specification and the live pricing pipeline outlined in the [External BTC Price Ingestion](./external_btc_price_ingestion.md) blueprint.

## 1. Cover Screen & Entry CTA
- **Hero Treatment:** Full-bleed dark gradient with animated particle backdrop and centered copy highlighting the product promise.
- **Primary CTA:** "Get Started" button using accent gradient, spring hover lift, and subtle glow to draw focus.
- **Secondary Options:** Inline text link for "View docs" and footer links for legal/about content, keeping the entry uncluttered.
- **Performance:** Preload onboarding route assets so the modal/wizard opens instantly.

## 2. Onboarding Wizard
- **Structure:** Three-panel flow (Welcome → Account → Confirmation) displayed as full-height modal with blurred backdrop.
- **Progress Indicator:** Stepper at top with animated progress bar and labels ("Welcome", "Create account", "You're in").
- **Inputs:** Username, email, password fields with inline validation using Zod; show password strength meter and requirements tooltip.
- **Live BTC Price Selection:** Present latest price fetched from backend with timestamp. Offer radio choices: "Use live price", "Pick historical snapshot", "Enter custom".
- **Transitions:** Framer Motion slide-in/out with `spring` easing; respect `prefers-reduced-motion` to swap for fade transitions.
- **Error Handling:** Inline alerts styled with accent warning color; allow users to retry without resetting prior inputs.
- **Exit Paths:** "Back to cover" text button and keyboard `Esc` support; preserve partially entered data in state.

## 3. Post-Onboarding Redirect & Toasts
- **Success Toast:** Floating confirmation showing "Account created" with option to view saved scenarios.
- **Auto-Save:** Immediately persist selected BTC price preference and default scenario seed tied to the new user.
- **Routing:** Redirect to `/home` with optimistic navigation; fetch user data in parallel, showing skeleton cards until data resolves.

## 4. Home Dashboard
- **Hero Card:** Personalized greeting, quick summary of last scenario touched, and "Resume" button.
- **Model Menu:** Responsive grid of cards categorized by flow (BTC Core, Macro Engine, Individual, Corporate, Institution, Nations). Each card contains brief description, completion status chip, and CTA.
- **Quick Actions:** Top-right action bar with "Start guided flow", "Create blank scenario", and "Import from Excel" (future enhancement placeholder).
- **Saved Scenarios List:** Collapsible panel with table layout (name, model type, last updated, actions). Provide search/filter chips.
- **Guided Flow Banner:** Highlight recommended sequence (Step 1 BTC → Step 2 Macro → Step 3 Choose model) with progress pills. Clicking steps deep-links to relevant screen, carrying state.

## 5. Global Navigation & Layout Shell
- **App Bar:** Sticky top bar featuring logo, breadcrumb trail, notifications, and user avatar menu (profile, settings, sign out).
- **Left Rail:** Context-aware nav chips for BTC, Macro, and current model; highlight active section with glowing border.
- **Responsive Behavior:** Collapse left rail into floating bottom nav on tablet/mobile with icons and text labels.
- **Loading States:** Use skeleton cards for hero summaries and shimmer placeholders for tables while data loads.

## 6. Guided Model Flow Interactions
- **Step Header:** Sticky header on BTC, Macro, and model screens showing "Step X of 3", page title, and CTA row (Back, Next, Save).
- **Auto-Save Feedback:** Display subtle "Saved" checkmark when inputs persist; escalate to warning banner if persistence fails.
- **Scenario Presets:** Expose toggle buttons for Bear/Base/Bull (BTC) or strategy presets (micro models) with animated selection states.
- **Inline Education:** Tooltip icons next to key fields linking to knowledge base entries; show microcopy on hover/focus.
- **Collapsible Calculations:** Advanced sections default collapsed with disclosure triangles; animate height transitions for smooth reveal.
- **Chart Interactions:** Hover tooltips with formatted currency/BTC units, ability to pin comparisons, and toggle series visibility.

## 7. Live BTC Price & Historical Context UI
- **Context Strip:** Top of BTC/Macro screens includes banner displaying "Starting from [Price] as of [Date]" with edit button.
- **Historical Picker Modal:** Calendar selector or dropdown for historical anchor year; disable dates newer than latest stored price.
- **Status Alerts:** If live price fetch fails, surface non-intrusive warning with retry option and fallback value.

## 8. Scenario Management UX
- **Scenario Bar:** On each model screen, show scenario name with dropdown for quick switch, save, duplicate, rename, and delete actions.
- **Version History:** Provide timeline modal listing previous saves with timestamps; allow revert action (future enhancement flag).
- **Confirmation Patterns:** Use bottom-right toast confirmations for save/delete and modal confirmation for destructive actions.

## 9. Accessibility & Keyboard Support
- Ensure onboarding wizard, scenario menus, and collapsible panels are keyboard accessible with logical tab order and visible focus rings.
- Provide skip links to jump to main content or table sections.
- Offer hotkeys for "Save" (Cmd/Ctrl+S), "Next" (Cmd/Ctrl+→), and "Back" (Cmd/Ctrl+←) with tooltip discoverability.

## 10. Performance Considerations
- Prefetch next-step route bundles when user is midway through current step.
- Memoize chart datasets and use virtualization for long tables to keep interactions responsive.
- Batch state updates via Zustand selectors and React Transition APIs to avoid jank during intense input changes.

## 11. Open Questions & Follow-Ups
- Finalize copy for helper tooltips and empty states.
- Determine whether to integrate an interactive tutorial overlay for first-time users.
- Align analytics events with UX milestones (onboarding completion, scenario save, price selection).

Refer back to the [Design System & Tech Stack](./design_system.md), [Shared App Foundation Blueprint](./shared_app_foundation.md), [Authentication & Account Persistence Blueprint](./authentication_account_persistence.md), and [Theming & Motion Framework](./theming_motion_framework.md) documents, along with the dedicated [Onboarding Wizard Implementation Blueprint](./onboarding_wizard.md), [User Home Page Implementation Blueprint](./user_home_page.md), and [Guided Flow Blueprint](./guided_model_flow.md) for visual, architectural, and implementation guardrails that complement this flow blueprint.
