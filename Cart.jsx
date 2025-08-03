import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import theme from '../theme';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [useAddress, setUseAddress] = useState(true);
  const [codSelected, setCodSelected] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const userRes = await axios.get('http://localhost:5000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userRes.data);

        const cartRes = await axios.get(`http://localhost:5000/api/cart/${userRes.data._id}`);
        const cartProducts = cartRes.data.products || [];

        const populatedItems = await Promise.all(
          cartProducts.map(async (item) => {
            const productRes = await axios.get(`http://localhost:5000/api/products/${item.productId}`);
            return {
              ...productRes.data,
              quantity: item.quantity
            };
          })
        );

        setCartItems(populatedItems);
      } catch (err) {
        console.error('Error loading cart/user:', err);
      }
    };

    fetchUserAndCart();
  }, []);

  const updateCart = async (newCart) => {
    setCartItems(newCart);
    try {
      const simplifiedCart = newCart.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }));

      await axios.post('http://localhost:5000/api/cart', {
        userId: user._id,
        products: simplifiedCart
      });
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const placeOrder = async () => {
    if (!useAddress || !codSelected) {
      alert("Please confirm both address and COD to place the order.");
      return;
    }

    try {
      const orderItems = cartItems.map(item => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image || ''
      }));

      await axios.post('http://localhost:5000/api/orders', {
        userId: user._id,
        total: getTotal(),
        products: orderItems
      });

      await updateCart([]);
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("Order placement failed.");
    }
  };

  return (
    <>
      <section style={styles.container}>
        <h2 style={styles.heading}>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Product</th>
                  <th style={styles.th}>Price</th>
                  <th style={styles.th}>Qty</th>
                  <th style={styles.th}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td style={styles.td}>{item.title}</td>
                    <td style={styles.td}>₹{item.price}</td>
                    <td style={styles.td}>{item.quantity}</td>
                    <td style={styles.td}>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={styles.total}>Total: ₹{getTotal()}</h3>

            <div style={styles.radioContainer}>
              <label>
                <input
                  type="radio"
                  checked={useAddress}
                  onChange={() => setUseAddress(true)}
                />
                Use saved address
              </label>
              <label>
                <input
                  type="radio"
                  checked={codSelected}
                  onChange={() => setCodSelected(true)}
                />
                Cash on Delivery
              </label>
            </div>

            <button style={styles.checkout} onClick={placeOrder}>Place Order</button>
          </>
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
    textAlign: 'left'
  },
  td: {
    padding: '0.8rem',
    borderBottom: '1px solid #ddd'
  },
  total: {
    fontSize: '1.5rem',
    marginTop: '1rem',
    color: theme.colors.textBrown
  },
  radioContainer: {
    display: 'flex',
    gap: '2rem',
    marginTop: '1rem',
    color: theme.colors.textBrown,
    fontFamily: theme.fonts.body
  },
  checkout: {
    marginTop: '1rem',
    padding: '0.6rem 1.5rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default Cart;
