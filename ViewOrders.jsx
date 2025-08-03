import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../components/Footer';
import theme from '../../theme';

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming admin login sets this
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to load orders.');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <section style={styles.container}>
        <h2 style={styles.heading}>View Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Items</th>
                <th style={styles.th}>Total (₹)</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td style={styles.td}>{order._id}</td>
                  <td style={styles.td}>{order.user?.username || 'Unknown'}</td>
                  <td style={styles.td}>
                    <ul style={{ paddingLeft: '1rem' }}>
                      {order.products?.map((item, index) => (
                        <li key={index}>
                          {item.title} (x{item.quantity}) – ₹{item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={styles.td}>₹{order.total}</td>
                  <td style={styles.td}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
    fontFamily: theme.fonts.body,
    verticalAlign: 'top'
  }
};

export default ViewOrders;
