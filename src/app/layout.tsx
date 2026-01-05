import { GoogleAdSense } from "@/components/Script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오무무 - 무한도전 영상 추천 AI",
  description: "밥 먹으면서 볼 무한도전 유튜브 영상을 AI가 추천해드립니다",
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
