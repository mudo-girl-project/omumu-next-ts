import { describe, expect, it } from "vitest";
import { parseChatHistory } from "./chatHistory";

describe("parseChatHistory", () => {
  it("restores valid persisted messages", () => {
    const stored = JSON.stringify([
      {
        id: "1",
        content: "유재석 나오는 편 추천해줘",
        isUser: true,
        createdAt: 1_723_214_800_000,
      },
    ]);

    expect(parseChatHistory(stored)).toEqual([
      {
        id: "1",
        content: "유재석 나오는 편 추천해줘",
        isUser: true,
        createdAt: 1_723_214_800_000,
      },
    ]);
  });

  it("removes the legacy welcome message", () => {
    expect(
      parseChatHistory(
        JSON.stringify([
          {
            id: "welcome",
            content: "old welcome",
            isUser: false,
            createdAt: 1,
          },
          { id: "2", content: "추천해줘", isUser: true, createdAt: 2 },
        ])
      )
    ).toEqual([{ id: "2", content: "추천해줘", isUser: true, createdAt: 2 }]);
  });

  it("ignores malformed persisted data", () => {
    expect(parseChatHistory("{")).toBeNull();
  });

  it("ignores entries with an invalid message shape", () => {
    expect(
      parseChatHistory(
        '[{"id":"1","content":"추천해줘","isUser":"true","createdAt":1}]'
      )
    ).toBeNull();
  });

  it("ignores timestamps outside the JavaScript Date range", () => {
    expect(
      parseChatHistory(
        '[{"id":"1","content":"추천해줘","isUser":true,"createdAt":8640000000000001}]'
      )
    ).toBeNull();
  });
});
