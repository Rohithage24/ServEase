import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/auth';

function EmployeeList() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const { service } = useParams();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!auth.user) {
            navigate('/login');
        }
    }, [auth.user, navigate]);

    // Fetch employees data
    useEffect(() => {
        if (!auth.user) return; // Exit if user is not authenticated

        const fetchEmployees = async () => {
            try {
                const response = await fetch(`https://servease-backend.onrender.com/find/${service}`, {
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
    }, [service, auth.user]);

    if (loading) {
        return <div><div className="employee-card">
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        </div></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const HireEmp = (id) => {

        navigate(`/EmpHire/${id}`)


    }

    return (
        <div className="worker-container">
            {employees.map((employee) => (
                <div className="worker-card" key={employee._id}>
                    <h2 className="worker-name">{employee.Name}</h2>
                    <p className="worker-profession">{employee.Server}</p>
                    <div className="worker-rating">
                        ⭐ {employee.Rating} (Experience: {employee.Experience} years)
                    </div>
                    <div className="worker-contact">
                        <p>Phone: {employee.phone}</p>
                        <p>Email: {employee.Gmail}</p>
                    </div>
                    <button className="hire-btn" onClick={() => HireEmp(employee._id)}>Hire Now</button>
                </div>
            ))}
        </div>
    );
}

export default EmployeeList;