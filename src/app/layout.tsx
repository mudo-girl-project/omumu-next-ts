import { GoogleAdSense } from "@/components/Script";
import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오무무 - 무한도전 영상 추천 AI",
  description:
    "밥 먹으면서 볼 무한도전 유튜브 영상을 AI가 추천해드립니다. 원하는 키워드 혹은 유재석, 박명수, 정준하, 하하 등 출연진 이름으로 무한도전 영상을 검색해 보세요.",
  keywords:
    "무한도전, 영상 추천, AI, 유튜브, 무도, 유재석, 박명수, 하하, 정준하, 노홍철, 정형돈, 길, 광희, 무도 에피소드, 무한도전 클립, 오무무, Google Gemini",
  openGraph: {
    title: "오무무 - 무한도전 영상 추천 AI",
    description:
      "무한도전 영상을 AI가 스마트하게 추천해드립니다. 취향에 맞는 무한도전 유튜브 영상을 찾아보세요.",
    url: "https://omumu.vercel.app",
    siteName: "오무무",
    locale: "ko_KR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://omumu.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">{children}</body>
      <GoogleAdSense />
    </html>
  );
}
