import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/gemini", () => ({
  getVideoRecommendation: vi.fn(),
}));

import { POST } from "./route";
import { getVideoRecommendation } from "@/lib/gemini";

const originalApiKey = process.env.GEMINI_API_KEY;
const mockRecommendation = vi.mocked(getVideoRecommendation);

function request(body: string) {
  return new NextRequest("http://localhost/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
}

describe("POST /api/chat", () => {
  beforeEach(() => {
    process.env.GEMINI_API_KEY = "test-key";
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (originalApiKey === undefined) {
      delete process.env.GEMINI_API_KEY;
    } else {
      process.env.GEMINI_API_KEY = originalApiKey;
    }
  });

  it("rejects a missing message", async () => {
    const response = await POST(request("{}"));

    expect(response.status).toBe(400);
    expect(mockRecommendation).not.toHaveBeenCalled();
  });

  it("rejects a non-string message", async () => {
    const response = await POST(request('{"message": 1}'));

    expect(response.status).toBe(400);
    expect(mockRecommendation).not.toHaveBeenCalled();
  });

  it("rejects a blank message", async () => {
    const response = await POST(request('{"message": "   "}'));

    expect(response.status).toBe(400);
    expect(mockRecommendation).not.toHaveBeenCalled();
  });

  it("rejects a message longer than 500 characters", async () => {
    const response = await POST(
      request(JSON.stringify({ message: "a".repeat(501) }))
    );

    expect(response.status).toBe(400);
    expect(mockRecommendation).not.toHaveBeenCalled();
  });

  it("accepts a message with exactly 500 characters", async () => {
    const message = "a".repeat(500);
    mockRecommendation.mockResolvedValueOnce("추천 결과");

    const response = await POST(request(JSON.stringify({ message })));

    expect(response.status).toBe(200);
    expect(mockRecommendation).toHaveBeenCalledWith(message);
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(request("{"));

    expect(response.status).toBe(400);
    expect(mockRecommendation).not.toHaveBeenCalled();
  });

  it("returns 503 when the Gemini API key is absent", async () => {
    delete process.env.GEMINI_API_KEY;

    const response = await POST(request('{"message": "추천해줘"}'));

    expect(response.status).toBe(503);
    expect(mockRecommendation).not.toHaveBeenCalled();
  });

  it("trims a valid message before requesting a recommendation", async () => {
    mockRecommendation.mockResolvedValueOnce("추천 결과");

    const response = await POST(request('{"message": " 추천해줘 "}'));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ response: "추천 결과" });
    expect(mockRecommendation).toHaveBeenCalledWith("추천해줘");
  });

  it("maps Gemini failures without exposing provider details", async () => {
    mockRecommendation.mockRejectedValueOnce(new Error("upstream-secret"));

    const response = await POST(request('{"message": "추천해줘"}'));

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: "영상 추천을 가져오지 못했습니다. 잠시 후 다시 시도해주세요.",
    });
  });
});
