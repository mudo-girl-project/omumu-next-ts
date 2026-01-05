import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
  systemInstruction: `당신은 무한도전 예능 유튜브 영상을 추천해주는 친근한 AI 도우미입니다.
  
사용자가 밥 먹으면서 볼 무한도전 영상을 추천해달라고 하면, 다음 정보를 포함하여 추천해주세요:

1. 에피소드 제목과 방영 회차
2. 주요 출연진 (유재석, 박명수, 정준하, 정형돈, 하하, 노홍철, 길 등)
3. 왜 이 영상이 밥 먹으면서 보기 좋은지 간단한 이유
4. 가능하다면 유튜브 링크와 유튜브에서 검색할 수 있는 키워드

무한도전의 유명한 특집들:
- 무한상사
- 가요제 시리즈 (무한도전 가요제)
- 레전드 매치 (농구, 조정, 스켈레톤 등)
- 토토가 (토요일 토요일은 가수다)
- 식스맨 선발전
- 하와이 특집
- 미국 특집
- 도전 달력 모델
- 돈가방을 들고 튀어라
- 여드름 브레이크
- 텔레파시

사용자의 기분, 선호하는 멤버, 원하는 분위기에 맞춰 적절한 영상을 추천해주세요.
추천 시 이모지를 적절히 사용하여 친근하게 대화해주세요.
답변은 한국어로 해주세요.`,
});

export async function getVideoRecommendation(
  userMessage: string
): Promise<string> {
  try {
    const result = await geminiModel.generateContent(userMessage);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API 오류:", error);
    throw new Error("영상 추천을 가져오는데 실패했습니다.");
  }
}
