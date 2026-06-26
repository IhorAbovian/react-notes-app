import { useEffect, type SubmitEvent, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchNote, updateNote } from "../api/notes.ts";
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
import { faCancel, faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Label } from "../components/ui/label.tsx";
import { toast } from "sonner";
import { TagSelect } from "../components/ui/tag-select.tsx";

export const EditPage = () => {
  const navigate = useNavigate();
  const { editNote } = useNotes();

  const { noteId } = useParams();

  const { selectedNote, setSelectedNote } = useNotes();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!noteId) {
      setSelectedNote(null);
      return;
    }

    if (selectedNote?.id === noteId) {
      return;
    }

    fetchNote(noteId).then(({ data }) => {
      setSelectedNote(data);
    });
  }, [noteId, selectedNote?.id, setSelectedNote]);

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
      updatedAt: new Date().toISOString(),
    };

    setIsLoading(true);

    updateNote(noteId, updateNoteData)
      .then(({ data, error }) => {
        if (data) {
          editNote(data);
          navigate(`/${noteId}`);
        }

        if (error) {
          toast.error("Failed to update the note!", { position: "top-center" });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-start justify-center bg-gray-50 p-8">
      <div className="container mx-auto w-full max-w-2xl">
        <form key={selectedNote?.id} onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Edit Note</CardTitle>
              <CardDescription>Update your note content</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Note title..."
                  required
                  defaultValue={selectedNote?.title}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="body">Body</Label>
                <Textarea
                  id="body"
                  name="body"
                  placeholder="Write your note here..."
                  required
                  defaultValue={selectedNote?.body}
                  className="max-h-75"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tags">Tags</Label>
                <TagSelect
                  isMulti
                  inputId="tags"
                  name="tags"
                  placeholder="Add tags..."
                />
              </div>
            </CardContent>

            <CardFooter className="flex gap-3">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                ) : (
                  <FontAwesomeIcon icon={faSave} className="mr-2" />
                )}
                Save Changes
              </Button>

              <Button
                type="button"
                className="cursor-pointer"
                onClick={() => navigate("/")}
              >
                <FontAwesomeIcon icon={faCancel} className="mr-2" />
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};
