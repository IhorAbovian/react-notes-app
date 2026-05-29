import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { BACKEND_URL } from "../utils/constants";
import type { Note } from "./MainPage.tsx";

type CreateNoteData = {
  title: string;
  body: string;
};

const createNote = async (createNoteData: CreateNoteData) => {
  try {
    const createdNoteResponse = await fetch(`${BACKEND_URL}/notes`, {
      method: "POST",
      body: JSON.stringify(createNoteData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!createdNoteResponse.ok) {
      throw createdNoteResponse.status;
    }

    const createdNote = await createdNoteResponse.json();

    return { data: createdNote as Note, error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: null, error };
  }
};

export const AddPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const titleInput = form.title as unknown as HTMLInputElement | null;
    const bodyTextArea = form.body as unknown as HTMLTextAreaElement | null;

    const title = titleInput?.value || "";
    const body = bodyTextArea?.value || "";

    if (!title || !body) {
      console.log("Title and body must be not empty");

      return;
    }

    const createNoteData = {
      title,
      body,
    };

    createNote(createNoteData).then(({ error }) => {
      if (!error) {
        navigate("/");
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
      />

      <textarea
        name="body"
        className="border p-1"
        placeholder="Body"
        required
      ></textarea>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
};
