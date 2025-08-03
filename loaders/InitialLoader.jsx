import React from 'react';
import { motion } from 'framer-motion';
import theme from '../../theme';

function InitialLoader() {
  return (
    <div style={styles.loaderContainer}>
      <motion.div
        style={styles.circle}
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img src="/logo.png" alt="Latte & Literature Logo" style={styles.logo} />
      </motion.div>
      <p style={styles.text}>Brewing your experience...</p>
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.colors.background,
    fontFamily: theme.fonts.heading,
    color: theme.colors.textBrown
  },
  circle: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: theme.colors.accentPink,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
  },
  logo: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `2px solid ${theme.colors.accentGreen}`
  },
  text: {
    marginTop: '1.5rem',
    fontSize: '1.2rem',
    color: theme.colors.textBrown
  }
};

export default InitialLoader;
