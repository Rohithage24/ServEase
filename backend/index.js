const express = require("express");
const bodyParser = require('body-parser');
require('dotenv').config();

const userjs = require("./user");
const Employee = require("./Employee")
const WorkRe = require("./WorkREq")
const FeedBack = require("./Feedback")
const Payment = require("./payment");
const AllEmail = require("./Allgmail")
const WorkComplete = require("./Workcomplt");

const cors = require("cors");

const server = express();
server.use(cors());

server.use(express.json());
server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: true }));

// mongoosh conncet
const mongoose = require("mongoose");
const { configDotenv } = require("dotenv");
const { Schema } = mongoose;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.Mango_db
  );
  console.log("Connect mongodb");
  // console.log('url',process.env.Mango_db);
  

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
server.post("/addemp",Employee.FindEmplmany)

server.post("/Employee", Employee.addEmployee);
server.get("/image/:filename",Employee.getImage)
server.get('/emp/:id',Employee.FindEmpl)
server.delete('/delete/:id',Employee.deleteEmployee)

// Requset Model
server.post('/sendRequest', WorkRe.addREquest);
server.get("/request" , WorkRe.getAllRequests);
server.put("/update-request-status", WorkRe.updateRequestStatus);
server.get("/getRequest/:id", WorkRe.getRequestById);
server.get("/getRequestUser/:id", WorkRe.getRequestByuser);



// Feed back
server.post("/feedback",FeedBack.feedbackpo );

// ➤ Submit feedback
server.get("/getFeed",FeedBack.getAllfeedback );

// Payment
server.post("/save-payment",Payment.payment );
server.get("/payments", Payment.getpay);
server.get("/payme/:ORDER_ID", Payment.getpay_orderId);


// all mail
 
server.post("/send-email",AllEmail.sendmail );
server.post("/send-pro",AllEmail.sendmailtoprof );

// Workcomplete 
server.post("/add-complete",WorkComplete.Completew );

server.get("/get-all-complete", WorkComplete.getWorkdata);






// // Email transporter

// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//        user: process.env.gmail_web , // Your email
//       pass: process.env.gmail_password
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
