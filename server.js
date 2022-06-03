const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

//Import Router
const userRoute = require('./routes/userRoutes');
const addressRouter = require('./routes/addresssRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const wishlistRoutre = require('./routes/wishlistRoutes');

//Middleware
app.use(express.json());


//Route Middleware
app.use('/user', userRoute);
app.use('/address', addressRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRoutre);

//Database Connection
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connect to Database"))
    .catch((error) => console.log("Error in Connecting to Database: ", error));

const port = process.env.PORT;
app.listen(port, () => console.log(`listening on PORT ${port}`));