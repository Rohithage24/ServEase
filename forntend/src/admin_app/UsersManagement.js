import React, { useState , useEffect} from "react";
import { useAuth } from "../context/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function UsersManagement() {
    const [User, setUser] = useState([]); // State to store fetched User
       const [loading, setLoading] = useState(true); // State to track loading status
       const [error, setError] = useState(null); // State to handle errors
     
       // Fetch data on component mount
       useEffect(() => {
         const fetchUser = async () => {
           try {
             const response = await fetch("https://servease-backend.onrender.com/userall", {
               method: "GET",
               headers: {
                 "Content-Type": "application/json",
               },
             });
     
             if (!response.ok) {
               throw new Error("Network response was not ok");
             }
     
             const userall = await response.json();
             const data = userall.Users;
             
             
            
              
     
             // Ensure data is an array
             if (!Array.isArray(data)) {
               throw new Error("Expected an array of User, but received something else.");
             }
     
             setUser(data); // Store fetched data in state
             setLoading(false); // Set loading to false
           } catch (error) {
             console.error("There was a problem with the fetch operation:", error);
             setError(error.message); // Set error message
             setLoading(false); // Set loading to false
           }
         };
     
         fetchUser(); // Call the fetch function
       }, []); // Empty dependency array ensures this runs only once on mount
     
       // Render loading state
       if (loading) {
         return <div>Loading...</div>;
       }
     
       // Render error state
       if (error) {
         return <div>Error: {error}</div>;
       }
     
     
       //Delete user
     const DeleteHandel = async(id)=>{
      console.log(id);
      
       try {
         const response = await fetch(`https://servease-backend.onrender.com${id}`, {
           method: "DELETE",
         });
          console.log(response);
          
         if (!response.ok) {
           throw new Error("Failed to delete user");
         }
     
         toast("user deleted successfully!");
       } catch (error) {
         console.error("Error deleting user:", error);
         toast("Failed to delete user. Please try again.");
       }
     };
        
        
       // Render the component
       return (
         <div>
           <h2>Manage User</h2>
           <p>View and manage user details.</p>
           {/* Render fetched User in a table */}
           <table>
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Age</th>
                 <th>Email</th>
                 <th>Phone</th>
                 <th>Aadhar</th>
                 <th>Address</th>
                 <th>delete</th>
     
               </tr>
             </thead>
             <tbody>
               {Array.isArray(User) && User.map((user, index) => (
                 <tr key={index}>
                   <td>{user.fName}</td>
                   <td>{user.Age}</td>
                   <td>{user.email}</td>
                   <td>{user.mobile}</td>
                   <td>{user.aadhaarId}</td>
                   <td>{user.address}</td>
                   <td><i class="bi bi-trash3-fill" onClick={()=>DeleteHandel(user._id)} ></i>
                   <ToastContainer />
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       );
  }

  export default UsersManagement;