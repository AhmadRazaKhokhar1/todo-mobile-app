# Codex Workflow (Linear-Driven)

This document defines how Codex executes Linear issues in this repository using a structure inspired by `openai/symphony`: explicit inputs, strict phase gates, clear ownership boundaries, and release-complete delivery.

## 1. Execution Contract

For every issue, Codex must deliver all of the following:

- Minimal, production-quality changes that stay in issue scope.
- Architecture-aligned implementation for this Expo/Firebase app.
- Validation evidence for required checks.
- Completed release operations (`git` status/add/commit/push, `gh` PR flow, and Linear state update when configured).

Work is incomplete until release steps succeed.

## 2. Required Inputs

Before editing, confirm:

- Issue identifier and title (example: `TEC-21` / `Create docs`).
- Target base branch.
- Working branch naming contract: `ISSUEKEY-short-kebab-title`.

Branch example:

```bash
git checkout -b TEC-21-create-docs
```

If orchestration provides `ORCH_BRANCH`, use it for all release commands.

## 3. Architecture Boundaries

Follow repository boundaries:

- `app/components/`: reusable presentational UI.
- `app/screens/`: route-level screens.
- `app/hooks/`: stateful UI/data logic.
- `app/services/`: Firebase/external integrations.
- `app/Contexts/`: cross-cutting providers.

Guardrails:

- Keep route screens thin; put async/data logic in hooks/services.
- Do not call Firebase SDK directly from screens.
- Preserve naming conventions (`PascalCase` components/screens, `camelCase` hooks/services).
- Avoid unrelated refactors.

## 4. Phase Gates

### Phase A: Plan

- Read issue details and `AGENTS.md`.
- Choose the smallest complete implementation.
- Confirm validation and release commands.

### Phase B: Implement

- Apply focused edits aligned to issue scope.
- Keep docs/code concise and maintainable.
- Update `AGENTS.md` in the same PR when process expectations change.

### Phase C: Validate

Run from repository root:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, record that gap in the PR and provide substitute validation.

### Phase D: Release

Execute in order:

1. `git status`
2. `git add -A`
3. `git commit -m "TEC-21: Create docs"` when staged changes exist
4. `git push -u origin <working-branch>`
5. Check for existing PR; create with `gh` if missing
6. Run orchestration Linear state transition script when both required IDs are configured

## 5. Pull Request Standard

Every PR must include:

- What changed.
- Why it was needed.
- Validation steps and outcomes.
- Known gaps or follow-up work.

For process/documentation issues, explicitly mention:

- Documentation improves Codex code-quality execution.
- Branch naming follows Linear issue format.
- Delivery included commit, push, and PR creation with `git` and `gh`.

## 6. PR Body Template

Use this when creating the PR body file:

```md
Automated PR for Linear **TEC-21**

## Summary
- <what changed>

## Why
- <why this was needed>

## Validation
- `npm ci` : <result>
- `npm run lint` : <result>
- `npm start -- --non-interactive` : <result>

## Notes
- <known gaps or follow-up tasks>
```
