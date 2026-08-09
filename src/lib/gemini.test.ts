import { afterEach, describe, expect, it, vi } from "vitest";
import { geminiModel, getVideoRecommendation } from "./gemini";

describe("getVideoRecommendation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("limits Gemini requests to 15 seconds", async () => {
    const generateContent = vi
      .spyOn(geminiModel, "generateContent")
      .mockResolvedValue({
        response: { text: () => "추천 결과" },
      } as Awaited<ReturnType<typeof geminiModel.generateContent>>);

    await expect(getVideoRecommendation("추천해줘")).resolves.toBe("추천 결과");
    expect(generateContent).toHaveBeenCalledWith("추천해줘", {
      timeout: 15_000,
    });
  });
});
