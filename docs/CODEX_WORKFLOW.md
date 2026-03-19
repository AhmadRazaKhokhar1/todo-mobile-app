# Codex Workflow (Linear-Driven)

This document defines the Codex execution contract for this repository, using a Symphony-inspired structure: clear inputs, phase gates, explicit release ownership, and done-only-when-released delivery.

## 1. Objective

For each Linear issue, Codex must deliver:

- A minimal production-quality change in issue scope.
- Adherence to repository architecture and conventions.
- Validation evidence (or explicit validation gaps).
- Release completion with `git` + `gh` + Linear state transition when configured.

Work is not complete after coding. It is complete only after release steps succeed.

## 2. Inputs and Branch Contract

Before editing, confirm:

- Linear issue key and title (example: `TEC-21` / `Create docs`).
- Target base branch.
- Working branch naming pattern: `ISSUEKEY-short-kebab-title`.

Example:

```bash
git checkout -b TEC-21-create-docs
```

If orchestration sets `ORCH_BRANCH`, use that value for push/PR commands.

## 3. Repository Boundaries

Respect feature-layer boundaries:

- `app/components/`: reusable presentational UI.
- `app/screens/`: route-level screens.
- `app/hooks/`: stateful UI/data logic.
- `app/services/`: Firebase/external integrations.
- `app/Contexts/`: app-wide providers.

Quality guardrails:

- Keep screens thin; move async and data flows into hooks/services.
- Keep Firebase SDK calls inside `app/services/*`.
- Preserve naming style (`PascalCase` for screens/components, `camelCase` for hooks/services).
- Avoid unrelated refactors.

## 4. Phase Gates

### A) Plan

- Read the issue and `AGENTS.md`.
- Choose the smallest complete implementation.
- Confirm validation and release commands before editing.

### B) Implement

- Apply focused changes only for the issue.
- Keep docs and code concise and maintainable.
- Update `AGENTS.md` in the same PR if process expectations changed.

### C) Validate

Run from repository root:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, document that gap and provide substitute validation.

### D) Release

Execute in this order:

1. `git status`
2. `git add -A`
3. `git commit -m "TEC-21: Create docs"` (only when staged changes exist)
4. `git push -u origin "$ORCH_BRANCH"`
5. Check for existing PR and create one with `gh` when missing
6. If both orchestration IDs are set, run `python3 "$ORCH_LINEAR_STATE_SCRIPT"`

## 5. PR Content Standard

Each PR must include:

- What changed.
- Why it was needed.
- Validation commands and outcomes.
- Known gaps or follow-up work.

For process/docs issues, include these points explicitly:

- Docs improve Codex code-quality execution.
- Branch naming follows the Linear issue pattern.
- Delivery included `git` commit/push and `gh` PR creation.

## 6. PR Body Template

Use this template when creating the PR body file:

```md
Automated PR for Linear **TEC-21**

## Summary
- <what changed>

## Why
- <why this was needed>

## Validation
- `npm ci`: <result>
- `npm run lint`: <result>
- `npm start -- --non-interactive`: <result>

## Notes
- <known gaps or follow-up tasks>
```
