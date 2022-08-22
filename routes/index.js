"use strict"

const express = require("express");
const router = express.Router();

const cartRouter = require("./cartRouter");

router.use("/cart", cartRouter.router);
router.use("/viewPosts", cartRouter.router);

module.exports = router;

