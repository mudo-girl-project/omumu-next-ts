import { describe, expect, it } from "vitest";
import { parseChatHistory, serializeChatHistory } from "./chatHistory";

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

  it("restores only the newest 100 messages", () => {
    const stored = JSON.stringify(
      Array.from({ length: 101 }, (_, index) => ({
        id: String(index + 1),
        content: `message ${index + 1}`,
        isUser: index % 2 === 0,
        createdAt: index + 1,
      }))
    );
    const history = parseChatHistory(stored);

    expect(history).toHaveLength(100);
    expect(history?.[0].id).toBe("2");
    expect(history?.at(-1)?.id).toBe("101");
  });

  it("serializes only the newest 100 messages", () => {
    const messages = Array.from({ length: 101 }, (_, index) => ({
      id: String(index + 1),
      content: `message ${index + 1}`,
      isUser: index % 2 === 0,
      createdAt: index + 1,
    }));

    const serialized = JSON.parse(serializeChatHistory(messages));
    expect(serialized).toHaveLength(100);
    expect(serialized[0].id).toBe("2");
    expect(serialized.at(-1).id).toBe("101");
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
