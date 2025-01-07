import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import About from "./component_web/About";
import Clint from "./component_web/Clint";
import Contact from "./component_web/Contact";
import Contant from "./component_web/Contant";
import Footer from "./component_web/Footer";
import Information from "./component_web/Information";
import Navber from "./component_web/Navber";
import Price from "./component_web/Price";
import Serves from "./component_web/Serves";
import Home from "./component_web/Home";
import Login from "./from/Login";
import Register from "./from/Register";
import Admin from "./admin_app/Admin";
import "./style.css";
import EmployeeList from "./component_web/EmployeeList";
import EmployeD from "./Employee/EmployeD";
import Emphire from "./Hireprocess/Emphire";

// css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const AppWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.toLowerCase().startsWith("/admin");

  return (
    <>
      {/* Conditional Navber Rendering */}
      {isAdminRoute ? <Admin /> : <Navber />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/clint" element={<Clint />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contant" element={<Contant />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/information" element={<Information />} />
        <Route path="/price" element={<Price />} />
        <Route path="/serves" element={<Serves />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/EmployeeList/:service" element={<EmployeeList />} />
        <Route path="/Employee" element={<EmployeD />} />
        <Route path="/EmpHire/:id" element={<Emphire />} />




        

        {/* Admin Routes */}
        {/* <Route path="/admin" element={<Admin />} /> */}
        {/* <PrivateRoute></PrivateRoute> */}
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
