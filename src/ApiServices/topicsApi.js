import axios from 'axios';

const BASE_URL = 'https://cg-nc-news-project.onrender.com/api';

export const fetchTopics = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/topics`);
    return response.data.topics;
  } catch {
    throw new Error('Error: Unable to fetch topics');
  }
};

export const fetchArticlesByTopic = async (topic) => {
  try {
    const response = await axios.get(`${BASE_URL}/articles?topic=${topic}`);
    return response.data.articles;
  } catch {
    throw new Error(`Topic "${topic}" was not found `);
  }
};
