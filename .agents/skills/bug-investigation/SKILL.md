---
name: bug-investigation
description: "재현 가능한 오류와 비정상 동작을 증거 중심으로 조사할 때 사용한다. 구현만 요청된 작업에는 사용하지 않는다. (bug investigation)"
---

# Purpose

Identify evidence-supported causes.

## Use When

- A defect or regression is reported.

## Do Not Use When

- The cause and approved fix are known.

## Required Inputs

- Symptom, expectation, and evidence.

## Workflow

1. Separate fact from hypothesis.
2. Reproduce and test hypotheses.
3. Verify the fix.

## Guardrails and Stop Conditions

- Do not label un-reproduced issues fixed.

## Required Artifacts

- Reproduction, evidence, cause, and uncertainty.

## Verification

- Link conclusions to observations.

## Completion Report

- State cause, fix evidence, and limits.
