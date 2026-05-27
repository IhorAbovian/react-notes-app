import { useRef, useEffect } from "react";

type MainContentProps = {
  activeNoteId: number | null;
  notes: { id: number; title: string; body: string }[];
  updateNoteTitle: (id: number, title: string) => void;
};

const MainContent = ({
  activeNoteId,
  notes,
  updateNoteTitle,
}: MainContentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const activeNote = notes.find((note) => note.id === activeNoteId);

  useEffect(() => {
    if (activeNoteId !== null) {
      inputRef.current?.focus();
    }
  }, [activeNoteId]);

  if (!activeNote) return <main className="flex-1" />;

  return (
    <main className="flex-1 p-4 flex items-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Title"
        value={activeNote.title}
        onChange={(e) => updateNoteTitle(activeNote.id, e.target.value)}
        className="outline-none text-2xl font-semibold mr-2"
        style={{
          width: "auto",
          minWidth: 100,
        }}
      />
    </main>
  );
};

export default MainContent;
