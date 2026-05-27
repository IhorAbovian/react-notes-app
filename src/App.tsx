import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

export type Note = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(null);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      body: "",
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNoteTitle = (id: number, title: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, title } : note)),
    );
  };

  return (
    <div>
      <Header addNote={addNote} />
      <Sidebar notes={notes} addNote={addNote} />
      <MainContent
        activeNoteId={activeNoteId}
        notes={notes}
        updateNoteTitle={updateNoteTitle}
      />
    </div>
  );
}

export default App;
