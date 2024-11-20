const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const jwtMiddleWare = require('../middlewares/jwtMiddleWare');

router.post('/new-complaint', complaintController.createComplaint);
router.get('/get-all-complaints', jwtMiddleWare, complaintController.getComplaints);
router.get('/get-complaint-count-by-type', jwtMiddleWare, complaintController.getUniqueComplaintCountByType);
router.get('/get-complaint-count-by-danger-level', jwtMiddleWare, complaintController.getUniqueDangerLevelCount);
router.get('/get-latest-complaint-locations', jwtMiddleWare, complaintController.getLatestComplaintLocations);
router.put('/update-complaint-status', jwtMiddleWare, complaintController.updateComplaintStatus)
router.get('/get-complaint-summary', jwtMiddleWare, complaintController.getComplaintSummary)

module.exports = router;