# Guided BTC → Macro → Model Flow Blueprint

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
- **Development Plan task:** #10 – Guided BTC → Macro → model flow.
- **Upstream dependencies:**
  - Authenticated access & navigation shell ([Route Guarding & Navigation](./route_guarding_navigation.md)).
  - Scenario persistence foundations ([Authentication & Account Persistence](./authentication_account_persistence.md)) and save/load UX ([Scenario Persistence Controls](./scenario_persistence_controls.md)).
  - Onboarding completion state & user home selection ([Onboarding Wizard Blueprint](./onboarding_wizard.md), [User Home Page Blueprint](./user_home_page.md)).
- **Downstream consumers:** BTC, Macro, and all micro/nation modeling screens rely on this framework for sequencing, status hand-offs, and auto-save cues; reference the [BTC Model Screen Blueprint](./btc_model_screen.md) for Step 1 UI specifics, the [Macro Model Screen Blueprint](./macro_model_screen.md) for detailed Step 2 implementation requirements, and the [Individual Micro Model Screen Blueprint](./individual_micro_model_screen.md) for Step 3 execution guidance.

## 1. Goals & Experience Principles
1. **Clarity** – make it obvious what step the user is on, what is required next, and how prior assumptions carry forward.
2. **Continuity** – persist state seamlessly across navigation and refreshes so users never lose progress.
3. **Control** – let users revisit earlier steps, branch into alternate models, or pause and resume without confusion.
4. **Performance** – transitions should feel instantaneous with optimistic UI and prefetching of upcoming data.
5. **Trust** – surface auto-save confirmations, validation status, and scenario context to reinforce reliability.

## 2. Scope
- Sequencing logic and UI for progressing from BTC assumptions → Macro assumptions → selected model.
- Persistent stepper/overview bar that tracks completion, warnings, and quick navigation.
- Auto-save + draft handling tied to scenario persistence APIs.
- Contextual guidance (tooltips, help drawers) that explains the relationship between steps.
- Exit/resume flows from the home dashboard and scenario library.

## 3. Non-Goals
- Detailed form fields within each modeling screen (covered by forthcoming BTC/Macro/model UI specs).
- Scenario comparison visualizations (handled in the specific screen blueprints).
- Implementation of live pricing selection (see [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md) and [Live Price Onboarding Integration](./live_price_onboarding_integration.md)).

## 4. User Journeys
### 4.1 First-time signed-in user
1. Completes onboarding wizard → lands on Home with “Start modeling” CTA.
2. Chooses a model category (Individual, Corporate, etc.).
3. Guided flow initiates at BTC step with an info panel explaining the sequence.
4. User enters/accepts BTC assumptions → presses “Next”.
5. Macro step preloads with BTC outputs; user adjusts macro levers.
6. Upon “Next”, system precomputes chosen model inputs and routes to the model screen with relevant defaults.
7. Completion banner confirms scenario saved; user can jump to comparisons or return Home.

### 4.2 Returning user with existing scenario
1. From Home, selects a saved scenario.
2. Stepper highlights all completed steps; unsaved changes indicators reset.
3. User can jump directly into any step; unsaved edits trigger confirmation modals when navigating away.
4. Auto-save occurs on blur or interval; toast confirms success.

### 4.3 Deep link from shareable route
1. Recipient opens link `/models/individual?scenario=<id>` while authenticated.
2. Flow shell loads with BTC/Macro steps marked as read-only snapshots (unless user duplicates scenario).
3. Duplicate action creates new draft and resets stepper to editable state.

## 5. Functional Requirements
1. **Stepper UI & State**
   - Displays three primary steps plus a dynamic fourth slot for the selected model (Individual, Corporate, Institution, Nation – label adapts).
   - Shows status per step: *Not started*, *In progress*, *Completed*, *Attention needed* (validation issues).
   - Includes progress bar and estimated time per step (pulled from analytics averages when available).
2. **Navigation Controls**
   - “Next” and “Back” buttons pinned to bottom right/left with keyboard shortcuts (⌘/Ctrl + →/←).
   - “Save & exit” button opens modal summarizing last saved time and links back to Home.
   - If validation fails, “Next” scroll-locks to first invalid field and displays inline messaging.
3. **Auto-Save & Draft Handling**
   - Draft state stored per scenario with versioning; includes `updated_at`, `updated_by`, diff summary.
   - Autosave triggers on debounce (1.5s after change) and on navigation; display toast + step indicator checkmark.
   - Conflicts handled with last-writer-wins plus warning banner if server version is newer.
4. **Data Prefetching & Hydration**
   - On entering BTC step, prefetch Macro schema; on Macro, prefetch selected model data definitions to reduce wait time.
   - Use React Query/SWR with background refresh to keep derived outputs warm.
5. **Validation & Warnings**
   - Global validation bus collects issues from each step and surfaces summary in stepper badges.
   - Warnings (non-blocking) displayed as amber icons; blocking errors as red.
   - CTA disabled only for critical errors; warnings allow progression but persist in overview until acknowledged.
6. **Scenario Context Bar**
   - Sticky summary at top: Scenario name, last saved timestamp, active user, environment badge.
   - Includes quick actions: rename, duplicate, switch scenario (opens drawer), download report (future).
7. **Responsive Behavior**
   - On <1024px width, stepper collapses into top progress pills with horizontal scroll; bottom nav transforms into floating fab cluster.
   - Maintain accessible focus order and skip links for keyboard users.

## 6. Architecture & State Management
- Implement dedicated `guidedFlow` slice in global store (Zustand/Redux Toolkit) storing `currentStep`, `completion`, `validation`, and `scenarioId`.
- Persist state to local storage keyed by user + scenario for offline resilience.
- Expose selectors/hooks for screens to publish validation status and register unsaved changes.
- Use central `FlowCoordinator` component to wrap BTC/Macro/model routes; handles transitions, analytics events, and error boundaries.
- Coordinate with `ScenarioService` for CRUD operations and `ComputationService` for recalculations upon step transitions.

## 7. UX & Content Requirements
- Provide inline explainer text at top of each step referencing the relationship (e.g., “Macro assumptions translate BTC adoption into global asset flows”).
- Display “Need help?” button linking to contextual documentation or tooltips referencing workbook cells.
- Offer “View calculations” toggle to reveal derived tables without leaving step.
- Support dark theme styling consistent with design system (glassmorphism cards, neon highlight for active step).

## 8. Accessibility
- Stepper should be navigable via keyboard (tab/arrow keys) with `aria-current="step"` semantics.
- Announce step changes via ARIA live regions.
- Ensure color contrast for step status badges meets WCAG AA; provide text + icon for status.
- Provide focus outlines and skip-to-content link above scenario context bar.

## 9. Performance Considerations
- Prefetch next-step bundles using route-based code splitting; ensure <100ms transition on warm path.
- Use Suspense fallback skeletons matching card layouts to avoid layout shift.
- Cache heavy computation results per step to avoid redundant recomputations on back navigation.
- Instrument Web Vitals and custom metrics (step transition duration, autosave latency) via analytics SDK.

## 10. Security & Resilience
- Respect authorization checks: only scenario owner or collaborators can edit; others receive read-only mode with duplication option.
- Handle network failures with persistent banners and retry controls; autosave should queue offline edits.
- Record audit log entries for step transitions, auto-saves, and validation overrides.
- Ensure unsaved changes modal warns users before closing tab/window (navigator `beforeunload`).

## 11. Testing Strategy
- **Unit tests:** reducers/selectors for `guidedFlow` store, validation aggregator, autosave scheduler.
- **Integration tests:** Cypress/Playwright flows covering first-time setup, returning user resume, validation block, conflict resolution.
- **Contract tests:** ensure API payloads for autosave and scenario transitions align with backend expectations.
- **Accessibility tests:** automated Axe checks for stepper semantics, manual screen reader run-through.

## 12. Analytics & Telemetry
- Track events: `flow_step_viewed`, `flow_step_completed`, `flow_validation_error`, `flow_autosave_success`, `flow_resume_clicked`.
- Capture timing metrics for completion of each step and total flow to inform UX tuning.
- Record drop-off points and surface them in analytics dashboards for prioritization.

## 13. Milestones & Deliverables
1. **M1 – Infrastructure setup**: Implement `FlowCoordinator`, global store slice, skeleton UI with placeholder steps.
2. **M2 – Autosave + validation plumbing**: Hook into scenario service, implement validation bus, add optimistic toasts.
3. **M3 – UX polish & accessibility**: Finalize responsive stepper, keyboard support, ARIA messaging, analytics instrumentation.
4. **M4 – Beta hardening**: Load testing for autosave endpoints, conflict resolution QA, telemetry dashboards live.

## 14. Open Questions
- Do we enable branching into multiple model types within the same scenario (e.g., compare individual vs. corporate) or enforce one model per scenario?
- Should we support collaborative editing (multiple users in same scenario) in MVP, or treat as future enhancement?
- What is the retention policy for autosave history and draft versions?

## 15. Related Documents
- [Design System & Tech Stack](./design_system.md)
- [Theming & Motion Framework](./theming_motion_framework.md)
- [Flow-Specific UX Interactions](./flow_specific_ux_interactions.md)
- [Route Guarding & Navigation](./route_guarding_navigation.md)
- [Authentication & Account Persistence](./authentication_account_persistence.md)
- [User Home Page Blueprint](./user_home_page.md)

