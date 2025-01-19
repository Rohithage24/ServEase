import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './emp.css'
import Request from "./Request";


function Profile() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [Employee, setEmployee] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setEmployee(auth?.user || {});
  }, [auth]);

  
  return (
    <>
      <div className="container-md col-md-12">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-picture">
            <img
              src={`https://servease-backend.onrender.com/image/${Employee.image}`}
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
            <Request />
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;
