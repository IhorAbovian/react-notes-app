import { create } from "zustand";
import type { Note } from "../api/fetches";

type NotesStore = {
  notes: Note[];
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  isFetched: boolean;
  setNotes: (notes: Note[]) => void;
  removeNote: (id: string) => void;
  addNote: (note: Note) => void;
  editNote: (updatedNote: Note) => void;
};

// type FiltersStore = {
//   query: string;
//   setQuery: (query: string) => void;
// };

export const useNotes = create<NotesStore>((set) => {
  return {
    notes: [],
    isFetched: false,
    selectedNote: null,
    setSelectedNote: (selectedNote) => set({ selectedNote }),
    setNotes: (notes: Note[]) => set({ notes, isFetched: true }),
    removeNote: (id: string) =>
      set((state) => ({
        notes: state.notes.filter((note: Note) => note.id !== id),
      })),
    addNote: (note: Note) =>
      set((state) => ({
        notes: [...state.notes, note],
      })),
    editNote: (updatedNote: Note) =>
      set((state) => ({
        notes: state.notes.map((note: Note) =>
          note.id === updatedNote.id ? updatedNote : note,
        ),
        selectedNote:
          state.selectedNote?.id === updatedNote.id
            ? updatedNote
            : state.selectedNote,
      })),
  };
});

// export const useFilters = create<FiltersStore>((set) => ({
//   query: "",
//   setQuery: (query) => set({ query }),
// }));
