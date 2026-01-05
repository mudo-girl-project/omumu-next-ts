"use client";

import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
}

export default function ChatMessage({ message, isUser, isLoading }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-brown text-ivory-light rounded-br-md"
            : "bg-ivory-dark text-brown-dark rounded-bl-md"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-brown-light rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-brown-light rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-brown-light rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-sm text-brown-light">추천 영상을 찾고 있어요...</span>
          </div>
        ) : isUser ? (
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message}
          </div>
        ) : (
          <div className="text-sm leading-relaxed text-brown-dark">
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                // 제목 스타일링
                h1: ({ children }) => (
                  <h1 className="text-base font-bold mt-3 mb-2 text-brown-dark">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm font-bold mt-2 mb-1.5 text-brown-dark">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold mt-2 mb-1 text-brown-dark">{children}</h3>
                ),
                // 단락
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                // 강조 (굵은 글씨)
                strong: ({ children }) => (
                  <strong className="font-bold text-brown">{children}</strong>
                ),
                // 기울임
                em: ({ children }) => (
                  <em className="italic">{children}</em>
                ),
                // 리스트
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li>{children}</li>
                ),
                // 수평선
                hr: () => (
                  <hr className="my-3 border-brown-light/30" />
                ),
                // 코드 (인라인)
                code: ({ children }) => (
                  <code className="bg-brown-light/20 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                ),
                // 링크
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-brown underline hover:text-brown-dark">
                    {children}
                  </a>
                ),
                // 인용구
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-brown-light/50 pl-3 my-2 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

