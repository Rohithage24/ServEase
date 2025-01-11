const mongoose = require("mongoose");
const { Schema } = mongoose;


const workRESchema  = new mongoose.Schema({
    "employeeId": "string", 
    "userId": "string",     
    "hireDate": "string",  
    "userMobile": "string"  
  })

const modelWork = mongoose.model("WrRequest", workRESchema);

exports.addREquest = async (req, res) => {
    console.log("Request Body:", req.body);
    try {
      const request = new modelWork(req.body);
      await request.save();
      res
        .status(201)
        .send({ message: "Request Send successfully", WrRequest: request });
    } catch (err) {
      console.error("Error to Send Request:", err);
      res.status(500).send({ message: "Error to Send Request:", error: err });
    }
  };