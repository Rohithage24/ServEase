import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



export default function Register() {

    const [fName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [address, setAdd] = useState();
    const [aadhaarId, setID] = useState();
    const [password, setpassword] = useState();
    const [error, setError] = useState('');


      const navigate = useNavigate();
    






    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle the form submission, e.g., send data to an API


        try {
            const response = await fetch("https://servease-backend.onrender.com/user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fName, email, password, mobile, address, aadhaarId })
            });

            const data = await response.json();

            if (response.status === 400 && data.message === "Error creating user: Email already exists") {
                setError('This Gmail is already registered');
            } else if (response.ok) {
                setError('');
                navigate('/login');

                // Handle successful registration (e.g., redirect or show success message)
                console.log("User  registered successfully:");
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
           
        } catch (error) {
            setError('An error occurred while submitting the form. Please try again.');
            console.error("Error:", error);
        }




    };


    return (
        <>
            <div className="container">
                <h2>User Information Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"

                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Gmail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"

                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"

                            onChange={(e) => setpassword(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobile">Mobile No:</label>
                        <input
                            type="tel"
                            id="mobile"
                            name="mobile"

                            onChange={(e) => setMobile(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <textarea
                            id="address"
                            name="address"

                            onChange={(e) => setAdd(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="aadhaarId">Aadhaar ID:</label>
                        <input
                            type="text"
                            id="aadhaarId"
                            name="aadhaarId"

                            onChange={(e) => setID(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>

        </>
    )
}
