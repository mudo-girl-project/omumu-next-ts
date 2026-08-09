# Decisions

## D-001: Integrate task pull requests through `dev`

- Date: 2026-08-10
- Status: accepted

### Context

The repository previously accepted task pull requests directly into `main`. The project now uses a development integration branch created from `origin/main`.

### Decision

Create each task branch from the latest `origin/dev` and target pull requests to `dev`. Keep `main` as the release branch.

### Consequences

- Sequential task pull requests include every previously merged `dev` change.
- Release promotion from `dev` to `main` is a separate explicit operation.
- Agent instructions and PR metadata must verify the base branch before merge.

### Verification / Evidence

- `AGENTS.md` records the workflow.
- GitHub PR metadata must report `baseRefName: dev`.
