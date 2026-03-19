# Codex Engineering Docs

This document defines how Codex should operate in this repository to preserve quality and delivery speed.

## 1. Architecture Overview

Codex work follows a simple layered architecture:

1. Input Layer
- Linear issue context (`TEC-XX`, title, acceptance criteria).
- Repository context (current branch, changed files, existing patterns).

2. Execution Layer
- Plan the smallest complete change.
- Implement with repo conventions and production quality.
- Validate affected behavior (tests or focused checks when available).

3. Delivery Layer
- Stage, commit, push, and create/update PR using `git` and `gh`.
- Move issue workflow state when configured.

This structure mirrors the orchestration mindset used in OpenAI Symphony-style agent workflows: explicit inputs, deterministic execution, and traceable delivery steps.

## 2. Branching Convention

Branch names must track the Linear issue and title in a readable slug.

Format:

`<ISSUE-ID>-<short-title-slug>`

Example:

`TEC-20-create-docs-for-codex`

If orchestration sets `$ORCH_BRANCH`, use it as the source of truth.

## 3. Quality Standards

Codex changes must follow these standards:

- Smallest complete fix, not partial work.
- Keep behavior consistent with existing app architecture.
- Avoid unrelated refactors in issue-scoped PRs.
- Include concise comments only when logic is non-obvious.
- Keep docs actionable with concrete commands.

## 4. Delivery Workflow (Git + GH CLI)

From repository root:

```bash
git status
git add -A
git commit -m "TEC-20: Create Docs for Codex"   # only when staged changes exist
git push -u origin "$ORCH_BRANCH"
```

PR workflow:

```bash
"$ORCH_GH_BIN" pr list \
  --repo "$ORCH_GH_REPO" \
  --head "$ORCH_BRANCH" \
  --state open \
  --json url
```

If no open PR exists:

```bash
cat > /tmp/orch_pr_body.md <<'EOF'
Automated PR for Linear **TEC-20**

## Summary
- Add Codex engineering docs for architecture, quality standards, and delivery workflow.
- Define branch naming and PR process using `git` and `gh`.
- Align documentation style with a structured orchestration architecture.
EOF

"$ORCH_GH_BIN" pr create \
  --repo "$ORCH_GH_REPO" \
  --base "$ORCH_BASE_BRANCH" \
  --head "$ORCH_BRANCH" \
  --title "TEC-20: Create Docs for Codex" \
  --body-file /tmp/orch_pr_body.md
```

## 5. Linear State Update

After PR exists, if both `ORCH_LINEAR_ISSUE_ID` and `ORCH_LINEAR_STATE_ID` are set:

```bash
python3 "$ORCH_LINEAR_STATE_SCRIPT"
```

If `ORCH_LINEAR_STATE_ID` is not set, skip this step.

## 6. Definition of Done

Work is complete only when all applicable steps succeed:

1. Code/docs change is present and intentional.
2. Commit exists (or "nothing to commit" is explicitly documented).
3. Branch is pushed to origin.
4. PR exists (created or pre-existing and updated by push).
5. Linear state update completed when configured.
