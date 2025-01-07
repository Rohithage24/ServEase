import React, { useState , useEffect} from "react";
import { useAuth } from "../context/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function ServiceProvidersManagement() {
    return (
      <div>
        <h2>Manage Service Providers</h2>
        <p>
          List of registered service providers with options to approve, edit, or
          delete accounts.
        </p>
        {/* Add service provider management functionality here */}
      </div>
    );
  }

  export default ServiceProvidersManagement;