import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { useState } from "react";

export type Note = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Note`,
      body: "",
    };
    setNotes([newNote, ...notes]);
  };
  return (
    <div>
      <Header addNote={addNote} />
      <Sidebar notes={notes} />
    </div>
  );
}

export default App;
