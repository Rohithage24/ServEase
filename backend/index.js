const express = require("express");
const bodyParser = require('body-parser');

const userjs = require("./user");
const Employee = require("./Employee")
const WorkRe = require("./WorkREq")
const FeedBack = require("./Feedback")
const Payment = require("./payment");

const cors = require("cors");

const server = express();
server.use(cors());

server.use(express.json());
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));

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
server.get("/image/:filename",Employee.getImage)
server.get('/emp/:id',Employee.FindEmpl)
server.delete('/delete/:id',Employee.deleteEmployee)

// Requset Model
server.post('/send-email', WorkRe.addREquest);
server.get("/request" , WorkRe.getAllRequests)
server.put("/update-request-status", WorkRe.updateRequestStatus);

// Feed back
// server.post('/feedba', FeedBack.addREquest);

// Payment
server.post("/save-payment",Payment.payment );
server.get("/payments", Payment.getpay);




// // Email transporter

// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'rohithage2244@gmail.com', // Replace with your email
//       pass: 'imvl nowj dmrp jrom', // Replace with your email password or app-specific password
//   },
// });

// // Route to handle email sending
// server.post('/send-email', async (req, res) => {
//   const { to, subject, body, userData } = req.body;
//   console.log(req.body);

  

//   const mailOptions = {
//       from: 'Rohitgajananhage@gmail.com', // Sender address
//       to, // Recipient address(es)
//       subject, // Subject line
//       text: body, // Plain text body
//   };

//   console.log(mailOptions);
  

//   try {
//       await transporter.sendMail(mailOptions);
//       res.status(200).json({ message: 'Email sent successfully!' });
//   } catch (error) {
//       console.error('Error sending email:', error);
//       res.status(500).json({ message: 'Failed to send email' });
//   }
// });

server.listen(8080, () => {
  console.log("Server is start ");
});
