import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const LoginEmployee = () => {
  const [gmail, setgmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();



  const handleRegister = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`https://servease-backend.onrender.com/EmployoLogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gmail, Password })
      });





      const data = await response.json();
      console.log(data);


      if (data && data.user) {
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem('auth', JSON.stringify(data)); // Save the parsed `data` object
        navigate('/Employee');
      } else {
        setError('Invalid username or Password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }

  }


  return (

    <div style={styles.container}>
      <div style={styles.loginBox}>
        <form onSubmit={handleRegister} style={styles.form}>
          <h2 style={styles.title}>Login Professional</h2>
          <input
            type="gmail"
            placeholder="gmail"
            value={gmail}
            onChange={(e) => setgmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  inputPlaceholder: {
    color: 'rgba(255, 255, 255, 0.7)',
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
};



export default LoginEmployee
