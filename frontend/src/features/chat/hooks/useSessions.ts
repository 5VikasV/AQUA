import { useEffect, useState } from "react";
import type { Session } from "../api/sessions";

import {
  getSessions,
  createSession,
} from "../api/sessions";

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);

  async function load() {
    setSessions(await getSessions());
  }

  async function newSession() {
    const session = {
      id: crypto.randomUUID(),
      title: "New Chat",
    };

    await createSession(session);

    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return {
    sessions,
    newSession,
  };
}