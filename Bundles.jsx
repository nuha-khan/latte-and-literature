import React, { useState, useEffect } from 'react'; 
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import axios from 'axios';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import theme from '../theme';

function Bundles() {
  const [bundles, setBundles] = useState([]);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products?category=bundle')
      .then(res => setBundles(res.data))
      .catch(err => console.error(err));
  }, []);

  const openModal = (bundle) => setSelectedBundle(bundle);
  const closeModal = () => setSelectedBundle(null);

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

        {bundles.length === 0 ? (
          <p>No bundles available.</p>
        ) : (
          bundles.map((bundle) => (
            <div key={bundle._id} style={styles.card}>
              <img src={bundle.image} alt={bundle.title} style={styles.image} />
              <h3 style={styles.title}>{bundle.title}</h3>
              <p style={styles.price}>₹{bundle.price}</p>
              <div style={styles.buttonGroup}>
                <button style={styles.iconButton} onClick={() => openModal(bundle)}>
                  <ReadMoreOutlinedIcon fontSize="small" />
                </button>
                <button style={styles.button} onClick={() => handleAddToCart(bundle._id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Modal */}
      {selectedBundle && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedBundle.image} alt={selectedBundle.title} style={styles.modalImage} />
            <h3 style={styles.title}>{selectedBundle.title}</h3>
            <p style={styles.price}>₹{selectedBundle.price}</p>
            <p style={styles.description}>{selectedBundle.description || 'No description available.'}</p>
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
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '220px',
    textAlign: 'center',
    fontFamily: theme.fonts.body
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px'
  },
  title: {
    color: theme.colors.accentPink,
    fontFamily: theme.fonts.heading,
    margin: '0.5rem 0 0.2rem 0'
  },
  desc: {
    fontSize: '0.85rem',
    color: theme.colors.textBrown,
    margin: '0.3rem 0'
  },
  price: {
    fontWeight: '500',
    color: theme.colors.textBrown,
    margin: '0.3rem 0'
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  iconButton: {
    padding: '0.4rem 0.6rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  // Modal Styles
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
  description: {
    fontFamily: theme.fonts.body,
    color: theme.colors.textBrown,
    margin: '1rem 0'
  },
  closeButton: {
    padding: '0.5rem 1.5rem',
    backgroundColor: theme.colors.accentPink,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default Bundles;
