// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const portfolioController = require('../controller/PortfolioDetails');

router
.post("/", portfolioController.createPortfolio)
.post("/update/:id", portfolioController.updatePortfolio)
.post("/delete/:id", portfolioController.deletePortfolio)
.get("/:id", portfolioController.getPortfolioById)
.get("/", portfolioController.getPortfolio);


exports.router = router;