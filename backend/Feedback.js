const express = require("express");
const mongoose = require("mongoose");


const FeedbackSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  serves: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "pending" }, // Default status
});

// ✅ Create Mongoose Model
const FeedModel = mongoose.model("FeedBack", FeedbackSchema);

exports.adduser = async (req, res) => {
  try {
    const { userID, email, serves, description, status } = req.body;

    // Validate required fields
    if (!userID || !email || !serves || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Create new feedback entry
    const newFeedback = new FeedModel({
      userID,
      email,
      serves,
      description,
      status: status || "pending", // Default value
    });

    // Save to MongoDB
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}







