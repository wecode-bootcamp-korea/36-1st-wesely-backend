"use strict";

const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/user/:user_id', cartController.listAll);
router.delete('/:id', cartController.listDelete);

module.exports = { router };