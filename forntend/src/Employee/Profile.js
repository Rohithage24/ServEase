import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Request from "./Request";
import "bootstrap/dist/css/bootstrap.min.css";


function Profile() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    setEmployee(auth?.user || {});
  }, [auth]);

  return (
    <section className="bg-light py-5">
      <div className="container">
       

        <div className="row">
          {/* Profile Sidebar */}
          <div className="col-lg-4">
            <div className="card text-center mb-4">
              <div className="card-body">
                <img
                  src={`https://servease-backend.onrender.com/image/${employee.image}`}
                  alt="User Avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: "150px" }}
                />
                <h5 className="my-3">{employee.Name || "User Name"}</h5>
                <p className="text-muted mb-1">{employee.Server || "Profession"}</p>
                <p className="text-muted mb-4">{employee.pinCode || "Location"}</p>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary me-1">Follow</button>
                  <button className="btn btn-outline-primary">Message</button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="mb-3">Profile Details</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><strong>Age:</strong> {employee.Age || "N/A"}</li>
                  <li className="list-group-item"><strong>Rating:</strong> {employee.Rating || "N/A"} ★</li>
                  <li className="list-group-item"><strong>Experience:</strong> {employee.Experience || "N/A"} years</li>
                  <li className="list-group-item"><strong>Email:</strong> {employee.Gmail || "N/A"}</li>
                  <li className="list-group-item"><strong>Phone:</strong> {employee.phone || "N/A"}</li>
                </ul>
              </div>
            </div>

            {/* About Me */}
            <div className="card mb-4">
              <div className="card-body">
                <h3>About Me</h3>
                <p>{employee.bio || "No bio available."}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Request Section */}
        <div className="work-request-section mt-4">
          <Request />
        </div>
      </div>
    </section>
  );
}

export default Profile;
