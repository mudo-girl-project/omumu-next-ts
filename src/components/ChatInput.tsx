"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-ivory-light border-ivory-dark flex shrink-0 gap-2 border-t p-3 sm:gap-3 sm:p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="어떤 무도 영상 볼까요?"
        aria-label="무한도전 영상 요청"
        disabled={disabled}
        className="border-brown-light/30 bg-ivory text-brown placeholder:text-brown-light/60 focus:border-brown focus:ring-brown/20 max-h-[120px] min-h-[48px] flex-1 resize-none rounded-xl border px-3 py-3 text-sm focus:ring-2 focus:outline-none disabled:opacity-50 sm:min-h-[52px] sm:px-4 sm:text-base"
        rows={1}
      />
      <button
        onClick={handleSend}
        aria-label="메시지 보내기"
        disabled={!input.trim() || disabled}
        className="bg-brown text-ivory-light hover:bg-brown-dark flex items-center gap-2 rounded-xl px-4 py-3 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
        <span className="hidden sm:inline">보내기</span>
      </button>
    </div>
  );
}
