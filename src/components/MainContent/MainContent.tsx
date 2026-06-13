import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { deleteNote, fetchNote } from "../../api/fetches.ts";
import { useNotes } from "../../state/notes.ts";
import { formatDate } from "../../utils/time.ts";
import { Button } from "../ui/button.tsx";
import { Card, CardHeader, CardDescription, CardContent } from "../ui/card.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../ui/separator.tsx";

const MainContent = () => {
  const { removeNote } = useNotes();
  const { selectedNote, setSelectedNote } = useNotes();
  const navigate = useNavigate();

  const { noteId } = useParams();

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

  const handleDelete = async () => {
    const isConfirmed = confirm("Are you sure you want to delete this note?");

    if (!isConfirmed || !selectedNote) return;

    const { error } = await deleteNote(selectedNote.id);

    if (error) {
      alert("Failed to delete the note!");
      return;
    }

    removeNote(selectedNote.id);

    navigate("/");
  };

  return (
    <main className="flex flex-1 flex-col bg-white min-h-[calc(100vh-57px)]">
      {!noteId && (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-100 text-4xl">
            📝
          </div>
          <div>
            <p className="text-lg font-medium text-gray-700">Select a note</p>
            <p className="mt-1 text-sm text-gray-400">
              Choose a note from the sidebar or create a new one
            </p>
          </div>
        </div>
      )}

      {selectedNote && (
        <div className="flex flex-col gap-6 p-8 max-w-3xl w-full">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    Note
                  </span>
                </div>

                <CardDescription>
                  {formatDate(selectedNote.createdAt)}
                </CardDescription>

                <div className="flex items-center gap-2">
                  <Link to={`/edit/${selectedNote.id}`}>
                    <Button className="cursor-pointer">
                      <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </Button>
                  </Link>

                  <Button onClick={handleDelete} className="cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>

            <Separator className="my-4" />

            <CardContent className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                {selectedNote.title}
              </h2>

              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedNote.body}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
};

export default MainContent;
