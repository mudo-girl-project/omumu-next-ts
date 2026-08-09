"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import {
  CHAT_HISTORY_KEY,
  parseChatHistory,
  type ChatHistoryMessage,
} from "@/lib/chatHistory";

const welcomeMessage = (): ChatHistoryMessage => ({
  id: "welcome",
  content:
    '안녕하세요! 🍚📺\n\n저는 밥 먹으면서 볼 무한도전 영상을 추천해드리는 AI예요.\n\n어떤 분위기의 영상을 보고 싶으세요?\n\n예시:\n• "유재석이 나오는 웃긴 영상 추천해줘"\n• "감동적인 무한도전 에피소드 알려줘"\n• "박명수랑 정준하가 나오는 영상 찾아줘"\n• "무도 가요제 중에 제일 재밌는 거 추천해줘"',
  isUser: false,
  createdAt: Date.now(),
});

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>(() => [
    welcomeMessage(),
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);
  const [historyReady, setHistoryReady] = useState(false);
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const scrollToMessage = (messageId: string) => {
    const messageEl = messageRefs.current.get(messageId);
    if (messageEl) {
      messageEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (lastMessageId) {
      scrollToMessage(lastMessageId);
    }
  }, [lastMessageId]);

  useEffect(() => {
    try {
      const history = parseChatHistory(
        window.localStorage.getItem(CHAT_HISTORY_KEY)
      );

      if (history?.length) {
        setMessages(history);
      }
    } catch {
      // Start a fresh conversation when browser storage is unavailable.
    } finally {
      setHistoryReady(true);
    }
  }, []);

  useEffect(() => {
    if (!historyReady) {
      return;
    }

    try {
      window.localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch {
      // Keep the current conversation available even when browser storage is unavailable.
    }
  }, [historyReady, messages]);

  const handleSend = async (message: string) => {
    const createdAt = Date.now();
    const userMessage: ChatHistoryMessage = {
      id: createdAt.toString(),
      content: message,
      isUser: true,
      createdAt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLastMessageId(userMessage.id);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "오류가 발생했습니다.");
      }

      const responseCreatedAt = Date.now();
      const aiMessage: ChatHistoryMessage = {
        id: (responseCreatedAt + 1).toString(),
        content: data.response,
        isUser: false,
        createdAt: responseCreatedAt,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLastMessageId(aiMessage.id);
    } catch (error) {
      const responseCreatedAt = Date.now();
      const errorMessage: ChatHistoryMessage = {
        id: (responseCreatedAt + 1).toString(),
        content: `죄송해요, 오류가 발생했어요. 😢\n\n${error instanceof Error ? error.message : "잠시 후 다시 시도해주세요."}`,
        isUser: false,
        createdAt: responseCreatedAt,
      };

      setMessages((prev) => [...prev, errorMessage]);
      setLastMessageId(errorMessage.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([welcomeMessage()]);
    setLastMessageId(null);

    try {
      window.localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch {
      // Keep the UI usable when browser storage is unavailable.
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex justify-end px-4 pt-3">
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading || messages.length <= 1}
          className="text-brown-light hover:text-brown text-xs underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          대화 지우기
        </button>
      </div>
      {/* 채팅 메시지 영역 */}
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            ref={(el) => {
              if (el) {
                messageRefs.current.set(msg.id, el);
              }
            }}
          >
            <ChatMessage
              message={msg.content}
              isUser={msg.isUser}
              createdAt={msg.createdAt}
            />
          </div>
        ))}
        {isLoading && (
          <ChatMessage message="" isUser={false} isLoading={true} />
        )}
      </div>

      {/* 입력 영역 */}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
