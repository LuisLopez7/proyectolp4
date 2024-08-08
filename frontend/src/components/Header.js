import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineBell, AiOutlineSearch, AiOutlineCamera } from 'react-icons/ai';
import './Header.css';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>ConnectUS</h1>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <Link to="/notifications">
                <AiOutlineBell />
                <span className="notification-badge">3</span>
              </Link>
            </li>
            <li><Link to="/profile">Perfil</Link></li>
            <li><Link to="/services">Servicios</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            <li><Link to="/feed" className="para-ti-button">Para ti</Link></li>
            <li>
              <Link to="/upload-photo">
                <AiOutlineCamera className="camera-icon" />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar fotografías"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;





