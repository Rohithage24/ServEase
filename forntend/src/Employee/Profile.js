import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Profile() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [Employee, setEmployee] = useState({});

  useEffect(() => {
    setEmployee(auth?.user || {});
  }, [auth]);
  return (
    <>
      <div className="Employee-profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src="https://via.placeholder.com/150"
              alt={`${Employee.Name}'s profile`}
            />
          </div>
          <div className="profile-info">
            <h1 className="Employee-name">{Employee.Name}</h1>
            <h2 className="Employee-profession">{Employee.Server}</h2>
          </div>
        </div>

        <div className="container row">
          {/* Profile Details */}
          <div className="profile-details col-md-5">
            <h3>Profile Details</h3>
            <ul>
              <li>
                <strong>Age:</strong> {Employee.Age}
              </li>
              <li>
                <strong>Rating:</strong> {Employee.Rating} ★
              </li>
              <li>
                <strong>Experience:</strong> {Employee.Experience} years
              </li>
              <li>
                <strong>Location:</strong> {Employee.pinCode}
              </li>
              <li>
                <strong>Email:</strong> {Employee.Gmail}
              </li>
              <li>
                <strong>Phone:</strong> {Employee.phone}
              </li>
            </ul>
          </div>

          <div className="profile-details col-md-6">
            <div className="bio-section">
              <h3>About Me</h3>
              <p>{Employee.bio || "No bio available."}</p>
            </div>
          </div>
        </div>

        <div>
          {/* Work request */}
          <div className="work-request-section">
            <h3>Work Request</h3>
            <div className="work-request-details">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <strong>Name:</strong>
                    </th>
                    <th>
                      <strong>Mobile Number:</strong>
                    </th>
                    <th>
                      <strong>Address:</strong>
                    </th>
                    <th>
                      <strong>status</strong>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{Employee.Name}</td>

                    <td>{Employee.phone}</td>

                    <td>{Employee.pinCode}</td>
                    <td>
                      {" "}
                      <div className="work-request-buttons">
                        <button className="btn btn-success">Accept</button>{" "}
                        {/* onClick={() => handleAccept()} */}
                        <button className="btn btn-danger">Reject</button>{" "}
                        {/* onClick={() => handleReject()} */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
