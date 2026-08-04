import { useState, useEffect } from "react";
import { sendMessage } from "../api/chat";
import { getSessionMessages } from "../api/sessions";
import type { Message } from "../types";

interface UseChatOptions {
  onRename?: (id: string, title: string) => void;
  currentTitle?: string;
}

export function useChat(
  sessionId: string,
  { onRename, currentTitle = "" }: UseChatOptions = {}
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Reset messages and load history whenever the active session changes
  useEffect(() => {
    setMessages([]);

    if (!sessionId) return;

    async function loadHistory() {
      const history = await getSessionMessages(sessionId);
      // Backend returns { role, message } — map to frontend { role, content }
      setMessages(
        history.map((item: { role: string; message: string }) => ({
          role: item.role as "user" | "assistant",
          content: item.message,
        }))
      );
    }

    loadHistory();
  }, [sessionId]);

  async function send(text: string) {
    if (!text.trim()) return;

    // Auto-title: fires only on the first user message when title is still "New Chat".
    // Triggered asynchronously so the chat request is never blocked by the rename.
    if (messages.length === 0 && currentTitle === "New Chat") {
      const raw = text.trim();
      const title = raw.length > 40 ? raw.slice(0, 40) + "..." : raw;
      void onRename?.(sessionId, title);
    }

    const user: Message = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, user]);

    setLoading(true);

    try {
      const res = await sendMessage({
        session_id: sessionId,
        message: text,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.response,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    setMessages,
    loading,
    send,
  };
}