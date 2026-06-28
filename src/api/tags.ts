import { BACKEND_URL } from "../utils/constants";

export type Tag = {
  id: string;
  name: string;
};

export const fetchTags = async () => {
  try {
    const tagsResponse = await fetch(`${BACKEND_URL}/tags`);

    if (!tagsResponse.ok) {
      throw tagsResponse.status;
    }

    const tags = await tagsResponse.json();

    return { data: tags as Tag[], error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: [], error };
  }
};

export const createTag = async (tagName: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tagName }),
    });

    if (!response.ok) {
      throw response.status;
    }

    const newTag = await response.json();

    return { data: newTag as Tag, error: null };
  } catch (error) {
    console.log("Error!", error);
    return { data: null, error };
  }
};
