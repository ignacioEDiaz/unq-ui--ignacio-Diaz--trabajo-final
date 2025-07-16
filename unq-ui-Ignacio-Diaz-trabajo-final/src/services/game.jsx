import { API_ROUTES } from "../constants/api";
import { api } from "./api";

export const getSession = async (difficulty) => {
  try {
    const response = await api.get(`${ROUTES_API.DIFFICULTIES}/${difficulty}`);
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
export const getDifficulty = async () => {
  try {
    const response = await api.get(API_ROUTES.getDifficulties);
    return response.data;
  } catch (error) {
    throw error;
  }
};
