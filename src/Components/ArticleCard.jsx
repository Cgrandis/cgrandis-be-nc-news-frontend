function ArticleCard({ article }) {
    const { article_img_url, title, author } = article;
  
    return (
      <div className="article-card">
        <img src={article_img_url} alt={title} className="article-image" />
        <h2 className="article-title">{title}</h2>
        <p className="article-author">By {author}</p>
      </div>
    );
  }
  
  export default ArticleCard;