import { useState } from 'react';
import PropTypes from 'prop-types';
import { postComment } from '../../ApiServices/commentssApi';
import '../../App.css';

function AddComment({ article_id, onCommentAdded }) {
  const [commentBody, setCommentBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (commentBody.trim() === '') { // error for empty comments
      setError('Comment cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment = await postComment(article_id, 'tickle122', commentBody);
      setCommentBody('');
      setSuccessMessage('Comment posted successfully!');
      onCommentAdded(newComment); 

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally { // finally does it happen whatever has returned from 
      setIsSubmitting(false);
    }
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

export default AddComment;
