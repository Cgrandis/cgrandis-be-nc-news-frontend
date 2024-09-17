import PropTypes from 'prop-types';

function CommentList({ comments }) {
  if (!comments || comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-card">
          <p>{comment.body}</p>
          <p>
            By {comment.author} on{' '}
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
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
  ),
};

export default CommentList;
