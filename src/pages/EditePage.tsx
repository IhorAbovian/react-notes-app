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
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        className="border p-1"
        placeholder="Title"
        required
        defaultValue={selectedNote?.title}
      />

      <textarea
        name="body"
        className="border p-1"
        placeholder="Body"
        required
        defaultValue={selectedNote?.body}
      ></textarea>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>

        <button
          type="submit"
          className="bg-orange-700 text-white p-2 rounded"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
