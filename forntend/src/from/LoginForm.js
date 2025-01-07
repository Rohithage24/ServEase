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
    }else {
      
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

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User  Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
  );
};

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
    },
    input: {
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '1rem',
    },
    button: {
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    text: {
      marginTop: '10px',
      color: '#333',
    },
    link: {
      color: '#007bff',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  export default LoginForm