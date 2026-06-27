import { useEffect, useState } from "react";
import { fetchNotes } from "../../api/notes.ts";
import { useNotes } from "../../state/notes";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { Badge } from "../ui/badge.tsx";
import { Separator } from "../ui/separator.tsx";
import { Button } from "../ui/button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LIMIT = 20;

const Sidebar = () => {
  // const { query } = useFilters();
  const navigate = useNavigate();
  const { noteId } = useParams();

  const [searchParams] = useSearchParams();

  const { notes, setNotes } = useNotes();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setNotes([]);
    setHasMore(true);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const query = searchParams.get("query") || "";

    setIsLoading(true);
    (async () => {
      const { data } = await fetchNotes({
        query,
        _page: page,
        _limit: LIMIT,
      });

      setNotes((prev) => [...prev, ...data]);
      if (data.length < LIMIT) {
        setHasMore(false);
      }
    })().finally(() => setIsLoading(false));
  }, [searchParams, page, setNotes]);

  const handleNoteClick = (id: string) => {
    const params = new URLSearchParams(searchParams);
    const queryString = params.toString();
    navigate(`/${id}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <aside className="flex h-[calc(100vh-57px)] w-72 shrink-0 flex-col border-r border-gray-200 bg-gray-50">
      <div className="container mx-auto flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-500">My Notes</h2>
        <Badge>{notes.length}</Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {notes.length === 0 && (
          <p className="mt-8 text-center text-sm text-gray-400">
            No notes yet. Create one!
          </p>
        )}

        {notes.map((note) => (
          <div key={note.id}>
            <div
              onClick={() => handleNoteClick(note.id)}
              className={`cursor-pointer rounded-lg p-3 ${
                noteId === note.id
                  ? "bg-indigo-50 border border-indigo-200"
                  : "hover:bg-gray-100"
              }`}
            >
              <h3
                className={`text-sm font-medium ${
                  noteId === note.id ? "text-indigo-700" : "text-gray-800"
                }`}
              >
                {note.title}
              </h3>
              <p className="mt-0.5 text-xs text-gray-400 line-clamp-2">
                {note.body}
              </p>

              {note.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {(() => {
                    const tagList =
                      typeof note.tags === "string"
                        ? note.tags.split(",")
                        : note.tags;
                    return (
                      <>
                        {tagList.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                        {tagList.length > 2 && (
                          <span className="text-[10px] text-gray-400 self-center">
                            +{tagList.length - 2}
                          </span>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
            <Separator className="my-1" />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="pt-2">
          <Button
            className="w-full"
            onClick={() => setPage((p) => p + 1)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
