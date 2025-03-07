import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const RequestFrom = ({ service, price }) => {
  const [auth] = useAuth();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(service);
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [connect, setContact] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  const userData = auth.user || {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      subject,
      body,
      price,
      service,
      userData,
    };

    console.log("Navigating to Payment Page with Data:", requestData);

    // Pass data to Payment page using navigate state
    navigate("/payment", { state: requestData });
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.formBox}>
          <h2 style={styles.heading}>Book Your Service</h2>
          <p style={styles.subText}>We will get back to you in 24 hours</p>

          <form onSubmit={handleSubmit}>
            <div style={styles.inputRow}>
              <input
                type="text"
                placeholder=" Name"
                value={userData?.fName || ""}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="text"
                placeholder="Contact"
                value={userData.mobile || ""}
                onChange={(e) => setContact(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputRow}>
              <input
                type="email"
                placeholder="Email"
                value={userData.email || ""}
                onChange={(e) => setTo(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={styles.inputRow}>
              <input
                type="service"
                placeholder="service"
                value={service || ""}
                onChange={(e) => setTo(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <textarea
              placeholder="Service Details"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={styles.textarea}
              required
            />

            <div style={styles.priceTag}>
              <strong>Service Cost: ₹{price}</strong>
            </div>

            <p style={styles.note}>
              ⚠ Note: If your service request is rejected, your booking amount
              will be refunded 100% within 24 hours.
            </p>

            <button type="submit" style={styles.button}>
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage:
      'url("https://source.unsplash.com/random/1600x900?fabric")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formBox: {
    width: "400px",
    padding: "30px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: "10px",
    color: "#fff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  },
  heading: {
    textAlign: "center",
    fontSize: "22px",
    marginBottom: "5px",
  },
  subText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#bbb",
    marginBottom: "20px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
    fontSize: "14px",
    height: "80px",
    outline: "none",
    resize: "none",
    marginBottom: "15px",
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
    transition: "0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  message: {
    marginTop: "10px",
    textAlign: "center",
    color: "#28a745",
  },
};

export default RequestFrom;
