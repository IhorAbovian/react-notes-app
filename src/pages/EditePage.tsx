import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchNote, updateNote, type Note } from "../api/fetches.ts";
import { useNotes } from "../state/notes.ts";

export const EditPage = () => {
  const navigate = useNavigate();
  const { editNote } = useNotes();

  const { noteId } = useParams();

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    if (!noteId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedNote(null);
      return;
    }

    fetchNote(noteId).then(({ data }) => {
      setSelectedNote(data);
    });
  }, [noteId]);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    if (!noteId) {
      return;
    }

    const form = event.target as HTMLFormElement;

    const titleInput = form.title as unknown as HTMLInputElement | null;
    const bodyTextArea = form.body as unknown as HTMLTextAreaElement | null;

    const title = titleInput?.value || "";
    const body = bodyTextArea?.value || "";

    if (!title || !body) {
      console.log("Title and body must be not empty");

      return;
    }

    const updateNoteData = {
      title,
      body,
    };

    updateNote(noteId, updateNoteData).then(({ data, error }) => {
      if (data) {
        editNote(data);
        navigate({
          pathname: "/",
          search: `?selectedNoteId=${noteId}`,
        });
      }

      if (error) {
        alert("Failed to update the note!");
      }
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-start justify-center bg-slate-950 p-8">
      <div className="w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Edit Note</h1>
          <p className="mt-1 text-sm text-slate-400">
            Update your note content
          </p>
        </div>

        <form
          className="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-900 p-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 "
              placeholder="Note title..."
              required
              defaultValue={selectedNote?.title}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Body
            </label>
            <textarea
              name="body"
              rows={8}
              className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-slate-200 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
              placeholder="Write your note here..."
              required
              defaultValue={selectedNote?.body}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-600 active:bg-indigo-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Changes
            </button>

            <button
              type="button"
              className="rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
