import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./hire.css";


const SuccessfullyHired = () => {
      const navigate = useNavigate();
    
  return (
    <div className="successfully-hired-container">
      <div className="success-content">
        <h1>🎉 Congratulations! 🎉</h1>
        <p>You have successfully hired the candidate!</p>
        <img
          src="https://cdn.pixabay.com/photo/2017/03/19/03/47/icon-2155441_1280.png" // Replace with your celebratory image
          alt="Success"
          className="success-image"
        />
        <button
          className="return-button"
          onClick={() => {
            // Redirect to the dashboard or another page
            navigate("/")
          }}
        >
          Return to Home page
        </button>
      </div>
    </div>
  );
};

export default SuccessfullyHired;