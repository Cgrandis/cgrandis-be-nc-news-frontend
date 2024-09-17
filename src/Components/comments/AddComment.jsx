import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function AddComment({ article_id, onCommentAdded }) {
  const [commentBody, setCommentBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (commentBody.trim() === '') {
      setError('Comment cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    axios
      .post(`https://cg-nc-news-project.onrender.com/api/articles/${article_id}/comments`, {
        username: 'tickle122',
        body: commentBody,
      })
      .then((response) => {
        setCommentBody('');
        setIsSubmitting(false);
        setSuccessMessage('Comment posted successfully!');
        onCommentAdded(response.data.comment); 
    
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to post comment. Please try again.');
        if (err.response && err.response.status === 500) {
          setError('Internal server error. Please try again later.');
        } else if (err.response && err.response.status === 400) {
          setError('Invalid comment data.');
        }
        setIsSubmitting(false);
      });
  };

  return (
    <div className="add-comment">
      <h3>Add a Comment</h3>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Write your comment here..."
          required
          disabled={isSubmitting}
        ></textarea>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  article_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};

export default AddComment;
