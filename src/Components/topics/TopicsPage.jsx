import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopics } from '../../ApiServices/topicsApi';
import '../../App.css';

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics()
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading topics...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="topics-page">
      <h1>Topics</h1>
      <ul>
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicsPage;
