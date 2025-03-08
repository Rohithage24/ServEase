const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rohithage2244@gmail.com", // Your email
        pass: "imvl nowj dmrp jrom" // Your App Password
    }
});


exports.sendmail = async (req, res) => {
    const { to, subject, message } = req.body;

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

app.post("/send-email", );


