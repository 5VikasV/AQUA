import type { Message as MessageType } from "../types";

interface Props {
  message: MessageType;
}

export default function Message({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <div
      className={`max-w-3xl rounded-2xl p-4 ${
        isUser
          ? "ml-auto bg-cyan-500 text-white"
          : "mr-auto bg-slate-800 text-slate-100"
      }`}
    >
      {message.content}
    </div>
  );
}