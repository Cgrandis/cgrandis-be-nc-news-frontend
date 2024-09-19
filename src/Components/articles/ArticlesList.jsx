import { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';
import { fetchArticles } from '../../ApiServices/articlesApi'; 
import '../../App.css';

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    const getArticles = async () => {
      try {
        const fetchedArticles = await fetchArticles(sortBy, order);
        setArticles(fetchedArticles);
      } catch (err) {
        setError(err.message);
      } finally { // finally does it happen whatever has returned from 
        setLoading(false);
      }
    };

    getArticles();
  }, [sortBy, order]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="articles-list">
      <div className="sort-options">
        <label htmlFor="sort-by">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment Count</option>
          <option value="votes">Votes</option>
        </select>
        <button onClick={toggleOrder}>
          {order === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
        </button>
      </div>

      {articles.map((article) => (
        <ArticleCard key={article.article_id} article={article} />
      ))}
    </div>
  );
}

export default ArticlesList;
