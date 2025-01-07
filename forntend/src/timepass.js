



import React, { useState } from "react";
import "./Admin.css";

function Admin() {
  const [tab, setTab] = useState("users");

  const renderTabContent = () => {
    switch (tab) {
      case "users":
        return <UsersManagement />;
      case "serviceProviders":
        return <ServiceProvidersManagement />;
      case "services":
        return <ServicesManagement />;
      default:
        return <UsersManagement />;
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="admin-tabs">
        <button
          className={tab === "users" ? "active" : ""}
          onClick={() => setTab("users")}
        >
          Manage Users
        </button>
        <button
          className={tab === "serviceProviders" ? "active" : ""}
          onClick={() => setTab("serviceProviders")}
        >
          Manage Service Providers
        </button>
        <button
          className={tab === "services" ? "active" : ""}
          onClick={() => setTab("services")}
        >
          Manage Services
        </button>
      </div>
      <div className="admin-content">{renderTabContent()}</div>
    </div>
  );
}

// Users Management Component
function UsersManagement() {
  return (
    <div>
      <h2>Manage Users</h2>
      <p>List of registered users with options to edit or delete accounts.</p>
      {/* Add user management functionality here */}
    </div>
  );
}

// Service Providers Management Component
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

// Services Management Component
function ServicesManagement() {
  return (
    <div>
      <h2>Manage Services</h2>
      <p>
        Add, edit, or delete services offered by the company. Assign service
        providers to specific services.
      </p>
      {/* Add service management functionality here */}
    </div>
  );
}

export default Admin;