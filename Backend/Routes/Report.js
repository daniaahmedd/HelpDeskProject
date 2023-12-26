const express = require("express");
const router = express.Router();
const ReportController = require("../controller/ReportController");

router.post("/create/:ticketId", ReportController.createReport)
router.get("/view/:reportid", ReportController.getReport)
router.get("/viewTrends", ReportController.getTrends)
router.post("/create", ReportController.gettickets)

module.exports = router;