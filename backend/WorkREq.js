const mongoose = require("mongoose");
const nodemailer = require("nodemailer");




// ✅ 2. Define a Proper Mongoose Schema
const requestSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: Number, required: true },
    address: { type: String, required: true },
    pinCode: Number,
    serves: { type: String, required: true },
    description: { type: String, required: true },
    payment:{type:String,require:true},
    ORDER_ID:{ type: String, required: true },
    status:{type:String ,require:true},
    employee:{type:Array , require:true}

});

// ✅ 3. Create Mongoose Model
const RequestModel = mongoose.model("WorkReq", requestSchema);


exports.addREquest = async (req, res) => {
    try {
  //console.log("Received Request Body:", req.body);

        const { requestData,ORDER_ID, payment } = req.body;

        if (!requestData || !requestData.userData) {
            return res.status(400).json({ message: "Invalid request format. Missing userData." });
        }

        const { subject, body, price, userData } = requestData;

        if (!userData._id || !userData.fName || !userData.email || !ORDER_ID) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const newRequest = new RequestModel({
            userID: userData._id,
            name: userData.fName,
            email: userData.email,
            contact: userData.mobile,
            address: userData.address,
            pinCode:userData.pinCode,
            serves: subject,
            description: body,
            ORDER_ID: ORDER_ID, // Now stored as a string
            payment: payment || "Pending",
            status: "pending",
            employee:[],
        });

        await newRequest.save();
  //console.log(newRequest);
        
  //console.log("✅ Request saved successfully:", newRequest);

        res.status(200).json({ message: "Request saved successfully!", data: newRequest });

    } catch (error) {
        console.error("❌ Error saving request:", error);
        res.status(500).json({ message: "Failed to process request", error: error.message });
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


exports.getRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        
        const request = await RequestModel.findById(id); // Fetch specific request

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error("Error fetching request:", error);
        res.status(500).json({ message: "Failed to fetch request" });
    }
};



exports.updateRequestStatus = async (req, res) => {
  try {
      const { requestId, status ,selectedEmployees} = req.body;
//console.log(selectedEmployees);
      

      // Validate if status is provided
      if (!requestId || !status) {
          return res.status(400).json({ message: "Request ID and Status are required" });
      }

      const updatedRequest = await RequestModel.findByIdAndUpdate(
          requestId,
          { status: status ,employee: selectedEmployees },
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

exports.getRequestByuser = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        
        const request = await RequestModel.find({userID:id}); // Fetch specific request

        if (!request) {
            return res.status(404).json({ message: "Request not found" });
        }

        res.status(200).json(request);
    } catch (error) {
        console.error("Error fetching request:", error);
        res.status(500).json({ message: "Failed to fetch request" });
    }
};
