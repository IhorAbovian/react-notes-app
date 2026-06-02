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
    <main className="flex flex-1 flex-col bg-slate-950 min-h-[calc(100vh-57px)]">
      {!selectedNoteId && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-800 text-4xl">
            📝
          </div>
          <div>
            <p className="text-lg font-medium text-slate-300">Select a note</p>
            <p className="mt-1 text-sm text-slate-500">
              Choose a note from the sidebar or create a new one
            </p>
          </div>
        </div>
      )}

      {selectedNote && (
        <div className="flex flex-col gap-6 p-8 max-w-3xl w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                Note
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/edit/${selectedNote.id}`}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-indigo-500 hover:text-indigo-300"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-red-500 hover:text-red-400 cursor-pointer"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white leading-tight">
              {selectedNote.title}
            </h2>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {selectedNote.body}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;
