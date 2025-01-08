import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const ServicesManagement = () => {
  const [employees, setEmployees] = useState([]); // State to store fetched employees
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://servease-backend.onrender.com/EmploGet", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const employ = await response.json();
        const data = employ.employees;



        // Ensure data is an array
        if (!Array.isArray(data)) {
          throw new Error("Expected an array of employees, but received something else.");
        }

        setEmployees(data); // Store fetched data in state
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setError(error.message); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchEmployees(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Render loading state
  if (loading) {
    <div className="employee-card">
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    </div>
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }


  //Delete employee
  const DeleteHandel = async (id) => {
    try {
      const response = await fetch(`https://servease-backend.onrender.com/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      toast("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast("Failed to delete employee. Please try again.");
    }
  };

  // Render the component
  return (
    <div>
      <h2>Manage Employees</h2>
      <p>View and manage employee details.</p>
      {/* Render fetched employees in a table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Aadhar</th>
            <th>Server</th>
            <th>Rating</th>
            <th>Experience</th>
            <th>Pin Code</th>
            <th>Date</th>
            <th>delete</th>

          </tr>
        </thead>
        <tbody>
          {Array.isArray(employees) && employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.Name}</td>
              <td>{employee.Age}</td>
              <td>{employee.Gmail}</td>
              <td>{employee.phone}</td>
              <td>{employee.Aadhar}</td>
              <td>{employee.Server}</td>
              <td>{employee.Rating}</td>
              <td>{employee.Experience}</td>
              <td>{employee.pinCode}</td>
              <td>{new Date(employee.date).toLocaleDateString()}</td>
              <td><i class="bi bi-trash3-fill" onClick={() => DeleteHandel(employee._id)} ></i>
                <ToastContainer />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicesManagement;