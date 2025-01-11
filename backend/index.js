const express = require("express");
const bodyParser = require('body-parser');

const userjs = require("./user");
const Employee = require("./Employee")
const WorkRe = require("./WorkREq")

const cors = require("cors");

const server = express();
server.use(cors());

server.use(express.json());
server.use(bodyParser.json());

// mongoosh conncet
const mongoose = require("mongoose");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://rohitgajananhage:UrpBzWi8GNqGgveY@servease.ackiv.mongodb.net/ServEase_db?retryWrites=true&w=majority"
  );
  console.log("Connect mongodb");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// user all operations
server.post("/login/", userjs.getuser);
server.post("/user", userjs.adduser);
server.get("/userall", userjs.getAllUsers);
server.delete("/deleteuser/:id", userjs.deleteuser);




// Employee all operations
server.get("/EmploGet", Employee.getAllEmployees);
server.get('/find/:service', Employee.FindEmployees);
server.post('/EmployoLogin',Employee.getEmployee)

server.post("/Employee", Employee.addEmployee);
server.get('/emp/:id',Employee.FindEmpl)
server.delete('/delete/:id',Employee.deleteEmployee)

// Requset Model
server.post("/workre",WorkRe.addREquest)


server.listen(8080, () => {
  console.log("Server is start ");
});
