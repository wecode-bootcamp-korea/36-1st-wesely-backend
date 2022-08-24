"use strict";

const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/user/:user_id', cartController.getCartListAll);
router.delete('/:id', cartController.deleteCartProduct);

module.exports = { router };