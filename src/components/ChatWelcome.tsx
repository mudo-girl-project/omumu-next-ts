const prompts = [
  "유재석이 나오는 웃긴 편 추천해줘",
  "마음 따뜻해지는 감동적인 편 알려줘",
  "무도 가요제 중 재밌는 편 추천해줘",
  "밥 먹는 동안 볼 짧은 편 찾아줘",
];

interface ChatWelcomeProps {
  onPrompt: (prompt: string) => void;
}

export default function ChatWelcome({ onPrompt }: ChatWelcomeProps) {
  return (
    <section
      aria-labelledby="chat-welcome-title"
      className="mx-auto flex min-h-full w-full max-w-2xl flex-col items-center justify-center px-2 py-8 text-center sm:px-6"
    >
      <span aria-hidden="true" className="mb-3 text-4xl">
        🍚
      </span>
      <h2 id="chat-welcome-title" className="text-brown-dark text-xl font-bold">
        오늘은 어떤 무도를 볼까요?
      </h2>
      <p className="text-brown-light mt-2 text-sm leading-relaxed">
        보고 싶은 분위기를 말하거나 추천 질문을 골라보세요.
      </p>
      <div className="mt-6 grid w-full gap-2 sm:grid-cols-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPrompt(prompt)}
            className="border-brown-light/30 bg-ivory hover:border-brown hover:bg-ivory-dark focus-visible:ring-brown min-h-11 rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {prompt}
          </button>
        ))}
      </div>
    </section>
  );
}
