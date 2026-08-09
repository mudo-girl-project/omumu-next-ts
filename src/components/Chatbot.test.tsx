import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Chatbot, * as ChatbotModule from "./Chatbot";

describe("Chatbot", () => {
  it("offers useful prompts before the first message", () => {
    const html = renderToStaticMarkup(<Chatbot />);

    expect(html).toContain("유재석이 나오는 웃긴 편 추천해줘");
    expect(html).toContain("마음 따뜻해지는 감동적인 편 알려줘");
    expect(html).toContain("무도 가요제 중 재밌는 편 추천해줘");
    expect(html).toContain("밥 먹는 동안 볼 짧은 편 찾아줘");
    expect(html).not.toContain("박명수랑 정준하가 나오는 영상 찾아줘");
  });

  it("uses one request function for chat replies", async () => {
    const requestChatReply = Reflect.get(ChatbotModule, "requestChatReply");

    expect(requestChatReply).toBeTypeOf("function");
    if (typeof requestChatReply !== "function") return;

    const fetcher: typeof fetch = async (input, init) => {
      expect(input).toBe("/api/chat");
      expect(init?.body).toBe(JSON.stringify({ message: "웃긴 편" }));
      return Response.json({ response: "무한도전 추천" });
    };
    const response = await requestChatReply("웃긴 편", fetcher);

    expect(response).toBe("무한도전 추천");
  });

  it("rejects failed and malformed chat responses", async () => {
    const requestChatReply = Reflect.get(ChatbotModule, "requestChatReply");

    expect(requestChatReply).toBeTypeOf("function");
    if (typeof requestChatReply !== "function") return;

    const failed: typeof fetch = async () =>
      Response.json({ error: "잠시 후 다시 시도해주세요." }, { status: 503 });
    const malformed: typeof fetch = async () => Response.json({ response: 1 });

    await expect(requestChatReply("추천", failed)).rejects.toThrow(
      "잠시 후 다시 시도해주세요."
    );
    await expect(requestChatReply("추천", malformed)).rejects.toThrow(
      "올바르지 않은 응답입니다."
    );
  });
});
