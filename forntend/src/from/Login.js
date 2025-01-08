import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import LoginForm from './LoginForm';
import LoginEmployee from './LoginEmployee';



const Login=()=>{
  const [tab, setTab] = useState("users");
   const [auth, setAuth] = useAuth();
  const renderTabContent = () => {
    switch (tab) {
      case "Loginusers":
        return <LoginForm />;
      case "LoginEmployee":
        return <LoginEmployee />;
     
      default:
        
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-tabs">
        <button
          className={tab === "Loginusers" ? "active" : ""}
          onClick={() => setTab("Loginusers")}
        >
          Login User
        </button>
        <button
          className={tab === "LoginEmployee" ? "active" : ""}
          onClick={() => setTab("LoginEmployee")}
        >
          Login for Professional
        </button>
       

      </div>
     
      <div className="admin-content">{renderTabContent()}</div>

    </div>
  );
    

}



export default Login;