import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_YOUTUBE_API_BASE_URL || 'http://localhost:5101'; // Fallback for development

export const getLatestSermons = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/sermons/latest`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest sermons:', error);
    throw error;
  }
};
