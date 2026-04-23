// import the usermodel
const users = require("../models/userModel")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const nodemailer = require("nodemailer")

// Register
exports.registerController = async (req, res) => {

    const { username, email, password, role } = req.body
    const trimPassword = password.trim()
    const lowerEmail = email.trim().toLowerCase()

    try {
        const existingUser = await users.findOne({ email: lowerEmail })
        if (existingUser) {
            return res.status(406).json({ message: "User Already Exists... Please Login" })
        }
        else {

            const encryptedPassword = await bcrypt.hash(password.trim(), 10);        
            const newUser = await users.create(
                {
                    username,
                    email: lowerEmail,
                    password: encryptedPassword,
                    role: role || "user"
                }
            );


            res.status(200).json({
                message: "Registered successfully",
                username: newUser.username
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}

// forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body
    const lowerEmail = email.trim().toLowerCase()
    try {
        const user = await users.findOne({ email: lowerEmail })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const token = crypto.randomBytes(32).toString("hex")
        user.resetToken = token
        user.resetTokenExpiry = Date.now() + 10 * 60 * 1000
        await user.save()

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL.trim(),
                pass: process.env.EMAIL_PASSWORD.trim()
            }
        })

        const link = `http://localhost:4200/reset-password/${token}`
        await transporter.sendMail({
            to: lowerEmail,
            subject: "Reset Password",
            html: `<h3>Click below to reset your password</h3>
                   <a href="${link}">${link}</a>`
        })

        res.status(200).json({ message: "Reset link sent to email" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, password } = req.body

    try {
        const user = await users.findOne({
            resetToken: token
        }).lean()

        if (!user) {
            return res.status(400).json("Invalid")
        }
        console.log("user for reset", user);

        const encryptedPassword = await bcrypt.hash(password.trim(), 10);
        console.log("hashed password:", encryptedPassword)

        user.password = encryptedPassword

        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        const savedUser = await users.updateOne({ email: user.email }, { password: encryptedPassword, resetToken: undefined }, { new: true });
        console.log("savedUser", savedUser);


        res.status(200).json("Password updated successfully")

    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}