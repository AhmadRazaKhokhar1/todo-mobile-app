# CONTRIBUTING

## Setup

1. Install Node.js compatible with `package.json`.
2. Install dependencies:
   - `npm ci`
3. Start the app:
   - `npm start`

## Branching and commits

- Create a branch that includes the issue identifier and short description.
- Keep commits focused and scoped to a single issue.
- Use clear commit messages (issue ID preferred), for example:
  - `TEC-30: change the primary color`

## Pull request checklist

- Scope is limited to the target issue.
- Lint passes locally.
- App starts successfully in CI mode.
- Architecture/docs are updated when behavior or boundaries change.
- PR body includes:
  - what changed
  - why it changed
  - exact validation commands and results
  - screenshots/recordings (or manual verification notes) for UI updates
