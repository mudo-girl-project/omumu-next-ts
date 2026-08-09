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
});
