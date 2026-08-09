"use client";

import { useState, type FormEvent, type KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  submitting?: boolean;
}

export default function ChatInput({ onSend, submitting }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !submitting) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSend();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-ivory-light border-ivory-dark flex shrink-0 items-start gap-2 border-t p-3 sm:gap-3 sm:p-4"
    >
      <div className="min-w-0 flex-1">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          maxLength={500}
          placeholder="어떤 무도 영상 볼까요?"
          aria-label="무한도전 영상 요청"
          aria-describedby="chat-input-hint"
          className="border-brown-light/30 bg-ivory text-brown placeholder:text-brown-light/60 focus:border-brown focus:ring-brown/20 block max-h-[120px] min-h-12 w-full resize-none rounded-xl border px-3 py-3 text-sm focus:ring-2 focus:outline-none sm:min-h-[52px] sm:px-4 sm:text-base"
          rows={1}
        />
        <div
          id="chat-input-hint"
          className="text-brown-light mt-1.5 flex min-h-4 justify-between gap-2 px-1 text-xs"
        >
          <span className="sr-only sm:not-sr-only">
            Enter 전송 · Shift+Enter 줄바꿈
          </span>
          {input.length >= 450 && (
            <span className="ml-auto">{input.length}/500</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        aria-label="메시지 보내기"
        disabled={!input.trim() || submitting}
        className="bg-brown text-ivory-light hover:bg-brown-dark focus-visible:ring-brown flex min-h-12 items-center gap-2 rounded-xl px-4 py-3 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-[52px] sm:px-6"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
        <span className="hidden sm:inline">보내기</span>
      </button>
    </form>
  );
}
