



import React, { useState } from "react";
import "./Admin.css";

function Admin() {
  const [tab, setTab] = useState("users");

  const renderTabContent = () => {
    switch (tab) {
      case "users":
        return <UsersManagement />;
      case "serviceProviders":
        return <ServiceProvidersManagement />;
      case "services":
        return <ServicesManagement />;
      default:
        return <UsersManagement />;
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-tabs">
        <button
          className={tab === "users" ? "active" : ""}
          onClick={() => setTab("users")}
        >
          Manage Users
        </button>
        <button
          className={tab === "serviceProviders" ? "active" : ""}
          onClick={() => setTab("serviceProviders")}
        >
          Manage Service Providers
        </button>
        <button
          className={tab === "services" ? "active" : ""}
          onClick={() => setTab("services")}
        >
          Manage Services
        </button>
      </div>
      <div className="admin-content">{renderTabContent()}</div>
    </div>
  );
}

// Users Management Component
function UsersManagement() {
  return (
    <div>
      <h2>Manage Users</h2>
      <p>List of registered users with options to edit or delete accounts.</p>
      {/* Add user management functionality here */}
    </div>
  );
}

// Service Providers Management Component
function ServiceProvidersManagement() {
  return (
    <div>
      <h2>Manage Service Providers</h2>
      <p>
        List of registered service providers with options to approve, edit, or
        delete accounts.
      </p>
      {/* Add service provider management functionality here */}
    </div>
  );
}

// Services Management Component
function ServicesManagement() {
  return (
    <div>
      <h2>Manage Services</h2>
      <p>
        Add, edit, or delete services offered by the company. Assign service
        providers to specific services.
      </p>
      {/* Add service management functionality here */}
    </div>
  );
}

export default Admin;





import React, { useState } from "react";

// import { useAuth } from '../context/auth';



const Se = ({ service }) => {

    // const [auth] = useAuth();

    const [to, setTo] = useState('');

    const [subject, setSubject] = useState(service);

    const [body, setBody] = useState('');

    const [message, setMessage] = useState('');

    const [name, setName] = useState('');

    const [connect, setContact] = useState('');



     const userData ="rohit" //auth.user;



    const handleSubmit = async (e) => {

        e.preventDefault();



        const emailData = { to, subject, body, name, connect };

        console.log(emailData);



        try {

            const response = await fetch('http://localhost:8080/send-email', {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify(emailData),

            });



            const result = await response.json();

            if (response.ok) {

                setMessage('Email sent successfully!');

            } else {

                setMessage(Failed to send email: ${result.message});

            }

        } catch (error) {

            setMessage(Error: ${error.message});

        }

    };



    return (

        <>

            <div style={styles.container}>

                <div style={styles.formBox}>

                    <h2 style={styles.heading}>Get a Quote</h2>

                    <p style={styles.subText}>We will get back to you in 24 hours</p>

                    <form onSubmit={handleSubmit}>

                        <div style={styles.inputRow}>

                            <input

                                type="text"

                                placeholder="First Name"

                                value={userData.fName}

                                onChange={(e) => setName(e.target.value)}

                                style={styles.input}

                                required

                            />

                            <input

                                type="text"

                                placeholder="Contact"

                                value={userData.mobile}

                                onChange={(e) => setContact(e.target.value)}

                                style={styles.input}

                                required

                            />

                        </div>

                        <div style={styles.inputRow}>

                            <input

                                type="email"

                                placeholder="Email"

                                value={userData.email}

                                onChange={(e) => setTo(e.target.value)}

                                style={styles.input}

                                required

                            />

                            <input

                                type="text"

                                placeholder="Phone Number"

                                style={styles.input}

                            />

                        </div>

                        <textarea

                            placeholder="Service Details"

                            value={body}

                            onChange={(e) => setBody(e.target.value)}

                            style={styles.textarea}

                            required

                        />

                        <button type="submit" style={styles.button}>Get Quote</button>

                    </form>

                    {message && <p style={styles.message}>{message}</p>}

                </div>

            </div>

        </>

    );

};



const styles = {

    container: {

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        height: '100vh',

        backgroundImage: 'url("https://source.unsplash.com/random/1600x900?fabric")',

        backgroundSize: 'cover',

        backgroundPosition: 'center',

    },

    formBox: {

        width: '400px',

        padding: '30px',

        backgroundColor: 'rgba(0, 0, 0, 0.8)',

        borderRadius: '10px',

        color: '#fff',

        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',

    },

    heading: {

        textAlign: 'center',

        fontSize: '22px',

        marginBottom: '5px',

    },

    subText: {

        textAlign: 'center',

        fontSize: '14px',

        color: '#bbb',

        marginBottom: '20px',

    },

    inputRow: {

        display: 'flex',

        gap: '10px',

        marginBottom: '10px',

    },

    input: {

        flex: 1,

        padding: '10px',

        borderRadius: '5px',

        border: '1px solid #444',

        backgroundColor: '#222',

        color: '#fff',

        fontSize: '14px',

        outline: 'none',

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

        marginBottom: '15px',

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

        transition: '0.3s ease',

    },

    buttonHover: {

        backgroundColor: '#0056b3',

    },

    message: {

        marginTop: '10px',

        textAlign: 'center',

        color: '#28a745',

    },

};



export default Se;












import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useParams, useNavigate } from "react-router-dom";

const RequestForm = ({ service }) => {
  const [auth, setAuth] = useAuth();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState(service);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  // Predefined service costs
  const serviceRates = {
    Plumbing: 1000,
    Electrical: 1200,
    Cleaning: 800,
    "Home Repair": 1500,
  };

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
    setPrice(serviceRates[service] || 0);
  }, [auth.user, navigate, service]);

  const handlePayment = async () => {
    alert("Redirecting to payment gateway...");

    // Simulate Payment Process
    setTimeout(async () => {
      alert("Payment successful! Invoice will be sent to your email.");

      // Simulate sending invoice email
      const invoiceData = {
        email: auth.user.email,
        service,
        price,
        details: `You have successfully booked ${service} for ₹${price}.`,
      };

      try {
        await fetch("http://localhost:8080/send-invoice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(invoiceData),
        });

        setMessage("Booking confirmed! Invoice sent to your email.");
      } catch (error) {
        setMessage( ${error.message});
      }
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2 style={styles.heading}>Book Your Service</h2>
        <p style={styles.subText}>We will get back to you in 24 hours</p>

        <form>
          <div style={styles.inputRow}>
            <input
              type="text"
              placeholder="First Name"
              value={auth.user?.fName || ""}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="tel"
              placeholder="Contact Number"
              value={auth.user?.mobile || ""}
              onChange={(e) => setContact(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={auth.user?.email || ""}
            onChange={(e) => setTo(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            style={styles.input}
            required
          />

          <textarea
            placeholder="Describe your requirement"
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

          <button type="button" onClick={handlePayment} style={styles.button}>
            Proceed to Payment
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: 'url("https://source.unsplash.com/random/1600x900?light")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  formBox: {
    width: "420px",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },

  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },

  subText: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "15px",
  },

  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s ease",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
    height: "80px",
    outline: "none",
    resize: "none",
    marginBottom: "15px",
  },

  priceTag: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
  },

  note: {
    fontSize: "12px",
    color: "#555",
    marginBottom: "15px",
    fontStyle: "italic",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s ease",
  },

  buttonHover: {
    backgroundColor: "#218838",
  },

  message: {
    marginTop: "10px",
    textAlign: "center",
    color: "#28a745",
  },
};

export default RequestForm;