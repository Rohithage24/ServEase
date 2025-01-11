import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./emp.css"
import EditEmp from "./EditEmp";
import Profile from "./Profile";
import WorkPlace from "./WorkPlace";

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

  
  const [tab , setTab] = useState("Profile")

  const renderTabContent =()=>{
   switch (tab) {
    case "Profile":
        return <Profile />
      break;
      case "EditEmp":
         return <EditEmp />
      break;
      case "workplace":
         return <WorkPlace />
      break
    default:

      break;
   }
  }

  return (
    <>

    
      <div className="container ">
        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className=" btn btn-primary"
           onClick={() => setTab("Profile")}
          >View Ratings
          </button>

          <button 
          className=" btn btn-primary"
          onClick={() => setTab("EditEmp")}>Edit Profile
          </button>
          <button 
          className=" btn btn-primary"
          onClick={() => setTab("workplace")}>Work Place
          </button>

          <button className="logout-btn btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      <div className="admin-content">{renderTabContent()}</div>
         
       
      </div>
    </>
  );
};




export default EmployeD;