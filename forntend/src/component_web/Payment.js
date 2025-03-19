import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const requestData = location.state || {};
  const [message, setMessage] = useState("");
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Replace with your actual UPI ID
  const UPI_ID = "8788640727@ptsbi";
  const AMOUNT =  requestData.price || "0";
  const TRANSACTION_ID = `TXN${Date.now()}`;
  const ORDER_ID = `ORD${Date.now()}`;
  const NOTE = "Service Payment via QR Code";

  // Generate UPI QR Code URL
  const qrCodeURL = `upi://pay?pa=${UPI_ID}&pn=Merchant&tid=${TRANSACTION_ID}&tr=${ORDER_ID}&tn=${NOTE}&am=${AMOUNT}&cu=INR`;

  const handleConfirmPayment = async () => {
    if (!paymentConfirmed) {
      setMessage("⚠ Please complete the payment before confirming.");
      return;
    }
       
       console.log(requestData);
       

    const data = {
        requestData,
        ORDER_ID,
        payment: "Successfully Completed"
      };
  
      
        
    // Payment data to send to backend
    const paymentData = {
      user: requestData.userData.fName,
      email: requestData.userData.email,
      amount: AMOUNT,
      transactionId: TRANSACTION_ID,
      orderId: ORDER_ID,
      status: "Success",
      paymentMethod: "GPay QR Code"
    };

    try {
        const request = await fetch(`${process.env.REACT_APP_API_BASE_URL}sendRequest`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
  


      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}save-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      if (response.ok && request.ok) {
        navigate("/paysuce", { state: { name: requestData.userData.fName, price: AMOUNT } });
      } else {
        setMessage(`❌ Payment Failed: ${result.message}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.paymentBox}>
        <h2 style={styles.heading}>QR Code Payment</h2>

        <div style={styles.detailBox}>
          <p><strong>Name:</strong> {requestData.userData.fName || "N/A"}</p>
          <p><strong>Email:</strong> {requestData.userData.email || "N/A"}</p>
          <p><strong>Service:</strong> {requestData.subject || "N/A"}</p>
          <p><strong>Amount:</strong> ₹{AMOUNT}</p>
        </div>

        {/* Display QR Code */}
        <h3 style={styles.subHeading}>Scan QR Code with GPay</h3>
        <QRCodeSVG value={qrCodeURL} size={200} />

        <button onClick={() => setPaymentConfirmed(true)} style={styles.confirmButton}>
          ✅ I have paid
        </button>

        <button onClick={handleConfirmPayment} style={styles.button}>
          📩 Confirm Payment
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4"
  },
  paymentBox: {
    padding: "25px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center"
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px"
  },
  confirmButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px"
  },
  message: {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "green"
  }
};

export default Payment;
