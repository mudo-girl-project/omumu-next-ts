import Chatbot from "@/components/Chatbot";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-ivory flex min-h-dvh flex-col overflow-hidden">
      <header className="bg-brown text-ivory-light border-brown-dark shrink-0 border-b px-4 py-2.5 sm:px-6">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3">
          <Link
            href="/"
            aria-label="오무무 홈"
            className="focus-visible:ring-ivory-light focus-visible:ring-offset-brown flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className="bg-ivory-light flex h-10 w-10 items-center justify-center rounded-full text-xl"
            >
              🍚
            </span>
            <div>
              <h1 className="text-lg font-bold tracking-tight sm:text-xl">
                오무무
              </h1>
              <p className="text-ivory-dark text-[11px] sm:text-xs">
                무한도전 영상 추천 AI
              </p>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-3 sm:gap-5">
            <p className="text-ivory-dark hidden text-sm md:block">
              밥 먹으면서 볼 무도, AI가 찾아드려요
            </p>
            <nav aria-label="주요 메뉴">
              <Link
                href="/about"
                className="text-ivory-dark hover:bg-brown-dark hover:text-ivory-light focus-visible:ring-ivory-light focus-visible:ring-offset-brown inline-flex min-h-11 items-center rounded-lg px-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:px-3"
              >
                <span className="sm:hidden">소개</span>
                <span className="hidden sm:inline">서비스 소개</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-4xl flex-1 flex-col sm:p-4">
        <div className="bg-ivory-light sm:ring-brown/10 flex min-h-0 flex-1 flex-col overflow-hidden sm:rounded-2xl sm:shadow-xl sm:ring-1">
          <Chatbot />
        </div>
      </div>

      <footer className="bg-brown-dark text-ivory-dark shrink-0 px-4 py-2 text-center text-xs">
        <p>Google Gemini AI로 추천합니다.</p>
      </footer>
    </main>
  );
}
