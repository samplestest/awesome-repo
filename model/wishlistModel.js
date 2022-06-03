const mongoose = require('mongoose');
const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ecomm_users",
        required: false,
    },
    product: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("ecomm_wishlist", wishlistSchema)