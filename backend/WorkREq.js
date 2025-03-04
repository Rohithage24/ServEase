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
    description: { type: String, required: true },
    status:{type:String}
});

// ✅ 3. Create Mongoose Model
const RequestModel = mongoose.model("WorkRequest", requestSchema);

// // ✅ 4. Configure Nodemailer
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "rohithage2244@gmail.com", // Your email
//         pass: "imvl nowj dmrp jrom" // Your App Password
//     }
// });
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
          description: body,
          status:"pending"
      });

      await newRequest.save();
      console.log("Request saved:", newRequest);

      // const mailOptions = {
      //     from: "rohithage2244@gmail.com",
      //     to: to,
      //     subject: subject,
      //     text: body
      // };

      // await transporter.sendMail(mailOptions);
      // console.log("Request sent successfully");

      res.status(200).json({ message: "Request sent successfully!" });

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



exports.updateRequestStatus = async (req, res) => {
  try {
      const { requestId, status } = req.body;

      // Validate if status is provided
      if (!requestId || !status) {
          return res.status(400).json({ message: "Request ID and Status are required" });
      }

      const updatedRequest = await RequestModel.findByIdAndUpdate(
          requestId,
          { status: status },
          { new: true }
      );

      if (!updatedRequest) {
          return res.status(404).json({ message: "Request not found" });
      }

      res.status(200).json({ message: "Request status updated successfully!", updatedRequest });

  } catch (error) {
      console.error("Error updating request status:", error);
      res.status(500).json({ message: "Failed to update request status" });
  }
};
