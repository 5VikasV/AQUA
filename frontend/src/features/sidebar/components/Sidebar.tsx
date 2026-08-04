import type { Session } from "../../chat/api/sessions";

interface Props {
  sessions: Session[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
}

export default function Sidebar({ sessions, activeSessionId, onSelectSession, onNewSession }: Props) {

  return (
    <aside className="w-72 bg-slate-900/70 backdrop-blur-xl border-r border-cyan-900 flex flex-col p-6">

      <h1 className="text-5xl font-bold text-cyan-400">
        AQUA
      </h1>

      <button
        onClick={onNewSession}
        className="mt-8 rounded-xl bg-cyan-500 py-3 font-semibold hover:bg-cyan-400"
      >
        + New Chat
      </button>

      <div className="mt-8 flex flex-col gap-2">

        {sessions.map((session) => (

          <button
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`rounded-lg p-3 text-left hover:bg-slate-700 transition-colors ${session.id === activeSessionId
              ? "bg-cyan-900/60 text-cyan-300"
              : "bg-slate-800"
              }`}
          >
            {session.title}
          </button>

        ))}

      </div>

    </aside>
  );
}