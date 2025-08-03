import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/signup', {
        username,
        email,
        password,
        phone,
        address
      });

      alert('Signup successful! Please login.');
      navigate('/login'); // Redirect to login page after signup
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    }
  };

  return (
    <>
      <NavBar />
      <section style={styles.container}>
        <h2 style={styles.heading}>Sign Up</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            style={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            placeholder="Address"
            style={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Sign Up</button>
          {error && <p style={styles.error}>{error}</p>}
          <p style={styles.loginText}>
            Already have an account? <Link to="/login" style={styles.link}>Login here</Link>.
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
}

const styles = {
  container: {
    padding: '2rem',
    minHeight: '80vh',
    backgroundColor: theme.colors.background,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: theme.fonts.body
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: theme.colors.accentPink,
    fontFamily: theme.fonts.heading
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px'
  },
  input: {
    padding: '0.8rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    padding: '0.8rem',
    backgroundColor: theme.colors.accentGreen,
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    fontSize: '0.9rem'
  },
  loginText: {
    marginTop: '1rem',
    color: theme.colors.textBrown,
    fontSize: '0.9rem',
    textAlign: 'center'
  },
  link: {
    color: theme.colors.accentPink,
    textDecoration: 'underline',
    cursor: 'pointer'
  }
};

export default Signup;
