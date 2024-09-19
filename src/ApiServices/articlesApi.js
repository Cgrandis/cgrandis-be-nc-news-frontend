import axios from 'axios';

const BASE_URL = 'https://cg-nc-news-project.onrender.com/api';

// Fetch a single article by it;s id
export const fetchArticleById = async (article_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/${article_id}`);
    return response.data.article;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to fetch article');
  }
};

// Fetch comments from an specific article
export const fetchCommentsByArticleId = async (article_id) => {
  try {
    const response = await axios.get(`${BASE_URL}/articles/${article_id}/comments`);
    return response.data.comments;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to fetch comments');
  }
};

// Post a new comment to an article
export const postComment = async (article_id, username, body) => {
  try {
    const response = await axios.post(`${BASE_URL}/articles/${article_id}/comments`, {
      username,
      body,
    });
    return response.data.comment;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to post comment');
  }
};

// Update votes for an article
export const updateArticleVotes = async (article_id, increment) => {
  try {
    await axios.patch(`${BASE_URL}/articles/${article_id}`, { inc_votes: increment });
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to update votes');
  }
};

// Fetch all articles sorting options
export const fetchArticles = async (sortBy = 'created_at', order = 'desc') => {
  try {
    const response = await axios.get(`${BASE_URL}/articles?sort_by=${sortBy}&order=${order}`);
    return response.data.articles;
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to fetch articles');
  }
};