# Codex Workflow (Linear-Driven)

This document defines how Codex executes Linear issues in this repository with a structured, architecture-first workflow inspired by the operational style used in `openai/symphony`.

## 1. Workflow Goal

For every Linear task, Codex must deliver:

- a minimal, production-quality change,
- architecture-aligned implementation,
- explicit validation results,
- completed release operations (`git`, `gh`, and Linear state handoff when configured).

## 2. Required Inputs

Before editing code, confirm:

- Linear issue key and title (example: `TEC-21` / `Create docs`),
- target base branch,
- working branch in `ISSUEKEY-short-kebab-title` format.

Branch naming example:

```bash
git checkout -b TEC-21-create-docs
```

## 3. Architecture Contract

Keep changes aligned to the existing app boundaries:

- `app/components/`: reusable presentational UI.
- `app/screens/`: route-level screens.
- `app/hooks/`: stateful UI/data logic.
- `app/services/`: Firebase and external integration boundaries.
- `app/Contexts/`: global cross-cutting providers.

Implementation rules:

- Keep screens thin; move async/data logic into hooks/services.
- Do not call Firebase SDK directly from screens.
- Preserve naming conventions (`PascalCase` for screens/components, `camelCase` for hooks/services).
- Avoid unrelated refactors in the same issue.

## 4. Execution Model

### Phase 1: Plan

- Read issue requirements and repository instructions in `AGENTS.md`.
- Choose the smallest complete change set.
- Identify validation and release requirements up front.

### Phase 2: Implement

- Apply focused edits only for the requested scope.
- Prefer clear, maintainable docs and code over broad rewrites.
- If workflow or architecture expectations change, update `AGENTS.md` in the same PR.

### Phase 3: Validate

Run from repository root:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, record the gap in the PR with substitute validation evidence.

## 5. Release Operations (Mandatory)

After implementation and validation, execute release steps in order:

1. `git status`
2. `git add -A`
3. `git commit -m "TEC-21: Create docs"` (only if staged changes exist)
4. `git push -u origin <working-branch>`
5. PR check/create with GitHub CLI (`gh` or orchestrator-provided binary)
6. Linear state update script when both issue/state IDs are configured by orchestration

Task completion is reached only after push + PR handling + Linear state update (when configured) succeed.

## 6. PR Content Standard

Every PR should include:

- what changed,
- why it was needed,
- validation commands and outcomes,
- known gaps or follow-up work.

For docs/process issues, include:

- this documentation enables Codex to maintain code quality,
- branch naming follows Linear issue key + title,
- delivery includes commit, push, and PR creation via `git` and `gh`.
