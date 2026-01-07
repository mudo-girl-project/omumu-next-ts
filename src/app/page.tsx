import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="bg-ivory flex h-screen flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="bg-brown text-ivory-light shrink-0 px-6 py-4 shadow-lg">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          {/* 로고 영역 */}
          <div className="flex items-center gap-3">
            <div className="bg-ivory-light flex h-12 w-12 items-center justify-center rounded-full text-2xl">
              🍚
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">오무무</h1>
              <p className="text-ivory-dark text-xs opacity-80">
                무한도전 영상 추천 AI
              </p>
              {/* SEO/크롤러용 숨김 텍스트 */}
              <p className="hidden text-xs">
                무한도전 영상 추천 AI 봇. 구글 Gemini를 활용한 무한도전 유튜브
                추천 서비스. 밥 먹으면서 볼 재미있는 무도 영상을 찾아드립니다.
              </p>
            </div>
          </div>

          {/* 태그라인 */}
          <div className="ml-auto hidden sm:block">
            <span className="text-ivory-dark mr-2 text-sm italic">
              &quot;오늘 무도 뭐 보지?!&quot;
            </span>
            <span className="text-ivory-dark/80 text-sm">
              밥 먹으면서 볼 무도, AI가 찾아드려요
            </span>
          </div>
        </div>
      </header>

      {/* 메인 챗봇 영역 */}
      <div className="bg-ivory-light mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col shadow-xl">
        <Chatbot />
      </div>

      {/* 푸터 */}
      <footer className="bg-brown-dark text-ivory-dark shrink-0 px-6 py-3 text-center text-xs">
        <p className="flex flex-col items-center justify-center md:flex-row">
          Powered by Google Gemini AI{" "}
          <span className="hidden md:inline">·</span>{" "}
          <span className="text-ivory-dark/60">
            무도 없이 밥 못 먹는 무도 키즈들을 위해 ❤️
          </span>
        </p>

        {/* SEO 컨텐츠 - 화면에서는 숨김 */}
        <div className="text-ivory-dark/70 mt-4 hidden space-y-2">
          <p>
            <strong>오무무는 무한도전 영상 추천 AI입니다.</strong>
            Google Gemini AI를 활용하여 사용자의 취향에 맞는 무한도전 유튜브
            영상을 추천해드립니다.
          </p>
          <p>
            유재석, 정준하, 하하, 길 등 출연진별 추천, 웃긴 영상, 감동적인
            에피소드, 무도 가요제 등 다양한 카테고리의 무한도전 컨텐츠를 찾을 수
            있습니다.
          </p>
          <p>
            밥 먹으면서 재미있게 볼 수 있는 최고의 무한도전 영상을 AI가
            스마트하게 추천합니다.
          </p>
        </div>
      </footer>
    </main>
  );
}
