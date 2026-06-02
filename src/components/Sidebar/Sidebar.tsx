import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { fetchNotes } from "../../api/fetches";
import { useNotes } from "../../state/notes";

const Sidebar = () => {
  const { notes, isFetched, setNotes } = useNotes();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const selectedNoteId = searchParams.get("selectedNoteId");

  useEffect(() => {
    if (isFetched) return;

    (async () => {
      const { data } = await fetchNotes();
      setNotes(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetched]);

  const handleNoteClick = (noteId: string) => {
    navigate({
      pathname: "/",
      search: `?selectedNoteId=${noteId}`,
    });
  };

  return (
    <aside className="flex h-[calc(100vh-57px)] w-72 shrink-0 flex-col border-r border-slate-700 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          My Notes
        </h2>
        <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
          {notes.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {notes.length === 0 && (
          <p className="mt-8 text-center text-sm text-slate-500">
            No notes yet. Create one!
          </p>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleNoteClick(note.id)}
            className={`group cursor-pointer rounded-lg p-3 transition-all ${
              selectedNoteId === note.id
                ? "bg-indigo-500/20 ring-1 ring-indigo-500"
                : "hover:bg-slate-800"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <h3
                className={`text-sm font-medium leading-snug ${
                  selectedNoteId === note.id
                    ? "text-indigo-300"
                    : "text-slate-200"
                }`}
              >
                {note.title}
              </h3>
              <span
                className={`mt-0.5 shrink-0 h-1.5 w-1.5 rounded-full ${
                  selectedNoteId === note.id ? "bg-indigo-400" : "bg-slate-600"
                }`}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500 line-clamp-2">
              {note.body}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
