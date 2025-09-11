const express = require("express");
const mongoose = require("mongoose");


const feedbackSchema = new mongoose.Schema({
  rating: Number,
  selectedOptions: {
      timely: String,
      behavior: String
  },
  feedback: String,
  orderID:{type:String},
  userID:{type:String},
  reqID:{type:String},
  employee:{type:Array},


});

const Feedback = mongoose.model("Feedback", feedbackSchema);


exports.getAllfeedback = async (req, res) => {
  try {
      const feedbacks = await Feedback.find();
      res.json(feedbacks);
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
}

exports.getfeedback = async (req, res) => {
  const userID = req.params.userID; // ✅ directly extract the param value
  console.log("UserID:", userID);

  try {
    const feedbacks = await Feedback.find({ userID: userID }); // ✅ pass only string
    console.log("Feedbacks:", feedbacks);

    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.feedbackpo = async (req, res) => {
  try {
    console.log(req.body);
    
      const newFeedback = new Feedback(req.body);
      await newFeedback.save();
      res.json({ message: "Feedback saved!" });
  } catch (error) {
      res.status(500).json({ error: "Error saving feedback" });
  }
}








