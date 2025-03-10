const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.gmail_web , // Your email
        pass: process.env.gmail_password // Your App Password
    }
});


exports.sendmail = async (req, res) => {
    const { to, subject, message } = req.body;

    console.log(req.body);
    

    if (!to || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const mailOptions = {
        from: "rohithage2244@gmail.com",
        to: to,
        subject: subject,
        text: message
    };

    try {
         const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
}


exports.sendmailtoprof = async (req, res) => {
    const { to, subject, message } = req.body;

    console.log(req.body);
    

    if (!to || !subject || !message) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const mailOptions = {
        from: "rohithage2244@gmail.com",
        to: to,
        subject: subject,
        text: message
    };

    try {
        // const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
}




