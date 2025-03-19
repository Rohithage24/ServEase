import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailToNameMap = {
      'rohithage@gmail.com': 'Rohit Hage',
      'aniseraf@gmail.com': 'Ani Seraf',
      'charwakbhonde123@gmail.com': 'Charwak Bhonde',
      'kartik@gmail.com': 'Kartik',
    };

    // Special case for specific emails
    if (email.toLowerCase() in emailToNameMap) {
      const userData = {
        user: emailToNameMap[email.toLowerCase()], // Get the name from the map
        token: 'Admin ',
      };
      setAuth({
        ...auth,
        ...userData,
      });
      localStorage.setItem('auth', JSON.stringify(userData));
      navigate('/Admin');
      return;
    } else {
      try {
        const response = await fetch('https://servease-backend.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data && data.user) {
          setAuth({
            ...auth,
            user: data.user,
            token: data.token,
          });
          localStorage.setItem('auth', JSON.stringify(data));
          navigate('/');
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        setError('An error occurred. Please try again later.');
      }
    }
  };


  console.log("env",process.env.backrnd_api);
  

  const goToRegister = () => {
    navigate('/register');
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #141e30, #243b55)',
    },
    loginBox: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      width: '350px',
    },
    title: {
      fontSize: '2rem',
      color: '#fff',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      background: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
      color: 'white',
      fontWeight: 'bold',
      transition: '0.3s ease',
    },
    buttonHover: {
      background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
    },
    error: {
      color: 'red',
      marginBottom: '10px',
    },
    text: {
      color: '#fff',
      marginTop: '15px',
    },
    link: {
      color: '#ff416c',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.title}>User Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <p style={styles.text}>
          Don't have an account?{' '}
          <span style={styles.link} onClick={goToRegister}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;