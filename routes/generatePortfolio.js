const express = require('express');
const router = express.Router();
const generatePortController  = require('../controller/GeneratePortfolio');

router
.get("/:id", generatePortController.generatedPortfolio);

exports.router = router;