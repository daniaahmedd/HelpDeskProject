const express = require("express");
const router = express.Router();
const ReportController = require("../controller/ReportController");



router.post("/create", ReportController.gettickets)
router.post("/create/:ticketId", ReportController.createReport)
router.post("/view", ReportController.getReport)
router.get("/viewTrends", ReportController.getTrends)
router.get("/tickets",ReportController.getTicket)
//authorizationMiddleware(['Manager'])
module.exports = router;