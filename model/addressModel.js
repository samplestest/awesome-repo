const mongoose = require('mongoose')
const addressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecomm_users",
        required: false,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    zipcode: {
        type: String
    }
})
module.exports = mongoose.model("ecomm_address", addressSchema)