const mongoose = require("mongoose");
const { Schema } = mongoose;


const CompletSchema = new mongoose.Schema({
  fName: String,
  email: { type: String, require: true, unique: true },
  UserID:{type:Number , require:true},
  EmpID :{type :Array , require:true },
  EmpName :{type :Array , require:true},
  Status :{type :String , require:true}
});

const modelComplate = mongoose.model("CompletSchema", CompletSchema);

exports.Completew = async (req, res) => {
    try {
      const newEntry = new modelComplate(req.body);
      await newEntry.save();
      res.status(201).json({ message: "Entry added successfully", data: newEntry });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  exports.getWorkdata = async (req, res) => {
    try {
      const entries = await modelComplate.find();
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


