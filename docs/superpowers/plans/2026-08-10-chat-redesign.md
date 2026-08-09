# Chat Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the approved brand-preserving usability, accessibility, and performance redesign as seven independently reviewed pull requests.

**Architecture:** Keep the existing App Router and component structure. Use native HTML, CSS, browser storage, and clipboard features with the existing React/Tailwind stack; add only the minimum helpers required to make state transitions testable.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Vitest, React DOM server rendering.

## Global Constraints

- Branch from the latest `origin/dev` and target every pull request to `dev`.
- Use only `feat/`, `fix/`, `chore/`, or `docs/` branch prefixes.
- Add no runtime dependencies or custom font assets.
- Preserve input validation, error handling, security behavior, and accessibility basics.
- Run `npm test`, `npm run lint`, `npm run format:check`, and `npm run build` before each PR is merged.
- Create a draft PR, review its diff, fix actionable findings, wait for required checks, then merge before starting the next PR.

---

### Task 1: Remove render-blocking external font

**Files:**

- Modify: `src/app/globals.css`

**Interfaces:**

- Consumes: existing `--font-sans` Tailwind theme token.
- Produces: a system Korean sans-serif stack with no remote stylesheet request.

- [ ] **Step 1: Remove the external Pretendard import and duplicate font names**

Use one native stack in the Tailwind token and inherit it on `body`:

```css
@import "tailwindcss";

@theme inline {
  --font-sans:
    system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
}

body {
  font-family: var(--font-sans);
}
```

- [ ] **Step 2: Run full verification**

Run: `npm test && npm run lint && npm run format:check && npm run build`
Expected: all commands exit 0.

- [ ] **Step 3: Commit and publish**

```bash
git add src/app/globals.css
git commit -m "fix(perf): remove blocking web font"
git push -u origin fix/font-loading-performance
```

Create a draft PR to `dev`, review the diff, address findings, wait for checks, and merge.

### Task 2: Redesign the responsive app shell

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**

- Consumes: existing color tokens and `<Chatbot />`.
- Produces: a responsive shell with a mobile-visible About link and contrast-safe footer.

- [ ] **Step 1: Implement the shell with native layout utilities**

Change the outer layout to `min-h-dvh`, reduce header/footer chrome, keep the About navigation visible, mark the rice emoji `aria-hidden="true"`, and use a desktop-only rounded chat panel without reducing mobile space.

- [ ] **Step 2: Verify responsive and keyboard behavior**

Check widths 320, 390, 768, and 1440. Confirm no horizontal overflow, the About link is keyboard reachable, and each header control has a visible focus style and a 44-pixel target.

- [ ] **Step 3: Run full verification and commit**

Run: `npm test && npm run lint && npm run format:check && npm run build`
Expected: all commands exit 0.

```bash
git add src/app/page.tsx src/app/globals.css
git commit -m "feat(ui): redesign responsive app shell"
```

Publish `feat/redesign-app-shell` as a draft PR to `dev`, review, improve, and merge.

### Task 3: Replace persisted welcome message with an empty state

**Files:**

- Create: `src/components/ChatWelcome.tsx`
- Modify: `src/components/Chatbot.tsx`
- Modify: `src/lib/chatHistory.ts`
- Modify: `src/lib/chatHistory.test.ts`

**Interfaces:**

- Consumes: `(message: string) => void` send callback and `ChatHistoryMessage`.
- Produces: `ChatWelcome({ onPrompt }: { onPrompt: (prompt: string) => void })` and history parsing that removes the legacy `welcome` message.

- [ ] **Step 1: Write a failing legacy-history test**

```ts
it("removes the legacy welcome message", () => {
  expect(
    parseChatHistory(
      JSON.stringify([
        { id: "welcome", content: "old", isUser: false, createdAt: 1 },
        { id: "2", content: "hello", isUser: true, createdAt: 2 },
      ])
    )
  ).toEqual([{ id: "2", content: "hello", isUser: true, createdAt: 2 }]);
});
```

- [ ] **Step 2: Run the focused test and observe the expected failure**

Run: `npm test -- src/lib/chatHistory.test.ts`
Expected: the legacy `welcome` entry remains in the received array.

- [ ] **Step 3: Implement the minimal history filter and empty state**

Filter `message.id !== "welcome"` after validation. Initialize and clear `messages` to `[]`. Render `ChatWelcome` only when history is ready and there are no messages. Define four literal prompt strings in the welcome component and call `onPrompt(prompt)` on click.

- [ ] **Step 4: Run focused and full verification**

Run: `npm test -- src/lib/chatHistory.test.ts`
Expected: the new test passes.

Run: `npm test && npm run lint && npm run format:check && npm run build`
Expected: all commands exit 0.

- [ ] **Step 5: Commit and publish**

```bash
git add src/components/ChatWelcome.tsx src/components/Chatbot.tsx src/lib/chatHistory.ts src/lib/chatHistory.test.ts
git commit -m "feat(chat): add prompt-based empty state"
```

Publish `feat/chat-empty-state` as a draft PR to `dev`, review, improve, and merge.

### Task 4: Improve composer semantics and drafting

**Files:**

- Modify: `src/components/ChatInput.tsx`
- Modify: `src/components/Chatbot.tsx`

**Interfaces:**

- Consumes: `onSend(message)` and loading state.
- Produces: a semantic form that preserves draft editing while `submitting` blocks duplicate sends.

- [ ] **Step 1: Add component tests for submit and loading behavior**

Export the component's small input-normalization function and prove it trims valid text while rejecting blank or in-flight submissions. Render `ChatInput` with `react-dom/server` and prove the output contains form semantics, a 500-character textarea limit, and an enabled textarea with a disabled submit button while submitting. Keyboard behavior remains a browser check because the project intentionally has no DOM test dependency.

- [ ] **Step 2: Run the focused test and observe failure**

Run: `npm test -- src/components/ChatInput.test.tsx`
Expected: form semantics and draft-during-loading expectations fail against the current component.

- [ ] **Step 3: Implement the minimal semantic form**

Replace the wrapper with `<form onSubmit>`, add `maxLength={500}`, expose a counter at 450 characters, keep the textarea enabled, and rename the prop to `submitting`. Use `aria-describedby` for the hint/counter and retain Enter/Shift+Enter behavior.

- [ ] **Step 4: Run focused and full verification**

Run: `npm test -- src/components/ChatInput.test.tsx`
Expected: all composer tests pass.

Run: `npm test && npm run lint && npm run format:check && npm run build`
Expected: all commands exit 0.

- [ ] **Step 5: Commit and publish**

Commit as `fix(chat): improve composer usability` on `fix/chat-composer-usability`, create a draft PR to `dev`, review, improve, and merge.

### Task 5: Add request recovery and response copy

**Files:**

- Modify: `src/components/Chatbot.tsx`
- Modify: `src/components/ChatMessage.tsx`
- Add focused component tests beside the changed components when behavior cannot be covered through an existing test.

**Interfaces:**

- Consumes: failed user message content and `navigator.clipboard.writeText`.
- Produces: transient retry state and a copy status live region.

- [ ] **Step 1: Write failing tests for retry and copy outcomes**

Extract only the request function needed by initial send and retry. Prove that both paths call it while only initial send appends a user message. Test the copy status function with a provided clipboard writer so resolved writes return `답변을 복사했어요.` and rejected writes return `복사하지 못했어요.` without requiring a DOM package.

- [ ] **Step 2: Run focused tests and observe expected failures**

Run the new component test files with `npm test -- <paths>`.
Expected: retry and copy controls are absent.

- [ ] **Step 3: Implement transient recovery state**

Store the failed user message separately from history, render an alert with one retry button, and split sending so retry can request an answer without inserting a new user message. Add a native clipboard button to assistant messages and an `aria-live="polite"` status string.

- [ ] **Step 4: Run focused and full verification**

Run: `npm test && npm run lint && npm run format:check && npm run build`
Expected: all commands exit 0.

- [ ] **Step 5: Commit and publish**

Commit as `feat(chat): add recovery actions` on `feat/chat-recovery-actions`, create a draft PR to `dev`, review, improve, and merge.

### Task 6: Bound chat history and remove repeated work

**Files:**

- Modify: `src/lib/chatHistory.ts`
- Modify: `src/lib/chatHistory.test.ts`
- Modify: `src/components/Chatbot.tsx`
- Modify: `src/components/ChatMessage.tsx`

**Interfaces:**

- Consumes: arrays of `ChatHistoryMessage`.
- Produces: `serializeChatHistory(messages: ChatHistoryMessage[]): string`, capped to the newest 100 valid messages.

- [ ] **Step 1: Write failing boundary tests**

Construct 101 literal-valid messages and assert parse and serialization retain IDs `2` through `101`, never ID `1`.

- [ ] **Step 2: Run the focused test and observe failure**

Run: `npm test -- src/lib/chatHistory.test.ts`
Expected: 101 records are returned or `serializeChatHistory` is missing.

- [ ] **Step 3: Implement one shared cap**

Define `const MAX_CHAT_HISTORY = 100`, use `.slice(-MAX_CHAT_HISTORY)` after validation and before serialization, and write serialized history through the helper. Delete message refs when callback refs receive `null`. Move `Intl.DateTimeFormat("ko-KR", ...)` to module scope.

- [ ] **Step 4: Run focused and full verification**

Run: `npm test -- src/lib/chatHistory.test.ts`
Expected: all history tests pass.

Run: `npm test && npm run lint && npm run format:check && npm run build`
Expected: all commands exit 0.

- [ ] **Step 5: Commit and publish**

Commit as `fix(chat): bound browser history` on `fix/chat-history-bounds`, create a draft PR to `dev`, review, improve, and merge.

### Task 7: Complete chat accessibility

**Files:**

- Modify: `src/components/Chatbot.tsx`
- Modify: `src/components/ChatMessage.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Modify focused component tests where semantic behavior changes.

**Interfaces:**

- Consumes: existing chat messages, loading state, links, and scroll behavior.
- Produces: labelled message log, speaker labels, contrast-safe metadata, reduced-motion behavior, and new-window link descriptions.

- [ ] **Step 1: Write failing semantic tests**

Render the affected components with `react-dom/server` and prove the output contains a labelled `log`, user/assistant speaker text, and an accessible new-window description.

- [ ] **Step 2: Run focused tests and observe expected failures**

Run the affected component tests.
Expected: log and speaker semantics are absent.

- [ ] **Step 3: Implement native accessibility semantics**

Add `role="log"`, a stable accessible label, and `aria-busy`. Add visually hidden speaker names. Use opaque text colors for timestamps/footer. Add `focus-visible` styles to interactive controls. Detect reduced motion through `matchMedia` for instant scrolling and disable dot animation with CSS. Add screen-reader-only `새 창에서 열림` text to external links.

- [ ] **Step 4: Run automated and manual verification**

Run: `npm test && npm run lint && npm run format:check && npm run build`
Expected: all commands exit 0.

Keyboard-check the full send, retry, copy, clear, prompt, and About flows. With reduced motion active, confirm scrolling is not smooth and dots do not bounce. Run three mobile Lighthouse passes and record the median.

- [ ] **Step 5: Commit and publish**

Commit as `fix(a11y): complete chat semantics` on `fix/chat-accessibility`, create a draft PR to `dev`, review, improve, and merge.

### Task 8: Close the active task and clean local branches

**Files:**

- Move: `docs/codex/tasks/active/chat-redesign.md` to `docs/codex/tasks/completed/chat-redesign.md`

**Interfaces:**

- Consumes: verification and PR evidence recorded during Tasks 1-7.
- Produces: a completed handoff record and a clean repository with only the primary worktree.

- [ ] **Step 1: Record final evidence and move the task file**

Update the PR URLs, merge commits, automated checks, manual checks, and Lighthouse median. Move the file out of `active` after all acceptance criteria are met.

- [ ] **Step 2: Verify the merged `origin/dev` tree**

Run from a fresh `origin/dev` checkout: `npm test && npm run lint && npm run format:check && npm run build`.
Expected: all commands exit 0.

- [ ] **Step 3: Remove merged task branches and the temporary worktree**

Delete only the seven local/remote branches created by this plan after their PRs are merged. Preserve unrelated branches and all untracked files in the primary `main` checkout.
