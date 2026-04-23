// import the mongoose
const mongoose = require("mongoose")

// to create the schema
const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum : ['user', 'admin'],
        default: "user"
    },

    resetToken: {
        type: String
    },

    resetTokenExpiry: {
        type: Date
    }

})



// to create model
const users = mongoose.model("users", userSchema)

// export model
module.exports = users