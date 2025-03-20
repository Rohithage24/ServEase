const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const geolib = require("geolib");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

let users = {}; // Store active users

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Receive user location
  socket.on("sendLocation", (data) => {
    users[socket.id] = data;
    
    // Send updated locations to all users
    io.emit("updateLocations", users);
  });

  socket.on("disconnect", () => {
    delete users[socket.id]; // Remove user on disconnect
    io.emit("updateLocations", users);
  });
});

// Function to filter users within 3km
const getNearbyUsers = (currentLocation) => {
  return Object.values(users).filter((user) => {
    const distance = geolib.getDistance(
      { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      { latitude: user.latitude, longitude: user.longitude }
    );
    
    return distance <= 3000; // 3 km range
  });
};

// New route to get nearby users
app.get("/nearby-users", (req, res) => {
  const { latitude, longitude } = req.query;
  if (!latitude || !longitude) return res.status(400).send("Location required");

  const nearbyUsers = getNearbyUsers({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) });
  res.json(nearbyUsers);
});

server.listen(8080, () => {
  console.log("Server running on port 5000");
});





// exports.addREquest = async (req, res) => {
//     console.log("Request Body:", req.body);
//     try {
//       const request = new modelWork(req.body);
//       await request.save();
//       res
//         .status(201)
//         .send({ message: "Request Send successfully", WrRequest: request });
//     } catch (err) {
//       console.error("Error to Send Request:", err);
//       res.status(500).send({ message: "Error to Send Request:", error: err });
//     }
//   };

  exports.getReqs= async (req , res) =>{
    const id = req.params.id;
   console.log(id);
   try {
    const request = await modelWork.find({employeeId:id})
    if (request) {
        res.status(200).json({ message: "request  found", request });
//console.log(request);
        
    }else  {
    res.status(404).json({ message: "this error" , error });

    }  
   } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
   }
  }




  const mongoose = require("mongoose");
  const nodemailer = require("nodemailer");
  
  
  
  
  // ✅ 2. Define a Proper Mongoose Schema
  const requestSchema = new mongoose.Schema({
      userID: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      contact: { type: Number, required: true },
      address: { type: String, required: true },
      serves: { type: String, required: true },
      description: { type: String, required: true }
  });
  
  // ✅ 3. Create Mongoose Model
  const RequestModel = mongoose.model("WorkRequest", requestSchema);
  
  // ✅ 4. Configure Nodemailer
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "rohithage2244@gmail.com", // Your email
          pass: "imvl nowj dmrp jrom" // Your App Password
      }
  });
  exports.addREquest = async (req, res) => {
    const { to, subject, body, userData } = req.body;
    console.log(req.body);
    
    
    try {
        const newRequest = new RequestModel({
            userID: userData._id,
            name: userData.fName,
            email: userData.email,
            contact:userData.mobile,
            address:userData.address,
            serves: subject,
            description: body
        });
  
        await newRequest.save();
  //console.log("Request saved:", newRequest);
  
        const mailOptions = {
            from: "rohithage2244@gmail.com",
            to: to,
            subject: subject,
            text: body
        };
  
        await transporter.sendMail(mailOptions);
  //console.log("Email sent successfully");
  
        res.status(200).json({ message: "Request added & Email sent successfully!" });
  
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ message: "Failed to process request" });
    }
  };
  
  
  
  exports.getAllRequests = async (req, res) => {
    try {
        const requests = await RequestModel.find(); // Fetch all requests from MongoDB
        res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({ message: "Failed to fetch requests" });
    }
  };
  
  
  