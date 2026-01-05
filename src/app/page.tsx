import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="h-screen bg-ivory flex flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="shrink-0 bg-brown text-ivory-light py-4 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          {/* 로고 영역 */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-ivory-light rounded-full flex items-center justify-center text-2xl">
              🍚
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">오무무</h1>
              <p className="text-xs text-ivory-dark opacity-80">
                무한도전 영상 추천 AI
              </p>
            </div>
          </div>
          
          {/* 태그라인 */}
          <div className="hidden sm:block ml-auto">
            <span className="text-sm text-ivory-dark italic mr-2">
              &quot;오늘 무도 뭐 보지?!&quot;
            </span>
            <span className="text-sm text-ivory-dark/80">
              밥 먹으면서 볼 무도, AI가 찾아드려요
            </span>
          </div>
        </div>
      </header>

      {/* 메인 챗봇 영역 */}
      <div className="flex-1 min-h-0 max-w-4xl w-full mx-auto flex flex-col bg-ivory-light shadow-xl">
        <Chatbot />
      </div>

      {/* 푸터 */}
      <footer className="shrink-0 bg-brown-dark text-ivory-dark py-3 px-6 text-center text-xs">
        <p className="flex flex-col justify-center items-center md:flex-row">
          Powered by Google Gemini AI <span className="hidden md:inline">·</span> <span className="text-ivory-dark/60">무도 없이 밥 못 먹는 무도 키즈들을 위해 ❤️</span>
        </p>
      </footer>
    </main>
  );
}
