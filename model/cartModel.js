const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecomm_users",
        required: false,
    },
    product: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
})
module.exports = mongoose.model("ecomm_cart", cartSchema)