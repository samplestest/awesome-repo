const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const Address = require('../model/addressModel');

router.get('/get_address/:userId', async (req, res) => {

    try {
        const post = await Address.findById(req.params.userId);
        res.json(post);
    } catch (err) {
        res.status(400).send("Error in User Register");
    }
})


// hey test1
//Update Address
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Address.updateOne(
            { _id: req.params.postId },
            {
                $set: {
                    city: req.body.city,
                    country: req.body.country,
                    zipcode: req.body.zipcode
                }
            }
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete Address
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Address.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;