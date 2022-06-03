const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    quantity: {
        type: String
    },
    available: {
        type: Boolean,
        default: true
    },
    productImage: {
        type: String,

    },
    // images: [
    //     {
    //         img: {
    //             type: String
    //         }
    //     }
    // ],
    price: {
        type: String
    }
})
module.exports = mongoose.model("ecomm_product", productSchema)