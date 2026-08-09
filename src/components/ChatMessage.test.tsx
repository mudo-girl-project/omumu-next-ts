import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ChatMessage, { copyChatMessage } from "./ChatMessage";

describe("ChatMessage", () => {
  it("offers copy only for assistant responses", () => {
    const assistant = renderToStaticMarkup(
      <ChatMessage message="추천 답변" isUser={false} />
    );
    const user = renderToStaticMarkup(
      <ChatMessage message="추천 질문" isUser={true} />
    );

    expect(assistant).toContain("답변 복사");
    expect(user).not.toContain("답변 복사");
  });

  it("identifies speakers and links that open a new window", () => {
    const assistant = renderToStaticMarkup(
      <ChatMessage message="[추천 영상](https://example.com)" isUser={false} />
    );
    const user = renderToStaticMarkup(
      <ChatMessage message="추천 질문" isUser={true} />
    );

    expect(assistant).toContain("오무무:");
    expect(user).toContain("사용자:");
    expect(assistant).toContain("새 창에서 열림");
  });

  it("reports clipboard success and failure", async () => {
    let copied = "";
    expect(
      await copyChatMessage("추천 답변", async (text: string) => {
        copied = text;
      })
    ).toBe("답변을 복사했어요.");
    expect(copied).toBe("추천 답변");
    expect(
      await copyChatMessage("추천 답변", async () => {
        throw new Error("denied");
      })
    ).toBe("복사하지 못했어요.");
  });
});
