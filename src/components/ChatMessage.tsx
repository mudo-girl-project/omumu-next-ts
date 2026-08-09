"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";

const timeFormatter = new Intl.DateTimeFormat("ko-KR", {
  hour: "2-digit",
  minute: "2-digit",
});

export async function copyChatMessage(
  message: string,
  writeText: (text: string) => Promise<void>
): Promise<string> {
  try {
    await writeText(message);
    return "답변을 복사했어요.";
  } catch {
    return "복사하지 못했어요.";
  }
}

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
  createdAt?: number;
}

export default function ChatMessage({
  message,
  isUser,
  isLoading,
  createdAt,
}: ChatMessageProps) {
  const [copyStatus, setCopyStatus] = useState("");
  const time =
    typeof createdAt === "number" ? timeFormatter.format(createdAt) : null;

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
          <div
            className="flex items-center gap-2"
            role="status"
            aria-live="polite"
          >
            <div className="flex gap-1">
              <span
                className="bg-brown-light h-2 w-2 animate-bounce rounded-full"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="bg-brown-light h-2 w-2 animate-bounce rounded-full"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="bg-brown-light h-2 w-2 animate-bounce rounded-full"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <span className="text-brown-light text-sm">
              추천 영상을 찾고 있어요...
            </span>
          </div>
        ) : isUser ? (
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </div>
        ) : (
          <div className="text-brown-dark text-sm leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkBreaks]}
              components={{
                // 제목 스타일링
                h1: ({ children }) => (
                  <h1 className="text-brown-dark mt-3 mb-2 text-base font-bold">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-brown-dark mt-2 mb-1.5 text-sm font-bold">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-brown-dark mt-2 mb-1 text-sm font-semibold">
                    {children}
                  </h3>
                ),
                // 단락
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                // 강조 (굵은 글씨)
                strong: ({ children }) => (
                  <strong className="text-brown font-bold">{children}</strong>
                ),
                // 기울임
                em: ({ children }) => <em className="italic">{children}</em>,
                // 리스트
                ul: ({ children }) => (
                  <ul className="mb-2 list-inside list-disc space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-2 list-inside list-decimal space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                // 수평선
                hr: () => <hr className="border-brown-light/30 my-3" />,
                // 코드 (인라인)
                code: ({ children }) => (
                  <code className="bg-brown-light/20 rounded px-1 py-0.5 font-mono text-xs">
                    {children}
                  </code>
                ),
                // 링크
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brown hover:text-brown-dark underline"
                  >
                    {children}
                  </a>
                ),
                // 인용구
                blockquote: ({ children }) => (
                  <blockquote className="border-brown-light/50 my-2 border-l-4 pl-3 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message}
            </ReactMarkdown>
          </div>
        )}
        {!isLoading && (
          <div className="mt-1 flex min-h-5 items-center justify-end gap-3 text-xs">
            {!isUser && (
              <button
                type="button"
                onClick={async () =>
                  setCopyStatus(
                    await copyChatMessage(message, (text) =>
                      navigator.clipboard.writeText(text)
                    )
                  )
                }
                className="text-brown-light hover:text-brown focus-visible:ring-brown rounded underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                답변 복사
              </button>
            )}
            {typeof createdAt === "number" && time && (
              <time
                dateTime={new Date(createdAt).toISOString()}
                className="opacity-60"
              >
                {time}
              </time>
            )}
          </div>
        )}
        <span aria-live="polite" className="sr-only">
          {copyStatus}
        </span>
      </div>
    </div>
  );
}
