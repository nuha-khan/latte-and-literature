import React from 'react';
import { motion } from 'framer-motion';
import theme from '../../theme';

function RouteLoader() {
  return (
    <motion.div
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={styles.loader}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear"
        }}
      >
        <span style={styles.dot}>☕</span>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(255, 248, 243, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    fontFamily: theme.fonts.heading
  },
  loader: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: theme.colors.accentGreen,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  dot: {
    fontSize: '2rem',
    color: '#fff'
  }
};

export default RouteLoader;
