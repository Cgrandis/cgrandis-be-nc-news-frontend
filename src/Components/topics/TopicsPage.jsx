import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://cg-nc-news-project.onrender.com/api/topics')
      .then((response) => {
        setTopics(response.data.topics);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error: Unable to fetch topics');
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
          <li key={topic}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link> {/* Link to topic page */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicsPage;
