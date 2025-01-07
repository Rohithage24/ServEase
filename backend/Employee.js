const express= require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;



const EmployeeSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true }, // String is shorthand for {type: String}
  Age: { type: Number, required: true },
  Gmail: { type: String, required: true, unique: true },
  Password: String,
  Gender: String,
  phone: { type: Number, required: true, unique: true },
  Aadhar: { type: Number, required: true, unique: true },
  Server: String,
  Rating: String,
  Experience: Number,
  pinCode: Number,
  date: { type: Date, default: Date.now },
  
});

const modelEmployee = mongoose.model("Employee", EmployeeSchema);

exports.addEmployee = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const Employee = new modelEmployee(req.body);
    await Employee.save();
    res
      .status(201)
      .send({ message: "Employee created successfully", Employee: Employee });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send({ message: "Error creating user", error: err });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await modelEmployee.find({});
    // console.log("Employee", employees);

    // Send the response with the list of employees
    res.status(200).send({
      message: "Employees fetched successfully",
      employees: employees,
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).send({ message: "Error fetching employees", error: err });
  }
};

exports.FindEmployees = async (req, res) => {
  const server = req.params.service;

 
  const data = JSON.stringify(server);
  console.log(data);

  try {
    const employees = await modelEmployee.find({ Server: server }).exec();
    console.log("Employee", employees);

    res.status(200).send({
      message: "Employees fetched successfully",
      employees: employees,
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).send({ message: "Error fetching employees", error: err });
  }
};
exports.deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedEmployee = await modelEmployee.deleteOne({ _id: id }).exec();

    console.log("Deleted Employee:", deletedEmployee);

    res.status(200).send({
      message: "Employee deleted successfully",
      deletedEmployee: deletedEmployee,
    });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).send({ message: "Error deleting employee", error: err });
  }
};



exports.getEmployee = async (req, res) => {
  const { gmail, Password } = req.body; 
 
  

  try {
      // Query the database to find a user with the provided gmail and Password
      const user = await modelEmployee.findOne({ Gmail : gmail });
     
      if (user.Password == Password) {
          // If the user exists, send a success response
          res.status(200).json({ message: 'User  found', user });
          console.log(user);
          
      } else {
          // If the user does not exist, send a 404 response
          res.status(404).json({ message: 'User  not found' });
      }
  } catch (error) {
      // Handle any errors that occur during the database query
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.FindEmpl = async (req, res) => {
  const id = req.params.id;

  try {
    const employees = await modelEmployee.find({ _id : id }).exec();
    console.log("Employee", employees);

    res.status(200).send({
      message: "Employees fetched successfully",
      employees: employees,
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).send({ message: "Error fetching employees", error: err });
  }
};
