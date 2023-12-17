const express = require("express");
const router = express.Router();
const ReportController = require("../controller/ReportController");
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");

router.post("/create/:ticketId",authorizationMiddleware(['Manager']), ReportController.createReport)
router.get("/view/:reportid",authorizationMiddleware(['Manager']), ReportController.getReport)
router.get("/viewTrends",authorizationMiddleware(['Manager']), ReportController.getTrends)


module.exports = router;