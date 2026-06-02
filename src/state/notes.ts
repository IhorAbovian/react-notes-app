import { create } from "zustand";
import type { Note } from "../api/fetches";

type NotesStore = {
  notes: Note[];
  isFetched: boolean;
  setNotes: (notes: Note[]) => void;
  removeNote: (id: string) => void;
  addNote: (note: Note) => void;
  editNote: (updatedNote: Note) => void;
};

export const useNotes = create<NotesStore>((set) => {
  return {
    notes: [],
    isFetched: false,
    setNotes: (notes: Note[]) => set({ notes, isFetched: true }), // ideally should be called only once
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
      })),
  };
});
