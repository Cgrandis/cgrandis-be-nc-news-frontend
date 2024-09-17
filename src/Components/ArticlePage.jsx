import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import AddComment from './AddComment';

function ArticlePage() {
  const { article_id } = useParams(); 

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const [votes, setVotes] = useState(0);
  const [comments,setComments] = useState([]);

  //console.log("article_id from params:", article_id);

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

      axios
      .get(`https://cg-nc-news-project.onrender.com/api/articles/${article_id}/comments`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((err) => {
        console.error(err);
        
      });

      axios
      .get(`https://cg-nc-news-project.onrender.com/api/articles/${article_id}`)
      .then((response) => {
        setArticle(response.data.article);
        setVotes(response.data.article.votes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error: Unable to fetch article');
        setLoading(false);
      });
  }, [article_id]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };


  const handleVote = (increment) => {
  
    if (voteChange === increment) return;

    const newVoteChange = voteChange + increment; 
    setVoteChange(increment);

    
    setVotes((prevVotes) => prevVotes + increment);

    
    axios
      .patch(`https://cg-nc-news-project.onrender.com/api/articles/${article_id}`, {
        inc_votes: increment,
      })
      .catch(() => {
        
        setVotes((prevVotes) => prevVotes - increment); 
        setVoteChange(0); 
        alert('Something went wrong. Please try again.');
      });
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;

  const { title, author, created_at, body, article_img_url, comment_count } = article;

  return (
    <div className="article-page">
      <h1>{title}</h1>
      <p>
        By {author} on {new Date(created_at).toLocaleDateString()}
      </p>
      <img src={article_img_url} alt={title} className="article-image" />
      <p>{body}</p>

      <p>{votes} votes | {comment_count} comments</p>
    
      <button
        onClick={() => handleVote(1)}
        disabled={voteChange === 1}
        style={{ backgroundColor: voteChange === 1 ? 'green' : 'gray' }}
      >
        ThumbsUp
      </button>
      <button
        onClick={() => handleVote(-1)}
        disabled={voteChange === -1}
        style={{ backgroundColor: voteChange === -1 ? 'red' : 'gray' }}
      >
        ThumbsDown
      </button>

      <AddComment article_id={article_id} onCommentAdded={handleCommentAdded} />
      
      <CommentList comments={comments}/>
    </div>
  );
}

export default ArticlePage;
