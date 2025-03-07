import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";

function UserRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("https://servease-backend.onrender.com/request", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log(data);
        

        // Ensure each request has `showDetails: false`
        const formattedRequests = data.map((req) => ({
          ...req,
          showDetails: false,
        }));

        setRequests(formattedRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // ✅ Toggle Details
  const toggleDetails = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req._id === id ? { ...req, showDetails: !req.showDetails } : req
      )
    );
  };

  // ✅ Update Request Status in Database
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch("https://servease-backend.onrender.com/update-request-status", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update request");

      // Update UI after successful request
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );

      toast.success(`Request ${newStatus} ✅`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update request ❌");
    }
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
            <React.Fragment key={req._id}>
              <tr>
                <td>{req.name}</td>
                <td>{req.contact}</td>
                <td>{req.email}</td>
                <td>
                  <button className="btn btn-view" onClick={() => toggleDetails(req._id)}>
                    {req.showDetails ? "Hide Details" : "View Details"}
                  </button>

                  {/* ✅ Show Buttons Only If Status is "pending" */}
                  {req.status === "pending" && (
                    <>
                      <button
                        className="btn btn-accept"
                        onClick={() => updateStatus(req._id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-reject"
                        onClick={() => updateStatus(req._id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
              {req.showDetails && (
                <tr className="details-row">
                  <td colSpan="4" className="details-cell">
                    <strong>Service:</strong> {req.serves} <br />
                    <strong>Address:</strong> {req.address} <br />
                    <strong>Description:</strong> {req.description} <br />
                    <strong>Status:</strong> {req.status}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default UserRequests;
