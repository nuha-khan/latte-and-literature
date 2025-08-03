import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import theme from '../theme';

function Coffee() {
  const [coffeeList, setCoffeeList] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products?category=coffee')
      .then(({ data }) => setCoffeeList(data))
      .catch(err => console.error(err));
  }, []);

  const openModal = (coffee) => setSelectedCoffee(coffee);
  const closeModal = () => setSelectedCoffee(null);

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setMessage('Please log in to add to cart.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/cart/add', {
        userId,
        productId,
        quantity: 1
      });
      setMessage('Added to cart!');
    } catch (error) {
      console.error('Add to cart failed:', error);
      setMessage('Failed to add to cart.');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <>
      <NavBar />
      <section style={styles.container}>
        {message && <p style={styles.alert}>{message}</p>}

        {coffeeList.length === 0 ? (
          <p>No coffee products available.</p>
        ) : (
          coffeeList.map((coffee) => (
            <div key={coffee._id} style={styles.card}>
              <img src={coffee.image} alt={coffee.title} style={styles.image} />
              <h3 style={styles.title}>{coffee.title}</h3>
              <p style={styles.description}>{coffee.type}</p>
              <p style={styles.price}>₹{coffee.price}</p>
              <div style={styles.buttonGroup}>
                <button style={styles.iconButton} onClick={() => openModal(coffee)}>
                  <LocalCafeOutlinedIcon fontSize="small" />
                </button>
                <button style={styles.button} onClick={() => handleAddToCart(coffee._id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {selectedCoffee && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedCoffee.image} alt={selectedCoffee.title} style={styles.modalImage} />
            <h3 style={styles.title}>{selectedCoffee.title}</h3>
            <p style={styles.price}>₹{selectedCoffee.price}</p>
            <p style={styles.description}>{selectedCoffee.description || "No description available."}</p>
            <button style={styles.closeButton} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '3rem 1rem',
    flexWrap: 'wrap',
    backgroundColor: theme.colors.background
  },
  card: {
    backgroundColor: theme.colors.card,
    padding: '0.8rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '200px',
    textAlign: 'center',
    fontFamily: theme.fonts.body
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.accentPink,
    margin: '0.5rem 0 0.2rem 0'
  },
  description: {
    fontFamily: theme.fonts.body,
    color: theme.colors.textBrown,
    fontSize: '0.85rem',
    margin: '0.2rem 0'
  },
  price: {
    fontFamily: theme.fonts.body,
    color: theme.colors.textBrown,
    fontWeight: '500',
    margin: '0.2rem 0'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
    flexWrap: 'nowrap'
  },
  button: {
    padding: '0.5rem 1.2rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.fonts.body
  },
  iconButton: {
    padding: '0.3rem 0.5rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Modal styles
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  modalContent: {
    backgroundColor: theme.colors.card,
    padding: '2rem',
    borderRadius: '10px',
    width: '300px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
  },
  modalImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  closeButton: {
    padding: '0.5rem 1.5rem',
    backgroundColor: theme.colors.accentPink,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem'
  }
};

export default Coffee;
