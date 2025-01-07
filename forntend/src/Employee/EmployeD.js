import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./emp.css"

const EmployeD = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [Employee, setEmployee] = useState({});

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  useEffect(() => {
    setEmployee(auth?.user || {});
  }, [auth]);

  console.log(Employee);

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

        {/* Profile Details */}
        <div className="profile-details">
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

        {/* Bio Section */}
        <div className="bio-section">
          <h3>About Me</h3>
          <p>{Employee.bio || "No bio available."}</p>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="edit-btn">Edit Profile</button>
          <button className="view-ratings-btn">View Ratings</button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </>
  );
};

export default EmployeD;