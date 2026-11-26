# Refactor & DX Status

This document records completed, deferred, and deliberately skipped work. Add a new item only when there is a concrete defect, requirement, or measured maintenance cost.

## Completed

- [x] Document installation, environment variables, and verification commands.
- [x] Track `.env.example` with the runtime environment keys.
- [x] Validate and test `POST /api/chat` requests and provider failures.
- [x] Bound Gemini requests with the SDK timeout option and a focused test.
- [x] Persist chat history and timestamps with browser localStorage.
- [x] Label chat controls and expose the loading status to assistive technology.
- [x] Correct sitemap and structured metadata claims.
- [x] Run lint, tests, format checks, build, and commitlint in CI.
- [x] Upgrade Next.js to clear production dependency audit findings.
- [x] Version project-specific agent guidance and harness metadata.

## Deferred

- [ ] Configure hosting/WAF rate limiting for `POST /api/chat` and verify HTTP 429 behavior.

  This remains an external deployment task by explicit product decision. Do not replace it with process-memory rate limiting in the serverless route.

## Not Planned Without Evidence

- `npm run setup`: `npm install` already runs the `prepare` script.
- `.env.local.example`: `.env.example` is the single template.
- `lint-staged`: CI enforces formatting and linting without another dependency.
- `zod` or a shared request type folder: the small API boundary has direct validation and tests.
- Zustand: localStorage persistence does not need a client-state dependency.
- Retry/backoff and custom provider error classes: add only when observed failures require them.
- `src/features/*` migration: current source files remain small enough to navigate directly.
- Broad component or E2E test scaffolding: add focused regression coverage when behavior warrants it.
