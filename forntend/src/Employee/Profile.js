import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './emp.css'
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

  useEffect(() => {
    const fetchData = async () => {
          const id = auth.user._id;
    //    console.log(id);
      try{
     const response = await fetch(`http://localhost:8080/request/${id}`,{
        method: 'GET',
        headers:{
            "Content-Type": "application/json",
        },

     });

     if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const allRequest = await response.json();
      const data = allRequest.request;
       console.log(data);
      setData(data);
      
    //   const data = allRequest.Users;
    }catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchData();
  }, [ ]);

     console.log(data.length);
     
//   for (let index = 0; index < 3; index++) {
//     const element = data[index];

//     const fetchData = async () => {
//         try {
//             const id = data; // Ensure `Employee` is defined
//             console.log(id);
    
//             // const response = await fetch(`http://localhost:8080/userReq/${id}`, {
//             //     method: 'GET',
//             //     headers: {
//             //         "Content-Type": "application/json",
//             //     },
//             // });
    
//             // if (!response.ok) {
//             //     throw new Error("Network response was not ok");
//             // }
    
//             // const allRequest = await response.json();
//             // const data = allRequest.request;
//             setData(data); // Ensure `setData` is defined
//         } catch (error) {
//             console.error("There was a problem with the fetch operation:", error);
//             setError(error.message); // Ensure `setError` is defined
//             setLoading(false); // Ensure `setLoading` is defined
//         }
//     };
    
//     // Call the fetchData function
//     fetchData();
    
//   }
    
     





//   request hendel 
const handleAccept = () => {
    toast.success("Request Accepted!");
    // Add logic to update the request status in the backend
  };
  
  const handleReject = () => {
    toast.error("Request Rejected!");
    // Add logic to update the request status in the backend
  };
  return (
    <>
      <div className="container-md col-md-12">
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
                      <strong>Name: {Employee._id}</strong>
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
                        <button className="btn btn-success" onClick={() => handleAccept()}>Accept</button>{" "}
                        
                        <button className="btn btn-danger" onClick={() => handleReject()} >Reject</button>{" "}
                       
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
