import { useSessions } from "../../chat/hooks/useSessions";

export default function Sidebar() {
  const { sessions, newSession } = useSessions();

  return (
    <aside className="w-72 bg-slate-900/70 backdrop-blur-xl border-r border-cyan-900 flex flex-col p-6">

      <h1 className="text-5xl font-bold text-cyan-400">
        AQUA
      </h1>

      <button
        onClick={newSession}
        className="mt-8 rounded-xl bg-cyan-500 py-3 font-semibold hover:bg-cyan-400"
      >
        + New Chat
      </button>

      <div className="mt-8 flex flex-col gap-2">

        {sessions.map((session) => (

          <button
            key={session.id}
            className="rounded-lg bg-slate-800 p-3 text-left hover:bg-slate-700"
          >
            {session.title}
          </button>

        ))}

      </div>

    </aside>
  );
}