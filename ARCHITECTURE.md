# Todo Mobile App Architecture

This repository uses a feature-layered React Native (Expo) architecture with clear boundaries between UI, state orchestration, and external integrations.

## Layers

- `App.js`: top-level composition entrypoint.
- `app/Contexts/`: app-wide providers and cross-cutting shared state.
- `app/navigation/`: route/container composition and navigator wiring.
- `app/screens/`: route-level containers that compose hooks + presentational components.
- `app/hooks/`: stateful UI/data orchestration hooks.
- `app/components/`: reusable presentational UI components.
- `app/services/`: persistence and platform integration modules (Firebase, AsyncStorage).

## Current Module Responsibilities

- `App.js` wires `ThemeProvider` and `AppNavigator`.
- `AppNavigator` owns `NavigationContainer` and frame-level shell composition.
- `RootNavigator` defines screen registration and route graph.
- `routes` is the single source of truth for app route metadata.
- `Home` binds `useTodos` data/actions into `TodoDashboard` props.
- `About` is a thin route-level container that composes `AboutOverview`.
- `useTheme` is the single hook boundary for reading `ThemeContext`.
- `ThemeProvider` owns the design-token palette definitions (including the primary accent color) for light/dark modes.
- `todoService` is the single Firebase todo data access boundary.
- `themeService` is the single AsyncStorage theme persistence boundary.

## Data Flow

1. Screen requests state/actions from a hook (`useTodos`).
2. Hook calls service functions (`subscribeToTodos`, `createTodo`, `removeTodo`).
3. Service integrates with Firebase and maps external data to app shape.
4. Hook exposes UI-ready state to screens.
5. Screen passes immutable props to presentational components.

## Guardrails

- Keep Firebase SDK usage inside `app/services/*`.
- Keep `firebase.config.*` imports inside `app/services/*` to avoid leaking integration details across layers.
- Keep services UI-agnostic: do not import components, screens, navigation, hooks, or contexts from `app/services/*`.
- Avoid async side effects directly in presentational components.
- Keep screens as thin containers that compose hooks and components.
- Prefer additive, scoped changes over cross-layer refactors.
- Keep route names centralized in `app/navigation/routes.js` to avoid drift between navigation and UI nav controls.

These boundaries are lint-enforced via `no-restricted-imports` in `.eslintrc.cjs`.
