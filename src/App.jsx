import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlesList from './Components/articles/ArticlesList';
import Header from './Components/Header';
import ArticlePage from './Components/articles/ArticlePage';
import TopicsPage from './Components/topics/TopicsPage';
import TopicArticlesPage from './Components/topics/TopicArticlesPage';

function App() {


  return (
    <div className="App">
      <Router>
          <Header />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path='/topics/:topic' element={<TopicArticlesPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
      </ Routes>
      </Router>
    </div>
  );
}

export default App
