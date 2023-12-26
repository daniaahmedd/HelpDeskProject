const express = require("express");
const router = express.Router();
const ReportController = require("../controller/ReportController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");



router.get("/create",authorizationMiddleware(['Manager']) ,ReportController.gettickets)
router.post("/create/:ticketId", authorizationMiddleware(['Manager']),ReportController.createReport)
router.get("/view", authorizationMiddleware(['Manager']),ReportController.getReport)
router.get("/tickets",authorizationMiddleware(['Manager']),ReportController.getTicket)

module.exports = router;