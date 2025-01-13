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

  exports.getReqs= async (req , res) =>{
    const id = req.params.id;
   console.log(id);
   try {
    const request = await modelWork.find({employeeId:id})
    if (request) {
        res.status(200).json({ message: "request  found", request });
      console.log(request);
        
    }else  {
    res.status(404).json({ message: "this error" , error });

    }  
   } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
   }
  }