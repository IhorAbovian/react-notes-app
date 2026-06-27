import { BACKEND_URL } from "../utils/constants";

type CreateNoteData = {
  title: string;
  body: string;
  createdAt?: string;
  tags?: string;
  updatedAt?: string;
};

export type Note = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  tags?: string;
  updatedAt?: string;
};

export const fetchNotes = async (options?: {
  query?: string;
  _page?: number;
  _limit?: number;
}) => {
  const { query = "", _page, _limit } = options || {};

  try {
    let url = `${BACKEND_URL}/notes`;
    const params = new URLSearchParams();

    if (query) {
      const where = {
        or: [{ title: { contains: query } }, { tags: { contains: query } }],
      };

      if (_page) params.set("_page", _page.toString());
      if (_limit) params.set("_limit", _limit.toString());

      params.set("_where", JSON.stringify(where));
    }

    if (params.toString()) url += `?${params.toString()}`;

    const notesResponse = await fetch(url);

    if (!notesResponse.ok) {
      throw notesResponse.status;
    }

    const notes = await notesResponse.json();

    return { data: notes as Note[], error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: [], error };
  }
};

export const fetchNote = async (id: string) => {
  try {
    const noteResponse = await fetch(`${BACKEND_URL}/notes/${id}`);

    if (!noteResponse.ok) {
      throw noteResponse.status;
    }

    const note = await noteResponse.json();

    return { data: note as Note, error: null };
  } catch (error) {
    console.log("Error!", error);

    return { data: null, error };
  }
};

export const deleteNote = async (id: string) => {
  try {
    const deleteNoteResponse = await fetch(`${BACKEND_URL}/notes/${id}`, {
      method: "DELETE",
    });

    if (!deleteNoteResponse.ok) {
      throw deleteNoteResponse.status;
    }

    const note = await deleteNoteResponse.json();

    return { data: note as Note, error: null };
  } catch (error) {
    console.log("Error!", error);

    return { data: null, error };
  }
};

export const createNote = async (createNoteData: CreateNoteData) => {
  try {
    const createdNoteResponse = await fetch(`${BACKEND_URL}/notes`, {
      method: "POST",
      body: JSON.stringify(createNoteData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!createdNoteResponse.ok) {
      throw createdNoteResponse.status;
    }

    const createdNote = await createdNoteResponse.json();

    return { data: createdNote as Note, error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: null, error };
  }
};

export const updateNote = async (
  id: string,
  updateNoteData: CreateNoteData,
) => {
  try {
    const updatedNoteResponse = await fetch(`${BACKEND_URL}/notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateNoteData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!updatedNoteResponse.ok) {
      throw updatedNoteResponse.status;
    }

    const updatedNote = await updatedNoteResponse.json();

    return { data: updatedNote as Note, error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: null, error };
  }
};
