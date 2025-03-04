import React, { useState } from 'react'
import { useAuth } from '../context/auth'

const RequestFrom = ({ service }) => {
  const [auth] = useAuth()
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState(service)
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [connect, setContact] = useState('')

  const userData = auth.user
  console.log(userData)

  const handleSubmit = async e => {
    e.preventDefault()

    const emailData = {
      to,
      subject,
      body,
      userData
    }
    console.log(emailData)

    try {
      const response = await fetch('http://localhost:8080/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailData)
      })

      const result = await response.json()
      if (response.ok) {
        setMessage('Request sent successfully!')
      } else {
        setMessage(`Failed to send email: ${result.message}`)
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    }
  }

  return (
    <>
      <div style={styles.container}>
        <div style={styles.formBox}>
          <h2 style={styles.heading}>Get a Quote</h2>

          <p style={styles.subText}>We will get back to you in 24 hours</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputRow}>
              <input
                type='text'
                placeholder='First Name'
                value={userData.fName}
                onChange={e => setName(e.target.value)}
                style={styles.input}
                required
              />

              <input
                type='text'
                placeholder='Contact'
                value={userData.mobile}
                onChange={e => setContact(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputRow}>
              <input
                type='email'
                placeholder='Email'
                value={userData.email}
                onChange={e => setTo(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}></label>
              <input
                type='text'
                value={subject}
                onChange={e => setSubject(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <textarea
              placeholder='Service Details'
              value={body}
              onChange={e => setBody(e.target.value)}
              style={styles.textarea}
              required
            />

            <button type='submit' style={styles.button}>
              Get Quote
            </button>
          </form>

          {message && <p style={styles.message}>{message}</p>}
        </div>
      </div>
    </>
  )
}

// Inline styles
const styles = {
  container: {
    display: 'flex',

    justifyContent: 'center',

    alignItems: 'center',

    height: '100vh',

    backgroundImage:
      'url("https://source.unsplash.com/random/1600x900?fabric")',

    backgroundSize: 'cover',

    backgroundPosition: 'center'
  },

  formBox: {
    width: '400px',

    padding: '30px',

    backgroundColor: 'rgba(0, 0, 0, 0.8)',

    borderRadius: '10px',

    color: '#fff',

    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'
  },

  heading: {
    textAlign: 'center',

    fontSize: '22px',

    marginBottom: '5px'
  },

  subText: {
    textAlign: 'center',

    fontSize: '14px',

    color: '#bbb',

    marginBottom: '20px'
  },

  inputRow: {
    display: 'flex',

    gap: '10px',

    marginBottom: '10px'
  },

  input: {
    flex: 1,

    padding: '10px',

    borderRadius: '5px',

    border: '1px solid #444',

    backgroundColor: '#222',

    color: '#fff',

    fontSize: '14px',

    outline: 'none'
  },

  textarea: {
    width: '100%',

    padding: '10px',

    borderRadius: '5px',

    border: '1px solid #444',

    backgroundColor: '#222',

    color: '#fff',

    fontSize: '14px',

    height: '80px',

    outline: 'none',

    resize: 'none',

    marginBottom: '15px'
  },

  button: {
    width: '100%',

    padding: '12px',

    backgroundColor: '#007bff',

    color: '#fff',

    border: 'none',

    borderRadius: '5px',

    cursor: 'pointer',

    fontSize: '16px',

    transition: '0.3s ease'
  },

  buttonHover: {
    backgroundColor: '#0056b3'
  },

  message: {
    marginTop: '10px',

    textAlign: 'center',

    color: '#28a745'
  }
}
export default RequestFrom
