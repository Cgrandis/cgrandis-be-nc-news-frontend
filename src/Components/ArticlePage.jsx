import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';

function ArticlePage() {
    const { article_id } = useParams(); 
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);    
  
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
    }, [article_id]); // Re-run effect if article_id changes
  
    if (loading) return <p>Loading article...</p>;
    if (error) return <p>{error}</p>;
  
    const {
      title,
      author,
      created_at,
      body,
      article_img_url,
      votes,
      comment_count,
    } = article;
  
    return (
      <div className="article-page">
        <h1>{title}</h1>
        <p>
          By {author} on {new Date(created_at).toLocaleDateString()}
        </p>
        <img src={article_img_url} alt={title} className="article-image" />
        <p>{body}</p>
        <p>{votes} votes | {comment_count} comments</p>
        <CommentList article_id={article_id} />
      </div>
    );
  }
  
  export default ArticlePage;
  