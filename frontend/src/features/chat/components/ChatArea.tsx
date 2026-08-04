import Message from "./Message";
import ChatInput from "./ChatInput";

import { useChat } from "../hooks/useChat";

export default function ChatArea() {
  const { messages, loading, send } = useChat("chat1");

  return (
    <main className="flex flex-1 flex-col">

      <div className="flex-1 overflow-y-auto p-8">

        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <h1 className="text-5xl font-bold">
                Welcome to AQUA
              </h1>

              <p className="mt-5 text-slate-400">
                Your personal AI operating system.
              </p>

            </div>

          </div>
        ) : (
          <div className="mx-auto flex max-w-5xl flex-col gap-6">

            {messages.map((message, index) => (
              <Message
                key={index}
                message={message}
              />
            ))}

          </div>
        )}

      </div>

      <ChatInput
        loading={loading}
        onSend={send}
      />

    </main>
  );
}