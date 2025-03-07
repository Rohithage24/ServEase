import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price } = location.state || {};

  return (
    <div style={styles.container}>
      <div style={styles.successBox}>
        <h2 style={styles.heading}>✅ Payment Successful!</h2>
        <p><strong>Name:</strong> {name || "N/A"}</p>
        <p><strong>Amount Paid:</strong> ₹{price}</p>
        <p>🎉 Thank you for your payment! Your transaction has been recorded.</p>
        <button onClick={() => navigate("/")} style={styles.button}>
          Go to Home
        </button>
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
  successBox: {
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
  }
};

export default PaymentSuccess;
