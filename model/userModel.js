const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
    },
    address: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ecomm_address",
            required: false,
        },
    ],
})
module.exports = mongoose.model("ecomm_user", userSchema)