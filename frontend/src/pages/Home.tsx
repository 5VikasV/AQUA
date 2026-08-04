import { useState, useEffect } from "react";
import Sidebar from "../features/sidebar/components/Sidebar";
import ChatArea from "../features/chat/components/ChatArea";
import { useSessions } from "../features/chat/hooks/useSessions";

export default function Home() {
  const { sessions, newSession, renameSession } = useSessions();
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Auto-select most recent session on initial load
  useEffect(() => {
    if (sessions.length > 0 && activeSessionId === null) {
      setActiveSessionId(sessions[0].id);
    }
  }, [sessions]);

  async function handleNewSession() {
    const id = await newSession();
    setActiveSessionId(id);
  }

  // Derive the active session's current title for the rename guard
  const currentTitle =
    sessions.find((s) => s.id === activeSessionId)?.title ?? "";

  return (
    <div className="flex h-screen bg-[#07111f] text-white">

      <Sidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewSession={handleNewSession}
      />

      <ChatArea
        sessionId={activeSessionId}
        currentTitle={currentTitle}
        onRename={renameSession}
      />

    </div>
  );
}