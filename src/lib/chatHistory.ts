export const CHAT_HISTORY_KEY = "omumu-chat-history";

export interface ChatHistoryMessage {
  id: string;
  content: string;
  isUser: boolean;
  createdAt: number;
}

export function parseChatHistory(value: string | null): ChatHistoryMessage[] | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (message) =>
          typeof message === "object" &&
          message !== null &&
          typeof message.id === "string" &&
          typeof message.content === "string" &&
          typeof message.isUser === "boolean" &&
          typeof message.createdAt === "number" &&
          Number.isFinite(message.createdAt)
      )
    ) {
      return null;
    }

    return parsed as ChatHistoryMessage[];
  } catch {
    return null;
  }
}
