import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { createNote } from "../api/fetches.ts";
import { useNotes } from "../state/notes.ts";
import { Button } from "../components/ui/button.tsx";
import { Input } from "../components/ui/input.tsx";
import { Textarea } from "../components/ui/textarea.tsx";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Label } from "../components/ui/label.tsx";
import { toast } from "sonner";
import CreatableSelect from "react-select/creatable";

export const AddPage = () => {
  const navigate = useNavigate();
  const { addNote, setSelectedNote } = useNotes();
  const [selectedTag, setSelectedTag] = useState<{ value: string; label: string }[]>([]);

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const titleInput = form.title as unknown as HTMLInputElement | null;
    const bodyTextArea = form.body as unknown as HTMLTextAreaElement | null;

    const title = titleInput?.value || "";
    const body = bodyTextArea?.value || "";
    const tags = selectedTag.map((input) => input.value);

    if (!title || !body) {
      console.log("Title and body must be not empty");

      return;
    }

    const createNoteData = {
      title,
      body,
      tags: tags.join(","),
      createdAt: new Date().toISOString(),
    };

    createNote(createNoteData).then(({ data, error }) => {
      if (data) {
        addNote(data);
        setSelectedNote(data);
        navigate(`/${data.id}`);
      }

      if (error) {
        toast.error("Failed to create a note!", { position: "top-center" });
      }
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)] items-start justify-center bg-gray-50 p-8">
      <div className="container mx-auto w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>New Note</CardTitle>
              <CardDescription>Create a new note</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" type="text" name="title" placeholder="Note title..." required />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="body">Body</Label>
                <Textarea id="body" name="body" placeholder="Write your note here..." required className="max-h-75" />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tags">Tags</Label>
                <CreatableSelect
                  isMulti
                  id="tags"
                  name="tags"
                  value={selectedTag}
                  onChange={(newValue) => setSelectedTag(newValue as { value: string; label: string }[])}
                  placeholder="Add tags..."
                />
              </div>
            </CardContent>

            <CardFooter className="flex gap-3">
              <Button type="submit" className="cursor-pointer">
                <FontAwesomeIcon icon={faNewspaper} />
                Create Note
              </Button>

              <Button type="button" className="cursor-pointer" onClick={() => navigate("/")}>
                <FontAwesomeIcon icon={faCancel} />
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
};
