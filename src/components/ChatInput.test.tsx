import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ChatInput from "./ChatInput";

describe("ChatInput", () => {
  it("renders a bounded semantic composer", () => {
    const html = renderToStaticMarkup(<ChatInput onSend={() => undefined} />);
    const textarea = html.match(/<textarea[^>]*>/)?.[0];
    const submitButton = html.match(/<button[^>]*>/)?.[0];

    expect(html).toContain("<form");
    expect(textarea).toContain('maxLength="500"');
    expect(textarea).toContain('aria-describedby="chat-input-hint"');
    expect(submitButton).toContain('type="submit"');
  });
});
