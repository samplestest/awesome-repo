const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const Product = require('../model/productModel');
const Cart = require('../model/cartModel');
const Wishlist = require('../model/wishlistModel');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage, limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
// const imgname = file.fieldname
router.post('/add_product', upload.single('images'), async (req, res) => {

    //Craete New Product
    const product = new Product({
        title: req.body.title,
        quantity: req.body.quantity,
        available: req.body.available,
        productImage: req.file.path,
        // images: req.body.images
        price: req.body.price
    });
    console.log("product", product);
    try {
        const saveddata = await product.save();
        res.send({ product: product._id });
    } catch (err) {
        res.status(400).send(err);
    }

})


router.post('/cart/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    try {

        //Check User Exits
        const user = await User.findById(req.params.id);


        if (user) {
            //create new Address
            const cart = new Cart({
                userId: id,
                product: JSON.stringify(req.body.product),
            });
            cart.save();

            return res.status(400).send("User Cart Successfully Create");

        }
        else {
            return res.status(400).send("User Registration UnsccessFul");
        }

    } catch (err) {
        return res.status(400).send("Error Craete in Cart");
    }
})

router.post('/cart/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    try {

        //Check User Exits
        const user = await User.findById(req.params.id);


        if (user) {
            //create new Address
            const cart = new Cart({
                userId: id,
                product: JSON.stringify(req.body.product),
            });
            cart.save();

            return res.status(400).send("User Cart Successfully Create");

        }
        else {
            return res.status(400).send("User Registration UnsccessFul");
        }

    } catch (err) {
        return res.status(400).send("Error Craete in Cart");
    }
})

router.post('/wishlist/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    try {

        //Check User Exits
        const user = await User.findById(req.params.id);


        if (user) {
            //create new Address
            const wishlist = new Wishlist({
                userId: id,
                product: JSON.stringify(req.body.product),
            });
            wishlist.save();

            return res.status(400).send("User Wishlist Successfully Create");

        }
        else {
            return res.status(400).send("User Registration UnsccessFul");
        }

    } catch (err) {
        return res.status(400).send("Error Craete in Cart");
    }
})

router.get('/:postId', async (req, res) => {
    try {
        const post = await Product.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({ message: err })
    }

    // res.send('we are on specific')
});

//Update Product
router.patch('/:postId', async (req, res) => {
    try {
        const updatePost = await Product.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } }
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Delete Product
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Product.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;