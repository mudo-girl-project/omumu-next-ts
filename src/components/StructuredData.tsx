export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "오무무",
    url: "https://omumu.vercel.app",
    description:
      "무한도전 영상 추천 AI. 구글 Gemini를 활용하여 취향에 맞는 무한도전 유튜브 영상을 추천해드립니다.",
    sameAs: [],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "오무무 - 무한도전 영상 추천 AI",
    description:
      "밥 먹으면서 볼 무한도전 영상을 AI가 스마트하게 추천해드립니다.",
    url: "https://omumu.vercel.app",
    provider: {
      "@type": "Organization",
      name: "오무무",
      url: "https://omumu.vercel.app",
    },
    areaServed: "KR",
    availableLanguage: "ko",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}
