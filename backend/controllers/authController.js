const users = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

exports.loginController = async (req, res) => {

    console.log("REQUEST BODY:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json("Email and Password required");
    }

    const lowerEmail = email.trim().toLowerCase();
    const trimPassword = String(password).trim();

    try {
        const existingUser = await users.findOne({ email: lowerEmail });



        console.log(existingUser)


        if (!existingUser) {
            return res.status(404).json("User not found");
        }

        let role = existingUser.role;

        console.log("Entered Password :", trimPassword);
        console.log("DB Password :", existingUser.password);

        const isPasswordMatch = await bcrypt.compare(
            trimPassword,
            existingUser.password
        );

        console.log("Match Result:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            {
                userId: existingUser._id,
                role
            },
            process.env.JWTPASSWORD,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            user: {
                _id: existingUser._id,
                name: existingUser.username || existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            },
            token
        });

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};