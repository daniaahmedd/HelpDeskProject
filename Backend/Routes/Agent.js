const express = require("express");
const router = express.Router();
const agentController = require("../controller/agentController");

router.post("/calculateAgentRating",agentController.calc)

module.exports = router;