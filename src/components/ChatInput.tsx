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
    <div className="shrink-0 flex gap-2 sm:gap-3 p-3 sm:p-4 bg-ivory-light border-t border-ivory-dark">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="어떤 무도 영상 볼까요?"
        disabled={disabled}
        className="flex-1 resize-none rounded-xl border border-brown-light/30 bg-ivory px-3 py-3 sm:px-4 text-sm sm:text-base text-brown placeholder:text-brown-light/60 focus:border-brown focus:outline-none focus:ring-2 focus:ring-brown/20 disabled:opacity-50 min-h-[48px] sm:min-h-[52px] max-h-[120px]"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={!input.trim() || disabled}
        className="px-4 sm:px-6 py-3 bg-brown text-ivory-light rounded-xl font-medium hover:bg-brown-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
        <span className="hidden sm:inline">보내기</span>
      </button>
    </div>
  );
}

