# Codex Workflow (Linear-Driven)

This document defines how Codex should execute work in this repository while maintaining code quality and predictable delivery.

## 1. Purpose

Use this workflow for Linear issues so each change is:

- scoped to the requested outcome,
- aligned to the existing app architecture,
- validated before release,
- shipped with a complete Git and GitHub CLI trail.

## 2. Required Inputs

Before implementation, confirm the following values are available:

- Linear issue key and title (for example `TEC-21` / `Create docs`).
- Target base branch.
- Working branch name in `ISSUEKEY-short-kebab-title` format.

Branch format example:

```bash
git checkout -b TEC-21-create-docs
```

## 3. Architecture Alignment

Keep changes consistent with the repository structure:

- `app/components/`: reusable presentational UI.
- `app/screens/`: route-level screens.
- `app/hooks/`: stateful UI/data logic.
- `app/services/`: Firebase/external integration boundaries.
- `app/Contexts/`: cross-cutting global providers.

Rules:

- Keep screens thin; move async and data logic to hooks/services.
- Do not call Firebase SDK directly from screens.
- Keep naming conventions unchanged (`PascalCase` for components/screens, `camelCase` for hooks/services).
- Avoid unrelated refactors in the same issue.

## 4. Execution Phases

### Phase A: Plan

- Read issue requirements and repository instructions (`AGENTS.md`).
- Identify smallest complete change.
- Note risks and validation needs.

### Phase B: Implement

- Make focused edits only for the issue scope.
- Keep docs and workflow instructions concise and operational.
- If process or architecture expectations change, update `AGENTS.md` in the same PR.

### Phase C: Validate

Run from repository root:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is not available, document that gap in the PR and include runtime validation evidence.

## 5. Release Checklist (Git + GH CLI)

After implementation and validation:

```bash
git status
git add -A
git commit -m "TEC-21: Create docs"
git push -u origin TEC-21-create-docs
gh pr create --title "TEC-21: Create docs" --body-file /tmp/pr_body.md
```

PR content must include:

- What changed.
- Why it changed.
- Validation steps and results.
- Known gaps or follow-up tasks.

## 6. PR Body Template (Docs/Process Work)

Use concise, factual language. Include the following baseline points when relevant:

- This documentation helps Codex maintain code quality.
- Branch naming follows the Linear issue identifier and title.
- Delivery includes commit, push, and PR creation through `git` and `gh`.
- Structure follows a workflow-oriented, sectioned style inspired by `openai/symphony` documentation patterns.
