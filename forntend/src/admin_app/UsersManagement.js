import React, { useState , useEffect} from "react";
import { useAuth } from "../context/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function UsersManagement() {
    return (
      <div>
        <h2>Manage Users</h2>
        <p>List of registered users with options to edit or delete accounts.</p>
        {/* Add user management functionality here */}
      </div>
    );
  }

  export default UsersManagement;