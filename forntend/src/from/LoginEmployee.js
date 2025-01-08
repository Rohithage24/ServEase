import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const LoginEmployee = () => {
    const [gmail, setgmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();

    
  
    const handleRegister = async(e) => {
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
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login Professional</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="gmail"
            placeholder="gmail"
            value={gmail}
            onChange={(e) => setgmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="Password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    );
  };


  const styles = {
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh', // Full viewport height
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
    error: {
      color: 'red',
      marginBottom: '10px',
    },
  };


  export default LoginEmployee
  