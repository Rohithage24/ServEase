import React, { useState , useEffect} from "react";
import { useAuth } from "../context/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./LoginForm.css";
const LoginForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      age: "",
      gender: "",
      workExperience: "",
      mobileNumber: "",
      aadharNumber: "",
      address: "",
      pinCode: "",
      email: "",
      password: "",
      serviceType: "",
    });

   

    const [error, setError] = useState("");

    const householdServices = [
      "Plumbing",
      "Electrician",
      "Carpentry",
      "House Cleaning",
      "Pest Control",
      "Painting",
      "Appliance Repair",
      "Gardening",
      "AC Service",
      "Home Security Installation",
      "Furniture Assembly",
    ];

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Check if any required field is missing
      const {
        name,
        age,
        gender,
        workExperience,
        mobileNumber,
        aadharNumber,
        address,
        pinCode,
        email,
        password,
        serviceType,
      } = formData;

      if (
        !name ||
        !age ||
        !gender ||
        !workExperience ||
        !mobileNumber ||
        !aadharNumber ||
        !address ||
        !pinCode ||
        !email ||
        !password ||
        !serviceType
      ) {
        setError("Please fill out all fields.");
        return;
      }

      if (isNaN(age) || isNaN(workExperience) || isNaN(mobileNumber) || isNaN(aadharNumber) || isNaN(pinCode)) {
        setError("Age, work experience, mobile number, Aadhaar number, and pin code must be valid numbers.");
        return;
      }

      // Add API call or further processing here
      

      try {
        // Send data to the backend
        const response = await fetch("http://localhost:8080/Employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name: name,
            Age: age,
            Gmail: email,
            Password: password,
            Gender: gender,
            phone: mobileNumber,
            Aadhar: aadharNumber,
            Server: serviceType,
            Experience: workExperience,
            pinCode: pinCode,
          }),
        });

        // Handle the response
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }else{
          toast("Form submitted successfully!");
          
         setError("");

        }

        const data = await response.json();
      
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred while submitting the form. Please try again.");
      }


    };

    return (
      <div className="login-container">
        <h2>Service Provider Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label>Gender:</label>
            <div className="gender-options">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

          {/* Work Experience */}
          <div className="form-group">
            <label htmlFor="workExperience">Work Experience (Years):</label>
            <input
              type="number"
              id="workExperience"
              name="workExperience"
              value={formData.workExperience}
              onChange={handleChange}
              placeholder="Enter your years of experience"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Aadhaar Card Number */}
          <div className="form-group">
            <label htmlFor="aadharNumber">Aadhaar Card Number:</label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              placeholder="Enter your Aadhaar card number"
              required
            />
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            ></textarea>
          </div>

          {/* Pin Code */}
          <div className="form-group">
            <label htmlFor="pinCode">Pin Code:</label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Enter your pin code"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Service Type */}
          <div className="form-group">
            <label htmlFor="serviceType">Select Your Service:</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Service --</option>
              {householdServices.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Register
          </button>
          <ToastContainer />
        </form>
      </div>
    );
  };


  export default LoginForm;