import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://cg-nc-news-project.onrender.com/api/articles/${article_id}/comments`)
      .then((response) => {
        setComments(response.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      
      });
  }, [article_id]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.comment_id} className="comment-card">
            <p>{comment.body}</p>
            <p>
              By {comment.author} on{' '}
              {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

CommentList.propTypes = {
  article_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default CommentList;
