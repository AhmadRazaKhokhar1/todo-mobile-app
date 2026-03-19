# Codex Workflow Guide

This guide defines how Codex should execute Linear issues in this repository while preserving code quality and release consistency.

## 1. Scope and Change Design

- Keep changes tightly aligned to the Linear issue.
- Prefer the smallest complete implementation over broad refactors.
- Follow the current architecture:
  - `app/components/` for reusable UI.
  - `app/screens/` for route-level screens.
  - `app/hooks/` for stateful logic.
  - `app/services/` for Firebase and external integrations.
  - `app/Contexts/` for cross-cutting app context.

## 2. Quality Guardrails

- Keep async/data logic out of screens when possible; place it in hooks/services.
- Do not call Firebase SDK directly from screens; use `app/services/*`.
- Preserve naming conventions:
  - `PascalCase` for screens/components.
  - `camelCase` for hooks/services.
- Avoid unrelated file edits in the same issue.

## 3. Branch Naming

For Linear issues, create branches with the issue key and short kebab-case title:

```bash
git checkout -b TEC-21-create-docs
```

## 4. Validation Sequence

Run from repository root:

```bash
npm ci
npm run lint
npm start -- --non-interactive
```

If `npm run lint` is unavailable, note this in the PR body and include local runtime validation.

## 5. Release Steps (Git + GitHub CLI)

After implementation and validation:

```bash
git status
git add -A
git commit -m "TEC-21: Create docs"
git push -u origin <branch-name>
gh pr create --title "TEC-21: Create docs" --body-file /tmp/pr_body.md
```

PR body should include:

- What changed.
- Why the change was needed.
- Validation steps and outcomes.
- Gaps and follow-up tasks.

## 6. PR Content Baseline

When writing PR descriptions for docs/process work, use concise and factual language and include this task context:

- The docs help Codex maintain code quality.
- The process includes branch naming tied to Linear issue titles.
- The process includes commit, push, and PR creation through `git` and `gh`.
- The structure should align with the architecture style used in `openai/symphony` (clear sections, workflow-oriented guidance, and explicit operational steps).
