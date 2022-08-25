const express = require('express');
const router = express.Router();

const productRouter = require("./productRouter");
const userRouter = require('./userRouter');
const cartRouter = require("./cartRouter");

router.use("/product", productRouter.router);
router.use('/users', userRouter.router);
router.use("/cart", cartRouter.router);

module.exports = router;
