import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App.css';

function ArticleCard({ article }) {
  const { article_id, article_img_url, title, author, topic } = article; 

  return (
    <Link to={`/articles/${article_id}`} className="article-card-link">
      <div className="article-card">
        <img src={article_img_url} alt={title} className="article-image" />
        <h2 className="article-title">{title}</h2>
        <p className="article-author">By {author}</p>
        {topic && <p className="article-topic">Topic: {topic}</p>} 
      </div>
    </Link>
  );
}

export default ArticleCard;
