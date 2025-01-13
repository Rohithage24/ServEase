import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./emp.css";

function Request() {
  const [auth] = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      if (!auth.user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const id = auth.user._id;
      try {
        const response = await fetch(
          `https://servease-backend.onrender.com/request/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const allRequest = await response.json();
        const requests = allRequest.request || [];
        setData(requests);

        // Fetch user details for each request
        const userDetails = {};
        for (const req of requests) {
          const res = await fetch(
            `https://servease-backend.onrender.com/userReq/${req.userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.ok) {
            const userReq = await res.json();
            userDetails[req.userId] = userReq.user;
          }
        }
        setUserData(userDetails);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth.user]);

  const handleAccept = () => {
    toast.success("Request Accepted!");
    // Add logic to update the request status in the backend
  };

  const handleReject = () => {
    toast.error("Request Rejected!");
    // Add logic to update the request status in the backend
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <h3>Work Request</h3>
        <div className="work-request-details">
          {data.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mobile Number</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((request) => {
                  const user = userData[request.userId];
                  return user ? (
                    <tr key={user._id}>
                      <td>{user.fName}</td>
                      <td>{user.mobile}</td>
                      <td>{user.address}</td>
                      <td>
                        <div className="work-request-buttons">
                          <button
                            className="btn btn-success"
                            onClick={handleAccept}
                          >
                            Accept
                          </button>{" "}
                          <button
                            className="btn btn-danger"
                            onClick={handleReject}
                          >
                            Reject
                          </button>{" "}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={request.userId}>
                      <td colSpan="4">Loading user data...</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div>No requests found.</div>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Request;
