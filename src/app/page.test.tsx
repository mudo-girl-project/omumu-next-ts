import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("keeps the mobile shell and navigation usable", () => {
    const html = renderToStaticMarkup(<Home />);
    const navigation = html.match(/<nav[^>]*>/)?.[0];

    expect(html).toContain("min-h-dvh");
    expect(navigation).toBeDefined();
    expect(navigation).not.toContain("hidden");
    expect(html).toContain('aria-hidden="true"');
  });
});
