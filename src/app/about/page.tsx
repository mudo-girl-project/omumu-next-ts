import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "오무무 - 소개 | 무한도전 영상 추천 AI",
  description:
    "오무무는 Google Gemini AI를 활용하여 무한도전 영상을 추천하는 서비스입니다.",
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "오무무 - 소개",
  url: "https://omumu.vercel.app/about",
  description:
    "오무무는 Google Gemini AI를 활용하여 사용자의 취향에 맞는 무한도전 영상을 추천해드리는 서비스입니다.",
  mainEntity: {
    "@type": "Service",
    name: "오무무",
    description:
      "무한도전 영상 추천 AI. 취향에 맞는 무한도전 유튜브 영상을 스마트하게 추천해드립니다.",
    url: "https://omumu.vercel.app",
    offers: {
      "@type": "Offer",
      priceCurrency: "KRW",
      price: "0",
      description: "완전히 무료로 이용할 수 있는 서비스",
    },
    areaServed: "KR",
    availableLanguage: "ko",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1",
    },
  },
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />
      <main className="bg-ivory min-h-screen px-6 py-12">
        <div className="mx-auto max-w-2xl">
          {/* 헤더 */}
          <div className="mb-12 text-center">
            <div className="mb-4 text-6xl">🍚</div>
            <h1 className="text-brown mb-4 text-4xl font-bold">오무무</h1>
            <p className="text-brown/80 text-xl">무한도전 영상 추천 AI</p>
          </div>

          {/* 소개 섹션 */}
          <section className="mb-12">
            <h2 className="text-brown mb-4 text-2xl font-bold">오무무란?</h2>
            <p className="text-brown/70 mb-4 leading-relaxed">
              오무무는 Google Gemini AI를 활용하여 사용자의 취향에 맞는{" "}
              <strong>무한도전 영상을 추천</strong>해드리는 서비스입니다. 밥을
              먹으면서 재미있게 볼 수 있는 최고의 무도 영상을 찾아드립니다.
            </p>
            <p className="text-brown/70 leading-relaxed">
              더 이상 무한도전 영상을 찾기 위해 유튜브를 헤매지 마세요.
              오무무에게 원하는 장르나 출연진을 말해주기만 하면, AI가 당신이
              좋아할 만한 영상을 추천해드립니다.
            </p>
          </section>

          {/* 기능 섹션 */}
          <section className="mb-12">
            <h2 className="text-brown mb-6 text-2xl font-bold">주요 기능</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-brown mb-2 text-lg font-bold">
                  🎯 스마트 추천
                </h3>
                <p className="text-brown/70">
                  당신의 취향과 관심사를 분석하여 맞춤형 무한도전 영상을
                  추천합니다.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-brown mb-2 text-lg font-bold">
                  👥 출연진별 검색
                </h3>
                <p className="text-brown/70">
                  유재석, 박명수, 정준하, 하하 등 특정 출연진의 영상을 쉽게 찾을
                  수 있습니다.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-brown mb-2 text-lg font-bold">
                  🎬 다양한 카테고리
                </h3>
                <p className="text-brown/70">
                  웃긴 영상, 감동적인 에피소드, 무도 가요제 등 다양한 카테고리로
                  검색할 수 있습니다.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="text-brown mb-2 text-lg font-bold">
                  💰 완전 무료
                </h3>
                <p className="text-brown/70">
                  오무무는 완전히 무료로 이용할 수 있습니다. 어떤 요금도
                  없습니다.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ 섹션 */}
          <section className="mb-12">
            <h2 className="text-brown mb-6 text-2xl font-bold">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <details className="rounded-lg bg-white p-6 shadow-md">
                <summary className="text-brown cursor-pointer font-bold">
                  📌 오무무는 어떻게 작동하나요?
                </summary>
                <p className="text-brown/70 mt-4">
                  Google Gemini AI를 활용하여 당신이 원하는 무한도전 영상의
                  특징을 이해하고, 가장 적합한 영상을 찾아 추천해드립니다.
                </p>
              </details>
              <details className="rounded-lg bg-white p-6 shadow-md">
                <summary className="text-brown cursor-pointer font-bold">
                  📌 실제로 추천된 영상이 있나요?
                </summary>
                <p className="text-brown/70 mt-4">
                  오무무는 무한도전의 다양한 에피소드를 기반으로 추천합니다.
                  원하는 조건을 상세히 말해주시면 더 정확한 추천을 받을 수
                  있습니다.
                </p>
              </details>
              <details className="rounded-lg bg-white p-6 shadow-md">
                <summary className="text-brown cursor-pointer font-bold">
                  📌 특정 출연진의 영상만 찾을 수 있나요?
                </summary>
                <p className="text-brown/70 mt-4">
                  네, 가능합니다. "유재석이 나오는 에피소드", "박명수 중심의
                  웃긴 영상" 등으로 검색하시면 됩니다.
                </p>
              </details>
              <details className="rounded-lg bg-white p-6 shadow-md">
                <summary className="text-brown cursor-pointer font-bold">
                  📌 모든 무한도전 에피소드가 포함되어 있나요?
                </summary>
                <p className="text-brown/70 mt-4">
                  Google Gemini AI의 학습 데이터 기준으로 많은 무한도전
                  에피소드를 커버하고 있습니다.
                </p>
              </details>
            </div>
          </section>

          {/* 기술 섹션 */}
          <section className="mb-12">
            <h2 className="text-brown mb-4 text-2xl font-bold">기술</h2>
            <p className="text-brown/70 mb-4 leading-relaxed">
              오무무는 <strong>Google Gemini AI</strong>를 기반으로
              구축되었습니다. 최신 AI 기술을 활용하여 가장 정확하고 맞춤형의
              추천을 제공합니다.
            </p>
            <div className="bg-brown-light/10 rounded-lg p-6">
              <p className="text-brown/70 text-sm">
                <strong>기술 스택:</strong> Next.js, React, TypeScript, Google
                Gemini API, Tailwind CSS
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-brown mb-6 text-2xl font-bold">
              지금 시작하세요!
            </h2>
            <p className="text-brown/70 mb-8">
              오무무와 함께 당신이 좋아할 무한도전 영상을 찾아보세요.
            </p>
            <a
              href="/"
              className="bg-brown text-ivory-light hover:bg-brown-dark inline-block rounded-lg px-8 py-3 font-bold transition"
            >
              오무무 시작하기 →
            </a>
          </section>
        </div>
      </main>
    </>
  );
}
