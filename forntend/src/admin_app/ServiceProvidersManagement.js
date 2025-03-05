import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServiceProvidersManagement() {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [fixedRate, setFixedRate] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = {
      serviceName,
      serviceDescription,
      fixedRate,
      serviceCategory,
    };

    console.log("New Service Added:", newService);
    toast.success("Service added successfully!");

    // Reset Form Fields
    setServiceName("");
    setServiceDescription("");
    setFixedRate("");
    setServiceCategory("");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(to right, #f8f9fa, #e9ecef)",
    },
    formBox: {
      background: "#ffffff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "400px",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#343a40",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ced4da",
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      transition: "0.3s ease",
    },
    select: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ced4da",
      fontSize: "1rem",
      outline: "none",
      cursor: "pointer",
      marginBottom: "15px",
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      cursor: "pointer",
      background: "linear-gradient(to right, #007bff, #0056b3)",
      color: "white",
      fontWeight: "bold",
      transition: "0.3s ease",
    },
    buttonHover: {
      background: "linear-gradient(to right, #0056b3, #007bff)",
    },
  };

  return (
    <>
      <div style={styles.container}>
        <div style={styles.formBox}>
          <h2 style={styles.title}>Add New Service</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              style={styles.input}
              required
            />
            <textarea
              placeholder="Service Description"
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              style={styles.input}
              rows="3"
              required
            ></textarea>
            <input
              type="number"
              placeholder="Fixed Rate (₹)"
              value={fixedRate}
              onChange={(e) => setFixedRate(e.target.value)}
              style={styles.input}
              required
            />
            <select
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              style={styles.select}
              required
            >
              <option value="">Select Service Category</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Home Repair">Home Repair</option>
            </select>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
              onMouseOut={(e) => (e.target.style.background = styles.button.background)}
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default ServiceProvidersManagement;
