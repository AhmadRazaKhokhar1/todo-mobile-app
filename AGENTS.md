# Todo Mobile App

This repository contains a React Native (Expo) Todo mobile app using Firebase for data persistence.

## Environment

- Node.js: use the version compatible with `package.json` dependencies.
- Package manager: `npm`.
- Install dependencies: `npm ci`.
- Start development server: `npm start`.

## Architecture

The app follows a feature-layered structure under `app/`:

- `app/components/`: reusable UI pieces (for example navigation bar).
- `app/screens/`: route-level screens (`Home`, `About`).
- `app/hooks/`: stateful UI/data hooks (`useTodos`).
- `app/services/`: external integration and persistence (`todoService`, Firebase).
- `app/Contexts/`: global context providers (theme and cross-cutting UI state).

Entry points and configuration:

- `App.js`: app bootstrap and top-level providers/routing.
- `firebase.config.js`: Firebase app setup.
- `app.json`, `babel.config.js`: Expo and build configuration.

## Codebase Conventions

- Keep UI components presentational when possible; move async/data logic into hooks or services.
- Keep Firebase access encapsulated in `app/services/*` instead of calling SDK methods directly from screens.
- Preserve current file and naming style (`PascalCase` for screens/components, `camelCase` for hooks/services).
- Prefer small, focused changes and avoid unrelated refactors.

## Tests and Validation

This repository currently has no formal test suite configured.
Use the following quality checks before opening a PR:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, document that gap in the PR and validate by running the app locally.

## Branch and PR Workflow

For Linear-driven work, branch names must include the issue identifier and a short kebab-case title.

Example for `TEC-21` / "Create docs":

```bash
git checkout -b TEC-21-create-docs
```

After implementation:

```bash
git status
git add -A
git commit -m "TEC-21: Create docs"
git push -u origin TEC-21-create-docs
gh pr create --title "TEC-21: Create docs" --body-file /tmp/pr_body.md
```

## PR Requirements

PRs should include:

- What changed.
- Why the change was needed.
- Validation steps executed and results.
- Any known gaps or follow-up tasks.

Use concise, factual summaries and keep scope tightly aligned to the Linear issue.

## Docs Update Policy

When architecture, workflow, or quality expectations change, update this file in the same PR so Codex instructions stay current.
