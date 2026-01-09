export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "오무무",
    url: "https://omumu.vercel.app",
    logo: "https://omumu.vercel.app/🍚",
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "오무무는 무엇인가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "오무무는 Google Gemini AI를 활용하여 사용자의 취향에 맞는 무한도전 유튜브 영상을 추천해드리는 서비스입니다.",
        },
      },
      {
        "@type": "Question",
        name: "어떻게 사용하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "원하는 무한도전 영상의 특징을 설명해주세요. 예를 들어 '유재석이 나오는 웃긴 영상', '감동적인 에피소드' 등으로 검색할 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "비용이 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "오무무는 완전히 무료로 이용할 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "어떤 출연진별로 검색할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "유재석, 박명수, 정준하, 하하, 노홍철, 정형돈, 길, 광희 등 무한도전의 모든 멤버별로 영상을 검색할 수 있습니다.",
        },
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
