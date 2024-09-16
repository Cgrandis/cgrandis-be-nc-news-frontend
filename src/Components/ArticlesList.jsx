// src/components/ArticlesList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null);     // For error handling

  useEffect(() => {
    axios
      .get('https://cg-nc-news-project.onrender.com/api/articles')
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch articles');
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
