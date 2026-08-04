import { useState } from "react";

interface Props {
  onSend: (text: string) => void;
  loading: boolean;
}

export default function ChatInput({ onSend, loading }: Props) {
  const [text, setText] = useState("");

  function submit() {
    if (!text.trim()) return;

    onSend(text);

    setText("");
  }

  return (
    <div className="border-t border-cyan-900 p-6">

      <div className="mx-auto flex max-w-5xl gap-4">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          className="flex-1 rounded-xl bg-slate-900 p-4 outline-none"
          placeholder="Message AQUA..."
        />

        <button
          onClick={submit}
          disabled={loading}
          className="rounded-xl bg-cyan-500 px-8 font-semibold hover:bg-cyan-400 disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
}