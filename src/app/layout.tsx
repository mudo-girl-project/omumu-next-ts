import { GoogleAdSense } from "@/components/Script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오무무 - 무한도전 영상 추천 AI",
  description:
    "밥 먹으면서 볼 무한도전 유튜브 영상을 AI가 추천해드립니다. 원하는 키워드 혹은 유재석, 박명수, 정준하, 하하 등 출연진 이름으로 무한도전 영상을 검색해 보세요.",
  keywords:
    "무한도전, 영상 추천, AI, 유튜브, 무도, 유재석, 박명수, 하하, 정준하, 노홍철, 정형돈, 길, 광희, 무도 에피소드, 무한도전 클립, 오무무, Google Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
      <GoogleAdSense />
    </html>
  );
}
