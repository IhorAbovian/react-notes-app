import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router";

type Note = {
  id: string;
  title: string;
  body: string;
};

const fetchNotes = async () => {
  try {
    const notesResponse = await fetch(`${BACKEND_URL}/notes`);

    if (!notesResponse.ok) {
      throw notesResponse.status;
    }

    const notes = await notesResponse.json();

    return { data: notes as Note[], error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: [], error };
  }
};

const Sidebar = ({ refreshKey }: { refreshKey: number }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedNoteId = searchParams.get("selectedNoteId");

  console.log("selectedNoteId:", selectedNoteId);

  useEffect(() => {
    (async () => {
      const { data } = await fetchNotes();
      setNotes(data);
    })();
  }, [refreshKey]);

  const handleNoteClick = (noteId: string) => {
    console.log("Clicked:", noteId);
    navigate(`?selectedNoteId=${noteId}`);
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
