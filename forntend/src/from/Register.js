import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [fName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [aadhaarId, setAadhaarId] = useState('');
    const [pinCode , setPincode ] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_backrnd_api}user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fName, email, password, mobile, address , pinCode , aadhaarId })
            });

            const data = await response.json();

            if (response.status === 400 && data.message === "Error creating user: Email already exists") {
                setError('This Gmail is already registered');
            } else if (response.ok) {
                setError('');
                navigate('/login');
                console.log("User registered successfully");
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            setError('An error occurred while submitting the form. Please try again.');
            console.error("Error:", error);
        }
    };

    // console.log("env",process.env.BACKEND_api);
    // console.log('env2',process.env.REACT_APP_backrnd_api);
    

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '90vh',  // Reduced space between navbar and form
            background: 'linear-gradient(to right, #0a192f, #1e3a5f)', 
            fontFamily: "'Poppins', sans-serif",
            padding: '20px',
            margin: '0',
        },
        formContainer: {
            width: '400px',
            padding: '30px',
            borderRadius: '15px',
            background: 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            color: '#fff',
        },
        input: {
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            transition: '0.3s',
        },
        inputHover: {
            background: 'rgba(255, 255, 255, 0.2)',
        },
        button: {
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #ff7e5f, #ff3e80)',
            color: '#fff',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '10px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 62, 128, 0.4)',
        },
        buttonHover: {
            transform: 'scale(1.05)',
            boxShadow: '0 6px 20px rgba(255, 62, 128, 0.6)',
        },
        loginMessage: {
            marginTop: '15px',
            fontSize: '14px',
            color: '#bbb',
        },
        loginLink: {
            color: '#ff7e5f',
            textDecoration: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: '0.3s',
        },
        loginLinkHover: {
            color: '#ff3e80',
        },
        error: {
            color: 'red',
            fontSize: '14px',
            marginBottom: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2>Create Your Account</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={fName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        style={styles.input}
                        onMouseOver={(e) => e.target.style.background = styles.inputHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.input.background}
                    />
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={styles.input}
                        onMouseOver={(e) => e.target.style.background = styles.inputHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.input.background}
                    />
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                        onMouseOver={(e) => e.target.style.background = styles.inputHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.input.background}
                    />
                    <input
                        type="tel"
                        placeholder="Enter Your Mobile Number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        style={styles.input}
                        onMouseOver={(e) => e.target.style.background = styles.inputHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.input.background}
                    />
                    <textarea
                        placeholder="Enter Your Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        style={styles.input}
                        onMouseOver={(e) => e.target.style.background = styles.inputHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.input.background}
                    />
                     <input
                        type="text"
                        placeholder="Enter Your Pin code"
                        value={pinCode}
                        onChange={(e) => setPincode(e.target.value)}
                        required
                        style={styles.input}
                        onMouseOver={(e) => e.target.style.background = styles.inputHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.input.background}
                    />
                    <input
                        type="text"
                        placeholder="Enter Your Aadhaar ID"
                        value={aadhaarId}
                        onChange={(e) => setAadhaarId(e.target.value)}
                        required
                        style={styles.input}
                        onMouseOver={(e) => e.target.style.background = styles.inputHover.background}
                        onMouseOut={(e) => e.target.style.background = styles.input.background}
                    />
                    {error && <p style={styles.error}>{error}</p>}
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => {
                            e.target.style.transform = styles.buttonHover.transform;
                            e.target.style.boxShadow = styles.buttonHover.boxShadow;
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'scale(1)';
                            e.target.style.boxShadow = styles.button.boxShadow;
                        }}
                    >
                        Sign Up
                    </button>

                    {/* Login Message */}
                    <p style={styles.loginMessage}>
                        Already have an account?{' '}
                        <span
                            style={styles.loginLink}
                            onClick={() => navigate('/login')}
                            onMouseOver={(e) => e.target.style.color = styles.loginLinkHover.color}
                            onMouseOut={(e) => e.target.style.color = styles.loginLink.color}
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}
