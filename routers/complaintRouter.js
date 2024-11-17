const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/new-complaint', complaintController.createComplaint);

module.exports = router;