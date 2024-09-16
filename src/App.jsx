import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticlesList from './Components/ArticlesList'
import Header from './Components/Header'
import ArticlePage from './Components/ArticlePage';

function App() {


  return (
    <div className="App">
      <Router>
      <Header />
      <Routes>
      <Route path="/" element={<ArticlesList />} />
      <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App
