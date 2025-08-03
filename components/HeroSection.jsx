import React from 'react';
import { motion } from 'framer-motion';
import theme from '../theme';

function HeroSection() {
  return (
    <section style={styles.hero}>
      <motion.h1
        style={styles.title}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Latte & Literature
      </motion.h1>

      <motion.p
        style={styles.subtitle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Discover Bundles of Books & Brews
      </motion.p>

      {/*<button 
        style={styles.button}
        onMouseOver={(e) => e.target.style.backgroundColor = theme.colors.accentPink}
        onMouseOut={(e) => e.target.style.backgroundColor = theme.colors.accentGreen}
      >
        Shop Now
      </button>*/}
    </section>
  );
}


const styles = {
  hero: {
  height: '80vh',
  backgroundImage: `url('https://images.pexels.com/photos/19769300/pexels-photo-19769300.jpeg')`,
  backgroundRepeat: 'repeat',
  backgroundSize: 'contain', // or try 'cover' if you prefer
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light overlay
  backgroundBlendMode: 'lighten', // Softens the pattern under the text
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '2rem',
  fontFamily: theme.fonts.body
},
  title: {
    fontSize: '3rem',
    color: theme.colors.accentPink,
    marginBottom: '1rem',
    fontFamily: theme.fonts.heading
  },
  subtitle: {
    fontSize: '1.5rem',
    color: theme.colors.textBrown,
    marginBottom: '2rem',
    fontFamily: theme.fonts.body
  },
  button: {
    padding: '0.8rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontFamily: theme.fonts.body
  }
};

export default HeroSection;
