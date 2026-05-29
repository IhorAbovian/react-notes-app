import { useState } from "react";
import { useSearchParams } from "react-router";
import type { Note } from "../../Pages/MainPage.tsx";

// const fetchNote = async () => {
//   try {
//     const notesResponse = await fetch(`${BACKEND_URL}/notes`);

//     if (!notesResponse.ok) {
//       throw notesResponse.status;
//     }

//     const notes = await notesResponse.json();

//     return { data: notes as Note[], error: null };
//   } catch (error) {
//     console.log("Error!", error);
//     return { data: [], error };
//   }
// };

const MainContent = () => {
  const [selectedNote] = useState<Note | null>(null);

  const [searchParams] = useSearchParams();
  const selectedNoteId = searchParams.get("selectedNoteId");

  return (
    <main className="flex-1 p-4">
      {!selectedNoteId && <p className="text-gray-400">Please select a note</p>}

      {selectedNoteId && selectedNote && (
        <p className="text-gray-400">Note content...</p>
      )}
    </main>
  );
};

export default MainContent;
