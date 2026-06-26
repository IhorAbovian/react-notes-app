import { useEffect } from "react";
import { fetchNotes } from "../../api/notes.ts";
import { useNotes } from "../../state/notes";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { Badge } from "../ui/badge.tsx";
import { Separator } from "../ui/separator.tsx";

const Sidebar = () => {
  // const { query } = useFilters();
  const navigate = useNavigate();
  const { noteId } = useParams();

  const [searchParams] = useSearchParams();

  const { notes, setNotes } = useNotes();

  useEffect(() => {
    const query = searchParams.get("query") || "";

    (async () => {
      const { data } = await fetchNotes({
        query,
      });

      setNotes(data);
    })();
  }, [searchParams]);

  const handleNoteClick = (id: string) => {
    const params = new URLSearchParams(searchParams);
    const queryString = params.toString();
    navigate(`/${id}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <aside className="flex h-[calc(100vh-57px)] w-72 shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      <div className="container mx-auto flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-500">My Notes</h2>
        <Badge>{notes.length}</Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {notes.length === 0 && (
          <p className="mt-8 text-center text-sm text-gray-400">
            No notes yet. Create one!
          </p>
        )}

        {notes.map((note) => (
          <div key={note.id}>
            <div
              onClick={() => handleNoteClick(note.id)}
              className={`cursor-pointer rounded-lg p-3 ${
                noteId === note.id
                  ? "bg-indigo-50 border border-indigo-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <h3
                className={`text-sm font-medium ${
                  noteId === note.id ? "text-indigo-700" : "text-gray-800"
                }`}
              >
                {note.title}
              </h3>
              <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
                {note.body}
              </p>
            </div>
            <Separator className="my-1" />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
