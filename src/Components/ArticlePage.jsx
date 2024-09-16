import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';

function ArticlePage() {
  const { article_id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);

  useEffect(() => {
    axios
      .get(`https://cg-nc-news-project.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        } else {
          setError('Error: Unable to fetch article');
        }
        setLoading(false);
      });
  }, [article_id]);

  const handleVote = (increment) => {
    setVoteChange((prevChange) => prevChange + increment);

    axios
      .patch(`https://cg-nc-news-project.onrender.com/api/articles/${article_id}`, {
        inc_votes: increment,
      })
      .catch(() => {
        setVoteChange((prevChange) => prevChange - increment);
        alert('Something went wrong. Please try again.');
      });
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;

  const { title, author, created_at, body, article_img_url, votes, comment_count } = article;

  return (
    <div className="article-page">
      <h1>{title}</h1>
      <p>
        By {author} on {new Date(created_at).toLocaleDateString()}
      </p>
      <img src={article_img_url} alt={title} className="article-image" />
      <p>{body}</p>

      <p>{votes + voteChange} votes | {comment_count} comments</p>

    
      <button onClick={() => handleVote(1)} disabled={voteChange === 1}>
        ThumbsUp
      </button>
      <button onClick={() => handleVote(-1)} disabled={voteChange === -1}>
        ThumbsDown
      </button>

      <CommentList article_id={article_id} />
    </div>
  );
}

export default ArticlePage;
