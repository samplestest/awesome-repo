const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Cart = require('../model/cartModel');

router.get('/get_cart/:userId', async (req, res) => {

    try {
        const post = await Cart.findById(req.params.userId);
        res.json(post);
    } catch (err) {
        res.status(400).send("Error in User Register");
    }
})
//Update Cart
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Cart.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    product: JSON.stringify(req.body.product)
                }
            }
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});
//Delete cart
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Cart.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;