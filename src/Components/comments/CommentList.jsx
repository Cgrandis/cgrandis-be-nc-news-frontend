import PropTypes from 'prop-types';
import { useState } from 'react';
import { deleteComment } from '../../ApiServices/commentssApi';
import '../../App.css';

function CommentList({ comments, currentUser, onDeleteComment }) {
  const [deletingComment, setDeletingComment] = useState(null); 

  const handleDelete = async (comment_id) => {
    setDeletingComment(comment_id);

    try {
      await deleteComment(comment_id);
      onDeleteComment(comment_id); 
    } catch (err) {
      console.error(err);
      alert('Failed to delete comment. Please try again.');
    } finally {
      setDeletingComment(null);
    }
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
              disabled={deletingComment === comment.comment_id}
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


export default CommentList;
