# Chat Redesign Design

## Goal

Keep Omumu's warm ivory-and-brown identity while making the chat faster to load, easier to understand on mobile, keyboard-friendly, recoverable after errors, and compliant with WCAG AA basics.

## Baseline

A mobile Lighthouse run against production on 2026-08-10 measured Performance 55, Accessibility 95, Best Practices 96, and SEO 100. The render-blocking Pretendard stylesheet downloads a roughly 2 MB font and dominates first paint. The current welcome message is also the largest-contentful element. Two low-contrast text treatments fail the 4.5:1 requirement.

## Architecture

The redesign stays inside the existing Next.js App Router application. Tailwind utility classes and the current color tokens remain the styling mechanism; no component library, state library, animation package, or custom Markdown parser is added. Each change ships as a small PR from `origin/dev` back to `dev`.

The implementation order removes the primary load bottleneck first, then establishes the responsive shell, then changes chat behavior, storage, and accessibility. Later PRs may rely on UI introduced by earlier PRs, but each PR must build and remain usable on its own.

## User Interface

The page uses `min-h-dvh` and a compact responsive header. The About link remains reachable at mobile widths. On desktop, chat sits in a restrained panel; on mobile, it uses the available viewport without a decorative card margin. Footer copy is reduced so the conversation stays primary.

An empty conversation displays a short introduction and four prompt buttons covering cast member, mood, special episode, and viewing duration. A prompt button sends its visible text through the same send path as typed input. The previous long `welcome` record is not persisted or rendered as history.

The composer is a semantic form with a 500-character browser-enforced limit. Enter submits and Shift+Enter inserts a newline. During a request, users may continue drafting, but a second submission is blocked. A character count becomes visible at 450 characters.

Request failures appear as transient UI, not as assistant history. Retry repeats the failed request without inserting another user bubble. Assistant responses expose a copy action and announce copy success or failure.

## Data and State

Browser history keeps only real user and assistant messages. Parsing removes legacy `welcome` entries and keeps the newest 100 valid messages. Serialization applies the same 100-message bound before writing to localStorage. Clearing a conversation removes storage and restores the empty state.

Transient error and copy status stay in component state and are never serialized. Message element refs are deleted when React detaches nodes. A single module-level Korean time formatter replaces per-render formatter construction.

## Accessibility

The message stream is a labelled log. Loading and result state use `aria-busy`, live-region announcements, and explicit speaker labels without causing duplicate announcements. All interactive controls have visible focus indicators and at least 44-by-44-pixel touch targets. Low-contrast time and footer text use opaque, contrast-safe colors.

When `prefers-reduced-motion: reduce` is active, loading dots do not bounce and programmatic scrolling is immediate. Links opened in a new window include accessible wording.

## Error Handling

The existing server error contract remains unchanged. The client displays a concise failure message and retry control. Invalid or unavailable localStorage falls back to an in-memory conversation without blocking chat. Clipboard failure leaves the response intact and announces that copying failed.

## Verification

Every PR runs `npm test`, `npm run lint`, `npm run format:check`, and `npm run build`. Behavior changes follow red-green TDD with the smallest test that proves the contract. UI PRs are checked at 320, 390, 768, and 1440 CSS pixels, by keyboard, and with reduced motion enabled.

After the final merge, three mobile Lighthouse runs are compared by median. Acceptance targets are Performance at least 90, Accessibility 100, no external Pretendard request, no WCAG AA contrast finding, and the long welcome paragraph no longer being the LCP element.

## Explicitly Excluded

- Hosting or WAF rate limiting, which remains deferred.
- A full rebrand or new design system.
- Streaming responses, global state management, or a new animation library.
- New custom fonts or image assets.
