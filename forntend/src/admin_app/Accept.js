import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function Accept () {
  const { id } = useParams()
  const navigate = useNavigate() // Initialize navigate

  const [request, setRequest] = useState(null)
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [employees, setEmployees] = useState([]) // State to store employee data
  const [selectedEmployees, setSelectedEmployees] = useState([]) // State to store selected employees

  useEffect(() => {
    const fetchRequestById = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}getRequest/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })

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
          console.log(paymentData)
          setPayment(paymentData.data)
        }

        if (requestData.pinCode) {
          const pinCode = requestData.pinCode
          const Server = requestData.serves
          const profes = await fetch(`${process.env.REACT_APP_API_BASE_URL}addemp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Server, pinCode })
          })

          if (!profes.ok) throw new Error('Failed to fetch payment')

          const profesData = await profes.json()
          console.log(profesData)
          setEmployees(profesData.employees) // Set employee data
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRequestById()
  }, [id])

  // Handle employee selection
  const handleEmployeeSelection = employee => {
    const isSelected = selectedEmployees.some(emp => emp._id === employee._id)
    if (isSelected) {
      setSelectedEmployees(
        selectedEmployees.filter(emp => emp._id !== employee._id)
      )
    } else {
      setSelectedEmployees([...selectedEmployees, employee])
    }
  }

  const handleSubmit = async () => {
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee.')
      return
    }

    console.log('Selected Employees for Submission:', selectedEmployees)

    // Generate a random date within the next 3 days
    const today = new Date()
    const randomDaysAhead = Math.floor(Math.random() * 3) + 3 // Picks a random number between 3 and 5
    const visitDate = new Date(today)
    visitDate.setDate(today.getDate() + randomDaysAhead)

    // Format the date as "DD-MM-YYYY"
    const formattedVisitDate = visitDate.toLocaleDateString('en-GB')

    // Construct the email message
    let employeeDetails = selectedEmployees
      .map(
        (emp, index) =>
          `${index + 1}. ${emp.Name} (${emp.Server}) - ${emp.phone}`
      )
      .join('\n')

    const emailData = {
      to: request.email, // Send email to the user
      subject: 'Your Service Booking Confirmation',
      message: `Dear ${request.name},\n\nYour service has been successfully booked. Our professionals will visit your location on **${formattedVisitDate}**.\n\nHere are the details of the assigned professionals:\n\n${employeeDetails}\n\nThank you for choosing our service!\n\nBest Regards,\nYour Company Name`
    }

    try {
      const response = await fetch(`http://localhost:8080/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData)
      })

      const data = await response.json()
      alert(data.message) // Show success or failure message
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send email')
    }

    selectedEmployees.forEach(async employee => {
      const professionalEmailData = {
        to: employee.Gmail, // Professional's email
        subject: 'Service Assignment Notification',
        message: `Dear ${employee.Name},\n\nYou have been assigned to a service request. Please visit the following location on **${formattedVisitDate}**.\n\nUser Details:\n- **Name:** ${request.name}\n- **Address:** ${request.address}\n- **Service:** ${employee.Server}\n\nPlease ensure timely arrival.\n\nBest Regards,\nYour Company Name`
      }

      await fetch(`http://localhost:8080/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(professionalEmailData)
      })
    })

    const updateResponse = await fetch(
      `http://localhost:8080/update-request-status`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: id, status: 'accepted',selectedEmployees: selectedEmployees.map(emp => emp._id)  })
      }
    )

    const updateData = await updateResponse.json()
    console.log('Request Status Updated:', updateData)

    if (updateResponse.ok) {
      alert('Request status updated to Work in Progress!')
    } else {
      alert('Failed to update request status.')
    }

    // navigate('/admin')

    // try {
    //     const response = await fetch("${process.env.REACT_APP_API_BASE_URL}send-pro", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(),
    //     });

    //     const data = await response.json();
    //     alert(data.message); // Show success or failure message
    //   } catch (error) {
    //     console.error("Error:", error);
    //     alert("Failed to send email");
    //   }
  }

  if (loading) return <p style={styles.loading}>Loading...</p>
  if (error) return <p style={styles.error}>Error: {error}</p>

  return (
    <div style={styles.container}>
      {/* Left Side - Request Details */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Request Details</h2>
        <div style={styles.infoBox}>
          <p>
          <strong>Name:</strong> {request.name.charAt(0).toUpperCase() + request.name.slice(1)}
          </p>
          <p>
            <strong>Email:</strong> {request.email}
          </p>
          <p>
            <strong>Address:</strong> {request.address}
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={styles.button}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          {showDetails && (
            <div style={styles.detailsBox}>
              <p>
                <strong>Description:</strong> {request.description}
              </p>
              <p>
                <strong>Service:</strong> {request.serves}
              </p>
              <p>
                <strong>Status:</strong> {request.status}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Payment Details */}
      {payment && (
        <div style={styles.card}>
          <h2 style={styles.heading}>Payment Details</h2>
          <div style={styles.paymentBox}>
            <p>
              <strong>Order ID:</strong> {payment.orderId}
            </p>
            <p>
              <strong>Amount:</strong> ₹{payment.amount}
            </p>
            <p>
              <strong>Transaction ID:</strong> {payment.transactionId}
            </p>
            <p>
              <strong>Payment Method:</strong> {payment.paymentMethod}
            </p>
            <p>
              <strong>Status:</strong> {payment.status}
            </p>
            <p>
              <strong>Date:</strong>{' '}
              {new Date(payment.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Employee Table Section */}
      <div style={styles.employeeTableContainer}>
        <h2 style={styles.heading}>Available Employees</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Select</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Mobile Number</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee._id} style={styles.tr}>
                <td style={styles.td}>
                  <input
                    type='checkbox'
                    checked={selectedEmployees.some(
                      emp => emp._id === employee._id
                    )}
                    onChange={() => handleEmployeeSelection(employee)}
                    style={styles.checkbox}
                  />
                </td>
                <td style={styles.td}>{employee?.Name}</td>
                <td style={styles.td}>{employee?.Server}</td>
                <td style={styles.td}>{employee?.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Submit Button */}
        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit Selected Employees
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping for smaller screens
    padding: '20px',
    width: '100%',
    margin: 'auto',
    justifyContent: 'space-around',
    alignItems: 'start'
  },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '20px',
    width: '45%',
    height: '350px',
    marginBottom: '20px' // Add margin for spacing
  },
  heading: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  infoBox: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '8px'
  },
  detailsBox: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '10px'
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px'
  },
  paymentBox: {
    backgroundColor: '#E7F9E9',
    padding: '15px',
    borderRadius: '8px'
  },
  loading: {
    textAlign: 'center',
    color: '#555'
  },
  error: {
    textAlign: 'center',
    color: 'red'
  },
  employeeTableContainer: {
    width: '100%',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px',
    textAlign: 'left'
  },
  tr: {
    borderBottom: '1px solid #ddd'
  },
  td: {
    padding: '10px'
  },
  checkbox: {
    cursor: 'pointer'
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '16px'
  }
}

export default Accept
