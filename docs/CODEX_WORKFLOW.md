# Codex Workflow (Linear-Driven)

This document defines the Codex execution contract for this repository using a Symphony-style delivery model: explicit inputs, deterministic phase gates, and done-only-when-released ownership.

## 1. Outcome Definition

For each Linear issue, Codex must deliver all of the following:

- A minimal production-quality change within issue scope.
- Conformance to repository architecture and naming conventions.
- Validation evidence (or explicit validation gaps).
- Completed release operations (`git` + `gh`) and Linear state transition when configured.

Coding completion is not task completion. Work is complete only after release steps succeed.

## 2. Inputs and Contracts

Before editing, confirm:

- Linear issue identifier and title (example: `TEC-21` / `Create docs`).
- Base branch for the PR.
- Branch naming pattern: `ISSUEKEY-short-kebab-title`.

Example branch creation:

```bash
git checkout -b TEC-21-create-docs
```

If orchestration defines `ORCH_BRANCH`, that value is the source of truth for push and PR commands.

## 3. Repository Architecture Boundaries

Respect feature-layer boundaries under `app/`:

- `components/`: reusable presentational UI.
- `screens/`: route-level screens.
- `hooks/`: stateful UI/data logic.
- `services/`: Firebase/external integrations.
- `Contexts/`: global providers.

Guardrails:

- Keep screens thin; place async/data behavior in hooks/services.
- Keep Firebase SDK access inside `app/services/*`.
- Preserve naming conventions (`PascalCase` for components/screens, `camelCase` for hooks/services).
- Avoid unrelated refactors.

## 4. Execution Phases (Gate Model)

### Gate A: Plan

- Read the Linear task and `AGENTS.md`.
- Select the smallest complete implementation.
- Confirm validation and release commands before making changes.

### Gate B: Implement

- Apply focused edits for the issue only.
- Keep docs and code maintainable and concise.
- Update `AGENTS.md` in the same PR if workflow expectations change.

### Gate C: Validate

Run from repository root:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, document that in the PR and provide substitute validation evidence.

### Gate D: Release (Required)

Execute in this order:

1. `git status`
2. `git add -A`
3. If staged changes exist: `git commit -m "<ISSUE>: <title>"`
4. `git push -u origin "$ORCH_BRANCH"`
5. Check existing PR:
   - `"$ORCH_GH_BIN" pr list --repo "$ORCH_GH_REPO" --head "$ORCH_BRANCH" --state open --json url`
6. If no PR exists:
   - Create `/tmp/orch_pr_body.md`
   - `"$ORCH_GH_BIN" pr create --repo "$ORCH_GH_REPO" --base "$ORCH_BASE_BRANCH" --head "$ORCH_BRANCH" --title "<ISSUE>: <title>" --body-file /tmp/orch_pr_body.md`
7. If both `ORCH_LINEAR_ISSUE_ID` and `ORCH_LINEAR_STATE_ID` are set:
   - `python3 "$ORCH_LINEAR_STATE_SCRIPT"`

If `ORCH_LINEAR_STATE_ID` is unset, skip step 7.

## 5. PR Content Standard

Each PR body must include:

- What changed.
- Why it changed.
- Validation commands executed and outcomes.
- Known gaps or follow-ups.

For process/documentation issues, explicitly state:

- The docs improve Codex quality and release consistency.
- Branch naming follows the Linear issue pattern.
- Delivery included commit, push, PR creation, and Linear update handling.

## 6. PR Body Template

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
