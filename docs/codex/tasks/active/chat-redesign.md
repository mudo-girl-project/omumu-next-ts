# Chat Redesign

## Scope

Deliver the approved brand-preserving redesign through the seven implementation PRs defined in `docs/superpowers/plans/2026-08-10-chat-redesign.md`.

## Acceptance Criteria

- [ ] No external Pretendard stylesheet or font request.
- [ ] Responsive shell works at 320, 390, 768, and 1440 CSS pixels.
- [ ] Empty chat presents four usable prompt actions without persisting a welcome message.
- [ ] Composer supports form submission, Shift+Enter, a 500-character limit, and drafting during requests.
- [ ] Failed requests can be retried without duplicate history; assistant answers can be copied.
- [ ] Browser history is capped at the latest 100 valid messages.
- [ ] Chat log, status, speaker, focus, contrast, and reduced-motion behavior meet the design spec.
- [ ] Median of three mobile Lighthouse runs reaches Performance 90 and Accessibility 100.

## Verification Evidence

Record each PR URL, merge commit, checks, manual viewport/keyboard result, and final Lighthouse median here as work progresses.

## Handoff

In progress on 2026-08-10. Base and PR target: `dev`. Rate limiting remains deferred and excluded.
