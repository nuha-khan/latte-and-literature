import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import theme from '../../theme';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users'); // backend endpoint
        setUsers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <section style={styles.container}>
        <h2 style={styles.heading}>Manage Users</h2>
        <Link to="/" style={styles.linkBack}>← Back to Home</Link>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td style={styles.td}>{user._id}</td>
                <td style={styles.td}>{user.username}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone || '—'}</td>
                <td style={styles.td}>{user.address || '—'}</td>
                <td style={styles.td}>{user.isAdmin ? 'Admin' : 'User'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: theme.colors.background,
    minHeight: '80vh',
    fontFamily: theme.fonts.body
  },
  heading: {
    fontSize: '2rem',
    color: theme.colors.accentPink,
    fontFamily: theme.fonts.heading,
    marginBottom: '1rem'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme.colors.card,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  th: {
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    padding: '0.8rem',
    textAlign: 'left',
    fontFamily: theme.fonts.body
  },
  td: {
    padding: '0.8rem',
    borderBottom: '1px solid #ddd',
    fontFamily: theme.fonts.body
  },
  text: {
    color: theme.colors.textBrown
  },
  linkBack: {
    display: 'inline-block',
    marginBottom: '1rem',
    color: theme.colors.accentGreen,
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default ManageUsers;
