import { NextRequest, NextResponse } from "next/server";
import { getVideoRecommendation } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "메시지가 필요합니다." },
      { status: 400 }
    );
  }

  const message =
    typeof body === "object" && body !== null && "message" in body
      ? (body as { message?: unknown }).message
      : undefined;

  if (typeof message !== "string") {
    return NextResponse.json(
      { error: "메시지가 필요합니다." },
      { status: 400 }
    );
  }

  const normalizedMessage = message.trim();

  if (!normalizedMessage || normalizedMessage.length > 500) {
    return NextResponse.json(
      { error: "메시지가 필요합니다." },
      { status: 400 }
    );
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "서비스 설정 오류입니다." },
      { status: 503 }
    );
  }

  try {
    const recommendation = await getVideoRecommendation(normalizedMessage);

    return NextResponse.json({ response: recommendation });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "영상 추천을 가져오지 못했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 }
    );
  }
}
