import { useState } from "react";
import { sendMessage } from "../api/chat";
import type { Message } from "../types";

export function useChat(sessionId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function send(text: string) {
    if (!text.trim()) return;

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