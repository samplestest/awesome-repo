const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const Address = require('../model/addressModel');
const Cart = require('../model/cartModel')
const { registerValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

router.get('/get', (req, res) => {
    res.send('hey');
})

router.post('/register', async (req, res) => {

    //Lets Validation The Data Before We A User
    // const { error } = registerValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    //Check if The user is Already in Database
    const emailExits = await User.findOne({ email: req.body.email })
    if (emailExits) return res.status(400).send("Email Already Exits")

    //Hash Passwword
    // const salt = await bcrypt.genSalt(10);
    // const hashpassword = await bcrypt.hash(req.body.password, salt);

    //OTP Genreter
    const OTP = otpGenerator.generate(6, {
        digits: true, alphabets: false, upperCase: false, specialChars: false
    });

    //Mail Send Start
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'darshini.surbhiinfotech@gmail.com',
            pass: "Darshini@2022"
        }
    });
    var mailOptions = {
        from: 'darshini.surbhiinfotech@gmail.com',
        to: 'darshini.surbhiinfotech@gmail.com',
        subject: "Varification Code:",
        text: "Vericifaction Code:" + OTP
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Email Has Been Sent", info.response);
        }
    })

    //Craete New User
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        verified: req.body.verified,
        otp: OTP
    })
    try {
        const saveddata = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
})

router.post('/register/verifyotp', async (req, res) => {

    //Check if The user  in Database
    const emailExits = await User.findOne({ email: req.body.email })
    if (!emailExits) return res.status(400).send("Email Not Exits")

    //Check if The OTP  in Database
    const otpExits = await User.findOne({ otp: req.body.otp })
    if (!otpExits) return res.status(400).send("OTP  Not Exits")

    const user = await User.findOne({
        email: req.body.email,
        otp: req.body.otp
    })
    // if (!user) {
    //     return res.status(400).send('Email is Wrong')
    // }
    try {
        const result = await User.updateOne(
            // { status: 'true' },
            { email: req.body.email },

            {
                $set: {
                    email: req.body.email,
                    otp: null,
                    verified: true
                }
            }

        ).then((res2) => {
            console.log('result', res2)
            res.send('User Registration Successfuly');

        });
    } catch (err) {
        res.status(400).send("Email or OTP Wrong")
    }

});

router.post('/login', async (req, res) => {

    //Check Email Exits
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email Wrong');

    //Password Check
    if (user.password !== req.body.password) {
        return res.status(400).send('Password Wrong');
    }

    res.send('logged in!');

})

router.post('/add_address/:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    try {

        //Check User Exits
        const user = await User.findById(req.params.id);


        if (user) {
            //create new Address
            const address = new Address({
                userId: id,
                city: req.body.city,
                country: req.body.country,
                zipcode: req.body.zipcode
            });

            //create the Address and Push in User Adress
            let add = await Address.create(address);
            user.address.push(add);
            console.log(add);
            user.save();

            return res.status(400).send("User Address Successfully Craete");

        }
        else {
            return res.status(400).send("User Registration UnsccessFul");
        }

    } catch (err) {
        return res.status(400).send("Error Craete in Address");
    }
})

// router.post('/cart/:id', async (req, res) => {
//     let id = req.params.id;
//     console.log(id);
//     try {

//         //Check User Exits
//         const user = await User.findById(req.params.id);


//         if (user) {
//             //create new Address
//             const cart = new Cart({
//                 userId: id,
//                 product: JSON.stringify(req.body.product),
//             });
//             // await cart.save().then(data => {
//             //     res.json(data);
//             //     res.status(200).json("data Added");
//             // }).catch(err => {
//             //     console.log(err);
//             //     res.status(400).json(" Error data Added");

//             // });

//             // //create the Address and Push in User Adress
//             // let add = await Address.create(address);
//             // user.address.push(add);
//             // console.log(add);
//             cart.save();

//             return res.status(400).send("User Cart Successfully Create");

//         }
//         else {
//             return res.status(400).send("User Registration UnsccessFul");
//         }

//     } catch (err) {
//         return res.status(400).send("Error Craete in Address");
//     }
// })
module.exports = router;