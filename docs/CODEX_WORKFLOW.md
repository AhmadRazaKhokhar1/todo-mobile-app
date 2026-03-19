# Codex Workflow (Linear-Driven)

This document defines how Codex executes Linear issues in this repository using a structured workflow inspired by `openai/symphony`: clear phase gates, explicit ownership boundaries, and mandatory release completion.

## 1. Objective

For every Linear issue, Codex must ship:

- a minimal, production-quality change scoped to the issue,
- architecture-aligned implementation,
- explicit validation evidence,
- completed release operations (`git`, `gh`, and Linear state transition when configured).

## 2. Inputs and Branch Contract

Before editing files, verify:

- Linear issue key and title (example: `TEC-21` / `Create docs`),
- base branch target,
- working branch name in `ISSUEKEY-short-kebab-title` format.

Branch naming example:

```bash
git checkout -b TEC-21-create-docs
```

If orchestration pre-sets a branch (for example via `ORCH_BRANCH`), use that branch for release commands.

## 3. Repository Architecture Guardrails

Respect the existing project boundaries:

- `app/components/`: reusable presentational UI.
- `app/screens/`: route-level screens.
- `app/hooks/`: stateful UI/data logic.
- `app/services/`: Firebase and external integration boundaries.
- `app/Contexts/`: global cross-cutting providers.

Engineering constraints:

- Keep screens thin; place async/data logic in hooks/services.
- Do not call Firebase SDK directly from screens.
- Preserve naming conventions (`PascalCase` for screens/components, `camelCase` for hooks/services).
- Avoid unrelated refactors in the same issue.

## 4. Delivery Phases

### Phase A: Plan

- Read issue requirements and repository instructions in `AGENTS.md`.
- Select the smallest complete implementation.
- Confirm validation commands and release steps before coding.

### Phase B: Implement

- Apply focused edits strictly aligned to issue scope.
- Keep docs/code concise, maintainable, and actionable.
- Update `AGENTS.md` in the same PR if workflow expectations change.

### Phase C: Validate

Run from repository root:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, document the gap and include substitute validation evidence in the PR.

## 5. Mandatory Release Checklist

Issue work is not complete until all applicable steps below succeed:

1. `git status`
2. `git add -A`
3. `git commit -m "TEC-21: Create docs"` (only when staged changes exist)
4. `git push -u origin <working-branch>`
5. Check for an existing PR; create one when missing using GitHub CLI
6. Run orchestration-provided Linear state update when both issue/state IDs are configured

## 6. Pull Request Content Standard

Every PR must include:

- what changed,
- why the change was needed,
- validation commands and outcomes,
- known gaps or follow-up tasks.

For process/docs issues, explicitly state:

- the documentation improves Codex code-quality execution,
- branch naming follows Linear issue conventions,
- delivery includes commit, push, and PR creation with `git` and `gh`.
