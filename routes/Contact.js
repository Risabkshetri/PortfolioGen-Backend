const express = require('express');
const router = express.Router();
const contactController  = require('../controller/Contact');

router
.post("/", contactController.createContacts)
.get("/", contactController.getContacts);

exports.router = router;