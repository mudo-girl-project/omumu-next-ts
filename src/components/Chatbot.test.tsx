import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Chatbot from "./Chatbot";

describe("Chatbot", () => {
  it("offers useful prompts before the first message", () => {
    const html = renderToStaticMarkup(<Chatbot />);

    expect(html).toContain("유재석이 나오는 웃긴 편 추천해줘");
    expect(html).toContain("마음 따뜻해지는 감동적인 편 알려줘");
    expect(html).toContain("무도 가요제 중 재밌는 편 추천해줘");
    expect(html).toContain("밥 먹는 동안 볼 짧은 편 찾아줘");
    expect(html).not.toContain("박명수랑 정준하가 나오는 영상 찾아줘");
  });
});
