import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../context/auth';
import Navber from "./Navber";
import RequestFrom from "./RequestFrom";


function EmployeeList() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { service, price } = useParams();


    // Redirect to login if user is not authenticated
    useEffect(() => {
        if (!auth.user) {
            navigate('/login');
        }
    }, [auth.user, navigate]);

    

    return (
        <>
        <div>
        <Navber />

        <RequestFrom service={service} price={price} />



        
        </div>
        
       
        </>
    );
}

export default EmployeeList;
