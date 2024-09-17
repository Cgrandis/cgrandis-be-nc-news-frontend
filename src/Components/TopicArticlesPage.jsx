import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from './ArticleCard'; // Assuming you have an ArticleCard component to display each article

function TopicArticlesPage() {
  const { topic } = useParams(); // Get the topic from the URL
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://cg-nc-news-project.onrender.com/api/articles?topic=${topic}`)
      .then((response) => {
        setArticles(response.data.articles);
        
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(`Error: Unable to fetch articles for topic "${topic}"`);
        setLoading(false);
      });
  }, [topic]); // Re-fetch articles when topic_slug changes

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="topic-articles-page">
      <h1>Articles for {topic}</h1>
      {articles.length === 0 ? (
        <p>No articles available for this topic.</p>
      ) : (
        articles.map((article) => <ArticleCard key={article.article_id} article={article} />)
      )}
    </div>
  );
}

export default TopicArticlesPage;
