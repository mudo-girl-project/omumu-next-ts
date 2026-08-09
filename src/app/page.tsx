import Chatbot from "@/components/Chatbot";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-ivory flex h-screen flex-col overflow-hidden">
      {/* 헤더 */}
      <header className="bg-brown text-ivory-light shrink-0 px-6 py-4 shadow-lg">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
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
            </div>
          </div>

          {/* 네비게이션 및 태그라인 */}
          <div className="ml-auto hidden items-center gap-6 sm:flex">
            <div className="flex flex-col items-end">
              <span className="text-ivory-dark mr-0 mb-1 text-sm italic">
                &quot;오늘 무도 뭐 보지?!&quot;
              </span>
              <span className="text-ivory-dark/80 text-sm">
                밥 먹으면서 볼 무도, AI가 찾아드려요
              </span>
            </div>
            <nav className="border-ivory-dark/30 flex gap-4 border-l pl-4">
              <Link
                href="/about"
                className="text-ivory-dark hover:text-ivory-light text-sm transition"
              >
                소개
              </Link>
            </nav>
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
      </footer>
    </main>
  );
}
