const express = require('express');
const router = express.Router();

const productRouter = require("./productRouter");

router.use("/product", productRouter.router);

module.exports = router; 