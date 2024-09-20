import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (menuOpen) {
      rootElement.style.paddingTop = '250px';
    } else {
      rootElement.style.paddingTop = '65px'; 
    }

   
    const handleClickOutside = (event) => {
      const header = document.querySelector('.header');
      if (menuOpen && header && !header.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header-content">
        <button className="menu-button" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>
        
        <Link to="/" className="app-name-link">
          <h1 className="app-name">NCCG News</h1>
        </Link>
      </div>

      <nav className={`menu ${menuOpen ? 'open' : 'closed'}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/articles">Articles</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
