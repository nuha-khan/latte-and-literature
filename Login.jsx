import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });

      const { user, token } = response.data;
      const userId = user._id || user.id;

      // ✅ Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', userId);

      alert('Login Successful!');
      console.log('Logged in user ID:', userId); // ✅ For debugging

      // 👇 Redirect based on isAdmin flag
      if (user.isAdmin) {
        navigate('/admin/home');
      } else {
        navigate('/');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong during login.');
      }
    }
  };

  return (
    <>
      <NavBar />
      <section style={styles.container}>
        <h2 style={styles.heading}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
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
          <button type="submit" style={styles.button}>Login</button>
          {error && <p style={styles.error}>{error}</p>}
          <p style={styles.signupText}>
            Not registered? <Link to="/signup" style={styles.link}>Sign Up here</Link>.
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
  signupText: {
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

export default Login;
