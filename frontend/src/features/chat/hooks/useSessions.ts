import { useEffect, useState } from "react";
import type { Session } from "../api/sessions";

import {
  getSessions,
  createSession,
  renameSession as renameSessionApi,
  deleteSession as deleteSessionApi,
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

    return session.id;
  }

  async function renameSession(id: string, title: string) {
    await renameSessionApi(id, title);
    await load();
  }

  async function deleteSession(id: string) {
    await deleteSessionApi(id);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return {
    sessions,
    newSession,
    renameSession,
    deleteSession,
  };
}