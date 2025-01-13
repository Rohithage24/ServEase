import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EditEmp from "./EditEmp";
import Profile from "./Profile";
import WorkPlace from "./WorkPlace";
import "./Navbar.css";

const EmployeD = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [Employee, setEmployee] = useState({});

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    if (!auth.user) {
      navigate("/login");
    }
  }, [auth.user, navigate]);

  useEffect(() => {
    setEmployee(auth?.user || {});
  }, [auth]);

  const [tab, setTab] = useState("Profile");

  const renderTabContent = () => {
    switch (tab) {
      case "Profile":
        return <Profile />;
        break;
      case "EditEmp":
        return <EditEmp />;
        break;
      case "workplace":
        return <WorkPlace />;
        break;
      default:
        break;
    }
  };

  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
    const button = document.querySelector('.toggle-button');
    button.classList.toggle('rotated');
  };

  return (
    <div className="row">
      <div className="App-nav ">
        {/* Side Navbar */}
        <div className={`side-navbar ${isNavVisible ? "visible" : ""}`}>
          <ul>
            <li>
              {" "}
              <button
                className=" btn btn-primary"
                onClick={() => setTab("Profile")}
              >
                View Ratings
              </button>
            </li>
            <li>
              {" "}
              <button
                className=" btn btn-primary"
                onClick={() => setTab("EditEmp")}
              >
                Edit Profile
              </button>
            </li>
            <li>
              {" "}
              <button
                className=" btn btn-primary"
                onClick={() => setTab("workplace")}
              >
                Work Place
              </button>
            </li>
          </ul>
          {/* Logout Button at the Bottom */}
          <div className="logout-button-container">
            <button
              className="logout-btn btn btn-danger"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Toggle Button */}
        <button className="toggle-button" onClick={toggleNav}>
        <i class="bi bi-caret-left-square"></i>
        </button>
      </div>
      <div className="  ">
        <div className="">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default EmployeD;
