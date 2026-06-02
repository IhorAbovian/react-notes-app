import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { deleteNote, fetchNote, type Note } from "../../api/fetches.ts";
import { useNotes } from "../../state/notes.ts";

const MainContent = () => {
  const { removeNote } = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedNoteId = searchParams.get("selectedNoteId");

  useEffect(() => {
    if (!selectedNoteId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedNote(null);
      return;
    }

    fetchNote(selectedNoteId).then(({ data }) => {
      setSelectedNote(data);
    });
  }, [selectedNoteId]);

  const handleDelete = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this note?");

    if (!isConfirmed || !selectedNote) return;

    const { error } = await deleteNote(selectedNote.id);

    if (error) {
      alert("Failed to delete the note!");
      return;
    }

    removeNote(selectedNote.id);

    setSearchParams({});
    setSelectedNote(null);
  };

  return (
    <main className="flex-1 p-4">
      {!selectedNoteId && <p className="text-gray-400">Please select a note</p>}

      {selectedNote && (
        <div>
          <div className="flex justify-end gap-2">
            <Link to={`/edit/${selectedNote.id}`}>Edit</Link>

            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>

          <h2 className="text-2xl font-bold mb-2">{selectedNote.title}</h2>
          <p className="text-gray-700">{selectedNote.body}</p>
        </div>
      )}
    </main>
  );
};

export default MainContent;

// Component(){
//   1. state hooks (from libs as well)
//   2. effects (from libs as well)
//   3. event handlers, callbacks, memoized values
//   4. JSX
// }
