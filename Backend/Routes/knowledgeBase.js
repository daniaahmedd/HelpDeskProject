const express = require("express");
const router = express.Router();
const knowledgeBaseController = require("../controller/knowledgeBaseController");
router.post("/knowledgeBaseRoutes",knowledgeBaseController.viewknowledgeBase)

module.exports = router;
