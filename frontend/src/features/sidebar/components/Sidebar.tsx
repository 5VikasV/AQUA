import type { Session } from "../../chat/api/sessions";

interface Props {
  sessions: Session[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onDeleteSession: (id: string) => void;
}

export default function Sidebar({ sessions, activeSessionId, onSelectSession, onNewSession, onDeleteSession }: Props) {

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
            className={`group relative rounded-lg p-3 text-left hover:bg-slate-700 transition-colors ${session.id === activeSessionId
              ? "bg-cyan-900/60 text-cyan-300"
              : "bg-slate-800"
              }`}
          >
            {/* Truncate title to leave room for the delete button */}
            <span className="block truncate pr-6">{session.title}</span>

            {/* Delete button — revealed on row hover, does not select the session */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm("Delete this chat?")) onDeleteSession(session.id);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center justify-center w-6 h-6 rounded hover:bg-slate-600 text-slate-400 hover:text-white text-sm leading-none"
              role="button"
              aria-label="Delete chat"
            >
              ×
            </span>

          </button>

        ))}

      </div>

    </aside>
  );
}