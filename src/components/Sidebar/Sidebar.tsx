import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/constants";
import { useNavigate } from "react-router";

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

const Sidebar = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await fetchNotes();
      setNotes(data);
    })();
  }, []);

  const handleNoteClick = (noteId: string) => {
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
              className="rounded border border-gray-200 bg-white p-3 hover:border-blue-400 cursor-pointer"
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
