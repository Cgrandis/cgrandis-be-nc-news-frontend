import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import ArticleList from './Components/ArticlesList'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/articles" elemment={<ArticleList />} />
      </Routes>
    </Router>
  )
}

export default App
