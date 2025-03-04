import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css"; // Ensure you have a CSS file for styling

function UserRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:8080/request", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Get API response

        console.log("Fetched Data:", data); // Debugging: check if data is an array

        // ✅ Ensure each request has `showDetails: false`
        const formattedRequests = data.map((req) => ({
          ...req,
          id: req._id, // Use _id as id
          contact: req.contact || "N/A", // Ensure contact is set
          address: req.address || "Not Provided", // Ensure address is set
          description: req.description || "No Description Available", // Ensure description is set
          status: "pending", // Default status
          showDetails: false, // Add showDetails property
        }));

        setRequests(formattedRequests); // Update state
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests(); // Call function inside useEffect
  }, []);

  // Handle Accept action
  const handleAccept = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: "accepted" } : req
      )
    );
    toast.success("Request Accepted ✅");
  };

  // Handle Reject action
  const handleReject = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
    toast.error("Request Rejected ❌");
  };

  // ✅ Fix: Toggle Address & Description Visibility
  const toggleDetails = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id ? { ...req, showDetails: !req.showDetails } : req
      )
    );
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Manage User Requests</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>CONTACT</th>
            <th>EMAIL</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <React.Fragment key={req.id}>
              <tr>
                <td>{req.name}</td>
                <td>{req.contact}</td>
                <td>{req.email}</td>
                <td>
                  <button className="btn btn-view" onClick={() => toggleDetails(req.id)}>
                    {req.showDetails ? "Hide Details" : "View Details"}
                  </button>
                  <button
                    className="btn btn-accept"
                    onClick={() => handleAccept(req.id)}
                    disabled={req.status !== "pending"}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-reject"
                    onClick={() => handleReject(req.id)}
                    disabled={req.status !== "pending"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
              {req.showDetails && (
                <tr className="details-row">
                  <td colSpan="4" className="details-cell">
                    <strong>Service:</strong> {req.serves} <br />
                    <strong>Address:</strong> {req.address} <br />
                    <strong>Description:</strong> {req.description}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default UserRequests;
