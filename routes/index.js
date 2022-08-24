<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');

router.use('/users', userRouter.router);


module.exports = router;
=======
"use strict"

const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter");

router.use("/cart", cartRouter.router);

module.exports = router;

>>>>>>> main
