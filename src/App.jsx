import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlesList from './Components/articles/ArticlesList';
import Header from './Components/Header/Header';
import ArticlePage from './Components/articles/ArticlePage';
import TopicsPage from './Components/topics/TopicsPage';
import TopicArticlesPage from './Components/topics/TopicArticlesPage';
import NotFound from './Components/errorhandling/NotFound';

function App() {


  return (
    <div className="App">
      <Router>
        <header className='app-header'>
          <Header />
          </header> 
          <main className='main-content'>
        <Routes>          
          <Route path="/" element={<ArticlesList />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path='/topics/:topic' element={<TopicArticlesPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />          
      </ Routes>
      </main>
      </Router>
    </div>
  );
}

export default App
