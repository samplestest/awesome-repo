const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Wishlist = require('../model/wishlistModel');

router.get('/get_wishlist/:userId', async (req, res) => {

    try {
        const post = await Wishlist.findById(req.params.userId);
        res.json(post);
    } catch (err) {
        res.status(400).send("Error in User Register");
    }
})

//Update WishList
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Wishlist.updateOne(
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

//Delete Wishlist
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Wishlist.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;