const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../Middleware/authorizationMiddleware");
const TicketController = require("../controller/TicketController");
//const ReportController = require('<path-to>/ReportController');


router.post("/", TicketController.createTicket);
//router.put("/:ticketid", TicketController.updateTicket);
//router.post("/update/:ticketId",authorizationMiddleware(['Agent']), ReportController.createReport)

router.put("/rate/:ticketid", TicketController.rateTicket);
//router.get
module.exports = router;