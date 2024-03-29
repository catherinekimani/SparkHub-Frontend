
import { UPDATE_CONTENT } from "./types";

export const updateContent = (updatedContent) => {
  return {
    type: UPDATE_CONTENT,
    payload: updatedContent,
  };
};
