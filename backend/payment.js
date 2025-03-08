const mongoose = require("mongoose");
const { Schema } = mongoose;


const paymentSchema = new mongoose.Schema({
    user: String,
    email: String,
    amount: Number,
    transactionId: String,
    orderId: String,
    status: String,
    paymentMethod: String,
    createdAt: { type: Date, default: Date.now },
  });
  
  const Payment = mongoose.model("Payment", paymentSchema);


  exports.payment = async (req, res) => {
    try {
      const { user, email, amount, transactionId, orderId, status, paymentMethod } = req.body;
  
      const newPayment = new Payment({ user, email, amount, transactionId, orderId, status, paymentMethod });
      await newPayment.save();
  
      res.json({ success: true, message: "Payment saved successfully!", data: newPayment });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error saving payment", error });
    }
  }
  



  exports.getpay = async (req, res) => {
    try {
      const payments = await Payment.find();
      res.json({ success: true, data: payments });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching payments", error });
    }
  }
  

  exports.getpay_orderId = async (req, res) => {
    try {
        const { ORDER_ID } = req.params;
        // console.log("Fetching payment for ORDER_ID:", ORDER_ID);
        
       
        const payment = await Payment.findOne({ orderId: ORDER_ID });

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment not found" });
        }

        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        console.error("Error fetching payment:", error);
        res.status(500).json({ success: false, message: "Failed to fetch payment", error });
    }
};
  
  

  