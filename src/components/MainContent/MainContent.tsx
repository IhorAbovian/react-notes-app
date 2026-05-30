import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import type { Note } from "../../Pages/MainPage.tsx";
import { BACKEND_URL } from "../../utils/constants";

const fetchNote = async (id: string) => {
  try {
    const notesResponse = await fetch(`${BACKEND_URL}/notes/${id}`);

    if (!notesResponse.ok) {
      throw notesResponse.status;
    }

    const note = await notesResponse.json();

    return { data: note as Note, error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: null, error };
  }
};

const MainContent = ({ onNoteDeleted }: { onNoteDeleted: () => void }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [searchParams] = useSearchParams();
  const selectedNoteId = searchParams.get("selectedNoteId");

  useEffect(() => {
    if (!selectedNoteId) {
      setSelectedNote(null);
      return;
    }
    fetchNote(selectedNoteId).then(({ data }) => {
      setSelectedNote(data);
    });
  }, [selectedNoteId]);

  const deleteNote = async (id: string) => {
    await fetch(`${BACKEND_URL}/notes/${id}`, { method: "DELETE" });
  };

  const [, setSearchParams] = useSearchParams();

  const handleDelete = async () => {
    if (!selectedNote) return;
    await deleteNote(selectedNote.id);

    setSearchParams({});
    setSelectedNote(null);
    onNoteDeleted();
  };

  return (
    <main className="flex-1 p-4">
      {!selectedNoteId && <p className="text-gray-400">Please select a note</p>}

      {selectedNote && (
        <div>
          <h1 className="text-2xl font-bold mb-2">{selectedNote.title}</h1>
          <p className="text-gray-700">{selectedNote.body}</p>
        </div>
      )}

      {selectedNote && (
        <div className="relative">
          <button
            onClick={handleDelete}
            className="absolute top-0 right-0 text-red-500 hover:text-red-700 cursor-pointer"
          >
            Delete
          </button>
          <h1 className="text-2xl font-bold mb-2">{selectedNote.title}</h1>
          <p className="text-gray-700">{selectedNote.body}</p>
        </div>
      )}
    </main>
  );
};

export default MainContent;
