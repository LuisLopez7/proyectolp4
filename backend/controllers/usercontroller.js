const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('Error configuring nodemailer transporter:', error);
    } else {
        console.log('Nodemailer transporter is configured correctly');
    }
});

exports.register = async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    console.log('Datos de registro recibidos:', { firstName, lastName, username, email, password });

    try {
        if (!firstName || !lastName || !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error); 
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por el correo electrónico
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Crear un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar la respuesta con el token y los datos del usuario
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            username: user.username, 
            firstName: user.firstName,
            lastName: user.lastName
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message 
        });
    }
};



exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `You requested for a password reset. Click the link below to reset your password:\n\nhttp://${req.headers.host}/api/auth/reset-password/${token}\n\nIf you did not request this, please ignore this email.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email', error });
            }
            res.status(200).json({ message: 'Password reset email sent', info });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
