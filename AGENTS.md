# Project-Specific Instructions

## Repository Workflow

- Read `docs/codex/tasks/active/README.md` and any active task files before changing code.
- Read these project-specific instructions before the `codex-harness-core` section below.
- Use the latest `origin/dev` as the base for task branches and target pull requests to `dev`.
- Treat `main` as the release branch; do not push or merge task changes directly to it.
- Use `feat/`, `fix/`, `chore/`, or `docs/` branch prefixes. Do not use agent-specific prefixes.

## GitHub Authentication

- Before reporting that GitHub authentication is expired, invalid, or missing, run `gh auth status` as a standalone command.
- Base the report on that command's output and exit code. If another GitHub command fails while authentication is valid, report that command's actual error instead.
- Do not place `gh auth status` after a command that may stop the shell before the authentication check runs.

## Required Verification

- Install: `npm ci` in CI; `npm install` for local dependency updates.
- Test: `npm test`.
- Lint: `npm run lint`.
- Format: `npm run format:check`.
- Build and typecheck: `npm run build`.

<!-- codex-harness-core:start -->

# Project Agent Guide

## Harness

- Core version: 0.3.0
- 프로젝트 고유 지침은 공통 core 지침보다 우선합니다.
- Read `docs/codex/tasks/active/README.md` and any active task files before work starts.

## Project Map

- Purpose: AI-powered Infinite Challenge video recommendation chat service.
- Main source: `src/app`, `src/components`, and `src/lib`.
- Architecture notes: Next.js App Router; `/api/chat` is the server boundary, `src/lib/gemini.ts` owns provider calls, and browser chat history uses localStorage.

## Sources of Truth

- Product requirements: `README.md` and visible application behavior.
- Design references: `src/app/globals.css` and `src/screenshots/chat-example.gif`.
- API contracts: `src/app/api/chat/route.ts` and its colocated tests.

## Setup and Commands

- Install: `npm install`.
- Test: `npm test`.
- Lint: `npm run lint`.
- Typecheck: `npm run build`.
- Build: `npm run build`.

## Working Agreements

- Preserve unrelated changes and use the smallest safe change.
- Keep verification evidence with the active task or handoff.

## Skill Routing

- Feature delivery: feature-delivery
- Investigation: bug-investigation
- Review: pr-review
- Multi-repository change: cross-repo-coordination
- Explanation request: understanding-debt

## Safety and Data Boundaries

- Do not copy secrets, private data, or full diffs into task artifacts.
- Do not change remote Git state without an explicit request.

## Definition of Done

- Acceptance criteria and required verification evidence are present.
- Update the handoff when work is paused or transferred.
<!-- codex-harness-core:end -->
