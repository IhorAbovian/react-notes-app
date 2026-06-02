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
    <aside className="sidebar flex h-screen w-72 flex-col border-r border-gray-300 bg-gray-50">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">My Notes</h2>

        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              onClick={() => handleNoteClick(note.id)}
              className={`rounded border p-3 hover:border-blue-400 cursor-pointer transition-colors ${
                selectedNoteId === note.id
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="font-medium">{note.title}</h3>
              <p className="text-sm text-gray-400 truncate">{note.body}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
