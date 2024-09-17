// src/components/ArticlesList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://cg-nc-news-project.onrender.com/api/articles')
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          // Request was made but no response received
          setError('Error: No response from server');
        } else {
          // Something else happened
          setError('Error: Unable to fetch articles');
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="articles-list">
      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}

export default ArticlesList;
