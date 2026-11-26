export const CHAT_HISTORY_KEY = "omumu-chat-history";
const MAX_CHAT_HISTORY = 100;

export interface ChatHistoryMessage {
  id: string;
  content: string;
  isUser: boolean;
  createdAt: number;
}

export function limitChatHistory(
  messages: ChatHistoryMessage[]
): ChatHistoryMessage[] {
  return messages
    .filter((message) => message.id !== "welcome")
    .slice(-MAX_CHAT_HISTORY);
}

export function parseChatHistory(
  value: string | null
): ChatHistoryMessage[] | null {
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
          Number.isFinite(message.createdAt) &&
          Math.abs(message.createdAt) <= 8.64e15
      )
    ) {
      return null;
    }

    return limitChatHistory(parsed as ChatHistoryMessage[]);
  } catch {
    return null;
  }
}

export function serializeChatHistory(messages: ChatHistoryMessage[]): string {
  return JSON.stringify(limitChatHistory(messages));
}
