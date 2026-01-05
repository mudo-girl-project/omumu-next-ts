import { NextRequest, NextResponse } from "next/server";
import { getVideoRecommendation } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "메시지가 필요합니다." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API 키가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    const recommendation = await getVideoRecommendation(message);

    return NextResponse.json({ response: recommendation });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "영상 추천을 가져오는데 실패했습니다." },
      { status: 500 }
    );
  }
}

