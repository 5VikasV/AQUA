import { api } from "../../../lib/api";

export interface ChatRequest {
  session_id: string;
  message: string;
}

export interface ChatResponse {
  assistant: string;
  response: string;
  status: string;
}

export async function sendMessage(data: ChatRequest) {
  const res = await api.post<ChatResponse>("/chat", data);
  return res.data;
}