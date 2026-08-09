"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ChatWelcome from "./ChatWelcome";
import {
  CHAT_HISTORY_KEY,
  limitChatHistory,
  parseChatHistory,
  serializeChatHistory,
  type ChatHistoryMessage,
} from "@/lib/chatHistory";

export async function requestChatReply(
  message: string,
  fetcher: typeof fetch = fetch
): Promise<string> {
  const response = await fetcher("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  const data: unknown = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data === "object" &&
        data !== null &&
        "error" in data &&
        typeof data.error === "string"
        ? data.error
        : "오류가 발생했습니다."
    );
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("response" in data) ||
    typeof data.response !== "string"
  ) {
    throw new Error("올바르지 않은 응답입니다.");
  }

  return data.response;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatHistoryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [failedMessage, setFailedMessage] = useState<string | null>(null);
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
      window.localStorage.setItem(
        CHAT_HISTORY_KEY,
        serializeChatHistory(messages)
      );
    } catch {
      // Keep the current conversation available even when browser storage is unavailable.
    }
  }, [historyReady, messages]);

  const requestReply = async (message: string) => {
    setIsLoading(true);
    setFailedMessage(null);

    try {
      const reply = await requestChatReply(message);
      const responseCreatedAt = Date.now();
      const aiMessage: ChatHistoryMessage = {
        id: (responseCreatedAt + 1).toString(),
        content: reply,
        isUser: false,
        createdAt: responseCreatedAt,
      };

      setMessages((prev) => limitChatHistory([...prev, aiMessage]));
      setLastMessageId(aiMessage.id);
    } catch {
      setFailedMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (message: string) => {
    const createdAt = Date.now();
    const userMessage: ChatHistoryMessage = {
      id: createdAt.toString(),
      content: message,
      isUser: true,
      createdAt,
    };

    setMessages((prev) => limitChatHistory([...prev, userMessage]));
    setLastMessageId(userMessage.id);
    await requestReply(message);
  };

  const handleClear = () => {
    setMessages([]);
    setFailedMessage(null);
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
          disabled={isLoading || messages.length === 0}
          className="text-brown-light hover:text-brown text-xs underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          대화 지우기
        </button>
      </div>
      {/* 채팅 메시지 영역 */}
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-4">
        {messages.length === 0 && !isLoading && (
          <ChatWelcome onPrompt={handleSend} />
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            ref={(el) => {
              if (el) {
                messageRefs.current.set(msg.id, el);
              } else {
                messageRefs.current.delete(msg.id);
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
        {failedMessage && !isLoading && (
          <div
            role="alert"
            className="border-accent-light bg-ivory mx-auto flex max-w-lg items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm"
          >
            <p>답변을 불러오지 못했어요.</p>
            <button
              type="button"
              onClick={() => void requestReply(failedMessage)}
              className="bg-brown text-ivory-light hover:bg-brown-dark focus-visible:ring-brown min-h-11 shrink-0 rounded-lg px-3 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              다시 시도
            </button>
          </div>
        )}
        {isLoading && (
          <ChatMessage message="" isUser={false} isLoading={true} />
        )}
      </div>

      {/* 입력 영역 */}
      <ChatInput onSend={handleSend} submitting={isLoading} />
    </div>
  );
}
