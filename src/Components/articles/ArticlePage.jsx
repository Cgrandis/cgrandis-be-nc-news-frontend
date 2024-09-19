import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentList from '../comments/CommentList';
import AddComment from '../comments/AddComment';
import { fetchArticleById, fetchCommentsByArticleId, updateArticleVotes } from '../../ApiServices/articlesApi'; 
import '../../App.css';

function ArticlePage() {
  const { article_id } = useParams(); 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [voteChange, setVoteChange] = useState(0);
  const [votes, setVotes] = useState(0);
  const [comments, setComments] = useState([]);
  const currentUser = 'tickle122';

  useEffect(() => {
    const getArticleData = async () => {
      try {
        const fetchedArticle = await fetchArticleById(article_id);
        const fetchedComments = await fetchCommentsByArticleId(article_id);

        setArticle(fetchedArticle);
        setVotes(fetchedArticle.votes);
        setComments(fetchedComments);
      } catch (err) {
        setError(err.message);
      } finally { // finally does it happen whatever has returned from 
        setLoading(false);
      }
    };

    getArticleData();
  }, [article_id]);

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = (comment_id) => {
    setComments((prevComments) => prevComments.filter(comment => comment.comment_id !== comment_id));
  };

  const handleVote = async (increment) => {
    // Preventing users voting the same way twice in a row
    if (voteChange === increment) return;

    setVoteChange(increment);    
    setVotes((prevVotes) => prevVotes + increment);

    try {
       // Wait for the API call to update the backend vote
      await updateArticleVotes(article_id, increment);
    } catch {
      //if the call back fails, rollback the vote and reset it
      setVotes((prevVotes) => prevVotes - increment); 
      setVoteChange(0); 
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;

  const { title, author, created_at, body, article_img_url, comment_count } = article;
 // desconstruct the article object extracting it's properties

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
      
      <CommentList comments={comments} currentUser={currentUser} onDeleteComment={handleDeleteComment}/>
    </div>
  );
}

export default ArticlePage;
