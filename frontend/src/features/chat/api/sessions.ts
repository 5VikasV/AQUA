import { api } from "../../../lib/api";

export interface Session {
  id: string;
  title: string;
}

export async function getSessions() {
  const res = await api.get<Session[]>("/sessions");
  return res.data;
}

export async function createSession(session: Session) {
  const res = await api.post<Session>("/sessions", session);
  return res.data;
}

export async function deleteSession(id: string) {
  await api.delete(`/sessions/${id}`);
}

export async function getSessionMessages(sessionId: string) {
  const res = await api.get(`/sessions/${sessionId}`);
  return res.data;
}

export async function renameSession(id: string, title: string) {
  const res = await api.patch<Session>(`/sessions/${id}`, { title });
  return res.data;
}