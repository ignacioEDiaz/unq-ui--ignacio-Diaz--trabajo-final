import { API_ROUTES } from "../constants/api";
import { api } from "./api";

export const createSession = async (dificulty) => {
  try {
    const response = await api.get(
      API_ROUTES.createSession(dificulty.id)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkWord = async (sessionId, word) => {
  try {
    const response = await api.post(API_ROUTES.checkWord, {
      word,
      sessionId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};