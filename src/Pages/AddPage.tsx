import type { SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { createNote } from "../api/fetches.ts";
import { useNotes } from "../state/notes.ts";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Label } from "../components/ui/label.tsx";

export const AddPage = () => {
  const navigate = useNavigate();
  const { addNote, setSelectedNote } = useNotes();

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
      createdAt: new Date().toISOString(),
    };

    createNote(createNoteData).then(({ data, error }) => {
      if (data) {
        addNote(data);
        setSelectedNote(data);
        navigate(`/${data.id}`);
      }

      if (error) {
        alert("Failed to create a note!");
      }
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-start justify-center bg-gray-50 p-8">
      <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>New Note</CardTitle>
            <CardDescription>Create a new note</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Note title..."
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Body</Label>
              <Textarea
                name="body"
                placeholder="Write your note here..."
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex gap-3">
            <Button type="submit" className="cursor-pointer">
              <FontAwesomeIcon icon={faNewspaper} />
              Create Note
            </Button>

            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faCancel} />
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
