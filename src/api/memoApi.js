import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'https://api.mev.o-r.kr';

export const getMemos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/memo`);
    return response.data;
  } catch (error) {
    console.error('Error fetching memos:', error);
    throw error;
  }
};

export const createMemo = async (content) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/memo`, { content });
    return response.data;
  } catch (error) {
    console.error('Error creating memo:', error);
    throw error;
  }
};

export const deleteMemo = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/memo/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting memo ${id}:`, error);
    throw error;
  }
};
