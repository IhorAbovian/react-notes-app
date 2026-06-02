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
    <aside className="flex h-[calc(100vh-57px)] w-72 shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-500">My Notes</h2>
        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
          {notes.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {notes.length === 0 && (
          <p className="mt-8 text-center text-sm text-gray-400">
            No notes yet. Create one!
          </p>
        )}

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleNoteClick(note.id)}
            className={`cursor-pointer rounded-lg p-3 ${
              selectedNoteId === note.id
                ? "bg-indigo-50 border border-indigo-200"
                : "hover:bg-gray-100"
            }`}
          >
            <h3
              className={`text-sm font-medium ${
                selectedNoteId === note.id ? "text-indigo-700" : "text-gray-800"
              }`}
            >
              {note.title}
            </h3>
            <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
              {note.body}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
