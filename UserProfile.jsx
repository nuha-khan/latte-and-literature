import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import theme from '../theme';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user for ID:', userId);
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        console.log('User fetched:', res.data);
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user data.');
      }
    };

    if (userId) fetchUser();
    else setError('User ID not found in local storage');
  }, [userId]);

  return (
    <>
      <NavBar />
      <section style={styles.container}>
        <h2 style={styles.heading}>My Profile</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {user ? (
          <div style={styles.card}>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
            <p><strong>Address:</strong> {user.address || 'Not provided'}</p>

            <h3 style={styles.ordersHeading}>Orders</h3>
            {user.orders && user.orders.length > 0 ? (
              <ul>
                {user.orders.map((order, index) => (
                  <li key={index}>
                    <strong>{order.product}</strong> - ₹{order.amount} on {new Date(order.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders yet.</p>
            )}
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
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
  card: {
    backgroundColor: theme.colors.card,
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    lineHeight: '1.6'
  },
  ordersHeading: {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    color: theme.colors.accentGreen
  }
};

export default UserProfile;
