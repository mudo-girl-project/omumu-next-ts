---
name: pr-review
description: "PR, branch, 또는 staged diff를 리뷰 전용으로 점검할 때 사용한다. 수정 요청이 없으면 파일을 바꾸지 않는다. (PR review)"
---

# Purpose

Find actionable review risks without edits.

## Use When

- A diff needs review.

## Do Not Use When

- A feature must be implemented.

## Required Inputs

- Review target and base revision.

## Workflow

1. Confirm range.
2. Inspect correctness and tests.
3. Report findings with evidence.

## Guardrails and Stop Conditions

- Do not edit, commit, push, or merge.

## Required Artifacts

- Findings and scope summary.

## Verification

- Give each finding a location and scenario.

## Completion Report

- State actionable findings and gaps.
