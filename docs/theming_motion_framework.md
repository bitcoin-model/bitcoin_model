# Shared Theming and Motion Framework Plan

[Back to README](../README.md) • [Development Plan](./development_plan.md)

## Plan Alignment
This plan addresses tasks **2** and **21** from the [Development Plan](./development_plan.md), detailing the implementation approach for the design tokens, motion presets, and shared UI building blocks referenced across subsequent feature work.

This document describes how to implement the shared theming layer and motion framework for the Bitcoin Model web application. The goal is to ensure a cohesive look-and-feel, consistent animations, and responsive layouts across all screens described in the product plan.

## Objectives

1. Establish a centralized theming system that supports light and dark variants inspired by Microstrategist's aesthetic.
2. Provide reusable primitives for typography, spacing, color, elevation, and glassmorphism effects.
3. Integrate motion primitives using Framer Motion to deliver smooth transitions and interactive feedback at 60fps.
4. Ensure responsive design patterns for data-dense screens across desktop, tablet, and large mobile devices.
5. Bake accessibility (WCAG AA), reduced-motion preferences, and performance considerations into the implementation.

## Technology Selections

- **Styling Framework**: Tailwind CSS with a custom configuration layered on top of CSS variables. Tailwind offers utility-first development while CSS variables enable runtime theme toggling.
- **Theme Management**: `next-themes` for light/dark mode switching with system preference detection and persistence.
- **Animation Library**: Framer Motion for page transitions, component-level motion, and shared layout animations.
- **Design Tokens**: Managed via a `theme.config.ts` file exporting color palettes, typography scales, spacing, and radii tokens.
- **Component Library Support**: Headless UI (for accessible primitives) combined with custom components styled via Tailwind classes.

## Implementation Roadmap

1. **Tailwind Configuration**
   - Extend `tailwind.config.ts` to map design tokens to utility classes (colors, fonts, spacing, shadows, blur).
   - Enable JIT mode and configure dark mode to use the `class` strategy.
   - Define custom screens: `xl` (1440px), `lg` (1280px), `md` (1024px), `sm` (768px), `xs` (540px).

2. **Design Token Definition**
   - Create `src/theme/tokens.ts` exporting objects for `colors`, `typography`, `spacing`, `radii`, `shadows`, and `glass` overlays.
   - Derive colors from the design system palette (BTC orange #F7931A, charcoal #0E1116, slate #1E232C, accent teal #3FE0D0, neutral white #F8FAFC).
   - Provide semantic color aliases: `surface`, `surfaceAlt`, `primary`, `accent`, `textPrimary`, `textSecondary`, `border`, `success`, `warning`, `danger`.
   - Include gradient definitions for hero sections and CTA buttons (e.g., `linear-gradient(135deg, #F7931A 0%, #3FE0D0 100%)`).

3. **CSS Variable Layer**
   - Generate CSS variables from tokens inside `src/theme/global.css` for both light (`:root`) and dark (`.theme-dark`) scopes.
   - Ensure variables include alpha variants for overlays (e.g., `--surface-translucent: rgba(14, 17, 22, 0.72)`).
   - Support reduced motion via `@media (prefers-reduced-motion: reduce)` overrides to disable animations gracefully.

4. **Global Layout Shell**
   - Implement `src/components/layout/AppShell.tsx` with glassmorphism header, content container, and responsive side navigation.
   - Use Tailwind utilities to apply background gradients, blur, and drop shadows consistent with the design.
   - Include theme toggle control tied to `next-themes` and persist the selection.

5. **Typography System**
   - Import the chosen font pairing (e.g., `Satoshi` for headings, `Inter` for body) via Next.js font optimization.
   - Define heading/body utility classes (e.g., `.heading-xl`, `.body-md`) mapped to tokens.
   - Ensure line-height, letter-spacing, and responsive scaling for readability on wide tables.

6. **Motion Primitives**
   - Create `src/motion/presets.ts` containing shared Framer Motion variants:
     - `fadeInUp`, `fadeInScale`, `slideIn`, `staggerContainer`, `glowPulse`.
   - Implement route transition wrapper `PageTransition` using `AnimatePresence` to animate route changes.
   - Provide component wrappers (`MotionCard`, `MotionButton`) applying subtle hover/press effects.
   - Respect reduced-motion preferences by disabling certain animations when `prefers-reduced-motion` is true.

7. **Responsive Utilities**
   - Implement grid helpers (`Grid`, `Grid.Item`) for adaptive layouts in `src/components/layout/Grid.tsx`.
   - Add Tailwind plugins for `safe-area` insets, container queries, and fluid typography.
   - Configure sticky headers and scroll shadows for long tables using `IntersectionObserver` based hooks.

8. **Accessibility and Testing**
   - Integrate Axe and Storybook accessibility tests to validate color contrast and keyboard navigation.
   - Provide focus-visible styles for interactive components.
   - Add motion unit tests where feasible (e.g., verifying `prefersReducedMotion` hook disables animations).

9. **Performance Considerations**
   - Ensure Framer Motion components use `layoutId` judiciously to avoid reflow thrashing.
   - Prefetch critical fonts and precompute Tailwind classes to minimize runtime CSS.
   - Lazy-load animation-heavy components (e.g., chart wrappers) with suspense fallbacks.

10. **Documentation & Developer Experience**
    - Document component usage in Storybook with example states for light/dark themes.
    - Provide a theming guide in `docs/design_system.md` referencing this framework for contributors.
    - Coordinate with the architectural plan in [docs/shared_app_foundation.md](./shared_app_foundation.md) so UI tokens and motion utilities integrate cleanly with the shared monorepo structure.
    - Align component styling for the authenticated hub with the [User Home Page Implementation Blueprint](./user_home_page.md).
    - Set up linting rules (Stylelint/ESLint) to enforce naming conventions and consistent utility usage.

## Deliverables

- Tailwind configuration files and tokens modules checked into the repo.
- Global stylesheet with CSS variables for light/dark modes.
- Shared motion preset utilities and wrappers.
- Storybook stories demonstrating the theming and motion patterns.
- Documentation updates pointing developers to the shared framework.

## Success Metrics

- Page transitions and component interactions render at 60fps on target devices.
- Light and dark modes achieve WCAG AA contrast ratios.
- Layouts remain legible and performant at viewport widths from 540px to 1920px.
- Developer onboarding time is reduced thanks to clear tokens, presets, and documentation.

