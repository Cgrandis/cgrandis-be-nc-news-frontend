import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

function CommentList({ comments, currentUser, onDeleteComment }) {
  const [deletingComment, setDeletingComment] = useState(null); // Track which comment is being deleted

  const handleDelete = (comment_id) => {
    setDeletingComment(comment_id); // Mark comment as being deleted

    axios
      .delete(`https://cg-nc-news-project.onrender.com/api/comments/${comment_id}`)
      .then(() => {
        onDeleteComment(comment_id); // Call parent function to update comments list
        setDeletingComment(null); 
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to delete comment. Please try again.');
        setDeletingComment(null); 
      });
  };

  if (!comments || comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-card">
          <p>{comment.body}</p>
          <p>
            By {comment.author} on {new Date(comment.created_at).toLocaleDateString()}
          </p>

          {currentUser === comment.author && (
            <button
              onClick={() => handleDelete(comment.comment_id)}
              disabled={deletingComment === comment.comment_id} // Disable while deleting
              style={{
                backgroundColor: deletingComment === comment.comment_id ? 'gray' : 'red',
                cursor: deletingComment === comment.comment_id ? 'not-allowed' : 'pointer',
              }}
            >
              {deletingComment === comment.comment_id ? 'Deleting...' : 'Delete'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      comment_id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentUser: PropTypes.string.isRequired, // The username of the logged-in user
  onDeleteComment: PropTypes.func.isRequired, // Callback for deleting a comment
};

export default CommentList;
