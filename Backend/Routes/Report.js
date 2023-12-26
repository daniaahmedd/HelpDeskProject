const express = require("express");
const router = express.Router();
const ReportController = require("../controller/ReportController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");



router.post("/create",authorizationMiddleware(['Manager']) ,ReportController.gettickets)
router.post("/create/:ticketId", authorizationMiddleware(['Manager']),ReportController.createReport)
router.post("/view", authorizationMiddleware(['Manager']),ReportController.getReport)
router.get("/viewTrends", authorizationMiddleware(['Manager']),ReportController.getTrends)
router.get("/tickets",authorizationMiddleware(['Manager']),ReportController.getTicket)

module.exports = router;