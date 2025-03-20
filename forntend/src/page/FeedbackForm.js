import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/auth'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify' // Import toast notifications


const FeedbackForm = () => {
  const [rating, setRating] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [feedback, setFeedback] = useState('')
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)

  const [request, setRequest] = useState(null)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { requestId } = useParams()
  const navigate = useNavigate()

  console.log(requestId)

  useEffect(() => {
    const fetchRequestById = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}getRequest/${requestId}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
          }
        )

        if (!response.ok) throw new Error('Failed to fetch request')

        const requestData = await response.json()
        console.log(requestData)
        setRequest(requestData)

        if (requestData.ORDER_ID) {
          const paymentResponse = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}payme/${requestData.ORDER_ID}`,
            {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' }
            }
          )

          if (!paymentResponse.ok) throw new Error('Failed to fetch payment')

          const paymentData = await paymentResponse.json()
        //   console.log(paymentData)
          setPayment(paymentData.data)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRequestById()
  }, [requestId])

//   console.log(useAuth)

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleRating = value => setRating(value)

  const handleOptionChange = (question, value) => {
    setSelectedOptions(prev => ({ ...prev, [question]: value }))
  }

  const fetchReviews = async () => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_BASE_URL}getFeed')
      const data = await response.json()
      setReviews(data)
      const avg =
        data.reduce((sum, review) => sum + review.rating, 0) / data.length
      setAverageRating(avg.toFixed(1))
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const newFeedback = {
      rating,
      selectedOptions,
      feedback,
      orderID: request.ORDER_ID,
      userID: request.userID,
      reqID: request._id,
      employee: request.employee
    }
  
    console.log('Submitting Feedback:', newFeedback)
  
    try {
      const response = await fetch('${process.env.REACT_APP_API_BASE_URL}feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFeedback)
      })
  
      if (!response.ok) throw new Error('Failed to submit feedback')
  
      toast.success('Feedback submitted successfully!', { position: 'top-right' })
  
      // Reset feedback form
      setRating(0)
      setSelectedOptions({})
      setFeedback('')
  
      navigate("/")
      // Refresh reviews
      fetchReviews()
    } catch (error) {
      console.error('Error submitting feedback:', error)
      toast.error('Failed to submit feedback. Please try again.', { position: 'top-right' })
    }
  }
  

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Give Your Feedback</h2>
      <p style={styles.subtext}>We value your opinion! Rate our service.</p>

      {/* Star Rating System */}
      <div style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            style={star <= rating ? styles.starSelected : styles.star}
            onClick={() => handleRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <p style={styles.ratingText}>
        {rating === 5
          ? 'Excellent'
          : rating === 4
          ? 'Good'
          : rating === 3
          ? 'Average'
          : rating === 2
          ? 'Below Average'
          : rating === 1
          ? 'Poor'
          : ''}
      </p>

      {/* Multiple Choice Questions */}
      <form onSubmit={handleSubmit}>
        <div style={styles.question}>
          <p>Was the service delivered on time?</p>
          <label>
            <input
              type='radio'
              name='timely'
              value='Yes'
              onChange={() => handleOptionChange('timely', 'Yes')}
            />{' '}
            Yes
          </label>
          <label>
            <input
              type='radio'
              name='timely'
              value='No'
              onChange={() => handleOptionChange('timely', 'No')}
            />{' '}
            No
          </label>
        </div>

        <div style={styles.question}>
          <p>How was the service provider's behavior?</p>
          <label>
            <input
              type='radio'
              name='behavior'
              value='Very Polite'
              onChange={() => handleOptionChange('behavior', 'Very Polite')}
            />{' '}
            Very Polite
          </label>
          <label>
            <input
              type='radio'
              name='behavior'
              value='Polite'
              onChange={() => handleOptionChange('behavior', 'Polite')}
            />{' '}
            Polite
          </label>
          <label>
            <input
              type='radio'
              name='behavior'
              value='Neutral'
              onChange={() => handleOptionChange('behavior', 'Neutral')}
            />{' '}
            Neutral
          </label>
          <label>
            <input
              type='radio'
              name='behavior'
              value='Rude'
              onChange={() => handleOptionChange('behavior', 'Rude')}
            />{' '}
            Rude
          </label>
        </div>

        <textarea
          style={styles.textarea}
          placeholder='Tell us about your experience...'
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
        ></textarea>

        <button type='submit' style={styles.submitBtn}>
          Submit Feedback
        </button>
      </form>

      {/* Display Reviews */}
      <h3 style={styles.reviewHeader}>
        User Reviews (Avg Rating: {averageRating})
      </h3>
      <div style={styles.reviewContainer}>
        {reviews.map((review, index) => (
          <div key={index} style={styles.reviewCard}>
            <p style={styles.reviewText}>
              {review.rating} ★ - {review.feedback}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },
  header: { textAlign: 'center', color: '#333' },
  subtext: { textAlign: 'center', color: '#666' },
  starContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '10px'
  },
  star: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#ccc',
    margin: '0 5px'
  },
  starSelected: {
    fontSize: '24px',
    cursor: 'pointer',
    color: '#FFD700',
    margin: '0 5px'
  },
  ratingText: { textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' },
  question: { marginBottom: '15px' },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    resize: 'none'
  },
  submitBtn: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  submitBtnHover: { backgroundColor: '#218838' },
  reviewHeader: { textAlign: 'center', marginTop: '20px' },
  reviewContainer: { marginTop: '10px' },
  reviewCard: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  reviewText: { fontSize: '14px', color: '#333' }
}

export default FeedbackForm
