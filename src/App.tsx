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
  const [notes, setNote] = useState<Note[]>([]);
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      body: "",
    };
    setNote([newNote, ...notes]);
  };

  return (
    <div>
      <Header addNote={addNote} />
      <Sidebar notes={notes} addNote={addNote} />
      <MainContent isCreatingNote={isCreatingNote} onSave={setIsCreatingNote} />
    </div>
  );
}

export default App;
