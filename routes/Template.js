// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/Template');

router
.post("/", userController.PostTemplate)
.get("/", userController.getTemplate);

exports.router = router;