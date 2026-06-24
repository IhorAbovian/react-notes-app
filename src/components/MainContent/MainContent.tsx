import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { deleteNote, fetchNote } from "../../api/notes.ts";
import { useNotes } from "../../state/notes.ts";
import { formatDate } from "../../utils/time.ts";
import { Button } from "../ui/button.tsx";
import { Card, CardHeader, CardDescription, CardContent } from "../ui/card.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "../ui/separator.tsx";
import { Modal } from "../Modal/Modal.tsx";
import { Badge } from "../ui/badge.tsx";
import { toast } from "sonner";

const MainContent = () => {
  const { removeNote } = useNotes();
  const { selectedNote, setSelectedNote } = useNotes();
  const navigate = useNavigate();

  const { noteId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const mountedRef = useRef(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!noteId) {
      setSelectedNote(null);
      setIsLoading(false);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setSelectedNote(null);
    setIsLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    fetchNote(noteId)
      .then(({ data }) => {
        setSelectedNote(data);
      })
      .catch((err) => {
        console.error("Failed to fetch note:", err);
      })
      .finally(() => {
        if (!mountedRef.current) return;

        setTimeout(() => setIsLoading(false), 0);
      });
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [noteId]);

  const handleDelete = async () => {
    if (!selectedNote) return;
    setDeleting(true);
    try {
      const { error } = await deleteNote(selectedNote.id);
      if (error) {
        toast.error("Failed to delete the note!");
        return;
      }
      removeNote(selectedNote.id);
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete the note!");
    } finally {
      setDeleting(false);
    }
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

      {isLoading && !selectedNote && (
        <div className="flex flex-1 flex-col items-center justify-center py-8">
          <FontAwesomeIcon
            icon={faSpinner}
            spin
            className="h-8 w-8 text-gray-500 mb-2"
          />
          <p className="text-sm text-gray-500">Loading note…</p>
        </div>
      )}

      {selectedNote && (
        <div className="container mx-auto flex flex-col gap-6 p-8 max-w-3xl w-full">
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
                  {selectedNote.updatedAt &&
                  selectedNote.updatedAt !== selectedNote.createdAt
                    ? `updated ${formatDate(selectedNote.updatedAt)}`
                    : `created ${formatDate(selectedNote.createdAt)}`}
                </CardDescription>

                <div className="flex items-center gap-2">
                  <Link to={`/edit/${selectedNote.id}`}>
                    <Button className="cursor-pointer">
                      <FontAwesomeIcon icon={faEdit} />
                      Edit
                    </Button>
                  </Link>

                  <Modal
                    trigger={
                      <Button className="cursor-pointer" disabled={deleting}>
                        {deleting ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="mr-2"
                          />
                        ) : (
                          <FontAwesomeIcon icon={faTrash} />
                        )}
                        Delete
                      </Button>
                    }
                    title="Confirm deletion"
                    description="Are you sure you want to delete this note?"
                    onAction={handleDelete}
                    actionLabel="Yes"
                  ></Modal>
                </div>
              </div>
            </CardHeader>

            <Separator className="my-4" />

            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-2">
                {selectedNote.tags
                  ?.split(",")
                  .filter(Boolean)
                  .map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
              </div>
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
