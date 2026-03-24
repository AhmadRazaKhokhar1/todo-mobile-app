# Todo Mobile App: Codex Operating Guide

This repository contains a React Native (Expo) Todo app using Firebase persistence.
This guide is the contract Codex should follow to keep changes scoped, testable, and release-ready.

## 1) Mission and Scope

- Deliver the smallest complete change for the active Linear issue.
- Prefer production-safe edits over broad refactors.
- Keep architecture boundaries intact and document any intentional exceptions.

## 2) Environment

- Node.js: use the version compatible with `package.json`.
- Package manager: `npm`.
- Install dependencies: `npm ci`.
- Start development server: `npm start`.

## 3) Repository Architecture (Feature-Layered)

Follow the existing layer boundaries under `app/`:

- `app/components/`: reusable presentational UI building blocks.
- `app/screens/`: route-level screens (`Home`, `About`).
- `app/navigation/`: app/container navigation wiring (`AppNavigator`) and route graph composition (`RootNavigator`).
- `app/hooks/`: stateful UI/data hooks (`useTodos`).
- `app/services/`: external integrations and persistence (`todoService`, Firebase).
- `app/Contexts/`: app-wide providers and cross-cutting state.

Entry points and config:

- `App.js`: app bootstrap and top-level providers/routing.
- `firebase.config.js`: Firebase app setup.
- `app.json`, `babel.config.js`: Expo and build configuration.

## 4) Engineering Quality Rules

- Keep components presentational when possible; move async/data logic to hooks/services.
- Encapsulate Firebase SDK usage inside `app/services/*`; do not call SDK directly from screens.
- Preserve naming conventions: `PascalCase` for components/screens, `camelCase` for hooks/services.
- Keep changes focused; avoid unrelated file churn in the same PR.
- If architecture/workflow/quality expectations change, update this file in the same PR.

## 5) Validation Checklist

This repo has no formal test suite yet. Run these checks before opening a PR:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, document that gap in the PR and include local runtime validation results.

## 6) Linear Branching and Delivery Workflow

Branch names must include the Linear identifier and a kebab-case title.

Example for `TEC-21` ("Create docs"):

```bash
git checkout -b TEC-21-create-docs
```

Standard delivery sequence:

```bash
git status
git add -A
git commit -m "TEC-21: Create docs"
git push -u origin TEC-21-create-docs
gh pr create --title "TEC-21: Create docs" --body-file /tmp/pr_body.md
```

## 7) PR Content Requirements

Every PR should include:

- What changed.
- Why the change was needed.
- Validation steps executed and results.
- Known gaps or follow-up tasks.

Keep summaries concise and tightly aligned with the Linear issue scope.
