import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../components/Footer';
import theme from '../../theme';

function AdminHome() {
  const [stats, setStats] = useState({ products: 0, users: 0, orders: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    // If no user or not an admin, redirect to home
    if (!storedUser || !storedUser.isAdmin) {
      navigate('/');
      return;
    }

    // Fetch stats with token header
    axios.get('http://localhost:5000/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStats(res.data))
    .catch(err => console.error('Failed to load stats', err));
  }, [navigate]);

  return (
    <>
      <section style={styles.container}>
        <h1 style={styles.heading}>Admin Dashboard</h1>
        <Link to="/" style={styles.linkBack}>← Back to Home</Link>
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{stats.products}</h3>
            <p>Products</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{stats.users}</h3>
            <p>Users</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{stats.orders}</h3>
            <p>Orders</p>
          </div>
        </div>

        <div style={styles.buttons}>
          <Link to="/admin/products" style={styles.link}>
            <button style={styles.button}>Manage Products</button>
          </Link>
          <Link to="/admin/users" style={styles.link}>
            <button style={styles.button}>Manage Users</button>
          </Link>
          <Link to="/admin/orders" style={styles.link}>
            <button style={styles.button}>View Orders</button>
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: theme.colors.background,
    minHeight: '80vh',
    fontFamily: theme.fonts.body
  },
  heading: {
    fontSize: '2.5rem',
    color: theme.colors.accentPink,
    marginBottom: '2rem',
    fontFamily: theme.fonts.heading
  },
  stats: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '3rem'
  },
  statCard: {
    backgroundColor: theme.colors.card,
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '150px'
  },
  statNumber: {
    fontSize: '2rem',
    color: theme.colors.accentGreen,
    marginBottom: '0.5rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem'
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s'
  },
  link: {
    textDecoration: 'none'
  },
  linkBack: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: theme.colors.accentGreen,
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default AdminHome;
