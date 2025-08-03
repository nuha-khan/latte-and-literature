import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} Latte & Literature ༄˖°.☕️.ೃ࿔📚*:･. All rights reserved.</p>
      
      <div style={styles.adminContainer}>
        <Link to="/login" style={styles.adminLink}>Admin</Link>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: theme.colors.textBrown,
    padding: '1rem 2rem',
    borderTop: '1px solid #ccc',
    marginTop: 'auto',
    textAlign: 'center',
    position: 'relative'
  },
  text: {
    fontSize: '0.9rem',
    color: theme.colors.accentPink,
    fontFamily: theme.fonts.body
  },
  adminContainer: {
    position: 'absolute',
    right: '2rem',
    top: '1rem',
  },
  adminLink: {
    fontWeight: 'bold',
    color: theme.colors.accentPink,
    textDecoration: 'none'
  }
};

export default Footer;
