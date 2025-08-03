import React from 'react';
import { Link } from 'react-router-dom';
import theme from '../theme';

function FeaturedProducts() {
  const products = [
    { id: 1, title: 'Books', image: 'https://images.pexels.com/photos/45717/pexels-photo-45717.jpeg', link: '/books' },
    { id: 2, title: 'Coffee', image: 'https://images.pexels.com/photos/8070876/pexels-photo-8070876.jpeg', link: '/coffee' },
    { id: 3, title: 'Bundles', image: 'https://images.pexels.com/photos/5066474/pexels-photo-5066474.jpeg', link: '/bundles' },
  ];

  return (
    <section style={styles.container}>
      {products.map((product) => (
        <div key={product.id} style={styles.card}>
          <img src={product.image} alt={product.title} style={styles.image} />
          <h3 style={styles.title}>{product.title}</h3>
          <Link to={product.link}>
            <button style={styles.button}>View More</button>
          </Link>
        </div>
      ))}
    </section>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    padding: '3rem 1rem',
    backgroundColor: theme.colors.background,
    fontFamily: theme.fonts.body
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    width: '200px'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px'
  },
  title: {
    fontFamily: theme.fonts.heading,
    color: theme.colors.accentPink,
    margin: '0.5rem 0'
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1.5rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontFamily: theme.fonts.body
  }
};

export default FeaturedProducts;
