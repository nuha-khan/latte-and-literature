import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import theme from '../theme';

function Navbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleProfile = () => {
    setShowDropdown(false);
    navigate('/profile');
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <img
          src="https://img.freepik.com/premium-vector/coffee-books-design-background_579179-3056.jpg"
          alt="Logo"
          style={styles.logoImage}
        />
        <span style={styles.logoText}>Latte & Literature</span>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/books" style={styles.link}>Books</Link></li>
        <li><Link to="/coffee" style={styles.link}>Coffee</Link></li>
        <li><Link to="/bundles" style={styles.link}>Bundles</Link></li>
        <li><Link to="/cart" style={styles.link}>Cart</Link></li>
        {user ? (
          <li style={{ position: 'relative' }}>
            <span style={styles.username} onClick={toggleDropdown}>
              Hi, {user.username}
            </span>
            {showDropdown && (
              <div style={styles.dropdown}>
                <button onClick={handleProfile} style={styles.dropdownItem}>Profile</button>
                <button onClick={handleLogout} style={styles.dropdownItem}>Logout</button>
              </div>
            )}
          </li>
        ) : (
          <li><Link to="/login" style={styles.link}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 3rem',
    backgroundColor: theme.colors.background,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: theme.fonts.body
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#5C4033',
    fontFamily: theme.fonts.heading
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  logoImage: {
    width: '35px',
    height: '35px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.textBrown,
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'color 0.3s',
    fontFamily: theme.fonts.body
  },
  username: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    cursor: 'pointer',
    fontSize: '1rem',
    fontFamily: theme.fonts.body
  },
  dropdown: {
    position: 'absolute',
    top: '2rem',
    right: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 999
  },
  dropdownItem: {
    background: 'none',
    border: 'none',
    padding: '0.75rem 1.2rem',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontFamily: theme.fonts.body,
    fontSize: '0.95rem',
    color: theme.colors.textDark
  }
};

export default Navbar;
