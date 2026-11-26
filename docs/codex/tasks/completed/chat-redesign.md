# Chat Redesign

## Scope

Delivered the approved brand-preserving redesign through seven implementation PRs, with planning and completion records targeting `dev`.

## Acceptance Criteria

- [x] No external Pretendard stylesheet or font request.
- [x] Responsive shell works at 320, 390, 768, and 1440 CSS pixels.
- [x] Empty chat presents four usable prompt actions without persisting a welcome message.
- [x] Composer supports form submission, Shift+Enter, a 500-character limit, and drafting during requests.
- [x] Failed requests can be retried without duplicate history; assistant answers can be copied.
- [x] Browser history is capped at the latest 100 valid messages.
- [x] Chat log, status, speaker, focus, contrast, and reduced-motion behavior meet the design spec.
- [x] Median of three mobile Lighthouse runs reaches Performance 90 and Accessibility 100.

## Pull Requests

| PR                                                                | Change                   | Merge commit                               |
| ----------------------------------------------------------------- | ------------------------ | ------------------------------------------ |
| [#7](https://github.com/mudo-girl-project/omumu-next-ts/pull/7)   | Design and delivery plan | `ad6287ccd31cd5ce3c122ba3b54249fd2d038ba3` |
| [#8](https://github.com/mudo-girl-project/omumu-next-ts/pull/8)   | Remove blocking web font | `85d3571f0b9d78395c9b54d7004f7da63e22dfab` |
| [#9](https://github.com/mudo-girl-project/omumu-next-ts/pull/9)   | Responsive app shell     | `6126f1fb106ce44a722e7cc71f748c61a06266ea` |
| [#10](https://github.com/mudo-girl-project/omumu-next-ts/pull/10) | Prompt-based empty state | `a9cda1ccc290d0b07c788ac5adde96b28dfc407a` |
| [#11](https://github.com/mudo-girl-project/omumu-next-ts/pull/11) | Composer usability       | `578a7cee2e05916a5122d69adbd62c5e43d56f38` |
| [#12](https://github.com/mudo-girl-project/omumu-next-ts/pull/12) | Retry and copy actions   | `c4cd71f99eaa1f1a26194f7b0bf8a7055b3bbc5e` |
| [#13](https://github.com/mudo-girl-project/omumu-next-ts/pull/13) | Browser history bound    | `953b7c860019d4ce99699d97f53f3525fcc99226` |
| [#14](https://github.com/mudo-girl-project/omumu-next-ts/pull/14) | Chat accessibility       | `45e2492697d326d584f8d17e52d843fcd00a4db8` |

## Verification Evidence

- Local: `npm test` passed 27 tests; `npm run lint` and `npm run format:check` passed.
- Local build: `npm run build -- --webpack` passed. The Codex seatbelt blocks Turbopack's internal PostCSS port binding.
- CI: every implementation PR passed formatting, lint, tests, the standard production Turbopack build, commitlint, and Vercel deployment.
- Responsive: 320 and 390 CSS pixel Lighthouse renders and 768 and 1440 CSS pixel screenshots showed no horizontal overflow.
- Three 390 CSS pixel Lighthouse runs: median Performance 99, Accessibility 100, Best Practices 100, SEO 100, FCP 755 ms, LCP 2,059 ms, CLS 0, and TBT 45 ms.
- All three runs passed color contrast and made zero Pretendard/jsDelivr font requests.
- A separate 320 CSS pixel Lighthouse run measured Performance 99 and Accessibility 100.
- Compiled CSS contains the reduced-motion animation override; unit tests select instant scrolling when reduced motion is requested.

## Handoff

Completed on 2026-08-10. Base and PR target were `dev`. Rate limiting remains deferred and excluded. The existing GitHub Actions Node 20 deprecation warning for `actions/checkout@v4`, `actions/setup-node@v4`, and `actions/cache@v4` is unrelated follow-up work.
