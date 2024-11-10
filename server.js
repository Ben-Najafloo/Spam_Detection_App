// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000'
}));

require('dotenv').config();

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', async (req, res) => {
    const { from, to, subject, text } = req.body;

    const mailOptions = {
        from,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

app.listen(3001, () => {
    console.log('Node.js server running on port 3001');
});
