import axios from 'axios';

const BASE_URL = 'https://cg-nc-news-project.onrender.com/api';

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

export const deleteComment = async (comment_id) => {
  try {
    await axios.delete(`${BASE_URL}/comments/${comment_id}`);
  } catch (error) {
    throw new Error(error.response?.data?.msg || 'Failed to delete comment');
  }
};
